/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2, UserCheck, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAction } from "../_actions/authActions";
import { toast } from "sonner";

const DEMO_CUSTOMER = { email: "customer1@fix.com", pass: "password123" };
const DEMO_TECHNICIAN = { email: "technician1@fix.com", pass: "123456" };
const DEMO_ADMIN = { email: "admin@fix.com", pass: "123456" };

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // 1. React 19 Action State
  const [state, action, pending] = useActionState(LoginAction, null);

  // 2. React Hook Form Setup with Zod
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Submit Handler
  const onFormSubmit = (data: LoginFormValues) => {
    React.startTransition(() => {
      action(data);
    });
  };

  // 4. Watch for State Changes & Errors
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Logged in successfully!");
      const role = state.data?.user?.role;
      const target =
        role === "TECHNICIAN"
          ? "/technician-dashboard"
          : role === "ADMIN"
          ? "/admin-dashboard"
          : "/dashboard";
      window.location.href = target;
    } else if (state.message) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  // 🟢 Demo Login Auto-Fill Helper
  const handleQuickDemo = (email: string, pass: string, roleName: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });
    toast.info(`Filled credentials for ${roleName}! Click 'Log In' to proceed.`);
  };

  return (
    <div className="space-y-4">
      {/* 🟢 Quick Demo Credentials Selector */}
      <div className="bg-accent/40 border border-border p-3 rounded-2xl space-y-2">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider text-center">
          ⚡ 1-Click Demo Login
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickDemo(DEMO_CUSTOMER.email, DEMO_CUSTOMER.pass, "Customer")}
            className="rounded-xl text-[11px] font-bold py-1.5 px-1 h-auto flex items-center justify-center gap-1 cursor-pointer hover:bg-primary/10"
          >
            <UserCheck className="w-3.5 h-3.5 text-primary" />
            <span>Demo Customer</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickDemo(DEMO_TECHNICIAN.email, DEMO_TECHNICIAN.pass, "Technician")}
            className="rounded-xl text-[11px] font-bold py-1.5 px-1 h-auto flex items-center justify-center gap-1 cursor-pointer hover:bg-emerald-500/10"
          >
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            <span>Demo Technician</span>
          </Button>

                 <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleQuickDemo(DEMO_ADMIN.email, DEMO_ADMIN.pass, "Admin")}
            className="rounded-xl text-[11px] font-bold py-1.5 px-1 h-auto flex items-center justify-center gap-1 cursor-pointer hover:bg-emerald-500/10"
          >
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            <span>Demo Admin</span>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 pt-1">
        {/* Email Input */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          {errors.email && (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-semibold text-foreground">
            Password
          </label>

          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
              className="w-full bg-background border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={pending}
          className="w-full py-6 rounded-xl font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
        >
          {pending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;