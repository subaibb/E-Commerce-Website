"use server";
import db from "@/db/db";
import { revalidatePath } from "next/cache"
import { $Enums } from "@prisma/client";

export async function DeleteOrder(id: string) {

  await db.orders.delete({
    where: {
      id: id,
    },
  });
  revalidatePath('/',"layout");
}


export async function ToggleStatus(id: string, status: $Enums.OrderStatus) {
  await db.orders.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  revalidatePath('/',"layout");
}