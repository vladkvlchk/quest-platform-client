// import { AxiosResponse } from 'axios';
import { AuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { cookies } from 'next/headers';

// import { ILogInResponse } from '@/lib/types';
// import axiosInstance from '@/lib/axios';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   id: 'credentials',
    //   name: 'Credentials',
    //   credentials: {
    //     identifier: { label: 'Username', type: 'text', placeholder: 'jsmith' },
    //     password: { label: 'Password', type: 'password' },
    //     rememberMe: { label: 'Remember Me', type: 'checkbox' },
    //   },
    //   authorize: async credentials => {
    //     try {
    //       const { data }: AxiosResponse<ILogInResponse> =
    //         await axiosInstance.post('/auth/local', {
    //           identifier: credentials?.identifier,
    //           password: credentials?.password,
    //         });

    //       const rememberMe = credentials?.rememberMe === 'true';
    //       const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60;
    //       const expires = new Date(Date.now() + maxAge * 1000);

    //       (await cookies()).set('maxAge', `${expires}`, {
    //         httpOnly: true,
    //         path: '/',
    //         maxAge: maxAge,
    //         sameSite: 'strict',
    //         secure: true,
    //         expires: expires,
    //       });

    //     //   const userInfo = await axiosInstance.get(
    //     //     `/users/${data.user?.id}?populate=avatar`,
    //     //     {
    //     //       headers: {
    //     //         'Content-Type': 'application/json',
    //     //         Authorization: `Bearer ${data.jwt}`,
    //     //       },
    //     //     },
    //     //   );
    //       return {
    //         id: 1
    //         // id: String(data.user?.id),
    //         // username: data.user?.username,
    //         // email: data.user?.email,
    //         // accessToken: data.jwt,
    //         // avatar: userInfo.data?.avatar || null,
    //         // firstName: userInfo.data?.firstName || null,
    //         // lastName: userInfo.data?.lastName || null,
    //         // phoneNumber: userInfo.data?.phoneNumber || null,
    //       };
    //     } catch (error) {
    //       return null;
    //     }
    //   },
    // }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // async jwt({ token, account, user, trigger, session }) {
    //   if (account) {
    //     token.accessToken = user.accessToken;
    //     token.id = user.id;
    //     token.username = user.username;
    //     token.firstName = user.firstName || '';
    //     token.lastName = user.lastName || '';
    //     token.avatar = user?.avatar || null;
    //     token.phoneNumber = user?.phoneNumber || null;
    //   }

    //   if (trigger === 'update') {
    //     token.firstName = session.user.firstName || '';
    //     token.lastName = session.user.lastName || '';
    //     token.avatar = session.user?.avatar || null;
    //     token.phoneNumber = session.user?.phoneNumber || null;
    //   }

    //   return token;
    // },
    // async session({ session, token }) {
    //   session.user.id = token.id;
    //   session.user.username = token.username;
    //   session.user.accessToken = token.accessToken;
    //   session.user.firstName = token.firstName;
    //   session.user.lastName = token.lastName;
    //   session.user.phoneNumber = token?.phoneNumber || null;
    //   session.user.avatar = token?.avatar || null;

    //   return session;
    // },
  },
  pages: {
    signIn: '/auth',
    newUser: '/auth',
  },
};