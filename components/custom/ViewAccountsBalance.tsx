"use client";
import { useAppSelector } from "@/lib/hooks";
import { formatBalance } from "@/app/utils";
import { useTranslations } from "next-intl";

export default function ViewAccountsBalance() {
  const accounts = useAppSelector((state) => state.accounts.accountsList);
  const t = useTranslations("transaction");

  return (
    <>
      <h1 className="font-bold text-xl text-center mb-4">{t("listMessage")}</h1>
      {accounts.map((account) => (
        <p key={account.id} className="ml-5 my-1">
          {account?.ownerId +
            " - " +
            account?.currency +
            " - " +
            formatBalance(account?.balance, account?.currency)}
        </p>
      ))}
    </>
  );
}
