import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Download,
  QrCode,
  ExternalLink,
  Code2,
  Sparkles,
  Building,
  GraduationCap,
  Calendar,
  Copy,
  Check,
} from 'lucide-react';

export const DigitalSkillPassport: React.FC = () => {
  const { digitalPassport, studentSkills, currentUser } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Passport Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-teal-500/30">
        {/* Subtle background ornamentation */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-400/80 shadow-md ring-4 ring-white/10"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">{digitalPassport.name}</h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-400/20 text-teal-300 border border-teal-400/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Digital Passport
                </span>
              </div>

              <p className="text-xs text-slate-300 font-medium">
                Roll No: <span className="font-mono text-teal-200">{digitalPassport.rollNo}</span> • {digitalPassport.department}
              </p>
              <p className="text-xs text-slate-400">
                {digitalPassport.institution} • CGPA: <span className="font-mono text-white font-bold">{digitalPassport.cgpa}/10.0</span>
              </p>

              <div className="pt-2 flex items-center gap-3 text-[11px] font-mono text-teal-300/90">
                <span>Passport ID: {digitalPassport.passportId}</span>
                <span>•</span>
                <span>Issued: {digitalPassport.issueDate}</span>
              </div>
            </div>
          </div>

          {/* Action buttons: Share link + QR Code */}
          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              id="btn-share-passport-link"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-teal-50 transition-all shadow-xs active:scale-95"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-teal-700" />
                  <span>Share Passport</span>
                </>
              )}
            </button>

            <button
              id="btn-show-qr-modal"
              onClick={() => setShowQrModal(!showQrModal)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <QrCode className="w-4 h-4" />
              <span>Verifiable QR</span>
            </button>
          </div>
        </div>

        {/* QR Popover / Modal Simulation */}
        {showQrModal && (
          <div className="mt-6 p-4 rounded-xl bg-white text-slate-900 border border-teal-300 flex flex-col sm:flex-row items-center gap-5 animate-fadeIn">
            <div className="w-28 h-28 bg-slate-900 rounded-lg p-2 flex items-center justify-center shrink-0">
              <QrCode className="w-24 h-24 text-teal-400" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Tamper-Proof Cryptographic Verification</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Recruiters can scan this credential QR code to verify Alex Chen's proctored exam transcripts, verified GitHub repositories, and faculty endorsements directly on the university trust node.
              </p>
              <div className="font-mono text-[10px] text-slate-500 pt-1">
                Hash: 0x89f4b3...c7e19 | Node: NIT-ACCREDITATION-V4
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid: 3 Key Portfolio Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Proctored Assessments & Skills */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              <h4 className="text-sm font-bold text-slate-900">Verified Competencies</h4>
            </div>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
              {digitalPassport.verifiedScorePercentile}th Percentile
            </span>
          </div>

          <div className="space-y-3">
            {studentSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-900 font-semibold">{skill.name}</span>
                  <span className="font-mono text-teal-700 font-bold">{skill.score}/100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-600 rounded-full"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{skill.category}</span>
                  <span className="text-emerald-700 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {skill.verified ? (skill.verifiedBy || 'ProctorEval') : 'Self-Reported'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Verified Certifications & Badges */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold text-slate-900">Certifications & Badges</h4>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {digitalPassport.certifications.length} Credentials
            </span>
          </div>

          {/* Certifications List */}
          <div className="space-y-3">
            {digitalPassport.certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-3 rounded-xl border border-slate-200 hover:border-teal-300 transition-colors bg-white shadow-2xs space-y-1 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-slate-900 leading-snug">{cert.title}</h5>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                </div>
                <div className="text-[11px] text-slate-600">{cert.issuer}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>ID: {cert.credentialId}</span>
                  <span>{cert.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Badges Earned */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-800 mb-2.5">Earned Digital Badges</div>
            <div className="grid grid-cols-2 gap-2">
              {digitalPassport.badges.map((b) => (
                <div
                  key={b.name}
                  className="p-2 rounded-lg bg-teal-50/50 border border-teal-200/60 text-center space-y-0.5"
                >
                  <div className="text-xs font-bold text-slate-900 truncate">{b.name}</div>
                  <div className="text-[10px] text-teal-700 font-medium">{b.category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Industry Projects & Faculty Endorsements */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">Projects & Endorsements</h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Faculty Verified
            </span>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            {digitalPassport.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-bold text-slate-900">{proj.title}</h5>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 shrink-0">
                    Faculty Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Endorsements */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-800 mb-2">Industry & Academic Endorsements</div>
            <div className="space-y-2">
              {digitalPassport.industryEndorsements.map((end, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{end.endorser}</span>
                    <span className="text-[10px] text-slate-500">{end.company}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">"{end.note}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
