import { useState } from 'react';

export default function Run() {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    if (!code.trim()) {
      alert('Please enter some code!');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('http://localhost:5000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, code }),
      });

      const data = await res.json();
      if (data.output) {
        setOutput(data.output);
      } else if (data.error) {
        setOutput(data.error);
      } else {
        setOutput('Unknown response from server.');
      }
    } catch (err) {
      setOutput('Error connecting to server.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Online Compiler</h1>

      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
        {/* Language Selector */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="cpp">C++</option>
            {/* For future: Add more languages here */}
          </select>
        </div>

        {/* Code Editor */}
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Code</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Write your code here"
            className="w-full h-64 border border-gray-300 rounded-lg px-3 py-2 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Run Button */}
        <div className="text-center">
          <button
            onClick={handleRun}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Running...' : 'Run Code'}
          </button>
        </div>

        {/* Output */}
        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Output</label>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg min-h-[100px] font-mono whitespace-pre-wrap">
            {output || 'Your output will appear here.'}
          </div>
        </div>
      </div>
    </div>
  );
}
