
import { Header } from "./_components/Header";
import { Login } from "./_components/LoginForm";
import { SmallNav } from "./_components/SmallNav";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SideBarWrapper } from "../hooks/Contexts"
import { Label,LabelWrapper } from "../components/SideNav"
import { SideNavigation } from "../components/SideBar"
export  default async function LogInPage() {

  const session = await getServerSession(authConfig);
  if (session) {
    return redirect("/shopall");
  }

  return (
<div className="h-[100vh] w-full lg:flex lg:flex-row xs:flex xs:flex-col">
<SideBarWrapper >
        <SideNavigation>
        <LabelWrapper>
        
                         <Label delay={0.1} link="/shopall">
                        Shop All
                        </Label>

                        <Label delay={0.2} link="/oils">
                        Oils
                        </Label>

                        <Label delay={0.3} link="/clothing">
                        Clothing
                        </Label>

                        <Label delay={0.36} link="/aboutus">
                        About Us
                        </Label>

                        <Label delay={0.4} link="/contact">
                        Contact
                        </Label>
        </LabelWrapper>
      </SideNavigation>
    <SmallNav/>
   <Header/>
    <Login/>
    </SideBarWrapper> 
</div>
  );
}