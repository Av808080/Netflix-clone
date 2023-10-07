import type { NextApiRequest, NextApiResponse } from "next/types";
import serverAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res
      .status(405)
      .json({ message: "This method not supported by this route", ok: false });
  const { movieId } = req.query;
  if (typeof movieId !== "string")
    return res.status(404).json({ message: "Invalid Id", ok: false });
  try {
    const { currentUser } = await serverAuth(req);
    console.log(currentUser);

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    res
      .status(200)
      .json({ message: "Fetch movie succussfully ", movie, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Can't recieve data", ok: false });
  }
};
export default handler;
