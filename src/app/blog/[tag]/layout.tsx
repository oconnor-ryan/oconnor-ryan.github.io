import { getAllTags } from "@/lib/blog-post-handler";

export function generateStaticParams() {
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