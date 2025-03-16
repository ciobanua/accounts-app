"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  updateAccount,
  updateAccountsList,
  updateTransaction,
  resetTransaction,
} from "@/lib/features/accounts/accountsSlice";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useEffect } from "react";
import { formatBalance, computeCreditAmount } from "@/app/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormError from "@/components/custom/FormError";
import { Button } from "../ui/button";
import { Account } from "./ListAccounts";
import { CurrencyType } from "@/app/utils";

export default function PerformTransaction({
  accountsProps,
}: {
  accountsProps: Account[];
}) {
  const dispatch = useAppDispatch();
  const t = useTranslations("transaction");
  const accounts = useAppSelector((state) => state.accounts.accountsList);
  const transaction = useAppSelector((state) => state.accounts.transaction);

  const selectAccount = (
    field: "debitAccount" | "creditAccount",
    value: string
  ) => {
    dispatch(updateTransaction({ field, value: value }));
  };

  const getAccount = (field: "debitAccount" | "creditAccount"): Account =>
    accounts.find((acc) => acc.id === Number(transaction[field])) as Account;

  const debitAccount = getAccount("debitAccount");
  const creditAccount = getAccount("creditAccount");

  const insufficintBalance =
    !!debitAccount &&
    !!transaction.amount &&
    debitAccount?.balance < Number(transaction?.amount);

  const performTransaction = () => {
    const creditAmount = computeCreditAmount(
      Number(transaction.amount),
      debitAccount?.currency as CurrencyType,
      creditAccount?.currency as CurrencyType
    );

    const debitAccountAfterTransaction: Account = {
      ...debitAccount,
      balance: debitAccount?.balance - Number(transaction.amount),
    };

    const creditAccountAfterTransaction = {
      ...creditAccount,
      balance: creditAccount?.balance + creditAmount,
    };

    dispatch(updateAccount(debitAccountAfterTransaction));
    dispatch(updateAccount(creditAccountAfterTransaction));
    dispatch(resetTransaction());
  };

  useEffect(() => {
    dispatch(updateAccountsList(accountsProps));
  }, [accountsProps, dispatch]);

  return (
    <>
      <form className="space-y-4 mx-8 bg-white text-black p-4 rounded-md">
        <div className="space-y-2">
          <Label htmlFor="debitAccount">{t("debitAccount")}</Label>
          <Select
            //   id="ownerId"
            name="debitAccount"
            value={transaction.debitAccount}
            onValueChange={(value) => selectAccount("debitAccount", value)}
          >
            <SelectTrigger className="w-full focus:outline-none">
              {debitAccount && (
                <div>
                  {debitAccount?.ownerId +
                    " - " +
                    debitAccount?.currency +
                    " - " +
                    formatBalance(debitAccount.balance, debitAccount.currency)}
                </div>
              )}
            </SelectTrigger>
            <SelectContent className="bg-white text-black border-1">
              {accounts.map((account) => (
                <SelectItem
                  key={account.id}
                  value={String(account.id)}
                  className="w-full"
                >
                  {account.ownerId + " - " + account.currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">{t("amount")}</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={transaction.amount}
            onChange={(e) => {
              console.log("value on input change", e);
              dispatch(
                updateTransaction({
                  field: "amount",
                  value: e.target.value,
                })
              );
            }}
          />
          {insufficintBalance && <FormError errors={["insufficientBalance"]} />}
        </div>
        <div className="space-y-2">
          <Label htmlFor="creditAccount">{t("creditAccount")}</Label>
          <Select
            //   id="ownerId"
            name="creditAccount"
            value={transaction.creditAccount}
            onValueChange={(value) => selectAccount("creditAccount", value)}
          >
            <SelectTrigger className="w-full focus:outline-none">
              {creditAccount && (
                <div>
                  {creditAccount?.ownerId +
                    " - " +
                    creditAccount?.currency +
                    " - " +
                    formatBalance(
                      creditAccount.balance,
                      creditAccount.currency
                    )}
                </div>
              )}
            </SelectTrigger>
            <SelectContent className="bg-white text-black border-1">
              {accounts
                .filter((elem) => elem.id !== Number(transaction.debitAccount))
                .map((account) => (
                  <SelectItem
                    key={account.id}
                    value={String(account.id)}
                    className="w-full"
                  >
                    {account.ownerId + " - " + account.currency}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          disabled={!debitAccount || insufficintBalance || !creditAccount}
          onClick={performTransaction}
          className="bg-(--primary-color) text-white font-bold py-2 px-4 rounded"
        >
          {t("performTransaction")}
        </Button>
      </form>
    </>
  );
}
