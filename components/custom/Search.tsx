import { FiSearch } from "react-icons/fi";
import Form from "next/form";
import { getTranslations } from "next-intl/server";

export default async function Search({ query }: { query?: string }) {
  const t = await getTranslations("accounts");

  return (
    <>
      <div>{t("search")}</div>
      <Form action="" scroll={false} className="w-full mx-auto relative">
        <input
          name="currency"
          defaultValue={query}
          className="border w-full p-4 pl-12 pr-12 outline-none rounded-lg relative bg-white text-black"
        />
        <button
          className="absolute top-5 left-3 flex items-center text-black"
          type="submit"
        >
          <FiSearch size={20} />
        </button>
      </Form>
    </>
  );
}
