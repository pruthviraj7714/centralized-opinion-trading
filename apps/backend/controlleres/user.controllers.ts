import { prisma } from "@repo/db";
import type { Request, Response } from "express";

const fetchUserOrdersController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const orders = await prisma.order.findMany({
      where: {
        userId,
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const fetchUserTradesController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const trades = await prisma.trade.findMany({
      where: {
        OR: [{ buyerId: userId }, { sellerId: userId }],
      },
    });

    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const fetchUserProfieController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        balance: true,
        lockedBalance: true,
        createdAt: true,
        email: true,
        username: true,
        updatedAt: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export { fetchUserOrdersController, fetchUserTradesController, fetchUserProfieController };
