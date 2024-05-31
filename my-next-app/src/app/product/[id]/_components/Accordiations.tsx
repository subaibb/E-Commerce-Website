"use client";
import { useIsExtraSmallScreen } from "@/app/hooks/MediaQuery"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"


  
export function BottomDetail({data,info}:{data:{name:string,description:string}[] | undefined,info:string|undefined}):JSX.Element{
    if (!data) return <div>404</div>;
    return(
        <div className="w-[90%] h-[30%] flex flex-col justify-start items-center ">
           {
                data.map((accrdation) => (
                     <AccordionSection key={accrdation.name} header={accrdation.name} description={accrdation.description}/>
                ))
           }
           
                       <Accordion className="sm:hidden xs:block" type="multiple" style={
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
                        <p>{info}</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

           
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