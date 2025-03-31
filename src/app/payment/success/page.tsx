"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const [sessionData, setSessionData] = useState<{
    amount_total?: number;
    payment_status?: number;
  }>({});

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/payment-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setSessionData(data));
    }

    // Redirect to dashboard after 3 seconds
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup function to clear timeout
  }, [sessionId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-200">
      <h1 className="text-4xl font-bold text-green-400">
        Payment Successful! ✅
      </h1>
      <p className="mt-4 text-lg">Thank you for your purchase.</p>

      {sessionData && sessionData.amount_total ? (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p className="text-gray-400">
            Amount: ${sessionData?.amount_total / 100}
          </p>
          <p className="text-gray-400">
            Payment Status: {sessionData.payment_status}
          </p>
        </div>
      ) : (
        <p className="text-gray-400 mt-2">Loading payment details...</p>
      )}

      <p className="text-gray-400 mt-4">
        Redirecting to dashboard in 3 seconds...
      </p>
    </div>
  );
}

// Wrap PaymentSuccess inside Suspense
export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccess />
    </Suspense>
  );
}
