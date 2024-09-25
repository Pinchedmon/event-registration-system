import { db } from "@/server/db";

async function main() {
  // Create an admin user
  const adminUser = await db.user.create({
    data: {
      email: "admin@example.com",
      password: "password123",
      role: "ADMIN",
      firstName: "Admin",
      lastName: "User",
    },
  });

  console.log(`Admin user created with ID: ${adminUser.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
