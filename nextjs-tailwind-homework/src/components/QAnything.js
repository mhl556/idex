'use client';

import { useState } from 'react';

export default function QAnything() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    setError(null);

    try {
      // 在这里替换为你的 QAnything API 端点
      const response = await fetch('/api/q-anything', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('网络响应错误');
      }

      const data = await response.json();
      setAnswer(data.answer);

    } catch (err) {
      setError('无法获取回答，请稍后再试。');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">QAnything 问答</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="在这里输入你的问题..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          rows="4"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? '思考中...' : '提问'}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {answer && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-3">回答:</h2>
          <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
}