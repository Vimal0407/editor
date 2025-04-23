import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import "./file.css";

const ERROR_START_MARKER = '✖ERROR_START✖';
const ERROR_END_MARKER = '✖ERROR_END✖';

const App = () => {
  const [code, setCode] = useState("print('Hello, world!')");
  const [language, setLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deepSeekCode, setDeepSeekCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [isAwaitingInput, setIsAwaitingInput] = useState(false);
  const [executionId, setExecutionId] = useState(null);

  const languages = { python: 71, javascript: 63, c: 50, "c++": 54, java: 62 };
  
  // Update the runCode function
  const runCode = async (userInput = "") => {
    setLoading(true);
    try {
      const requestData = {
        language_id: languages[language],
        source_code: executionId ? "" : code, // Send code only for the first execution
        stdin: userInput,
        execution_id: executionId, // Use the execution ID if continuing
      };

      const response = await axios.post("http://localhost:8000/run_code/", requestData);

      setOutput((prev) => prev + response.data.output);
      
      if (response.data.requires_input) {
        setExecutionId(response.data.execution_id);
        setIsAwaitingInput(true);
      } else {
        setExecutionId(null);
        setIsAwaitingInput(false);
      }

      if (response.data.error) {
        const explanation = await axios.post("http://localhost:8000/explain_error/", {
          error_message: response.data.error
        });
        setDeepSeekCode(explanation.data.explanation);
        setOutput((prev) => prev + `\n<span style="color: red;">${response.data.error}</span>`);
      }
    } catch (error) {
      setOutput((prev) => prev + `\n<span style="color: red;">${error.response?.data?.detail || error.message}</span>`);
      setExecutionId(null);
      setIsAwaitingInput(false);
    } finally {
      setLoading(false);
    }
};

const handleInputKeyPress = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    runCode(input);
    setInput(""); // Clear input field
  }
};

// In the JSX output section:
{showOutput && (
  <div className="io-container slide-in">
    <div className="output-header">
      <h3 className="io-title">💻 Console</h3>
      <button 
        className="close-button"
        onClick={() => {
          setShowOutput(false);
          setIsAwaitingInput(false);
          setExecutionId(null);
          setOutput("");
        }}
      >
        ×
      </button>
    </div>
    <div 
      className="output-content"
      dangerouslySetInnerHTML={{ 
        __html: output
          .replace(new RegExp(ERROR_START_MARKER, 'g'), '<span style="color: #ff4444;">')
          .replace(new RegExp(ERROR_END_MARKER, 'g'), '</span>')
      }}
    />
    {isAwaitingInput && (
      <div className="input-prompt">
        <input
          type="text"
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleInputKeyPress}
          placeholder="Enter input and press Enter to continue..."
          autoFocus
        />
      </div>
    )}
  </div>
)}

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:8000/chatgpt_search/", {
        query: searchQuery,
      });
      setDeepSeekCode(response.data.code || "No code returned.");
    } catch (error) {
      setDeepSeekCode("Error fetching code.");
    }
  };

  const handleTranslate = async () => {
    const langMap = { "c++": "C++", python: "Python", javascript: "JavaScript", c: "C", java: "Java" };
    try {
      const response = await axios.post("http://localhost:8000/translate_code/", {
        source_code: code,
        target_language: langMap[selectedLanguage],
      });
      setDeepSeekCode(response.data.translated_code);
      setShowTranslate(false);
    } catch (error) {
      setDeepSeekCode("Translation error");
    }
  };

  const handleDebug = async () => {
    try {
      const response = await axios.post("http://localhost:8000/debug/", {
        source_code: code,
      });
      setDeepSeekCode(response.data.optimized_code);
    } catch (error) {
      setDeepSeekCode("Debugging error");
    }
  };

  return (
    <div className="app-container">
      <div className="main-grid">
        {/* Compiler Container */}
        <div className="compiler-container">
          <div className="header-section">
            <h2 className="glowing-title">🖥 Code Compiler</h2>
            <div className="top-controls">
              <select
                className="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {Object.keys(languages).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
              <button
                className="run-button"
                onClick={() => {
                  setShowOutput(true);
                  setExecutionId(null);
                  setOutput(""); 
                  runCode();
                }}
                disabled={loading}
              >
                {loading ? <div className="loader"></div> : '▶ Run'}
              </button>
            </div>
          </div>

          <div className="editor-wrapper">
            <Editor
              height="55vh"
              theme="vs-dark"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{ minimap: { enabled: false } }}
            />
          </div>
        </div>

        {/* AI Assistant Container */}
        <div className="ai-container">
          <div className="header-section">
            <h2 className="glowing-title"> FIXER BOT</h2>
            <div className="ai-controls">
              <button
                className={`ai-button ${showSearch ? 'active' : ''}`}
                onClick={() => { 
                  setShowSearch(true); 
                  setShowTranslate(false); 
                }}
              >
                🔍 Search
              </button>
              <button
                className={`ai-button ${showTranslate ? 'active' : ''}`}
                onClick={() => { 
                  setShowTranslate(true); 
                  setShowSearch(false); 
                }}
              >
                🌍 Translate
              </button>
              <button className="ai-button" onClick={handleDebug}>
                🛠 Debug
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="search-box scale-in">
              <input
                type="text"
                className="search-input"
                placeholder="Ask me anything about programming..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="generate-button" onClick={handleSearch}>
                Generate Code
              </button>
            </div>
          )}

          {showTranslate && (
            <div className="translate-box scale-in">
              <select
                className="lang-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {Object.keys(languages).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
              <button className="translate-button" onClick={handleTranslate}>
                Translate Code
              </button>
            </div>
          )}

          <div className="ai-editor-wrapper">
            <Editor
              height="55vh"
              theme="vs-dark"
              language={showTranslate ? selectedLanguage : language}
              value={deepSeekCode}
              options={{ 
                readOnly: true,
                minimap: { enabled: false }
              }}
            />
          </div>
        </div>
      </div>

      {/* Output/Input Container */}
      {showOutput && (
        <div className="io-container slide-in">
          <div className="output-header">
            <h3 className="io-title">💻 Console</h3>
            <button 
              className="close-button"
              onClick={() => {
                setShowOutput(false);
                setIsAwaitingInput(false);
                setExecutionId(null);
                setOutput("");
              }}
            >
              ×
            </button>
          </div>
          <div 
            className="output-content"
            dangerouslySetInnerHTML={{ 
              __html: output
                .replace(new RegExp(ERROR_START_MARKER, 'g'), '<span style="color: #ff4444;">')
                .replace(new RegExp(ERROR_END_MARKER, 'g'), '</span>')
            }}
          />
          {isAwaitingInput && (
            <div className="input-prompt">
              <input
                type="text"
                className="input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleInputKeyPress}
                placeholder="Enter input and press Enter to continue..."
                autoFocus
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;