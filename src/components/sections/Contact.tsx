"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  MapPin,
  GitCompare,
} from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import SectionWrapper, { SectionHeading } from "@/components/ui/SectionWrapper";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(100, "Subject too long"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message too long"),
});

type FormValues = z.infer<typeof schema>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "dcdipesh1998@gmail.com",
    href: "mailto:dcdipesh1998@gmail.com",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/dipesh-chaulagain",
    href: "https://linkedin.com/in/dipesh-chaulagain-4143641a4",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kathmandu, Nepal · Open to Remote",
    href: null,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Dc-Dipesh",
    href: "https://github.com/Dc-Dipesh",
  },
];

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  error?: string;
  rows?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

function FloatingLabelInput({
  id,
  label,
  type = "text",
  error,
  rows,
  register,
}: FloatingLabelInputProps) {
  const isTextarea = !!rows;
  const baseClass =
    "w-full bg-transparent border rounded-lg px-4 pt-6 pb-2 text-text-primary text-sm outline-none transition-all duration-200 peer placeholder-transparent resize-none " +
    (error
      ? "border-red-500/60 focus:border-red-500"
      : "border-navy-lighter focus:border-accent/60");

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={baseClass}
          {...register}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={label}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={baseClass}
          {...register}
        />
      )}
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-xs text-text-secondary transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
      >
        {label}
      </label>
      {error && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
        >
          <AlertCircle size={11} />
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    // Simulate API call — replace with your preferred email service
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      // In production, call your API route here:
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
      console.log("Form data:", data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading number="04" title="Get In Touch" />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left — copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            Whant to discuss a project, opportunity, or just say hi? I&apos;m
            always open to connecting with fellow developers, potential
            collaborators, or anyone interested in frontend development. Feel
            free to reach out using the form or through any of the contact
            methods listed.
          </p>

          <div className="space-y-5">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-accent/20 shrink-0">
                  <Icon size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-text-secondary text-xs font-mono mb-0.5">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-text-light text-sm hover:text-accent transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-text-light text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="glass rounded-2xl p-6 md:p-8 border border-navy-lighter">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                  role="status"
                  aria-live="polite"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle size={56} className="text-accent" />
                  </motion.div>
                  <h3 className="text-text-light text-xl font-bold">
                    Message Sent!
                  </h3>
                  <p className="text-text-secondary text-sm max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 font-mono text-sm text-accent border border-accent rounded px-5 py-2 hover:bg-accent/10 transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                  aria-label="Contact form"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingLabelInput
                      id="name"
                      label="Your Name"
                      error={errors.name?.message}
                      register={register("name")}
                    />
                    <FloatingLabelInput
                      id="email"
                      label="Email Address"
                      type="email"
                      error={errors.email?.message}
                      register={register("email")}
                    />
                  </div>
                  <FloatingLabelInput
                    id="subject"
                    label="Subject"
                    error={errors.subject?.message}
                    register={register("subject")}
                  />
                  <FloatingLabelInput
                    id="message"
                    label="Your Message"
                    rows={5}
                    error={errors.message?.message}
                    register={register("message")}
                  />

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      role="alert"
                      className="text-red-400 text-sm flex items-center gap-2"
                    >
                      <AlertCircle size={14} />
                      Something went wrong. Please try again or email directly.
                    </motion.p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 bg-accent text-navy font-semibold py-3 rounded-lg hover:bg-accent-muted transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
                    whileHover={{
                      scale: status === "loading" ? 1 : 1.02,
                      boxShadow: "0 0 30px rgba(100,255,218,0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
