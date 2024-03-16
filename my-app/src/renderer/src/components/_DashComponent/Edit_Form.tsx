import { useForm } from "react-hook-form"
import { useMutation ,useQuery,useQueryClient } from '@tanstack/react-query';
import Autocomplete from "./AutoComplete";
import { useState,useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../App";
const { ipcRenderer } = require('electron')

type DataType = {
    User:string,
    Company:string,
    Amount:number,
    Price:number,
    FabricType:string,
    Unit:string,
    Status:string,
    CreatedAt:string,

}
  
const submitFormData = async (formData: FormData): Promise<void> => {
    
    try {
        // Send data via ipcRenderer
        console.log(formData);
      //await ipcRenderer.invoke('edit-order', formData);
    } catch (error) {   
        // Handle errors
        console.error('Mutation failed:', error);
        throw error;
    }
};

const fetchAll = async () => {
    return await ipcRenderer.invoke('fetch-All');
};



export default  function editForm(): JSX.Element {


    const {Data} = useContext(DataContext); 
    useEffect(() => {   

        setValue('Amount', Data.Amount);
        setValue('Price', Data.Price);
        setValue('CreatedAt', formatDate(Data.CreatedAt));
        setValue('User', Data.User);
        setValue('Company', Data.Company);
        setValue('FabricType', Data.FabricType);
        setValue('Unit', Data.Unit);
        setValue('Status', Data.Status);
    }, [Data]);

    const queryClient = useQueryClient();
    const [dataNames, setDataNames] = useState<string[]>([]); // Specify string[] as the type
    const [companyNames, setCompanyNames] = useState<string[]>([]); // Specify string[] as the type
    const [fabricType, setFabricType] = useState<string[]>([]); // Specify string[] as the type


    const [empty, isEmpty] = useState(false);

    const GetAllData =  useQuery({queryKey: ["fetch-All"], queryFn: fetchAll});
    useEffect(() => {

        const data = GetAllData.data as { 
            users: { name: string }[]; 
            companies: { name: string }[]; 
            fabricType: { fabricType: string }[]; 
            // Add other properties as needed 
          };

        if (GetAllData.isSuccess && GetAllData.data!==undefined) {
            const dataNamesSet = new Set<string>(); // Specify string as the type
            const companyNamesSet = new Set<string>(); // Specify string as the type
            const fabricTypeSet = new Set<string>(); // Specify string as the type
            data.users.forEach((user) => {
                dataNamesSet.add(user.name);
            });

            data.companies.forEach((company) => {
                companyNamesSet.add(company.name);
            }
            );

            data.fabricType.forEach((fabric) => {
                fabricTypeSet.add(fabric.fabricType);

            });
            setDataNames(Array.from(dataNamesSet));
            setCompanyNames(Array.from(companyNamesSet));
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
            defaultValues: 
            {
                User: '',
                Company: '',
                Amount: 0,
                Price: 0,
                FabricType: '',
                Unit: '',
                Status: '',
                CreatedAt: '',
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
                queryClient.refetchQueries({queryKey: ['allOrders']});
                queryClient.refetchQueries({queryKey: ['fetch-All']});
                queryClient.refetchQueries({queryKey: ['TopCustomers']});
                queryClient.refetchQueries({queryKey: ['GetStoreInfo']});

            },
        }); 
    
        
        const onSubmit = async (formData: any) => {
            try {

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
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="User" options={dataNames} placeholder="" value={Data.User} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
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
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="FabricType" options={fabricType} placeholder="" value={Data.FabricType} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('FabricType', value, { shouldValidate: true});
        }}/>

                      <label >DATE</label>
                <input type="date" {...register("CreatedAt" ,{required:true})} />
                {errors.CreatedAt ? (
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper address</p>
                </h1>

                ) : (
                <h1></h1>
                )}

               
        

            </div>

            <div className="form-box-2 relative h-[23.7vh] w-[14.1vw] flex flex-col ml-auto mr-auto top-[3.8vh]">

            <label >STATUS</label>
                <input type="text" {...register("Status" ,{required:true})}/>
                {errors.Status ? (  
                <h1 style={{ backgroundColor:"#FF6D6D"}}>
                    <p className="text-[12px] text-[#FF6D6D]">Please type a proper state</p>
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
            
            
            
         
           
           
                      
            <label >COMPANY</label>
            <Autocomplete setInput={isEmpty} resetInput={empty} required name="Company" options={companyNames} placeholder="" value={Data.Company} register={register} errors={errors} validationSchema={{required:true,minLength: {value: 3}}} onChange={(value) => {
          // Manually set value to the form field
          setValue('Company', value, { shouldValidate: true});
        }}/>

            </div>

            <input style={{backgroundColor: formState.isValid?'#febf19':'#d6d7d8'
            ,pointerEvents: formState.isValid?'auto':'none'
            , position:"absolute"
            ,top:"29.9vh"
            , left:"23vw"
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
 
