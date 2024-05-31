"use server";
import db from "@/db/db";
import { revalidatePath } from "next/cache"

export async function DeleteCustomer(id:string){


     db.user.delete({
        where:{
            id:id
        }
    });

    revalidatePath('/',"layout");

}


export async function UpdateCustomer(id:string,role:string){

  const Updateuser= await db.user.update({
        where:{
            id:id
        },
        data:{
            role:role
        }
    });
 
    if (Updateuser){
        revalidatePath('/',"layout");
    }

}