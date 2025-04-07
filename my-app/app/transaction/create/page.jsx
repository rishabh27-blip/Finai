import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";

export default async function AddTransactionPage({ searchParams = {} }) {
  const accounts = await getUserAccounts();
  const editId = searchParams.edit || null;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full">
        <div className="flex justify-center md:justify-start mb-8">
          <h1 className="text-6xl justify-center font-bold text-gray-800">
            {editId ? "Edit Transaction" : "Add Transaction"}
          </h1>
        </div>
        <AddTransactionForm
          
          accounts={accounts}
          categories={defaultCategories}
          editMode={!!editId}
          initialData={initialData}
        />
      </div>
    </div>
  );
}