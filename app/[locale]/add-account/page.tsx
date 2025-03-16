import { getTranslations } from "next-intl/server";
import AddAccount from "@/components/custom/AddAccount";
import H1 from "@/components/custom/H1";

export const metadata = {
  title: "Add account",
  description: "You can use this page to add a new account",
};

export default async function AddAccountPage() {
  const t = await getTranslations("accounts");
  return (
    <>
      <H1 text={t("addNewAccount")} />
      <AddAccount />
    </>
  );
}
