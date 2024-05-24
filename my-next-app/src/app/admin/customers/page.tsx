import { Header } from "../../shopall/_components/Header";
import {Table,TableHeader,Label,Seperator,TableData,TableRow,DataCell} from "../_components/Table"
import db from "@/db/db";
import { ActionButton } from "./_components/ActionButton";
import { cache } from "@/lib/cache";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { Selection } from "./_components/Select";
//get Products


const getCustomers = cache ( async () => {
  const products = await db.user.findMany({
    select:{
      id:true,
      name:true,
      email:true,
      address:true,
      rating:true,
      role:true,
      _count:{
        select:{
          orders:true,
          posts:true,
        }
      }
    }
  });

  return products;
},['/admin/customers','CustomersAdmin'])

export default async function Home() {
  const session = await getServerSession(authConfig);
  const Customers = await getCustomers();
  return (
    <>
      <Header />
      <Table  >
      <TableHeader>
                    <Label>
                        Name
                    </Label>

                    <Label>
                        Email Address
                    </Label>

                    <Label>
                        Num. of Orders
                    </Label>

                    <Label>
                        Num. of Posts
                    </Label>

                    <Label>
                        Rating
                    </Label>

                    <Label>
                        ROLE
                    </Label>

                    <Label>
                        Action
                    </Label>
                </TableHeader>  

                <Seperator/>

                <TableData>
                   {
                    Customers.length > 0 ?
                      Customers.map((customer)=>(
                        
                        <TableRow key={customer.id}>
                          <DataCell>
                            {customer.name}
                          </DataCell>
  
                          <DataCell>
                            {customer.email}
                          </DataCell>
  
                          <DataCell>
                            {customer._count.orders}
                          </DataCell>
  
                          <DataCell>
                            {customer._count.posts}
                          </DataCell>
  
                          <DataCell>
                            {customer.rating}
                          </DataCell>

                          <DataCell>
                            <Selection id={customer.id} role={customer.role} status={
                                session?.user.id === customer.id ? true:false
                            }
                              />
                            </DataCell>
  
                          <DataCell>
                            <div className=" w-full h-full flex justify-between items-center ">
                              <ActionButton  Style={{
                                pointerEvents : session?.user.id === customer.id ? "none":"all",
                                backgroundColor : session?.user.id === customer.id ? "#EFBFBE":"#f66865",
                              }}
                               id={customer.id}>
                                Delete
                              </ActionButton>
                            </div>
                            
                          </DataCell>
                        </TableRow>
                      )):<p className="text-center text-textprimary top-1/2 relative left-1/2 -translate-x-1/2 -translate-y-1/2">No Custoemrs are in present</p>
                   }
                </TableData>

                
      </Table>
    </>
  );  
}
