'use client';

import { useState } from 'react';

const homeworks = [
  '03-css.html',
  '04-css.html',
  '05-news.html',
  '06-css.html',
  '06.html',
  '07-css.html',
  '08.html',
  'index.html',
];

export default function HomePage() {
  const [selectedHomework, setSelectedHomework] = useState(homeworks[0]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '250px', borderRight: '1px solid #eaeaea', padding: '20px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Homeworks</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {homeworks.map((hw) => (
            <li key={hw} style={{ marginBottom: '10px' }}>
              <button 
                onClick={() => setSelectedHomework(hw)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: 'none',
                  background: selectedHomework === hw ? '#0070f3' : '#fafafa',
                  color: selectedHomework === hw ? 'white' : 'black',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                {hw}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1, padding: '20px' }}>
        {selectedHomework ? (
          <iframe
            src={`/html/${selectedHomework}`}
            title={selectedHomework}
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <p>Select a homework to view.</p>
        )}
      </main>
    </div>
  );
}