import { adminFetch } from '@/lib/admin-api';
import { CardsManager } from './CardsManager';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Cartes — Will admin' };

type ToolCard = {
  id: number;
  slug: string;
  name: string;
  category: string | null;
  description: string | null;
  url: string | null;
  why_it_matters: string | null;
  how_to_use: string | null;
  target_level: string | null;
  target_jobs: string[] | null;
  active: boolean;
  position: number;
};

type PromptCard = {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  use_case: string | null;
  prompt_template: string;
  example_output: string | null;
  target_level: string | null;
  target_jobs: string[] | null;
  active: boolean;
  position: number;
};

export default async function CardsPage() {
  const [tools, prompts] = await Promise.all([
    adminFetch<{ tools: ToolCard[] }>('/api/admin/tool-cards'),
    adminFetch<{ prompts: PromptCard[] }>('/api/admin/prompt-cards'),
  ]);
  if (!tools.ok || !prompts.ok) {
    return (
      <div className="rounded-lg border border-[#da3633] bg-[#2a1213] p-6 text-[#ff7b72]">
        {!tools.ok && `Tool cards: ${tools.error.substring(0, 100)} `}
        {!prompts.ok && `Prompt cards: ${prompts.error.substring(0, 100)}`}
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Cartes outils & prompts
        </h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          {tools.data.tools.length} outils · {prompts.data.prompts.length} prompts.
        </p>
      </header>
      <CardsManager
        initialTools={tools.data.tools}
        initialPrompts={prompts.data.prompts}
      />
    </div>
  );
}

export type { ToolCard, PromptCard };
