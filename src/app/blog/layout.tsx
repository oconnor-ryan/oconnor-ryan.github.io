
export const metadata = {
  title: "Blog",
  description: "I override the parent Layout's metadata"
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