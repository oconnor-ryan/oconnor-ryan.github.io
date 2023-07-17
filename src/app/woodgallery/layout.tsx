
export const metadata = {
  title: "Wood Gallery",
  description: "I override the parent Layout's metadata"
};

import { getImageMetaData } from "@/lib/woodgallery-image-handler";

import {IMAGES_PER_PAGE} from "./page";

export function generateStaticParams() {
  let imageData = getImageMetaData()
  let numPages = Math.ceil(imageData.length / IMAGES_PER_PAGE);

  return Array.from(
    {length: numPages},
    (_, i) => ({page: String(i + 2)})
  )
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