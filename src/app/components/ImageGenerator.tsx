"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { useSession } from "next-auth/react";

// Extend the Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
import { useRouter } from "next/navigation";

export default function ImageGenerator() {
  const { data: session } = useSession();
  const router = useRouter();

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
      toast.error("You have 0 credits left. Purchase more to generate images.");
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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

    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="min-h-screen flex flex-col py-2 items-center justify-center bg-gray-900 text-white px-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-xl flex flex-col gap-6">
        {/* Credits & Buy More Button */}
        <div className="flex justify-between items-center">
          <p className="text-lg">
            You have <span className="font-bold text-green-400">{credits}</span>{" "}
            credits left.
          </p>
          <button
            onClick={() => router.push("/pricing")}
            className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all cursor-pointer"
          >
            Buy More Credits
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center">AI Image Generator</h2>

        {/* Input & Generate Button */}
        <div className="flex flex-col gap-4">
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
              loading || credits <= 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Generate"
            )}
          </button>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center border border-gray-700 rounded-lg min-h-[250px] bg-gray-900">
          {image ? (
            <div className="relative w-full">
              <button
                onClick={downloadImage}
                className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer"
                title="Download Image"
              >
                <FaDownload className="text-gray-700 text-xl" />
              </button>

              <img
                src={image}
                alt="Generated"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <p className="text-gray-400">
              Your generated image will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
