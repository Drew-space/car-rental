// import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Hero = () => {
//   return (
//     <div>
//       <header className="absolute top-0 left-0 right-0 z-20">
//         <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
//           <Link
//             href="/"
//             className="text-xl font-bold tracking-tight text-white"
//           >
//             ⌘ Horizone
//           </Link>
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
//             <a href="#home" className="hover:text-white">
//               Home
//             </a>
//             <a href="#about" className="hover:text-white">
//               About
//             </a>
//             <Link href="/cars" className="hover:text-white">
//               All Cars
//             </Link>
//             <a href="#contact" className="hover:text-white">
//               Contact
//             </a>
//           </nav>

//           {/* Auth */}
//           <div className="flex items-center gap-3">
//             <Show when="signed-out">
//               <SignInButton mode="modal">
//                 <button className="rounded-full bg-white/20 text-white border border-white/30 px-5 py-2 text-sm font-medium hover:bg-white/30 transition">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <button className="rounded-full bg-white text-foreground px-5 py-2 text-sm font-semibold hover:bg-white/90 transition">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </Show>
//             <Show when="signed-in">
//               <UserButton afterSignOutUrl="/" />
//             </Show>
//           </div>
//         </div>
//       </header>

//       {/* Hero */}
//       <div className="px-1 pt-1">
//         <section
//           id="home"
//           className="relative h-[88vh] min-h-[560px] w-full overflow-hidden rounded-md"
//         >
//           <Image
//             src="/cars/hi.png"
//             alt="Sports car driving on open road at sunset"
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
//           <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-20">
//             <h1 className="text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
//               Rent a Car for Every Journey
//             </h1>
//             <p className="mt-4 text-lg text-white/80 max-w-xl">
//               Premium vehicles, transparent pricing, and the freedom to explore
//               wherever the road takes you.
//             </p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Hero;

// import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// /* ------------------------------------------------------------------ */
// /*  Variant 1 — Light, single car centered (Dream Drive style)         */
// /* ------------------------------------------------------------------ */

// export const HeroLight = () => {
//   return (
//     <div className="bg-white">
//       <header className="relative z-20 border-b border-black/5">
//         <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
//           <Link
//             href="/"
//             className="text-xl font-bold tracking-tight text-neutral-900"
//           >
//             ⌘ Horizone
//           </Link>
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
//             <a href="#home" className="hover:text-neutral-900">
//               Home
//             </a>
//             <a href="#about" className="hover:text-neutral-900">
//               About
//             </a>
//             <Link href="/cars" className="hover:text-neutral-900">
//               All Cars
//             </Link>
//             <a href="#contact" className="hover:text-neutral-900">
//               Contact
//             </a>
//           </nav>

//           <div className="flex items-center gap-3">
//             <Show when="signed-out">
//               <SignInButton mode="modal">
//                 <button className="rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 px-5 py-2 text-sm font-medium hover:bg-neutral-200 transition">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <button className="rounded-full bg-neutral-900 text-white px-5 py-2 text-sm font-semibold hover:bg-neutral-800 transition">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </Show>
//             <Show when="signed-in">
//               <UserButton afterSignOutUrl="/" />
//             </Show>
//           </div>
//         </div>
//       </header>

//       <section id="home" className="relative w-full overflow-hidden pt-20 pb-0">
//         <div className="mx-auto max-w-4xl px-6 text-center">
//           <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 leading-[1.05] tracking-tight">
//             Rent a Car for
//             <br />
//             Every Journey
//           </h1>
//           <p className="mt-6 text-lg text-neutral-500 max-w-xl mx-auto">
//             Premium vehicles, transparent pricing, and the freedom to explore
//             wherever the road takes you.
//           </p>

//           <div className="mt-8 flex items-center justify-center gap-3">
//             <Link
//               href="/cars"
//               className="rounded-full bg-neutral-900 text-white px-7 py-3 text-sm font-semibold hover:bg-neutral-800 transition"
//             >
//               Book Your Ride
//             </Link>
//             <Link
//               href="/cars"
//               className="rounded-full bg-white text-neutral-900 border border-neutral-300 px-7 py-3 text-sm font-semibold hover:bg-neutral-50 transition"
//             >
//               Browse Our Fleet
//             </Link>
//           </div>
//         </div>

//         {/* Car image, centered, floating above a soft shadow */}
//         <div className="relative mt-10 mx-auto w-full max-w-5xl px-6">
//           <div className="relative aspect-[16/9] md:aspect-[16/7]">
//             <Image
//               src="/cars/hi.png"
//               alt="Sports car"
//               fill
//               className="object-contain object-bottom"
//               priority
//             />
//           </div>
//           {/* ground shadow */}
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-6 w-2/3 rounded-full bg-black/10 blur-2xl" />
//         </div>
//       </section>
//     </div>
//   );
// };

// /* ------------------------------------------------------------------ */
// /*  Variant 2 — Full-bleed image with dark gradient overlay            */
// /* ------------------------------------------------------------------ */

// export const HeroDark = () => {
//   return (
//     <div>
//       <header className="absolute top-0 left-0 right-0 z-20">
//         <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
//           <Link
//             href="/"
//             className="text-xl font-bold tracking-tight text-white"
//           >
//             ⌘ Horizone
//           </Link>
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/90">
//             <a href="#home" className="hover:text-white">
//               Home
//             </a>
//             <a href="#about" className="hover:text-white">
//               About
//             </a>
//             <Link href="/cars" className="hover:text-white">
//               All Cars
//             </Link>
//             <a href="#contact" className="hover:text-white">
//               Contact
//             </a>
//           </nav>

//           <div className="flex items-center gap-3">
//             <Show when="signed-out">
//               <SignInButton mode="modal">
//                 <button className="rounded-full bg-white/20 text-white border border-white/30 px-5 py-2 text-sm font-medium hover:bg-white/30 transition">
//                   Sign In
//                 </button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <button className="rounded-full bg-white text-foreground px-5 py-2 text-sm font-semibold hover:bg-white/90 transition">
//                   Sign Up
//                 </button>
//               </SignUpButton>
//             </Show>
//             <Show when="signed-in">
//               <UserButton afterSignOutUrl="/" />
//             </Show>
//           </div>
//         </div>
//       </header>

//       <div className="px-1 pt-1">
//         <section
//           id="home"
//           className="relative h-[88vh] min-h-[560px] w-full overflow-hidden rounded-md"
//         >
//           <Image
//             src="https://images.unsplash.com/photo-1575650681837-c0ca3b1e7275?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xfSlBkY0JubDluOHx8ZW58MHx8fHx8"
//             alt="Sports car driving on open road at sunset"
//             fill
//             className="object-cover"
//             priority
//           />
//           {/* dark gradient to keep the photo from feeling too sharp/raw */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

//           <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-20">
//             <h1 className="text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
//               Rent a Car for Every Journey
//             </h1>
//             <p className="mt-4 text-lg text-white/80 max-w-xl">
//               Premium vehicles, transparent pricing, and the freedom to explore
//               wherever the road takes you.
//             </p>
//             <div className="mt-8 flex items-center gap-3">
//               <Link
//                 href="/cars"
//                 className="rounded-full bg-white text-neutral-900 px-7 py-3 text-sm font-semibold hover:bg-white/90 transition"
//               >
//                 Book Your Ride
//               </Link>
//               <Link
//                 href="/cars"
//                 className="rounded-full bg-white/10 text-white border border-white/30 px-7 py-3 text-sm font-semibold hover:bg-white/20 transition backdrop-blur-sm"
//               >
//                 Browse Our Fleet
//               </Link>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };
"use client";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/* ------------------------------------------------------------------ */
/*  Variant 1 — Light, single car centered (Dream Drive style)         */
/* ------------------------------------------------------------------ */

export const HeroLight = () => {
  return (
    <div className="bg-white">
      <header className="relative z-20 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-neutral-900"
          >
            ⌘ Horizone
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            <a href="#home" className="hover:text-neutral-900">
              Home
            </a>
            <a href="#about" className="hover:text-neutral-900">
              About
            </a>
            <Link href="/cars" className="hover:text-neutral-900">
              All Cars
            </Link>
            <a href="#contact" className="hover:text-neutral-900">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-full bg-neutral-100 text-neutral-900 border border-neutral-200 px-5 py-2 text-sm font-medium hover:bg-neutral-200 transition">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="rounded-full bg-neutral-900 text-white px-5 py-2 text-sm font-semibold hover:bg-neutral-800 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </header>

      <section
        id="home"
        className="relative w-full overflow-hidden pt-28 sm:pt-24 md:pt-20 pb-0"
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-neutral-900 leading-[1.05] tracking-tight">
            Rent a Car for
            <br />
            Every Journey
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-500 max-w-xl mx-auto">
            Premium vehicles, transparent pricing, and the freedom to explore
            wherever the road takes you.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/cars"
              className="w-full sm:w-auto text-center rounded-full bg-neutral-900 text-white px-7 py-3 text-sm font-semibold hover:bg-neutral-800 transition"
            >
              Book Your Ride
            </Link>
            <Link
              href="/cars"
              className="w-full sm:w-auto text-center rounded-full bg-white text-neutral-900 border border-neutral-300 px-7 py-3 text-sm font-semibold hover:bg-neutral-50 transition"
            >
              Browse Our Fleet
            </Link>
          </div>
        </div>

        {/* Car image, centered, floating above a soft shadow */}
        <div className="relative mt-8 sm:mt-10 mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7]">
            <Image
              src="/cars/hi.png"
              alt="Sports car"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-contain object-bottom"
              priority
            />
          </div>
          {/* ground shadow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 sm:h-6 w-1/2 sm:w-2/3 rounded-full bg-black/10 blur-2xl" />
        </div>
      </section>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Variant 2 — Full-bleed image with dark gradient overlay            */
/* ------------------------------------------------------------------ */
