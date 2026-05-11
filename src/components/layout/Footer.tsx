"use client";

import { motion } from "framer-motion";
import { Mail, Heart, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const socialLinks = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/Dc-Dipesh" },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/dipesh-chaulagain-4143641a4",
  },
  { icon: Mail, label: "Email", href: "mailto:dcdipesh1998@gmail.com" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className="relative border-t border-navy-lighter"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="text-center sm:text-left">
          <p className="font-mono text-accent text-sm mb-1">dipesh.dev</p>
          <p className="text-text-secondary text-xs flex items-center gap-1 justify-center sm:justify-start">
            Built with{" "}
            <Heart
              size={11}
              className="text-accent mx-0.5"
              fill="currentColor"
              aria-label="love"
            />
            using Next.js, TypeScript & Framer Motion
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="text-text-secondary hover:text-accent transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Back to top */}
        <motion.button
          onClick={scrollTop}
          aria-label="Back to top"
          className="glass border border-accent/20 rounded-full p-2.5 text-accent hover:bg-accent/10 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>

      <p className="text-center text-text-secondary text-xs pb-4 font-mono">
        © {new Date().getFullYear()} Dipesh Chaulagain. All rights reserved.
      </p>
    </footer>
  );
}
