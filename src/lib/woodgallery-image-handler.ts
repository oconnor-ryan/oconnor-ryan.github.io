import metadata from "@/wood-image-metadata.json";


interface MetaData {
  [key: string] : {
    caption: string,
  }
}

export function getImageMetaData() {
  return Object.keys(metadata).map(url => ({
    imageUrl: url, 
    caption: (metadata as MetaData)[url].caption
  }));
}

export function getImageUrls() {
  return Object.keys(metadata);
}