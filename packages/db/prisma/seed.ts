import { hash } from "bcryptjs";
import { prisma } from "..";
import { Prisma } from "../generated/prisma/client";

// Helper function to calculate constant product AMM price
function calculatePrice(yesPool: number, noPool: number): number {
  return noPool / (yesPool + noPool);
}

// Helper function to calculate shares received for a given amount
function calculateSharesOut(
  amountIn: number,
  inputPool: number,
  outputPool: number,
  feePercent: number
): number {
  const amountAfterFee = amountIn * (1 - feePercent / 100);
  const k = inputPool * outputPool;
  const newInputPool = inputPool + amountAfterFee;
  const newOutputPool = k / newInputPool;
  return outputPool - newOutputPool;
}

async function seedUsers() {
  const usernames = [
    "crypto_whale",
    "market_maven",
    "bull_runner",
    "bear_trader",
    "diamond_hands",
    "paper_hands",
    "degen_king",
    "value_investor",
    "momentum_trader",
    "contrarian_bet",
    "risk_taker",
    "safe_player",
    "day_trader",
    "hodl_master",
    "swing_trader",
  ];

  const hashedPassword = await hash("password123", 10);
  const users = [];

  for (const username of usernames) {
    const user = await prisma.user.create({
      data: {
        username,
        email: `${username}@example.com`,
        password: hashedPassword,
        role: "USER",
        balance: new Prisma.Decimal(
          Math.floor(Math.random() * 50000) + 10000
        ),
      },
    });
    users.push(user);
  }

  console.log(`${users.length} users seeded successfully`);
  return users;
}

async function seedMarkets(adminId: string) {
  const markets = [
    {
      opinion: "Will Bitcoin reach $100,000 by June 2026?",
      description:
        "Resolves YES if BTC/USD spot price reaches or exceeds $100,000 at any point before June 30, 2026, 23:59 UTC.",
      expiryTime: new Date("2026-06-30T23:59:00Z"),
      yesPool: new Prisma.Decimal(800000),
      noPool: new Prisma.Decimal(400000),
      feePercent: new Prisma.Decimal(0.3),
      userId: adminId,
    },
    {
      opinion: "Will SpaceX successfully launch Starship to Mars in 2026?",
      description:
        "Resolves YES if SpaceX completes a successful Mars-bound Starship launch in 2026.",
      expiryTime: new Date("2026-12-31T23:59:00Z"),
      yesPool: new Prisma.Decimal(250000),
      noPool: new Prisma.Decimal(750000),
      feePercent: new Prisma.Decimal(0.25),
      userId: adminId,
    },
    {
      opinion: "Will Apple release a foldable iPhone in 2026?",
      description:
        "Resolves YES if Apple officially announces or releases a foldable iPhone model in 2026.",
      expiryTime: new Date("2026-09-30T23:59:00Z"),
      yesPool: new Prisma.Decimal(150000),
      noPool: new Prisma.Decimal(850000),
      feePercent: new Prisma.Decimal(0.4),
      userId: adminId,
    },
    {
      opinion: "Will Ethereum flip Bitcoin by market cap in 2026?",
      description:
        "Resolves YES if Ethereum's market capitalization exceeds Bitcoin's at any point in 2026.",
      expiryTime: new Date("2026-12-31T23:59:00Z"),
      yesPool: new Prisma.Decimal(300000),
      noPool: new Prisma.Decimal(700000),
      feePercent: new Prisma.Decimal(0.3),
      userId: adminId,
    },
    {
      opinion: "Will AI achieve AGI by end of 2026?",
      description:
        "Resolves YES if a major AI lab announces or demonstrates artificial general intelligence by Dec 31, 2026.",
      expiryTime: new Date("2026-12-31T23:59:00Z"),
      yesPool: new Prisma.Decimal(100000),
      noPool: new Prisma.Decimal(900000),
      feePercent: new Prisma.Decimal(0.5),
      userId: adminId,
    },
    {
      opinion: "Will Tesla stock be above $500 by end of 2026?",
      description:
        "Resolves YES if TSLA closes above $500 on the last trading day of 2026.",
      expiryTime: new Date("2026-12-31T23:59:00Z"),
      yesPool: new Prisma.Decimal(600000),
      noPool: new Prisma.Decimal(600000),
      feePercent: new Prisma.Decimal(0.3),
      userId: adminId,
    },
  ];

  const createdMarkets = [];
  for (const market of markets) {
    const created = await prisma.market.create({
      data: market,
    });
    createdMarkets.push(created);
  }

  console.log("Markets seeded successfully");
  return createdMarkets;
}

async function seedTrades(users: any[], markets: any[]) {
  console.log("Seeding trades and positions...");

  const trades = [];
  const positions = new Map<string, any>();

  // Helper to get or create position
  const getPosition = (userId: string, marketId: string) => {
    const key = `${userId}-${marketId}`;
    if (!positions.has(key)) {
      positions.set(key, {
        userId,
        marketId,
        yesShares: new Prisma.Decimal(0),
        noShares: new Prisma.Decimal(0),
      });
    }
    return positions.get(key);
  };

  // Simulate 200+ trades across markets with varying activity
  const tradeScenarios = [
    // Bitcoin market - HIGH ACTIVITY with large movements
    {
      marketIndex: 0,
      trades: [
        // Initial buying pressure
        { userIndex: 0, side: "YES", amount: 50000 },
        { userIndex: 2, side: "YES", amount: 35000 },
        { userIndex: 4, side: "YES", amount: 25000 },
        { userIndex: 6, side: "YES", amount: 40000 },
        
        // Counter-trades
        { userIndex: 1, side: "NO", amount: 30000 },
        { userIndex: 3, side: "NO", amount: 20000 },
        
        // More YES accumulation
        { userIndex: 8, side: "YES", amount: 60000 },
        { userIndex: 10, side: "YES", amount: 45000 },
        { userIndex: 12, side: "YES", amount: 30000 },
        
        // Profit taking
        { userIndex: 0, side: "YES", amount: 15000 },
        { userIndex: 2, side: "YES", amount: 10000 },
        
        // Contrarian bets
        { userIndex: 5, side: "NO", amount: 40000 },
        { userIndex: 7, side: "NO", amount: 35000 },
        { userIndex: 9, side: "NO", amount: 25000 },
        
        // Final wave
        { userIndex: 11, side: "YES", amount: 20000 },
        { userIndex: 13, side: "YES", amount: 28000 },
        { userIndex: 14, side: "YES", amount: 22000 },
      ],
    },
    
    // SpaceX market - MEDIUM ACTIVITY
    {
      marketIndex: 1,
      trades: [
        { userIndex: 1, side: "NO", amount: 25000 },
        { userIndex: 3, side: "NO", amount: 30000 },
        { userIndex: 5, side: "NO", amount: 20000 },
        { userIndex: 7, side: "YES", amount: 15000 },
        { userIndex: 9, side: "YES", amount: 18000 },
        { userIndex: 11, side: "NO", amount: 35000 },
        { userIndex: 13, side: "NO", amount: 22000 },
        { userIndex: 0, side: "YES", amount: 12000 },
        { userIndex: 2, side: "NO", amount: 28000 },
        { userIndex: 4, side: "YES", amount: 10000 },
      ],
    },
    
    // Apple foldable - LOW ACTIVITY (skeptical market)
    {
      marketIndex: 2,
      trades: [
        { userIndex: 2, side: "NO", amount: 30000 },
        { userIndex: 4, side: "NO", amount: 25000 },
        { userIndex: 6, side: "NO", amount: 20000 },
        { userIndex: 8, side: "YES", amount: 8000 },
        { userIndex: 10, side: "NO", amount: 15000 },
        { userIndex: 12, side: "YES", amount: 5000 },
      ],
    },
    
    // ETH flipping BTC - HIGH VOLATILITY
    {
      marketIndex: 3,
      trades: [
        { userIndex: 1, side: "NO", amount: 35000 },
        { userIndex: 3, side: "YES", amount: 25000 },
        { userIndex: 5, side: "NO", amount: 30000 },
        { userIndex: 7, side: "YES", amount: 28000 },
        { userIndex: 9, side: "NO", amount: 40000 },
        { userIndex: 11, side: "YES", amount: 32000 },
        { userIndex: 13, side: "NO", amount: 25000 },
        { userIndex: 0, side: "YES", amount: 20000 },
        { userIndex: 2, side: "NO", amount: 35000 },
        { userIndex: 4, side: "YES", amount: 30000 },
        { userIndex: 6, side: "NO", amount: 28000 },
        { userIndex: 8, side: "YES", amount: 22000 },
      ],
    },
    
    // AGI market - SPECULATIVE
    {
      marketIndex: 4,
      trades: [
        { userIndex: 0, side: "NO", amount: 40000 },
        { userIndex: 2, side: "YES", amount: 15000 },
        { userIndex: 4, side: "NO", amount: 35000 },
        { userIndex: 6, side: "YES", amount: 12000 },
        { userIndex: 8, side: "NO", amount: 30000 },
        { userIndex: 10, side: "YES", amount: 8000 },
        { userIndex: 12, side: "NO", amount: 25000 },
      ],
    },
    
    // Tesla stock - BALANCED with large swings
    {
      marketIndex: 5,
      trades: [
        { userIndex: 1, side: "YES", amount: 45000 },
        { userIndex: 3, side: "NO", amount: 40000 },
        { userIndex: 5, side: "YES", amount: 38000 },
        { userIndex: 7, side: "NO", amount: 35000 },
        { userIndex: 9, side: "YES", amount: 42000 },
        { userIndex: 11, side: "NO", amount: 38000 },
        { userIndex: 13, side: "YES", amount: 30000 },
        { userIndex: 0, side: "NO", amount: 32000 },
        { userIndex: 2, side: "YES", amount: 28000 },
        { userIndex: 4, side: "NO", amount: 35000 },
        { userIndex: 6, side: "YES", amount: 25000 },
        { userIndex: 8, side: "NO", amount: 30000 },
        { userIndex: 10, side: "YES", amount: 33000 },
        { userIndex: 12, side: "NO", amount: 27000 },
      ],
    },
  ];

  for (const scenario of tradeScenarios) {
    const market = markets[scenario.marketIndex];
    let currentYesPool = parseFloat(market.yesPool.toString());
    let currentNoPool = parseFloat(market.noPool.toString());
    const feePercent = parseFloat(market.feePercent.toString());

    for (const tradeSpec of scenario.trades) {
      const user = users[tradeSpec.userIndex];
      const side = tradeSpec.side as "YES" | "NO";
      const amountIn = tradeSpec.amount;

      const inputPool = side === "YES" ? currentNoPool : currentYesPool;
      const outputPool = side === "YES" ? currentYesPool : currentNoPool;

      const sharesOut = calculateSharesOut(
        amountIn,
        inputPool,
        outputPool,
        feePercent
      );

      const price = calculatePrice(currentYesPool, currentNoPool);

      // Update pools
      if (side === "YES") {
        currentNoPool += amountIn * (1 - feePercent / 100);
        currentYesPool -= sharesOut;
      } else {
        currentYesPool += amountIn * (1 - feePercent / 100);
        currentNoPool -= sharesOut;
      }

      trades.push({
        userId: user.id,
        marketId: market.id,
        side,
        action: "BUY",
        amountIn: new Prisma.Decimal(amountIn),
        amountOut: new Prisma.Decimal(sharesOut),
        price: new Prisma.Decimal(price),
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      });

      // Update position
      const position = getPosition(user.id, market.id);
      if (side === "YES") {
        position.yesShares = new Prisma.Decimal(
          parseFloat(position.yesShares.toString()) + sharesOut
        );
      } else {
        position.noShares = new Prisma.Decimal(
          parseFloat(position.noShares.toString()) + sharesOut
        );
      }

      // Platform fee
      trades.push({
        userId: user.id,
        marketId: market.id,
        side,
        action: "BUY",
        amountIn: new Prisma.Decimal(amountIn),
        amountOut: new Prisma.Decimal(sharesOut),
        price: new Prisma.Decimal(price),
        createdAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ),
      });
    }

    // Update market pools
    await prisma.market.update({
      where: { id: market.id },
      data: {
        yesPool: new Prisma.Decimal(currentYesPool),
        noPool: new Prisma.Decimal(currentNoPool),
      },
    });
  }

  // Create trades
  for (const trade of trades) {
    await prisma.trade.create({ data: trade });
  }

  // Create positions
  for (const [, position] of positions) {
    if (
      parseFloat(position.yesShares.toString()) > 0 ||
      parseFloat(position.noShares.toString()) > 0
    ) {
      await prisma.position.create({ data: position });
    }
  }

  console.log(`${trades.length} trades and positions seeded successfully`);
}

async function seedDB() {
  await prisma.platformFee.deleteMany({});
  await prisma.trade.deleteMany({});
  await prisma.position.deleteMany({});
  await prisma.market.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Cleared existing data");

  const hashedPassword = await hash(process.env.ADMIN_PASSWORD || "", 10);

  const admin = await prisma.user.create({
    data: {
      username: process.env.ADMIN_USERNAME || "",
      password: hashedPassword,
      email: process.env.ADMIN_EMAIL || "",
      role: "ADMIN",
      balance: new Prisma.Decimal(1000000),
    },
  });

  console.log("Admin seeded");

  const users = await seedUsers();
  const markets = await seedMarkets(admin.id);
  await seedTrades(users, markets);

  console.log("Database seeded successfully!");
}

seedDB();