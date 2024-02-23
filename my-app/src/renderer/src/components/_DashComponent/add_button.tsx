
import Add_Form from "./add_form"

export default  function Add_Button(): JSX.Element {

    return (
      <>
      <button className=" button absolute top-[1.3vh] left-[78vw]">
        New Order
      </button>
      <Add_Form/>
      </>
      
    ) 
  }