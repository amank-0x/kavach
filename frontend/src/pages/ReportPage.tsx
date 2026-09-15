import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Cpu,
  FileSearch,
  FileText,
  LoaderCircle,
  Maximize2,
  Scan,
  ShieldCheck,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getReport, type ReportRecord, type ScreeningResult } from "../api/report.api";

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
  fontConsistency: number | null;
  reason: string;
  screeningResult?: ScreeningResult;
  documentImageUrl?: string | null;
  livePhotoUrl?: string | null;
};

const sampleTalwinderResult: ScreeningResult = {
  ocr_validation: {
    visual: {
      passport_number: "L8001016",
      name: "TALWINDER SINGH None",
      sex: "M",
      date_of_birth: "19/06/1994",
      date_of_issue: "24/03/2014",
      date_of_expiry: "23/03/2024",
      nationality: "INDIAN",
    },
    mrz: {
      mrz_line1: "P<IND<<TALWINDER<SINGH<<<<<<<<<<<<<<<<<<<<<<",
      mrz_line2_raw: "L8001016<91ND9406199M2403236<<<<<<<<<<<<<<<4",
      mrz_line2: "L8001016<9IND9406199M2403236<<<<<<<<<<<<<<<4",
      document_type: "P",
      issuing_country: "IND",
      issuing_country_corrected: false,
      surname: null,
      given_names: "TALWINDER SINGH",
      name_mrz: "TALWINDER SINGH None",
      passport_number_mrz: "L8001016",
      nationality_mrz: "IND",
      nationality_corrected: true,
      dob_mrz: "940619",
      sex_mrz: "M",
      expiry_mrz: "240323",
      checksum_valid: {
        passport_number: true,
        dob: true,
        expiry: true,
      },
      was_recovered: true,
    },
    ocr_issues: [],
    mrz_parsed_successfully: true,
  },
  tamper_detection: {
    tampered_probability: 44.17,
    decision: "Medium Risk - Needs Manual Review",
    rule_override_triggered: false,
    features: {
      ela: 0.31,
      edge: 28.85,
      noise_texture: 18.22,
      sharpness: 57.79,
    },
  },
  face_verification: {
    match: false,
    similarity: 0.0002,
    threshold: 0.42,
    risk_level: "High",
    message: "Faces do not match",
    doc_face: {
      bbox: [92, 94, 164, 187],
      score: 0.8850088715553284,
      source: "insightface",
    },
    live_face: {
      bbox: [408, 244, 911, 929],
      score: 0.8259860277175903,
      source: "insightface",
    },
  },
  overall: {
    overall_risk_score: 42.67,
    risk_level: "Medium Risk",
    reasons: ["Faces do not match"],
  },
};

const demoReports: Record<string, DemoReport> = {
  "KAV-84921": {
    reference: "KAV-84921",
    documentType: "Passport",
    createdAt: "Today, 10:42 AM",
    processingTime: "1.24s",
    score: 42.67,
    riskLevel: "Medium Risk",
    verdict: "Flagged",
    name: "TALWINDER SINGH None",
    dateOfBirth: "19/06/1994",
    identifier: "L8001016",
    nationality: "INDIAN",
    mrzChecksum: "Valid",
    tamperedProbability: 44.17,
    tamperDecision: "Medium Risk - Needs Manual Review",
    ela: 0.31,
    edge: 28.85,
    noiseTexture: 18.22,
    sharpness: 57.79,
    authenticityConfidence: 55.83,
    fontConsistency: 98.1,
    reason: "Document integrity signals require manual review.",
    screeningResult: sampleTalwinderResult,
  },
  "KAV-84920": {
    reference: "KAV-84920",
    documentType: "Passport",
    createdAt: "Today, 10:30 AM",
    processingTime: "1.18s",
    score: 94.2,
    riskLevel: "Low Risk",
    verdict: "Passed",
    name: "Demo Passport Holder",
    dateOfBirth: "12/08/1992",
    identifier: "P00084920",
    nationality: "IND",
    mrzChecksum: "Valid",
    tamperedProbability: 5.8,
    tamperDecision: "Low Risk",
    ela: 0.08,
    edge: 11.2,
    noiseTexture: 9.4,
    sharpness: 82.6,
    authenticityConfidence: 94.2,
    fontConsistency: 98.1,
    reason: "No document-integrity anomalies detected.",
  },
  "KAV-84911": {
    reference: "KAV-84911",
    documentType: "Passport",
    createdAt: "Today, 9:54 AM",
    processingTime: "1.31s",
    score: 61,
    riskLevel: "Medium Risk",
    verdict: "Flagged",
    name: "Review Required",
    dateOfBirth: "04/11/1988",
    identifier: "P00084911",
    nationality: "IND",
    mrzChecksum: "Review",
    tamperedProbability: 39,
    tamperDecision: "Medium Risk - Needs Manual Review",
    ela: 0.28,
    edge: 25.6,
    noiseTexture: 19.8,
    sharpness: 60.4,
    authenticityConfidence: 61,
    fontConsistency: 91.4,
    reason: "One or more document-integrity signals need review.",
  },
  "KAV-84876": {
    reference: "KAV-84876",
    documentType: "Aadhaar",
    createdAt: "Yesterday, 4:12 PM",
    processingTime: "1.09s",
    score: 89,
    riskLevel: "Low Risk",
    verdict: "Passed",
    name: "Demo Identity Record",
    dateOfBirth: "22/02/1990",
    identifier: "•••• •••• 4876",
    nationality: "IND",
    mrzChecksum: "Not applicable",
    tamperedProbability: 8.2,
    tamperDecision: "Low Risk",
    ela: 0.1,
    edge: 13.7,
    noiseTexture: 10.1,
    sharpness: 79.2,
    authenticityConfidence: 89,
    fontConsistency: 96.7,
    reason: "No document-integrity anomalies detected.",
  },
};

function Metric({ label, value, tone = "text-slate-200" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/15 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`mt-2 break-words text-base font-bold ${tone}`}>{value}</p>
    </div>
  );
}

export default function ReportPage() {
  const { id = "KAV-84921" } = useParams();
  const location = useLocation();
  const [localReport, setLocalReport] = useState<ReportRecord | null>(() => {
    try {
      const stored = sessionStorage.getItem(`kavach:screening-report:${id}`);
      return stored ? (JSON.parse(stored) as ReportRecord) : null;
    } catch {
      return null;
    }
  });
  const [backendReport, setBackendReport] = useState<ReportRecord | null>(null);
  const [loading, setLoading] = useState(() => !localReport);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState<string>("");
  const [modalImageTitle, setModalImageTitle] = useState<string>("");

  const openModal = (src: string, title: string) => {
    setModalImageSrc(src);
    setModalImageTitle(title);
    setIsImageModalOpen(true);
  };

  useEffect(() => {
    let storedReport: ReportRecord | null = null;
    try {
      const stored = sessionStorage.getItem(`kavach:screening-report:${id}`);
      storedReport = stored ? (JSON.parse(stored) as ReportRecord) : null;
    } catch {
      storedReport = null;
    }
    setLocalReport(storedReport);
    setBackendReport(null);
    setLoading(!storedReport);
    getReport(id)
      .then((response) => setBackendReport(response.report))
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [id, location.key]);

  const fallbackReport = demoReports[id] || demoReports["KAV-84921"];
  const backendDocumentType = backendReport?.documentType
    ? `${backendReport.documentType.charAt(0)}${backendReport.documentType.slice(1).toLowerCase()}`
    : fallbackReport.documentType;
  const sourceReport = backendReport || localReport;

  const report: DemoReport = sourceReport
    ? {
        ...fallbackReport,
        reference: sourceReport.reportReference,
        documentType: sourceReport.documentType
          ? `${sourceReport.documentType.charAt(0)}${sourceReport.documentType.slice(1).toLowerCase()}`
          : backendDocumentType,
        createdAt: new Date(sourceReport.createdAt).toLocaleString(),
        score: sourceReport.overallRiskScore ?? fallbackReport.score,
        riskLevel: sourceReport.riskLevel ?? fallbackReport.riskLevel,
        verdict: sourceReport.verdict === "Passed" ? "Passed" : "Flagged",
        name: sourceReport.fullName ?? fallbackReport.name,
        dateOfBirth: sourceReport.dateOfBirth ?? fallbackReport.dateOfBirth,
        identifier: sourceReport.identifier ?? fallbackReport.identifier,
        nationality: sourceReport.nationality ?? fallbackReport.nationality,
        mrzChecksum:
          sourceReport.mrzChecksumValid === true
            ? "Valid"
            : sourceReport.mrzChecksumValid === false
            ? "Review"
            : fallbackReport.mrzChecksum,
        authenticityConfidence:
          sourceReport.authenticityConfidence ?? fallbackReport.authenticityConfidence,
        tamperedProbability:
          sourceReport.tamperedProbability ?? fallbackReport.tamperedProbability,
        tamperDecision: sourceReport.tamperDecision ?? fallbackReport.tamperDecision,
        ela: sourceReport.elaVariance ?? fallbackReport.ela,
        edge: sourceReport.edgeResponse ?? fallbackReport.edge,
        noiseTexture: sourceReport.noiseTexture ?? fallbackReport.noiseTexture,
        sharpness: sourceReport.sharpness ?? fallbackReport.sharpness,
        fontConsistency: sourceReport.fontConsistency ?? fallbackReport.fontConsistency,
        reason:
          sourceReport.verdict === "Passed"
            ? "No document-integrity anomalies detected."
            : "Document integrity signals require manual review.",
        screeningResult: sourceReport.screeningResult || fallbackReport.screeningResult,
        documentImageUrl: sourceReport.documentImageUrl || fallbackReport.documentImageUrl,
        livePhotoUrl: sourceReport.livePhotoUrl || fallbackReport.livePhotoUrl,
      }
    : fallbackReport;

  const passed = report.verdict === "Passed";
  const screeningResult = report.screeningResult;
  const ocrValidation = screeningResult?.ocr_validation;
  const visualData = ocrValidation?.visual;
  const mrzData = ocrValidation?.mrz;
  const aadhaarValidation = screeningResult?.aadhaar_validation;
  const aadhaarFields = aadhaarValidation?.fields;
  const aadhaarNumberVal = aadhaarValidation?.number_validation;
  const aadhaarOcrIssues = aadhaarValidation?.ocr_issues as string[] | undefined;
  const isAadhaarReport =
    Boolean(aadhaarValidation) ||
    report.documentType?.toLowerCase().includes("adhar") ||
    report.documentType?.toLowerCase().includes("aadhaar");
  const tamperData = screeningResult?.tamper_detection;
  const faceData = screeningResult?.face_verification;
  const overallData = screeningResult?.overall;

  const documentImageToDisplay = report.documentImageUrl || null;
  const hasDocumentImage = Boolean(
    documentImageToDisplay && documentImageToDisplay !== "/fake.png" && documentImageToDisplay.trim().length > 0
  );
  const livePhotoToDisplay = report.livePhotoUrl || null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] text-red-300">
        <LoaderCircle className="h-7 w-7 animate-spin" aria-label="Loading report" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] px-5 py-8 text-slate-200 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-400">
              Forensic report
            </p>
            <h1 className="mt-2 text-3xl font-black text-white">Verification report</h1>
            <p className="mt-2 text-sm text-slate-500">
              {report.documentType} integrity analysis from the local screening pipeline.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Return to dashboard
          </Link>
        </header>

        {/* Verdict Banner */}
        <section
          className={`mb-8 flex flex-col justify-between gap-5 rounded-2xl border p-6 shadow-[0_20px_55px_rgba(90,12,28,0.18)] md:flex-row md:items-center ${
            passed
              ? "border-emerald-500/35 bg-emerald-950/20"
              : "border-red-500/35 bg-red-950/20"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full ${
                passed ? "bg-emerald-500/15" : "bg-red-500/15"
              }`}
            >
              {passed ? (
                <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              ) : (
                <CircleAlert className="h-7 w-7 text-red-300" />
              )}
            </div>
            <div>
              <p
                className={`font-mono text-xs uppercase tracking-wider ${
                  passed ? "text-emerald-400" : "text-red-300"
                }`}
              >
                {passed ? "Integrity verified" : "Manual review recommended"}
              </p>
              <h2 className={`mt-1 text-xl font-bold ${passed ? "text-emerald-300" : "text-red-200"}`}>
                {report.riskLevel}
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] text-slate-400">
            <span>SCAN REF: {report.reference}</span>
            <span>PROCESSED: {report.processingTime}</span>
            <span>{report.createdAt}</span>
          </div>
        </section>

        {/* Overall Flagged Reasons Warning Card (If Any) */}
        {overallData?.reasons && overallData.reasons.length > 0 && (
          <section className="mb-8 rounded-2xl border border-red-500/30 bg-red-950/20 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-red-300 font-bold mb-3">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span>Pipeline Flagged Reasons:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {overallData.reasons.map((reason, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-200"
                >
                  <CircleAlert className="h-3.5 w-3.5 text-red-400" />
                  {reason}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* High Resolution Uploaded Document & Face Verification Row */}
        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          {/* Uploaded Document Image / Status Card */}
          <section className="flex flex-col justify-between rounded-2xl border border-red-500/15 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.14)] backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileSearch className="h-5 w-5 text-red-300" />
                  <div>
                    <h2 className="font-bold text-white">
                      {hasDocumentImage ? "Uploaded Document Image" : "Document Verification Status"}
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {hasDocumentImage ? "High-resolution staging & OCR source" : "Analysis result for uploaded document"}
                    </p>
                  </div>
                </div>
                {hasDocumentImage && (
                  <button
                    type="button"
                    onClick={() => openModal(documentImageToDisplay!, "Uploaded Document Scan")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Maximize2 className="h-3.5 w-3.5" /> High-Res View
                  </button>
                )}
              </div>

              <div className="mt-5 relative overflow-hidden rounded-xl border border-slate-800 bg-black/80">
                <div className="flex h-64 sm:h-72 items-center justify-center p-3">
                  {hasDocumentImage ? (
                    <img
                      src={documentImageToDisplay!}
                      alt="Uploaded document image"
                      className="max-h-full max-w-full object-contain cursor-pointer transition-transform hover:scale-[1.01]"
                      onClick={() => openModal(documentImageToDisplay!, "Uploaded Document Scan")}
                    />
                  ) : (
                    <div
                      className={`flex flex-col items-center justify-center h-full w-full rounded-lg ${
                        passed
                          ? "border-emerald-500/30 bg-emerald-500/10"
                          : "border-red-500/30 bg-red-500/10"
                      }`}
                    >
                      {passed ? (
                        <CheckCircle2 className="h-16 w-16 text-emerald-400 mb-4" />
                      ) : (
                        <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
                      )}
                      <p
                        className={`text-2xl font-bold ${
                          passed ? "text-emerald-300" : "text-red-300"
                        }`}
                      >
                        {passed ? "ORIGINAL DOCUMENT" : "FAKE DOCUMENT"}
                      </p>
                      <p className="text-sm text-slate-400 mt-2">
                        {report.riskLevel}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/80 px-4 py-2 text-xs text-slate-400">
                  <span className="truncate font-mono">
                    {hasDocumentImage ? "Document Image • Active Forensic Overlay" : "Document Verification Status"}
                  </span>
                  <span className={passed ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                    {passed ? (hasDocumentImage ? "STAGED" : "VERIFIED") : "FLAGGED"}
                  </span>
                </div>
              </div>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <Metric label="Full Name" value={report.name} />
              <Metric label={isAadhaarReport ? "Aadhaar Number" : "Passport Identifier"} value={report.identifier} />
              <Metric label="Date of Birth" value={report.dateOfBirth} />
              <Metric label={isAadhaarReport ? "Gender" : "Nationality"} value={isAadhaarReport ? (aadhaarFields?.gender as string | undefined) || "—" : report.nationality} />
            </dl>
          </section>

          {/* Face Verification Section */}
          <section className="flex flex-col justify-between rounded-2xl border border-red-500/15 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.14)] backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {faceData?.match ? (
                    <UserCheck className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <UserX className="h-5 w-5 text-red-400" />
                  )}
                  <div>
                    <h2 className="font-bold text-white">Face Verification Analysis</h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Biometric portrait & live photo comparison
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${
                    faceData?.match
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/40 bg-red-500/10 text-red-300"
                  }`}
                >
                  {faceData?.match ? "MATCH" : "NO MATCH"}
                </span>
              </div>

              {/* Message Box */}
              <div
                className={`mt-5 flex items-center gap-3 rounded-xl border p-4 ${
                  faceData?.match
                    ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/25 bg-red-500/10 text-red-300"
                }`}
              >
                {faceData?.match ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <CircleAlert className="h-5 w-5 shrink-0 text-red-400" />
                )}
                <div>
                  <p className="text-sm font-bold">
                    {faceData?.message || (faceData?.match ? "Faces match" : "Faces do not match")}
                  </p>
                  <p className="text-xs opacity-80 mt-0.5">
                    Biometric Risk Level: <span className="font-bold uppercase">{faceData?.risk_level || "Unknown"}</span>
                  </p>
                </div>
              </div>

              {/* Live Photo Preview if live photo exists */}
              {livePhotoToDisplay && (
                <div className="mt-4">
                  <div className="rounded-xl border border-slate-800 bg-black/60 p-2 text-center">
                    <p className="text-[10px] uppercase font-mono text-slate-400 mb-1.5">Live Capture</p>
                    <div className="h-28 flex items-center justify-center overflow-hidden rounded-lg bg-slate-900">
                      <img src={livePhotoToDisplay} alt="Live Capture" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              )}

              {/* Document Status Summary */}
              <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  {passed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                  <p className="text-xs font-bold uppercase tracking-wider text-white">Document Status</p>
                </div>
                <p className={`text-sm font-semibold ${passed ? "text-emerald-300" : "text-red-300"}`}>
                  {passed ? "CORRECT DOCUMENT" : "FAKE DOCUMENT"}
                </p>
                <p className="text-xs text-slate-400 mt-1">{report.riskLevel}</p>
              </div>

              {/* Face Details Grid */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Metric
                  label="Similarity Score"
                  value={
                    faceData?.similarity !== undefined
                      ? `${(faceData.similarity * 100).toFixed(4)}% (${faceData.similarity})`
                      : "N/A"
                  }
                  tone={faceData?.match ? "text-emerald-300" : "text-red-300"}
                />
                <Metric
                  label="Match Threshold"
                  value={
                    faceData?.threshold !== undefined
                      ? `${(faceData.threshold * 100).toFixed(1)}% (${faceData.threshold})`
                      : "0.42"
                  }
                />
              </div>

              {/* Bounding Box Information */}
              <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Document Face BBox:</span>
                  <span className="text-slate-200">
                    {faceData?.doc_face?.bbox ? `[${faceData.doc_face.bbox.join(", ")}]` : "None"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Document Face Score / Src:</span>
                  <span className="text-emerald-300">
                    {faceData?.doc_face?.score !== undefined
                      ? `${(faceData.doc_face.score * 100).toFixed(2)}% (${faceData.doc_face.source || "insightface"})`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Live Face BBox:</span>
                  <span className="text-slate-200">
                    {faceData?.live_face?.bbox ? `[${faceData.live_face.bbox.join(", ")}]` : "None"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Live Face Score / Src:</span>
                  <span className="text-emerald-300">
                    {faceData?.live_face?.score !== undefined
                      ? `${(faceData.live_face.score * 100).toFixed(2)}% (${faceData.live_face.source || "insightface"})`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Detailed Sections Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Machine Readable Zone (MRZ) / Aadhaar Validation Section */}
          {isAadhaarReport ? (
            /* ── Aadhaar Card Inspection & QR Validation ── */
            <section className="rounded-2xl border border-red-500/15 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.14)] backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Scan className="h-5 w-5 text-red-300" />
                  <div>
                    <h2 className="font-bold text-white">Aadhaar Card Inspection</h2>
                    <p className="mt-0.5 text-xs text-slate-500">Verhoeff number validation, QR code & OCR extraction</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                      aadhaarNumberVal?.valid
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                        : "border-red-500/40 bg-red-500/10 text-red-300"
                    }`}
                  >
                    {aadhaarNumberVal?.valid ? "Number Valid" : "Number Invalid"}
                  </span>
                </div>
              </div>

              {/* Verhoeff Number Validation */}
              <div className={`flex items-center gap-3 rounded-xl border p-4 ${
                aadhaarNumberVal?.valid
                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/25 bg-red-500/10 text-red-300"
              }`}>
                {aadhaarNumberVal?.valid ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <CircleAlert className="h-5 w-5 shrink-0 text-red-400" />
                )}
                <div>
                  <p className="text-sm font-bold">
                    Verhoeff Algorithm: {aadhaarNumberVal?.valid ? "VALID" : "INVALID"}
                  </p>
                  {aadhaarNumberVal?.reason && (
                    <p className="text-xs opacity-80 mt-0.5">{aadhaarNumberVal.reason as string}</p>
                  )}
                </div>
              </div>

              {/* QR Code Status */}
              <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-red-300" />
                  <p className="text-xs font-bold uppercase tracking-wider text-white">QR Code Status</p>
                </div>
                {aadhaarValidation?.qr_data ? (
                  <p className="text-xs text-emerald-300 font-mono">QR data decoded successfully</p>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                    <p className="text-xs text-amber-300">QR code not found on document</p>
                  </div>
                )}
              </div>

              {/* OCR Issues */}
              {aadhaarOcrIssues && aadhaarOcrIssues.length > 0 && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-300">OCR Issues Detected</p>
                  <div className="space-y-1">
                    {aadhaarOcrIssues.map((issue, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CircleAlert className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span className="text-xs text-amber-200">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Parsed Aadhaar Fields Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="Aadhaar Number" value={
                  aadhaarFields?.aadhaar_number
                    ? String(aadhaarFields.aadhaar_number).replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3")
                    : report.identifier
                } />
                <Metric label="Name (OCR)" value={(aadhaarFields?.name as string | undefined) || report.name} />
                <Metric label="Date of Birth" value={(aadhaarFields?.dob as string | undefined) || report.dateOfBirth} />
                <Metric label="Gender" value={(aadhaarFields?.gender as string | undefined) || "—"} />
              </div>
            </section>
          ) : (
            /* ── Passport MRZ Inspection ── */
            <section className="rounded-2xl border border-red-500/15 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.14)] backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-red-300" />
                <div>
                  <h2 className="font-bold text-white">Machine Readable Zone (MRZ) Inspection</h2>
                  <p className="mt-0.5 text-xs text-slate-500">ICAO 9303 standard checksums & raw OCR string</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                    ocrValidation?.mrz_parsed_successfully
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/40 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {ocrValidation?.mrz_parsed_successfully ? "MRZ Parsed" : "MRZ Error"}
                </span>
                {mrzData?.was_recovered && (
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-amber-300">
                    Recovered
                  </span>
                )}
              </div>
            </div>

            {/* MRZ Checksum Pills */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Passport # Checksum</p>
                <div className="mt-1 flex items-center justify-center gap-1 font-mono text-xs font-bold text-emerald-400">
                  {mrzData?.checksum_valid?.passport_number !== false ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> VALID
                    </>
                  ) : (
                    <>
                      <X className="h-3.5 w-3.5 text-red-400" /> INVALID
                    </>
                  )}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">DOB Checksum</p>
                <div className="mt-1 flex items-center justify-center gap-1 font-mono text-xs font-bold text-emerald-400">
                  {mrzData?.checksum_valid?.dob !== false ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> VALID
                    </>
                  ) : (
                    <>
                      <X className="h-3.5 w-3.5 text-red-400" /> INVALID
                    </>
                  )}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <p className="text-[10px] uppercase tracking-wider text-slate-500">Expiry Checksum</p>
                <div className="mt-1 flex items-center justify-center gap-1 font-mono text-xs font-bold text-emerald-400">
                  {mrzData?.checksum_valid?.expiry !== false ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> VALID
                    </>
                  ) : (
                    <>
                      <X className="h-3.5 w-3.5 text-red-400" /> INVALID
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Raw MRZ Lines */}
            <div className="rounded-xl border border-slate-800 bg-black/70 p-4 font-mono text-xs text-slate-300 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-400">Raw MRZ Strings</p>
              {mrzData?.mrz_line1 && (
                <div className="break-all rounded bg-slate-900/90 p-2 border border-slate-800 text-slate-200">
                  <span className="text-slate-500 select-none mr-2">L1:</span>
                  {mrzData.mrz_line1}
                </div>
              )}
              {mrzData?.mrz_line2 && (
                <div className="break-all rounded bg-slate-900/90 p-2 border border-slate-800 text-emerald-300">
                  <span className="text-slate-500 select-none mr-2">L2:</span>
                  {mrzData.mrz_line2}
                </div>
              )}
              {mrzData?.mrz_line2_raw && mrzData.mrz_line2_raw !== mrzData.mrz_line2 && (
                <div className="break-all rounded bg-slate-900/90 p-2 border border-slate-800 text-amber-300">
                  <span className="text-slate-500 select-none mr-2">Raw:</span>
                  {mrzData.mrz_line2_raw}
                </div>
              )}
            </div>

            {/* Parsed MRZ Details Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="MRZ Passport #" value={mrzData?.passport_number_mrz || report.identifier} />
              <Metric label="MRZ Given Names" value={mrzData?.given_names || report.name} />
              <Metric label="MRZ Nationality" value={mrzData?.nationality_mrz || report.nationality} tone={mrzData?.nationality_corrected ? "text-amber-300" : "text-slate-200"} />
              <Metric label="MRZ DOB" value={mrzData?.dob_mrz || report.dateOfBirth} />
              <Metric label="MRZ Sex" value={mrzData?.sex_mrz || "M"} />
              <Metric label="MRZ Expiry" value={mrzData?.expiry_mrz || "N/A"} />
            </div>
          </section>
          )}



          {/* Tamper Detection & Forensic Features Section */}
          <section className="rounded-2xl border border-red-500/15 bg-white/[0.035] p-6 shadow-[0_20px_55px_rgba(90,12,28,0.14)] backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-red-300" />
                <div>
                  <h2 className="font-bold text-white">Tamper Detection & Signals</h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    ELA, Edge response, Noise texture & Sharpness
                  </p>
                </div>
              </div>
              <Clock3 className="h-5 w-5 text-violet-200" />
            </div>

            {/* Tamper Risk Overview */}
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Tampered Probability</p>
                <p className={`mt-1 text-3xl font-black ${(tamperData?.tampered_probability ?? report.tamperedProbability) > 30 ? "text-amber-300" : "text-emerald-300"}`}>
                  {((tamperData?.tampered_probability ?? report.tamperedProbability) || 0).toFixed(2)}%
                </p>
              </div>
              <div className="text-right">
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-200">
                  {tamperData?.decision || report.tamperDecision}
                </span>
                <p className="text-[10px] text-slate-400 mt-2 font-mono">
                  Rule Override: {tamperData?.rule_override_triggered ? "YES" : "NO"}
                </p>
              </div>
            </div>

            {/* Feature Values Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="ELA Variance" value={(tamperData?.features?.ela ?? report.ela).toFixed(2)} />
              <Metric label="Edge Response" value={(tamperData?.features?.edge ?? report.edge).toFixed(2)} />
              <Metric label="Noise Texture" value={(tamperData?.features?.noise_texture ?? report.noiseTexture).toFixed(2)} />
              <Metric label="Sharpness" value={(tamperData?.features?.sharpness ?? report.sharpness).toFixed(2)} />
              <Metric
                label="Font Consistency"
                value={report.fontConsistency === null ? "Not returned" : `${report.fontConsistency.toFixed(2)}%`}
                tone={report.fontConsistency === null ? "text-slate-500" : "text-emerald-300"}
              />
              <Metric
                label="Authenticity Confidence"
                value={`${report.authenticityConfidence.toFixed(2)}%`}
                tone={passed ? "text-emerald-300" : "text-amber-300"}
              />
            </div>

            {/* Visual OCR Fields Summary */}
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-red-300" />
                <p className="text-xs font-bold uppercase tracking-wider text-white">Visual OCR Extraction</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div><span className="text-slate-500">Name:</span> <span className="text-slate-200">{visualData?.name || report.name}</span></div>
                <div><span className="text-slate-500">Passport #:</span> <span className="text-slate-200">{visualData?.passport_number || report.identifier}</span></div>
                <div><span className="text-slate-500">DOB:</span> <span className="text-slate-200">{visualData?.date_of_birth || report.dateOfBirth}</span></div>
                <div><span className="text-slate-500">Sex:</span> <span className="text-slate-200">{visualData?.sex || "M"}</span></div>
                <div><span className="text-slate-500">Issue Date:</span> <span className="text-slate-200">{visualData?.date_of_issue || "24/03/2014"}</span></div>
                <div><span className="text-slate-500">Expiry Date:</span> <span className="text-slate-200">{visualData?.date_of_expiry || "23/03/2024"}</span></div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer info note */}
        <div className="mt-8 flex items-center gap-2 rounded-xl border border-violet-300/15 bg-violet-300/[0.035] px-4 py-3 text-xs leading-5 text-slate-400">
          <ShieldCheck className="h-4 w-4 shrink-0 text-violet-200" /> This report integrates local document OCR, MRZ validation, tamper detection feature maps, and InsightFace biometric face verification signals.
        </div>
      </div>

      {/* High Resolution Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 px-3">
              <h3 className="text-sm font-bold text-white">{modalImageTitle}</h3>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="rounded-lg border border-slate-700 p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={modalImageSrc} alt={modalImageTitle} className="max-h-[80vh] max-w-[85vw] object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
