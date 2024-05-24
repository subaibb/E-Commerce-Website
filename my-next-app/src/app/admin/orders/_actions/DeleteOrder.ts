"use server";
import db from "@/db/db";
import { revalidatePath } from "next/cache"
 

export async function DeleteOrder(id: string) {

  await db.orders.delete({
    where: {
      id: id,
    },
  });
  revalidatePath('/admin/orders');
}