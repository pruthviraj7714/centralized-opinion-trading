import Decimal from "decimal.js";
import { IPosition } from "./market";

export type FetchUserPositionResponse = IPosition;
  
export interface FetchUserBalanceResponse {
    balance: Decimal;
  }