"use client";
import { useIsExtraSmallScreen } from "@/app/hooks/MediaQuery"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"



export function AccordionSection():JSX.Element{

    const {isExtraSmall} = useIsExtraSmallScreen();
    return(
        <div className="w-full flex justify-center items-center">
            <Accordion type="multiple" style={
                {
                    width: "100%",
                    height: "20vh",
                }
            }>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <h1>Ingredients</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>Organic Olive Oil, Vitamin E, Fragrance</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>
                        <h1>Directions</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>Apply a small amount of oil to the desired area and massage gently until fully absorbed.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>
                        <h1>Warnings</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>For external use only. Avoid contact with eyes. Discontinue use if irritation occurs.</p>
                    </AccordionContent>
                </AccordionItem>
            {
                !isExtraSmall &&
                 <AccordionItem value="item-4">
                    <AccordionTrigger>
                        <h1>More Details</h1>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>Indulge in our luxurious olive oil product, crafted from the finest organic olives for intense hydration
                and a radiant glow. Pamper your skin with its lightweight formula, leaving it irresistibly soft and smooth.</p>
                    </AccordionContent>
                </AccordionItem>
           

            }
                </Accordion>
        </div>
    )
}