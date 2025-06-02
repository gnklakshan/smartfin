"use client";

import { endOfDay, format, startOfDay, subDays } from "date-fns";
import React, { PureComponent, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select";

const DATE_RANGES = {
  "7D": { Label: "Last 7 Days", days: 7 },
  "1M": { Label: "Last Month", days: 30 },
  "3M": { Label: "Last 3 Months", days: 90 },
  "6M": { Label: "Last 6 Months", days: 180 },
  ALL: { Label: "All Time", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    // Filter transactions based on the selected date range //here no date range mean it is all time
    const startDate = range.days
      ? startOfDay(subDays(now, range.days)) // Calculate start date based on the range
      : startOfDay(new Date(0)); // If no range, start from oldest possible date

    const filterd = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filterd.reduce(
      (acc, transaction) => {
        const date = format(new Date(transaction.date), "MMM-dd");

        if (!acc[date]) {
          acc[date] = { name: date, income: 0, expense: 0 };
        }

        if (transaction.type === "INCOME") {
          acc[date].income += transaction.amount;
        } else {
          acc[date].expense += transaction.amount;
        }

        return acc;
      },
      {} //initial acc is empty array
    );

    //convert to array and sort by date
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  const total = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 } // initial valu to reduce
    );
  }, [filteredData]);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-base font-normal">
          Transaction Overview
        </CardTitle>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { Label }]) => {
              return (
                <SelectItem key={key} value={key}>
                  {Label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-6 text-sm">
          <div>
            <div className="text-center">
              <p className="text-muted-foreground">Total Income</p>
              <p className="text-lg font-bold text-green-500">
                ${total.income.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <div className="text-center">
              <p className="text-muted-foreground">Total Expenses</p>
              <p className="text-lg font-bold text-red-500">
                ${total.expense.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <div className="text-center">
              <p className="text-muted-foreground">Net</p>
              <p
                className={`text-lg font-bold ${
                  total.income - total.expense >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                ${(total.income - total.expense).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, undefined]}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Bar
                dataKey="income"
                name="Income"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="Expense"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountChart;
