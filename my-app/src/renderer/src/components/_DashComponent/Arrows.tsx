import Arrows from '../../public/Arrow.svg'

export default  function Arrow(): JSX.Element {

    return (
        <>
        <div className=' absolute w-fit h-[3vh] flex justify-center align-middle left-[85vw] top-[34.3vh] cursor-pointer animate-[500ms_fadeIn_forwards]'>
        <label className='text-[#904EFE] text-[14px] cursor-pointer'>View all</label>
        <img src={Arrows} className='h-[24px] w-[24px] relative left-[0.2vw] top-[-0.15vh]'/>
      </div>    
      <div className=' absolute w-fit h-[3vh] flex justify-center align-middle left-[82.8vw] top-[70.3vh] cursor-pointer animate-[500ms_fadeIn_forwards]'>
        <label className='text-[#904EFE] text-[14px] cursor-pointer'>View all</label>
        <img src={Arrows} className='h-[24px] w-[24px] relative left-[0.2vw] top-[-0.15vh]'/>
      </div>
        </>     
    ) 
  }