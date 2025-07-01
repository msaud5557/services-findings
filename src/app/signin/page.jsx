import SignInForm from "@/components/signin/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-indigo-600 text-3xl">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 21h10M12 17v4M4 7l8-4 8 4M4 7v4a8 8 0 0016 0V7"/></svg>
          </span>
          <span className="text-2xl font-bold text-indigo-900 tracking-tight">FixItPro</span>
        </div>
        <div className="text-gray-600 mb-8 text-center text-lg">Sign in to your account</div>
        <SignInForm />
      </div>
    </div>
  );
} 