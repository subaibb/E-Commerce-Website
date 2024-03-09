import Buttons from './components/_DashComponent/Buttons'

export default function Money(): JSX.Element {
 

    return (
      <>
      <h2 className='font-medium text-4xl top-[3vh] left-[12.9vw] relative w-fit text-secondary animate-[400ms_fadeIn_forwards] '>Stores</h2>
      <Buttons isButton={4}/>
      </> 
    )
  }