import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { auth } from "auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignIn, SignOut } from "./auth-components";
import { DefaultSession } from "next-auth";

// export interface DefaultSession {
//   user?: User
//   expires: ISODateString
// }

type ISODateString = string;
export type UserCustome = {
  accessToken: string;
  login: string;
  password: string;
  avatar: string;
  id: string;
};
export interface CustomeSession {
  user: UserCustome;
  expires: ISODateString;
}

export default async function UserButton() {
  const session = (await auth()) as CustomeSession;

  console.log(session);
  if (!session?.user) return <SignIn />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-8 h-8 rounded-full">
          <Avatar className="w-8 h-8">
            {session.user.avatar && (
              <AvatarImage
                src={session.user?.avatar}
                alt={session.user.login ?? ""}
              />
            )}
            {/* <AvatarFallback>{session.user.email}</AvatarFallback> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.login}
            </p>
            {/* <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
