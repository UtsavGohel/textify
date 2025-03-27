"use client";

import Link from "next/link";

export default function PaymentFailure() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-200">
      <h1 className="text-4xl font-bold text-red-400">Payment Failed ❌</h1>
      <p className="mt-4 text-lg">Something went wrong. Please try again.</p>

      <Link href="/pricing">
        <button className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Try Again
        </button>
      </Link>
    </div>
  );
}
