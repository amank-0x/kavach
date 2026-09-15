export interface VisualOcrData {
  passport_number?: string;
  name?: string;
  sex?: string;
  date_of_birth?: string;
  date_of_issue?: string;
  date_of_expiry?: string;
  nationality?: string;
  [key: string]: unknown;
}

export interface MrzData {
  mrz_line1?: string;
  mrz_line2_raw?: string;
  mrz_line2?: string;
  document_type?: string;
  issuing_country?: string;
  issuing_country_corrected?: boolean;
  surname?: string | null;
  given_names?: string;
  name_mrz?: string;
  passport_number_mrz?: string;
  nationality_mrz?: string;
  nationality_corrected?: boolean;
  dob_mrz?: string;
  sex_mrz?: string;
  expiry_mrz?: string;
  checksum_valid?: {
    passport_number?: boolean;
    dob?: boolean;
    expiry?: boolean;
    [key: string]: boolean | undefined;
  };
  was_recovered?: boolean;
  [key: string]: unknown;
}

export interface OcrValidationData {
  visual?: VisualOcrData;
  mrz?: MrzData;
  ocr_issues?: string[];
  mrz_parsed_successfully?: boolean;
}

export interface TamperDetectionFeatures {
  ela?: number;
  edge?: number;
  noise_texture?: number;
  sharpness?: number;
  [key: string]: unknown;
}

export interface TamperDetectionData {
  tampered_probability?: number;
  decision?: string;
  rule_override_triggered?: boolean;
  features?: TamperDetectionFeatures;
}

export interface FaceBoundingBox {
  bbox?: number[];
  score?: number;
  source?: string;
}

export interface FaceVerificationData {
  match?: boolean;
  similarity?: number;
  threshold?: number;
  risk_level?: string;
  message?: string;
  doc_face?: FaceBoundingBox;
  live_face?: FaceBoundingBox;
}

export interface OverallData {
  overall_risk_score?: number;
  risk_level?: string;
  reasons?: string[];
}

export type ScreeningResult = {
  ocr_validation?: OcrValidationData;
  tamper_detection?: TamperDetectionData;
  face_verification?: FaceVerificationData;
  overall?: OverallData;
  [key: string]: unknown;
};

export interface ReportRecord {
  id: string;
  reportReference: string;
  status: string;
  documentType?: string;
  overallRiskScore?: number | null;
  verdict?: string | null;
  riskLevel?: string | null;
  fullName?: string | null;
  dateOfBirth?: string | null;
  identifier?: string | null;
  nationality?: string | null;
  mrzChecksumValid?: boolean | null;
  authenticityConfidence?: number | null;
  tamperedProbability?: number | null;
  tamperDecision?: string | null;
  elaVariance?: number | null;
  edgeResponse?: number | null;
  noiseTexture?: number | null;
  sharpness?: number | null;
  fontConsistency?: number | null;
  consentGranted: boolean;
  consentedAt?: string | null;
  createdAt: string;
  screeningResult?: ScreeningResult;
  documentImageUrl?: string | null;
  livePhotoUrl?: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const SCREENING_API_URL = import.meta.env.VITE_SCREENING_API_URL || "http://192.168.220.96:8000/screen-document";

const numericValue = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : null;
const textValue = (value: unknown) => typeof value === "string" && value.trim() ? value.trim() : null;

export function screeningResultToReport(
  result: ScreeningResult,
  reportReference: string,
  options?: { documentImageUrl?: string | undefined; livePhotoUrl?: string | undefined }
): ReportRecord {
  const visual = result.ocr_validation?.visual || {};
  const mrz = result.ocr_validation?.mrz || {};
  const tamper = result.tamper_detection || {};
  const features = tamper.features || {};
  const overall = result.overall || {};
  const overallRiskScore = numericValue(overall.overall_risk_score);
  const tamperedProbability = numericValue(tamper.tampered_probability);
  const checksum = mrz.checksum_valid;
  const mrzChecksumValid = typeof checksum === "object" && checksum !== null
    ? Object.values(checksum as Record<string, unknown>).every((value) => value === true)
    : null;

  return {
    id: `local-${reportReference}`,
    reportReference,
    status: "COMPLETED",
    documentType: "PASSPORT",
    overallRiskScore,
    verdict: overallRiskScore !== null && overallRiskScore < 30 && (tamperedProbability === null || tamperedProbability < 20) ? "Passed" : "Flagged",
    riskLevel: textValue(overall.risk_level),
    fullName: textValue(visual.name) || textValue(mrz.name_mrz),
    dateOfBirth: textValue(visual.date_of_birth) || textValue(mrz.dob_mrz),
    identifier: textValue(visual.passport_number) || textValue(mrz.passport_number_mrz),
    nationality: textValue(visual.nationality) || textValue(mrz.nationality_mrz),
    mrzChecksumValid,
    authenticityConfidence: tamperedProbability === null ? null : 100 - tamperedProbability,
    tamperedProbability,
    tamperDecision: textValue(tamper.decision),
    elaVariance: numericValue(features.ela),
    edgeResponse: numericValue(features.edge),
    noiseTexture: numericValue(features.noise_texture),
    sharpness: numericValue(features.sharpness),
    fontConsistency: null,
    consentGranted: true,
    consentedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    screeningResult: result,
    documentImageUrl: options?.documentImageUrl || null,
    livePhotoUrl: options?.livePhotoUrl || null,
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = { message: response.statusText || "Request failed" };
  }

  if (!response.ok) {
    const message = typeof data === "object" && data !== null && "message" in data && typeof data.message === "string"
      ? data.message
      : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

async function fetchReadWithRetry(url: string): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, { method: "GET", credentials: "include" });
      if (response.status < 500 || attempt === 2) return response;
    } catch (error) {
      lastError = error;
      if (attempt === 2) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error("Unable to load reports");
}

export async function createReport(input: {
  document: File;
  livePhoto: File;
  documentType: string;
  consentGranted: boolean;
  documentImageUrl?: string | undefined;
  livePhotoUrl?: string | undefined;
}): Promise<{ report: ReportRecord; persistence: Promise<{ report: ReportRecord }> }> {
  const screeningFormData = new FormData();
  screeningFormData.append("doc_image", input.document);
  screeningFormData.append("live_image", input.livePhoto);

  const screeningResponse = await fetch(SCREENING_API_URL, {
    method: "POST",
    body: screeningFormData,
  });
  const screeningResult = await parseResponse<ScreeningResult>(screeningResponse);
  const reportReference = `KAV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  const report = screeningResultToReport(screeningResult, reportReference, {
    documentImageUrl: input.documentImageUrl,
    livePhotoUrl: input.livePhotoUrl,
  });

  const persistence = fetch(`${API_BASE_URL}/api/v1/report/from-screening`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      documentType: input.documentType,
      consentGranted: input.consentGranted,
      reportReference,
      screeningResult,
      documentImageUrl: input.documentImageUrl,
      livePhotoUrl: input.livePhotoUrl,
    }),
  }).then((response) => parseResponse<{ report: ReportRecord }>(response));

  return { report, persistence };
}

export async function getReport(id: string): Promise<{ report: ReportRecord }> {
  const response = await fetchReadWithRetry(`${API_BASE_URL}/api/v1/report/${encodeURIComponent(id)}`);

  return parseResponse<{ report: ReportRecord }>(response);
}

export async function getReports(): Promise<{ reports: ReportRecord[] }> {
  const response = await fetchReadWithRetry(`${API_BASE_URL}/api/v1/report`);

  return parseResponse<{ reports: ReportRecord[] }>(response);
}

export async function deleteReport(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/api/v1/report/${encodeURIComponent(id)}`, {
    method: "DELETE",
    credentials: "include",
  });

  return parseResponse<{ message: string }>(response);
}
