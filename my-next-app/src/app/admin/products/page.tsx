import { Header } from "../../shopall/_components/Header";
import {Table,TableHeader,Label,Seperator,TableData,TableRow,DataCell} from "../_components/Table"
import { ActionButton } from "./add/_components/actionButton";
import { cache } from "@/lib/cache";
import db from "@/db/db";
import Link from "next/link";

//get Products


const GetProducts = cache ( async () => {
  const products = await db.product.findMany({
    select:{
      id:true,
      name:true,
      createdAt:true,
      price:true,
      available:true,
      productType:true
    }
  });

  return products;
},['/admin/products','Products'])

export default async function Home() {

  const Products = await GetProducts();
  let date: string = '';
  if (Products.length > 0) {
   date = new Date(Products[0].createdAt).toISOString().split('T')[0];
  }
  return (
    <>
      <Header />
      <Table extras={
        <Link className="w-[10%] h-[70%]" href="/admin/products/add">
        <button className="bg-textprimary hover:bg-thick transition-all duration-150 w-full h-full rounded-md text-default">Add Product</button>
        </Link>
      } >
      <TableHeader>
                    <Label>
                        Name
                    </Label>

                    <Label>
                        Date Added
                    </Label>

                    <Label>
                        Price
                    </Label>

                    <Label>
                        Avalibility
                    </Label>

                    <Label>
                        Type
                    </Label>

                    <Label>
                        Action
                    </Label>
                </TableHeader>  

                <Seperator/>

                <TableData>
                   {
                    Products.length > 0 ?
                      Products.map((product)=>(
                        
                        <TableRow key={product.id}>
                          <DataCell>
                            {product.name}
                          </DataCell>
  
                          <DataCell>
                            {date}
                          </DataCell>
  
                          <DataCell>
                            {product.price}
                          </DataCell>
  
                          <DataCell>
                            {
                              product.available ? "Available" : "Not Available"}
                          </DataCell>
  
                          <DataCell>
                            {product.productType}
                          </DataCell>
  
                          <DataCell>
                            <div className=" w-full h-full flex justify-between items-center ">
                           <ActionButton id={product.id}>Delete</ActionButton>
                            </div>
                            
                          </DataCell>
                        </TableRow>
                      )):<p className="text-center text-textprimary top-1/2 relative left-1/2 -translate-x-1/2 -translate-y-1/2">No Products Are In Present</p>
                   }
                </TableData>

                
      </Table>
    </>
  );  
}
