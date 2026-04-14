import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
      <h1 className="text-4xl font-serif mb-4">Order Received</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Thank you for your purchase. We have saved your order and will begin processing it while payments remain in development mode.
      </p>
      <Link 
        href="/shop" 
        className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
