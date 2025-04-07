"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction, updateTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import { ReceiptScanner } from "./recipt-scanner";

export function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues:
      editMode && initialData
        ? {
            type: initialData.type,
            amount: initialData.amount.toString(),
            description: initialData.description,
            accountId: initialData.accountId,
            category: initialData.category,
            date: new Date(initialData.date),
            isRecurring: initialData.isRecurring,
            ...(initialData.recurringInterval && {
              recurringInterval: initialData.recurringInterval,
            }),
          }
        : {
            type: "EXPENSE",
            amount: "",
            description: "",
            accountId: accounts.find((ac) => ac.isDefault)?.id,
            date: new Date(),
            isRecurring: false,
          },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(editMode ? updateTransaction : createTransaction);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };

    if (editMode) {
      transactionFn(editId, formData);
    } else {
      transactionFn(formData);
    }
  };

  const handleScanComplete = (scannedData) => {
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt scanned successfully");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!editMode && (
        <div className="mb-6">
          <ReceiptScanner onScanComplete={handleScanComplete} />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Scan a receipt to auto-fill transaction details
          </p>
        </div>
      )}

      <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Transaction Type</label>
          <Select
            onValueChange={(value) => setValue("type", value)}
            defaultValue={type}
          >
            <SelectTrigger className="w-full border-2 border-indigo-100 bg-white text-lg font-medium">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="border-0 shadow-lg">
              <SelectItem 
                value="EXPENSE" 
                className="hover:bg-red-50 data-[state=checked]:bg-red-50"
              >
                <span className="text-red-600">Expense</span>
              </SelectItem>
              <SelectItem 
                value="INCOME" 
                className="hover:bg-green-50 data-[state=checked]:bg-green-50"
              >
                <span className="text-green-600">Income</span>
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-500">
              $
            </span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="pl-8 text-lg font-semibold"
              {...register("amount")}
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Account</label>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="w-full border-2 border-gray-100 bg-white text-lg">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent className="border-0 shadow-lg">
              {accounts.map((account) => (
                <SelectItem 
                  key={account.id} 
                  value={account.id}
                  className="hover:bg-indigo-50"
                >
                  <div className="flex items-center justify-between">
                    <span>{account.name}</span>
                    <span className="ml-2 font-mono text-sm text-gray-500">
                      ${parseFloat(account.balance).toFixed(2)}
                    </span>
                  </div>
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  variant="ghost"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-indigo-600 outline-none hover:bg-indigo-50 hover:text-indigo-700"
                >
                  + Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          defaultValue={getValues("category")}
        >
          <SelectTrigger className="border-2 border-gray-100 bg-white">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="border-0 shadow-lg">
            {filteredCategories.map((category) => (
              <SelectItem 
                key={category.id} 
                value={category.id}
                className="hover:bg-indigo-50"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full border-2 border-gray-100 bg-white pl-3 text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 text-indigo-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto border-0 p-0 shadow-xl" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => setValue("date", date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="border-0"
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <Input 
            placeholder="Enter description" 
            className="border-2 border-gray-100 bg-white"
            {...register("description")} 
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between rounded-lg border-2 border-gray-100 bg-white p-4">
        <div className="space-y-0.5">
          <label className="text-base font-medium text-gray-700">Recurring Transaction</label>
          <div className="text-sm text-gray-500">
            Set up a recurring schedule for this transaction
          </div>
        </div>
        <Switch
          checked={isRecurring}
          onCheckedChange={(checked) => setValue("isRecurring", checked)}
          className="data-[state=checked]:bg-indigo-600"
        />
      </div>

      {isRecurring && (
        <div className="space-y-2 rounded-lg bg-indigo-50 p-4">
          <label className="text-sm font-medium text-gray-700">Recurring Interval</label>
          <Select
            onValueChange={(value) => setValue("recurringInterval", value)}
            defaultValue={getValues("recurringInterval")}
          >
            <SelectTrigger className="border-2 border-indigo-100 bg-white">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent className="border-0 shadow-lg">
              <SelectItem value="DAILY" className="hover:bg-indigo-50">Daily</SelectItem>
              <SelectItem value="WEEKLY" className="hover:bg-indigo-50">Weekly</SelectItem>
              <SelectItem value="MONTHLY" className="hover:bg-indigo-50">Monthly</SelectItem>
              <SelectItem value="YEARLY" className="hover:bg-indigo-50">Yearly</SelectItem>
            </SelectContent>
          </Select>
          {errors.recurringInterval && (
            <p className="text-sm text-red-500">
              {errors.recurringInterval.message}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-center gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 md:w-auto"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:from-indigo-700 hover:to-purple-700 md:w-auto"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}