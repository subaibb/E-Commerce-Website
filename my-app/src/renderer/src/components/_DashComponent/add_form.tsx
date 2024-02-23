import { useForm,FormState } from "react-hook-form"
const date = new Date();




export default  function Add_Form(): JSX.Element {
    const {
         register
         , handleSubmit,
            formState

        } = useForm({
            defaultValues: {
                user: "",
                amount: "",
                unit: "",
                status: "",
                createdAt: formatDate(date),
                price: "",
                company: ""
            }
        });
        const { errors } = formState;
        

    return (
      <>
      <div className="form-div absolute w-[34.8vw] h-[39.7vh] bg-default rounded-lg left-[64.1vw] top-[8.9vh] shadow-[0px_4px_23.8px_7px_#68B6FF1C] z-10">
        <form className="relative w-[100%] h-[100%] flex" onSubmit={handleSubmit((data)=>{
            console.log(data);
        })}>


            <div className="form-box-1 relative h-[32.1vh] w-[14.1vw]  flex flex-col mr-auto ml-auto top-[3.5vh]">
                
                
            <label >NAME</label>
            <input type="text" {...register("user" ,{required:true, minLength:3 , pattern : /^[A-Za-z]/})} />
            {errors.user ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a longer name.</p>
                </h1>

                ) : (
                <h1></h1>
                )}
                            
            <label >AMOUNT</label>

            <input type="text" {...register("amount" ,{required:true})} />
            {errors.amount ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a longer address</p>
                </h1>

                ) : (
                <h1></h1>
                )}

                    
                    
                    
                
            <label >ADDRRESS</label>
                <input type="text" {...register("unit" ,{required:true})} />
                {errors.unit ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a longer address</p>
                </h1>

                ) : (
                <h1></h1>
                )}
                      

                      <label >DATE</label>
                <input type="date" {...register("createdAt" ,{required:true})} />
                {errors.unit ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a longer address</p>
                </h1>

                ) : (
                <h1></h1>
                )}

               
        

            </div>

            <div className="form-box-2 relative h-[23.7vh] w-[14.1vw] flex flex-col ml-auto mr-auto top-[3.5vh]">

            <label >STATUS</label>
                <input type="text" {...register("status" ,{required:true})}/>
                {errors.status ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper state</p>
                </h1>
                    
                ) : (
                <h1></h1>
                )}
                      
            <label >UNIT PRICE</label>
            <input type="text" {...register("price" ,{required:true})} />
            {errors.price ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please insert a value.</p>
                </h1>

                ) : (
                <h1></h1>
                )}
                      
            <label >COMPANY</label>
            <input type="text" {...register("company" ,{required:true, minLength:3})} />
            {errors.company ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a longer name.</p>
                </h1>

                ) : (
                <h1></h1>
                )}
                      

            </div>

            <input style={{backgroundColor: formState.isValid?'#68B6FF':'#d6d7d8'
            , position:"absolute"
            ,top:"29.9vh"
            , left:"23vw"
            ,borderRadius:"8px"
            ,font:"14px",padding:"1.6vh 2.7vw"}} type="submit" value='ADD'/>
            

        </form>

      </div>
      
      </>
      
    ) 
  }


  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
