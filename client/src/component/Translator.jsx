// Translator.js
import React, { useState } from 'react';
import axios from 'axios';

const Translator = () => {
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('mai');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTranslate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/translate', {
                sourceLang,
                targetLang,
                text: sourceText
            });
            setTranslatedText(res.data.translatedText);
        } catch (error) {
            console.error('Error translating text:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='translator flex flex-col items-center p-6 min-h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-white border border-gray-200'>
            <h1 className="title text-3xl font-bold text-gray-800 mb-6">Translation App</h1>
            <form className='form w-full max-w-md bg-white shadow-lg rounded-lg p-6' onSubmit={handleTranslate}>
                <div className="form-group mb-4">
                    <label htmlFor='sourceText' className='block text-gray-700 font-semibold mb-2'>Text to Translate:</label>
                    <textarea
                        id='sourceText'
                        className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter text to translate...'
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        rows="4"
                    />
                </div>

                <div className='form-group mb-4'>
                    <label htmlFor='sourceLang' className='block text-gray-700 font-semibold mb-2'>Source Language:</label>
                    <select
                        id='sourceLang'
                        className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="mai">Maithili</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>

                <div className='form-group mb-4'>
                    <label htmlFor='targetLang' className='block text-gray-700 font-semibold mb-2'>Target Language:</label>
                    <select
                        id='targetLang'
                        className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="mai">Maithili</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>

                <div className='btn-container flex justify-center'>
                    <button
                        type='submit'
                        className='btn bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out'
                        disabled={loading}
                    >
                        {loading ? 'Translating...' : 'Translate'}
                    </button>
                </div>
            </form>
            <div className='response-container mt-6 w-full max-w-md'>
                {error && <p className='text-red-600 text-center mb-4'>{error}</p>}
                <div className='p-4 bg-white border-gray-200 rounded-lg shadow-lg'>
                    <p className='text-gray-600 text-xl text-center'>
                        {translatedText || "Your translation will appear here..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Translator;
