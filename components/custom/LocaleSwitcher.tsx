"use client";
import { useLocale } from "next-intl";
import { MdLanguage } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale, routing, usePathname, useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale }
    );
  }

  return (
    <div className="flex items-center gap-1">
      <MdLanguage />
      <Select onValueChange={(value) => onSelectChange(value)} value={locale}>
        <SelectTrigger className="border-none focus:outline-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-[40px]">
          {routing.locales.map((localeOption) => (
            <SelectItem
              key={localeOption}
              value={localeOption}
              className="m-0 p-0 w-[40px]"
            >
              {localeOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
