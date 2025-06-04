import React from "react";
import CreateAccountDrawer from "@/components/createaccountdrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getUserAccounts } from "@/action/dashbord";
import { AccountCard } from "./_compoments/account-card";
import BudegetProgress from "./_compoments/budget-progress";
import { getCurrentBudget } from "@/action/budget";

const DashboardPage = async () => {
  const accounts = await getUserAccounts();

  const defaultAccount = accounts.find((account) => account.isDefault);

  let budgetData = null;

  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8">
      {/* // Budget progress  */}
      {defaultAccount && (
        <BudegetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      )}

      {/* // Overview  */}
      {/* // Account Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="w-10 h-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => {
            // return account.name;
            return <AccountCard key={account.id} account={account} />;
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
