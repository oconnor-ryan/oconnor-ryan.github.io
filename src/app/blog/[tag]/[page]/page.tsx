import BlogSearchPage from '../page';

export default function BlogSearchPage1({params}: {params: {tag: string, page: string}}) {
  return <BlogSearchPage params={params}/>
}