import Buttons from './components/_DashComponent/Buttons'
import Background from './components/_DashComponent/bg'
import Stats from './components/_DashComponent/dash-status'
import Table from './components/_DashComponent/order-table'
import Company from './components/_DashComponent/company'
import Arrow from './components/_DashComponent/Arrows'
import Labels from './components/_DashComponent/labels'
import Add_Button from './components/_DashComponent/add_button'
import EditForm from './components/_DashComponent/Edit_Form'
import { createContext, useState } from 'react'

type DataType = {
  User:string,
  Company:string,
  Amount:number,
  Price:number,
  FabricType:string,
  Unit:string,
  Status:string,
  CreatedAt:string,
}

type DataContextType = {
  Data: DataType;
  setData: (value: any) => void;
};
export const DataContext = createContext<DataContextType>({
  Data: {User:'', Company:'', Amount:0, Price:0, FabricType:'', Unit:'', Status:'', CreatedAt:''},
  setData: (value: any) => {value},
})





export default function App(): JSX.Element {

  const [Data, setData] = useState<any>({});
  return (
    <> 
    <DataContext.Provider value={{Data, setData}}>
    <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards]'>Dashboard</h2>
    <Buttons/>
    <Background/>
    <Stats/>
    <Table/>
    <Company/>
    <Labels/>
    <Add_Button/>
    <Arrow/>  
    <EditForm/>
    </DataContext.Provider>
    </>
  )
}



