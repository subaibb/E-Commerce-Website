
import { Header } from "../shopall/_components/Header";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/admin/products");
  return (
    <>
      <Header />
    </>
  );  
}
