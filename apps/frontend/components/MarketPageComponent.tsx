"use client";

import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Decimal from "decimal.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import ProbabilityChart from "./ProbabilityChart";
import YesNoDonutChart from "./ParticipationChart";
import { TradingCard } from "./TradingCard";

interface IMarket {
  opinion: string;
  description: string;
  expiryTime: string;
  yesPool: string;
  noPool: string;
  adminId: string;
  probability: {
    yes: string;
    no: string;
  };
  noOfTraders: number;
  trades: ITrade[];
}

type FetchMarketResponse = IMarket;

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
  action: "BUY" | "SELL";
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

interface FetchUserBalanceResponse {
  balance: Decimal;
}

type YesNoBucket = {
  timestamp: string;
  yes: number;
  no: number;
};

type ParticipationResponse = {
  yesTraders: number;
  noTraders: number;
};

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
  const [position, setPosition] = useState<IPosition | null>(null);
  const [trades, setTrades] = useState<ITrade[]>([]);
  const [balance, setBalance] = useState<Decimal>(new Decimal(0));
  const [marketTrades, setMarketTrades] = useState<ITrade[]>([]);
  const [probabilityChartData, setProbabilityChartData] = useState<
    YesNoBucket[]
  >([]);
  const [participationChartData, setParticipationChartData] =
    useState<ParticipationResponse>({
      yesTraders: 0,
      noTraders: 0,
    });
  const [chartInterval, setChartInterval] = useState("5m");

  const fetchUserBalance = async () => {
    if (!data || !data.accessToken) return;
    try {
      const res = await axios.get<FetchUserBalanceResponse>(
        `${BACKEND_URL}/user/balance`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );

      setBalance(res.data.balance);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

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

      setMarketData(res.data);
      setMarketTrades(res.data.trades);
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
      fetchUserBalance();
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
      newNoPool = new Decimal(marketData.noPool).plus(amount);
      newYesPool = k.div(newNoPool);
      amountToBeRecieved = new Decimal(marketData.yesPool).minus(newYesPool);
    } else if (currentTab === "BUY" && currentSharesTab === "NO") {
      newYesPool = new Decimal(marketData.yesPool).plus(amount);
      newNoPool = k.div(newYesPool);
      amountToBeRecieved = new Decimal(marketData.noPool).minus(newNoPool);
    } else if (currentTab === "SELL" && currentSharesTab === "YES") {
      newYesPool = new Decimal(marketData.yesPool).plus(amount);
      newNoPool = k.div(newYesPool);
      amountToBeRecieved = new Decimal(marketData.noPool).minus(newNoPool);
    } else if (currentTab === "SELL" && currentSharesTab === "NO") {
      newNoPool = new Decimal(marketData.noPool).plus(amount);
      newYesPool = k.div(newNoPool);
      amountToBeRecieved = new Decimal(marketData.yesPool).minus(newYesPool);
    }

    setAmountToRecieve(amountToBeRecieved || new Decimal(0));
  };

  const fetchUserPositionAndTrades = async () => {
    try {
      const res = await axios.get<FetchUserPositionAndTradesResponse>(
        `${BACKEND_URL}/user/${marketId}/position-and-trades`,
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );

      setTrades(res.data.data.trades);
      setPosition(res.data.data.position);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message, {
        position: "top-center",
      });
    }
  };

  const handleMax = () => {
    if (!position) return;

    if (currentTab === "BUY") {
      setAmount(balance.toString());
    } else {
      if (currentSharesTab === "YES") {
        setAmount((position.yesShares || 0).toString());
      } else {
        setAmount((position.noShares || 0).toString());
      }
    }
  };

  const fetchProbabilityChartData = async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/markets/${marketId}/charts/probability?interval=${chartInterval}`,
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );
      setProbabilityChartData(res.data.points);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message, {
        position: "top-center",
      });
    }
  };

  const fetchParticipationChartData = async () => {
    try {
      const res = await axios.get<ParticipationResponse>(
        `${BACKEND_URL}/markets/${marketId}/charts/participation`,
        {
          headers: {
            Authorization: `Bearer ${data?.accessToken}`,
          },
        }
      );
      setParticipationChartData(res.data);
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
      fetchUserBalance();
    }
  }, [marketId, status]);

  useEffect(() => {
    if (marketId && status === "authenticated") {
      fetchProbabilityChartData();
      fetchParticipationChartData();
    }
  }, [marketId, status, chartInterval]);

  useEffect(() => {
    if (!amount || amount.length === 0) return;

    let timeout = setTimeout(() => {
      handleCalculateRecievingAmount();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [amount, currentSharesTab, currentTab, marketData]);

  if (!marketData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  const expiryDate = new Date(marketData.expiryTime);

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Market Trading</h1>
          <p className="text-zinc-400">
            Trade on prediction markets with real-time probability insights
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              {marketData.opinion}
            </h2>
            <p className="text-zinc-300">{marketData.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Active Traders:</span>
              <span className="font-semibold text-white">
                {marketData.noOfTraders.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Expires:</span>
              <span className="font-semibold text-white">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(expiryDate)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Pool:</span>
              <span className="font-semibold text-white">
                YES: {marketData.yesPool} | NO: {marketData.noPool}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur p-6">
           
            <ProbabilityChart data={probabilityChartData} setChartInterval={setChartInterval} />
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Liquidity Distribution
            </h3>
            <div className="space-y-3">
              <div className="flex h-8 rounded-lg overflow-hidden bg-zinc-900/50 border border-zinc-700">
                <div
                  className="bg-emerald-500/80 transition-all duration-300"
                  style={{ width: `${marketData.probability.yes}%` }}
                />
                <div
                  className="bg-red-500/80 transition-all duration-300"
                  style={{ width: `${marketData.probability.no}%` }}
                />
              </div>
              <div className="flex justify-between text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-white">
                    YES {Number(marketData.probability.yes).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-white">
                    NO {Number(marketData.probability.no).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TradingCard
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            currentSharesTab={currentSharesTab}
            setCurrentSharesTab={setCurrentSharesTab}
            amount={amount}
            setAmount={setAmount}
            balance={balance.toString()}
            amountToRecieve={amountToRecieve}
            onMax={handleMax}
            onTrade={handlePlaceTrade}
          />

          <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">Your Position</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-700">
                <p className="text-sm text-zinc-400 mb-1">YES Shares</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {position?.yesShares ?? 0}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-700">
                <p className="text-sm text-zinc-400 mb-1">NO Shares</p>
                <p className="text-2xl font-bold text-red-400">
                  {position?.noShares ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur p-6 overflow-hidden">
          <h3 className="text-lg font-semibold text-white mb-4">Your Trades</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-700 hover:bg-zinc-700/30">
                  <TableHead className="text-zinc-300">Action</TableHead>
                  <TableHead className="text-zinc-300">Side</TableHead>
                  <TableHead className="text-zinc-300">Amount In</TableHead>
                  <TableHead className="text-zinc-300">Amount Out</TableHead>
                  <TableHead className="text-zinc-300">Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades && trades.length > 0 ? (
                  trades.map((trade) => (
                    <TableRow
                      key={trade.id}
                      className="border-zinc-700 hover:bg-zinc-700/30"
                    >
                      <TableCell className="font-medium text-white">
                        {trade.action}
                      </TableCell>
                      <TableCell className="font-medium">
                        <span
                          className={
                            trade.side === "YES"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }
                        >
                          {trade.side}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {trade.amountIn}
                      </TableCell>
                      <TableCell className="font-medium text-white">
                        {trade.amountOut}
                      </TableCell>
                      <TableCell className="font-medium text-zinc-300">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(trade.createdAt))}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-zinc-700">
                    <TableCell colSpan={5} className="text-center py-8">
                      <p className="text-zinc-400">No trades yet</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Trader Distribution
          </h3>
          <div className="flex items-center justify-center h-80 rounded-lg bg-zinc-900/50">
            <YesNoDonutChart
              yesTraders={participationChartData.yesTraders}
              noTraders={participationChartData.noTraders}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
