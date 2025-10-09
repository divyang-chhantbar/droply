import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";
import { CloudUpload } from "lucide-react";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Serialize the user data to avoid passing the Clerk User object directly
  const serializedUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        username: user.username,
        emailAddress: user.emailAddresses?.[0]?.emailAddress,
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar user={serializedUser} />

      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 max-w-7xl">
        <DashboardContent
          userId={userId}
          userName={
            user?.firstName ||
            user?.fullName ||
            user?.emailAddresses?.[0]?.emailAddress ||
            ""
          }
        />
      </main>

      <footer className="bg-white border-t border-neutral-200 py-6">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="p-1.5 bg-neutral-900 rounded-lg">
                <CloudUpload className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-neutral-900">Droply</h2>
            </div>
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} Droply. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}