import { getAuthSession } from "../../../utils/auth";
import prisma from "../../../utils/connect"
import { NextResponse } from "next/server"

//GET ALL COMMENTS OF A POST

export const GET = async (req) => {
 const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    // console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


//CREATE A COMMENT ON A POST

export const POST = async (req) => {
  const session= await getAuthSession()
    if(!session){
     return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 }) 
  ) }
  


  try {
    const body=await req.json()
    const comment = await prisma.comment.create({
     
       data:{ ...body,userEmail:session.user.email}
    
  
    });

    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
     console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// DELETE a comment by ID (only if owned by the user)
export const DELETE = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("id");

  if (!commentId) {
    return new NextResponse(
      JSON.stringify({ message: "Comment ID is required" }),
      { status: 400 }
    );
  }

  try {
    // Find the comment
    const existingComment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!existingComment) {
      return new NextResponse(
        JSON.stringify({ message: "Comment not found" }),
        { status: 404 }
      );
    }

    // Make sure the comment belongs to the current user
    if (existingComment.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Forbidden" }),
        { status: 403 }
      );
    }

    // Delete the comment
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Comment deleted successfully" }),
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