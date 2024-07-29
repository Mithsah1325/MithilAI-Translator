// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chatbot from './component/Chatbot';
import Translator from './component/Translator';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/chatbot" element={<Chatbot />} />
                    <Route path="/translator" element={<Translator />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
