import Arrow_Up from '../../public/arrow-up.svg'
import Arrow_Down from '../../public/arrow-down.svg'



props: {
    img: {
        type: String;
    }
    percentage:{
        type: String;
    }
}
export default  function Arrows({img,percentage}): JSX.Element {

    const ImgSrc:any = img === 'up' ? Arrow_Up : Arrow_Down

    return (
      <>
      <div className='flex absolute left-[13.3vw] top-[4.8vh] items-center justify-center h-[1.43vh] w-[2.53vw]'>
      <img className='h-[33px] w-[33px]' src={ImgSrc}/>
        <label className='text-[16px]' style={{color:img==='up'?'#7cbe81':'#F75891'}}>{percentage}</label>
        </div>
      </>
     
      
    ) 
  }