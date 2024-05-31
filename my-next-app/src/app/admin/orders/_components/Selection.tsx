"use client";
import { ToggleStatus } from "../_actions/DeleteOrder";
import { $Enums } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


  export function Selection({selection,id,status}:{selection:$Enums.OrderStatus,id:string,status?:boolean}):JSX.Element{

    const Update = ToggleStatus.bind(selection,id);
    return (
        
        <Select disabled={status} defaultValue={selection} onValueChange={(newValue:$Enums.OrderStatus) => Update(newValue)}>
    <SelectTrigger className="w-[180px] bg-default ">
    <SelectValue/>
    </SelectTrigger>
    <SelectContent className=" bg-default">
    <SelectItem value="PENDING">Pending</SelectItem>
    <SelectItem value="DELIVERED">Delivered</SelectItem>
    <SelectItem value="CANCELLED">Cancelled</SelectItem>
    </SelectContent>
    </Select>
    )
  }