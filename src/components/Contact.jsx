import {useEffect, useState} from 'react'
import {SITE} from '../data/site'
import {useSubmit} from '../lib/useSubmit'

const topics = ['General question', 'Bar and event hire', 'Feedback']
const blank = {name: '', email: '', phone: '', subject: 'General question', message: ''}

export default function Contact({topic}) {
    const [f, setF] = useState(blank)
    const {status, submit, reset} = useSubmit()

    useEffect(() => {
        if (topic.stamp) setF((s) => ({...s, subject: topic.value}))
    }, [topic])

    const set = (k) => (e) => setF((s) => ({...s, [k]: e.target.value}))
    const mapSrc = SITE.mapEmbedSrc || `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&z=15&output=embed`

    function onSubmit(e) {
        e.preventDefault()
        submit({
            _subject: `jollyWorld inquiry: ${f.subject}`,
            Name: f.name,
            email: f.email,
            Phone: f.phone,
            Topic: f.subject,
            Message: f.message
        })
    }

    return (
        <section className="section veil" id="contact">
            <div className="wrap">
                <h2>Contact us</h2>
                <p className="lead">{SITE.address}</p>

                <div className="map">
                    <iframe
                        title="jollyWorld location on Google Maps"
                        src={mapSrc}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
                <p className="map__link">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`}
                       target="_blank" rel="noopener noreferrer">
                        Open in Google Maps
                    </a>
                </p>

                <div className="split split--form">
                    <div className="prose">
                        <h3>Visit or call</h3>
                        <p>{SITE.address}</p>
                        <p><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p>
                        <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                    </div>

                    {status === 'sent' ? (
                        <div className="notice notice--ok">
                            <h3>Message sent</h3>
                            <p>Thanks for getting in touch. We will reply as soon as we can.</p>
                            <button className="btn btn--ghost" onClick={() => {
                                reset();
                                setF(blank)
                            }}>Send another message
                            </button>
                        </div>
                    ) : (
                        <form className="form" onSubmit={onSubmit}>
                            <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="sr-only"
                                   aria-hidden="true"/>
                            <div className="row">
                                <label>Full name
                                    <input type="text" required autoComplete="name" value={f.name}
                                           onChange={set('name')}/>
                                </label>
                                <label>Topic
                                    <select value={f.subject} onChange={set('subject')}>
                                        {topics.map((t) => <option key={t}>{t}</option>)}
                                    </select>
                                </label>
                            </div>
                            <div className="row">
                                <label>Email
                                    <input type="email" required autoComplete="email" value={f.email}
                                           onChange={set('email')}/>
                                </label>
                                <label>Phone (optional)
                                    <input type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')}/>
                                </label>
                            </div>
                            <label>Message
                                <textarea rows="5" required value={f.message} onChange={set('message')}/>
                            </label>
                            {status === 'error' && (
                                <p className="notice notice--err" role="alert">
                                    We could not send that. Try again, or email <a
                                    href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                                </p>
                            )}
                            <button className="btn btn--gold" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending…' : 'Send message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
