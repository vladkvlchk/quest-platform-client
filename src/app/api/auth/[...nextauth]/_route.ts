import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { cookies } from 'next/headers';
import { authOptions } from './authOptions';

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

const handler = async (req: CombineRequest, res: CombineResponse) => {
  const maxAge = (await cookies()).get('maxAge')?.value;
  const time = (new Date(maxAge!).getTime() - new Date().getTime()) / 1000;
  return await NextAuth(req, res, {
    ...authOptions,
    session: {
      ...authOptions.session,
      maxAge: time || 24 * 60 * 60,
    },
  });
};

export { handler as GET, handler as POST };