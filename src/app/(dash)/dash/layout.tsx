import { type Metadata } from "next";
import Navbar from "./_components/navbar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Events",
  description: "A lot of events here",
};

export default async function DashLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();
  if (session?.user.role == "USER" || !session) {
    return redirect("/home");
  }
  return (
    <main className={"flex h-screen w-full flex-col"}>
      <div className="container mx-auto flex flex-col justify-center">
        <Navbar />
        <div className="flex justify-center p-4">
          <div className="container flex w-full">{children}</div>
        </div>
      </div>
    </main>
  );
}
