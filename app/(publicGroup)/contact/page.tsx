import React from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { ContactForm } from "../_components/Contact";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary uppercase bg-primary/10 px-3.5 py-1 rounded-full border border-primary/20">
            <MessageSquare className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Contact Support Team
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Have questions about a service booking or technical support? We are
            here to help 24/7.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-foreground border-b border-border pb-3">
                Contact Information
              </h2>
              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      Customer Helpline
                    </p>
                    <p className="text-muted-foreground">+91 1708-577675</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      Email Address
                    </p>
                    <p className="text-muted-foreground">mahirjr98@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      Headquarters
                    </p>
                    <p className="text-muted-foreground">
                      Uttara, Kolkata, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      Service Hours
                    </p>
                    <p className="text-muted-foreground">
                      24/7 Support Available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (Imported Component) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
