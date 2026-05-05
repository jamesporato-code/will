import { LoginForm } from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0e1117] p-6 text-[#e6edf3]">
      <div className="w-full max-w-sm rounded-xl border border-[#30363d] bg-[#161b22] p-8 shadow-2xl">
        <h1 className="text-xl font-semibold tracking-tight">Will admin</h1>
        <p className="mt-2 text-sm text-[#8b949e]">
          Colle ton token admin pour accéder au backoffice.
        </p>
        <LoginForm nextPath={sp.next || '/admin'} />
      </div>
    </div>
  );
}
