import { useQuery } from "@tanstack/react-query";
import { useState,useEffect,useContext } from "react";
import  {PageContext}  from "../../Customers";
const { ipcRenderer } = require('electron');

type PageContextType = {
    Page: number;
    setPageSwitch: (value: number) => void;
  };

export default function PageSwitch(): JSX.Element {

    const [activePage, setActivePage] = useState<number>(1);
    const { Page, setPageSwitch } = useContext<PageContextType>(PageContext);
    const Customerdata = useQuery({
        queryKey: ['getActivePage'],
        queryFn: async () => {
            const data = await ipcRenderer.invoke('fetch-customers');
            return data;
        },
    });

    useEffect(() => {
        if (Customerdata.isSuccess) {
            const pages = Math.ceil(Customerdata.data.length / 8);
            setActivePage(pages);
        }
    }, [Customerdata.isSuccess, Customerdata.data]);


    return (
                <div className="w-auto h-[4vh] p-2 left-[14.6vw] bottom-[2.5vh] absolute bg-default justify-center items-center rounded-xl flex animate-me shadow-[2px_4px_4px_#68B6FF0D]">
                    {Customerdata.isSuccess && Array.from({ length: activePage }, (_, i) => (
                 <Button PageNumber={i+1} key={i} setPageSwitch={setPageSwitch} Page={Page}  />
                    ))}

                    
                </div>
    )
} 

function Button ({PageNumber,setPageSwitch,Page}): JSX.Element {

    const handleclick = () => {
        setPageSwitch(PageNumber);
    }
    console.log(Page);
    return (
        <button onClick={handleclick} className=" bg-[#96C7FF] h-6 w-6 relative rounded-full text-default ml-1 mr-1 font-normal"><span className="relative top-[0.1vh]">{PageNumber}</span></button>
        )
}