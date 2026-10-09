import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  Compass,
  Home,
  IndianRupee,
  Leaf,
  MapPin,
  Menu,
  Moon,
  MoveUpRight,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'

const properties = [
  { id: 1, city: 'Mumbai', area: 'Bandra West', name: 'Sora House', type: 'Apartment', price: '₹4.8 Cr', beds: 3, baths: 3, size: '1,860 sq ft', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=78' },
  { id: 2, city: 'Mumbai', area: 'Worli', name: 'Sea Glass Residence', type: 'Penthouse', price: '₹8.2 Cr', beds: 4, baths: 4, size: '2,740 sq ft', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=78' },
  { id: 3, city: 'Bengaluru', area: 'Indiranagar', name: 'Mori Courtyard', type: 'Villa', price: '₹3.6 Cr', beds: 4, baths: 4, size: '3,100 sq ft', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=78' },
  { id: 4, city: 'Bengaluru', area: 'Whitefield', name: 'Pine & Stone', type: 'Apartment', price: '₹1.9 Cr', beds: 3, baths: 2, size: '1,740 sq ft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=78' },
  { id: 5, city: 'Delhi', area: 'Vasant Vihar', name: 'Amai Villa', type: 'Villa', price: '₹7.4 Cr', beds: 5, baths: 5, size: '4,200 sq ft', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=78' },
  { id: 6, city: 'Gurugram', area: 'Golf Course Road', name: 'Line House 08', type: 'Apartment', price: '₹3.1 Cr', beds: 3, baths: 3, size: '2,250 sq ft', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=78' },
  { id: 7, city: 'Pune', area: 'Koregaon Park', name: 'The Quiet Palm', type: 'Villa', price: '₹2.8 Cr', beds: 3, baths: 3, size: '2,460 sq ft', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=78' },
  { id: 8, city: 'Hyderabad', area: 'Jubilee Hills', name: 'Terra House', type: 'Villa', price: '₹5.5 Cr', beds: 4, baths: 5, size: '3,850 sq ft', image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1200&q=78' },
  { id: 9, city: 'Goa', area: 'Assagao', name: 'Casa Nami', type: 'Holiday home', price: '₹4.2 Cr', beds: 4, baths: 4, size: '3,300 sq ft', image: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1200&q=78' },
]

const citySuggestions = ['Mumbai', 'Bengaluru', 'Delhi', 'Gurugram', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Goa']

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="envSites home">
      <span className="brand-mark"><span /></span>
      <span>envSites</span>
    </a>
  )
}

function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false)
  const links = ['Home', 'About', 'Near You', 'Placed', 'Contact']

  return (
    <header className="nav-shell">
      <nav className="nav glass" aria-label="Main navigation">
        <Brand />
        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setOpen(false)}>{item}</a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="nav-cta" href="#placed">List a place <ArrowRight size={15} /></a>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </div>
      </nav>
    </header>
  )
}

function Hero({ onSearch }) {
  const [city, setCity] = useState('Mumbai')
  const [type, setType] = useState('Buy')

  return (
    <section id="home" className="hero section">
      <div className="hero-copy reveal">
        <div className="eyebrow"><span>住</span> Thoughtful homes, across India</div>
        <h1>Find a place<br />that feels <em>right.</em></h1>
        <p className="hero-lede">A quieter, clearer way to discover exceptional homes. Curated locations, verified places, and people-first guidance.</p>
        <form className="search-panel glass" onSubmit={(e) => { e.preventDefault(); onSearch(city, type) }}>
          <div className="search-mode" role="group" aria-label="Property intent">
            {['Buy', 'Rent', 'Sell'].map((item) => <button type="button" className={type === item ? 'active' : ''} onClick={() => setType(item)} key={item}>{item}</button>)}
          </div>
          <div className="search-row">
            <label>
              <span>Where in India?</span>
              <div className="input-with-icon"><MapPin size={17} /><input list="hero-cities" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" /></div>
            </label>
            <datalist id="hero-cities">{citySuggestions.map((c) => <option key={c} value={c} />)}</datalist>
            <button className="search-button" type="submit"><Search size={18} /><span>Explore</span></button>
          </div>
        </form>
        <div className="trust-line">
          <span><Check size={14} /> Verified listings</span>
          <span><Check size={14} /> No hidden noise</span>
        </div>
      </div>
      <div className="hero-visual reveal delay-1">
        <img src="/hero-home.jpg" width="1880" height="840" alt="Contemporary home with warm stone, timber screens and a reflecting pool" fetchPriority="high" />
        <div className="hero-number">01</div>
        <div className="floating-card glass">
          <span>Featured place</span>
          <strong>Aranya House</strong>
          <small>Alibaug · Maharashtra</small>
          <a href="#near-you" aria-label="See featured place"><ArrowDownRight size={20} /></a>
        </div>
        <div className="scroll-cue"><span>Scroll to discover</span><div /></div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about section section-pad">
      <div className="section-kicker reveal"><span>02</span> Our approach</div>
      <div className="about-grid">
        <div className="reveal">
          <h2>Less searching.<br /><em>More belonging.</em></h2>
        </div>
        <div className="about-copy reveal delay-1">
          <p>envSites pairs local understanding with calm technology. We remove clutter so you can notice what matters: the morning light, the neighbourhood rhythm, and whether a place truly fits your life.</p>
          <a className="text-link" href="#contact">Our promise <ArrowRight size={16} /></a>
        </div>
      </div>
      <div className="principles">
        {[
          [Compass, 'Local by design', 'Useful area context, shaped around how Indian cities are actually lived.'],
          [ShieldCheck, 'Verified first', 'Clear property information and a thoughtful registration process.'],
          [Leaf, 'Calm technology', 'Fast, accessible interactions without the visual noise.'],
        ].map(([Icon, title, desc], index) => (
          <article className={`principle reveal delay-${index}`} key={title}>
            <div className="principle-top"><Icon /><span>0{index + 1}</span></div>
            <h3>{title}</h3><p>{desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PropertyCard({ property, index }) {
  return (
    <article className={`property-card reveal delay-${index % 3}`}>
      <div className="property-image">
        <img src={property.image} alt={`${property.name} in ${property.area}`} loading="lazy" width="760" height="560" />
        <span className="property-type glass">{property.type}</span>
        <button aria-label={`Save ${property.name}`}><Sparkles size={17} /></button>
      </div>
      <div className="property-info">
        <div><span>{property.area}, {property.city}</span><h3>{property.name}</h3></div>
        <strong>{property.price}</strong>
      </div>
      <div className="property-meta">
        <span><BedDouble size={15} /> {property.beds} beds</span>
        <span><Bath size={15} /> {property.baths} baths</span>
        <span><Ruler size={15} /> {property.size}</span>
      </div>
    </article>
  )
}

function NearYou({ externalCity, externalType }) {
  const [city, setCity] = useState(externalCity || 'Mumbai')
  const [query, setQuery] = useState(externalCity || 'Mumbai')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    if (externalCity) {
      setCity(externalCity)
      setQuery(externalCity)
      document.querySelector('#near-you')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [externalCity, externalType])

  const results = useMemo(() => {
    const exact = properties.filter((p) => p.city.toLowerCase() === city.toLowerCase())
    return exact.length ? exact : properties.filter((p) => [p.city, p.area, p.name].some((v) => v.toLowerCase().includes(city.toLowerCase())))
  }, [city])

  const displayed = showAll ? properties : results

  return (
    <section id="near-you" className="near section-pad">
      <div className="near-head reveal">
        <div>
          <div className="section-kicker light"><span>03</span> Near you</div>
          <h2>Best places,<br />closer than you think.</h2>
        </div>
        <form className="city-search" onSubmit={(e) => { e.preventDefault(); setCity(query.trim()); setShowAll(false) }}>
          <label htmlFor="city-search">Enter your city in India</label>
          <div><input id="city-search" list="cities" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Pune" /><button aria-label="Search city"><ArrowRight /></button></div>
          <datalist id="cities">{citySuggestions.map((c) => <option value={c} key={c} />)}</datalist>
        </form>
      </div>
      <div className="result-bar">
        <p>{displayed.length ? <>Showing {displayed.length} place{displayed.length !== 1 && 's'} {showAll ? 'across India' : <>in <strong>{city}</strong></>}</> : <>No exact match in <strong>{city}</strong> yet.</>}</p>
        {!showAll && <button onClick={() => setShowAll(true)}>View all places <ArrowRight size={15} /></button>}
      </div>
      <div className="property-grid">
        {displayed.length ? displayed.map((item, index) => <PropertyCard property={item} index={index} key={item.id} />) : (
          <div className="empty-state glass"><MapPin /><h3>We’re still mapping {city}.</h3><p>See our India-wide collection while we add more local places.</p><button onClick={() => setShowAll(true)}>Explore all homes</button></div>
        )}
      </div>
    </section>
  )
}

function Placed() {
  const [view, setView] = useState('sell')
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('envsites-listings') || '[]'))
  const [success, setSuccess] = useState(false)

  function submit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const listing = { id: Date.now(), owner: form.get('owner'), phone: form.get('phone'), city: form.get('city'), kind: form.get('kind') }
    const next = [...saved, listing]
    localStorage.setItem('envsites-listings', JSON.stringify(next))
    setSaved(next); setSuccess(true); e.currentTarget.reset()
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <section id="placed" className="placed section-pad">
      <div className="placed-wrap">
        <div className="placed-copy reveal">
          <div className="section-kicker"><span>04</span> Placed</div>
          <h2>Your place.<br /><em>Well placed.</em></h2>
          <p>Register a home for sale in a few considered steps. We’ll review the details, understand your goals, and help shape a listing that feels honest.</p>
          <div className="placed-stat"><strong>{String(128 + saved.length).padStart(3, '0')}</strong><span>homes thoughtfully<br />placed this season</span></div>
        </div>
        <div className="listing-panel glass reveal delay-1">
          <div className="panel-tabs">
            <button className={view === 'sell' ? 'active' : ''} onClick={() => setView('sell')}>Place for sale</button>
            <button className={view === 'registered' ? 'active' : ''} onClick={() => setView('registered')}>Registered <span>{saved.length}</span></button>
          </div>
          {view === 'sell' ? (
            <form className="listing-form" onSubmit={submit}>
              <div className="form-intro"><Building2 /><div><h3>Tell us about your place</h3><p>Only the essentials to get started.</p></div></div>
              <label><span>Your name</span><input name="owner" required placeholder="Full name" /></label>
              <div className="form-split">
                <label><span>Phone</span><input name="phone" required inputMode="tel" pattern="[0-9+ -]{8,15}" placeholder="+91 98765 43210" /></label>
                <label><span>City</span><input name="city" required list="sell-cities" placeholder="City" /></label>
              </div>
              <datalist id="sell-cities">{citySuggestions.map((c) => <option key={c} value={c} />)}</datalist>
              <label><span>Property type</span><div className="select-wrap"><select name="kind" defaultValue="Apartment"><option>Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option></select><ChevronDown size={16} /></div></label>
              <button className="primary-button" type="submit">Register my place <ArrowRight size={17} /></button>
              {success && <div className="success"><Check size={16} /> Place registered. We’ll be in touch.</div>}
            </form>
          ) : (
            <div className="registered-list">
              {saved.length ? saved.map((item) => <div key={item.id}><span><Home size={17} /></span><div><strong>{item.kind} in {item.city}</strong><small>Registered by {item.owner}</small></div><Check size={16} /></div>) : <div className="empty-mini"><Building2 /><h3>No places registered yet</h3><p>Your submitted places will appear here on this device.</p><button onClick={() => setView('sell')}>Register a place</button></div>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [intent, setIntent] = useState('buy')
  const [sent, setSent] = useState(false)
  function submit(e) { e.preventDefault(); setSent(true); e.currentTarget.reset(); setTimeout(() => setSent(false), 4500) }

  return (
    <section id="contact" className="contact section-pad">
      <div className="contact-orb orb-one" /><div className="contact-orb orb-two" />
      <div className="contact-inner">
        <div className="contact-head reveal">
          <div className="section-kicker light"><span>05</span> Contact</div>
          <h2>Let’s find your<br /><em>next place.</em></h2>
          <p>Buying or selling, begin with a simple conversation.</p>
        </div>
        <form className="contact-form glass reveal delay-1" onSubmit={submit}>
          <div className="intent-toggle"><button type="button" className={intent === 'buy' ? 'active' : ''} onClick={() => setIntent('buy')}>I want to buy</button><button type="button" className={intent === 'sell' ? 'active' : ''} onClick={() => setIntent('sell')}>I want to sell</button></div>
          <div className="form-split"><label><span>Name</span><input required placeholder="Your name" /></label><label><span>Email</span><input required type="email" placeholder="you@example.com" /></label></div>
          <label><span>{intent === 'buy' ? 'What are you looking for?' : 'Tell us about your property'}</span><textarea required rows="4" placeholder={intent === 'buy' ? 'City, budget, and the kind of home…' : 'Location, property type, and anything we should know…'} /></label>
          <button className="primary-button inverse" type="submit">Send enquiry <MoveUpRight size={17} /></button>
          {sent && <div className="success dark"><Check size={16} /> Thank you. Your {intent} enquiry is ready for follow-up.</div>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return <footer><Brand /><p>Spaces with intention. Places with feeling.</p><div><a href="#about">About</a><a href="#near-you">Explore</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} envSites</small></footer>
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('envsites-theme') === 'dark')
  const [search, setSearch] = useState({ city: '', type: '' })

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('envsites-theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      <main>
        <Hero onSearch={(city, type) => {
          if (type === 'Sell') document.querySelector('#placed')?.scrollIntoView({ behavior: 'smooth' })
          else setSearch({ city, type })
        }} />
        <About />
        <NearYou externalCity={search.city} externalType={search.type} />
        <Placed />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
