"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

export default function ImageGenerator() {
  const { data: session } = useSession();

  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/user-credits?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setCredits(data.credits));
    }
  }, [session]);

  const generateImage = async () => {
    if (credits <= 0) {
      alert("You have 0 credits left. Purchase more to generate images.");
      return;
    }

    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setImage("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate image");

      const data = await response.json();
      setImage(data.imageUrl);
      setCredits((prev) => prev - 1);
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async () => {
    if (!image) return;

    const response = await fetch(image);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the object URL
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-lg mt-7">
        <p className="text-lg mb-4">
          You have <span className="font-bold text-green-400">{credits}</span>{" "}
          credits left.
        </p>

        <h2 className="text-3xl font-bold text-center mb-6">
          AI Image Generator
        </h2>
        {/* Input & Generate Button */}
        <div className="space-y-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none text-white"
          />
          <button
            onClick={generateImage}
            disabled={loading || credits <= 0}
            className={`w-full px-6 py-3 rounded-lg font-semibold text-lg flex items-center justify-center transition-all ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Generate"
            )}
          </button>
        </div>
        {/* Image & Download Button */}
        {image && (
          <div className="relative mt-6">
            {/* Download Button (Positioned Correctly) */}
            <button
              onClick={downloadImage}
              className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer"
              title="Download Image"
            >
              <FaDownload className="text-gray-700 text-xl" />
            </button>

            {/* Generated Image */}
            <img
              src={image}
              alt="Generated"
              className="w-full rounded-lg shadow-lg border border-gray-700"
            />
          </div>
        )}
      </div>
    </div>
  );
}
