import { Nav } from "@/app/components/Nav"
import { SideBarWrapper,FavContextWrapper,CartContextWrapper,ProductContextWrapper } from "@/app/hooks/Contexts"
import { SideNav } from "../components/SideNav";
export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
    <ProductContextWrapper>
      <CartContextWrapper>
      <FavContextWrapper>
      <SideBarWrapper >
      <Nav variation={0}>
      </Nav>
      <SideNav/>
      </SideBarWrapper>

      
      <div className="w-full h-full">
      {children}
        </div>
      </FavContextWrapper>
      </CartContextWrapper>
      </ProductContextWrapper>
       
    </>
  )
}