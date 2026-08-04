import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { label: "Platforms", href: "/platforms" },
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Demo", href: "/demo" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-neutral-950/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-white">
      <Link href="/" className="font-black text-xl tracking-tight transition-opacity hover:opacity-80">
        najhum
      </Link>
      
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-xs font-mono text-neutral-400 uppercase tracking-widest transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link 
          href="/contact" 
          className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-white text-neutral-950 rounded hover:bg-neutral-200 transition-colors"
        >
          Book Demo
        </Link>
      </div>
    </header>
  );
}
