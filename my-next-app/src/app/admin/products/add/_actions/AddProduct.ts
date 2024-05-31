"use server";
import db from "@/db/db";
import fs from "fs/promises"
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import {z,ZodType} from "zod"

type FormInfo = {
    name:string,
    price:string,
    available:string
    productType:string,
    description:string,
    image:File

  }

export async function AddProduct(prevState: unknown, formData: FormData) {

  const session = await getServerSession(authConfig);
  if (!session){
      redirect("/auth/signin");
  }

  const schema :ZodType<FormInfo> = z.object({
    name:z.string().min(2).max(50),
    price:z.string().min(1).max(50),
    available:z.string().min(2).max(50),
    productType:z.string().min(2).max(50),
    description:z.string().min(2).max(50),
    image: z.instanceof(File, { message: "Required" })
  })
  const result = schema.safeParse(Object.fromEntries(formData.entries()))
  
  if (result.success === false) {
    return result.error.formErrors.fieldErrors
  }
  const data = result.data
    await fs.mkdir("products", { recursive: true })

    const filePath = `products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(filePath, Buffer.from(await data.image.arrayBuffer()))
  
    await fs.mkdir("public", { recursive: true })
    const imagePath = `/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
    console.log(data.available)
    
    const AddProduct = await db.product.create({
        data:{
            name:data.name,
            price:parseFloat(data.price),
            available: data.available === "on" ? true : false,
            productType:data.productType,
            description:data.description,
            imagepath:imagePath,
            ordersId:"",
            rating:0,
        }
    });

    if (AddProduct){
      revalidatePath('/',"layout");
      redirect("/admin/products");
    }
  
}



export async function DeleteProduct(id:string){
    const session = await getServerSession(authConfig);
    if (!session){
        redirect("/auth/signin");
    }
    const DeleteProduct = await db.product.delete({
        where:{
            id:id
        }
    })
    if (DeleteProduct == null) return notFound()

      await fs.unlink(`public${DeleteProduct.imagepath}`)
    if (DeleteProduct){
      revalidatePath('/',"layout");
    }
}


export async function ToggleAvaliable(id:string,available:string){
  const updateProducts = await db.product.update({
      where:{
          id:id
      },
      data:{
          available: available === "true" ? true : false
      }
  })

    if (updateProducts){
      revalidatePath('/',"layout");
    }
}