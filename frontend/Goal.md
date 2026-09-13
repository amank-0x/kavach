# Landing Page
Primary Goal: Convert visitors into users by clearly communicating value and building trust.
Core Actions: Funnel users to the signup page or allow a single "guest" document upload.

Hero Section: A highly visible headline (e.g., "Detect Forged Documents in Seconds") with a clear Call-to-Action (CTA) button leading to the signup flow.

Interactive Demo / Visualizer: A side-by-side visual using Tailwind CSS to cleanly contrast a "real" document against a "fake" one, highlighting how the engine flags manipulated pixels or mismatched fonts.

How it Works: A three-column grid explaining the pipeline: 1. Upload File, 2. Run AI/Metadata Analysis, 3. Review Authenticity Score.

Security Badges: Explicit statements about data handling, confirming that uploaded files are encrypted and automatically deleted from the server (e.g., AWS S3 lifecycle rules) after analysis.


# Auth Pages (Login & Signup)
Primary Goal: Secure user authentication and session management.
Core Actions: Account creation, credential validation, and secure routing.

Authentication Forms: Clean, centered forms for Email/Password entry.

OAuth Integration: "Continue with Google" or "Continue with GitHub" buttons for frictionless onboarding.

State Handling: Loading spinners during token generation and clear error messages for invalid credentials or existing accounts.

Redirection: Immediate routing to the Dashboard upon successful token validation.


# Dashboard & Upload Center
Primary Goal: Serve as the user's operational hub for processing files and tracking history.
Core Actions: File selection, upload progress tracking, and accessing past reports.

Drag-and-Drop Zone: A prominent, dashed-border dropzone accepting specific MIME types (PDFs, JPEGs, PNGs) with clear file size limits.

Real-time Processing State: Since document analysis can take time, a progress bar or WebSocket-driven status indicator (e.g., "Extracting EXIF data..." -> "Running OCR..." -> "Analyzing pixel variance...") keeps the user engaged without refreshing.

Recent Activity Table: A data table summarizing recent uploads with columns for Date, Filename, and a color-coded Status badge (e.g., Green for Authentic, Red for Forged).

Usage Stats: A small widget tracking remaining API credits or scans for the month.


# Results Page (Private View)
Primary Goal: Deliver the comprehensive technical breakdown of a scanned document to the account owner.
Core Actions: Review detailed findings, analyze metadata, and generate shareable assets.

Authenticity Verdict: A massive, instantly readable score (e.g., "94% Confidence: Authentic" or "Flagged: Digital Manipulation Detected").

Document Viewer: An interactive canvas or image viewer overlaying bounding boxes on suspicious areas (e.g., a signature that was copy-pasted, or text where the font rendering changes).

Metadata (EXIF) Inspector: A raw data list revealing hidden file history, such as the original creation date, software used to last save it (like Photoshop), and camera/scanner details.

Action Bar: Buttons to delete the scan from the database, view the raw JSON output, or generate a public link.


# Public / Shared Report Page
Primary Goal: Provide verifiable, read-only proof of a document's authenticity to third parties (employers, banks, universities) without requiring them to log in.
Core Actions: View the final verdict and download a hard copy.

Dynamic Routing: Accessed via a unique, unguessable URL slug (e.g., /report/shared/[id]), ensuring only people with the exact link can view it.

Stripped-Down Interface: Removes all navigation bars, sidebars, and account settings. The focus is purely on the document verdict and the timestamp of when the analysis was performed.

Verification Badge: A cryptographic hash or unique scan ID displayed prominently to prove the report itself hasn't been tampered with.

Custom PDF Export: A dedicated button triggering a server-side generation of the report into a cleanly formatted PDF, ensuring offline records maintain your application's branding and layout.