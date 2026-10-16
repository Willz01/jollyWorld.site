import { useState } from 'react'
import { SITE } from '../data/site'

// Sends form data to SITE.email through FormSubmit (no backend needed).
// First submission: FormSubmit emails an activation link to SITE.email. Click it once.
export function useSubmit() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function submit(payload) {
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _template: 'table', _captcha: 'false', ...payload })
      })
      const data = await res.json().catch(() => ({}))
      const ok = res.ok && (data.success === true || data.success === 'true')
      setStatus(ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return { status, submit, reset: () => setStatus('idle') }
}
