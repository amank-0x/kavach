import { ArrowUpRight, Code } from "lucide-react";

const resourceLinks = [
    { label: "GitHub Repository (amnkarn)", href: "https://github.com/amnkarn", external: true },
    { label: "Product Overview", href: "#problem", external: false },
    { label: "System Architecture", href: "#technology", external: false },
];

const infrastructure = ["React", "Tailwind CSS", "FastAPI", "PostgreSQL", "OpenCV", "PaddleOCR"];

export default function Footer() {
    return (
        <footer id="about" className="relative overflow-hidden border-t border-red-500/15 bg-[#020509] text-slate-300">
            <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" style={{ backgroundImage: "linear-gradient(rgba(239,68,68,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.06) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
            <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-red-600/15 blur-[120px]" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-12">
                <div>
                    <a href="/" className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-100 transition-colors hover:text-red-300">
                        <img src="/logo.png" alt="Kavach-AI logo" className="h-10 w-10 object-contain brightness-0 invert" />
                        Kavach<span className="text-red-500">-AI</span>
                    </a>
                    <span className="mt-3 inline-block rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 font-mono text-xs text-red-400">Problem Statement: SIH26188</span>
                    <p className="mt-5 text-sm font-medium text-slate-300">Engineered by Team Kavach.</p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">Building dependable document forensics for high-trust decisions.</p>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">Important Links</h2>
                    <nav className="flex flex-col items-start gap-3" aria-label="Footer resources">
                        {resourceLinks.map((link) => (
                            <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined} className="group inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-red-300">
                                {link.external ? <Code className="h-4 w-4 text-slate-600 transition-colors group-hover:text-red-400" aria-hidden="true" /> : <ArrowUpRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-red-400" aria-hidden="true" />}
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                <div>
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-300">Core Infrastructure</h2>
                    <div className="flex flex-wrap gap-2">
                        {infrastructure.map((technology) => (
                            <span key={technology} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-xs text-slate-400">{technology}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-slate-800/80 px-5 py-6 text-xs text-slate-500 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
                <p>© 2026 Team Kavach. Open-source under the MIT License.</p>
                <p>Developed for Smart India Hackathon.</p>
            </div>
        </footer>
    );
}
