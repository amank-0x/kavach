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
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

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
}): Promise<{ report: ReportRecord }> {
  const formData = new FormData();
  formData.append("doc_image", input.document);
  formData.append("live_image", input.livePhoto);
  formData.append("document_type", input.documentType);
  formData.append("consent_granted", String(input.consentGranted));

  const response = await fetch(`${API_BASE_URL}/api/v1/report/scan`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return parseResponse<{ report: ReportRecord }>(response);
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
