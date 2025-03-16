import { getTranslations } from "next-intl/server";
import H1 from "@/components/custom/H1";
import StoreProvider from "@/app/StoreProvider";
import PerformTransaction from "@/components/custom/PerformTransaction";
import ViewAccountsBalance from "@/components/custom/ViewAccountsBalance";

export const metadata = {
  title: "Add transaction",
  description: "You can use this page to add a new transaction",
};

export default async function AddAccount() {
  const t = await getTranslations("transaction");
  const response = await fetch("http://localhost:3000/api/accounts");
  const respAccounts = await response.json();

  return (
    <>
      <StoreProvider>
        <H1 text={t("title")} />
        <div className="flex flex-col md:flex-row mt-8">
          <div className="md:flex-2">
            <PerformTransaction accountsProps={respAccounts} />
          </div>
          <div className="mt-8 md:flex-1 md:mt-0">
            <ViewAccountsBalance />
          </div>
        </div>
      </StoreProvider>
    </>
  );
}
