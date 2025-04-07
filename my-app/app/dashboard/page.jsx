import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import { Suspense } from "react";
import { Spinner } from "./_components/spinner";
import { PulseLoader } from "./_components/pulse-loader";
import { ShimmerLoader } from "./_components/shimmer-loader";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  return (
    <div className="space-y-8 px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Welcome back! Here's your financial overview
          </p>
        </div>
      </div>

      {/* Top Cards Row - Using Pulse Loader for demo */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PulseLoader className="h-[200px]" />
          <PulseLoader className="h-[200px]" />
        </div>
      }>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Budget Progress */}
          <Card className="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Monthly Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetProgress
                initialBudget={budgetData?.budget}
                currentExpenses={budgetData?.currentExpenses || 0}
              />
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card className="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Accounts</p>
                <p className="text-2xl font-bold text-gray-800">{accounts.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transactions</p>
                <p className="text-2xl font-bold text-gray-800">{transactions?.length || 0}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Suspense>

      {/* Dashboard Overview - Using Shimmer Loader for demo */}
      <Suspense fallback={<ShimmerLoader className="h-[400px]" />}>
        <Card className="bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              Financial Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardOverview
              accounts={accounts}
              transactions={transactions || []}
            />
          </CardContent>
        </Card>
      </Suspense>

      {/* Accounts Section - Using Spinner for demo */}
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Your Accounts
        </h2>
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-center h-[180px]">
                <Spinner size="lg" />
              </div>
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <CreateAccountDrawer>
              <Card className="hover:cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-in-out border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center h-full min-h-[180px] group">
                <CardContent className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="bg-gray-100 group-hover:bg-gray-200 rounded-full p-3 transition-colors duration-200">
                    <Plus className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mt-3">Add New Account</p>
                </CardContent>
              </Card>
            </CreateAccountDrawer>
            
            {accounts.length > 0 &&
              accounts?.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
}