import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  ShieldCheck,
  XCircle,
  Search,
  Award,
  CheckCircle2,
  Calendar,
  Lock,
  ExternalLink,
  AlertTriangle,
  QrCode,
} from 'lucide-react';

interface PublicVerificationViewProps {
  initialCredentialId?: string;
}

export const PublicVerificationView: React.FC<PublicVerificationViewProps> = ({
  initialCredentialId = 'CRED-2026-F9A2-881B',
}) => {
  const [searchId, setSearchId] = useState(initialCredentialId);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialCredentialId) {
      handleVerify(initialCredentialId);
    }
  }, [initialCredentialId]);

  const handleVerify = async (idToVerify?: string) => {
    const id = idToVerify || searchId;
    if (!id.trim()) return;

    setIsVerifying(true);
    setError(null);
    setVerificationResult(null);

    try {
      const res = await api.verifyCredential(id.trim());
      if (res.success) {
        setVerificationResult(res);
      } else {
        setError(res.message || 'Credential not found.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification lookup failed. Check the ID format.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Public Credential Verification Registry
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Employers, academic institutions, and recruiters can verify the authenticity, competency claims, and tamper-evident SHA-256 seal of any SkillPulse micro-credential.
        </p>
      </div>

      {/* Lookup Search Input */}
      <div className="p-2 sm:p-3 bg-navy-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Credential ID (e.g. CRED-2026-F9A2-881B) or SHA-256 Hash..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-brand-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition font-mono"
          />
        </div>

        <button
          onClick={() => handleVerify()}
          disabled={isVerifying || !searchId.trim()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Verifying Registry...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Authenticity</span>
            </>
          )}
        </button>
      </div>

      {/* Verification Output */}
      {error && (
        <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center space-y-3 animate-in fade-in">
          <XCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-base font-bold text-white">Credential Verification Failed</h3>
          <p className="text-xs text-rose-300 max-w-md mx-auto">{error}</p>
        </div>
      )}

      {verificationResult && (
        <div className="p-6 sm:p-8 rounded-3xl bg-navy-900/90 border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-300">
          {/* Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  verificationResult.isValid
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {verificationResult.isValid ? (
                  <ShieldCheck className="w-6 h-6" />
                ) : (
                  <AlertTriangle className="w-6 h-6" />
                )}
              </div>
              <div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    verificationResult.isValid
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {verificationResult.status === 'valid' ? 'Verified Authentic' : 'Revoked / Invalid'}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {verificationResult.credential?.microCredentialTitle}
                </h2>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="block text-[10px] text-slate-500 uppercase font-bold">Credential Identifier</span>
              <span className="font-mono font-bold text-cyanAccent-400 text-sm">
                {verificationResult.credential?.credentialId}
              </span>
            </div>
          </div>

          {/* Credential Attributes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Credential Recipient</span>
              <p className="text-sm font-bold text-white">{verificationResult.credential?.learnerName}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Target Industry Role</span>
              <p className="text-sm font-bold text-cyanAccent-300">{verificationResult.credential?.targetRole}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Assessment Score & Tier</span>
              <p className="text-sm font-bold text-emerald-400">
                {verificationResult.credential?.scorePercent}% Score ({verificationResult.credential?.badgeTier} Tier)
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Issue & Verification Date</span>
              <p className="text-sm font-bold text-slate-200">
                {new Date(verificationResult.credential?.issueDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Verified Competencies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Demonstrated Competency Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {verificationResult.credential?.competencies?.map((comp: string, idx: number) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2 text-xs text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cryptographic SHA-256 Signature */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-[10px] font-mono text-slate-400 space-y-1 break-all">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold uppercase">
              <Lock className="w-3.5 h-3.5 text-cyanAccent-400" />
              <span>Tamper-Evident SHA-256 Hash Seal</span>
            </div>
            <p>{verificationResult.credential?.verificationHash}</p>
          </div>

          <div className="text-center pt-2 text-[11px] text-slate-500">
            Registered on the SkillPulse Global Micro-Credential Trust Network.
          </div>
        </div>
      )}
    </div>
  );
};
