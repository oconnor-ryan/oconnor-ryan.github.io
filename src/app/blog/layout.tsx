
export const metadata = {
  title: "Blog",
  description: `
  In this blog, I post about topics relating to programming, web development, mobile development,
  and woodworking. 
  `
};

//note that this layout will inherit from any layout in the parent's directory
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    children
  )
}