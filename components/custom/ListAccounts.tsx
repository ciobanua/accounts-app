import { formatBalance } from "@/app/utils";
import { FaCircle } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import { MdModeEdit } from "react-icons/md";
import { Link } from "@/i18n/routing";

export interface Account {
  id: number;
  ownerId: number;
  currency: string;
  balance: number;
  status?: "enabled" | "deleted";
}

async function AccountCard({ account }: { account: Account }) {
  const t = await getTranslations("accounts");

  return (
    <>
      <div
        className="bg-(--primary-color-light) rounded-md shadow-md shadow-gray-300/50 p-3"
        data-cy="card"
      >
        <div className="flex justify-between">
          <div>{`${t("ownerId")}: ${account.ownerId}`}</div>
          <Link href={`/edit-account?account=${account.id}` as "/edit-account"}>
            <MdModeEdit />
          </Link>
        </div>
        <div className="flex flex-row justify-between text-sm font-bold">
          <div>
            {account.currency}
            <FaCircle
              className={`ms-2 inline-block ${
                account.status === "enabled" ? "text-green-400" : "text-red-400"
              }`}
            />
          </div>

          <div>{formatBalance(account.balance, account.currency)}</div>
        </div>
      </div>
    </>
  );
}

export default async function ListAccounts({ query }: { query: string }) {
  const response = await fetch("http://localhost:3000/api/accounts");
  const accounts = await response.json();

  const displayedAccounts =
    query.length > 0
      ? accounts.filter((account: Account) =>
          account.currency.toLowerCase().includes(query.toLowerCase())
        )
      : accounts;

  if (displayedAccounts.length === 0) {
    return <div className={"mt-4"}>No accounts found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 mt-4">
      {displayedAccounts?.map((account: Account) => (
        <AccountCard account={account} key={account.id} />
      ))}
    </div>
  );
}
