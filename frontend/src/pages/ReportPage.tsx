import { ArrowLeft, CheckCircle2, CircleAlert, Clock3, FileSearch, LoaderCircle, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReport, type ReportRecord } from "../api/report.api";

type DemoReport = {
  reference: string;
  documentType: string;
  createdAt: string;
  processingTime: string;
  score: number;
  riskLevel: string;
  verdict: "Passed" | "Flagged";
  name: string;
  dateOfBirth: string;
  identifier: string;
  nationality: string;
  mrzChecksum: string;
  tamperedProbability: number;
  tamperDecision: string;
  ela: number;
  edge: number;
  noiseTexture: number;
  sharpness: number;
  authenticityConfidence: number;
  fontConsistency: number;
  reason: string;
};

const demoReports: Record<string, DemoReport> = {
  "KAV-84921": { reference: "KAV-84921", documentType: "Passport", createdAt: "Today, 10:42 AM", processingTime: "1.24s", score: 42.67, riskLevel: "Medium Risk", verdict: "Flagged", name: "TALWINDER SINGH None", dateOfBirth: "19/06/1994", identifier: "L8001016", nationality: "IND", mrzChecksum: "Valid", tamperedProbability: 44.17, tamperDecision: "Medium Risk - Needs Manual Review", ela: 0.31, edge: 28.85, noiseTexture: 18.22, sharpness: 57.79, authenticityConfidence: 55.83, fontConsistency: 98.1, reason: "Document integrity signals require manual review." },
  "KAV-84920": { reference: "KAV-84920", documentType: "Passport", createdAt: "Today, 10:30 AM", processingTime: "1.18s", score: 94.2, riskLevel: "Low Risk", verdict: "Passed", name: "Demo Passport Holder", dateOfBirth: "12/08/1992", identifier: "P00084920", nationality: "IND", mrzChecksum: "Valid", tamperedProbability: 5.8, tamperDecision: "Low Risk", ela: 0.08, edge: 11.2, noiseTexture: 9.4, sharpness: 82.6, authenticityConfidence: 94.2, fontConsistency: 98.1, reason: "No document-integrity anomalies detected." },
  "KAV-84911": { reference: "KAV-84911", documentType: "Passport", createdAt: "Today, 9:54 AM", processingTime: "1.31s", score: 61, riskLevel: "Medium Risk", verdict: "Flagged", name: "Review Required", dateOfBirth: "04/11/1988", identifier: "P00084911", nationality: "IND", mrzChecksum: "Review", tamperedProbability: 39, tamperDecision: "Medium Risk - Needs Manual Review", ela: 0.28, edge: 25.6, noiseTexture: 19.8, sharpness: 60.4, authenticityConfidence: 61, fontConsistency: 91.4, reason: "One or more document-integrity signals need review." },
  "KAV-84876": { reference: "KAV-84876", documentType: "Aadhaar", createdAt: "Yesterday, 4:12 PM", processingTime: "1.09s", score: 89, riskLevel: "Low Risk", verdict: "Passed", name: "Demo Identity Record", dateOfBirth: "22/02/1990", identifier: "•••• •••• 4876", nationality: "IND", mrzChecksum: "Not applicable", tamperedProbability: 8.2, tamperDecision: "Low Risk", ela: 0.1, edge: 13.7, noiseTexture: 10.1, sharpness: 79.2, authenticityConfidence: 89, fontConsistency: 96.7, reason: "No document-integrity anomalies detected." },
};

function Metric({ label, value, tone = "text-slate-200" }: { label: string; value: string; tone?: string }) {
  return <div className="rounded-xl border border-white/10 bg-black/15 p-4"><p className="text-xs uppercase tracking-wider text-slate-500">{label}</p><p className={`mt-2 break-words text-base font-bold ${tone}`}>{value}</p></div>;
}

export default function ReportPage() {
  const { id = "KAV-84921" } = useParams();
  const [backendReport, setBackendReport] = useState<ReportRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBackendReport(null);
    setLoading(true);
    getReport(id).then((response) => setBackendReport(response.report)).catch(() => undefined).finally(() => setLoading(false));
  }, [id]);

  const fallbackReport = demoReports[id] || demoReports["KAV-84921"];
  const backendDocumentType = backendReport?.documentType ? `${backendReport.documentType.charAt(0)}${backendReport.documentType.slice(1).toLowerCase()}` : fallbackReport.documentType;
  const report: DemoReport = backendReport ? {
    ...fallbackReport,
    reference: backendReport.reportReference,
    documentType: backendDocumentType,
    createdAt: new Date(backendReport.createdAt).toLocaleString(),
    score: backendReport.overallRiskScore ?? fallbackReport.score,
    riskLevel: backendReport.riskLevel ?? fallbackReport.riskLevel,
    verdict: backendReport.verdict === "Passed" ? "Passed" : "Flagged",
    name: backendReport.fullName ?? fallbackReport.name,
    dateOfBirth: backendReport.dateOfBirth ?? fallbackReport.dateOfBirth,
    identifier: backendReport.identifier ?? fallbackReport.identifier,
    mrzChecksum: backendReport.mrzChecksumValid === true ? "Valid" : backendReport.mrzChecksumValid === false ? "Review" : fallbackReport.mrzChecksum,
    authenticityConfidence: backendReport.authenticityConfidence ?? fallbackReport.authenticityConfidence,
    tamperedProbability: backendReport.tamperedProbability ?? fallbackReport.tamperedProbability,
    tamperDecision: backendReport.tamperDecision ?? fallbackReport.tamperDecision,
    ela: backendReport.elaVariance ?? fallbackReport.ela,
    edge: backendReport.edgeResponse ?? fallbackReport.edge,
    noiseTexture: backendReport.noiseTexture ?? fallbackReport.noiseTexture,
    sharpness: backendReport.sharpness ?? fallbackReport.sharpness,
    fontConsistency: backendReport.fontConsistency ?? fallbackReport.fontConsistency,
    reason: backendReport.verdict === "Passed" ? "No document-integrity anomalies detected." : "Document integrity signals require manual review.",
  } : fallbackReport;
  const passed = report.verdict === "Passed";

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] text-red-300"><LoaderCircle className="h-7 w-7 animate-spin" aria-label="Loading report" /></div>;

  return (
    <div className="min-h-screen bg-[#0b0f19] px-5 py-8 text-slate-200 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">Forensic report</p><h1 className="mt-2 text-3xl font-black text-white">Verification report</h1><p className="mt-2 text-sm text-slate-500">{report.documentType} integrity analysis from the local screening pipeline.</p></div><Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"><ArrowLeft className="h-4 w-4" /> Return to dashboard</Link></header>

        <section className={`mb-8 flex flex-col justify-between gap-5 rounded-2xl border p-6 shadow-[0_20px_55px_rgba(90,12,28,0.18)] md:flex-row md:items-center ${passed ? "border-emerald-500/35 bg-emerald-950/20" : "border-red-500/35 bg-red-950/20"}`}><div className="flex items-center gap-4"><div className={`flex h-12 w-12 items-center justify-center rounded-full ${passed ? "bg-emerald-500/15" : "bg-red-500/15"}`}>{passed ? <CheckCircle2 className="h-7 w-7 text-emerald-400" /> : <CircleAlert className="h-7 w-7 text-red-300" />}</div><div><p className={`font-mono text-xs uppercase tracking-wider ${passed ? "text-emerald-400" : "text-red-300"}`}>{passed ? "Integrity verified" : "Manual review recommended"}</p><h2 className={`mt-1 text-xl font-bold ${passed ? "text-emerald-300" : "text-red-200"}`}>{report.riskLevel}</h2></div></div><div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] text-slate-400"><span>SCAN REF: {report.reference}</span><span>PROCESSED: {report.processingTime}</span><span>{report.createdAt}</span></div></section>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-2xl border border-red-500/15 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.14)] backdrop-blur-xl"><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><FileSearch className="h-5 w-5 text-red-300" /><div><h2 className="font-bold text-white">Document forensics & OCR</h2><p className="mt-1 text-xs text-slate-500">Visual fields and machine-readable zone validation</p></div></div><span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-red-300">Evidence</span></div><div className="mt-5 overflow-hidden rounded-xl border border-slate-800 bg-black/70"><div className="flex h-52 items-center justify-center p-4 sm:h-60"><img src="/fake.png" alt="Submitted document with forensic overlays" className="max-h-full max-w-full object-contain" /></div><div className="border-t border-slate-800 bg-slate-950/70 px-4 py-2 text-xs text-slate-500">Captured document preview • source image retained for this report</div></div><dl className="mt-6 grid gap-3 sm:grid-cols-2"><Metric label="Full name" value={report.name} /><Metric label="Date of birth" value={report.dateOfBirth} /><Metric label="Identifier" value={report.identifier} /><Metric label="Nationality" value={report.nationality} /><Metric label="MRZ checksum" value={report.mrzChecksum} tone={report.mrzChecksum === "Valid" ? "text-emerald-300" : "text-amber-300"} /><Metric label="Document type" value={report.documentType} /></dl></section>

          <section className="space-y-5"><div className="rounded-2xl border border-red-500/15 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.14)] backdrop-blur-xl"><div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-red-300" /><h2 className="font-bold text-white">Integrity signal summary</h2></div><div className="mt-6"><div className="flex items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-wider text-slate-500">Overall risk score</p><p className={`mt-1 text-4xl font-black ${passed ? "text-emerald-300" : "text-red-300"}`}>{report.score.toFixed(2)}</p></div><span className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 font-mono text-xs text-red-200">{report.riskLevel}</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${passed ? "bg-emerald-500" : "bg-red-500"}`} style={{ width: `${Math.min(report.score, 100)}%` }} /></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><Metric label="Authenticity confidence" value={`${report.authenticityConfidence.toFixed(2)}%`} tone={passed ? "text-emerald-300" : "text-red-300"} /><Metric label="Tampered probability" value={`${report.tamperedProbability.toFixed(2)}%`} tone={report.tamperedProbability > 30 ? "text-amber-300" : "text-emerald-300"} /></div><p className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm leading-6 text-slate-400">{report.reason}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.12)] backdrop-blur-xl"><div className="flex items-center justify-between gap-3"><div><h2 className="font-bold text-white">Forensic feature values</h2><p className="mt-1 text-xs text-slate-500">Signals returned by tamper detection</p></div><Clock3 className="h-5 w-5 text-violet-200" /></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><Metric label="ELA variance" value={report.ela.toFixed(2)} /><Metric label="Edge response" value={report.edge.toFixed(2)} /><Metric label="Noise texture" value={report.noiseTexture.toFixed(2)} /><Metric label="Sharpness" value={report.sharpness.toFixed(2)} /><Metric label="Font consistency" value={`${report.fontConsistency.toFixed(2)}%`} tone="text-emerald-300" /><Metric label="Tamper decision" value={report.tamperDecision} tone={passed ? "text-emerald-300" : "text-amber-300"} /></div></div></section>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-violet-300/15 bg-violet-300/[0.035] px-4 py-3 text-xs leading-5 text-slate-400"><ShieldCheck className="h-4 w-4 shrink-0 text-violet-200" /> This report contains document-integrity and OCR signals only. Biometric matching is not part of the Kavach verification workflow.</div>
      </div>
    </div>
  );
}
