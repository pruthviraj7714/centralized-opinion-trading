import { prisma } from "@repo/db";
import type { Request, Response } from "express";

const getMarketsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const markets = await prisma.market.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "asc",
      },
    });

    const totalMarkets = await prisma.market.count();

    res.status(200).json({
      page,
      limit,
      markets,
      totalMarkets,
      totalPages: Math.floor(totalMarkets / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getMarketByIdController = async (req: Request, res: Response) => {
  try {
    const marketId = req.params.marketId;

    const market = await prisma.market.findFirst({
      where: {
        id: marketId,
      },
    });

    if (!market) {
      res.status(400).json({
        message: "Market not found!",
      });
      return;
    }

    res.status(200).json({
      data: market,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getMarketTrades = async (req: Request, res: Response) => {
  try {
    const marketId = req.params.marketId;

    const trades = await prisma.trade.findMany({
      where: {
        marketId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: trades || [],
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { getMarketsController, getMarketByIdController, getMarketTrades };
