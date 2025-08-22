import React, { useEffect, useRef, useState } from 'react';

const WS_URL = 'ws://localhost:4000'; // Update this if your backend is on a different host

function App() {
  const [soupCount, setSoupCount] = useState(0);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new window.WebSocket(WS_URL);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (typeof data.soupCount === 'number') {
        setSoupCount(data.soupCount);
      }
    };

    ws.current.onclose = () => {
      // Optionally implement reconnect logic
    };

    return () => {
      ws.current && ws.current.close();
    };
  }, []);

  const handleIncrement = () => {
    ws.current && ws.current.send('increment');
  };

  return (
    <div style={{
      textAlign: 'center',
      marginTop: 80,
      fontFamily: 'sans-serif'
    }}>
      <h1>🥣 Soup Counter</h1>
      <div style={{ fontSize: 72, margin: '40px 0' }}>{soupCount}</div>
      <button
        onClick={handleIncrement}
        style={{
          fontSize: 32,
          padding: '0.5em 2em',
          cursor: 'pointer',
          borderRadius: 12,
          background: '#ffb347',
          border: 'none'
        }}
      >
        Add Soup!
      </button>
    </div>
  );
}

export default App;