export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
          <p className="text-gray-500 text-sm">
            Please wait while we prepare your shopping experience
          </p>
        </div>

        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
