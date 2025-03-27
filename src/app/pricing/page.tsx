"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter(); // To redirect to sign-in page

  const handleCheckout = async (amount: number) => {
    if (!session) {
      router.push("/sign-in"); // Redirect if user is not signed in
      return;
    }

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

  const plans = [
    {
      credits: 30,
      price: 1,
      perks: ["30 AI-generated images", "Basic Support"],
      available: true,
    },
    {
      credits: 100,
      price: 3,
      perks: ["100 AI-generated images", "Priority Support"],
      available: false,
    },
    {
      credits: 500,
      price: 10,
      perks: [
        "500 AI-generated images",
        "Dedicated AI Model",
        "Premium Support",
      ],
      available: false,
    },
  ];

  return (
    <div className="w-full py-16 bg-gradient-to-br from-[#1e1e2e] to-[#282a36] text-white text-center">
      <h2 className="text-4xl font-bold mb-8">Choose Your Plan</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-[#242636] p-8 rounded-xl shadow-lg text-center w-80 border border-gray-700 flex flex-col justify-between h-[320px]"
          >
            <div>
              <h3 className="text-2xl font-semibold">
                {plan.credits} Image Credits
              </h3>
              <p className="text-gray-400 mt-2">
                ${plan.price} per {plan.credits} AI-generated images
              </p>
              <ul className="mt-4 text-gray-300 text-sm space-y-2">
                {plan.perks.map((perk, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-center gap-2"
                  >
                    ✅ {perk}
                  </li>
                ))}
              </ul>
            </div>
            {plan.available ? (
              <button
                onClick={() => handleCheckout(plan.price)}
                className="mt-6 px-6 py-3 w-full bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy Now"}
              </button>
            ) : (
              <button
                className="mt-6 px-6 py-3 w-full bg-gray-700 text-gray-400 rounded-lg cursor-not-allowed"
                disabled
              >
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
