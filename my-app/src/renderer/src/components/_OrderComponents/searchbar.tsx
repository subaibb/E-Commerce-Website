import Search from './../../public/Search.svg';



export default function searchBar(): JSX.Element {
    
    return (
    <>
        <div className="w-[18.6vw] h-[4vh] bg-[#eaeaea] rounded-[8px] absolute top-[3.2vh] left-[2vw]">
            <img src={Search} className='absolute h-7 w-7 top-1 left-1' />
            <input  className="bg-[#eaeaea] w-[16.2vw] h-[3.4vh] absolute top-[0.3vh] left-[1.96vw] focus:outline-none text-secondary " type="search" placeholder='Search anything...'  />

        </div>
    </>
    
    ) 
}