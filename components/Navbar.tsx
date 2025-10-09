"use client";

import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudUpload, ChevronDown, User, Menu, X } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface SerializedUser {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  imageUrl?: string | null;
  username?: string | null;
  emailAddress?: string | null;
}

interface NavbarProps {
  user?: SerializedUser | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  const userDetails = {
    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",
    email: user?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`bg-white/80 backdrop-blur-md border-b ${
        isScrolled ? "border-neutral-200 shadow-sm" : "border-neutral-100"
      } sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto py-4 md:py-5 px-4 md:px-6">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-2.5 z-10 group">
              <div className="p-2 bg-neutral-900 rounded-xl shadow-sm transition-transform group-hover:scale-105">
                <CloudUpload className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-neutral-900 tracking-tight">
                Droply
              </h1>
            </Link>
          </motion.div>

          <div className="hidden md:flex gap-4 items-center">
            <SignedOut>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sign-in">
                  <Button variant="light" className="text-neutral-700 font-medium">
                    Sign In
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link href="/sign-up">
                  <Button className="bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors shadow-sm">
                    Sign Up
                  </Button>
                </Link>
              </motion.div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                {!isOnDashboard && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/dashboard">
                      <Button variant="light" className="text-neutral-700 font-medium">
                        Dashboard
                      </Button>
                    </Link>
                  </motion.div>
                )}
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="p-1 pr-3 bg-transparent hover:bg-neutral-100 min-w-0 rounded-full transition-colors"
                      endContent={<ChevronDown className="h-3.5 w-3.5 ml-1 text-neutral-500" />}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={userDetails.initials}
                          size="sm"
                          src={user?.imageUrl || undefined}
                          className="h-8 w-8 flex-shrink-0 ring-1 ring-neutral-200"
                          fallback={<User className="h-4 w-4" />}
                        />
                        <span className="text-neutral-700 hidden sm:inline font-medium text-sm">
                          {userDetails.displayName}
                        </span>
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User actions">
                    <DropdownItem
                      key="profile"
                      description={userDetails.email || "View your profile"}
                      onClick={() => router.push("/dashboard?tab=profile")}
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      key="files"
                      description="Manage your files"
                      onClick={() => router.push("/dashboard")}
                    >
                      My Files
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      description="Sign out of your account"
                      className="text-danger"
                      color="danger"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </SignedIn>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <SignedIn>
              <Avatar
                name={userDetails.initials}
                size="sm"
                src={user?.imageUrl || undefined}
                className="h-8 w-8 flex-shrink-0 ring-1 ring-neutral-200"
                fallback={<User className="h-4 w-4" />}
              />
            </SignedIn>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="z-50 p-2 rounded-lg bg-transparent hover:bg-neutral-100 transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-menu-button="true"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-neutral-700" />
              ) : (
                <Menu className="h-5 w-5 text-neutral-700" />
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                <motion.div
                  ref={mobileMenuRef}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25 }}
                  className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-40 flex flex-col pt-20 px-6 shadow-xl md:hidden border-l border-neutral-200"
                >
                  <SignedOut>
                    <div className="flex flex-col gap-4 items-center">
                      <Link
                        href="/sign-in"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button variant="bordered" className="w-full border-neutral-300 text-neutral-700">
                          Sign In
                        </Button>
                      </Link>
                      <Link
                        href="/sign-up"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full bg-neutral-900 text-white">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </SignedOut>

                  <SignedIn>
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3 py-4 border-b border-neutral-200">
                        <Avatar
                          name={userDetails.initials}
                          size="md"
                          src={user?.imageUrl || undefined}
                          className="h-11 w-11 flex-shrink-0 ring-1 ring-neutral-200"
                          fallback={<User className="h-5 w-5" />}
                        />
                        <div>
                          <p className="font-semibold text-neutral-900 text-sm">{userDetails.displayName}</p>
                          <p className="text-xs text-neutral-500">
                            {userDetails.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        {!isOnDashboard && (
                          <Link
                            href="/dashboard"
                            className="py-2.5 px-3 hover:bg-neutral-100 rounded-lg transition-colors font-medium text-sm text-neutral-700"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          href="/dashboard?tab=profile"
                          className="py-2.5 px-3 hover:bg-neutral-100 rounded-lg transition-colors font-medium text-sm text-neutral-700"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          className="py-2.5 px-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4 font-medium text-sm"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleSignOut();
                          }}
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </SignedIn>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}