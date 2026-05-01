export type BucketKey = 'bold' | 'smooth' | 'adventurous' | 'cozy';

export type Question = {
  question: string;
  answers: Array<{ label: string; bucket: BucketKey }>;
};

export const buckets = [
  {
    key: 'bold' as BucketKey,
    title: 'Bold Espresso Person',
    description:
      'You like coffee with character, intensity, and a confident flavor profile.',
    recommendations: ['Espresso Macchiato', 'Dark Roast Americano', 'Cortado'],
    highlight: 'Strong, direct, and unapologetic.',
  },
  {
    key: 'smooth' as BucketKey,
    title: 'Smooth Latte Person',
    description:
      'You care about comfort and warmth, with a gentle coffee experience.',
    recommendations: ['Vanilla Latte', 'Flat White', 'Cappuccino'],
    highlight: 'Creamy, mellow, and comforting.',
  },
  {
    key: 'adventurous' as BucketKey,
    title: 'Adventurous Cold Brew Fan',
    description:
      'You love discovery, new flavors, and coffee that surprises you.',
    recommendations: ['Nitro Cold Brew', 'Iced Lavender Latte', 'Seasonal Espresso'],
    highlight: 'Bold experimentation with every sip.',
  },
  {
    key: 'cozy' as BucketKey,
    title: 'Cozy Coffee Companion',
    description:
      'You’re drawn to familiar rituals, comfort, and a relaxed coffee moment.',
    recommendations: ['Spiced Chai Latte', 'Mocha', 'Simple Brewed Drip'],
    highlight: 'Warm, familiar, and easy to love.',
  },
];

export const questions: Question[] = [
  {
    question: 'What kind of coffee moment feels best to you?',
    answers: [
      { label: 'A strong shot that wakes me up fast', bucket: 'bold' },
      { label: 'A soft latte that feels like a hug', bucket: 'smooth' },
      { label: 'Something unusual and seasonal', bucket: 'adventurous' },
      { label: 'A cozy cup to relax with', bucket: 'cozy' },
    ],
  },
  {
    question: 'How do you choose a drink when you’re unsure?',
    answers: [
      { label: 'Pick the most intense option', bucket: 'bold' },
      { label: 'Stick with a creamy classic', bucket: 'smooth' },
      { label: 'Ask for a recommendation or new flavor', bucket: 'adventurous' },
      { label: 'Choose something warm and simple', bucket: 'cozy' },
    ],
  },
  {
    question: 'What would you want from a coffee loyalty program?',
    answers: [
      { label: 'A bold reward that feels premium', bucket: 'bold' },
      { label: 'A comforting treat I can enjoy anytime', bucket: 'smooth' },
      { label: 'Fun, unexpected perks and new drinks', bucket: 'adventurous' },
      { label: 'Slow-burn value and easy rewards', bucket: 'cozy' },
    ],
  },
  {
    question: 'Which coffee phrase speaks to you most?',
    answers: [
      { label: 'Strong and memorable', bucket: 'bold' },
      { label: 'Smooth and soothing', bucket: 'smooth' },
      { label: 'Fresh and exciting', bucket: 'adventurous' },
      { label: 'Warm and familiar', bucket: 'cozy' },
    ],
  },
];
