import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  BellRing, 
  Check, 
  Copy, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles,
  Github,
  Linkedin,
  Facebook
} from 'lucide-react';
import { personalInfo } from '../../data/personalInfo';
import { postContactMessage } from '../../services/api';

export function ContactSection({ showToast }) {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lastDelivered, setLastDelivered] = useState(null);

  const maxChars = 500;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    showToast('Email copied to clipboard!', 'info');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      showToast('Please type a message before sending.', 'error');
      return;
    }

    if (formData.message.trim().length > maxChars) {
      showToast(`Message cannot exceed ${maxChars} characters.`, 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await postContactMessage({
        name: formData.name.trim(),
        message: formData.message.trim(),
      });

      if (res && res.success) {
        showToast(res.message || 'Message sent directly to my phone!', 'success');
        setLastDelivered(new Date().toLocaleTimeString());
        setFormData({ name: '', message: '' });
      }
    } catch (err) {
      showToast(err.message || 'Failed to send message. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-10 lg:py-12 relative z-10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-5 lg:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-primaryCyan/20 text-primaryCyan text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Instant Mobile Gateway</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-textPrimary tracking-tight">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="max-w-xl text-textSecondary text-sm sm:text-base mt-3">
            Leave a message below and receive a response swiftly. Messages are pushed instantly to my smartphone.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primaryCyan to-secondaryPurple rounded-full mt-4" />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Phone Info & Live Indicator (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 border border-white/10 relative overflow-hidden">
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-bold text-textPrimary">
                  Have a message for me?
                </h3>
                <p className="text-sm text-textSecondary leading-relaxed">
                  Send a message directly to my phone. Integrated with Pushbullet & Bark webhook architecture running in Docker.
                </p>
              </div>

              {/* Notification Pipeline Visual Card */}
              <div className="p-4 rounded-xl bg-darkBg/80 border border-primaryCyan/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-primaryCyan font-semibold">
                    <BellRing className="w-4 h-4 text-primaryCyan animate-bounce" />
                    <span>Real-time Mobile Push Service</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
                
                <p className="text-xs text-textSecondary leading-normal">
                  Whenever you submit the form, our Node.js backend pushes an encrypted notification straight to my iOS / Android device via Pushbullet & Bark API.
                </p>

                <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-surface border border-white/5 text-gray-300">
                    Pushbullet API
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface border border-white/5 text-gray-300">
                    Bark Webhook
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface border border-white/5 text-gray-300">
                    SQLite Persistence
                  </span>
                </div>
              </div>

              {/* Email One-click Copy Card */}
              <div className="p-4 rounded-xl bg-surface/80 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primaryCyan/10 border border-primaryCyan/20 flex items-center justify-center shrink-0 text-primaryCyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono uppercase text-textSecondary">Direct Email</p>
                    <p className="text-xs sm:text-sm font-semibold text-textPrimary truncate">{personalInfo.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-lg bg-darkBg hover:bg-surface text-textSecondary hover:text-primaryCyan transition-colors shrink-0 border border-white/10"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/5">
                <p className="text-xs font-mono uppercase text-textSecondary mb-3">
                  Find me on social networks
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface hover:bg-surfaceHover border border-white/5 text-xs text-textPrimary transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4 text-primaryCyan" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface hover:bg-surfaceHover border border-white/5 text-xs text-textPrimary transition-all hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4 text-secondaryPurple" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={personalInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface hover:bg-surfaceHover border border-white/5 text-xs text-textPrimary transition-all hover:scale-105"
                  >
                    <Facebook className="w-4 h-4 text-blue-400" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-9 border border-white/10 relative overflow-hidden">
              
              {/* Form Header Accent */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-heading font-bold text-textPrimary flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primaryCyan" />
                    <span>Send a Direct Note</span>
                  </h3>
                  <p className="text-xs text-textSecondary mt-0.5">
                    Messages are delivered with zero ads or spam.
                  </p>
                </div>
                {lastDelivered && (
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Delivered at {lastDelivered}
                  </span>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input (Optional) */}
                <div>
                  <label htmlFor="name-input" className="block text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">
                    Your Name / Contact Info <span className="text-textSecondary/60 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    maxLength={80}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe (Tech Lead / HR recruiter)"
                    className="w-full px-4 py-3 rounded-xl bg-darkBg/90 border border-white/10 text-textPrimary text-sm placeholder:text-gray-600 focus:outline-none focus:border-primaryCyan focus:ring-1 focus:ring-primaryCyan transition-all"
                  />
                </div>

                {/* Message Input (Required) */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message-input" className="block text-xs font-semibold text-textSecondary uppercase tracking-wider">
                      Your Message <span className="text-rose-400">*</span>
                    </label>
                    <span className={`text-[11px] font-mono ${formData.message.length > maxChars * 0.9 ? 'text-rose-400' : 'text-textSecondary'}`}>
                      {formData.message.length}/{maxChars}
                    </span>
                  </div>
                  <textarea
                    id="message-input"
                    rows={5}
                    required
                    maxLength={maxChars}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note, job opportunity, or question here. It will buzz on my phone immediately..."
                    className="w-full px-4 py-3 rounded-xl bg-darkBg/90 border border-white/10 text-textPrimary text-sm placeholder:text-gray-600 focus:outline-none focus:border-primaryCyan focus:ring-1 focus:ring-primaryCyan transition-all resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-textSecondary/80">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Rate-limited & protected from bot spam</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.message.trim()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-primaryCyan to-secondaryPurple text-darkBg font-bold text-sm hover:opacity-95 shadow-glow-cyan hover:shadow-glow-cyan-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Pushing to Phone...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

