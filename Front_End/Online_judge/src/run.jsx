import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';

export default function Run() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch question details
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch(`https://l4-project-back-end.onrender.com/Question/${id}`);
        const data = await res.json();
        setQuestion(data);
      } catch (err) {
        console.error('Failed to fetch question:', err);
      }
    }
    fetchQuestion();
  }, [id]);

  // EXISTING RUN (custom input) handler
  const handleRun = async () => {
    setAiFeedback('');
    setVerdict(null);
    if (!code.trim()) {
      alert('Please enter some code!');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('https://l4-project-compiler.onrender.com/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, input, questionId: id }),
      });
      const data = await res.json();
      setOutput(data.output || data.error || 'Unknown response from server.');
    } catch {
      setOutput('Error connecting to server.');
    }

    setLoading(false);
  };

  // AI FEEDBACK
  const handleAiFeedback = async () => {
    if (!code.trim()) {
      alert('Please enter some code to get feedback!');
      return;
    }

    setLoadingAi(true);
    setAiFeedback('');

    try {
      const res = await fetch('https://l4-project-compiler.onrender.com/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setAiFeedback(data.aiResponse || data.error || 'Unknown response from server.');
    } catch {
      setAiFeedback('Error connecting to server.');
    }

    setLoadingAi(false);
  };

  // NEW SUBMIT HANDLER
  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please enter some code!');
      return;
    }

    setSubmitting(true);
    setVerdict(null);

    try {
      const res = await fetch('https://l4-project-back-end.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: id, code, language }),
      });

      const data = await res.json();
      setVerdict(data);
    } catch {
      setVerdict({ verdict: 'Error', message: 'Error connecting to server.' });
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Compiler & Problem Detail</h1>

      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-7xl flex gap-6">

        {/* LEFT PANEL */}
        <div className="w-1/2 space-y-6 overflow-auto max-h-[80vh]">
          {question ? (
            <>
              <h2 className="text-2xl font-bold text-slate-800">{question.Title}</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{question.Description}</p>

              <div>
                <h3 className="text-2xl font-bold text-slate-800">Constraints</h3>
                <ul className="list-disc pl-6 text-gray-600">
                  {question.Input.map((c, idx) => <li key={idx}>{c}</li>)}
                </ul>
              </div>

              <h2 className="text-xl font-bold text-slate-800">Output Guide:</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{question.Output_Guide}</p>

              <div>
                <h3 className="font-semibold text-gray-800">Sample Testcases</h3>
                <ul className="list-decimal pl-6 text-gray-600">
                  {question.TestCases.map((t, idx) => (
                    <li key={t._id} className="mb-2">
                      <div>
                        <span className="font-semibold">Input:</span><br />
                        <code className="bg-gray-200 whitespace-pre-wrap px-2">{t.input}</code>
                      </div>
                      <div>
                        <span className="font-semibold">Expected:</span><br />
                        <code className="bg-gray-200 whitespace-pre-wrap px-2">{t.output}</code>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading question details...</p>
          )}

          {/* Custom Input */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Custom Input (optional)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter custom input here"
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-1/2 space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="cpp">C++</option>
            </select>
          </div>

          {/* Code Editor */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Code Editor</label>
            <CodeMirror
              value={code}
              height="400px"
              theme={oneDark}
              extensions={[cpp()]}
              onChange={(value) => setCode(value)}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <button
              onClick={handleRun}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200"
            >
              {loading ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition duration-200"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
              onClick={handleAiFeedback}
              disabled={loadingAi}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition duration-200"
            >
              {loadingAi ? 'Getting AI Feedback...' : 'Get AI Feedback'}
            </button>
          </div>

          {/* Verdict Result */}
          {verdict && (
            <div
              className={`p-4 rounded-lg font-mono shadow-inner whitespace-pre-wrap ${
                verdict.verdict === 'Accepted' ? 'bg-green-900 text-green-200'
                : 'bg-red-900 text-red-200'
              }`}
            >
              <strong>Verdict:</strong> {verdict.verdict}
              {verdict.verdict === 'Accepted' && (
                <div>All test cases passed ✅</div>
              )}
              {verdict.verdict === 'Wrong Answer' && (
                <div>
                  ❌ Failed on case {verdict.failedCase}<br />
                  Expected: {verdict.expected}<br />
                  Actual: {verdict.actual}
                </div>
              )}
              {verdict.verdict === 'Compilation Error' && (
                <div>
                  ❌ Compilation Error:<br />{verdict.message}
                </div>
              )}
              {verdict.verdict === 'Time Limit Exceeded' && (
                <div>⏳ Time Limit Exceeded on case {verdict.failedCase}</div>
              )}
              {verdict.verdict === 'Error' && (
                <div>⚠️ {verdict.message}</div>
              )}
            </div>
          )}

          {/* Code Output */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Output</label>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg min-h-[100px] font-mono whitespace-pre-wrap overflow-auto shadow-inner">
              {output || 'Your output will appear here.'}
            </div>
          </div>

          {/* AI Feedback */}
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">AI Feedback</label>
            <div className="bg-gray-900 text-yellow-300 p-4 rounded-lg min-h-[100px] font-mono whitespace-pre-wrap overflow-auto shadow-inner">
              {aiFeedback || 'AI feedback will appear here.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
