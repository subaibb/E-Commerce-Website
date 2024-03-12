import { useContext } from "react"
import { FormContext } from "../../Customers"


export default function AddButton (): JSX.Element {
    
        const {form, setForm} = useContext(FormContext);
        form;
        const handleClick = () => {
            setForm(true);
        }

    
        return (
            <>
            <button onClick={handleClick} className="button absolute top-[1.3vh] left-[78vw]">
            New Customer
            </button>
            
            </>
        )
    }