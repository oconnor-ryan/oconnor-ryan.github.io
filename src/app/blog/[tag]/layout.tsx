import { getAllTags } from "@/lib/blog-post-handler";

export function generateStaticParams() {
  //replace " " with - so that the URL has no spaces. Spaces in URLS causes issues in many web servers
  return getAllTags().map(tag => ({tag: tag})); 
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