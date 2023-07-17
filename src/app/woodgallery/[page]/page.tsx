import WoodGallery from '../page';

import { getImageMetaData } from "@/lib/woodgallery-image-handler";

import {IMAGES_PER_PAGE} from "../page";


//MUST KEEP THIS FUNCTION HERE AND NOT IN ../page
//OR ELSE DYNAMIC URLS WILL NOT BE GENERATED IN STATIC EXPORT
export function generateStaticParams() {
  let imageData = getImageMetaData()
  let numPages = Math.ceil(imageData.length / IMAGES_PER_PAGE);

  return Array.from(
    {length: numPages - 1},
    (_, i) => ({page: String(i + 2)})
  )
}

export default function WoodGalleryPage({params} : {params: {page: string}}) {
  return <WoodGallery params={params}/>
}