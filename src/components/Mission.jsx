const pillars = [
    {
        title: 'Rest properly',
        text: 'Every room is cleaned and checked before you arrive. A good night is the whole job.'
    },
    {title: 'Fair, clear prices', text: 'The rate you see is the rate you pay. No surprise charges at the desk.'},
    {
        title: 'A place for people',
        text: 'The bar and event space exist so friends, families and colleagues have somewhere good to gather for any sort of event.'
    },
    {
        title: 'Comfort & Cleanliness',
        text: 'Our rooms are thoughtfully prepared to give you the peace of home.'
    },
    {
        title: 'Everyone first',
        text: 'We are proud to serve both visitors and local idigines alike with no level of discrimation.'
    },
    {
        title: 'Service with soul',
        text: 'Hospitality isn´t our JOB, it´s our JOY.'
    }
]

export default function Mission() {
    return (
        <section className="section veil" id="mission">
            <div className="wrap">
                <h2>Our mission</h2>
                <p>
                    To make Uyo feel like a short walk from home for every guest, whether they are
                    passing through or staying a while.
                </p>
                <div className="pillars">
                    {pillars.map((p) => (
                        <div className="pillar" key={p.title}>
                            <strong>{p.title}</strong>
                            <p>{p.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
