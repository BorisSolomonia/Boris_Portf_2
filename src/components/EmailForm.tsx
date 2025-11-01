
import { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        mode: 'no-cors', // Note: no-cors mode means you won't get a response back
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Since we're using no-cors, we can't check the response status.
      // We'll assume it was successful and trigger the download.
      setIsSubmitted(true);
      const link = document.createElement('a');
      link.href = '/installers/mcp_installer.exe';
      link.download = 'mcp_installer.exe';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <p className="text-lg text-green-700">Thank you! Your download should start automatically.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex items-center border-b border-renaissance-gold py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="email"
          placeholder="Enter your email to download"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="flex-shrink-0 bg-renaissance-gold hover:bg-renaissance-gold-dark border-renaissance-gold hover:border-renaissance-gold-dark text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Download'}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </form>
  );
};

export default EmailForm;
