import { useState } from 'react';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">Contact Us</h1>
          <p className="text-gray-400">Have questions or need help? Get in touch with us.</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-amber-400 mb-2" htmlFor="name">Name</label>
            <input
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-amber-400 mb-2" htmlFor="email">Email</label>
            <input
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-amber-400 mb-2" htmlFor="message">Message</label>
            <textarea
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400 to-amber-900 hover:bg-amber-600 text-white text-lg font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
