// Mockup d'une conversation WhatsApp : style fidèle (entête vert sombre,
// bulles blanches, fond crème) sans logo de marque. Contenu = vraie session
// Module 1 / Session 2 cadrée Sales (extrait du parcours Will v4).

function CheckTicks() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 16 11"
      fill="none"
      className="inline-block text-[#53BDEB]"
      aria-hidden
    >
      <path
        d="M11.071 0.653L4.45 7.276 1.93 4.756 0.93 5.756 4.45 9.276 12.071 1.653z"
        fill="currentColor"
      />
      <path
        d="M15.071 0.653L8.45 7.276 7.474 6.3 6.474 7.3 8.45 9.276 16.071 1.653z"
        fill="currentColor"
      />
    </svg>
  );
}

function Bubble({
  children,
  time,
  className = '',
}: {
  children: React.ReactNode;
  time: string;
  className?: string;
}) {
  return (
    <div
      className={
        'relative max-w-[88%] rounded-[10px] rounded-tl-[2px] bg-white px-3 py-2 text-[13.5px] leading-snug text-[#111B21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ' +
        className
      }
    >
      <div className="whitespace-pre-line">{children}</div>
      <div className="mt-1 flex items-center justify-end gap-1 text-[10.5px] text-[#667781]">
        <span>{time}</span>
      </div>
    </div>
  );
}

export function WhatsappMock() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] select-none">
      {/* Phone-like frame */}
      <div className="overflow-hidden rounded-[28px] border border-ink/10 bg-[#0B141A] shadow-2xl shadow-ink/15">
        {/* Header */}
        <div className="flex items-center gap-3 bg-[#202C33] px-3 py-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-base">
            <span className="display-italic leading-none">W</span>
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium leading-tight">Will</p>
            <p className="text-[11.5px] leading-tight text-[#8696A0]">en ligne</p>
          </div>
          <div className="flex gap-3 text-[#AEBAC1]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.59l2.2-2.2a1 1 0 0 0 .25-1.02A11.36 11.36 0 0 1 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z" />
            </svg>
          </div>
        </div>

        {/* Messages */}
        <div
          className="space-y-2 px-3 py-4"
          style={{
            background:
              'linear-gradient(180deg, #EFE7DD 0%, #ECE5DC 100%)',
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.018) 0 1px, transparent 1.5px), radial-gradient(circle at 80% 60%, rgba(0,0,0,0.018) 0 1px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="mx-auto mb-1 inline-flex w-full justify-center">
            <span className="rounded-md bg-[#E1F2FA]/90 px-2 py-0.5 text-[10.5px] text-[#3B4A54]">
              aujourd&apos;hui
            </span>
          </div>

          <div className="flex">
            <Bubble time="9:02">
              <span className="display-italic text-[12.5px] text-accent">
                Module 1 · Session 2/5 · 28%
              </span>
              {'\n\n'}
              Aujourd&apos;hui : écrire un prompt qui te répond vraiment.
            </Bubble>
          </div>

          <div className="flex">
            <Bubble time="9:02">
              La plupart écrivent à l&apos;IA comme à Google. Un bon prompt donne 3
              choses : un <b>rôle</b>, un <b>contexte</b>, un <b>format de sortie</b>.
            </Bubble>
          </div>

          <div className="flex">
            <Bubble time="9:02">
              <b>Pour ton métier (Sales) :</b>
              {'\n'}
              au lieu de « écris un mail de relance », essaie :
              {'\n\n'}
              <span className="text-[#3B4A54]">
                « Tu es SDR senior B2B SaaS. Mon prospect, CTO scaleup fintech (80
                pers.), n&apos;a pas répondu à 2 mails. Rédige une relance courte
                (60 mots), angle valeur, ton direct. »
              </span>
            </Bubble>
          </div>

          <div className="flex">
            <Bubble time="9:03">
              <b>Mini-défi :</b> reprends ton dernier mail de relance, applique
              cette structure, envoie-moi le résultat. Je te dis ce qui peut être
              tendu.
              {'\n\n'}
              Demain : pourquoi l&apos;IA hallucine — et comment la cadrer.
            </Bubble>
          </div>
        </div>

        {/* Quick reply buttons (style WhatsApp interactive) */}
        <div className="border-t border-[#0F1B22] bg-[#202C33] px-2 py-1.5">
          <div className="grid grid-cols-3 gap-1 text-center text-[12px] text-[#00A884]">
            <button className="truncate rounded px-2 py-2 hover:bg-white/5">
              ↪ J&apos;approfondis
            </button>
            <button className="truncate rounded px-2 py-2 hover:bg-white/5">
              ↪ Exemple concret
            </button>
            <button className="truncate rounded px-2 py-2 hover:bg-white/5">
              ↪ Mini-défi
            </button>
          </div>
        </div>
      </div>

      {/* Floating tag */}
      <div className="absolute -left-3 -top-3 hidden rotate-[-4deg] rounded-full border border-line bg-paper px-3 py-1 text-xs text-muted shadow-sm sm:block">
        Reçu à 9h02
      </div>
      <div className="absolute -right-4 bottom-6 hidden rotate-[3deg] rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-paper shadow-lg shadow-accent/20 sm:block">
        5 min / jour
      </div>
    </div>
  );
}
