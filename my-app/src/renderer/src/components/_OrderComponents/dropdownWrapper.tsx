
import DropDown from "./dropdown"

export default function dropdownWrapper(): JSX.Element {
    
    return (
    <>
    <div className="absolute w-[29.8vw] h-[4.8vh] top-[2.8vh] right-[2vw] flex">

        <DropDown id={1} label={'Sort by'} img={3}/>
        <DropDown id={2} label={'Status'} img={1}/>
        <DropDown id={3} label={'Date'} img={2}/>

    </div>
    </>
    
    ) 
}