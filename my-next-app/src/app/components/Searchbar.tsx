

export function Searchbar ():JSX.Element{
    return(
      <div className="bg-background w-[350px] h-[40px] rounded-[40px] flex items-center Search-Bar transition duration-150 m-auto">
        <div className="Search-img w-[10%] h-full bg-transparent rounded-[40px] hover:bg-[#dbd8d8] transition duration-150 "/>
        <input placeholder="Search" type="text" className="bg-transparent w-[90%] h-[100%] SearchBar-Input rounded-r-[40px] text-lg font-bold" />
      </div>
    )
}