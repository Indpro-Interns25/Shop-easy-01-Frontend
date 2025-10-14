import { useEffect, useState } from 'react';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'failed'>('testing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/test');
        if (response.ok) {
          const data = await response.json();
          setConnectionStatus('connected');
          setMessage(data.message);
        } else {
          throw new Error('Connection failed');
        }
      } catch {
        setConnectionStatus('failed');
        setMessage('Backend connection failed');
      }
    };

    testConnection();
  }, []);

  if (connectionStatus === 'testing') {
    return (
      <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
        Testing backend connection...
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
      connectionStatus === 'connected' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      {message}
    </div>
  );
};

export default ConnectionTest;