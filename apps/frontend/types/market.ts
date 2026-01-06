export interface ITrade {
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
  status: "OPEN" | "CLOSED" | "RESOLVED";
}

export interface IPosition {
  id: string;
  createdAt: Date;
  marketId: string;
  noShares: string;
  updatedAt: Date;
  userId: string;
  yesShares: string;
}

interface TradesResponse {
  trades: ITrade[];
}

type YesNoBucket = {
  timestamp: string;
  yes: number;
  no: number;
};

export type ParticipationResponse = {
  yesTraders: number;
  noTraders: number;
};

interface Eligibility {
  participated: boolean;
  payoutStatus: "NOT_ELIGIBLE" | "ELIGIBLE" | "CLAIMED";
  payoutAmount: string;
}

export type FetchMarketResponse = IMarket;
export type FetchMarketTradesResponse = TradesResponse;
export type fetchUserTradesResponse = TradesResponse;
export type EligibilityResponse = Eligibility;