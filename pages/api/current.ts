import type { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not supported", ok: false });
  try {
    const { currentUser } = await serverAuth(req);
    return res
      .status(200)
      .json({ currentUser, message: "Succussfull", ok: true });
  } catch (error) {
    return res.status(500).json({ message: error, ok: false });
  }
};
export default handler;
