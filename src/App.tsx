import { useMemo, useState } from 'react';
import { buckets, questions, BucketKey } from './data';

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedBucket, setSelectedBucket] = useState<BucketKey | ''>('');
  const [answers, setAnswers] = useState<BucketKey[]>([]);
  const [resultKey, setResultKey] = useState<BucketKey | null>(null);

  const currentQuestion = questions[questionIndex];

  const bucketIcons: Record<BucketKey, string> = {
    bold: '⚡',
    zen: '🍃',
    health: '🥑',
  };

  const result = useMemo(() => {
    if (!resultKey) return null;
    return buckets.find((bucket) => bucket.key === resultKey) ?? null;
  }, [resultKey]);

  const progress = Math.round((questionIndex / questions.length) * 100);

  const computeResultKey = (answersList: BucketKey[]) => {
    const tallies = answersList.reduce<Record<BucketKey, number>>((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, { bold: 0, zen: 0, health: 0 });
    return (Object.entries(tallies) as Array<[BucketKey, number]>)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'zen';
  };

  const handleNext = () => {
    if (!selectedBucket) return;

    const nextAnswers = [...answers, selectedBucket];
    setAnswers(nextAnswers);
    setSelectedBucket('');

    if (questionIndex + 1 >= questions.length) {
      setResultKey(computeResultKey(nextAnswers));
      return;
    }

    setQuestionIndex(questionIndex + 1);
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedBucket('');
    setAnswers([]);
    setResultKey(null);
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Basecamp Coffee</p>
          <h1>What’s your coffee personality?</h1>
          <p>Answer a few cozy questions, then discover the drink that fits your vibe.</p>
        </div>
      </header>

      {!result && (
        <section className="card">
          <div className="quiz-header">
            <div>
              <p className="step">Question {questionIndex + 1} of {questions.length}</p>
              <h2>{currentQuestion.question}</h2>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="answer-grid">
            {currentQuestion.answers.map((answer) => (
              <button
                key={answer.label}
                className={answer.bucket === selectedBucket ? 'answer-button selected' : 'answer-button'}
                onClick={() => setSelectedBucket(answer.bucket)}
              >
                <span className="answer-icon">{bucketIcons[answer.bucket]}</span>
                <span>{answer.label}</span>
              </button>
            ))}
          </div>

          <div className="actions">
            <button className="primary-button" onClick={handleNext} disabled={!selectedBucket}>
              {questionIndex + 1 === questions.length ? 'See my drink' : 'Next question'}
            </button>
            <button className="secondary-button" onClick={handleRestart}>
              Start over
            </button>
          </div>
        </section>
      )}

      {result && (
        <section className="card result-card">
          <div className="result-badge">Your result</div>
          <h2>{result.title}</h2>
          <p className="result-description">{result.description}</p>
          <p className="result-highlight">{result.tagline}</p>

          <div className="recommendations">
            <h3>Recommended drink</h3>
            <div className="single-drink">{result.coffee}</div>
          </div>

          <div className="actions">
            <button className="primary-button" onClick={handleRestart}>
              Try again
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
