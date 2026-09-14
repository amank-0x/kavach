Left Column (The Auth Form)

Remove the OAuth: Since you are building a custom email/password authentication system, remove the "Or continue with" divider and the Google button shown in the image.

Form Structure: Center the form vertically. Use a plain, very dark background (bg-[#0B0F19]) to blend seamlessly with your existing landing page theme.

Input Fields: Use minimal, border-only inputs (bg-transparent border border-slate-700 text-slate-200) to maintain the clean, technical look.

Call to Action: Make the "Sign In" button stand out using your primary brand accent (e.g., a subtle cyan or crimson background depending on your active color palette).

State Toggle: Keep the small text at the bottom ("Don't have an account? Sign up") to toggle between your login and registration states within the same layout.

Right Column (The Visual Showcase)

Swap the Graphic: The astronaut illustration is too playful for a forensic document detection tool. Replace it with a high-fidelity visual related to Kavach-AI.

Visual Ideas: Use the blue glowing 3D FaceNet biometric mesh you approved earlier, or a stylized rendering of a document passing through an X-ray scanner.

Testimonial / Trust Quote: The text at the bottom right ("Welcome Back! The journey continues.") is a great placement for trust signals. Change this to a security-focused metric, such as "Securing border checkpoints with sub-second tamper detection."

Tailwind CSS Layout Structure
To build this, use a CSS Grid on the main wrapper that collapses to a single column on mobile devices.

Main Container: min-h-screen w-full grid grid-cols-1 lg:grid-cols-2

Left Side (Form Wrapper): flex items-center justify-center bg-slate-950 p-8 lg:p-24

Right Side (Image Wrapper): hidden lg:flex items-center justify-center bg-slate-900 relative overflow-hidden (The hidden lg:flex ensures the image disappears on mobile phones, leaving just the login form).