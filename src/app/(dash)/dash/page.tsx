import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import Navbar from "./_components/navbar";

export default async function DashPage() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <div>main</div>
    </HydrateClient>
  );
}
{
  /* <div className="flex-col md:flex">
<div className="border-b">
  <Navbar />
</div>
</div> */
}
