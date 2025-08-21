import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./src/sanity/lib/client"
import { author_id } from "./src/sanity/lib/queries"
import { writeClient } from "./src/sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({
      user:{name,email,image},
      profile:{id,login,bio}}){
      const existinguser = await 
      client.withConfig({useCdn:false}).
      fetch(author_id,{id})
      if (!existinguser) {
        await writeClient.create({
          _type:'author',
          id,
           name,
          username: login,
          email,
          image,
          bio:bio || ''
        })
      }
      return true
    },
    async jwt({token,profile,account}){
      if (account && profile) {
        const user = await client.withConfig({useCdn:false}).fetch(author_id,{id:profile?.id,});
        token.id = user?._id;
      }
      return token
    },
    async session({session,token}){
      Object.assign(session,{id:token.id})
      return session
    }
  }
})


