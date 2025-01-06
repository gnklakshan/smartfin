import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/Data/landing";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-24">
      <Hero />

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4  gap-8">
            {statsData.map((statsData, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {statsData.value}
                </div>
                <div className="text-gray-600">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index}>
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-200 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What our customers are saying
          </h2>
          <div>
            <Carousel className="w-full max-w-xl lg:max-w-5xl mx-auto">
              <CarouselContent>
                {testimonialsData.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="p-6">
                        <CardContent className=" p-4">
                          <div className="flex items-center mb-4">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div className="ml-4">
                              <div className="font-semibold">
                                {testimonial.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {testimonial.role}
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600">{testimonial.quote}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Ready to transform your finances?
          </h2>
          <p className="text-blue-100 mb-10 text-lg max-w-3xl mx-auto">
            Join thousands of users already using{" "}
            <span className="font-semibold text-white">SmartFin</span> to take
            control of their financial future. Manage your money, track your
            expenses, and make smarter decisions—all in one place.
          </p>
          <div>
            <Link href="/dashbord">
              <Button
                size="lg"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-12 animate-pulse">
          <svg
            className="w-10 h-10 mx-auto text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
