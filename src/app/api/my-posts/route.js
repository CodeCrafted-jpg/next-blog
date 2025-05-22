import { getAuthSession } from "../../../utils/auth";
import prisma from "../../../utils/connect";
import { NextResponse } from "next/server";

// GET My Posts
export const GET = async (req) => {
  const session = await getAuthSession();

  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const POST_PER_PAGE = 2;

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where: {
          userEmail: session.user.email,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.post.count({
        where: {
          userEmail: session.user.email,
        },
      }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};
