import { HydrateClient } from "@/trpc/server";

import { UsersTable } from "./users-table";

export default async function EventsPage() {
  return (
    <HydrateClient>
      <main className="w-full text-2xl">
        <UsersTable />
      </main>
    </HydrateClient>
  );
}
