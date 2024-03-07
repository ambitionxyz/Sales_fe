import NextAuth from "next-auth";
import Cookie from "js-cookie";

import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Login", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { login, password } = credentials;

        const myHeadersPOST = new Headers();
        myHeadersPOST.append("accept", "*/*");
        myHeadersPOST.append("Content-Type", "application/json-patch+json");

        const raw = JSON.stringify({
          login: login,
          password: password,
        });

        const res = await fetch("http://localhost:6060/api/User", {
          method: "POST",
          headers: myHeadersPOST,
          body: raw,
        });

        const resGetToken = await res.json();

        const accessToken = resGetToken.token;

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const resGETUSER = await fetch("http://localhost:6060/api/User", {
          method: "GET",
          headers: myHeaders,
        });
        const data = await resGETUSER.json();

        const user = {
          accessToken,
          ...data,
        };

        if (accessToken && data) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ user, account, token }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
