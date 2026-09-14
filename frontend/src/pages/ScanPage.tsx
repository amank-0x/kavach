import { ArrowLeft, Camera, CameraOff, CheckCircle2, CreditCard, Database, EyeOff, FileText, Globe, LoaderCircle, LockKeyhole, RefreshCw, ShieldCheck, UploadCloud, Video, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ScanPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [file, setFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [captured, setCaptured] = useState(false);
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState("");
  const [running, setRunning] = useState(false);
  
  // Camera state: covered initially until user clicks to open
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [error, setError] = useState("");
  const [selectedDoc, setSelectedDoc] = useState("Passport");
  const [consented, setConsented] = useState(false);

  const documentTypes = [
    {
      id: "passport",
      title: "Passport",
      subtitle: "MRZ & OCR Verification",
      icon: Globe,
      status: "ready",
      statusText: "READY",
    },
    {
      id: "aadhaar",
      title: "Aadhaar Card",
      subtitle: "QR & OCR Verification",
      icon: CreditCard,
      status: "coming_soon",
      statusText: "COMING SOON",
    },
    {
      id: "visa",
      title: "Visa Document",
      subtitle: "Embassy Stamp Analysis",
      icon: FileText,
      status: "coming_soon",
      statusText: "COMING SOON",
    },
    {
      id: "driving_license",
      title: "Driving License",
      subtitle: "State Record Check",
      icon: CreditCard,
      status: "coming_soon",
      statusText: "COMING SOON",
    },
  ];

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [previewUrl]);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
    setCameraLoading(true);
    setCameraError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera access is not supported in this browser.");
      setCameraLoading(false);
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" }, audio: false })
      .then((stream) => {
        streamRef.current = stream;
        setCameraReady(true);
        setCameraLoading(false);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      })
      .catch(() => {
        setCameraLoading(false);
        setCameraError("Camera permission was blocked or unavailable. Please grant camera access.");
      });
  };

  const handleCloseCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOpen(false);
    setCameraReady(false);
    setCaptured(false);
    setCapturedPhotoUrl("");
  };

  const chooseFile = (selectedFile?: File) => {
    if (!selectedFile) return;
    if (!selectedFile.type.match(/^image\/(png|jpeg)$/)) {
      setError("Use a PNG or JPG passport image.");
      return;
    }
    setError("");

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setUploading(true);
    setUploadProgress(0);

    const timer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setUploading(false);
          setFile(selectedFile.name);
          setPreviewUrl(objectUrl);
          return 100;
        }
        return prev + 20;
      });
    }, 120);
  };

  const removeDocument = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile("");
    setPreviewUrl("");
    setUploading(false);
    setUploadProgress(0);
  };

  const captureEvidence = () => {
    if (!videoRef.current || !cameraReady) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedPhotoUrl(dataUrl);
    }

    // Immediately stop all camera hardware tracks & turn off camera LED indicator light!
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setCameraReady(false);
    setCaptured(true);
  };

  const retakeEvidence = () => {
    setCaptured(false);
    setCapturedPhotoUrl("");
    handleOpenCamera();
  };

  const execute = () => {
    if (!file || !captured || !consented) return;
    setRunning(true);
    window.setTimeout(() => navigate("/dashboard/report/KAV-84921"), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-200">
      {/* Header with Exit Button clearly visible on the LEFT */}
      <header className="flex items-center justify-between border-b border-slate-800/80 bg-[#0b0f19]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 shadow-[0_0_15px_rgba(220,38,38,0.15)] transition-all hover:border-red-500/70 hover:bg-red-500/20 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Exit Scan Workspace
        </Link>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-red-400">
          Session: local_inference_pipeline
        </p>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-8">
        <div>
          <p className="text-sm text-slate-500">New verification</p>
          <h1 className="mt-1 text-3xl font-black text-white">Prepare forensic inputs</h1>
        </div>

        {/* Target Document Selection Grid */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-white">Target Document Type</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {documentTypes.map((doc) => {
              const Icon = doc.icon;
              const isReady = doc.status === "ready";
              const isSelected = selectedDoc === doc.title;

              return (
                <div
                  key={doc.id}
                  onClick={() => isReady && setSelectedDoc(doc.title)}
                  className={`relative rounded-xl p-5 transition-all ${
                    isReady
                      ? isSelected
                        ? "cursor-pointer border-2 border-red-500 bg-slate-800/90 shadow-[0_0_22px_rgba(220,38,38,0.15)]"
                        : "cursor-pointer border border-slate-700 bg-slate-900/60 hover:border-red-500/50"
                      : "cursor-not-allowed border border-slate-800/80 bg-slate-950/40 opacity-60"
                  }`}
                >
                  <span
                    className={`absolute right-3 top-3 rounded font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 ${
                      isReady
                        ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                        : "bg-slate-800 border border-slate-700 text-slate-400"
                    }`}
                  >
                    {doc.statusText}
                  </span>
                  
                  {isReady ? (
                    <Icon className="h-6 w-6 text-red-400" />
                  ) : (
                    <LockKeyhole className="h-6 w-6 text-slate-500" />
                  )}

                  <p className={`mt-5 font-bold ${isReady ? "text-white" : "text-slate-400"}`}>
                    {doc.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{doc.subtitle}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ingestion & Photo Capture Section */}
        <section className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl lg:grid-cols-2">
          
          {/* Document Ingestion with Upload Animation & Preview */}
          <div>
            <h2 className="mb-4 font-bold text-white">Document Ingestion</h2>

            {uploading ? (
              /* State A: Uploading Animation */
              <div className="relative flex h-72 w-full flex-col items-center justify-center rounded-xl border border-red-500/30 bg-red-950/10 px-6 text-center">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/10">
                  <LoaderCircle className="h-7 w-7 animate-spin text-red-400" />
                </div>
                <p className="mt-4 font-bold text-white">Uploading & Staging Document...</p>
                <p className="mt-1 text-xs text-slate-400">Performing local MIME & integrity verification</p>

                <div className="mt-6 w-full max-w-xs space-y-2">
                  <div className="flex justify-between font-mono text-xs text-slate-300">
                    <span>Progress</span>
                    <span className="font-bold text-red-400">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-900">
                    <div
                      className="h-full rounded-full bg-red-500 transition-all duration-150"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : previewUrl ? (
              /* State B: Document Image Preview */
              <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-emerald-500/40 bg-black shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <img
                  src={previewUrl}
                  alt="Uploaded passport preview"
                  className="h-full w-full object-contain p-2"
                />

                {/* Staged & Verified Badge */}
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Document Staged
                </div>

                {/* Remove / Change button */}
                <button
                  type="button"
                  onClick={removeDocument}
                  className="absolute right-3 top-3 rounded-lg border border-red-500/40 bg-slate-900/90 p-2 text-red-300 transition-colors hover:bg-red-500 hover:text-white"
                  aria-label="Remove document"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Filename Footer Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-slate-950/85 border-t border-slate-800 px-4 py-2 text-xs font-mono text-slate-300 truncate">
                  {file}
                </div>
              </div>
            ) : (
              /* State C: Idle Dropzone */
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
                }}
                className="relative flex h-72 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/50 px-5 text-center transition-colors hover:border-red-500/70"
              >
                <UploadCloud className="h-9 w-9 text-red-300" />
                <p className="mt-4 font-semibold text-slate-200">Drop Passport Image</p>
                <p className="mt-2 text-xs text-slate-500">PNG or JPG • Edge MIME verified</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(event) => chooseFile(event.target.files?.[0])}
                />
              </div>
            )}
          </div>

          {/* Covered Live Photo Capture Section */}
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-bold text-white">Live Photo Capture</h2>
              <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                <Video className="h-4 w-4 text-red-300" /> Local Camera
              </span>
            </div>

            <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
              {captured && capturedPhotoUrl ? (
                /* State 1: Photo Snapshot Captured (Camera Hardware & Light Stopped) */
                <div className="relative h-full w-full">
                  <img
                    src={capturedPhotoUrl}
                    alt="Captured photo snapshot"
                    className="h-full w-full object-cover"
                  />

                  {/* Captured Badge & Camera Off Indicator */}
                  <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-md bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Photo Captured • Camera Off
                  </div>

                  {/* Action Controls */}
                  <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-3 px-4">
                    <button
                      type="button"
                      onClick={retakeEvidence}
                      className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-red-500"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Retake Photo
                    </button>

                    <button
                      type="button"
                      onClick={handleCloseCamera}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <CameraOff className="h-3.5 w-3.5" /> Close Camera
                    </button>
                  </div>
                </div>
              ) : !isCameraOpen ? (
                /* State 2: Cover state (Camera Standby / Privacy Shield) */
                <div
                  onClick={handleOpenCamera}
                  className="group flex h-full w-full cursor-pointer flex-col items-center justify-center bg-gradient-to-b from-slate-900/90 to-slate-950 px-6 text-center transition-all hover:from-slate-900 hover:to-slate-900/90"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-transform group-hover:scale-105">
                    <CameraOff className="h-7 w-7" />
                  </div>
                  <p className="mt-4 font-bold text-white">Camera Covered for Privacy</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Click anywhere or press below to open live camera stream.
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenCamera();
                    }}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all hover:bg-red-500"
                  >
                    <Camera className="h-4 w-4" /> Open Camera & Take Picture
                  </button>
                </div>
              ) : (
                /* State 3: Active Camera Stream */
                <>
                  {cameraLoading && (
                    <div className="px-6 text-center">
                      <LoaderCircle className="mx-auto h-6 w-6 animate-spin text-red-300" />
                      <p className="mt-3 text-sm text-slate-400">Initializing camera feed...</p>
                    </div>
                  )}

                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    className={`h-full w-full object-cover ${cameraReady ? "block" : "hidden"}`}
                    aria-label="Live camera preview"
                  />

                  {/* Reticle Overlays */}
                  {cameraReady && (
                    <>
                      <div className="pointer-events-none absolute inset-8 border border-red-500/25" />
                      <div className="pointer-events-none absolute left-8 top-8 h-8 w-8 border-l-2 border-t-2 border-red-400" />
                      <div className="pointer-events-none absolute right-8 top-8 h-8 w-8 border-r-2 border-t-2 border-red-400" />
                      <div className="pointer-events-none absolute bottom-8 left-8 h-8 w-8 border-b-2 border-l-2 border-red-400" />
                      <div className="pointer-events-none absolute bottom-8 right-8 h-8 w-8 border-b-2 border-r-2 border-red-400" />
                    </>
                  )}

                  {cameraError && (
                    <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-xs leading-5 text-red-300">
                      {cameraError}
                    </p>
                  )}

                  {/* Controls */}
                  {cameraReady && (
                    <div className="absolute bottom-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={captureEvidence}
                        className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-red-500"
                      >
                        <Camera className="h-3.5 w-3.5" /> Take Picture
                      </button>

                      <button
                        type="button"
                        onClick={handleCloseCamera}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
                        aria-label="Close camera"
                      >
                        <X className="h-3.5 w-3.5" /> Close
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {error && <p className="text-sm text-red-300">{error}</p>}

        <section className="rounded-2xl border border-violet-300/15 bg-violet-300/[0.035] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_20px_50px_rgba(91,33,182,0.12)] backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-violet-200" />
            <div>
              <h2 className="font-bold text-white">Privacy and processing consent</h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">Review how this verification session handles your evidence before starting the local pipeline.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-black/10 p-4"><Database className="h-4 w-4 text-red-300" /><p className="mt-3 text-sm font-semibold text-slate-200">Processed locally</p><p className="mt-1 text-xs leading-5 text-slate-500">Evidence is staged for this verification session and sent only to the configured backend.</p></div>
            <div className="rounded-xl border border-white/10 bg-black/10 p-4"><EyeOff className="h-4 w-4 text-red-300" /><p className="mt-3 text-sm font-semibold text-slate-200">No face recognition</p><p className="mt-1 text-xs leading-5 text-slate-500">The live photo is used as capture evidence only. Kavach does not create or compare biometric profiles.</p></div>
            <div className="rounded-xl border border-white/10 bg-black/10 p-4"><LockKeyhole className="h-4 w-4 text-red-300" /><p className="mt-3 text-sm font-semibold text-slate-200">Controlled retention</p><p className="mt-1 text-xs leading-5 text-slate-500">Remove staged files before submission or end the session to clear the local preview.</p></div>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-violet-300/15 bg-violet-300/[0.04] p-4 transition-colors hover:border-violet-300/35">
            <input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} className="mt-1 h-4 w-4 accent-violet-300" />
            <span className="text-sm leading-6 text-slate-300">I confirm that I am authorized to submit these documents and consent to their use for this verification session. I understand that this scan performs document integrity and OCR checks only.</span>
          </label>
        </section>
        
        <button
          type="button"
          disabled={!file || !captured || !consented || running}
          onClick={execute}
          className={`flex w-full items-center justify-center gap-3 rounded-xl border py-4 font-mono text-sm font-bold tracking-wide transition-all ${
            file && captured && !running
              ? "border-red-400/40 bg-red-600 text-white shadow-[0_0_22px_rgba(220,38,38,0.3)] hover:bg-red-500"
              : "border-slate-700/50 bg-slate-800 text-slate-500"
          }`}
        >
          {running ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" /> Streaming payload to local backend...
            </>
          ) : file && captured && consented ? (
            "Execute unified forensic pipeline"
          ) : file && captured ? (
            "Confirm consent to continue"
          ) : (
            "Awaiting document & live photo (0/2 ready)"
          )}
        </button>
      </main>
    </div>
  );
}
