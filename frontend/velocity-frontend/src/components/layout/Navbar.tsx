"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, ChevronDown, CircleHelp, LogOut, ShieldCheck, User } from "lucide-react";
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "@/components/auth/AuthProvider";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { navigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const Logo = () => (
  <Link href="/" aria-label="Velocity - Startseite" className="shrink-0">
    <Image src="/images/velocity_logo.png" alt="Velocity" width={120} height={40} priority className="h-18 w-auto" />
  </Link>
);

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(() => navigation.filter((item) => item.href !== "/admin" || isAdmin), [isAdmin]);
  const displayName = user?.firstName || user?.email.split("@")[0] || "Konto";

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300", isOpen || scrolled ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-background/50 backdrop-blur-sm")}>
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Logo />
          <ul className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">{item.label}</Link>
              </li>
            ))}
            {user ? (
              <li className="relative">
                <button type="button" onClick={() => setMenuOpen((open) => !open)} className="flex items-center gap-2 border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground transition hover:border-primary/60">
                  <User className="size-4" />{displayName}<ChevronDown className="size-4" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-72 border border-border bg-surface shadow-2xl">
                    <div className="border-b border-border p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">Buchungsprofil</p>
                      <p className="mt-1 font-semibold">{displayName}</p>
                    </div>
                    <div className="grid p-2">
                      <MenuLink href="/konto" icon={<BookOpenCheck className="size-5" />}>Buchungen</MenuLink>
                      <MenuLink href="/konto" icon={<User className="size-5" />}>Persönliche Daten</MenuLink>
                      {isAdmin && <MenuLink href="/admin" icon={<ShieldCheck className="size-5" />}>Adminpanel</MenuLink>}
                    </div>
                    <div className="grid border-t border-border p-2">
                      <MenuLink href="/kontakt" icon={<CircleHelp className="size-5" />}>Hilfe</MenuLink>
                      <button type="button" onClick={handleLogout} className="flex items-center gap-4 px-3 py-3 text-left text-sm text-muted transition hover:bg-background hover:text-foreground"><LogOut className="size-5" />Abmelden</button>
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li><Link href="/login" className="flex items-center gap-2 border border-border bg-surface px-4 py-2 text-sm font-semibold transition hover:border-primary/60"><User className="size-4" />Anmelden</Link></li>
            )}
            <Button href="/#buchen" icon={<ArrowRight className="size-4" />} className="hidden px-5 py-2.5 text-sm md:inline-flex">Jetzt buchen</Button>
          </ul>
          <div className="-mr-2 md:hidden">
            <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} color="#fff" rounded label="Menü öffnen" />
          </div>
        </div>
      </Container>
      <AnimatePresence>
        {isOpen && (
          <motion.nav initial={{ height: 0, opacity: 1 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }} className="absolute inset-x-0 top-full overflow-hidden border-b border-border bg-background md:hidden">
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="py-2 text-sm text-foreground/80 transition-colors hover:text-primary">{item.label}</Link>)}
              <Link href={user ? "/konto" : "/login"} onClick={() => setIsOpen(false)} className="py-2 text-sm text-foreground/80 transition-colors hover:text-primary">{user ? "Mein Konto" : "Anmelden"}</Link>
              <Button href="/#buchen" icon={<ArrowRight className="size-4" />} className="mt-3 w-full py-2.5 text-sm" onClick={() => setIsOpen(false)}>Jetzt buchen</Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <Link href={href} className="flex items-center gap-4 px-3 py-3 text-sm text-foreground transition hover:bg-background">{icon}{children}</Link>;
}
