import {
  ArrowDownLeft,
  ArrowUpRight,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tradeDetails: {
    action: "BUY" | "SELL";
    side: "YES" | "NO";
    amount: string;
    fee: string;
    finalAmount: string;
    receiving: string;
    marketOpinion: string;
  };
  isProcessing: boolean;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  tradeDetails,
  isProcessing,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const { action, side, amount, fee, finalAmount, receiving, marketOpinion } =
    tradeDetails;
  const isBuy = action === "BUY";
  const isYes = side === "YES";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl shadow-zinc-950/50 overflow-hidden">
        <div
          className={`relative px-6 py-4 border-b border-zinc-800 ${
            isBuy ? "bg-blue-600/10" : "bg-orange-600/10"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  isBuy ? "bg-blue-500/20" : "bg-orange-500/20"
                }`}
              >
                {isBuy ? (
                  <ArrowDownLeft
                    className={`h-5 w-5 ${isBuy ? "text-blue-400" : "text-orange-400"}`}
                  />
                ) : (
                  <ArrowUpRight className={`h-5 w-5 text-orange-400`} />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100">
                  Confirm {action}
                </h3>
                <p className="text-xs text-zinc-400">{side} shares</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="h-8 w-8 rounded-lg hover:bg-zinc-800 flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5 text-zinc-400" />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="rounded-lg bg-zinc-800/50 border border-zinc-700/50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
              Market
            </p>
            <p className="text-sm text-zinc-100 font-medium line-clamp-2">
              {marketOpinion}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Action</span>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  isBuy
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-orange-500/20 text-orange-400"
                }`}
              >
                {isBuy ? (
                  <ArrowDownLeft className="h-3 w-3" />
                ) : (
                  <ArrowUpRight className="h-3 w-3" />
                )}
                {action}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Side</span>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  isYes
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {side}
              </span>
            </div>

            <div className="h-px bg-zinc-800" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Amount</span>
              <span className="text-sm font-semibold text-zinc-100">
                ${amount}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Market Fee</span>
              <span className="text-sm font-semibold text-red-400">
                -${fee}
              </span>
            </div>

            <div className="h-px bg-zinc-800" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">
                Final Amount
              </span>
              <span className="text-sm font-bold text-zinc-100">
                ${finalAmount}
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-linear-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-300">
                You'll receive
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ≈ {receiving}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isBuy
                      ? isYes
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {isBuy ? (isYes ? "YES" : "NO") : "USD"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-300">
                This action cannot be undone. Please review all details before
                confirming.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-zinc-800/50 border-t border-zinc-800 flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isProcessing}
            className={`flex-1 px-4 py-3 font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              isBuy
                ? "bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                : "bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
            } text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isProcessing ? (
              <>
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Confirm {action}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// export function TradingCard({
//   currentTab,
//   setCurrentTab,
//   currentSharesTab,
//   setCurrentSharesTab,
//   amount,
//   setAmount,
//   calculateFee,
//   calculateFinal,
//   calculateFinalReceivingAmount,
//   balance,
//   amountToReceive,
//   onMax,
//   onTrade,
//   platformFees,
// }) {
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const isBuy = currentTab === "BUY";
//   const isYes = currentSharesTab === "YES";

//   const handleTradeClick = () => {
//     if (!amount || Number(amount) <= 0) return;
//     setShowConfirmation(true);
//   };

//   return (
//     <>
//       <div className="rounded-2xl bg-zinc-800 p-6 sm:p-8 border border-zinc-700">
//         <div className="mb-8 flex items-center justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-zinc-100">Place Trade</h2>
//             <p className="mt-1 text-sm text-zinc-400">
//               {isBuy ? "Buy shares at current price" : "Sell your shares"}
//             </p>
//           </div>
//           <div className={`rounded-full p-3 ${isBuy ? "bg-blue-500/10" : "bg-orange-500/10"}`}>
//             {isBuy ? (
//               <ArrowDownLeft className="h-6 w-6 text-blue-400" />
//             ) : (
//               <ArrowUpRight className="h-6 w-6 text-orange-400" />
//             )}
//           </div>
//         </div>

//         <div className="space-y-4 mb-8">
//           <div className="flex gap-2">
//             {["BUY", "SELL"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setCurrentTab(tab)}
//                 className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all duration-200 border ${
//                   currentTab === tab
//                     ? tab === "BUY"
//                       ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
//                       : "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-500/20"
//                     : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           <div className="flex gap-2">
//             {["YES", "NO"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setCurrentSharesTab(tab)}
//                 className={`flex-1 py-3 px-4 font-semibold rounded-lg transition-all duration-200 border ${
//                   currentSharesTab === tab
//                     ? tab === "YES"
//                       ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20"
//                       : "bg-red-600 text-white border-red-600 shadow-lg shadow-red-500/20"
//                     : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mb-8 rounded-lg bg-zinc-900 border border-zinc-700 p-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
//                 Available Balance
//               </p>
//               <p className="mt-2 text-3xl font-bold text-zinc-100">
//                 ${balance || "0.00"}
//               </p>
//             </div>
//             <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
//               <span className="text-2xl">⚡</span>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4 mb-8">
//           <div className="flex items-center justify-between">
//             <label className="text-sm font-semibold text-zinc-100">
//               {isBuy ? `Amount to ${currentTab} ${currentSharesTab}` : `${currentTab} ${currentSharesTab}`}
//             </label>
//             <button
//               onClick={onMax}
//               className="text-xs font-semibold bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-1.5 rounded-full transition-all hover:scale-105"
//             >
//               MAX
//             </button>
//           </div>

//           <input
//             type="number"
//             min={0}
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="0.00"
//             className="w-full text-lg font-semibold h-12 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all px-4 outline-none"
//           />

//           <div className="rounded-lg bg-zinc-900 border border-zinc-700 p-3 hover:border-zinc-600 transition-colors">
//             <p className="text-sm text-zinc-400">
//               Market fees: <span className="font-semibold text-zinc-100">{platformFees}%</span>
//             </p>
//           </div>

//           <div className="rounded-lg bg-zinc-900 border border-zinc-700 p-3 space-y-2 hover:border-zinc-600 transition-colors">
//             <div className="flex justify-between text-sm">
//               <span className="text-zinc-400">Amount:</span>
//               <span className="font-semibold text-zinc-100">
//                 ${(isBuy ? amount : amountToReceive) || "0.00"}
//               </span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-zinc-400">Market fees:</span>
//               <span className="font-semibold text-red-400">-${calculateFee()}</span>
//             </div>
//             <div className="pt-2 border-t border-zinc-700">
//               <div className="flex justify-between">
//                 <span className="text-sm text-zinc-400">Final amount:</span>
//                 <span className="font-semibold text-zinc-100">${calculateFinal()}</span>
//               </div>
//             </div>
//           </div>

//           <div className="group relative rounded-xl bg-linear-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5 border border-purple-500/20 p-4 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
//             <div className="absolute inset-0 rounded-xl bg-linear-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />
//             <div className="relative flex items-center justify-between">
//               <p className="text-sm text-zinc-400 font-medium">You'll receive</p>
//               <div className="flex items-baseline gap-2">
//                 <span className="text-lg font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                   ≈ {calculateFinalReceivingAmount()}
//                 </span>
//                 <span className={`text-sm font-semibold px-2.5 py-0.5 rounded-full ${
//                   isBuy
//                     ? isYes
//                       ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30"
//                       : "bg-red-500/20 text-red-400 ring-1 ring-red-500/30"
//                     : "bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/30"
//                 }`}>
//                   {isBuy ? (isYes ? "Yes Shares" : "No Shares") : "USD"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={handleTradeClick}
//           disabled={!amount || Number(amount) <= 0}
//           className={`w-full py-6 font-semibold text-base text-white rounded-lg transition-all duration-200 ${
//             currentTab === "BUY"
//               ? "bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500"
//               : "bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500"
//           }`}
//         >
//           {currentTab} {currentSharesTab}
//         </button>
//       </div>

//     </>
//   );
// }
