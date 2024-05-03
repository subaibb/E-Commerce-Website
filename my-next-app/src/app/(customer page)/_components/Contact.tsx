
import { ContactCard,Label } from "./ContactCard";



export function Contact():JSX.Element{
    return(
      <div className="w-full h-[500px] flex justify-center items-center bg-[#B5A4A3] relative">
        
        <div className="w-[95%] h-[85%]  flex">
  
          <ContactCard delay="0.1" Header="Explore">
            <Label>Shop All</Label>
            <Label>Oils</Label>
            <Label>Soaps</Label>
            <Label>Hodies</Label>
            <Label>Thobs</Label>
            <Label>Headwear</Label>
            <Label>Accessories</Label>
          </ContactCard>  
  
          <ContactCard delay="0.2" Header="Terms & Conditions">
            <Label>Privacy Policy</Label>
            <Label>Shipping Policy</Label>
            <Label>Refund Policy</Label>
            <Label>Accessibility Statement</Label>
            <Label>Contact Support</Label>
            <Label>FAQ</Label>
          </ContactCard>  
  
          <ContactCard delay="0.3" Header="Find Us">
            <Label>Facebook</Label>
            <Label>Instagram</Label>
            <Label>X</Label>
          </ContactCard>  
  
        </div>
  
      </div>
    )
  }