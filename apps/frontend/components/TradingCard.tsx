"use client"

import { Decimal } from "decimal.js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownLeft, ArrowUpRight, Zap } from "lucide-react"

interface TradingCardProps {
  currentTab: "BUY" | "SELL"
  setCurrentTab: (tab: "BUY" | "SELL") => void
  currentSharesTab: "YES" | "NO"
  setCurrentSharesTab: (tab: "YES" | "NO") => void
  amount: string
  setAmount: (amount: string) => void
  balance: string
  amountToRecieve: string
  onMax: () => void
  onTrade: () => void
}

export function TradingCard({
  currentTab,
  setCurrentTab,
  currentSharesTab,
  setCurrentSharesTab,
  amount,
  setAmount,
  balance,
  amountToRecieve,
  onMax,
  onTrade,
}: TradingCardProps) {
  const isBuy = currentTab === "BUY"
  const isYes = currentSharesTab === "YES"

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground">Place Trade</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isBuy ? "Buy shares at current price" : "Sell your shares"}
        </p>
      </div>
      <div className={`rounded-full p-3 ${isBuy ? "bg-blue-500/10" : "bg-orange-500/10"}`}>
        {isBuy ? (
          <ArrowDownLeft className={`h-6 w-6 ${isBuy ? "text-blue-500" : "text-orange-500"}`} />
        ) : (
          <ArrowUpRight className={`h-6 w-6 ${isBuy ? "text-blue-500" : "text-orange-500"}`} />
        )}
      </div>
    </div>

    <div className="space-y-4 mb-8">
      <div className="flex gap-2">
        {(["BUY", "SELL"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all duration-200 border ${
              currentTab === tab
                ? tab === "BUY"
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-500/20"
                : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {(["YES", "NO"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentSharesTab(tab)}
            className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all duration-200 border ${
              currentSharesTab === tab
                ? tab === "YES"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20"
                  : "bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/20"
                : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>

    <div className="mb-8 rounded-lg bg-secondary/50 border border-border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Available Balance</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">${new Decimal(balance).toFixed(2)}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Zap className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>

    <div className="space-y-4 mb-8">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-card-foreground">
          Amount to {currentTab} {currentSharesTab}
        </label>
        <button
          onClick={onMax}
          className="text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full transition-colors"
        >
          MAX
        </button>
      </div>
      <Input
        type="number"
        min={0}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        className="text-lg font-semibold h-12 bg-secondary border-border text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/30"
      />
      <div className="rounded-lg bg-secondary/50 border border-border p-3">
        <p className="text-sm text-muted-foreground">
          You&apos;ll receive ≈ <span className="font-semibold text-card-foreground">{amountToRecieve}</span>
        </p>
      </div>
    </div>

    <Button
      onClick={onTrade}
      disabled={!amount || Number(amount) <= 0}
      className={`w-full py-6 font-semibold text-base rounded-lg transition-all duration-200 ${
        currentTab === "BUY"
          ? "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:text-white/70"
          : "bg-orange-600 hover:bg-orange-700 disabled:bg-orange-600/50 disabled:text-white/70"
      }`}
    >
      {currentTab} {currentSharesTab}
    </Button>
  </div>
  )
}
