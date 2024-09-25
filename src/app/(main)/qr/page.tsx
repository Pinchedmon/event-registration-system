import { api, HydrateClient } from "@/trpc/server";
import { QR } from "./_components/qr";
export default async function QRPage() {
  return (
    <HydrateClient>
      <div className="justifye-center mb-4 mt-4 flex min-h-screen">
        <QR />
      </div>
    </HydrateClient>
  );
}
