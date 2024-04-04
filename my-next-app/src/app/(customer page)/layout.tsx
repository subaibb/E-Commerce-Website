import { Nav, NavLink } from "@/app/components/Nav"

export const dynamic = "force-dynamic"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Categories</NavLink>
        <NavLink href="/Deals">Deals</NavLink>
        <NavLink href="/New">What's New</NavLink>
        <NavLink href="/Again">Buy Again</NavLink>
      </Nav>
      <div className="w-full h-full">{children}</div>
    </>
  )
}