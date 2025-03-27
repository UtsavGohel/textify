"use client";
import { FaMagic, FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-8 py-16">
      {/* Hero Section */}
      <h2 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg text-center">
        Bring Your Words to Life with AI
      </h2>
      <p className="mt-6 text-2xl text-gray-300 text-center max-w-3xl">
        Instantly turn your ideas into stunning AI-generated images. <br />
        Get{" "}
        <span className="text-blue-400 font-semibold underline">
          10 free credits
        </span>{" "}
        to start creating now!
      </p>

      <div className="mt-8 flex space-x-6 justify-center">
        <Link href={session ? "/dashboard" : "/sign-in"}>
          <Button className="bg-blue-500 hover:bg-blue-600 px-8 py-4 text-xl font-semibold flex items-center">
            Get Started <FaMagic className="ml-2 text-2xl" />
          </Button>
        </Link>
        <Link href="/pricing">
          <Button className="bg-purple-500 hover:bg-purple-600 px-8 py-4 text-xl font-semibold">
            View Pricing
          </Button>
        </Link>
      </div>

      {/* How It Works Section */}
      <section className="mt-20 max-w-5xl text-center">
        <h3 className="text-4xl font-bold text-white drop-shadow-md">
          How It Works
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          <StepCard
            step="1"
            title="Enter Text"
            description="Describe your image idea in a few words."
          />
          <StepCard
            step="2"
            title="Choose Style"
            description="Select from multiple artistic styles."
          />
          <StepCard
            step="3"
            title="Generate & Download"
            description="AI will create your image instantly!"
          />
        </div>
      </section>

      {/* Recent AI Creations Section */}
      <section className="mt-20 text-center max-w-5xl">
        <h3 className="text-4xl font-bold text-white drop-shadow-md">
          Recent AI Creations
        </h3>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Image
            src="/cat-with-dog.png"
            width={250}
            height={250}
            alt="AI Image 1"
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/boy-homework.png"
            width={250}
            height={250}
            alt="AI Image 2"
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/lamborgini-image.png"
            width={250}
            height={250}
            alt="AI Image 3"
            className="rounded-lg shadow-lg"
          />
          <Image
            src="/lion-image.png"
            width={250}
            height={250}
            alt="AI Image 4"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mt-20 max-w-4xl text-center">
        <h3 className="text-4xl font-bold text-white drop-shadow-md">
          What Our Users Say
        </h3>
        <div className="mt-10 flex space-x-6 overflow-x-auto">
          <TestimonialCard
            name="Rhonda D. Williams"
            feedback="Textify is mind-blowing! The AI-generated images are stunning."
          />
          <TestimonialCard
            name="Amber G. Wooley"
            feedback="Absolutely love the simplicity and quality. 5 stars!"
          />
          <TestimonialCard
            name="Robert C. Dutton"
            feedback="Best AI image generator I've used. Highly recommended!"
          />
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="mt-20 max-w-4xl text-center">
        <h3 className="text-4xl font-bold text-white drop-shadow-md">
          Free vs. Pro Plans
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <PlanCard
            title="Free Plan"
            price="$0"
            features={["10 Free Credits", "Basic Styles", "Watermarked Images"]}
          />
          <PlanCard
            title="Pro Plan"
            price="$10/month"
            features={[
              "Unlimited Credits",
              "Premium Styles",
              "High-Quality Images",
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-20 max-w-3xl">
        <h3 className="text-4xl font-bold text-white drop-shadow-md text-center">
          Frequently Asked Questions
        </h3>
        <div className="mt-10">
          <FAQItem
            question="How do I use the 10 free credits for image generation?"
            answer="When you sign up, you receive 10 free credits to generate AI images. Each image creation deducts a credit, and you can purchase more anytime!"
          />
          <FAQItem
            question="Are the AI-generated images available in high resolution?"
            answer="Yes! All generated images are available in high resolution and can be downloaded without losing quality."
          />
        </div>
      </section>
    </div>
  );
}

/* Step Card Component */
function StepCard({ step, title, description }) {
  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-lg text-center">
      <h4 className="text-2xl font-semibold text-white">
        Step {step}: {title}
      </h4>
      <p className="text-lg text-gray-400 mt-3">{description}</p>
    </div>
  );
}

/* Testimonial Card Component */
function TestimonialCard({ name, feedback }) {
  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-lg text-center w-80">
      <FaStar className="text-yellow-400 text-5xl mb-3 mx-auto" />
      <p className="text-lg text-gray-300">"{feedback}"</p>
      <h4 className="text-xl font-semibold text-white mt-4">{name}</h4>
    </div>
  );
}

/* FAQ Item Component */
function FAQItem({ question, answer }) {
  return (
    <details className="mb-6 bg-gray-800 p-6 rounded-lg cursor-pointer">
      <summary className="text-xl font-semibold">{question}</summary>
      <p className="mt-3 text-lg text-gray-300">{answer}</p>
    </details>
  );
}

/* Pricing Plan Card Component */
function PlanCard({ title, price, features }) {
  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-lg text-center">
      <h4 className="text-3xl font-semibold text-white">{title}</h4>
      <p className="text-2xl text-green-400 mt-3 font-bold">{price}</p>
      <ul className="mt-5 space-y-3 text-lg">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-300">
            ✅ {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
