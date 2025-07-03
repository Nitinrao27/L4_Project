import { useState } from 'react';

export default function Run() {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleRun = async () => {
    setAiFeedback('');
    if (!code.trim()) {
      alert('Please enter some code!');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code, input }),
      });

      const data = await res.json();
      setOutput(data.output || data.error || 'Unknown response from server.');
    } catch {
      setOutput('Error connecting to server.');
    }

    setLoading(false);
  };

  const handleAiFeedback = async () => {
    if (!code.trim()) {
      alert('Please enter some code to get feedback!');
      return;
    }

    setLoadingAi(true);
    setAiFeedback('');

    try {
      const res = await fetch('http://localhost:5000/ai-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (data.aiResponse) {
        setAiFeedback(data.aiResponse);
      } else {
        setAiFeedback(data.error || 'Unknown response from server.');
      }
    } catch {
      setAiFeedback('Error connecting to server.');
    }

    setLoadingAi(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Online Compiler with AI Review</h1>

      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-6xl flex flex-col md:flex-row gap-6">

        {/* LEFT COLUMN */}
        <div className="flex-1 space-y-6">
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

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Input (optional)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your program input here"
              className="w-full h-40 border border-gray-300 rounded-lg px-3 py-2 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your code here"
              className="w-full h-64 border border-gray-300 rounded-lg px-3 py-2 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <button
              onClick={handleRun}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition duration-200"
            >
              {loading ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={handleAiFeedback}
              disabled={loadingAi}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition duration-200"
            >
              {loadingAi ? 'Getting AI Feedback...' : 'Get AI Feedback'}
            </button>
          </div>

          {/* Output */}
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
