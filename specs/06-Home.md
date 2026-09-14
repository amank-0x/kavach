# Home page


# The App Shell (Global Layout)

* Structure: A full-screen flex container (min-h-screen flex bg-[#0B0F19] text-slate-200).

* Sidebar (Left): Fixed width (w-64 border-r border-slate-800 bg-slate-900/40 backdrop-blur-md flex flex-col justify-between).

Top Navigation:

Verification Hub (Active state with a left cyan border and text-cyan-400).

Session History (Muted text-slate-400).

Local API Settings (Where users configure their FastAPI port).

Bottom Widget: A minimal profile block showing the active session and a "Secure Logout" button.

* Main Workspace (Right): A scrollable column containing your existing Header at the top, the dynamic dashboard content in the center, and the Footer at the bottom.


# Module 1: Document Type Selector
Place this at the top of the main dashboard area so the user establishes intent before uploading.

* Layout: A 4-column CSS grid (grid-cols-1 md:grid-cols-4 gap-4).

* Active Card (Passport):

bg-slate-800/80 border-2 border-cyan-500 rounded-xl p-4 cursor-pointer relative overflow-hidden.

A small pulsing green dot in the corner labeled LIVE.

An icon of a passport, followed by bold text: "Passport (MRZ & FaceNet)".

* Disabled Cards (Aadhaar, Visa, Driving License):

bg-slate-900/40 border border-slate-800 rounded-xl p-4 opacity-60 cursor-not-allowed relative.

A lock icon or muted graphic.

An absolute positioned badge over the card: bg-slate-800 text-slate-400 text-[10px] uppercase px-2 py-1 rounded absolute top-2 right-2 reading "COMING SOON".

# Module 2: Local Upload Dropzone
This section only appears after the user clicks the "Passport" card.

* Security Copy: Above the dropzone, add a trust badge: Shield Icon • Local Processing Active. Files are never uploaded to the cloud.

* The Dropzone:

A wide, dashed container (border-2 border-dashed border-slate-700 hover:border-cyan-500 bg-slate-900/50 rounded-2xl py-12 text-center transition-all).

Text: "Drag & Drop Passport Image" (with subtext: "Strictly PNG or JPG format").

Interaction: Once a file is dropped, the zone collapses into a "Loading" state showing a progress bar, simulating the FastAPI request (Analyzing ELA... Checking MRZ... Extracting Face...).

# Module 3: Forensic Verdict & Scoring (API Response)
Once the FastAPI backend returns the result, the screen splits into two logical steps. This is Step 1.

* Verdict Banner: A full-width card displaying the document's authenticity.

If Authentic: bg-emerald-950/30 border border-emerald-500 text-emerald-400. Text: "Document Verified: Authentic".

If Fake: bg-red-950/30 border border-red-500 text-red-400. Text: "High-Risk Forgery Detected".

* Data Grid: Beside the image preview, display the API payload:

Probability Score: A massive circular progress indicator (e.g., "94.2% Confidence").

Extracted Data: Render the parsed name and document number extracted from the Passport MRZ.


# Module 4: Live Biometric Match (FaceNet)
This is Step 2, rendered directly below the Verdict Banner. It requires the user to prove they are the person in the authenticated passport.

* Container Layout: A side-by-side flexbox or grid (grid-cols-2 gap-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6).

* Left Side (Reference Image):

Title: "Extracted Document Photo".

A cropped, square image of the face automatically pulled from the uploaded passport by your OpenCV backend.

* Right Side (Live Camera Feed):

Title: "Live Liveness Check".

A placeholder box for the React WebCam component (bg-black rounded-lg overflow-hidden relative aspect-square border-2 border-slate-700).

Add an overlay targeting reticle (corner brackets) over the video feed.

Action Button: A large primary button beneath the video feed (bg-cyan-600 hover:bg-cyan-500 text-white w-full py-3 rounded-lg font-bold) reading "Capture & Verify Identity".

* Final Output State: Once captured, the webcam feed freezes, a scanning animation sweeps over both faces, and a final toast notification appears: "FaceNet Match: 98.9% - Identity Confirmed."