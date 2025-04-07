import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import HeroSection from "@/components/hero";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">FEATURES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Powerful Features to <span className="text-blue-600">Simplify</span> Your Finances
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Everything you need to take control of your financial life in one beautiful interface
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card 
                className="p-0 border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden" 
                key={index}
              >
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500">
                  <CardContent className="bg-white p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Get Started in <span className="text-blue-600">3 Easy Steps</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Simple setup, powerful results. Start managing your money like a pro today.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/4 left-1/3 right-1/3 h-1 bg-blue-200 -z-10"></div>
            <div className="hidden md:block absolute top-1/4 left-2/3 right-0 h-1 bg-blue-200 -z-10"></div>
            
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-white border-4 border-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Trusted by <span className="text-blue-600">Thousands</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users have to say.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-0 border-0 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500">
                  <CardContent className="bg-white p-6">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-blue-100"
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                    <div className="flex mt-4 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Financial Life?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of users who are already managing their finances smarter with our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-transform px-8 py-6 text-lg font-semibold shadow-lg"
              >
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 hover:scale-105 transition-transform px-8 py-6 text-lg font-semibold"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-blue-100 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;