import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('initial');
  useEffect(() => {
    fetch('/test')
      .then(res => res.json())
      .then(data => setStatus(data.status));
  }, [])

  return (
    <div className="App">
      {status}
    </div>
  );
}

export default App;
