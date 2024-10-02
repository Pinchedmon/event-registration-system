import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function DashPage() {
  const session = await getServerAuthSession();
  if (session?.user.role == "USER" || !session) {
    return redirect("/home");
  }
  return (
    <HydrateClient>
      <div className="text-2xl font-bold">Панель управления</div>
    </HydrateClient>
  );
}
