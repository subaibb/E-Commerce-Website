"use server";
import db from "@/db/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { revalidatePath } from "next/cache"


type FormInfo = {
    firstName:string,
    lastName:string,
    street:string,
    city:string,
    state:string,
    zip:string,
    phoneNumber:string,
  }


export async function Purchase ({data,total}: {data:FormInfo,total:number}):Promise<boolean> {
    const session = await getServerSession(authConfig);
    if (!session){
        return false;
    }

    //Get user Cart

    const UserCart = await db.cart.findMany({
        where:{
            userId:session.user.id
        },
        select:{
            id:true,
            products:{
                select:{
                    id:true
                }
            
            }
        }
    });

    
    if (!UserCart){
        return false;
    }


    const NewOrder = await db.orders.create({
        data:{
            firstName:data.firstName,  
            lastName:data.lastName,
            street:data.street,
            city:data.city,
            zip:data.zip,
            phoneNumber:data.phoneNumber,
            total:total,
            state:data.state,
            user:{
                connect:{
                    id : session.user.id
                }
            },
            products:{
                connect:UserCart.map((cartItem)=>({
                    id:cartItem.products[0].id
                }))
            }

        }
        
    } 
);

if (NewOrder){


    //Delete Cart

    await db.cart.deleteMany({
        where:{
           userId:session.user.id
        }
    });
    revalidatePath('/');
    revalidatePath('/checkout');
    revalidatePath('/shopall');  
    return true;
}
return false;
}