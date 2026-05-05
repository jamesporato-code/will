import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

export const metadata = {
  title: 'Will admin',
  robots: { index: false, follow: false },
};

const navItems: { href: string; label: string }[] = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/modules', label: 'Modules' },
  { href: '/admin/cards', label: 'Cartes outils & prompts' },
  { href: '/admin/trials', label: 'Trials' },
  { href: '/admin/payment-issues', label: 'Payment issues' },
  { href: '/admin/revenue', label: 'Revenue' },
  { href: '/admin/stripe', label: 'Stripe config' },
  { href: '/admin/system', label: 'Système' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0e1117] text-[#e6edf3]">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-56 flex-shrink-0 border-r border-[#21262d] bg-[#0d1117] md:block">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b border-[#21262d] px-5">
              <span className="text-base font-semibold tracking-tight">
                Will <span className="text-[#8b949e]">/ admin</span>
              </span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4 text-sm">
              {navItems.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="block rounded-md px-3 py-2 text-[#c9d1d9] transition-colors hover:bg-[#161b22] hover:text-white"
                >
                  {it.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-[#21262d] p-3">
              <LogoutButton />
            </div>
          </div>
        </aside>
        <main className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  );
}
