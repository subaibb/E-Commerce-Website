
import { useParams } from 'react-router-dom';
import Buttons from './components/_DashComponent/Buttons';
import Background from './components/_DashComponent/bg';
import Stats from './components/_CustomerProfile/Stats';
import CustomerWidgets from './components/_CustomerProfile/CustomerWidgets';
import CustomerTable from './components/_CustomerProfile/CustomerTable';
import UpperWrapper from './components/_CustomerProfile/UpperWrapper';

export default function CustomerProfile(): JSX.Element {

   

    const { id } = useParams<{ id: string }>();

    return (
      <> 
      
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards]'>Customer Profile</h2>
      <Background />
      
        <Buttons isButton={3}/>
        <Stats id={id} />
        <div className='w-[77.9vw] h-fit absolute top-[31.9vh] left-[14.8vw] flex'>
        <CustomerWidgets id={id} />
        <CustomerTable id={id}/>
        </div>
        <UpperWrapper id={id} />

      </>
    )
  }
  
  