import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 text-neutral-900 leading-tight tracking-tight">
                    Store your images with ease
                  </h1>
                  <p className="text-lg md:text-xl text-neutral-500 leading-relaxed">
                    Simple. Secure. Fast.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button size="lg" className="bg-neutral-900 text-white hover:bg-neutral-800 font-medium px-8">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button size="lg" variant="bordered" className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium px-8">
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        className="bg-neutral-900 text-white hover:bg-neutral-800 font-medium px-8"
                        endContent={<ArrowRight className="h-4 w-4" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className="absolute inset-0 matte-card rounded-3xl hover-lift"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="h-32 md:h-40 w-32 md:w-40 text-neutral-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-neutral-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-neutral-900 tracking-tight">
                What You Get
              </h2>
              <p className="text-neutral-500">Everything you need to manage your images</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Card className="matte-card hover-lift">
                <CardBody className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-neutral-100 flex items-center justify-center">
                    <CloudUpload className="h-7 w-7 text-neutral-700" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-900">
                    Quick Uploads
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">Drag, drop, done.</p>
                </CardBody>
              </Card>

              <Card className="matte-card hover-lift">
                <CardBody className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-neutral-100 flex items-center justify-center">
                    <Folder className="h-7 w-7 text-neutral-700" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-900">
                    Smart Organization
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Keep it tidy, find it fast.
                  </p>
                </CardBody>
              </Card>

              <Card className="matte-card hover-lift sm:col-span-2 md:col-span-1 mx-auto sm:mx-0 max-w-md sm:max-w-full">
                <CardBody className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-neutral-100 flex items-center justify-center">
                    <Shield className="h-7 w-7 text-neutral-700" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-neutral-900">
                    Locked Down
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    Your images, your eyes only.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-neutral-50">
          <div className="container mx-auto text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-neutral-900 tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-neutral-500 mb-8">Join today and start organizing your images</p>
            <SignedOut>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-neutral-900 text-white hover:bg-neutral-800 font-medium px-8"
                    endContent={<ArrowRight className="h-4 w-4" />}
                  >
                    Let&apos;s Go
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-neutral-900 text-white hover:bg-neutral-800 font-medium px-8"
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </section>
      </main>

      {/* Simple footer */}
      <footer className="bg-white border-t border-neutral-200 py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
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