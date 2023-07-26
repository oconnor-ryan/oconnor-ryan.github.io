
export const metadata = {
  title: 'My Woodworking Gallery',
  description: `
    This is my woodworking gallery, a place where I keep pictures of my intarsias, 
    scrollworks, relief carvings, caricatures, woodturned workpieces, and more.
  `,
}


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