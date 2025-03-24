import { FaMagic, FaBolt, FaPaintBrush, FaRocket } from "react-icons/fa";

import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center px-6 py-10">
      {/* Hero Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      > */}
      <h2 className="text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
        Transform Your Words into Stunning Images
      </h2>
      <p className="mt-4 text-lg text-gray-300">
        Textify is an AI-powered tool that converts your text into visually
        appealing images. Start creating now!
      </p>
      <div className="mt-6 flex space-x-4 justify-center">
        <Link href="/dashboard">
          <Button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg font-semibold flex items-center">
            Get Started <FaMagic className="ml-2" />
          </Button>
        </Link>
        <Button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 text-lg font-semibold">
          Learn More
        </Button>
      </div>
      {/* </motion.div> */}

      {/* Example Generated Images Section */}
      <section className="mt-16 max-w-4xl text-center bg-gray-800 p-10 rounded-xl shadow-lg">
        <h3 className="text-4xl font-bold text-white drop-shadow-md">
          Example Text-to-Image Creations
        </h3>
        <p className="text-gray-400 mt-4">
          See how AI can transform simple text into stunning visuals.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExampleImage
            text="A futuristic city at sunset"
            imageUrl="https://images.stockcake.com/public/7/b/f/7bf6ddd4-7917-4451-b709-87ee62920d8a_large/futuristic-city-sunset-stockcake.jpg"
          />
          <ExampleImage
            text="A dreamy landscape with glowing trees"
            imageUrl="https://m.media-amazon.com/images/I/81SR6e0SNbL.jpg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-16 max-w-5xl text-center">
        <h3 className="text-4xl font-bold text-white drop-shadow-md">
          Why Choose Textify?
        </h3>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="AI-Powered"
            description="Leverage powerful AI models to generate high-quality images from text."
            icon={<FaBolt className="text-yellow-400 text-4xl mb-4" />}
          />
          <FeatureCard
            title="Custom Styles"
            description="Choose from multiple artistic styles and themes to suit your needs."
            icon={<FaPaintBrush className="text-pink-400 text-4xl mb-4" />}
          />
          <FeatureCard
            title="Fast & Easy"
            description="Simple interface with instant results, no design skills needed."
            icon={<FaRocket className="text-blue-400 text-4xl mb-4" />}
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="p-8 bg-gray-800 rounded-xl shadow-lg text-center flex flex-col items-center">
      {icon}
      <h4 className="text-2xl font-semibold text-white">{title}</h4>
      <p className="text-gray-400 mt-2">{description}</p>
    </div>
  );
}

function ExampleImage({ text, imageUrl }) {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md text-center">
      <img
        src={imageUrl}
        alt={text}
        className="w-80 h-80 object-cover rounded-lg"
      />
      <p className="text-gray-300 mt-2">{text}</p>
    </div>
  );
}
