// Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Chatbot = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/chat', {
                prompt
            });
            setResponse(res.data.response);
        } catch (error) {
            console.error('Error fetching response:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='chatbot w-full max-w-md'>
            <h2 className="text-xl font-semibold mb-4">Chat with the Bot</h2>
            <form className='bg-white shadow-lg rounded-lg p-6' onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <label htmlFor='prompt' className='block text-gray-700 font-semibold mb-2'>Ask the Chatbot:</label>
                    <input
                        id='prompt'
                        type='text'
                        className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your question...'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>

                <button
                    type='submit'
                    className='btn bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out'
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>
                {error && <p className='text-red-600 mt-4'>{error}</p>}
            </form>
            {response && (
                <div className='response-container mt-6'>
                    <p className='text-gray-600 text-xl text-center'>
                        <strong>Chatbot Response:</strong> {response}
                    </p>
                </div>
            )}
            <div className='mt-4'>
                <Link to='/translator' className='text-blue-600 hover:underline'>Go to Translator</Link>
            </div>
        </div>
    );
};

export default Chatbot;
