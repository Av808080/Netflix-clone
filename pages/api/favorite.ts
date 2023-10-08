import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";
import { without } from "lodash";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          favoriteIds: {
            push: [movieId],
          },
        },
      });
      return res.status(201).json({ message: "Completed" });
    } catch (error) {
      console.log(error);
      return res.status(402).json({ message: error, ok: false });
    }
  }
  if (req.method === "GET") {
    try {
      const { currentUser } = await serverAuth(req);
      console.log(currentUser);
      
      const user = await prisma.user.findUnique({
        where: {
          id: currentUser.id,
        },
      });
      if (user) {
        const movies = await prisma.movie.findMany({
          where: {
            id: {
              in: user.favoriteIds,
            },
          },
        });
        return res.status(200).json({ ok: true, movies });
      }
    } catch (error) {
      console.log(error);
      return res.status(522).json({ ok: false });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          favoriteIds: without(currentUser.favoriteIds, movieId),
        },
      });
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.status(512).json({ ok: false });
    }
  }
};
export default handler;
