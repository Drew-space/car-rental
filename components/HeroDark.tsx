"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "All Cars", href: "/cars" },
  { label: "Contact", href: "#contact" },
] as const;

export const HeroDark = () => {
  return (
    <div>
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white"
          >
            ⌘ Horizone
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-full bg-white/20 text-white border border-white/30 px-5 py-2 text-sm font-medium hover:bg-white/30 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full bg-white text-foreground px-5 py-2 text-sm font-semibold hover:bg-white/90 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>

          {/* Mobile nav trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <Show when="signed-in">
              <UserButton />
            </Show>
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="text-foreground">
                <DrawerHeader>
                  <DrawerTitle>⌘ Horizone</DrawerTitle>
                </DrawerHeader>

                <nav className="flex flex-col gap-1 px-4">
                  {NAV_LINKS.map((link) => (
                    <DrawerClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-lg px-3 py-3 text-base font-medium hover:bg-surface transition"
                      >
                        {link.label}
                      </Link>
                    </DrawerClose>
                  ))}
                </nav>

                <DrawerFooter>
                  <Show when="signed-out">
                    <SignUpButton mode="modal">
                      <Button className="w-full rounded-full">Sign Up</Button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full rounded-full">
                        Sign In
                      </Button>
                    </SignInButton>
                  </Show>
                  <DrawerClose asChild>
                    <Button variant="ghost" className="w-full">
                      Close
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      <div className="px-1 pt-1">
        <section
          id="home"
          className="relative h-[70vh] sm:h-[80vh] md:h-[88vh] min-h-[480px] w-full overflow-hidden rounded-md"
        >
          <Image
            src="https://images.unsplash.com/photo-1575650681837-c0ca3b1e7275?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xfSlBkY0JubDluOHx8ZW58MHx8fHx8"
            alt="Sports car driving on open road at sunset"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-10 sm:pb-16 md:pb-20">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
              Rent a Car for Every Journey
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/80 max-w-xl">
              Premium vehicles, transparent pricing, and the freedom to explore
              wherever the road takes you.
            </p>
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/cars"
                className="text-center rounded-full bg-white text-neutral-900 px-7 py-3 text-sm font-semibold hover:bg-white/90 transition"
              >
                Book Your Ride
              </Link>
              <Link
                href="/cars"
                className="text-center rounded-full bg-white/10 text-white border border-white/30 px-7 py-3 text-sm font-semibold hover:bg-white/20 transition backdrop-blur-sm"
              >
                Browse Our Fleet
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
