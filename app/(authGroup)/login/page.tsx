
import Link from "next/link";
import { Wrench} from "lucide-react";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-3xl border border-border shadow-xl">
        {/* Brand Header UI */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-primary">FixItNow</span>
          </Link>

          <h2 className="text-2xl font-extrabold text-foreground tracking-tight pt-2">
            Welcome Back!
          </h2>
          <p className="text-xs text-muted-foreground">
            Log in to manage your bookings or service requests.
          </p>
        </div>

        {/* Main Form UI */}
        <LoginForm></LoginForm>
        {/* Register Redirect Link UI */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-primary hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}
