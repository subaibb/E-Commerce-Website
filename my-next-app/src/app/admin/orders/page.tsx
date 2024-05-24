import { Header } from "../../shopall/_components/Header";
import {Table,TableHeader,Label,Seperator,TableData,TableRow,DataCell} from "../_components/Table"
import db from "@/db/db";
import { ActionButton } from "./_components/ActionButton";
import { cache } from "@/lib/cache";
//get Products


const GetOrders = cache ( async () => {
  const products = await db.orders.findMany({
    select:{
      id:true,
      user:{
        select:{
          name:true
        },
      },
      status:true,
      _count:{
        select:{
          products:true
        }
      },
      createdAt:true,
      total:true,
    }
  });

  return products;
},['/admin/orders','OrdersAdmin'])

export default async function Home() {

  const Orders = await GetOrders();
  let date: string = '';
  if (Orders.length > 0) {
   date = new Date(Orders[0].createdAt).toISOString().split('T')[0];
  }
  return (
    <>
      <Header />
      <Table  >
      <TableHeader>
                    <Label>
                        Buyer Name
                    </Label>

                    <Label>
                        Order Date
                    </Label>

                    <Label>
                        Status
                    </Label>

                    <Label>
                        Quantity
                    </Label>

                    <Label>
                        Total
                    </Label>

                    <Label>
                        Action
                    </Label>
                </TableHeader>  

                <Seperator/>

                <TableData>
                   {
                    Orders.length > 0 ? 
                      Orders.map((order)=>(
                        
                        <TableRow key={order.id}>
                          <DataCell>
                            {order.user.name}
                          </DataCell>
  
                          <DataCell>
                            {date}
                          </DataCell>
  
                          <DataCell>
                            {order.status}
                          </DataCell>
  
                          <DataCell>
                            {
                              order._count.products}
                          </DataCell>
  
                          <DataCell>
                            ${order.total}
                          </DataCell>
  
                          <DataCell>
                            <div className=" w-full h-full flex justify-center items-center">
                            <ActionButton id={order.id}>Delete</ActionButton>
                            </div>
                            
                          </DataCell>
                        </TableRow>
                      )):<p className="text-center text-textprimary top-1/2 relative left-1/2 -translate-x-1/2 -translate-y-1/2">No Orders have been made</p>
                   }
                </TableData>

                
      </Table>
    </>
  );  
}
