import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res
      .status(405)
      .json({ message: "Method doesn't support", ok: false });

  try {
    await serverAuth(req);
    const movieCount = await prisma.movie.count();
    const randomNumber = Math.floor(Math.random() * +movieCount);    
    const randomMovie = await prisma.movie.findFirst({
      skip: randomNumber,
    });
    return res
      .status(200)
      .json({ message: "Succussfully", movie: randomMovie, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, ok: false });
  }
};

export default handler;
