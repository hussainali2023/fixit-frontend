import Link from "next/link";
import { Wrench } from "lucide-react";
import RegisterForm from "../_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-3xl border border-border shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-primary">FixItNow</span>
          </Link>

          <h2 className="text-2xl font-extrabold text-foreground tracking-tight pt-2">
            Create Your Account
          </h2>
          <p className="text-xs text-muted-foreground">
            Join FixItNow to book services or offer services as a technician.
          </p>
        </div>

        <RegisterForm></RegisterForm>

        <p className="text-center text-xs text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
