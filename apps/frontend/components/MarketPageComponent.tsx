"use client";

import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Decimal from "decimal.js";

interface IMarket {
  opinion: string;
  description: string;
  expiryTime: string;
  yesPool: string;
  noPool: string;
  adminId: string;
}

interface FetchMarketResponse {
  data: IMarket;
}

interface IPosition {
  id: string;
  createdAt: Date;
  marketId: string;
  noShares: string;
  updatedAt: Date;
  userId: string;
  yesShares: string;
}

interface ITrade {
  id: string;
  userId: string;
  marketId: string;
  side: "YES" | "NO";
  amountIn: string;
  amountOut: string;
  price: string;
  createdAt: Date;
}

interface FetchUserPositionAndTradesResponse {
  data: {
    position: IPosition;
    trades: ITrade[];
  };
}

export default function MarketPageComponent({
  marketId,
}: {
  marketId: string;
}) {
  const { data, status } = useSession();

  const [marketData, setMarketData] = useState<IMarket | null>(null);
  const [currentTab, setCurrentTab] = useState<"BUY" | "SELL">("BUY");
  const [currentSharesTab, setCurrentSharesTab] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState<string>("");
  const [amountToRecieve, setAmountToRecieve] = useState<Decimal>(
    new Decimal(0)
  );

  const fetchMarketInfo = async () => {
    try {
      const res = await axios.get<FetchMarketResponse>(
        `${BACKEND_URL}/markets/${marketId}`,
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );

      setMarketData(res.data.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  const handlePlaceTrade = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/markets/${marketId}/trades`,
        {
          side: currentSharesTab,
          action: currentTab,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );
      toast.success(res.data.message, { position: "top-center" });
      fetchMarketInfo();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message, {
        position: "top-center",
      });
    }
  };

  const handleCalculateRecievingAmount = () => {
    if (!marketData) return;

    let newYesPool;
    let newNoPool;
    let amountToBeRecieved;

    const k = new Decimal(marketData.yesPool).mul(
      new Decimal(marketData.noPool)
    );

    if (currentTab === "BUY" && currentSharesTab === "YES") {
      newYesPool = new Decimal(marketData.yesPool).plus(amount);
      newNoPool = k.div(newYesPool);
      amountToBeRecieved = new Decimal(marketData.noPool).minus(newNoPool);
    } else if (currentTab === "BUY" && currentSharesTab === "NO") {
      newNoPool = new Decimal(marketData.noPool).plus(amount);
      newYesPool = k.div(newNoPool);
      amountToBeRecieved = new Decimal(marketData.yesPool).minus(newYesPool);
    } else if (currentTab === "SELL" && currentSharesTab === "YES") {
      newYesPool = new Decimal(marketData.yesPool).minus(amount);
      newNoPool = k.div(newYesPool);
      amountToBeRecieved = newNoPool.minus(new Decimal(marketData.noPool));
    } else if (currentTab === "SELL" && currentSharesTab === "NO") {
      newNoPool = new Decimal(marketData.noPool).minus(amount);
      newYesPool = k.div(newNoPool);
      amountToBeRecieved = newYesPool.minus(new Decimal(marketData.yesPool));
    }

    setAmountToRecieve(amountToBeRecieved || new Decimal(0));
  };

  const fetchUserPositionAndTrades = async () => {
    try {
      const res = await axios.get<FetchUserPositionAndTradesResponse>(
        `${BACKEND_URL}/users/${marketId}/position-and-trades`,
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message, {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    if (marketId && status === "authenticated") {
      fetchMarketInfo();
      fetchUserPositionAndTrades();
    }
  }, [marketId, status]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      handleCalculateRecievingAmount();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [amount, currentSharesTab, currentTab]);

  if (!marketData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">{marketData.opinion}</h1>
          <p className="text-gray-600">{marketData.description}</p>
          <div className="text-sm text-gray-500">
            Expiry: {marketData.expiryTime}
          </div>
          <div className="flex gap-4 text-sm">
            <span>Yes Pool: {marketData.yesPool}</span>
            <span>No Pool: {marketData.noPool}</span>
          </div>
        </div>

        <div className="flex rounded-lg overflow-hidden border">
          {(["BUY", "SELL"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentTab(tab)}
              className={`flex-1 py-2 font-medium ${
                currentTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex rounded-lg overflow-hidden border">
          {(["YES", "NO"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setCurrentSharesTab(tab)}
              className={`flex-1 py-2 font-medium ${
                currentSharesTab === tab
                  ? "bg-green-600 text-white"
                  : "bg-white text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Amount to {currentTab} {currentSharesTab} Opinion
          </label>
          <Input
            type="number"
            min={0}
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
          />
          <span className="mb-4 px-2 font-semibold">
            you'll get ~ {amountToRecieve.toString()}
          </span>
        </div>

        <Button
          className="w-full"
          disabled={!amount || Number(amount) <= 0}
          onClick={handlePlaceTrade}
        >
          {currentTab} {amount} {currentSharesTab} Opinion
        </Button>
      </div>
    </div>
  );
}
