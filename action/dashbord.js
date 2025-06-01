"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// Convert decimal value to number before sending to Next.js because Next.js does not support decimal value
const serializeTransaction = (obj) => {
  const serialized = { ...obj };

  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
    serialized.amount = obj.balance.toNumber();
  }

  return serialized;
};

export async function createAccount(data) {
  try {
    // Convert balance to float before saving
    const balanceFloat = parseFloat(data.balance);

    // Validate if it is a number
    if (isNaN(balanceFloat)) throw new Error("Invalid Balance Amount");

    // First check if user is logged in
    const { userId } = await auth();
    if (!userId) throw new Error("User not logged in/Unauthorized");

    // Fetch user data from Prisma
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    // If not found, throw error
    if (!user) throw new Error("User not found");

    // Check if this is the user's first account
    const existingAccounts = await db.account.findMany({
      where: {
        userId: user.id,
      },
    });

    // Define logic for default account
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    // If this account should be default, then update all other accounts to not be default
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: {
          userId: user.id,
        },
        data: {
          isDefault: false,
        },
      });
    }

    // Create new account
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = serializeTransaction(account);
    revalidatePath("/dashboard");
    return { success: true, data: serializedAccount };
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}

export async function getUserAccounts() {
  const { userId } = await auth();
  if (!userId) throw new Error("User not logged in/Unauthorized");

  // Fetch user data from Prisma
  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  // If not found, throw error
  if (!user) throw new Error("User not found");

  const accounts = await db.account.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          transactions: true,
        },
      },
    },
  });

  const serializedAccount = accounts.map(serializeTransaction);

  return serializedAccount;
}
