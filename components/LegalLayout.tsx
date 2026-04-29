import { ReactNode } from 'react';
import { Container } from './Container';
import { Nav } from './Nav';
import { Footer } from './Footer';

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-prose2">
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Mentions</p>
            <h1 className="mt-4 text-4xl tracking-tighter2 sm:text-5xl">{title}</h1>
            <p className="mt-3 text-sm text-muted">Dernière mise à jour : {updated}</p>

            <div className="prose-will mt-12 space-y-8 text-ink [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:tracking-tightish [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:tracking-tightish [&_p]:text-muted [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted [&_li]:my-1 [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">
              {children}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
