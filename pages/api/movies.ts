import type { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import prisma from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res
      .status(405)
      .json({ messgae: "Method not support by this route", ok: false });
  try {
    await serverAuth(req);
    const movies = await prisma.movie.findRaw({
      filter: {}
    });
    return res.status(200).json({ message: "Succuessfull", movies, ok: true });
  } catch (error) {
    return res.status(500).json({ message: "Can't get Movies", ok: false });
  }
};

export default handler;
