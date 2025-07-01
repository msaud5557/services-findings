export default function SocialSignInButtons() {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-3 w-full py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 shadow-sm font-medium text-gray-700 transition"
      >
        <span>
          <svg className="w-5 h-5" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 21-17.5V20z"/>
              <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/>
              <path fill="#FBBC05" d="M24 45c5.6 0 10.5-1.9 14.4-5.1l-6.7-5.5C29.6 36.9 27 38 24 38c-6.1 0-11.2-4.1-13-9.6l-7 5.4C6.6 41.1 14.7 45 24 45z"/>
              <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-3.1 0-5.9-1.1-8.1-2.9l-6.4 6.4C13.5 42.9 18.4 45 24 45c10.5 0 19.5-7.6 21-17.5V20z"/>
            </g>
          </svg>
        </span>
        Sign in with Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-3 w-full py-2 rounded-lg border border-gray-200 bg-blue-50 hover:bg-blue-100 shadow-sm font-medium text-blue-700 transition"
      >
        <span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F3">
            <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
          </svg>
        </span>
        Sign in with Facebook
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-3 w-full py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 shadow-sm font-medium text-gray-700 transition"
      >
        <span>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <rect x="1" y="1" width="10" height="10" fill="#F35325"/>
            <rect x="13" y="1" width="10" height="10" fill="#81BC06"/>
            <rect x="1" y="13" width="10" height="10" fill="#05A6F0"/>
            <rect x="13" y="13" width="10" height="10" fill="#FFBA08"/>
          </svg>
        </span>
        Sign in with Microsoft
      </button>
    </div>
  );
} 