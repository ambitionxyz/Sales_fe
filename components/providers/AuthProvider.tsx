import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const AuthProvider = async ({ children }: { children: any }) => {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
