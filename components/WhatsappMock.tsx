// Mockup WhatsApp : ombre douce, halo vert subtil derrière, header simplifié.
// Contenu = vraie session Module 1 / Session 2 cadrée Sales.

function Bubble({
  children,
  time,
}: {
  children: React.ReactNode;
  time: string;
}) {
  return (
    <div className="relative max-w-[88%] rounded-[10px] rounded-tl-[2px] bg-white px-3 py-2 text-[13.5px] leading-snug text-[#111B21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]">
      <div className="whitespace-pre-line">{children}</div>
      <div className="mt-1 flex items-center justify-end text-[10.5px] text-[#667781]">
        <span>{time}</span>
      </div>
    </div>
  );
}

export function WhatsappMock() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] select-none">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[48px] bg-whatsapp/15 blur-3xl"
      />
      <div className="overflow-hidden rounded-[28px] bg-[#0B141A] shadow-[0_40px_80px_-30px_rgba(7,94,84,0.45),0_20px_40px_-20px_rgba(17,17,17,0.25)] ring-1 ring-white/10">
        {/* Header */}
        <div className="flex items-center gap-3 bg-[#202C33] px-3 py-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-paper text-ink">
            <span className="display-italic text-base leading-none">W</span>
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-medium leading-tight">Will</p>
            <p className="text-[11.5px] leading-tight text-[#8696A0]">en ligne</p>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-2 px-3 py-4" style={{ background: '#ECE5DC' }}>
          <div className="mx-auto mb-1 inline-flex w-full justify-center">
            <span className="rounded-md bg-[#E1F2FA]/90 px-2 py-0.5 text-[10.5px] text-[#3B4A54]">
              aujourd&apos;hui
            </span>
          </div>

          <div className="flex">
            <Bubble time="9:02">
              <span className="display-italic text-[12.5px] text-accent">
                Module 1 · Session 2/5
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
              cette structure. Demain : pourquoi l&apos;IA hallucine.
            </Bubble>
          </div>
        </div>

        {/* Quick replies */}
        <div className="bg-[#202C33] px-2 py-1.5">
          <div className="grid grid-cols-3 gap-1 text-center text-[12px] text-[#00A884]">
            <button className="truncate rounded px-2 py-2">
              ↪ J&apos;approfondis
            </button>
            <button className="truncate rounded px-2 py-2">
              ↪ Exemple
            </button>
            <button className="truncate rounded px-2 py-2">
              ↪ Mini-défi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
