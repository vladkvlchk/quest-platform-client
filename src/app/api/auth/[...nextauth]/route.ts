import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

import { authOptions } from "./authOptions";

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

const handler = async (req: CombineRequest, res: CombineResponse) => {
  return await NextAuth(req, res, {
    ...authOptions,
    session: {
      ...authOptions.session,
      maxAge: 24 * 60 * 60,
    },
  });
};

export { handler as GET, handler as POST };
