"use client";
import { useIsExtraSmallScreen } from "@/app/hooks/MediaQuery"
import { useProduct } from "@/app/hooks/Contexts";
import { useEffect } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


  
export function BottomDetail({data}:{data:{name:string,description:string}[] | undefined},info:string):JSX.Element{
    const {isExtraSmall} = useIsExtraSmallScreen();
    if (!data) return <div>404</div>;
    return(
        <div className="w-[90%] h-[30%] flex flex-col justify-start items-center ">
           {
                data.map((accrdation) => (
                     <AccordionSection key={accrdation.name} header={accrdation.name} description={accrdation.description}/>
                ))
           }
           { !isExtraSmall &&   
                       <Accordion type="multiple" style={
                        {
                            width: "100%",
                            height: "10vh",
                        }
                    }>
                
                 <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <h1>More Details</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>Indulge in our luxurious olive oil product, crafted from the finest organic olives for intense hydration
                        and a radiant glow. Pamper your skin with its lightweight formula, leaving it irresistibly soft and smooth.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            }
        </div>
    )
}



 function AccordionSection({header,description,id}:{header?:string,description?:string,id?:string}):JSX.Element{

        
    return(
        <div className="w-full flex justify-center items-center">
            <Accordion type="multiple" style={
                {
                    width: "100%",
                    height: "10vh",
                }
            }>
                <AccordionItem value={id || "item"}>
                    <AccordionTrigger>
                        <h1>{header}</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>{description}</p>
                    </AccordionContent>
                </AccordionItem>
            
                </Accordion>
        </div>
    )
}