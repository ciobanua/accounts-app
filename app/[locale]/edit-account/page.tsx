import { getTranslations } from "next-intl/server";
import H1 from "@/components/custom/H1";

export default async function EditAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ account?: string }>;
}) {
  const t = await getTranslations("accounts");
  const params = await searchParams;
  const accountId = params.account || "";
  return (
    <>
      <H1 text={t("editAccount") + accountId} />
    </>
  );
}
