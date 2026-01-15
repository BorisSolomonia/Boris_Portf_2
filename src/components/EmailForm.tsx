import { useState } from 'react'

const EmailForm = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Google Form details
  const GOOGLE_FORM_ID = '1FAIpQLSdwLZpcPqi5s9tBslSktQQy0O9ybcSq1WgoNIou3clHSOzMQg'
  const EMAIL_ENTRY_ID = 'entry.893338415'

  const triggerDownload = () => {
    const installerPath = import.meta.env.VITE_INSTALLER_PATH || '/installers/RS-Waybill-MCP-Setup.exe'

    const link = document.createElement('a')
    link.href = installerPath
    link.download = 'RS-Waybill-MCP-Setup.exe'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Construct Google Form submission URL
    const formUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`

    // Create form data
    const formData = new URLSearchParams()
    formData.append(EMAIL_ENTRY_ID, trimmedEmail)

    try {
      // Submit to Google Forms using no-cors mode
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })

      // Always consider it successful (no-cors does not provide response details)
      setIsSubmitted(true)
      triggerDownload()
    } catch (err) {
      setError('We could not save your email, but the download should still start.')
      triggerDownload()
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <p className="text-lg text-renaissance-green font-sans-elegant">
          Thank you. Your download should start automatically.
        </p>
        <p className="text-sm text-renaissance-brown/70 mt-2">
          Email saved successfully.
        </p>
        {error && (
          <p className="text-sm text-amber-700 mt-2">{error}</p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row items-stretch gap-3 bg-white/80 border border-renaissance-gold/30 rounded-full px-3 py-2 shadow-sm">
        <label className="sr-only" htmlFor="email-download">
          Email address
        </label>
        <input
          id="email-download"
          className="appearance-none bg-transparent border-none w-full text-renaissance-brown px-3 py-2 leading-tight focus:outline-none"
          type="email"
          placeholder="Enter your email to download"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button
          className="flex-shrink-0 bg-renaissance-gold text-renaissance-brown border border-renaissance-gold text-sm px-5 py-2 rounded-full font-semibold hover:bg-renaissance-brown hover:text-renaissance-cream transition-colors disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Download'}
        </button>
      </div>
      {error && (
        <p className="text-xs text-amber-700 mt-2 text-center" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}

export default EmailForm
