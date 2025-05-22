import { getAuthSession } from "../../../utils/auth"
import prisma from "../../../utils/connect"
import { NextResponse } from "next/server"


//GET POSTS

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get("page") || "1")
  const cat=searchParams.get('cat')
  const POST_PER_PAGE = 2
const quary={
      take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where:{
      ...(cat && {catSlug:cat})
    }
}
  try {
    
    const [posts,count] = await prisma.$transaction([
      prisma.post.findMany(quary),
      prisma.post.count({where:quary.where})
    ])
    return new NextResponse(JSON.stringify({posts,count}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}


//CREATE  A POST

export const POST = async (req) => {
  const session= await getAuthSession()
    if(!session){
     return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 }) 
  ) }
  


  try {
    const body=await req.json()
    const post = await prisma.post.create({
     
       data:{ ...body,userEmail:session.user.email}
    
  
    });

    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
     console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};