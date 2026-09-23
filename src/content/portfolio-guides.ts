import type { PortfolioType } from './portfolio'

/**
 * Per-type "how we build it" steps and FAQs, shown under the preview in the
 * portfolio modal. Keyed by project type so every project of that type shares
 * them.
 */
export type Guide = {
  steps: { title: string; body: string }[]
  faqs: { question: string; answer: string }[]
}

const sharedFaqs: Guide['faqs'] = [
  {
    question: 'Do you work with businesses outside my country?',
    answer:
      'Yes. We work remotely with clients across the Middle East and beyond, with calls scheduled in your time zone and a single point of contact from kickoff to launch.',
  },
  {
    question: 'Who owns the website and the code?',
    answer:
      'You do. Once the project is paid in full, the code, design files, domain and hosting accounts are handed over in your name.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes. Every project includes 30 days of free fixes after launch, and we offer monthly maintenance plans covering updates, security, backups and performance.',
  },
]

export const guides: Record<PortfolioType, Guide> = {
  Website: {
    steps: [
      {
        title: 'Discovery call',
        body: 'We learn about your business, audience and goals, and agree on pages, content and deadlines.',
      },
      {
        title: 'Design in Figma',
        body: 'You review a clickable design of the homepage and key pages before any code is written.',
      },
      {
        title: 'Build & SEO',
        body: 'We build with Next.js for speed, set up SEO, analytics and a CMS so your team can edit content.',
      },
      {
        title: 'Launch',
        body: 'We connect your domain, test on every device and go live — then monitor performance.',
      },
    ],
    faqs: [
      {
        question: 'How long does a website take?',
        answer:
          'A business website typically takes 3–6 weeks depending on the number of pages and how ready your content is.',
      },
      {
        question: 'Will I be able to edit the content myself?',
        answer:
          'Yes. We connect a CMS so you can update text, images and blog posts without touching code.',
      },
      {
        question: 'Is the website SEO-ready?',
        answer:
          'Yes. Every site ships with fast load times, clean structure, meta tags, a sitemap and Google Analytics / Search Console set up.',
      },
      ...sharedFaqs,
    ],
  },
  'Web App': {
    steps: [
      {
        title: 'Scope & requirements',
        body: 'We map users, roles and workflows, and turn them into a prioritised feature list and fixed quote.',
      },
      {
        title: 'UX & prototype',
        body: 'You test a clickable prototype of the main flows so we validate the product before building it.',
      },
      {
        title: 'Agile build',
        body: 'We build in short sprints with a staging link you can use every week, including auth, database and APIs.',
      },
      {
        title: 'Launch & scale',
        body: 'We deploy to secure cloud hosting with monitoring, backups and a roadmap for the next version.',
      },
    ],
    faqs: [
      {
        question: 'How long does a web app take to build?',
        answer:
          'A first version (MVP) usually takes 6–12 weeks. Larger platforms are delivered in phases so you can launch early and grow.',
      },
      {
        question: 'Can it connect to the tools we already use?',
        answer:
          'Yes. We integrate with CRMs, ERPs, payment gateways, WhatsApp Business and any tool with an API.',
      },
      {
        question: 'Is my data secure?',
        answer:
          'We use role-based access, encrypted connections, secure authentication and regular backups, hosted on trusted cloud providers.',
      },
      ...sharedFaqs,
    ],
  },
  'E-commerce': {
    steps: [
      {
        title: 'Store strategy',
        body: 'We plan your catalogue, customer journey, shipping and payment options for your market.',
      },
      {
        title: 'Store design',
        body: 'You approve product, collection and checkout designs built to convert on mobile.',
      },
      {
        title: 'Build & integrate',
        body: 'We set up Shopify or a custom store with local payment gateways, shipping and inventory.',
      },
      {
        title: 'Launch & grow',
        body: 'We go live with analytics, SEO and marketing pixels in place, then optimise conversion.',
      },
    ],
    faqs: [
      {
        question: 'Shopify or a custom store — which is right for me?',
        answer:
          'Shopify is fastest and easiest to manage for most brands. A custom store makes sense when you need unique features, complex pricing or deep integrations.',
      },
      {
        question: 'Which payment methods can you add?',
        answer:
          'Cards, Apple Pay and Google Pay, plus regional gateways such as Tap, Checkout.com, Tabby and Tamara, and cash on delivery.',
      },
      {
        question: 'Can you migrate my existing store?',
        answer:
          'Yes. We move your products, customers and order history, and set up redirects so you keep your Google rankings.',
      },
      ...sharedFaqs,
    ],
  },
  'AI System': {
    steps: [
      {
        title: 'Find the use case',
        body: 'We identify the tasks where AI saves your team the most time — support, sales, documents or operations.',
      },
      {
        title: 'Prototype',
        body: 'We build a working prototype on your real data so you can see the results before committing.',
      },
      {
        title: 'Build & integrate',
        body: 'We connect the AI to your website, CRM, WhatsApp or internal tools, with guardrails and human review.',
      },
      {
        title: 'Launch & improve',
        body: 'We monitor accuracy and cost, and keep improving the system as your data grows.',
      },
    ],
    faqs: [
      {
        question: 'What can an AI system do for my business?',
        answer:
          'Common examples are chatbots that answer customers 24/7, assistants that qualify leads, and automations that read documents, fill forms or write reports.',
      },
      {
        question: 'Is my company data kept private?',
        answer:
          'Yes. We use enterprise AI providers that do not train on your data, and we control exactly what the AI can access.',
      },
      {
        question: 'How much does it cost to run?',
        answer:
          'Running costs depend on usage. We estimate them upfront and design the system to keep them predictable.',
      },
      ...sharedFaqs,
    ],
  },
}

/** Every FAQ once (the shared ones appear under each type). */
export const allFaqs = [
  ...new Map(
    Object.values(guides)
      .flatMap((guide) => guide.faqs)
      .map((faq) => [faq.question, faq]),
  ).values(),
]
