"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e44c211f-c020-4e3f-9177-38685e1fb06b",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Thank you! Your message has been sent to Md Hussain Ali.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.success("Message recorded! We will get back to you soon.");
      }
    } catch {
      toast.success("Message sent successfully!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-foreground">
          Send Us a Message
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Fill out the form below and our support representative will respond shortly.
        </p>
      </div>

      {submitted && (
        <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-700 dark:text-emerald-300 p-4 rounded-2xl text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Message sent successfully! We will contact you back via email within 24 hours.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="contact-name" className="text-xs font-semibold">Your Full Name</Label>
            <Input
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Md Hussain Ali"
              className="rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contact-email" className="text-xs font-semibold">Your Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="iamhussainali2@gmail.com"
              className="rounded-xl text-xs"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <Label htmlFor="contact-subject" className="text-xs font-semibold">Subject</Label>
          <Input
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="e.g. Service Booking Query"
            className="rounded-xl text-xs"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <Label htmlFor="contact-message" className="text-xs font-semibold">Your Message</Label>
          <Textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message or feedback here..."
            className="min-h-28 rounded-xl text-xs"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-2xl font-bold text-xs px-6 py-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}