"use server";
import { z } from "zod";
import { AddAccountType } from "@/components/custom/AddAccount";

//TODO: differentiate the errors
const schemaAccount = z.object({
  ownerId: z.coerce
    .number({ message: "zodError-ownerId" })
    .int()
    .gte(10000, { message: "zodError-ownerId" }),
  currency: z
    .string({ message: "zodError-currency" })
    .length(3, { message: "zodError-currency" }),
  balance: z.coerce
    .number({ message: "zodError-balance" })
    .gt(0, { message: "zodError-balance" }),
});

export async function addAccountAction(
  prevState: AddAccountType,
  formData: FormData
): Promise<AddAccountType> {
  const formDataObj = {
    ownerId: formData.get("ownerId"),
    currency: formData.get("currency"),
    balance: formData.get("balance") === "" ? null : formData.get("balance"),
  };

  console.log("formDataObj", formDataObj);

  const validatedFields = schemaAccount.safeParse(formDataObj);

  console.log("validatedFields", validatedFields?.data);

  if (!validatedFields.success) {
    return {
      ...prevState,
      data: { ...prevState.data, ...formDataObj },
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields",
    };
  }

  const body = {
    newAccount: {
      ownerId: validatedFields.data.ownerId,
      currency: validatedFields.data.currency,
      balance: validatedFields.data.balance,
    },
  };

  const res = await fetch("http://localhost:3000/api/accounts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body }),
  });

  const newAccount = await res.json();

  return {
    // ...prevState,
    data: { ...formDataObj },
    zodErrors: [],
    message: "Account successfully added",
  };
}

export async function deleteAccount() {}

export async function editAccount() {}
