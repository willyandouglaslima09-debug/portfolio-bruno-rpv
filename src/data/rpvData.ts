export interface SlideInfo {
  id: string;
  code: string;
  topLabel: string;
  navTitle: string;
  theme: 'dark' | 'light';
}

export interface TimelineNode {
  date: string;
  label: string;
  sublabel: string;
  status: 'absent' | 'no-class' | 'present' | 'ava' | 'future';
  detail: string;
  targetSlideId: string;
}

export interface AvaQuestion {
  num: string;
  axis: string;
  axisDesc: string;
  featured?: boolean;
  question: string;
  answer: string;
}

export interface ParodyStanza {
  id: string;
  axis: 'geral' | 'vida-academica' | 'argumentacao' | 'autoria' | 'oralidade';
  tag: string;
  isChorus?: boolean;
  lines: string[];
}

export const BRUNO_PROFILE = {
  name: 'BRUNO REIS MENDES',
  course: 'Engenharia de Software',
  institution: 'UNICATÓLICA • 2026.2',
  professor: 'Prof. Antônio Cesar',
  discipline: 'Relações, Princípios e Valores',
};

export const RPV_SLIDES: SlideInfo[] = [
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

export const FOUR_AXES = [
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

export const OFFICIAL_TIMELINE: TimelineNode[] = [
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

export const ETHICS_MORAL_DATA = {
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

export const AVA_QUESTIONS_DATA: AvaQuestion[] = [
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

export const PARODY_LYRICS: ParodyStanza[] = [
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