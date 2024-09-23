import { type Metadata } from "next";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "Events",
  description: "A lot of events here",
};

export default function DashLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
