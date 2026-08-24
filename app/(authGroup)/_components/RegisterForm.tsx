"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";

import {
  UserCheck,
  Briefcase,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { registerSchema, RegisterFormValues } from "@/lib/validation/auth";
import { RegisterAction } from "../_actions/authActions";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [state, action, pending] = useActionState(RegisterAction, null);

  // 1. React Hook Form Setup with Zod Resolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "CUSTOMER",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedRole = watch("role");

  // 2. Submit Handler (Valid Form Data)

  const onFormSubmit = (data: RegisterFormValues) => {
    React.startTransition(() => {
      action(data);
    });
  };

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(
        state.message || "Account created successfully! Please log in.",
      );
      router.push("/login");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Role Picker (Customer vs Technician) */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-2">
          I want to join as a:
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setValue("role", "CUSTOMER")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              selectedRole === "CUSTOMER"
                ? "bg-primary/10 border-primary text-primary shadow-sm"
                : "bg-background border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Customer
          </button>

          <button
            type="button"
            onClick={() => setValue("role", "TECHNICIAN")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              selectedRole === "TECHNICIAN"
                ? "bg-primary/10 border-primary text-primary shadow-sm"
                : "bg-background border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Technician
          </button>
        </div>
        {errors.role && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Full Name Input */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Full Name
        </label>
        <div className="relative">
          <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="John Doe"
            {...register("name")}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {errors.name && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

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

      {/* Phone Input */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="01700000000"
            {...register("phone")}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {errors.phone && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
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

      {/* Confirm Password Input */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword")}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-6 rounded-xl font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
}
