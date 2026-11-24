import React, { useEffect, useRef, useState } from 'react';

interface SlideInfo {
  id: string;
  code: string;
  topLabel: string;
  navTitle: string;
  theme: 'dark' | 'light';
}

interface TimelineNode {
  date: string;
  label: string;
  sublabel: string;
  status: 'absent' | 'no-class' | 'present' | 'ava' | 'future';
  detail: string;
  targetSlideId: string;
}

interface AvaQuestion {
  num: string;
  axis: string;
  axisDesc: string;
  featured?: boolean;
  question: string;
  answer: string;
}

interface ParodyStanza {
  id: string;
  axis: 'geral' | 'vida-academica' | 'argumentacao' | 'autoria' | 'oralidade';
  tag: string;
  isChorus?: boolean;
  lines: string[];
}

interface UploadedItem {
  url: string;
  type: 'image' | 'video';
  name: string;
}

const STORAGE_KEY = 'bruno_rpv_media_v2';

const DEFAULT_MEDIA: Record<string, UploadedItem> = {
  'bruno-familia': {
    url: '/media/foto_família-12.08.jpg',
    type: 'image',
    name: 'foto_família-12.08',
  },
  'bruno-etica-0909': {
    url: '/media/aula-09.09.jpg',
    type: 'image',
    name: 'aula-09.09',
  },
  'bruno-ava-2309': {
    url: '/media/atividade_AVA-23.09.jpg',
    type: 'image',
    name: 'atividade_AVA-23.09',
  },
  'bruno-equipe-2110': {
    url: '/media/aula-21.10.jpg',
    type: 'image',
    name: 'aula-21.10',
  },
  'bruno-parodia-0411': {
    url: '/media/aula-04.11.jpg',
    type: 'image',
    name: 'aula-04.11',
  },
};

const BRUNO_PROFILE = {
  name: 'BRUNO REIS MENDES',
  course: 'Engenharia de Software',
  institution: 'UNICATÓLICA • 2026.2',
  professor: 'Prof. Antônio Cesar',
};

const RPV_SLIDES: SlideInfo[] = [
  { id: 'rpv-01', code: 'RPV.LOG / 01', topLabel: 'PORTFÓLIO ACADÊMICO', navTitle: '01 · Capa', theme: 'dark' },
  { id: 'rpv-02', code: 'RPV.LOG / 02', topLabel: 'PONTO DE PARTIDA', navTitle: '02 · Eixos', theme: 'light' },
  { id: 'rpv-03', code: 'RPV.LOG / 03', topLabel: 'PERCURSO / 2026', navTitle: '03 · Cronograma', theme: 'dark' },
  { id: 'rpv-04', code: 'RPV.LOG / 04', topLabel: 'ENCONTROS 01 + 02', navTitle: '04 · Identidade & Escolhas', theme: 'light' },
  { id: 'rpv-05', code: 'RPV.LOG / 05', topLabel: 'ENCONTRO 03 • 09.09', navTitle: '05 · Ética ≠ Moral', theme: 'dark' },
  { id: 'rpv-06', code: 'RPV.LOG / 06', topLabel: 'ÉTICA NO CÓDIGO', navTitle: '06 · Alerta Crítico', theme: 'dark' },
  { id: 'rpv-07', code: 'RPV.LOG / 07', topLabel: 'ATIVIDADE AVA • 23.09', navTitle: '07 · AVA & Inclusão', theme: 'light' },
  { id: 'rpv-08', code: 'RPV.LOG / 08', topLabel: 'ENCONTRO 04 • 21.10', navTitle: '08 · Equipes & Paródia', theme: 'dark' },
  { id: 'rpv-09', code: 'RPV.LOG / 09', topLabel: 'ENCONTRO 05 & 06 • 04.11 / 18.11', navTitle: '09 · Apresentação & Critérios', theme: 'light' },
  { id: 'rpv-10', code: 'RPV.LOG / 10', topLabel: 'APÊNDICE A • PARÓDIA & SÍNTESE', navTitle: '10 · Letra Integral', theme: 'dark' },
];

const FOUR_AXES = [
  {
    num: '01',
    title: 'Projeto de vida',
    subtitle: 'identidade profissional',
    description: 'Reconhecer minha trajetória pessoal e o profissional que desejo construir na Engenharia de Software.',
    amber: false,
  },
  {
    num: '02',
    title: 'Valores',
    subtitle: 'respeito e ética',
    description: 'Orientar escolhas cotidianas pelo respeito, pela empatia e pela responsabilidade diante do outro.',
    amber: true,
  },
  {
    num: '03',
    title: 'Competências',
    subtitle: 'conhecimento e atitude',
    description: 'Mobilizar conhecimentos, habilidades e atitudes diante de situações concretas e colaborativas.',
    amber: false,
  },
  {
    num: '04',
    title: 'Habilidades',
    subtitle: 'leitura, escrita e oratória',
    description: 'Exercitar a leitura crítica, a criação autoral, a escrita reflexiva e a expressão oral em público.',
    amber: true,
  },
];

const OFFICIAL_TIMELINE: TimelineNode[] = [
  {
    date: '12.08',
    label: 'PARTIDA',
    sublabel: 'Não Compareci!',
    status: 'absent',
    detail: '12/08/2026 — Não Compareci! (Ausência justificada: ainda estudava em outra instituição).',
    targetSlideId: 'rpv-04',
  },
  {
    date: '26.08',
    label: 'TRANSIÇÃO',
    sublabel: 'Não Compareci!',
    status: 'absent',
    detail: '26/08/2026 — Não Compareci! (Ausência justificada durante o processo de transferência institucional).',
    targetSlideId: 'rpv-04',
  },
  {
    date: '09.09',
    label: 'IMERSÃO',
    sublabel: 'ética + escuta',
    status: 'present',
    detail: '09/09/2026 — Encontro 03: Gincana da Ética e Moral em duplas e nuvem de palavras coletiva.',
    targetSlideId: 'rpv-05',
  },
  {
    date: '23.09',
    label: 'REFLEXÃO',
    sublabel: 'AVA + impacto',
    status: 'ava',
    detail: '23/09/2026 — Atividade de Leitura e Reflexão no AVA sobre ética, falhas de software e acessibilidade.',
    targetSlideId: 'rpv-07',
  },
  {
    date: '07.10',
    label: 'PAUSA',
    sublabel: 'Não tivemos aula.',
    status: 'no-class',
    detail: '07/10/2026 — Não tivemos aula. (Reunião institucional do Prof. Antônio Cesar com alunos do PIBIC).',
    targetSlideId: 'rpv-03',
  },
  {
    date: '21.10',
    label: 'CRIAÇÃO',
    sublabel: 'squad + paródia',
    status: 'present',
    detail: '21/10/2026 — Encontro 04: Formação de equipes por perfil (Ler, Criar, Falar) e composição da paródia.',
    targetSlideId: 'rpv-08',
  },
  {
    date: '04.11',
    label: 'PRÁTICA',
    sublabel: 'paródia em cena',
    status: 'present',
    detail: '04/11/2026 — Encontro 05: Apresentação musical em sala ("Ela é amiga da minha mulher") e avaliação das juradas.',
    targetSlideId: 'rpv-09',
  },
  {
    date: '18.11',
    label: 'CRITÉRIOS',
    sublabel: 'revisão avaliativa',
    status: 'present',
    detail: '18/11/2026 — Encontro 06: Explicação dos critérios oficiais de avaliação do portfólio e liberação para revisão.',
    targetSlideId: 'rpv-09',
  },
  {
    date: '02.12',
    label: 'FECHAMENTO',
    sublabel: 'previsão final',
    status: 'future',
    detail: '02/12/2026 — Data prevista no cronograma oficial para encerramento da disciplina.',
    targetSlideId: 'rpv-10',
  },
];

const ETHICS_MORAL_DATA = {
  moralPairs: [
    { q: 'O que você fez de imoral?', a: 'Menti.' },
    { q: 'O que já pensou em fazer de imoral?', a: 'Furtar.' },
    { q: 'O que deixou de fazer por considerar imoral?', a: 'Brigar.' },
  ],
  ethicsPairs: [
    { q: 'O que você fez de antiético?', a: 'Ganhei em cima de outra pessoa.' },
    { q: 'O que já pensou em fazer de antiético?', a: 'Espalhar Fake News.' },
    { q: 'O que deixou de fazer por considerar antiético?', a: 'Envolvimento com tráfego / práticas ilícitas.' },
  ],
  wordCloudNote:
    'Ao término da dinâmica em duplas, acessamos uma plataforma digital para registrar uma palavra sobre o significado de ser moral, formando uma nuvem coletiva que sintetizou a percepção da turma.',
};

const AVA_QUESTIONS_DATA: AvaQuestion[] = [
  {
    num: '01',
    axis: 'ESTUDO',
    axisDesc: 'Formação acadêmica com propósito.',
    question: 'Por que estudar com dedicação importa, e qual o risco de apenas "empurrar com a barriga"?',
    answer:
      'Ler os materiais do AVA e estudar com regularidade não serve apenas para conquistar aprovação. É o caminho para construir critérios técnicos, reconhecer limites e fundamentar decisões. Como o software interfere diretamente na vida das pessoas, lacunas de formação transformam-se em riscos reais. Um diploma isolado não garante competência nem ética; por isso, busco compreender a fundo o que construo.',
  },
  {
    num: '02',
    axis: 'ACESSO',
    axisDesc: 'Acessibilidade desde o projeto.',
    question: 'Como a disciplina e as ferramentas de ensino me aproximam do profissional que desejo ser?',
    answer:
      'Utilizo o AVA como base para organizar leituras, retomar conceitos e complementar meus estudos em plataformas externas de programação. A excelência na Engenharia de Software depende de disciplina diária, abertura ao feedback e compromisso em transformar teoria em soluções acessíveis e confiáveis.',
  },
  {
    num: '03',
    axis: 'INCLUSÃO',
    axisDesc: 'Tecnologia para mais pessoas.',
    featured: true,
    question: 'Por que incluir pessoas com deficiência e com menor familiaridade tecnológica desde o início?',
    answer:
      'A empatia orienta essa resposta. Aplicativos de serviços essenciais funcionam como porta de acesso a direitos; quando ignoram parte da população, ampliam barreiras sociais em vez de removê-las. Acessibilidade não é um ajuste opcional posterior: deve estar nos requisitos, na interface e nos testes desde o início do projeto.',
  },
  {
    num: '04',
    axis: 'PREVENÇÃO',
    axisDesc: 'Falhas críticas atingem vidas.',
    question: 'Até que ponto a falta de atenção ou preparo ao programar deixa de ser um simples erro?',
    answer:
      'Uma falha em sistemas com dados pessoais expõe usuários a prejuízos financeiros e constrangimentos. A responsabilidade ética é violada quando negligenciamos testes previsíveis, ocultamos vulnerabilidades conhecidas ou deixamos de agir para mitigar danos. Prevenir riscos e comunicar problemas com transparência são deveres fundamentais.',
  },
];

const PARODY_LYRICS: ParodyStanza[] = [
  {
    id: 'intro',
    axis: 'geral',
    tag: 'INTRODUÇÃO',
    lines: [
      'Na faculdade é assim,',
      'Pois é, pois é!',
      'Tem quatro temas pra aprender,',
      'Enfim, enfim!',
      'Vida acadêmica e argumentação,',
      'Autoria e inovação,',
      'Leitura, escrita e oralidade,',
      'Tudo isso é formação!',
    ],
  },
  {
    id: 'parte-1',
    axis: 'vida-academica',
    tag: 'PARTE 1 — VIDA ACADÊMICA',
    lines: [
      'Na faculdade é pressão,',
      'Pois é, pois é!',
      'Tem código pra resolver,',
      'Enfim, enfim!',
      'Se fosse só leitura tava tudo certo,',
      'Mas tem código pra decifrar!',
      'Se fosse só teoria tava tudo certo,',
      'Mas tem bug que não quer funcionar!',
      'Tem que ler, tem que escrever,',
      'Tem que testar pra não quebrar!',
      'Se o código dá erro na tela,',
      'Meu amigo, é melhor revisar!',
      'Se deixar pra programar,',
      'Aí complicou, complicou!',
      'Tem trabalho e tem projeto,',
      'E o prazo já chegou!',
    ],
  },
  {
    id: 'refrao-1',
    axis: 'geral',
    tag: 'REFRÃO',
    isChorus: true,
    lines: [
      'Lê, lê, pra aprender,',
      'Argumenta pra convencer!',
      'Cria, inova, dá opinião,',
      'E apresenta sua conclusão!',
      'Vida acadêmica é dedicação,',
      'Percepção e argumentação!',
      'Autoria, leitura e inovação,',
      'Escrita e oralidade na formação!',
    ],
  },
  {
    id: 'parte-2',
    axis: 'argumentacao',
    tag: 'PARTE 2 — PERCEPÇÃO E ARGUMENTAÇÃO',
    lines: [
      'Tem que saber observar,',
      'E as ideias questionar,',
      'Se tiver um bom argumento,',
      'Sua opinião apresentar!',
      'Não adianta só falar,',
      'Tem que saber explicar,',
      'Perceber e propor ideias,',
      'E saber argumentar!',
      'Se fosse só dar opinião tava tudo certo,',
      'Mas tem que saber justificar!',
      'Se fosse só falar qualquer coisa tava tudo certo,',
      'Tem que ter argumento pra convencer!',
    ],
  },
  {
    id: 'parte-3',
    axis: 'autoria',
    tag: 'PARTE 3 — AUTORIA E INOVAÇÃO',
    lines: [
      'Se fosse só copiar tava tudo certo,',
      'Mas tem que criar e imaginar!',
      'Se fosse só seguir o modelo tava tudo certo,',
      'Mas tem que ter ideia pra inovar!',
      'Tem que criar, tem que inventar,',
      'Uma ideia original apresentar!',
      'Autoria e inovação,',
      'É usar a criatividade na criação!',
    ],
  },
  {
    id: 'parte-4',
    axis: 'oralidade',
    tag: 'PARTE 4 — LEITURA, ESCRITA E ORALIDADE',
    lines: [
      'Se fosse só ler tava tudo certo,',
      'Mas tem texto pra interpretar!',
      'Se fosse só escrever tava tudo certo,',
      'Mas tem apresentação pra encarar!',
      'Tem que ler, tem que escrever,',
      'E na hora de falar, não pode se esconder!',
      'Leitura e oralidade,',
      'Escrita com dedicação!',
      'Se o texto é complicado,',
      'Tem que ter interpretação!',
      'Pra falar na frente da turma,',
      'Tem que ter comunicação!',
    ],
  },
  {
    id: 'final',
    axis: 'geral',
    tag: 'FINAL — TODOS JUNTOS',
    lines: [
      'É código, é criação,',
      'É leitura e expressão!',
      'Tem que ter criatividade,',
      'E também argumentação!',
      'Observa, propõe,',
      'Tem que saber escrever!',
      'Com ideias inovadoras,',
      'A gente vai crescer!',
      'Lê, lê, tem que estudar!',
      'Escreve, escreve, pra apresentar!',
      'Argumenta e inova também,',
      'Quatro temas que fazem a gente ir além!',
      'É faculdade, é faculdade!',
      'Tem desafio e dedicação!',
      'Entre códigos e trabalhos,',
      'A gente busca formação!',
    ],
  },
  {
    id: 'refrao-final',
    axis: 'geral',
    tag: 'REFRÃO FINAL — REPETIR COM TODOS',
    isChorus: true,
    lines: [
      'Lê, lê, pra aprender,',
      'Argumenta pra convencer!',
      'Cria, inova, dá opinião,',
      'E apresenta sua conclusão!',
      'É faculdade, é faculdade!',
      'É esforço e dedicação!',
      'Quatro temas na cabeça,',
      'Pra garantir nossa formação!',
    ],
  },
];

function StarburstIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={className}>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

function SlideShell({
  id,
  code,
  topLabel,
  pageIndex,
  totalPages,
  theme,
  isSlideMode,
  children,
}: {
  id: string;
  code: string;
  topLabel: string;
  pageIndex: number;
  totalPages: number;
  theme: 'dark' | 'light';
  isSlideMode: boolean;
  children: React.ReactNode;
}) {
  const isDark = theme === 'dark';
  return (
    <section
      id={id}
      className={`${isDark ? 'bg-grid-dark' : 'bg-grid-light'} ${
        isSlideMode ? 'min-h-[calc(100vh-3.5rem)]' : 'min-h-screen'
      } px-5 sm:px-10 lg:px-16 py-8 sm:py-10 flex flex-col justify-between border-b ${
        isDark ? 'border-white/15' : 'border-black/15'
      } relative overflow-hidden`}
    >
      <div className="max-w-[1340px] w-full mx-auto">
        <div
          className={`flex items-center justify-between pb-3 border-b ${
            isDark ? 'border-white/40' : 'border-black/50'
          } font-mono-tech text-[11px] font-bold tracking-[0.14em] uppercase`}
        >
          <span>{topLabel}</span>
          <span>{code}</span>
        </div>
      </div>

      <div className="max-w-[1340px] w-full mx-auto my-auto py-8">{children}</div>

      <div className="max-w-[1340px] w-full mx-auto">
        <div className="flex items-center justify-between pt-3 font-mono-tech text-[11px] font-bold tracking-[0.14em] uppercase opacity-75">
          <span>{BRUNO_PROFILE.name}</span>
          <span>
            {String(pageIndex + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}

function RetroWindow({
  title,
  theme = 'dark',
  className = '',
  children,
}: {
  title: string;
  theme?: 'dark' | 'light';
  className?: string;
  children: React.ReactNode;
}) {
  const isDark = theme === 'dark';
  return (
    <div className={`${isDark ? 'rpv-window-dark text-white' : 'rpv-window-light text-[#111111]'} ${className}`}>
      <div
        className={`flex items-center justify-between px-3.5 py-2 border-b-2 ${
          isDark ? 'border-white' : 'border-[#111111]'
        } font-mono-tech text-xs font-bold`}
      >
        <span>{title}</span>
        <span
          className={`w-5 h-5 flex items-center justify-center border ${
            isDark ? 'border-white' : 'border-[#111111]'
          } text-[11px] leading-none`}
        >
          ×
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function buildExtensionCandidates(url: string): string[] {
  if (!url.startsWith('/media/')) return [url];
  const base = url.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const list = [
    encodeURI(`${base}.jpg`),
    encodeURI(`${base}.jpeg`),
    encodeURI(`${base}.png`),
    encodeURI(`${base}.webp`),
  ];
  if (base.includes('família')) {
    const asciiBase = base.replace('família', 'familia');
    list.push(`${asciiBase}.jpg`, `${asciiBase}.jpeg`, `${asciiBase}.png`);
  }
  return list;
}

function PolaroidSlot({
  slotId,
  caption,
  media,
  onUpload,
  onRemove,
  onZoom,
}: {
  slotId: string;
  caption: string;
  media?: UploadedItem;
  onUpload: (slotId: string, file: File) => void;
  onRemove: (slotId: string) => void;
  onZoom: (item: UploadedItem, caption: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [candidateIdx, setCandidateIdx] = useState(0);

  useEffect(() => {
    setCandidateIdx(0);
  }, [media?.url]);

  const candidates = media ? buildExtensionCandidates(media.url) : [];
  const activeUrl = candidates[candidateIdx] || media?.url || '';

  return (
    <div className="polaroid-frame w-full max-w-[310px]">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUpload(slotId, f);
          e.target.value = '';
        }}
      />

      {media ? (
        <div className="relative group aspect-[4/3] bg-black overflow-hidden border border-[#111111]">
          {media.type === 'video' ? (
            <video src={activeUrl} controls className="w-full h-full object-cover" />
          ) : (
            <img
              src={activeUrl}
              alt={caption}
              onError={() => {
                if (candidateIdx < candidates.length - 1) {
                  setCandidateIdx((i) => i + 1);
                }
              }}
              onClick={() => onZoom({ ...media, url: activeUrl }, caption)}
              className="w-full h-full object-cover cursor-zoom-in"
            />
          )}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={() => onZoom({ ...media, url: activeUrl }, caption)}
              className="px-2 py-1 bg-[#111111] text-[#e5a91b] border border-white font-mono-tech text-[10px] font-bold cursor-pointer"
              title="Ampliar"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => onRemove(slotId)}
              className="px-2 py-1 bg-[#111111] text-red-400 border border-white font-mono-tech text-[10px] font-bold cursor-pointer"
              title="Remover"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="striped-placeholder w-full aspect-[4/3] flex flex-col items-center justify-center text-center p-4 cursor-pointer group"
        >
          <StarburstIcon className="w-6 h-6 text-[#e5a91b] mb-2 group-hover:rotate-45 transition-transform" />
          <span className="font-display text-xs tracking-wider text-white uppercase">ADICIONAR FOTO</span>
          <span className="mt-1 text-[11px] text-[#c8c5bd]">registro da aula</span>
        </button>
      )}

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <p className="font-mono-tech text-[10px] font-bold text-[#111111] truncate">{caption}</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-[10px] font-mono-tech font-bold underline text-[#111111] shrink-0 cursor-pointer"
        >
          {media ? 'Trocar' : '+ Anexar'}
        </button>
      </div>
    </div>
  );
}

export function App() {
  const [isSlideMode, setIsSlideMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTimelineIdx, setSelectedTimelineIdx] = useState<number>(2);
  const [selectedAvaIdx, setSelectedAvaIdx] = useState<number>(2);
  const [parodyFilter, setParodyFilter] = useState<string>('all');
  const [mediaMap, setMediaMap] = useState<Record<string, UploadedItem>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      return { ...DEFAULT_MEDIA, ...parsed };
    } catch {
      return DEFAULT_MEDIA;
    }
  });
  const [lightbox, setLightbox] = useState<{ item: UploadedItem; caption: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mediaMap));
    } catch {
      // ignora limite do localStorage
    }
  }, [mediaMap]);

  const handleUpload = (slotId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setMediaMap((prev) => ({
          ...prev,
          [slotId]: {
            url: reader.result as string,
            type: file.type.startsWith('video/') ? 'video' : 'image',
            name: file.name,
          },
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (slotId: string) => {
    setMediaMap((prev) => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
  };

  const goToSlide = (idx: number) => {
    const clamped = Math.max(0, Math.min(RPV_SLIDES.length - 1, idx));
    setCurrentSlide(clamped);
    if (!isSlideMode) {
      const el = document.getElementById(RPV_SLIDES[clamped].id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const visibleSlides = isSlideMode ? [RPV_SLIDES[currentSlide]] : RPV_SLIDES;

  const filteredLyrics =
    parodyFilter === 'all' ? PARODY_LYRICS : PARODY_LYRICS.filter((s) => s.axis === parodyFilter);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <header className="sticky top-0 z-40 h-14 bg-[#111111]/95 backdrop-blur border-b border-white/20 px-4 sm:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 overflow-x-auto">
          <span className="font-mono-tech text-xs font-bold text-[#e5a91b] shrink-0">RPV.LOG</span>
          <div className="hidden md:flex items-center gap-1">
            {RPV_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`px-2 py-1 font-mono-tech text-[10px] font-bold transition-colors cursor-pointer ${
                  isSlideMode && currentSlide === idx
                    ? 'bg-[#e5a91b] text-[#111111]'
                    : 'text-[#c8c5bd] hover:text-white'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsSlideMode((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#e5a91b] text-[#111111] font-mono-tech text-[11px] font-bold uppercase tracking-wider cursor-pointer hover:brightness-105"
        >
          {isSlideMode ? 'Leitura Contínua' : 'Modo Slides'}
        </button>
      </header>

      <main>
        {visibleSlides.map((slide) => {
          const slideIndex = RPV_SLIDES.findIndex((s) => s.id === slide.id);

          if (slide.id === 'rpv-01') {
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="dark"
                isSlideMode={isSlideMode}
              >
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 sm:left-12 top-24 sm:top-28 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#e5a91b] opacity-95"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-0 sm:left-6 top-20 sm:top-20 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#e5a91b]/35"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-4 sm:left-2 top-16 sm:top-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#e5a91b]/20"
                  />

                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div>
                      <div className="inline-flex items-center gap-2 font-mono-tech text-xs font-bold tracking-[0.14em] uppercase text-white mb-4">
                        <StarburstIcon className="w-4 h-4 text-[#e5a91b]" />
                        <span>{BRUNO_PROFILE.institution}</span>
                      </div>

                      <p className="font-display text-lg sm:text-2xl uppercase tracking-tight text-white mb-2">
                        PORTFÓLIO ACADÊMICO:
                      </p>

                      <h1 className="font-display text-5xl sm:text-7xl lg:text-[92px] uppercase tracking-tight">
                        <span className="block text-white">RELAÇÕES</span>
                        <span className="block text-white">PRINCÍPIOS</span>
                        <span className="block">
                          <span className="text-[#e5a91b] drop-shadow-[2px_2px_0px_#111111]">&amp; </span>
                          <span className="text-[#e5a91b]">VALORES</span>
                        </span>
                      </h1>

                      <div className="mt-4 sm:ml-64">
                        <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] -rotate-2">
                          vivências, autoconhecimento e responsabilidade
                        </p>
                        <p className="font-script text-xl sm:text-2xl text-[#e5a91b] ml-10 -rotate-1">
                          Engenharia de Software
                        </p>
                      </div>
                    </div>

                    <div className="lg:mt-14 shrink-0">
                      <RetroWindow title="student.profile" theme="dark" className="w-full sm:w-[300px]">
                        <p className="font-mono-tech text-sm font-bold text-[#e5a91b] uppercase">
                          {BRUNO_PROFILE.name}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white">{BRUNO_PROFILE.course}</p>
                        <p className="text-xs text-[#c8c5bd] mt-0.5">{BRUNO_PROFILE.professor}</p>
                      </RetroWindow>
                    </div>
                  </div>

                  <div className="relative z-10 mt-10 flex justify-end">
                    <pre className="font-mono-tech text-xs sm:text-sm text-[#c8c5bd] leading-relaxed">
{`if (escolha) {
  assuma(consequências);
}`}
                    </pre>
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-02') {
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="light"
                isSlideMode={isSlideMode}
              >
                <div className="space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                    <div className="lg:col-span-7">
                      <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] font-bold mb-1">
                        não é só registrar.
                      </p>
                      <h2 className="font-display text-4xl sm:text-6xl lg:text-[68px] uppercase text-[#111111]">
                        É PERCEBER O QUE MUDA.
                      </h2>
                    </div>
                    <div className="lg:col-span-5 lg:pb-3">
                      <p className="text-sm sm:text-base font-medium text-[#111111]/85 leading-relaxed max-w-md">
                        A disciplina conectou formação humana à responsabilidade técnica e social do software,
                        articulando sala de aula e Ambiente Virtual de Aprendizagem (AVA).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {FOUR_AXES.map((axis) => (
                      <div
                        key={axis.num}
                        className={`${
                          axis.amber ? 'rpv-card-amber' : 'rpv-card-light'
                        } p-6 flex flex-col justify-between min-h-[210px]`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono-tech text-xs font-bold">{axis.num}</span>
                          <StarburstIcon className="w-5 h-5" />
                        </div>

                        <div className="mt-8">
                          <h3 className="font-display text-2xl text-[#111111]">{axis.title}</h3>
                          <p className="mt-1 font-mono-tech text-xs font-bold text-[#111111]/80">{axis.subtitle}</p>
                          <p className="mt-3 text-xs leading-relaxed text-[#111111]/90">{axis.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-03') {
            const activeNode = OFFICIAL_TIMELINE[selectedTimelineIdx];
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="dark"
                isSlideMode={isSlideMode}
              >
                <div className="space-y-10">
                  <div>
                    <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] mb-1">
                      do ponto de partida à voz coletiva
                    </p>
                    <h2 className="font-display text-4xl sm:text-6xl lg:text-[66px] uppercase text-white">
                      UMA TRAJETÓRIA
                      <br />
                      <span className="text-[#e5a91b]">EM MOVIMENTO.</span>
                    </h2>
                  </div>

                  <div className="relative pt-4">
                    <div
                      aria-hidden="true"
                      className="hidden lg:block absolute left-0 right-0 top-[54px] border-t-2 border-dashed border-[#e5a91b]/70"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4 relative z-10">
                      {OFFICIAL_TIMELINE.map((node, idx) => {
                        const isSelected = idx === selectedTimelineIdx;
                        return (
                          <button
                            key={node.date}
                            type="button"
                            onClick={() => setSelectedTimelineIdx(idx)}
                            className={`text-left p-2.5 transition-all cursor-pointer border ${
                              isSelected ? 'bg-white/10 border-[#e5a91b]' : 'border-transparent hover:border-white/25'
                            }`}
                          >
                            <span
                              className={`inline-block px-2 py-0.5 font-mono-tech text-xs font-bold ${
                                node.status === 'no-class' || node.status === 'absent'
                                  ? 'bg-[#c8c5bd] text-[#111111]'
                                  : 'bg-[#e5a91b] text-[#111111]'
                              }`}
                            >
                              {node.date}
                            </span>

                            <div className="my-3">
                              <StarburstIcon className="w-5 h-5 text-[#e5a91b]" />
                            </div>

                            <p className="font-display text-xs sm:text-sm uppercase text-white">{node.label}</p>
                            <p className="mt-1 text-[11px] text-[#c8c5bd] leading-snug">{node.sublabel}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pt-2">
                    <div className="lg:col-span-7 bg-white/5 border border-white/20 p-5">
                      <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-[#e5a91b]">
                        REGISTRO CRONOLÓGICO SELECIONADO
                      </span>
                      <p className="mt-2 text-sm sm:text-base text-white leading-relaxed">{activeNode.detail}</p>
                      <button
                        type="button"
                        onClick={() => {
                          const targetIdx = RPV_SLIDES.findIndex((s) => s.id === activeNode.targetSlideId);
                          if (targetIdx >= 0) goToSlide(targetIdx);
                        }}
                        className="mt-3 font-mono-tech text-xs font-bold text-[#e5a91b] underline cursor-pointer"
                      >
                        Ir para a lâmina correspondente →
                      </button>
                    </div>

                    <div className="lg:col-span-5">
                      <RetroWindow title="context.note" theme="dark">
                        <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
                          Ausências justificadas nas datas iniciais (<strong>12/08</strong> e <strong>26/08</strong> —{' '}
                          <em>Não Compareci!</em>) pois estudava em outra instituição antes da transferência. No dia{' '}
                          <strong>07/10</strong>, <em>Não tivemos aula.</em> devido à reunião institucional do PIBIC.
                        </p>
                      </RetroWindow>
                    </div>
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-04') {
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="light"
                isSlideMode={isSlideMode}
              >
                <div className="space-y-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div>
                      <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] font-bold mb-1">
                        de onde venho define como escolho.
                      </p>
                      <h2 className="font-display text-4xl sm:text-6xl lg:text-[68px] uppercase text-[#111111]">
                        IDENTIDADE
                        <br />
                        <span className="text-[#e5a91b]">&amp; ESCOLHAS.</span>
                      </h2>
                    </div>

                    <RetroWindow title="choice.log" theme="light" className="w-full lg:w-[340px]">
                      <p className="font-display text-sm uppercase text-[#e5a91b]">UNICATÓLICA</p>
                      <p className="mt-1 text-xs sm:text-sm font-semibold text-[#111111] leading-relaxed">
                        Estrutura acadêmica e influência positiva que orientaram minha escolha pelo curso de Engenharia
                        de Software.
                      </p>
                    </RetroWindow>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-3 rpv-card-light p-5 min-h-[215px] flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="font-mono-tech text-xs font-bold">01</span>
                        <StarburstIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl uppercase">INTEGRAÇÃO</h3>
                        <p className="mt-2 text-xs text-[#111111]/85 leading-relaxed">
                          Dinâmica dos números 1 a 6 e troca de trajetórias com a equipe (Kauan, Bruna, Arthur,
                          Maxssuel e Gabriel).
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-3 rpv-card-amber p-5 min-h-[215px] flex flex-col justify-between -rotate-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono-tech text-xs font-bold">02</span>
                        <StarburstIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl uppercase">MEMÓRIA</h3>
                        <p className="mt-2 text-xs font-semibold text-[#111111] leading-relaxed">
                          <strong>Foto em família</strong> como objeto simbólico de felicidade, pertencimento e vínculo
                          afetivo.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-3 rpv-card-light p-5 min-h-[215px] flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="font-mono-tech text-xs font-bold">03</span>
                        <StarburstIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl uppercase">PERSISTÊNCIA</h3>
                        <p className="mt-2 text-xs text-[#111111]/85 leading-relaxed">
                          Casos Louis Vuitton/LVMH e Karl Benz: análise crítica de parcerias, resiliência e rigor
                          técnico.
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-3 flex justify-center">
                      <PolaroidSlot
                        slotId="bruno-familia"
                        caption="12/08 • objeto simbólico (foto em família)"
                        media={mediaMap['bruno-familia']}
                        onUpload={handleUpload}
                        onRemove={handleRemove}
                        onZoom={(item, caption) => setLightbox({ item, caption })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] font-bold">
                      escolhas garantem direção.
                    </p>
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-05') {
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="dark"
                isSlideMode={isSlideMode}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] mb-2">seguir regras não basta.</p>
                      <h2 className="font-display text-5xl sm:text-7xl uppercase text-white leading-[0.95]">
                        ÉTICA
                        <br />
                        <span className="text-[#e5a91b]">≠</span>
                        <br />
                        MORAL
                      </h2>
                    </div>

                    <blockquote className="font-script text-2xl sm:text-3xl text-[#e5a91b] leading-snug">
                      “Reconhecer o conflito é o início da responsabilidade.”
                    </blockquote>

                    <p className="text-xs sm:text-sm text-[#c8c5bd] leading-relaxed">
                      {ETHICS_MORAL_DATA.wordCloudNote}
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="border-2 border-white bg-[#111111] p-6 space-y-4">
                        <StarburstIcon className="w-6 h-6 text-[#e5a91b]" />
                        <h3 className="font-display text-2xl uppercase text-white">MORAL</h3>
                        <p className="text-xs text-[#c8c5bd]">Normas e valores construídos socialmente.</p>
                        <ul className="space-y-2 pt-2 border-t border-white/15 text-xs">
                          {ETHICS_MORAL_DATA.moralPairs.map((item) => (
                            <li key={item.q}>
                              <span className="text-[#c8c5bd] block">{item.q}</span>
                              <strong className="text-[#e5a91b] font-mono-tech">→ {item.a}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#e5a91b] text-[#111111] p-6 space-y-4 rotate-1 border-2 border-[#111111]">
                        <StarburstIcon className="w-6 h-6 text-[#111111]" />
                        <h3 className="font-display text-2xl uppercase">ÉTICA</h3>
                        <p className="text-xs font-semibold">Reflexão crítica sobre ações e consequências.</p>
                        <ul className="space-y-2 pt-2 border-t border-black/20 text-xs">
                          {ETHICS_MORAL_DATA.ethicsPairs.map((item) => (
                            <li key={item.q}>
                              <span className="text-[#111111]/80 block">{item.q}</span>
                              <strong className="font-mono-tech">→ {item.a}</strong>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <PolaroidSlot
                        slotId="bruno-etica-0909"
                        caption="09/09 • registro da aula"
                        media={mediaMap['bruno-etica-0909']}
                        onUpload={handleUpload}
                        onRemove={handleRemove}
                        onZoom={(item, caption) => setLightbox({ item, caption })}
                      />
                    </div>
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-06') {
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="dark"
                isSlideMode={isSlideMode}
              >
                <div className="max-w-4xl mx-auto space-y-10">
                  <p className="text-center font-script text-2xl sm:text-3xl text-[#e5a91b]">
                    software nunca é só técnica.
                  </p>

                  <RetroWindow title="critical_warning.exe" theme="dark">
                    <blockquote className="font-display text-2xl sm:text-4xl lg:text-[40px] uppercase leading-[1.12] text-white p-2 sm:p-4">
                      “O argumento ‘sempre fizemos assim’ não justifica expor dados sensíveis, ocultar falhas de
                      segurança ou excluir usuários.”
                    </blockquote>
                  </RetroWindow>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                    {[
                      { num: '01', label: 'Prevenção de riscos' },
                      { num: '02', label: 'Transparência' },
                      { num: '03', label: 'Inclusão & Privacidade' },
                    ].map((pillar) => (
                      <div key={pillar.num} className="space-y-2.5">
                        <div className="h-[2px] w-full bg-[#e5a91b]" />
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <span className="text-[#e5a91b]">•</span>
                          <span className="font-mono-tech text-[11px] text-[#c8c5bd]">{pillar.num}</span>
                          <strong className="text-white">{pillar.label}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-07') {
            const selectedQ = AVA_QUESTIONS_DATA[selectedAvaIdx];
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="light"
                isSlideMode={isSlideMode}
              >
                <div className="space-y-8">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div>
                      <h2 className="font-display text-4xl sm:text-6xl uppercase text-[#111111] leading-[0.98]">
                        CONHECIMENTO
                        <br />
                        VIRA
                        <br />
                        <span className="inline-block bg-[#e5a91b] px-2 py-0.5 mt-1">RESPONSABILIDADE.</span>
                      </h2>
                    </div>

                    <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] font-bold lg:text-right leading-tight">
                      quatro leituras.
                      <br />
                      uma direção.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {AVA_QUESTIONS_DATA.map((q, idx) => {
                      const isActive = idx === selectedAvaIdx;
                      return (
                        <button
                          key={q.num}
                          type="button"
                          onClick={() => setSelectedAvaIdx(idx)}
                          className={`text-left p-5 transition-all cursor-pointer flex flex-col justify-between min-h-[195px] border-t-4 ${
                            q.featured
                              ? 'bg-[#111111] text-white -rotate-1 shadow-[6px_6px_0px_#e5a91b] border-[#e5a91b]'
                              : isActive
                              ? 'bg-[#f4f3ef] text-[#111111] border-[#111111] ring-2 ring-[#e5a91b]'
                              : 'bg-[#f4f3ef]/80 text-[#111111] border-[#111111] hover:bg-[#f4f3ef]'
                          }`}
                        >
                          <span
                            className={`font-mono-tech text-xs font-bold ${
                              q.featured ? 'text-[#e5a91b]' : 'text-[#111111]'
                            }`}
                          >
                            {q.num}
                          </span>

                          <div className="mt-6">
                            <StarburstIcon className="w-4 h-4 text-[#e5a91b] mb-2" />
                            <h3 className="font-display text-xl uppercase">{q.axis}</h3>
                            <p
                              className={`mt-1.5 text-xs leading-relaxed ${
                                q.featured ? 'text-[#c8c5bd]' : 'text-[#111111]/80'
                              }`}
                            >
                              {q.axisDesc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
                    <div className="lg:col-span-8 bg-[#f4f3ef] border-2 border-[#111111] p-5">
                      <span className="font-mono-tech text-[11px] font-bold uppercase text-[#111111] bg-[#e5a91b] px-2 py-0.5">
                        QUESTÃO {selectedQ.num} • {selectedQ.axis}
                      </span>
                      <p className="mt-2.5 text-xs sm:text-sm font-bold text-[#111111]">{selectedQ.question}</p>
                      <p className="mt-2 text-xs sm:text-sm text-[#111111]/90 leading-relaxed">{selectedQ.answer}</p>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                      <PolaroidSlot
                        slotId="bruno-ava-2309"
                        caption="23/09 • comprovante de entrega no AVA"
                        media={mediaMap['bruno-ava-2309']}
                        onUpload={handleUpload}
                        onRemove={handleRemove}
                        onZoom={(item, caption) => setLightbox({ item, caption })}
                      />
                    </div>
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-08') {
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="dark"
                isSlideMode={isSlideMode}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] mb-1">
                        competências diferentes,
                      </p>
                      <h2 className="font-display text-5xl sm:text-6xl uppercase text-white leading-[0.98]">
                        UM
                        <br />
                        MESMO
                        <br />
                        <span className="text-[#e5a91b]">DESAFIO.</span>
                      </h2>
                    </div>

                    <p className="text-sm sm:text-base text-[#c8c5bd] max-w-md leading-relaxed">
                      Seis pessoas. Três perfis (dois por habilidade). Um time articulado para compor e apresentar a
                      paródia — como um squad ágil de Engenharia de Software.
                    </p>

                    <PolaroidSlot
                      slotId="bruno-equipe-2110"
                      caption="21/10/2026 • registro da aula"
                      media={mediaMap['bruno-equipe-2110']}
                      onUpload={handleUpload}
                      onRemove={handleRemove}
                      onZoom={(item, caption) => setLightbox({ item, caption })}
                    />
                  </div>

                  <div className="lg:col-span-6 flex items-center justify-center py-6">
                    <div className="relative w-[310px] h-[310px] sm:w-[390px] sm:h-[390px]">
                      <div className="absolute left-2 top-2 w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="font-display text-base sm:text-lg text-white -translate-x-4 -translate-y-2">
                          LER
                        </span>
                      </div>

                      <div className="absolute right-2 top-2 w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-[#e5a91b] flex items-center justify-center">
                        <span className="font-display text-base sm:text-lg text-[#e5a91b] translate-x-4 -translate-y-2">
                          CRIAR
                        </span>
                      </div>

                      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-44 h-44 sm:w-56 sm:h-56 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="font-display text-base sm:text-lg text-white translate-y-6">FALAR</span>
                      </div>

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#e5a91b] text-[#111111] px-3 py-1 font-mono-tech text-xs font-bold uppercase -rotate-3 border border-[#111111]">
                        COLABORAR
                      </div>
                    </div>
                  </div>
                </div>
              </SlideShell>
            );
          }

          if (slide.id === 'rpv-09') {
            return (
              <SlideShell
                key={slide.id}
                id={slide.id}
                code={slide.code}
                topLabel={slide.topLabel}
                pageIndex={slideIndex}
                totalPages={RPV_SLIDES.length}
                theme="light"
                isSlideMode={isSlideMode}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <p className="font-script text-2xl sm:text-3xl text-[#e5a91b] font-bold mb-1">
                        do papel para a voz coletiva.
                      </p>
                      <h2 className="font-display text-4xl sm:text-6xl uppercase text-[#111111]">
                        CRIATIVIDADE
                        <br />
                        <span className="text-[#e5a91b]">QUE GANHA VOZ.</span>
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rpv-card-light p-5">
                        <span className="font-mono-tech text-xs font-bold bg-[#111111] text-[#e5a91b] px-2 py-0.5">
                          04/11/2026 • ENCONTRO 05
                        </span>
                        <h3 className="mt-3 font-display text-lg uppercase">2 DE 4 JURADAS VIRARAM</h3>
                        <p className="mt-2 text-xs text-[#111111]/85 leading-relaxed">
                          Apresentamos a paródia de &ldquo;Ela é amiga da minha mulher&rdquo;. Duas das quatro colegas
                          juradas viraram suas cadeiras para nossa equipe — o único grupo a conquistar cadeiras viradas
                          na turma.
                        </p>
                      </div>

                      <div className="rpv-card-amber p-5">
                        <span className="font-mono-tech text-xs font-bold bg-[#111111] text-white px-2 py-0.5">
                          18/11/2026 • ENCONTRO 06
                        </span>
                        <h3 className="mt-3 font-display text-lg uppercase">CRITÉRIOS DE AVALIAÇÃO</h3>
                        <p className="mt-2 text-xs font-semibold text-[#111111] leading-relaxed">
                          O professor detalhou os critérios oficiais do portfólio (ordem cronológica, evidências,
                          reflexões e regras de ausência) e liberou a turma para revisão. Encerramento previsto em{' '}
                          <strong>02/12/2026</strong>.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => goToSlide(9)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-[#e5a91b] font-mono-tech text-xs font-bold uppercase cursor-pointer hover:opacity-90"
                    >
                      <span>Ler letra integral da paródia (Apêndice A) →</span>
                    </button>
                  </div>

                  <div className="lg:col-span-5 flex justify-center">
                    <PolaroidSlot
                      slotId="bruno-parodia-0411"
                      caption="04/11/2026 • apresentação da paródia"
                      media={mediaMap['bruno-parodia-0411']}
                      onUpload={handleUpload}
                      onRemove={handleRemove}
                      onZoom={(item, caption) => setLightbox({ item, caption })}
                    />
                  </div>
                </div>
              </SlideShell>
            );
          }

          return (
            <SlideShell
              key={slide.id}
              id={slide.id}
              code={slide.code}
              topLabel={slide.topLabel}
              pageIndex={slideIndex}
              totalPages={RPV_SLIDES.length}
              theme="dark"
              isSlideMode={isSlideMode}
            >
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                  <div>
                    <p className="font-script text-2xl text-[#e5a91b]">
                      melodia: &ldquo;Ela é amiga da minha mulher&rdquo;
                    </p>
                    <h2 className="font-display text-3xl sm:text-5xl uppercase text-white">
                      APÊNDICE A — <span className="text-[#e5a91b]">NOSSA PARÓDIA.</span>
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-1.5 font-mono-tech text-[11px]">
                    {[
                      { id: 'all', label: 'Todos' },
                      { id: 'vida-academica', label: 'Vida Acadêmica' },
                      { id: 'argumentacao', label: 'Argumentação' },
                      { id: 'autoria', label: 'Autoria' },
                      { id: 'oralidade', label: 'Oralidade' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setParodyFilter(f.id)}
                        className={`px-2.5 py-1 font-bold uppercase cursor-pointer border ${
                          parodyFilter === f.id
                            ? 'bg-[#e5a91b] text-[#111111] border-[#e5a91b]'
                            : 'bg-transparent text-[#c8c5bd] border-white/25 hover:border-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredLyrics.map((stanza) => (
                    <div
                      key={stanza.id}
                      className={`p-4 border ${
                        stanza.isChorus
                          ? 'bg-[#e5a91b] text-[#111111] border-[#e5a91b]'
                          : 'bg-[#171717] text-white border-white/25'
                      }`}
                    >
                      <span
                        className={`block font-mono-tech text-[10px] font-bold uppercase mb-2.5 ${
                          stanza.isChorus ? 'text-[#111111]' : 'text-[#e5a91b]'
                        }`}
                      >
                        {stanza.tag}
                      </span>
                      <div className="space-y-0.5 text-xs leading-relaxed font-medium">
                        {stanza.lines.map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[11px] text-[#c8c5bd]">
                  <span>
                    REFERÊNCIA: WORLD ECONOMIC FORUM. The Future of Jobs Report 2025. Seção &ldquo;Skills outlook&rdquo;.
                    2025.
                  </span>
                  <button
                    type="button"
                    onClick={() => goToSlide(0)}
                    className="text-[#e5a91b] font-bold underline cursor-pointer"
                  >
                    Voltar ao início ↑
                  </button>
                </div>
              </div>
            </SlideShell>
          );
        })}
      </main>

      {isSlideMode && (
        <div className="fixed bottom-4 right-5 z-40 flex items-center gap-2 bg-[#111111] border-2 border-white px-3 py-1.5 shadow-[4px_4px_0px_#e5a91b]">
          <button
            type="button"
            disabled={currentSlide === 0}
            onClick={() => goToSlide(currentSlide - 1)}
            className="px-2 py-0.5 text-white font-mono-tech text-xs font-bold disabled:opacity-30 cursor-pointer"
            title="Slide anterior"
          >
            ←
          </button>
          <span className="font-mono-tech text-xs font-bold text-[#e5a91b]">
            {String(currentSlide + 1).padStart(2, '0')} / {String(RPV_SLIDES.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            disabled={currentSlide === RPV_SLIDES.length - 1}
            onClick={() => goToSlide(currentSlide + 1)}
            className="px-2 py-0.5 text-white font-mono-tech text-xs font-bold disabled:opacity-30 cursor-pointer"
            title="Próximo slide"
          >
            →
          </button>
        </div>
      )}

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-[#111111] border-2 border-white p-4 shadow-[8px_8px_0px_#e5a91b]"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/20">
              <span className="font-mono-tech text-xs font-bold text-[#e5a91b]">{lightbox.caption}</span>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="px-2 py-0.5 text-white hover:text-[#e5a91b] font-mono-tech text-sm font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <img src={lightbox.item.url} alt={lightbox.caption} className="max-h-[75vh] w-full object-contain mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;