import { useMemo, useState } from 'react';
import { buckets, questions } from './data';

type ResponseRecord = {
  question: string;
  selectedBucket: string;
  selectedAt: string;
};

type StoredTracking = {
  counts: Record<string, number>;
  history: ResponseRecord[];
};

type SavedProfile = {
  name: string;
  personality: string;
  recommendations: string[];
  answers: string[];
  completedAt: string;
};

function App() {
  const [view, setView] = useState<'quiz' | 'dashboard'>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('');

  const currentQuestion = questions[questionIndex];

  const getTrackingData = (): StoredTracking => {
    if (typeof window === 'undefined') return { counts: {}, history: [] };
    const stored = window.localStorage.getItem('coffeePersonalityQuizResponses');
    if (!stored) return { counts: {}, history: [] };
    return JSON.parse(stored) as StoredTracking;
  };

  const getSavedProfile = (): SavedProfile | null => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem('coffeePersonalityQuiz');
    return stored ? (JSON.parse(stored) as SavedProfile) : null;
  };

  const currentTracking = useMemo(() => getTrackingData(), [saved]);
  const savedProfile = useMemo(() => getSavedProfile(), [saved]);

  const trackResponse = (bucket: string) => {
    if (typeof window === 'undefined') return;
    const storageKey = 'coffeePersonalityQuizResponses';
    const stored = window.localStorage.getItem(storageKey);
    const parsed = stored ? JSON.parse(stored) : { counts: {}, history: [] };
    const counts = parsed.counts || {};
    const history: ResponseRecord[] = parsed.history || [];

    counts[bucket] = (counts[bucket] || 0) + 1;
    history.push({
      question: currentQuestion.question,
      selectedBucket: bucket,
      selectedAt: new Date().toISOString(),
    });

    window.localStorage.setItem(storageKey, JSON.stringify({ counts, history }));
  };

  const result = useMemo(() => {
    if (!resultKey) return null;
    return buckets.find((bucket) => bucket.key === resultKey) ?? null;
  }, [resultKey]);

  const progress = Math.round((questionIndex / questions.length) * 100);

  const computeResultKey = (answersList: string[]) => {
    const tallies = answersList.reduce<Record<string, number>>((acc, answer) => {
      acc[answer] = (acc[answer] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(tallies).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'cozy';
  };

  const handleNext = () => {
    if (!selectedOption) return;
    trackResponse(selectedOption);

    const nextAnswers = [...answers, selectedOption];
    setAnswers(nextAnswers);
    setSelectedOption('');

    if (questionIndex + 1 >= questions.length) {
      setResultKey(computeResultKey(nextAnswers));
      return;
    }

    setQuestionIndex(questionIndex + 1);
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setSelectedOption('');
    setAnswers([]);
    setResultKey(null);
    setSaved(false);
    setName('');
  };

  const handleSave = () => {
    if (!result) return;
    const responsePayload: SavedProfile = {
      name: name || 'Guest',
      personality: result.title,
      recommendations: result.recommendations,
      answers,
      completedAt: new Date().toISOString(),
    };
    window.localStorage.setItem('coffeePersonalityQuiz', JSON.stringify(responsePayload));
    setSaved(true);
    setView('dashboard');
  };

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Basecamp Coffee</p>
          <h1>Find your Coffee Personality</h1>
          <p>Answer a few quick questions and get a personalized drink identity and recommendation path.</p>
        </div>
      </header>

      <div className="dashboard-nav">
        <button
          className={view === 'quiz' ? 'primary-button' : 'secondary-button'}
          onClick={() => setView('quiz')}
        >
          Quiz
        </button>
        <button
          className={view === 'dashboard' ? 'primary-button' : 'secondary-button'}
          onClick={() => setView('dashboard')}
        >
          Dashboard
        </button>
      </div>

      {view === 'dashboard' && (
        <section className="card result-card">
          <div className="result-badge">Dashboard</div>
          <h2>Response tracking</h2>
          <p className="result-description">
            This view shows what answers users selected and the latest saved profile.
          </p>

          <div className="recommendations">
            <h3>Saved profile</h3>
            {savedProfile ? (
              <div>
                <p><strong>Name:</strong> {savedProfile.name}</p>
                <p><strong>Personality:</strong> {savedProfile.personality}</p>
                <p><strong>Completed:</strong> {new Date(savedProfile.completedAt).toLocaleString()}</p>
                <p><strong>Answers:</strong> {savedProfile.answers.join(', ')}</p>
              </div>
            ) : (
              <p>No saved profile found yet.</p>
            )}
          </div>

          <div className="recommendations">
            <h3>Answer counts</h3>
            {Object.keys(currentTracking.counts).length > 0 ? (
              <ul>
                {Object.entries(currentTracking.counts).map(([bucket, count]) => (
                  <li key={bucket}>{bucket}: {count}</li>
                ))}
              </ul>
            ) : (
              <p>No tracked responses yet.</p>
            )}
          </div>

          <div className="recommendations">
            <h3>Recent response history</h3>
            {currentTracking.history.length > 0 ? (
              <ol>
                {currentTracking.history.slice(-8).reverse().map((entry, index) => (
                  <li key={`${entry.selectedAt}-${index}`}>
                    <strong>{entry.question}</strong><br />
                    {entry.selectedBucket} at {new Date(entry.selectedAt).toLocaleTimeString()}
                  </li>
                ))}
              </ol>
            ) : (
              <p>No response history yet.</p>
            )}
          </div>
        </section>
      )}

      {view === 'quiz' && !result && (
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
                className={answer.label === selectedOption ? 'answer-button selected' : 'answer-button'}
                onClick={() => setSelectedOption(answer.bucket)}
              >
                {answer.label}
              </button>
            ))}
          </div>

          <div className="actions">
            <button className="primary-button" onClick={handleNext} disabled={!selectedOption}>
              {questionIndex + 1 === questions.length ? 'See my result' : 'Next question'}
            </button>
            <button className="secondary-button" onClick={handleRestart}>
              Start over
            </button>
          </div>
        </section>
      )}

      {view === 'quiz' && result && !saved && (
        <section className="card result-card">
          <div className="result-badge">Your Profile</div>
          <h2>{result.title}</h2>
          <p className="result-description">{result.description}</p>
          <p className="result-highlight">{result.highlight}</p>

          <div className="recommendations">
            <h3>Recommended drinks</h3>
            <ul>
              {result.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="save-box">
            <label>
              Save this profile for later
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
              />
            </label>
            <button className="primary-button" onClick={handleSave}>
              Save profile
            </button>
          </div>

          <div className="actions">
            <button className="primary-button" onClick={handleRestart}>
              Try again
            </button>
          </div>
        </section>
      )}

      {view === 'quiz' && saved && result && (
        <section className="card result-card">
          <div className="result-badge">Thank you</div>
          <h2>Thank you for your answers</h2>
          <p className="result-description">
            Your coffee personality profile has been saved. You can now close this screen or try the quiz again.
          </p>
          <div className="actions">
            <button className="primary-button" onClick={handleRestart}>
              Start over
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
