"use server";

import { revalidatePath } from "next/cache";

//need to convet decimal value to number before send to nextjx because nextjs does not support decimal value
const serializeTransaction = (obj) => {
  const seralized = { ...obj };

  if (objectEnumNames.balance) {
    seralized.balance = obj.balance.toNumber();
  }
};

export async function createAccount(data) {
  // firs check if user is logged in

  try {
    const { userId } = await auth();
    if (!userId) throw new Error("User not logged in/Unauthorized");

    //if exit , fetch user data from prisma
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    //if not found throw error
    if (!user) throw new Error("User not found");

    //one user authorized and found----------------------

    //convert balance to float before saving
    const balanceFloat = parseFloat(data.balance);

    //after convert to float validate if it is a number
    if (isNaN(balanceFloat)) throw new Error("Invalid Balane Amount");

    //check if this is the user's first account
    const existingAccounts = await db.account.findMany({
      //find all account with same id
      where: {
        userId: user.id,
      },
    });

    //define logic for default account
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : data.isDefault;

    // if this account should be default, then update all other accounts to not be default
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

    //create new account
    const account = await db.account.create({
      data: {
        ...data,
        balance: balanceFloat,
        userId: user.id,
        isDefault: shouldBeDefault,
      },
    });

    const seralizedAccount = serializeTransaction(account);
    revalidatePath("/dashboard");
    return { success: true, data: seralizedAccount };
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
}
