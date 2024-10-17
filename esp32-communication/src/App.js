import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [Ip, setip] = useState('');
  const sendMessage = async () => {
    try {
      const response = await axios.post(Ip, {
        message: message,
      });
    } catch (error) {
      console.error('Error sending message:', error);
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
          onChange={(e) => setip(e.target.value)}
          placeholder="Ip adress ..."
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button className='set-ip-btn' onClick={sendMessage}>Enviar</button>
      </div>
      <div className="footer">
        <h3><a href="https://github.com/La-Salle-Florida/Logger-ESP32" className="custom-link">La Salle Florida Robotics Team</a></h3>
        <p>Designed By <a href="https://github.com/L0R3NZ0-L30Z" className="custom-link">Lorenzo Leoz</a></p>
      </div>
    </div>
  );
}

export default App;
