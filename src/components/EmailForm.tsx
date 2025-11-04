import { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Google Form details
  const GOOGLE_FORM_ID = '1FAIpQLSdwLZpcPqi5s9tBslSktQQy0O9ybcSq1WgoNIou3clHSOzMQg';
  const EMAIL_ENTRY_ID = 'entry.893338415';

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

    console.log('🚀 === GOOGLE FORM SUBMISSION STARTED ===');
    console.log('📧 Email:', email);

    // Construct Google Form submission URL
    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
    console.log('📤 Submitting to:', formUrl);

    // Create form data
    const formData = new URLSearchParams();
    formData.append(EMAIL_ENTRY_ID, email);

    try {
      // Submit to Google Forms using no-cors mode
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // Important! This prevents CORS errors
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      console.log('✅ Form submitted to Google Forms');
      console.log('✅ Email should be saved to Google Sheets');

      // Always consider it successful (no-cors doesn't give us response)
      setIsSubmitted(true);
      triggerDownload();

      console.log('🏁 === GOOGLE FORM SUBMISSION COMPLETED ===');
    } catch (err) {
      console.error('❌ Form submission error:', err);
      // Even if error, still download (fallback behavior)
      triggerDownload();
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
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
    </form>
  );
};

export default EmailForm;
