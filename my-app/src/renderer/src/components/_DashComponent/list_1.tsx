import smallArrow from '../../public/mini-arrow.svg';
import trashBin from '../../public/trash-bin.svg';
import editPen from '../../public/edit-pen.svg';
import {useMutation,useQueryClient} from '@tanstack/react-query';
import { useContext } from 'react';
import {DataContext} from '../../App';
const { ipcRenderer } = require('electron');




function List_1({id,setShow,Position,setHover}): JSX.Element {

  
  const {setData} = useContext(DataContext);

    //customer removal 
    
    const queryClient = useQueryClient();
  
  const Delete_Mutation = useMutation({
    mutationFn: async () => {
      await ipcRenderer.invoke('remove-orders', id);
    },
    onSuccess: () => {
      queryClient.refetchQueries({queryKey: ['orders'] });
      queryClient.refetchQueries({queryKey: ['Status'] });
      queryClient.refetchQueries({queryKey: ['Percentage']});
      queryClient.refetchQueries({queryKey: ['Company']});
      queryClient.refetchQueries({queryKey: ['allOrders']});
      queryClient.refetchQueries({queryKey: ['Overview']});
      queryClient.refetchQueries({queryKey: ['CustomerStatus']});
      queryClient.refetchQueries({queryKey: ['CustomerOverview']});
      queryClient.refetchQueries({queryKey: ['Customer']});
      queryClient.refetchQueries({queryKey: ['TopCustomers']});
      queryClient.refetchQueries({queryKey: ['GetStoreStatus']});
      queryClient.refetchQueries({queryKey: ['CompanyOrdersFetching']});
      queryClient.refetchQueries({queryKey: ['GetStoreInfo']});
      queryClient.refetchQueries({queryKey: ['Companyfetching']});
      queryClient.refetchQueries({queryKey: ['GetAnalytics']});
    }
  });


  
    
  const Delete = (id:any) => {
    try {
      Delete_Mutation.mutate(id);
    }
    catch (error) {
      console.error('Mutation failed:', error);
    }
  }

    const Edit = useMutation({
      mutationFn: async () => {
        return await ipcRenderer.invoke('fetch-order', id);
      },
      onSuccess: (data) => {
        setData(data);
      }
    });



    const handleEdit = async (id) => {
      try {
        Edit.mutate(id);
      } catch (error) {
        console.error('An error occurred during mutation:', error);
      }
    };


  
  
     
  
      return(
         
  
        
          <ul className="List-1" style={{top:Position?'-7vh':'2.9vh'}}>
  
           <li style={{backgroundImage:`url(${smallArrow})`}} onMouseEnter={()=>{setHover(true);}}><span>Status</span></li>
           <li style={{backgroundImage:`url(${editPen})`   }} onMouseEnter={()=>{setHover(false);}} onClick={()=>{setShow(pervsetsgate => !pervsetsgate); handleEdit(id)}}><span>Edit</span></li>
           <li style={{backgroundImage:`url(${trashBin})`  }} onMouseEnter={()=>{setHover(false);}} onClick={()=>{setShow(pervsetsgate => !pervsetsgate); Delete(id);} }><span>Remove</span></li>
          </ul> 
         
  
      )
  
  }
  
  export default List_1;