import Image from "next/image";
import SearchForm from "@/src/app/components/searchForm";
import StartupCard, { StartupCardType } from "../components/StartupCard";
// import { client } from "@/src/sanity/lib/client";
import { startup_query } from "@/src/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/src/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home( 
  {searchParams}:
  {
  searchParams: Promise<{query?:string}>}
) 
{
  const query =(await searchParams).query
  const params ={ search: query || null }
  // const posts =await client.fetch(startup_query)
  const {data:posts} =await sanityFetch({query:startup_query,params})
  // const post = [
  //   {
  //     _createdAt:new Date(),
  //     views:55,
  //     author:{
  //       _id:1,
  //       name:'sekinah'
  //     },
  //     _id:1,
  //     description:'This is a description',
  //     image:'https://images.unsplash.com/photo-1634912314704-c646c586b131?q=80&w=2940&auto=format&fit=crop&ixilib=rb-4.03&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //     category:"Robots",
  //     title:"We Robots"
  //   }
  // ]

  const session = await  auth()
  console.log(session?.id);

  console.log(JSON.stringify(posts,null,2));
  // console.log(quer);
  
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch your Startup, <br /> Connect with Entrepreneurs </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"`: 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {
            posts?.length > 0 ?
            (
              posts.map((post:StartupCardType,index:number)=>(
                <StartupCard key={post?._id} post={post}/>
              ))
            )
            :
            (
              <p className="no-results">No startups found</p>
            )
          }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
