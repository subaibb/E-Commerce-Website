"use server";
import db from "@/db/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { revalidatePath } from "next/cache"
export async function AddFav(data: {id:string}):Promise<boolean> {
    
    const session = await getServerSession(authConfig);

    if (!session){
        return false;
    }
    //check if the product is already in the user's favorite list
    const checkFavs = await db.favorite.findFirst({
        where:{
            postId:data.id,
        }});

        if (checkFavs){
            return false;
        }

        const AddFavs = await db.favorite.create({
            data:{
                postId:data.id,
                user:{
                    connect:{
                        id:session.user.id
                    }
                },
                products:{
                    connect:{
                        id:data.id
                    }
                }
            }
            
        });


        if (AddFavs){
            revalidatePath('/');
            revalidatePath('/shopall');
            revalidatePath(`/product/${data.id}`);
            revalidatePath('/clothing');
            revalidatePath('/oils');
            revalidatePath('/soaps');
            return true;
        }
    

    
    return false;
}


export async function RemoveFav(data: {id:string}):Promise<boolean> {
    

    const session = await getServerSession(authConfig);

    if (!session){
        return false;
    }

    //check if the product exists 

    const checkFavs = await db.favorite.findFirst({
        where:{
            postId:data.id,
        }});

        if (!checkFavs){
            return false;
    }

    
    const RemoveFavs = await db.favorite.deleteMany({
        where:{
            id : checkFavs.id
        }
    });

    if (RemoveFavs){
        revalidatePath('/');
        revalidatePath('/shopall');
        revalidatePath(`/product/${data.id}`);
        revalidatePath('/clothing');
        revalidatePath('/oils');
        revalidatePath('/soaps');
        return true;
    }

    
    return false;   

}


export async function AddCart(data: {id:string}):Promise<boolean> {


    const session = await getServerSession(authConfig);

    if (!session){
        
        return false;
    }

    //check if the product is already in the user's cart
    const checkCart = await db.cart.findFirst({
        where:{
            postId:data.id,
    }});



    if (checkCart){
    incrementCart({id:data.id});
    revalidatePath('/');
    revalidatePath('/shopall');
    revalidatePath(`/product/${data.id}`);
    revalidatePath('/clothing');
    revalidatePath('/oils');
    revalidatePath('/soaps');
    return true;
    }
    
        // if it is not in the cart, add it
    
    const AddCarts = await db.cart.create({
        data:{
            postId:data.id,
            user:{
                connect:{
                    id:session.user.id
                }
            },
            products:{
                connect:{
                    id:data.id
                }
            }
        }
        
    });

    if (AddCarts){
        revalidatePath('/');
        revalidatePath('/shopall');
        revalidatePath(`/product/${data.id}`);
        revalidatePath('/clothing');
        revalidatePath('/oils');
        revalidatePath('/soaps');
        return true;
    }
    

    
    return false;

}


export async function RemoveCart(data: {id:string}):Promise<boolean> {
    

    const session = await getServerSession(authConfig);

    if (!session){
        return false;
    }

    //check if the product is already in the user's cart
    const checkCarts = await db.cart.findFirst({
        where:{
            postId:data.id,
        }});

        if (!checkCarts){
            return false;
    }
    
    const RemoveCarts = await db.cart.delete({
        where:{
            id:checkCarts.id
        }
    });
    if (RemoveCarts){
        revalidatePath('/');
        revalidatePath('/shopall');
        revalidatePath(`/product/${data.id}`);
        revalidatePath('/clothing');
        revalidatePath('/oils');
        revalidatePath('/soaps');
        return true;
    }

    
    return false;  

}

export async function RemoveAllCart():Promise<boolean> {
    

    const session = await getServerSession(authConfig);

    if (!session){
        return false;
    }
    
    const RemoveCarts = await db.cart.deleteMany({
        where:{
            user:{
                id:session.user.id
            }
        }
    });

    if (RemoveCarts){
        revalidatePath('/');
        revalidatePath('/shopall');
        revalidatePath('/clothing');
        revalidatePath('/oils');
        revalidatePath('/soaps');
        return true;
    }

    
    return false;  

}


export async function incrementCart(data: {id:string}):Promise<boolean> {
    

    const session = await getServerSession(authConfig);

    if (!session){
        return false;
    }

    //check if the product is already in the user's cart
    const checkCarts = await db.cart.findFirst({
        where:{
            postId:data.id,
        }});

        if (!checkCarts){
            return false;
        }

    
    const AddQuantity = await db.cart.update({
        where:{
            id:checkCarts.id
        },
        data:{
            quantity:{
                increment:1
            }
        }
    });

    if (AddQuantity){
        revalidatePath('/');
        revalidatePath('/shopall');
        revalidatePath(`/product/${data.id}`);
        revalidatePath('/clothing');
        revalidatePath('/oils');
        revalidatePath('/soaps');
        return true;
    }

    
    return false;  

}


export async function decrementCart(data: {id:string}):Promise<boolean> {
    

    const session = await getServerSession(authConfig);

    if (!session){
        return false;
    }

    //check if the product is already in the user's cart
    const checkCarts = await db.cart.findFirst({
        where:{
            postId:data.id,
        }});

        if (!checkCarts){
            return false;
        }

    
    const AddQuantity = await db.cart.update({
        where:{
            id:checkCarts.id
        },
        data:{
            quantity:{
                decrement:1
            }
        }
    });

    if (AddQuantity){
        revalidatePath('/');
        revalidatePath('/shopall');
        revalidatePath(`/product/${data.id}`);
        revalidatePath('/clothing');
        revalidatePath('/oils');
        revalidatePath('/soaps');
        return true;
    }

    
    return false;  

}