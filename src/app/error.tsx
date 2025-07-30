"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">⚠️</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600 mb-6">
          We&apos;re sorry, but something unexpected happened. Please try again
          or go back to the home page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
