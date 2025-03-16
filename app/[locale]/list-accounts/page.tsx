import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import Search from "@/components/custom/Search";
import ListAccounts from "@/components/custom/ListAccounts";
import H1 from "@/components/custom/H1";
import Loading from "@/components/custom/Loading";

export const metadata = {
  title: "List accounts",
  description:
    "This page provides a list of accounts with the search functionality and links to the add/edit accounts page",
};

export default async function ListAccountsPage({
  searchParams,
}: {
  searchParams: Promise<{ currency?: string }>;
}) {
  const t = await getTranslations("accounts");
  const params = await searchParams;
  const query = params.currency || "";

  return (
    <>
      <div className="mt-12 px-8">
        <Link
          href="/add-account"
          className="justify-center font-bold p-3 rounded-md bg-(--complementary-color) text-black flex"
        >
          {t("addNewAccount")}
        </Link>
        <H1 text={t("listAccounts")} />
        <Search query={query} />
        <Suspense fallback={<Loading />}>
          <ListAccounts query={query} />
        </Suspense>
      </div>
    </>
  );
}
