export type BucketKey = 'bold' | 'zen' | 'health';

export type Question = {
  question: string;
  answers: Array<{ label: string; bucket: BucketKey }>;
};

export const buckets = [
  {
    key: 'bold' as BucketKey,
    title: 'Bold Adventurer',
    description: 'You live for intensity and crave coffee with character.',
    coffee: 'Double Espresso',
    tagline: 'You live for intensity.',
  },
  {
    key: 'zen' as BucketKey,
    title: 'Zen Minimalist',
    description: 'You enjoy a clean, simple ritual with every sip.',
    coffee: 'Black Coffee, Single Origin',
    tagline: 'Simple. Clean. Perfect.',
  },
  {
    key: 'health' as BucketKey,
    title: 'Health Nut',
    description: 'You love wellness-first choices that still feel delicious.',
    coffee: 'Oat Milk Americano',
    tagline: 'Wellness in every sip.',
  },
];

export const questions: Question[] = [
  {
    question: 'What’s your perfect morning coffee moment?',
    answers: [
      { label: 'A sunrise hike and something strong to kick it off.', bucket: 'bold' },
      { label: 'A slow sip while I journal or read.', bucket: 'zen' },
      { label: 'A green smoothie and a light coffee to stay balanced.', bucket: 'health' },
    ],
  },
  {
    question: 'Pick the ideal weekend plan:',
    answers: [
      { label: 'Explore a new trail or try a new brew spot.', bucket: 'bold' },
      { label: 'Do yoga, meditate, and keep it peaceful.', bucket: 'zen' },
      { label: 'Hit the farmers market and choose healthy bites.', bucket: 'health' },
    ],
  },
  {
    question: 'Which snack sounds best right now?',
    answers: [
      { label: 'Dark chocolate and a bold espresso shot.', bucket: 'bold' },
      { label: 'Simple toast with honey and a clean black coffee.', bucket: 'zen' },
      { label: 'Fresh fruit and a creamy oat milk Americano.', bucket: 'health' },
    ],
  },
  {
    question: 'What phrase fits your vibe?',
    answers: [
      { label: 'Go big or go home.', bucket: 'bold' },
      { label: 'Less fuss, more clarity.', bucket: 'zen' },
      { label: 'Nourish first, then move.', bucket: 'health' },
    ],
  },
  {
    question: 'Your ideal coffee order is:',
    answers: [
      { label: 'Double espresso with no nonsense.', bucket: 'bold' },
      { label: 'Single-origin black coffee, pure and simple.', bucket: 'zen' },
      { label: 'Oat milk Americano with a light, smooth finish.', bucket: 'health' },
    ],
  },
];
