import { Nav } from "@/app/components/Nav"
export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav variation={1}>
      </Nav>
      <div className="w-full h-full">{children}</div>
     
    </>
  )
}