import { prisma } from "@repo/db";
import { CreateMarketSchema } from "@repo/shared";
import type { Request, Response } from "express";

const createMarketController = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = CreateMarketSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({
        message: "Invalid Inputs",
        error: error.message,
      });
      return;
    }

    const userId = req.user?.id!;

    const { description, expiryTime, opinion, resolvedOutcome, status } = data;

    const market = await prisma.market.create({
      data: {
        description,
        expiryTime,
        opinion,
        resolvedOutcome,
        status,
        userId,
      },
    });

    res.status(201).json({
      message: "Market Successfully Created",
      id: market.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { createMarketController };
