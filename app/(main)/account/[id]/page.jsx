import { getAccountWithTransactions } from "@/action/account";
import { notFound } from "next/navigation";
import React from "react";

const AccountPage = async ({ params }) => {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transaction, ...account } = accountData;

  return (
    <div className="space-y-8 px-5 flex gap-4 items-end justify-between">
      <div>
        <h1 className="text-5xl sm:text-6xl font-bold gradient-title capitalize">
          {account.name}
        </h1>
        <p className="text-muted-foreground">
          {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
        </p>
      </div>
      <div className="text-right pb-2">
        <div className="text-xl sm:text-2xl font-bold">
          Rs {parseFloat(account.balance).toFixed(2)}
        </div>
        <p className="text-sm text-muted-foreground">
          {account._count.transaction} Transaction
        </p>
      </div>
      {/* chart section */}

      {/* Transaction Table */}
    </div>
  );
};

export default AccountPage;
