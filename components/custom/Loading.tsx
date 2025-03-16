import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("general");
  return <div className="m-5">{t("loading")}</div>;
}
