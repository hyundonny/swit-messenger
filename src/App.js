import ChatPage from 'pages/chat';
import LoginPage from 'pages/login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
