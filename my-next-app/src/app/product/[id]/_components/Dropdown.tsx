import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


export function Dropdown ():JSX.Element {
    return (
        <div className="w-full h-[10%]  items-center flex ">
            <DropdownMenu>
            <DropdownMenuTrigger className=" flex justify-center items-center p-2 pl-3 pr-3 mb-2
            " style={{
                color: "#D6C18A",
                fontSize: "1.2rem",
                border: "1px solid #D6C18A",
            }}>Filter</DropdownMenuTrigger>
            <DropdownMenuContent style={{
                backgroundColor: "#E9E6E2",
            }}>
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator style={{
                    backgroundColor: "#474241",
                
                }} />
                <DropdownMenuItem>Most Relavant</DropdownMenuItem>
                <DropdownMenuItem>Newest</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}