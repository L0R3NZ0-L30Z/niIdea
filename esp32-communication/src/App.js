import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [Ip, setIp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ipParam = params.get('ip');
    if (ipParam) {
      setIp(ipParam);
    }
  }, [location]);

  const updateQueryParams = (newIp) => {
    setIp(newIp);
    const params = new URLSearchParams();
    params.set('ip', newIp);
    navigate({ search: params.toString() });
  };

  const sendMessage = async () => {
    try {
      setError(null);
      setSuccess(false);
      const response = await axios.post(Ip, {
        message: message,
      },{
        timeout: 1500,
      });

      if (response.status >= 200 && response.status < 300) {
        setSuccess(true);
      }

      console.log('Message sent:', response.data);
    } catch (error) {
      if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.data || 'An error occurred.'}`);
      } else {
        setError('Error: Could not reach the server.');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className='App'>
      <h1 className="title">Capacidad</h1>

      <div className='distdiv'>
        <input
          className='resize'
          type="text"
          value={Ip}
          onChange={(e) => updateQueryParams(e.target.value)}
          placeholder="IP address ..."
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your message"
        />
        <button className='set-ip-btn' onClick={sendMessage}>Enviar</button>
      </div>
      {(error || success) && (
        <div className='log-container'>
          {error && <div className="log-entry">Problema enviando</div>}
          {success && <div className="log-entry">Recibido correctamente</div>}
        </div>
      )}
      <div className="footer">
        <h3>
          <a href="https://github.com/La-Salle-Florida/Logger-ESP32" className="custom-link">La Salle Florida Robotics Team</a>
        </h3>
        <p>Designed By <a href="https://github.com/L0R3NZ0-L30Z" className="custom-link">Lorenzo Leoz</a></p>
      </div>
    </div>
  );
}

export default App;
