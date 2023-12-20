import React, { useState } from 'react';
import './App.css';



function App() {
  const [uploadFile, setUploadFile] = useState(null);
  const [authFile, setAuthFile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [authMessage, setAuthMessage] = useState('');
  const [isUploadMode, setIsUploadMode] = useState(true);

  const handleUploadFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleAuthFileChange = (e) => {
    setAuthFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!uploadFile || !firstName || !lastName) {
      setUploadMessage('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setUploadMessage(data.message || data.error || 'Uploaded Successfully');
      setUploadFile(null);
    } catch (error) {
      console.error(error);
      setUploadMessage('Error uploading file');
    }
  };

  const handleAuth = async () => {
    if (!authFile) {
      setAuthMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('objectKey', authFile);

    try {
      const response = await fetch('http://localhost:5000/auth', {
        method: 'POST',
        body: formData,
      });
      const data = await response.text();
      setAuthMessage(data || 'Authentication failed');
    } catch (error) {
      console.error(error);
      setAuthMessage('Error authenticating');
    }
  };


  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <button
        onClick={() => setIsUploadMode(true)}
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: isUploadMode ? '#5cb85c' : '#ffffff',
          color: isUploadMode ? '#ffffff' : '#333333',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          outline: 'none',
        }}
      >
        Registration
      </button>
      <button
        onClick={() => setIsUploadMode(false)}
        style={{
          padding: '10px 20px',
          margin: '10px',
          backgroundColor: !isUploadMode ? '#d9534f' : '#ffffff',
          color: !isUploadMode ? '#ffffff' : '#333333',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          outline: 'none',
        }}
      >
        Authentication
      </button>

      {isUploadMode ? (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ margin: '10px 0' }}>Registratioin Details</h2>
          <input
            type="file"
            onChange={handleUploadFileChange}
            style={{ margin: '5px 0' }}
          />
          <br />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ margin: '5px 0' }}
          />
          <br />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ margin: '5px 0' }}
          />
          <br />
          <button
            onClick={handleUpload}
            style={{
              padding: '8px 16px',
              margin: '10px 0',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              outline: 'none',
            }}
          >
            Register
          </button>
          <p>{uploadMessage}</p>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ margin: '10px 0' }}>Authentication Detail</h2>
          <input
            type="file"
            onChange={handleAuthFileChange}
            style={{ margin: '5px 0' }}
          />
          <br />
          <button
            onClick={handleAuth}
            style={{
              padding: '8px 16px',
              margin: '10px 0',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              outline: 'none',
            }}
          >
            Authenticate
          </button>
          <p>{authMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
