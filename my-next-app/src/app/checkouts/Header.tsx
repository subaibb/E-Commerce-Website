import Link from "next/link";



export function Header() {
  return (
    <div className="w-full h-[15vh] bg-[#C1C2AD] rounded-b-[50px] flex justify-center items-center absolute z-30">
        <Link href="/">
        <h1 className="text-3xl text-textprimary ">PaliWear</h1>
        </Link>
    </div>
  );
}