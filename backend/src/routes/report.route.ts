import { Router } from "express";
import { randomUUID } from "node:crypto";
import multer from "multer";
import prismaClient, { withDatabaseRetry } from "../config/db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const reportRouter: Router = Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 25 * 1024 * 1024, files: 2 },
});

const screeningApiUrl = process.env.SCREENING_API_URL || "http://192.168.220.96:8000/screen-document";

type ScreeningResponse = {
    ocr_validation?: {
        visual?: Record<string, unknown>;
        mrz?: Record<string, unknown>;
    };
    aadhaar_validation?: {
        fields?: Record<string, unknown>;
        number_validation?: Record<string, unknown>;
        qr_data?: unknown;
        ocr_issues?: unknown[];
    };
    tamper_detection?: {
        tampered_probability?: unknown;
        decision?: unknown;
        features?: Record<string, unknown>;
    };
    overall?: {
        overall_risk_score?: unknown;
        risk_level?: unknown;
        reasons?: unknown[];
    };
};

const asString = (value: unknown) => typeof value === "string" && value.trim() ? value.trim() : undefined;
const asNumber = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? value : undefined;
const routeParam = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

const serializeReport = (report: any) => {
    let screeningResult: any = undefined;
    let documentImageUrl: string | undefined = undefined;
    let livePhotoUrl: string | undefined = undefined;
    let tamperDecision = report.tamperDecision;

    if (report.tamperDecision && typeof report.tamperDecision === "string" && report.tamperDecision.startsWith("{")) {
        try {
            const parsed = JSON.parse(report.tamperDecision);
            tamperDecision = parsed.decision || parsed.tamperDecision || report.tamperDecision;
            screeningResult = parsed.screeningResult;
            documentImageUrl = parsed.documentImageUrl;
            livePhotoUrl = parsed.livePhotoUrl;
        } catch {
            tamperDecision = report.tamperDecision;
        }
    }

    return {
        id: report.id,
        reportReference: report.reportReference,
        status: report.status,
        documentType: report.document?.documentType,
        overallRiskScore: report.overallRiskScore?.toNumber?.() ?? report.overallRiskScore,
        verdict: report.verdict,
        riskLevel: report.riskLevel,
        fullName: report.fullName,
        dateOfBirth: report.dateOfBirth,
        identifier: report.identifier,
        mrzChecksumValid: report.mrzChecksumValid,
        authenticityConfidence: report.authenticityConfidence?.toNumber?.() ?? report.authenticityConfidence,
        tamperedProbability: report.tamperedProbability?.toNumber?.() ?? report.tamperedProbability,
        tamperDecision,
        elaVariance: report.elaVariance?.toNumber?.() ?? report.elaVariance,
        edgeResponse: report.edgeResponse?.toNumber?.() ?? report.edgeResponse,
        noiseTexture: report.noiseTexture?.toNumber?.() ?? report.noiseTexture,
        sharpness: report.sharpness?.toNumber?.() ?? report.sharpness,
        fontConsistency: report.fontConsistency?.toNumber?.() ?? report.fontConsistency,
        consentGranted: report.consentGranted,
        consentedAt: report.consentedAt,
        createdAt: report.createdAt,
        screeningResult,
        documentImageUrl,
        livePhotoUrl,
    };
};

const reportInclude = { document: { select: { documentType: true } } } as const;

async function createStoredReport(
    userId: string,
    documentType: string,
    screeningResult: ScreeningResponse,
    requestedReference?: string,
    images?: { documentImageUrl?: string | undefined; livePhotoUrl?: string | undefined },
) {
    const visual = screeningResult.ocr_validation?.visual || {};
    const mrz = screeningResult.ocr_validation?.mrz || {};
    const aadhaar = screeningResult.aadhaar_validation || {};
    const aadhaarFields = (aadhaar.fields || {}) as Record<string, unknown>;
    const tamper = screeningResult.tamper_detection || {};
    const features = tamper.features || {};
    const overall = screeningResult.overall || {};
    const overallRiskScore = asNumber(overall.overall_risk_score);
    const tamperedProbability = asNumber(tamper.tampered_probability);
    const mrzChecks = mrz.checksum_valid;
    const mrzChecksumValid = typeof mrzChecks === "object" && mrzChecks !== null
        ? Object.values(mrzChecks as Record<string, unknown>).every((value) => value === true)
        : (typeof aadhaar.number_validation?.valid === "boolean" ? aadhaar.number_validation.valid : undefined);
    const verdict = overallRiskScore !== undefined && overallRiskScore < 30 && (tamperedProbability === undefined || tamperedProbability < 20) ? "Passed" : "Flagged";
    const reportReference = requestedReference?.match(/^KAV-[A-Z0-9-]+$/)
        ? requestedReference
        : `KAV-${randomUUID().slice(0, 8).toUpperCase()}`;

    const rawDecision = asString(tamper.decision);
    const tamperDecisionPayload = JSON.stringify({
        decision: rawDecision,
        screeningResult,
        documentImageUrl: images?.documentImageUrl,
        livePhotoUrl: images?.livePhotoUrl,
    });

    const normalizedDocType = documentType.toUpperCase();
    const storedDocType = (normalizedDocType === "ADHAR" || normalizedDocType === "AADHAAR" || normalizedDocType.includes("ADHAAR") || normalizedDocType.includes("AADHAAR")) ? "Adhar" : documentType;

    const document = await prismaClient.document.create({ data: { userId, documentType: storedDocType } });

    try {
        return await prismaClient.documentReport.create({
            data: {
                reportReference,
                userId,
                documentId: document.id,
                status: "COMPLETED",
                overallRiskScore: overallRiskScore ?? null,
                verdict,
                riskLevel: asString(overall.risk_level) ?? null,
                fullName: asString(visual.name) || asString(mrz.name_mrz) || asString(aadhaarFields.name) || null,
                dateOfBirth: asString(visual.date_of_birth) || asString(mrz.dob_mrz) || asString(aadhaarFields.dob) || null,
                identifier: asString(visual.passport_number) || asString(mrz.passport_number_mrz) || asString(aadhaarFields.aadhaar_number) || null,
                mrzChecksumValid: mrzChecksumValid ?? null,
                authenticityConfidence: tamperedProbability === undefined ? null : 100 - tamperedProbability,
                tamperedProbability: tamperedProbability ?? null,
                tamperDecision: tamperDecisionPayload,
                elaVariance: asNumber(features.ela) ?? null,
                edgeResponse: asNumber(features.edge) ?? null,
                noiseTexture: asNumber(features.noise_texture) ?? null,
                sharpness: asNumber(features.sharpness) ?? null,
                consentGranted: true,
                consentedAt: new Date(),
            },
            include: reportInclude,
        });
    } catch (error) {
        // The Neon driver does not support Prisma interactive transactions. Avoid orphaning a document on a failed report insert.
        await prismaClient.document.delete({ where: { id: document.id } }).catch(() => undefined);
        throw error;
    }
}

reportRouter.get("/", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    try {
        const reports = await withDatabaseRetry(() => prismaClient.documentReport.findMany({
            where: { userId },
            include: reportInclude,
            orderBy: { createdAt: "desc" },
        }));
        return res.status(200).json({ reports: reports.map(serializeReport) });
    } catch (error) {
        console.error("Error fetching reports:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

reportRouter.get("/:id", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    const reportId = routeParam(req.params.id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!reportId) return res.status(400).json({ message: "Report id is required" });

    try {
        const report = await withDatabaseRetry(() => prismaClient.documentReport.findFirst({
            where: { userId, OR: [{ id: reportId }, { reportReference: reportId }] },
            include: reportInclude,
        }));
        if (!report) return res.status(404).json({ message: "Report not found" });
        return res.status(200).json({ report: serializeReport(report) });
    } catch (error) {
        console.error("Error fetching report:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

reportRouter.delete("/:id", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    const reportId = routeParam(req.params.id);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!reportId) return res.status(400).json({ message: "Report id is required" });

    try {
        const report = await prismaClient.documentReport.findFirst({
            where: { userId, OR: [{ id: reportId }, { reportReference: reportId }] },
            select: { id: true, documentId: true },
        });
        if (!report) return res.status(404).json({ message: "Report not found" });

        await prismaClient.documentReport.delete({ where: { id: report.id } });
        const remainingReports = await prismaClient.documentReport.count({ where: { documentId: report.documentId } });
        if (remainingReports === 0) {
            await prismaClient.document.delete({ where: { id: report.documentId } });
        }

        return res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        console.error("Error deleting report:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

reportRouter.post("/from-screening", authMiddleware, async (req, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const rawDocumentType = String(req.body.documentType || "PASSPORT");
    const normalizedType = rawDocumentType.toUpperCase();
    const isAadhaar = normalizedType === "ADHAR" || normalizedType === "AADHAAR" || normalizedType.includes("ADHAAR") || normalizedType.includes("AADHAAR");
    const isPassport = normalizedType === "PASSPORT";

    const screeningResult = req.body.screeningResult as ScreeningResponse | undefined;
    const reportReference = typeof req.body.reportReference === "string" ? req.body.reportReference : undefined;
    const documentImageUrl = typeof req.body.documentImageUrl === "string" ? req.body.documentImageUrl : undefined;
    const livePhotoUrl = typeof req.body.livePhotoUrl === "string" ? req.body.livePhotoUrl : undefined;

    if (req.body.consentGranted !== true) {
        return res.status(400).json({ message: "Consent is required before screening" });
    }
    if (!isPassport && !isAadhaar) {
        return res.status(400).json({ message: "Only passport and Aadhaar screening are currently supported" });
    }
    if (!screeningResult || typeof screeningResult !== "object" || Array.isArray(screeningResult)) {
        return res.status(400).json({ message: "A valid screening result is required" });
    }

    try {
        const storedDocType = isAadhaar ? "Adhar" : "PASSPORT";
        const report = await createStoredReport(userId, storedDocType, screeningResult, reportReference, {
            documentImageUrl,
            livePhotoUrl,
        });
        return res.status(201).json({ report: serializeReport(report) });
    } catch (error) {
        console.error("Error saving screening report:", error);
        return res.status(500).json({ message: "Unable to save document report" });
    }
});

reportRouter.post(
    "/scan",
    authMiddleware,
    upload.fields([
        { name: "doc_image", maxCount: 1 },
        { name: "live_image", maxCount: 1 },
    ]),
    async (req, res) => {
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
        const documentImage = files?.doc_image?.[0];
        const liveImage = files?.live_image?.[0];

        if (!documentImage || !liveImage) {
            return res.status(400).json({ message: "doc_image and live_image are required" });
        }
        if (req.body.consent_granted !== "true") {
            return res.status(400).json({ message: "Consent is required before screening" });
        }
        const rawDocumentType = String(req.body.document_type || req.body.documentType || "PASSPORT");
        const normalizedType = rawDocumentType.toUpperCase();
        const isAadhaar = normalizedType === "ADHAR" || normalizedType === "AADHAAR" || normalizedType.includes("ADHAAR") || normalizedType.includes("AADHAAR");
        const isPassport = normalizedType === "PASSPORT";

        if (!isPassport && !isAadhaar) {
            return res.status(400).json({ message: "Only passport and Aadhaar screening are currently supported" });
        }

        try {
            const formData = new FormData();
            formData.append("doc_image", new Blob([new Uint8Array(documentImage.buffer).buffer as ArrayBuffer], { type: documentImage.mimetype }), documentImage.originalname);
            formData.append("live_image", new Blob([new Uint8Array(liveImage.buffer).buffer as ArrayBuffer], { type: liveImage.mimetype }), liveImage.originalname);

            const targetUrl = isAadhaar
                ? (process.env.SCREENING_AADHAAR_API_URL || screeningApiUrl.replace(/\/screen-document\/?$/, "/screen-aadhaar"))
                : screeningApiUrl;

            const screeningResponse = await fetch(targetUrl, { method: "POST", body: formData });
            const screeningResult = await screeningResponse.json() as ScreeningResponse;
            if (!screeningResponse.ok) {
                return res.status(502).json({ message: "Document screening service failed", details: screeningResult });
            }

            const documentImageUrl = documentImage ? `data:${documentImage.mimetype};base64,${documentImage.buffer.toString("base64")}` : undefined;
            const livePhotoUrl = liveImage ? `data:${liveImage.mimetype};base64,${liveImage.buffer.toString("base64")}` : undefined;

            const storedDocType = isAadhaar ? "Adhar" : "PASSPORT";
            const report = await createStoredReport(userId, storedDocType, screeningResult, undefined, {
                documentImageUrl,
                livePhotoUrl,
            });

            return res.status(201).json({ report: serializeReport(report) });
        } catch (error) {
            console.error("Error creating report:", error);
            return res.status(502).json({ message: "Unable to create document report" });
        }
    },
);

export default reportRouter;
