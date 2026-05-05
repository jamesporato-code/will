'use client';

export function LogoutButton() {
  async function logout() {
    await fetch('/api/admin-auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  }
  return (
    <button
      onClick={logout}
      className="w-full rounded-md border border-[#30363d] px-3 py-2 text-xs text-[#8b949e] hover:border-[#da3633] hover:text-[#ff7b72]"
    >
      Se déconnecter
    </button>
  );
}
