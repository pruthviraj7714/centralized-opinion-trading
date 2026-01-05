"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Button } from "./ui/button";

type YesNoBucket = {
  timestamp: string;
  yes: number;
  no: number;
};

interface Props {
  data: YesNoBucket[];
  setChartInterval: (interval: string) => void;
}

export default function ProbabilityChart({ data, setChartInterval }: Props) {
  return (
    <div className="w-full rounded-lg bg-zinc-900 p-4">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Probability Chart
      </h2>
      <div className="flex gap-1.5 items-center my-4">
        <Button
          className="cursor-pointer bg-zinc-600 hover:bg-zinc-700"
          onClick={() => setChartInterval("5m")}
        >
          5m
        </Button>
        <Button
          className="cursor-pointer bg-zinc-600 hover:bg-zinc-700"
          onClick={() => setChartInterval("10m")}
        >
          10m
        </Button>
        <Button
          className="cursor-pointer bg-zinc-600 hover:bg-zinc-700"
          onClick={() => setChartInterval("1h")}
        >
          1h
        </Button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />

            <XAxis
              dataKey="timestamp"
              stroke="#a1a1aa"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              stroke="#a1a1aa"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #3f3f46",
                borderRadius: 6,
                color: "#fff",
              }}
              labelFormatter={(label) => new Date(label).toLocaleString()}
            />

            <Line
              type="monotone"
              dataKey="yes"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              name="YES"
            />

            <Line
              type="monotone"
              dataKey="no"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              name="NO"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
