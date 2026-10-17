import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Credential } from '../../types';
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  QrCode,
  Calendar,
  Lock,
} from 'lucide-react';

interface CredentialsViewProps {
  setCurrentView: (view: string) => void;
  setVerifyQueryId?: (id: string) => void;
}

export const CredentialsView: React.FC<CredentialsViewProps> = ({
  setCurrentView,
  setVerifyQueryId,
}) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreds = async () => {
      try {
        setIsLoading(true);
        const res = await api.getMyCredentials();
        if (res.success && res.credentials?.length > 0) {
          setCredentials(res.credentials);
          setSelectedCred(res.credentials[0]);
        }
      } catch (err) {
        console.error('Failed to load credentials:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreds();
  }, []);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyEmbed = (id: string) => {
    const snippet = `<a href="http://localhost:5173/verify/${id}" target="_blank"><img src="https://img.shields.io/badge/SkillPulse-Micro--Credential%20Verified-blue" alt="SkillPulse Credential" /></a>`;
    navigator.clipboard.writeText(snippet);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const handleVerifyInRegistry = (id: string) => {
    if (setVerifyQueryId) setVerifyQueryId(id);
    setCurrentView('verification');
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-400">
        <span className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin inline-block mb-3" />
        <p className="text-xs">Loading verified digital credentials...</p>
      </div>
    );
  }

  if (credentials.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center space-y-4">
        <Award className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">No Credentials Issued Yet</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Pass your competency exam with 75% or higher to unlock an authentic, verifiable micro-credential.
        </p>
        <button
          onClick={() => setCurrentView('my-learning')}
          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-2"
        >
          <span>Go to Learning Modules</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Digital Credential Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Verified Micro-Credentials & Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Cryptographically sealed, tamper-evident digital credentials recorded in the global verification registry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintCertificate}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-cyanAccent-400" />
            <span>Download / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Credential Selector & Full High-Resolution Certificate Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Credentials List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Earned Certificates ({credentials.length})
          </h3>

          <div className="space-y-3">
            {credentials.map((cred) => {
              const isSelected = selectedCred?.credentialId === cred.credentialId;
              return (
                <div
                  key={cred.credentialId}
                  onClick={() => setSelectedCred(cred)}
                  className={`p-4 rounded-2xl border cursor-pointer transition select-none ${
                    isSelected
                      ? 'bg-slate-800 border-amber-500/80 shadow-lg shadow-amber-500/10'
                      : 'bg-navy-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-cyanAccent-400">
                      {cred.credentialId}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {cred.badgeTier}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{cred.microCredentialTitle}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Score: {cred.scorePercent}%</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 3/4: High-Resolution Printable Certificate Canvas */}
        <div className="lg:col-span-3 space-y-6">
          {selectedCred && (
            <>
              {/* The Certificate Canvas */}
              <div
                id="certificate-print-area"
                className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-navy-900 via-slate-900 to-indigo-950 border-4 border-amber-500/40 shadow-2xl overflow-hidden text-center"
              >
                {/* Decorative Guilloche Border Accents */}
                <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-amber-400/70 pointer-events-none" />
                <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-amber-400/70 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-amber-400/70 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-amber-400/70 pointer-events-none" />

                {/* Issuing Authority Header */}
                <div className="flex flex-col items-center justify-center space-y-2 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[2px] shadow-lg shadow-amber-500/20 flex items-center justify-center">
                    <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                      <Award className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-amber-400">
                    SkillPulse Global Credential Registry
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    Certificate of Competency
                  </h2>
                </div>

                {/* Recipient Details */}
                <div className="space-y-3 max-w-2xl mx-auto mb-8">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                    This is to certify that
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-yellow-400">
                    {selectedCred.learnerName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                    has successfully demonstrated verified mastery of industry competencies and passed the formal evaluation benchmark for:
                  </p>
                  <h4 className="text-lg sm:text-xl font-bold text-cyanAccent-300">
                    {selectedCred.microCredentialTitle}
                  </h4>
                </div>

                {/* Competencies Badges */}
                <div className="max-w-xl mx-auto mb-8 pt-4 border-t border-slate-800">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                    Demonstrated Competency Standards
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {selectedCred.competencies?.map((comp, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-950/80 text-slate-300 border border-slate-800"
                      >
                        ✓ {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificate Footer: Signatures, QR, Tamper Hash */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 text-left items-end">
                  {/* Left: ID & Date */}
                  <div className="space-y-1 text-xs">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">Credential Identifier</span>
                    <span className="font-mono font-bold text-white text-xs">{selectedCred.credentialId}</span>
                    <span className="block text-[10px] text-slate-400">
                      Issued: {new Date(selectedCred.issueDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Middle: Simulated QR Code & Direct Link */}
                  <div className="flex flex-col items-center justify-center text-center space-y-1">
                    <div className="p-2 bg-white rounded-xl shadow-inner inline-block">
                      <QrCode className="w-12 h-12 text-slate-900" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">Scan to Verify Authenticity</span>
                  </div>

                  {/* Right: Registry Validation Status */}
                  <div className="text-right space-y-1 text-xs">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">Registry Status</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-400 text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      Authentic & Valid
                    </span>
                    <span className="block text-[10px] text-slate-400">Score: {selectedCred.scorePercent}% ({selectedCred.badgeTier})</span>
                  </div>
                </div>

                {/* Cryptographic SHA-256 Hash Seal */}
                <div className="mt-6 pt-4 border-t border-slate-900 text-[10px] font-mono text-slate-500 break-all">
                  Tamper-Evident SHA-256 Seal: {selectedCred.verificationHash}
                </div>
              </div>

              {/* Credential Action Toolbar */}
              <div className="p-5 rounded-2xl bg-navy-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopyId(selectedCred.credentialId)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied ID!' : 'Copy Credential ID'}</span>
                  </button>

                  <button
                    onClick={() => handleCopyEmbed(selectedCred.credentialId)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                  >
                    {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedEmbed ? 'Badge Code Copied!' : 'Copy Badge Embed Code'}</span>
                  </button>
                </div>

                <button
                  onClick={() => handleVerifyInRegistry(selectedCred.credentialId)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white transition flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Check Public Verification Page</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
