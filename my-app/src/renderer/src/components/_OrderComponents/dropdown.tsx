
import Arrow from '../../public/dropDown.svg'
import priceTag from '../../public/priceTag.svg'
import calendar from '../../public/Calendar.svg'
import filters from '../../public/Filters.svg'
export default function dropDown({label,img}): JSX.Element {

  
    
    return (
    <>
    <button className=" dropDown w-[8.7vw] h-[4.8vh] border-2 border-[#EAEAEA] relative m-auto rounded-[12px] transition duration-150">
        <img src={img = img === 1 ? priceTag : img === 2 ? calendar : filters} className=' absolute h-[26px] w-[26px] top-2 left-3'  />
        <label className=" font-semibold absolute top-3 left-[2.6vw] ">{label}</label>
            
        <img src={Arrow} className='absolute h-[22px] w-[17px] left-[6.8vw] top-3'/>
    </button>
    </>
    
    ) 
}