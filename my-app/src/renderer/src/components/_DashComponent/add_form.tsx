import { useForm } from "react-hook-form"
import { useMutation ,useQueryClient } from '@tanstack/react-query';
import Autocomplete from "./AutoComplete";
import { useState } from "react";
const { ipcRenderer } = require('electron')
const date = new Date();



  

  


interface Order {
    user: string;
    amount: number;
    address: string;
    status: string;
    createdAt: string;
    price: number;
    company: string;
    unit: string;
    respose : boolean;
    autocomplete: string;
}
const submitFormData = async (formData: FormData): Promise<void> => {
    
    try {
        // Send data via ipcRenderer
      await ipcRenderer.invoke('add-order', formData);
    } catch (error) {   
        // Handle errors
        console.error('Mutation failed:', error);
        throw error;
    }
};



export default  function Add_Form(): JSX.Element {

    const [empty,isEmpty] = useState(false)

    const queryClient =  useQueryClient();
    const ordersData:any = queryClient.getQueryData(['orders']);

    const dataNamesSet: Set<string> = new Set();
    const companyNamesSet: Set<string> = new Set();
    const fabricTypeSet: Set<string> = new Set();

    ordersData.forEach((order) => {
        dataNamesSet.add(order.user.name);
        companyNamesSet.add(order.company.name);
        fabricTypeSet.add(order.fabricType);
    });
    const dataNames: string[] = Array.from(dataNamesSet);
    const companyNames: string[] = Array.from(companyNamesSet);
    const fabricType: string[] = Array.from(fabricTypeSet);

    console.log(dataNames);


    const {
         register,
            formState,
            handleSubmit,
            reset,
            setValue,


        } = useForm<Order>({
            defaultValues: {
                user: "",
                address: "",
                status: "Pending",
                createdAt: formatDate(date),
                company: "",    
                unit :"Meters",
                autocomplete: "",
            }
        });
        const { errors } = formState;

        const NewOrder = useMutation({
            mutationFn: submitFormData,
            onError: (error) => {
                    throw error;
            },
            onSuccess: () => {
                isEmpty(!empty);
                reset();
                queryClient.refetchQueries({queryKey: ['orders']});
                queryClient.refetchQueries({queryKey: ['Status']});
                queryClient.refetchQueries({queryKey: ['Percentage']});
                queryClient.refetchQueries({queryKey: ['Company']});
                queryClient.refetchQueries({queryKey: ['AllOrders']});   
            },
        }); 
    
        
        const onSubmit = async (formData: any) => {
            try {
                setValue('autocomplete','')
                NewOrder.mutate(formData)
            } catch (error) {
                console.error('Mutation failed:', error);
            }
        };
        

    return (
      <>
      <div className="form-div absolute w-[34.8vw] h-[39.7vh] bg-default rounded-lg left-[64.1vw] top-[8.9vh] shadow-[0px_4px_23.8px_7px_#68B6FF1C] z-[1]">
        <form className="relative w-[100%] h-[100%] flex" onSubmit={handleSubmit(onSubmit)}>



            <div className="form-box-1 relative h-[32.1vh] w-[14.1vw]  flex flex-col mr-auto ml-auto top-[3.5vh]">
                
                
            <label >NAME</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="user" options={dataNames} placeholder="" value={''} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('user', value, { shouldValidate: true});
        }}/>
            
                            
            <label >AMOUNT</label>

            <input type="number" step=".01"{...register("amount" ,{required:true ,valueAsNumber:true})} />
            {errors.amount ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please insert a proper amount</p>
                </h1>

                ) : (
                <h1></h1>
                )}

                    
                    
                    
                
            <label >FABRIC</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="address" options={fabricType} placeholder="" value={''} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('address', value, { shouldValidate: true});
        }}/>

                      <label >DATE</label>
                <input type="date" {...register("createdAt" ,{required:true})} />
                {errors.createdAt ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper address</p>
                </h1>

                ) : (
                <h1></h1>
                )}

               
        

            </div>

            <div className="form-box-2 relative h-[23.7vh] w-[14.1vw] flex flex-col ml-auto mr-auto top-[3.8vh]">

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
            <input className="unit" type="number" step=".01" {...register("price" ,{required:true , valueAsNumber:true})} />
            {errors.price ? (
                <h1 className="unit-h1 " style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please insert a value.</p>
                </h1>

                ) : (
                <h1 className="unit-h1"></h1>
                )}
            
            
            
         
           
           
                      
            <label >COMPANY</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="company" options={companyNames} placeholder="" value={''} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('company', value, { shouldValidate: true});
        }}/>

            </div>

            <input style={{backgroundColor: formState.isValid?'#68B6FF':'#d6d7d8'
            ,pointerEvents: formState.isValid?'auto':'none'
            , position:"absolute"
            ,top:"29.9vh"
            , left:"23vw"
            ,borderRadius:"8px"
            ,color:"#FEFEFE"
            ,fontSize:"16px"
            ,transitionDuration:"0.2s"
            ,padding:"1.6vh 2.7vw"}} type="submit" value='ADD'/>

            <div className=" absolute left-[30vw] top-[16.9vh] h-[3.5vh] w-fit ">
            <input className="unit-type" {...register("unit" ,{required:true ,maxLength:6})} />
            <h1 className="unit-type-h1"></h1> 
            </div>  
                           
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
 
