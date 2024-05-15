import { Nav } from "@/app/components/Nav";
import { SideBarWrapper,FavContextWrapper,CartContextWrapper } from "@/app/hooks/Contexts"
import { Label,LabelWrapper } from "../components/SideNav";
import { SideNavigation } from "../components/SideBar";
export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="w-full h-full">
      {children}
        </div>
    </>
  )
}