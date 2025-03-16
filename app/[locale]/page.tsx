import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const tAccounts = await getTranslations("accounts");
  const tTransaction = await getTranslations("transaction");
  return (
    <div className="space-y-5 mt-12 mx-8">
      <div>
        <Link
          href="/list-accounts"
          className="p-2 md:hover:bg-(--complementary-color) md:hover:text-black md:hover:rounded-md"
        >
          {tAccounts("listAccounts")}
        </Link>
      </div>
      <div>
        <Link
          href="/add-account"
          className="p-2 md:hover:bg-(--complementary-color) md:hover:text-black md:hover:rounded-md"
        >
          {tAccounts("addNewAccount")}
        </Link>
      </div>
      <div>
        <Link
          href="/transaction"
          className="p-2 md:hover:bg-(--complementary-color) md:hover:text-black md:hover:rounded-md"
        >
          {tTransaction("transactionLink")}
        </Link>
      </div>
    </div>
  );
}
