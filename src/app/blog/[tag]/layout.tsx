import { getAllTags } from "@/lib/blog-post-handler";

export function generateStaticParams() {
  //use urlTag because this function generates the names of each dynamic route used in URL
  return getAllTags().map(tagWrapper => ({tag: tagWrapper.urlTag})); 
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