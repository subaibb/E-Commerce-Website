
import DropDown from "./dropdown"

export default function dropdownWrapper(): JSX.Element {
    
    return (
    <>
    <div className="absolute w-[29.8vw] h-[4.8vh] top-[2.8vh] left-[42vw] flex">

        <DropDown label={'Filters'} img={3}/>
        <DropDown label={'Status'} img={1}/>
        <DropDown label={'Date'} img={2}/>

    </div>
    </>
    
    ) 
}