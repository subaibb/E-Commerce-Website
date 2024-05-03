import { Nav } from "@/app/components/Nav"
import { SideBarWrapper } from "@/app/hooks/Contexts"
import { SideNav } from "@/app/components/SideNav"
export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
    <SideBarWrapper>
      <Nav variation={1}>
      </Nav>
      <SideNav/>
      </SideBarWrapper>
      <div className="w-full h-full">{children}</div>
     
    </>
  )
}