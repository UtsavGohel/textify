"use client";
import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (amount: number) => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Choose Your Plan</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-semibold">30 Image Credits</h2>
        <p className="text-gray-400 mt-2">$1 per 30 AI-generated images</p>
        <button
          onClick={() => handleCheckout(1)}
          className="mt-4 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
}
