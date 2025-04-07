import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-10 px-6 py-10 bg-gray-100 min-h-screen">
      <div className="flex gap-6 items-end justify-between bg-white shadow-lg rounded-xl p-6">
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-800 capitalize">
            {account.name}
          </h1>
          <p className="text-gray-500">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold text-gray-800">
            ${parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-gray-500">
            {account._count.transactions} Transactions
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
          <AccountChart transactions={transactions} />
        </Suspense>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <Suspense
          fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
          <TransactionTable transactions={transactions} />
        </Suspense>
      </div>
    </div>
  );
}