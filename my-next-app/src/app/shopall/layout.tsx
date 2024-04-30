import { Nav } from "@/app/components/Nav"
import { SideBarWrapper } from "@/app/hooks/Toggle"
import { SideNav } from "../components/SideNav";
export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
    <SideBarWrapper >
      <Nav variation={0}>
      </Nav>
      <SideNav/>
      </SideBarWrapper>
      
      <div className="w-full h-full">
      {children}
        </div>
       
    </>
  )
}