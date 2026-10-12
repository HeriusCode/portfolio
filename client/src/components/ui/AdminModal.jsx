import React, { useState, useEffect } from 'react';
import { Shield, Lock, Send, X, Check, AlertCircle, RefreshCw, Radio, LogOut } from 'lucide-react';
import { adminLogin, updateAdminBanner, verifyAdminSession } from '../../services/api';

export function AdminModal({ isOpen, onClose, currentBanner, onBannerUpdated, showToast }) {
  const [authToken, setAuthToken] = useState(null);
  const [password, setPassword] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill or reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      if (currentBanner?.message) {
        setNewAnnouncement(currentBanner.message);
      }
    }
  }, [isOpen, currentBanner]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await adminLogin(password);
      if (res && res.token) {
        setAuthToken(res.token);
        setPassword('');
        showToast('Admin authenticated successfully.', 'success');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Incorrect admin password.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) {
      setErrorMsg('Announcement message cannot be empty.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const res = await updateAdminBanner(newAnnouncement.trim(), authToken);
      if (res && res.success) {
        showToast('Announcement published and live on website!', 'success');
        onBannerUpdated();
        onClose();
      }
    } catch (err) {
      if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
        setAuthToken(null);
        setErrorMsg('Session expired. Please re-enter admin password.');
      } else {
        setErrorMsg(err.message || 'Failed to update announcement.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    setPassword('');
    showToast('Admin logged out.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg glass-card rounded-2xl border border-primaryCyan/30 shadow-glow-cyan p-6 sm:p-8 z-10 overflow-hidden">
        {/* Header Ambient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primaryCyan via-secondaryPurple to-primaryCyan" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-textSecondary hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primaryCyan/10 border border-primaryCyan/30 flex items-center justify-center text-primaryCyan">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-textPrimary flex items-center gap-2">
              Admin Announcement Control
            </h2>
            <p className="text-xs text-textSecondary">
              Update top banner message live across all connected clients.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!authToken ? (
          /* STEP 1: Authentication Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="p-4 rounded-xl bg-surface/80 border border-white/5 space-y-2">
              <label className="block text-xs font-semibold text-textSecondary uppercase tracking-wider">
                Admin Security Passcode
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  required
                  autoFocus
                  className="w-full px-4 py-3 pl-10 rounded-xl bg-darkBg/90 border border-white/10 text-textPrimary text-sm focus:outline-none focus:border-primaryCyan focus:ring-1 focus:ring-primaryCyan transition-all"
                />
                <Lock className="w-4 h-4 text-textSecondary absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
              <p className="text-[11px] text-textSecondary/70 italic">
                Protected server-side verification. Default dev passcode: <code className="text-primaryCyan">admin@2026</code>
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-textSecondary hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primaryCyan to-secondaryPurple text-darkBg font-semibold text-sm hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-2 shadow-glow-cyan"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authenticate</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: Banner Edit & Publish Form */
          <form onSubmit={handlePublish} className="space-y-5">
            {/* Current Announcement Display */}
            <div className="p-3.5 rounded-xl bg-darkBg/60 border border-white/5 text-xs space-y-1">
              <div className="flex items-center justify-between text-textSecondary">
                <span className="font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  Currently Broadcasted Message
                </span>
                <span className="text-[10px]">
                  {currentBanner?.updatedAt ? new Date(currentBanner.updatedAt).toLocaleTimeString() : 'Now'}
                </span>
              </div>
              <p className="text-textPrimary italic font-sans text-sm">
                "{currentBanner?.message || 'No active announcement'}"
              </p>
            </div>

            {/* New Message Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-textSecondary">
                  New Announcement Message:
                </label>
                <span className={`text-[11px] ${newAnnouncement.length > 280 ? 'text-rose-400' : 'text-textSecondary'}`}>
                  {newAnnouncement.length}/300
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                value={newAnnouncement}
                onChange={(e) => setNewAnnouncement(e.target.value)}
                placeholder="e.g. Welcome to my Portfolio! Check out my newly deployed Network Project..."
                required
                className="w-full px-4 py-3 rounded-xl bg-darkBg/90 border border-white/10 text-textPrimary text-sm focus:outline-none focus:border-primaryCyan focus:ring-1 focus:ring-primaryCyan resize-none transition-all placeholder:text-gray-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs text-textSecondary hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-textSecondary hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primaryCyan to-secondaryPurple text-darkBg font-bold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-glow-cyan"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Broadcasting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish Announcement</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

