import { useTranslations } from "next-intl";

export default function FormError({ errors }: { errors: string[] | null }) {
  const t = useTranslations("general");

  if (!errors || errors.length === 0) return null;

  return (
    <>
      {errors.map((err, index) => (
        <p key={index} className="text-red-700 text-sm">
          {t(err)}
        </p>
      ))}
    </>
  );
}
