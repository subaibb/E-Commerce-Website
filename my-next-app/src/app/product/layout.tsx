import { Nav } from "@/app/components/Nav"
import { SideBarWrapper,CartContextWrapper,ProductContextWrapper } from "@/app/hooks/Contexts"
import { Label,LabelWrapper } from "../components/SideNav"
import { SideNavigation } from "../components/SideBar"
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
      <SideBarWrapper >
      <Nav variation={0}>
      </Nav>
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
      <div className="w-full h-full">
      {children}
        </div>
        </SideBarWrapper>
      </CartContextWrapper>
      </ProductContextWrapper>
       
    </>
  )
}