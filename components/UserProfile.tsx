"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import Badge from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { Mail, User, LogOut, Shield, ArrowRight } from "lucide-react";

export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex flex-col justify-center items-center p-12">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-default-600">Loading your profile...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <Card className="max-w-md mx-auto border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex gap-2.5 pt-6">
          <div className="p-1.5 bg-neutral-100 rounded-lg">
            <User className="h-4 w-4 text-neutral-700" />
          </div>
          <h2 className="text-base font-semibold text-neutral-900">User Profile</h2>
        </CardHeader>
        <Divider />
        <CardBody className="text-center py-10">
          <div className="mb-6">
            <Avatar name="Guest" size="lg" className="mx-auto mb-4 ring-1 ring-neutral-200" />
            <p className="text-lg font-semibold text-neutral-900">Not Signed In</p>
            <p className="text-neutral-500 mt-2 text-sm">
              Please sign in to access your profile
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => router.push("/sign-in")}
            className="px-8 bg-neutral-900 text-white hover:bg-neutral-800 font-medium"
            endContent={<ArrowRight className="h-4 w-4" />}
          >
            Sign In
          </Button>
        </CardBody>
      </Card>
    );
  }

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  const email = user.primaryEmailAddress?.emailAddress || "";
  const initials = fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const userRole = user.publicMetadata.role as string | undefined;

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  return (
    <Card className="max-w-md mx-auto border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex gap-2.5 pt-6">
        <div className="p-1.5 bg-neutral-100 rounded-lg">
          <User className="h-4 w-4 text-neutral-700" />
        </div>
        <h2 className="text-base font-semibold text-neutral-900">User Profile</h2>
      </CardHeader>
      <Divider />
      <CardBody className="py-6 px-8">
        <div className="flex flex-col items-center text-center mb-6">
          {user.imageUrl ? (
            <Avatar
              src={user.imageUrl}
              alt={fullName}
              size="lg"
              className="mb-4 h-20 w-20 ring-1 ring-neutral-200"
            />
          ) : (
            <Avatar
              name={initials}
              size="lg"
              className="mb-4 h-20 w-20 text-base ring-1 ring-neutral-200"
            />
          )}
          <h3 className="text-lg font-semibold text-neutral-900">{fullName}</h3>
          {user.emailAddresses && user.emailAddresses.length > 0 && (
            <div className="flex items-center gap-2 mt-2 text-neutral-500">
              <Mail className="h-3.5 w-3.5" />
              <span className="text-sm">{email}</span>
            </div>
          )}
          {userRole && (
            <Badge
              variant="flat"
              className="mt-3 bg-neutral-100 text-neutral-700"
              aria-label={`User role: ${userRole}`}
            >
              {userRole}
            </Badge>
          )}
        </div>

        <Divider className="my-4" />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-neutral-500" />
              <span className="font-medium text-sm text-neutral-700">Account Status</span>
            </div>
            <Badge
              variant="flat"
              className="bg-green-50 text-green-700 text-xs"
              aria-label="Account status: Active"
            >
              Active
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-neutral-500" />
              <span className="font-medium text-sm text-neutral-700">Email Verification</span>
            </div>
            <Badge
              variant="flat"
              className={user.emailAddresses?.[0]?.verification?.status === "verified"
                ? "bg-green-50 text-green-700 text-xs"
                : "bg-yellow-50 text-yellow-700 text-xs"
              }
              aria-label={`Email verification status: ${
                user.emailAddresses?.[0]?.verification?.status === "verified"
                  ? "Verified"
                  : "Pending"
              }`}
            >
              {user.emailAddresses?.[0]?.verification?.status === "verified"
                ? "Verified"
                : "Pending"}
            </Badge>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between px-8 py-5">
        <Button
          variant="bordered"
          startContent={<LogOut className="h-4 w-4" />}
          onClick={handleSignOut}
          className="border-red-300 text-red-600 hover:bg-red-50"
        >
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
}