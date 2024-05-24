
import { Header } from "../shopall/_components/Header"
import { NavItem } from "./_components/NavItem"
import { Logout } from "./_components/Logout";
import { Order } from "./_components/Order"
import db from "@/db/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";


const getOrders = async () => {
    const session = await getServerSession(authConfig);
    if (!session) {
      return [];
    }
  
const orders = await db.orders.findMany({
      select: {
        _count: {
            select: {
                products: true
            }
            },
        id:true,
        status:true,
        createdAt:true,
        total:true,
        products:{
          select:{
                id:true,
                name:true,
                price:true,
                imagepath:true,
                rating:true,
          }
        }
      },
      where: {
        userId:session.user.id
      },
    });
  
    return orders;
}



export default function Home() {
    return (
       <div>
            <Header/> 
            <Opening/>
            <Orders/>
       </div>

    )
}


function Opening():JSX.Element{


    return(

        <div className="h-[12vh] w-full  flex flex-col items-center justify-center">
            <ProfileNavigation/>
            <div className="w-[95%] bg-thick h-[1px]"/>
        </div>

    )
}

function ProfileNavigation():JSX.Element{

    return(
        <div className="w-[95%] h-[70%] flex space-x-12">
            <NavItem>Orders</NavItem>
            <Logout/>
        </div>
    )
}

async function Orders(){
    const orders = await getOrders();
    return(
        <div className="w-full h-fit  flex flex-col  items-center">

            {orders.map(order =>
                    <Order data={order} key={order.id}/>
                 )}
        </div>
    )
}