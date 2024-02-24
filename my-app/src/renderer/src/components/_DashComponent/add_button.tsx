
import Add_Form from "./add_form"
import { useState } from "react";
export default  function Add_Button(): JSX.Element {

  const [show, setShow] = useState(false);



  const handleShow = () =>{
    setShow(prevState => !prevState);
  }

    return (
      <>
      <button onClick={handleShow} className=" button absolute top-[1.3vh] left-[78vw]">
        New Order
      </button>
      {show && <Add_Form />}
      </>
      
    ) 
  }