// Verified public content for Valéria's portfolio.
// Keep claims linked to a publication, repository, event page, or institutional record.
export const SITE = {
  news: [
    {
      date: 'Oct 2026',
      tag: 'Funding · UK',
      text: 'Selected for a six-month visiting doctoral research fellowship at the <strong>University of Surrey</strong> through the Rede SINAPSE / CAPES-Global.edu programme.',
    },
    {
      date: '2026',
      tag: 'Paper · STIL',
      text: 'Published <a href="https://aclanthology.org/2026.stil-1.43/" target="_blank" rel="noopener"><em>Quando o “...” importa</em></a> in the proceedings of STIL 2026.',
    },
    {
      date: 'Jul 2026',
      tag: 'Paper · ACL',
      text: 'Published <a href="https://aclanthology.org/2026.codi-1.5/" target="_blank" rel="noopener"><em>Speech Disfluencies and LLM Confidence</em></a> at CODI-CRAC 2026 and selected for a featured oral presentation.',
    },
    {
      date: 'Jun 2026',
      tag: 'Scholarship',
      text: 'Awarded an <strong>EADH scholarship</strong> for the European Summer University in Digital Humanities after proposal scores of 86 and 96 out of 100.',
    },
    {
      date: 'Jun 2026',
      tag: 'Talk · UK',
      text: 'Presented research on pragmatic integrity and trust in LLMs at the <a href="https://www.ias.surrey.ac.uk/event/humic-humans-and-machines-in-conversation-linguistic-social-and-relational-perspectives/" target="_blank" rel="noopener">HUMIC Symposium</a>, University of Surrey.',
    },
  ],

  pubTags: ['All', 'NLP', 'Linguistics', 'Pragmatics', 'AI Evaluation', 'Terminology'],

  publications: [
    {
      year: '2026',
      title: 'Quando o “...” importa: análise comparada de modalidades de transcrição de hesitações em entrevistas do Corpus Roda Viva',
      meta: 'Valéria Vieira dos Santos · <em>Proceedings of the 17th Brazilian Symposium in Information and Human Language Technology (STIL 2026)</em>, pp. 522–530.',
      tags: ['NLP', 'Linguistics', 'Pragmatics'],
      links: [['ACL Anthology', 'https://aclanthology.org/2026.stil-1.43/']],
    },
    {
      year: '2026',
      title: 'Speech Disfluencies and LLM Confidence: Length Bias and Pragmatic Insensitivity in Brazilian Portuguese',
      meta: 'Valéria Vieira dos Santos · <em>Proceedings of CODI-CRAC 2026</em>, pp. 24–28.',
      tags: ['NLP', 'Pragmatics', 'AI Evaluation'],
      links: [
        ['ACL Anthology', 'https://aclanthology.org/2026.codi-1.5/'],
        ['Code and data', 'https://github.com/ValeriaVSantos/uncertainty-signature-audit'],
      ],
    },
    {
      year: '2026',
      title: 'Terminologia e terminografia e suas interfaces de aplicação em diversas áreas do conhecimento',
      meta: 'Martins, S. C.; Silva, G. C.; Santos, V. V.; Nunes, A. D. M.; Pessoa, M. · <em>Revista Akedia</em> 18(12), 28–39.',
      tags: ['Linguistics', 'Terminology'],
      links: [['Google Scholar record', 'https://scholar.google.com.br/citations?view_op=view_citation&hl=pt-BR&user=T23u398AAAAJ&citation_for_view=T23u398AAAAJ:d1gkVwhDpl0C']],
    },
    {
      year: '2025',
      title: 'O papel da inteligência artificial na revitalização de línguas em extinção por meio do processamento de linguagem natural',
      meta: 'Valéria Vieira dos Santos & Joceli Catarina Stassi-Sé · <em>Revista Linguasagem</em> 49(1), 152–176.',
      tags: ['NLP', 'Linguistics'],
      links: [['Article', 'https://linguasagem.ufscar.br/index.php/linguasagem/article/view/1794']],
    },
    {
      year: '2025',
      title: 'A Methodology for Prompt Engineering in Engineering: Framework Development and Performance Evaluation',
      meta: 'Valéria Vieira dos Santos & Miroslav Malaga · <em>Průmyslové inženýrství 2025</em>, pp. 169–178.',
      tags: ['NLP', 'AI Evaluation'],
      links: [['DOI', 'https://doi.org/10.24132/PI.2025.13287.169-178']],
    },
  ],

  talks: [
    {
      year: '2026',
      title: 'Speech Disfluencies and LLM Confidence: Length Bias and Pragmatic Insensitivity in Brazilian Portuguese',
      meta: '<em>CODI-CRAC 2026 at ACL</em> · Featured oral presentation and virtual poster.',
      tags: ['NLP', 'Pragmatics', 'AI Evaluation'],
      links: [['Paper', 'https://aclanthology.org/2026.codi-1.5/']],
    },
    {
      year: '2026',
      title: 'Preserving Pragmatic Integrity: Hesitation Markers, Epistemic Modality and Trust in LLMs',
      meta: '<em>HUMIC Symposium</em> · University of Surrey · Spoken presentation.',
      tags: ['NLP', 'Pragmatics', 'AI Evaluation'],
      links: [['Event', 'https://www.ias.surrey.ac.uk/event/humic-humans-and-machines-in-conversation-linguistic-social-and-relational-perspectives/']],
    },
  ],

  projects: [
    {
      icon: 'φ',
      title: 'Uncertainty Signature Audit',
      sub: 'Ph.D. research · UFSCar · 2025—',
      status: 'active',
      stack: ['Brazilian Portuguese', 'LLM evaluation', 'Calibration', 'Regression'],
      desc: 'A reproducible audit of whether LLM confidence tracks pragmatic uncertainty in spontaneous Brazilian Portuguese.',
      abstract: 'The pilot compares 344 faithful and sanitized turns from three Roda Viva interviews. Multivariate analysis showed that turn length was the dominant predictor of model confidence, while disfluency and lexical-hedge effects were smaller and not statistically significant. The study was published at CODI-CRAC 2026.',
      link: ['Repository and reproducibility materials', 'https://github.com/ValeriaVSantos/uncertainty-signature-audit'],
    },
    {
      icon: '◇',
      title: 'Political Evasion Detection in Brazilian Portuguese',
      sub: 'Open benchmark · 2026—',
      status: 'active',
      stack: ['Political interviews', 'Human annotation', 'NLI', 'LLM evaluation'],
      desc: 'A three-class benchmark for distinguishing direct, partial, and evasive answers in Brazilian political interviews.',
      abstract: 'The project evaluates embedding similarity, natural-language inference, and prompting strategies against human annotations. Current results show low agreement between automated methods and the gold standard, with systematic errors on long and indirect answers. The public repository contains data documentation, annotation guidance, and reproducible analyses.',
      link: ['Repository and benchmark', 'https://github.com/ValeriaVSantos/roda-viva-evasion'],
    },
  ],
};
