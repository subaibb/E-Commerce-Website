import SearchBar from "./searchbar"
import DropdownWrapper from "./dropdownWrapper"

export default function Status(): JSX.Element {
    
        return (
        <>
        <div className="w-[73.9vw] h-[11vh] absolute bg-default left-[16.2vw] top-[14.7vh] rounded-[14px] shadow-[2px_4px_4px_#68B6FF0D] animate-[400ms_fadeIn_forwards]  flex">
            <SearchBar/>
            <DropdownWrapper/>

        </div>
        </>
        
        ) 
    }