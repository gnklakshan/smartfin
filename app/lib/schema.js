import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  type: z.enum(["CURRENT", "SAVINGS"]),
  balance: z.string().min(1, "Balance is Required"),
  isDefault: z.boolean(false),
});

export const transactionSchema = z
  .object({
    accountId: z.string().min(1, "Account is Required"),
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.string().min(1, "Amount is Required"),
    date: z.string().min(1, "Date is Required"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is Required"),
    isRecurring: z.boolean().default(false),
    recurringIntrerval: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isRecurring && !data.recurringIntrerval) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurring interval is required when isRecurring is true",
        path: ["recurringIntrerval"],
      });
    }
  });
