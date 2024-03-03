
import Dataholder from "./dataholder"




export default  function table(): JSX.Element {


  
    return (  
      <div className="Order-Table w-[73.9vw] h-[30vh] absolute left-[16.2vw] top-[37.2vh] flex flex-col bg-default rounded-2xl shadow-[2px_4px_4px_#68B6FF0D] items-center animate-[400ms_slideUp_forwards]">
        <div className="Label-Holder">
        <label>Customer</label>
        <label>Unit Price</label>
        <label>Amount</label>
        <label>Total</label>
        <label>Fabric</label>
        <label>Date</label>
        <label>Status</label>
        <label>Action</label>
        </div>
        <Dataholder/>
     

      </div>
    )
  }