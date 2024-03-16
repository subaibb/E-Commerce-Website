import { useForm } from "react-hook-form"
import { useMutation ,useQuery,useQueryClient } from '@tanstack/react-query';
import Autocomplete from "../_DashComponent/AutoComplete";
import { useState,useEffect } from "react";
import { DataContextCompany,ShowContextCompany } from "@renderer/StoreProfile";
import { useContext } from "react";
const { ipcRenderer } = require('electron')
const date = new Date();

type DataType  = {
    User:string,
    Company:string,
    Amount:number,
    Price:number,
    FabricType:string,
    Unit:string,
    Status:string,
    CreatedAt:string,
    OrderID?:string,
}
const submitFormData = async (formData: FormData): Promise<void> => {


    
    
    try {
        console.log(formData);
        // Send data via ipcRenderer
      await ipcRenderer.invoke('edit-order', formData);
    } catch (error) {   
        // Handle errors
        console.error('Mutation failed:', error);
        throw error;
    }
};

const fetchAll = async () => {
    return await ipcRenderer.invoke('fetch-All');
};



export default  function CustomerAddForm(): JSX.Element {
    const queryClient = useQueryClient();
    const [CustomerNames,setCustomerNames] = useState<string[]>([]);
    const [fabricType, setFabricType] = useState<string[]>([]); // Specify string[] as the type
    const {DataCompany} = useContext(DataContextCompany);
    const [empty, isEmpty] = useState(false);
    const {isCompanyVisible} = useContext(ShowContextCompany);
    const GetAllData =  useQuery({queryKey: ["fetch-All"], queryFn: fetchAll});


    useEffect(() => {   
        if (DataCompany === undefined) {
            return;
        }-
        setValue('Amount', DataCompany.Amount);
        setValue('Price', DataCompany.Price);
        setValue('CreatedAt', formatDate(DataCompany.CreatedAt));
        setValue('User', DataCompany.User);
        setValue('Company', DataCompany.Company);
        setValue('FabricType', DataCompany.FabricType);
        setValue('Unit', DataCompany.Unit);
        setValue('Status', DataCompany.Status);
        setValue('OrderID', DataCompany.OrderID);
    }, [DataCompany]);


    useEffect(() => {

        const data = GetAllData.data as { 
            users: { name: string }[]; 
            companies: { name: string }[]; 
            fabricType: { fabricType: string }[]; 
            // Add other properties as needed 
          };

          if (GetAllData.isSuccess && GetAllData.data!==undefined) {
            const customerNamesSet = new Set<string>(); // Specify string as the type
            const fabricTypeSet = new Set<string>(); // Specify string as the type

        data.users.forEach((user) => {
            customerNamesSet.add(user.name);
        }
        );

        data.fabricType.forEach((fabric) => {
            fabricTypeSet.add(fabric.fabricType);

        });
        setCustomerNames(Array.from(customerNamesSet));
        setFabricType(Array.from(fabricTypeSet));
    }
}, [GetAllData.isSuccess, GetAllData.data]);



    const {
         register,
            formState,
            handleSubmit,
            reset,
            setValue,


        } = useForm<DataType>({
            defaultValues: {
                User: '',
                Company: '',
                Amount: 0,
                Price: 0,
                FabricType: '',
                Unit: '',
                Status: '',
                CreatedAt: formatDate(date),
            },
            mode: 'onBlur',
            reValidateMode: 'onChange',
            criteriaMode: 'firstError',
            shouldFocusError: true,
            shouldUnregister: true,
            
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
                queryClient.refetchQueries({queryKey: ['GetStoreStatus']});
                queryClient.refetchQueries({queryKey: ['CompanyOrdersFetching']});
                queryClient.refetchQueries({queryKey: ['GetStoreInfo']});
                queryClient.refetchQueries({queryKey: ['GetAnalytics']});
            },
        }); 
    
        
        const onSubmit = async (formData: any) => {
            try {

                const formattedForData = trimObjectValues(formData);
                const Keys1 = Object.keys(formattedForData);

                for (const key of Keys1) {
                    if (formattedForData[key] !== DataCompany[key]) {
                        NewOrder.mutate(formData)
                    }
                  }
                  isCompanyVisible(false);
                  isEmpty(!empty);
                    reset();
            } catch (error) {
                console.error('Mutation failed:', error);
            }
        };

    return (
      <>
      <div className="form-div absolute w-[34.8vw] h-[39.7vh] bg-default rounded-lg right-[3vw] bottom-[51vh] shadow-[0px_4px_23.8px_7px_#68B6FF1C] z-[999]">
        <form className="relative w-[100%] h-[100%] flex" onSubmit={handleSubmit(onSubmit)}>



            <div className="form-box-1 relative h-[23.7vh] w-[14.1vw]  flex flex-col mr-auto ml-auto top-[3.5vh]">

            <label >NAME</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="User" options={CustomerNames} placeholder="" value={DataCompany.User || ""} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('User', value, { shouldValidate: true});
        }}/>
                 
            <label >AMOUNT</label>

            <input type="number" step=".01"{...register("Amount" ,{required:true ,valueAsNumber:true})} />
            {errors.Amount ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please insert a proper amount</p>
                </h1>

                ) : (
                <h1></h1>
                )}

                    
                    
                    
                
            <label >FABRIC</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="FabricType" options={fabricType} placeholder="" value={DataCompany.FabricType} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('FabricType', value, { shouldValidate: true});
        }}/>

                      

               
        

            </div>

            <div className="form-box-2 relative h-[23.7vh] w-[14.1vw] flex flex-col ml-auto mr-auto top-[3.8vh]">

            <label >DATE</label>
                <input type="date" {...register("CreatedAt" ,{required:true})} />
                {errors.CreatedAt ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper address</p>
                </h1>

                ) : (
                <h1></h1>
                )}
            
            <label >UNIT PRICE</label>
            <input className="unit" type="number" step=".01" {...register("Price" ,{required:true , valueAsNumber:true})} />
            {errors.Price ? (
                <h1 className="unit-h1 " style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please insert a value.</p>
                </h1>

                ) : (
                <h1 className="unit-h1"></h1>
                )}
        
            <label >STATUS</label>
                <input type="text" {...register("Status" ,{required:true})}/>
                {errors.Status ? (  
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper state</p>
                </h1>
                    
                ) : (
                <h1></h1>
                )}
          
            </div>

            <input style={{backgroundColor: formState.isValid?'#febf19':'#d6d7d8'
            ,pointerEvents: formState.isValid?'auto':'none'
            , position:"absolute"
            ,top:"29.9vh"
            , left:"25vw"
            ,borderRadius:"8px"
            ,color:"#FEFEFE"
            ,fontSize:"16px"
            ,transitionDuration:"0.2s"
            ,padding:"1.6vh 2.7vw"}} type="submit" value='UPDATE'/>

            <div className=" absolute left-[30vw] top-[16.7vh] h-[3.5vh] w-fit ">
            <input className="unit-type" {...register("Unit" ,{required:true ,maxLength:6})} />
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
 
function trimObjectValues(obj) {
    const trimmedObj = {};
  
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
  
        // Check if the value is a string
        if (typeof value === 'string') {
          // Trim spaces from start and end
          trimmedObj[key] = value.trim();
        } else {
          // Keep non-string values as is
          trimmedObj[key] = value;
        }
      }
    }
  
    return trimmedObj;
  }