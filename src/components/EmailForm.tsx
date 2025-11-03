
import { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [downloadedWithoutEmail, setDownloadedWithoutEmail] = useState(false);

  const triggerDownload = () => {
    console.log('📥 Triggering download...');
    const installerPath = import.meta.env.VITE_INSTALLER_PATH || '/installers/RS-Waybill-MCP-Setup.exe';
    console.log('📥 Download path:', installerPath);

    const link = document.createElement('a');
    link.href = installerPath;
    link.download = 'RS-Waybill-MCP-Setup.exe';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log('✅ Download link clicked');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    console.log('🚀 === EMAIL FORM SUBMISSION STARTED ===');
    console.log('📧 Email:', email);

    const endpoint = import.meta.env.VITE_SUBSCRIBE_ENDPOINT?.trim();
    console.log('🌐 Endpoint:', endpoint);
    console.log('🔧 Environment check:');
    console.log('  - VITE_SUBSCRIBE_ENDPOINT:', import.meta.env.VITE_SUBSCRIBE_ENDPOINT);
    console.log('  - VITE_INSTALLER_PATH:', import.meta.env.VITE_INSTALLER_PATH);

    if (!endpoint) {
      console.error('❌ Endpoint not configured!');
      setError('Email collection is not configured. Downloading file anyway...');
      triggerDownload();
      setDownloadedWithoutEmail(true);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('📤 Sending POST request to:', endpoint);
      console.log('📦 Payload:', { email });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📨 Response status:', response.status);
      console.log('📨 Response ok:', response.ok);
      console.log('📨 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('📋 Response body:', result);

      if (result.result !== 'success') {
        throw new Error(result.error || 'Unexpected response');
      }

      console.log('✅ Email submitted successfully!');
      setIsSubmitted(true);
      triggerDownload();

    } catch (err) {
      console.error('❌ === EMAIL SUBMISSION FAILED ===');
      console.error('Error details:', err);
      console.error('Error type:', err instanceof TypeError ? 'TypeError (likely CORS or network)' : 'Other error');
      console.error('Error message:', err instanceof Error ? err.message : String(err));

      // Check if it's a CORS error
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        console.error('🚫 CORS ERROR DETECTED!');
        console.error('This means the Google Apps Script is not properly configured.');
        console.error('Please check:');
        console.error('1. Deployment "Who has access" is set to "Anyone"');
        console.error('2. "Execute as" is set to "Me"');
        setError('Email collection unavailable (CORS issue). Starting download anyway...');
      } else {
        setError('Could not save email. Starting download anyway...');
      }

      // Download the file anyway
      console.log('⚠️ Proceeding with download despite email error...');
      triggerDownload();
      setDownloadedWithoutEmail(true);
    } finally {
      setIsSubmitting(false);
      console.log('🏁 === EMAIL FORM SUBMISSION COMPLETED ===');
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <p className="text-lg text-green-700">✅ Thank you! Your download should start automatically.</p>
        <p className="text-sm text-gray-600 mt-2">Email saved successfully.</p>
      </div>
    );
  }

  if (downloadedWithoutEmail) {
    return (
      <div className="text-center">
        <p className="text-lg text-green-700">✅ Your download should start automatically.</p>
        <p className="text-sm text-orange-600 mt-2">Note: Email could not be saved due to a configuration issue.</p>
        <p className="text-xs text-gray-500 mt-1">Check the console for details (F12)</p>
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
      {error && (
        <div className="mt-2">
          <p className="text-orange-600 text-xs italic">{error}</p>
        </div>
      )}
    </form>
  );
};

export default EmailForm;
