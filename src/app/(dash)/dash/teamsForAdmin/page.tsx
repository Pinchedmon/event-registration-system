import { HydrateClient } from "@/trpc/server";
import { TeamsTable } from "./teams-table";

export default async function EventsPage() {
  return (
    <HydrateClient>
      <main className="w-full text-2xl">
        <TeamsTable />
      </main>
    </HydrateClient>
  );
}
