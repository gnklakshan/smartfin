"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Hero = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handlescroll = () => {
      const scrollpositon = window.scrollY;
      const scrollthreashold = 100;

      if (scrollpositon > scrollthreashold) {
        imageElement.classList.add("hero-image-scrolled");
      } else {
        imageElement.classList.remove("hero-image-scrolled");
      }
    };

    window.addEventListener("scroll", handlescroll);

    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finance <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          SmartFin is a AI based finance platform that helps you manage your
          finance with intelligence. It helps you to track your expenses and
          income.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashbord">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg" className="px-8">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/hero.jpg"
              width={1280}
              height={700}
              alt="dashbord"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
