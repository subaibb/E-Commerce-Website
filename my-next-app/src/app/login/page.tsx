
import { Header } from "./_components/Header";
import { Login } from "./_components/LoginForm";
import { SmallNav } from "./_components/SmallNav";
import { SideBarWrapper } from "../hooks/Contexts";
import { SideNav } from "../components/SideNav";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
export  default async function LogInPage() {

  const session = await getServerSession(authConfig);
  if (session) {
    return redirect("/shopall");
  }

  return (


<div className="h-[100vh] w-full flex">
    <SideBarWrapper>
    <SmallNav/>
    <SideNav/>
   <Header/>
    <Login/>
    </SideBarWrapper>

</div>
  );
}