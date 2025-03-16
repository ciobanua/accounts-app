"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { addAccountAction } from "@/app/actions";
import FormError from "./FormError";

const INITIAL_STATE = {
  zodErrors: {
    ownerId: [],
    currency: [],
    balance: [],
  },
  data: {
    ownerId: null,
    currency: null,
    balance: null,
  },
  message: "",
};

export type AddAccountType = typeof INITIAL_STATE;

export default function AddAccount() {
  const t = useTranslations("accounts");

  const [formState, formAction] = useActionState(
    addAccountAction,
    INITIAL_STATE
  );

  console.log("formState on the client", formState.data);

  const { ownerId, currency, balance } = formState?.data || {};

  useEffect(() => {
    if (formState?.message) {
      toast(formState.message);
    }
  }, [formState?.message]);

  return (
    <form
      className="space-y-4 mx-8 bg-white text-black p-4 rounded-md"
      action={formAction}
    >
      <div className="space-y-2">
        <Label htmlFor="ownerId">{t("ownerId")}</Label>
        <Input id="ownerId" name="ownerId" defaultValue={ownerId || ""} />
        <FormError errors={formState?.zodErrors?.ownerId} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currency">{t("currency")}</Label>
        <Input id="currency" name="currency" defaultValue={currency || ""} />
        <FormError errors={formState?.zodErrors?.currency} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="balance">{t("balance")}</Label>
        <Input
          id="balance"
          name="balance"
          defaultValue={balance || ""}
          type="number"
        />
        <FormError errors={formState?.zodErrors?.balance} />
      </div>
      <Button
        type="submit"
        className="bg-(--primary-color) text-white font-bold py-2 px-4 rounded"
      >
        {t("addAccountButton")}
      </Button>
    </form>
  );
}
