import { endOfMonth, startOfMonth } from "date-fns";
import { db } from "../prisma";
import { inngest } from "./client";

export const checkBudgetAlert = inngest.createFunction(
  { name: "Check Budget Alert" },
  { cron: "0 */6 * * *" }, // Runs every 6 hours
  async ({ step }) => {
    const budgets = await step.run("Fetch Budget", async () => {
      // Simulate fetching budget from a database or API
      return db.budget.findMany({
        include: {
          user: {
            accounts: {
              where: {
                isDefault: true,
              },
            },
          },
        },
      });
    });

    for (budget of budgets) {
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) {
        continue; // Skip if no default account
      }

      await step.run(`Check Budget-${budget.id}`, async () => {
        const startDate = new Date();
        startDate.setDate(1); //start of current month

        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            accountId: defaultAccount.id,
            type: "EXPENSE",
            date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
          _sum: {
            amount: true,
          },
        });

        const totalExpenses = expenses._sum.amount?.toNumber() || 0;
        const budgetAmount = budget.amount;
        const precentageUsed = (totalExpenses / budgetAmount) * 100;

        if (
          precentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(new Date(budget.lastAlertSent), new Date()))
        ) {
          // sent email

          // update lastAlertSent in DB
          await db.budget.update({
            where: { id: budget.id },
            data: { lastAlertSent: new Date() },
          });
        }
      });
    }
  }
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getMonth() !== currentDate.getMonth() ||
    lastAlertDate.getFullYear() !== currentDate.getFullYear()
  );
}
