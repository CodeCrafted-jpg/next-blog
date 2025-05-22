import { getAuthSession } from "../../../../utils/auth"
import prisma from "../../../../utils/connect"
import { NextResponse } from "next/server"

//GET SINGLE POST

export const GET = async (req,{params}) => {
 const {slug}=params
try{

  const post=await prisma.post.update({
    where:{slug},
    data:{views:{increment:1}},
    include:{user:true}
  })
  
    return new NextResponse(JSON.stringify(post), {
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

export const DELETE = async (req, { params }) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const { slug } = params;

  if (!slug) {
    return new NextResponse(
      JSON.stringify({ message: "Slug is required" }),
      { status: 400 }
    );
  }

  try {
    // Find the post by slug
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }),
        { status: 404 }
      );
    }

    // Check if the logged-in user is the post owner
    if (existingPost.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Forbidden" }),
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { slug },
    });

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE error:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
};