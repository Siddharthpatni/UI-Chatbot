import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Chatbot from './Chatbot';
import ApiSettings from './ApiSettings'; // Assuming a component for setting the API
import WebSearch from './components/WebSearch';
import DocumentQA from './components/DocumentQA';
import PromptTemplates from './components/PromptTemplates';
import ModelSwitcher from './components/ModelSwitcher';
import ExportChat from './components/ExportChat';
import CodeAssistant from './components/CodeAssistant';
import Collaboration from './components/Collaboration';
import { AuthProvider } from './components/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/api" element={<ApiSettings />} />
        <Route path="/web-search" element={<WebSearch />} />
        <Route path="/document-qa" element={<DocumentQA />} />
        <Route path="/prompt-templates" element={<PromptTemplates />} />
        <Route path="/model-switcher" element={<ModelSwitcher />} />
        <Route path="/export-chat" element={<ExportChat />} />
        <Route path="/code-assistant" element={<CodeAssistant />} />
        <Route path="/collaboration" element={<Collaboration />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
