import { useEffect, useMemo, useRef, useState } from 'react'
import '@photo-sphere-viewer/core/index.css'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import {
  ArrowDownRight, ArrowRight, Bath, BedDouble, Building2, CalendarDays, Check,
  ChevronDown, ChevronRight, CircleCheckBig, Compass, FileCheck2, Heart, Home,
  KeyRound, Mail, MapPin, Menu, Moon, MoveUpRight, Phone, Ruler, Search,
  Rotate3D, ShieldCheck, Sparkles, Sun, Users, X,
} from 'lucide-react'

const properties = [
  { id: 1, city: 'Mumbai', area: 'Bandra West', name: 'Harbour View Residence', type: 'Apartment', price: '₹4.8 Cr', priceValue: 4.8, beds: 3, baths: 3, size: '1,860 sq ft', status: 'Ready to move', facing: 'West facing', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=78', panorama: `${import.meta.env.BASE_URL}harbour-view-360.jpg`, description: 'A light-filled home with a generous balcony, private lift lobby and quiet interiors close to the waterfront.' },
  { id: 2, city: 'Mumbai', area: 'Worli', name: 'Sea Glass Penthouse', type: 'Penthouse', price: '₹8.2 Cr', priceValue: 8.2, beds: 4, baths: 4, size: '2,740 sq ft', status: 'Newly listed', facing: 'Sea view', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=78', description: 'Expansive city and sea views, calm natural finishes and flexible entertaining spaces across one private floor.' },
  { id: 3, city: 'Bengaluru', area: 'Indiranagar', name: 'Garden Court Villa', type: 'Villa', price: '₹3.6 Cr', priceValue: 3.6, beds: 4, baths: 4, size: '3,100 sq ft', status: 'Owner listed', facing: 'Garden view', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=78', description: 'A private urban villa organised around a green courtyard, with a home office and independent guest suite.' },
  { id: 4, city: 'Bengaluru', area: 'Whitefield', name: 'Pine & Stone', type: 'Apartment', price: '₹1.9 Cr', priceValue: 1.9, beds: 3, baths: 2, size: '1,740 sq ft', status: 'Ready to move', facing: 'East facing', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=78', description: 'A practical family apartment with warm finishes, efficient storage and quick access to major work hubs.' },
  { id: 5, city: 'Delhi', area: 'Vasant Vihar', name: 'Banyan Grove Villa', type: 'Villa', price: '₹7.4 Cr', priceValue: 7.4, beds: 5, baths: 5, size: '4,200 sq ft', status: 'Private viewing', facing: 'Park facing', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=78', description: 'A composed family home with landscaped outdoor space, formal living areas and private staff accommodation.' },
  { id: 6, city: 'Gurugram', area: 'Golf Course Road', name: 'The Linear House', type: 'Apartment', price: '₹3.1 Cr', priceValue: 3.1, beds: 3, baths: 3, size: '2,250 sq ft', status: 'Newly listed', facing: 'Golf course view', image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=78', description: 'A contemporary residence with open living, a large utility zone and resident-only wellness amenities.' },
  { id: 7, city: 'Pune', area: 'Koregaon Park', name: 'The Quiet Palm', type: 'Villa', price: '₹2.8 Cr', priceValue: 2.8, beds: 3, baths: 3, size: '2,460 sq ft', status: 'Owner listed', facing: 'South facing', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=78', description: 'A leafy city retreat with an open kitchen, shaded patio and walkable access to the neighbourhood high street.' },
  { id: 8, city: 'Hyderabad', area: 'Jubilee Hills', name: 'Terra House', type: 'Villa', price: '₹5.5 Cr', priceValue: 5.5, beds: 4, baths: 5, size: '3,850 sq ft', status: 'Private viewing', facing: 'Hill view', image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1200&q=78', description: 'A generous hillside home balancing natural stone, planted terraces and distinct spaces for work and family life.' },
  { id: 9, city: 'Goa', area: 'Assagao', name: 'Casa Verde', type: 'Holiday home', price: '₹4.2 Cr', priceValue: 4.2, beds: 4, baths: 4, size: '3,300 sq ft', status: 'Ready to move', facing: 'Forest view', image: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?auto=format&fit=crop&w=1200&q=78', description: 'A private holiday home with a shaded pool court, mature landscape and flexible rental-ready guest rooms.' },
]

const cities = ['Mumbai', 'Bengaluru', 'Delhi', 'Gurugram', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Goa']
const types = ['Any type', 'Apartment', 'Villa', 'Penthouse', 'Holiday home']
const easing = [0.22, 1, 0.36, 1]

function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  return <Component className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={reduce ? {} : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .68, delay, ease: easing }}>{children}</Component>
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: .001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

function Brand() {
  return <a className="brand" href="#home" aria-label="envSites home"><span className="brand-mark"><span /></span><span>envSites</span></a>
}

function Navbar({ dark, setDark, savedCount }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const links = ['Home', 'About', 'Near You', 'How It Works', 'Placed', 'Contact']
  return <header className="nav-shell"><nav className="nav glass" aria-label="Main navigation">
    <Brand />
    <div className="desktop-links">{links.map(item => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}</div>
    <div className="nav-actions">
      <a href="#near-you" className="saved-link" aria-label={`${savedCount} saved homes`}><Heart size={17} />{savedCount > 0 && <span>{savedCount}</span>}</a>
      <button className="icon-button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}><motion.span animate={reduce ? {} : { rotate: dark ? 180 : 0 }}>{dark ? <Sun size={18} /> : <Moon size={18} />}</motion.span></button>
      <a className="nav-cta" href="#placed">List a property <ArrowRight size={15} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>
    <AnimatePresence>{open && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .98 }} transition={{ duration: .22 }}>{links.map((item, i) => <motion.a initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .035 }} key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setOpen(false)}>{item}<ArrowRight size={15} /></motion.a>)}</motion.div>}</AnimatePresence>
  </nav></header>
}

function Hero({ onSearch }) {
  const [city, setCity] = useState('Mumbai')
  const [intent, setIntent] = useState('Buy')
  const [propertyType, setPropertyType] = useState('Any type')
  const reduce = useReducedMotion()
  return <section id="home" className="hero section">
    <motion.div className="hero-copy" initial={reduce ? false : { opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8, ease: easing }}>
      <div className="eyebrow"><Sparkles size={14} /> Thoughtful homes, across India</div>
      <h1>Find a place<br />that feels <em>right.</em></h1>
      <p className="hero-lede">Discover considered homes with clear details, useful local context and a simpler path from first search to final visit.</p>
      <form className="search-panel glass" onSubmit={e => { e.preventDefault(); onSearch({ city, intent, propertyType }) }}>
        <div className="search-mode" role="group" aria-label="Property intent">{['Buy', 'Rent', 'Sell'].map(item => <button type="button" className={intent === item ? 'active' : ''} onClick={() => setIntent(item)} key={item}>{item}</button>)}</div>
        <div className="search-row advanced">
          <label><span>City</span><div className="input-with-icon"><MapPin size={17} /><input list="hero-cities" value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" /></div></label>
          <label className="type-field"><span>Property</span><div className="input-with-icon"><Home size={17} /><select value={propertyType} onChange={e => setPropertyType(e.target.value)}>{types.map(item => <option key={item}>{item}</option>)}</select></div></label>
          <datalist id="hero-cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
          <motion.button whileTap={{ scale: .96 }} className="search-button" type="submit"><Search size={18} /><span>{intent === 'Sell' ? 'List now' : 'Explore'}</span></motion.button>
        </div>
      </form>
      <div className="trust-line"><span><Check size={14} /> Detailed property intake</span><span><Check size={14} /> Human follow-up</span><span><Check size={14} /> No pressure</span></div>
    </motion.div>
    <motion.div className="hero-visual" initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)', opacity: .7 }} animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }} transition={{ duration: 1.05, ease: easing }}>
      <motion.img initial={reduce ? false : { scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: easing }} src={`${import.meta.env.BASE_URL}hero-home.jpg`} width="1880" height="840" alt="Contemporary home with warm stone, timber screens and a reflecting pool" fetchPriority="high" />
      <motion.div className="floating-card glass" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65, duration: .6 }}><span>Featured concept home</span><strong>Aranya House</strong><small>Alibaug · Maharashtra</small><a href="#near-you" aria-label="See property collection"><ArrowDownRight size={20} /></a></motion.div>
      <div className="scroll-cue"><span>Scroll to discover</span><div /></div>
    </motion.div>
  </section>
}

function About() {
  const points = [[Compass, 'Local context', 'Shortlist neighbourhoods around commute, daily needs and the way you actually live.'], [ShieldCheck, 'Clear information', 'Structured property details, ownership context and follow-up questions before a visit.'], [Users, 'People first', 'A real conversation for buyers, sellers and families—without a maze of hand-offs.']]
  return <section id="about" className="about section section-pad">
    <Reveal className="section-kicker">Why envSites</Reveal>
    <div className="about-grid"><Reveal><h2>Less searching.<br /><em>More certainty.</em></h2></Reveal><Reveal className="about-copy" delay={.08}><p>Property decisions carry real weight. envSites organises the journey around accurate information, useful conversations and enough space to decide without pressure.</p><p>Whether you are buying your first apartment, moving cities or selling a family home, every enquiry begins with context—not a sales script.</p><a className="text-link" href="#how-it-works">See how it works <ArrowRight size={16} /></a></Reveal></div>
    <div className="principles">{points.map(([Icon, title, desc], i) => <Reveal as="article" className="principle" delay={i * .08} key={title}><div className="principle-top"><Icon /><span>0{i + 1}</span></div><h3>{title}</h3><p>{desc}</p></Reveal>)}</div>
  </section>
}

function PropertyCard({ property, index, saved, onSave, onOpen }) {
  return <motion.article layout className="property-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .55, delay: (index % 3) * .07, ease: easing }}>
    <motion.div className="property-image" whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}><img src={property.image} alt={`${property.name} in ${property.area}`} loading="lazy" width="760" height="560" /><span className="property-type glass">{property.type}</span><motion.button whileTap={{ scale: .82 }} className={saved ? 'saved' : ''} onClick={() => onSave(property.id)} aria-label={`${saved ? 'Remove' : 'Save'} ${property.name}`}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /></motion.button><button className="view-property" onClick={() => onOpen(property)}>View details <ArrowRight size={15} /></button></motion.div>
    <div className="property-info"><div><span>{property.area}, {property.city}</span><h3>{property.name}</h3></div><strong>{property.price}</strong></div>
    <div className="property-meta"><span><BedDouble size={15} /> {property.beds} beds</span><span><Bath size={15} /> {property.baths} baths</span><span><Ruler size={15} /> {property.size}</span></div>
  </motion.article>
}

function PanoramaViewer({ src, name }) {
  const viewerRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let disposed = false
    let viewer
    setStatus('loading')

    import('@photo-sphere-viewer/core').then(({ Viewer }) => {
      if (disposed || !viewerRef.current) return
      viewer = new Viewer({
        container: viewerRef.current,
        panorama: src,
        navbar: ['zoom', 'move', 'fullscreen'],
        defaultZoomLvl: 28,
        mousewheelCtrlKey: true,
        touchmoveTwoFingers: false,
        lang: { loading: 'Preparing your 360° tour…' },
      })
      viewer.addEventListener('ready', () => !disposed && setStatus('ready'), { once: true })
    }).catch(() => !disposed && setStatus('error'))

    return () => { disposed = true; viewer?.destroy() }
  }, [src])

  return <div className="panorama-shell" aria-label={`Interactive 360 degree tour of ${name}`}>
    <div className="panorama-viewer" ref={viewerRef} />
    <AnimatePresence>{status === 'loading' && <motion.div className="panorama-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.span animate={{ rotate: 360 }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}><Rotate3D /></motion.span><strong>Preparing 360° tour</strong><small>Loading the full room view…</small></motion.div>}</AnimatePresence>
    {status === 'error' && <div className="panorama-loading panorama-error"><strong>Tour could not load</strong><small>Please try again on a WebGL-enabled browser.</small></div>}
    {status === 'ready' && <motion.div className="panorama-hint" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}><Rotate3D size={15} /> Drag to look around · Pinch to zoom</motion.div>}
  </div>
}

function PropertyModal({ property, onClose, saved, onSave, onEnquire }) {
  const [tourOpen, setTourOpen] = useState(false)
  useEffect(() => { const close = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])
  return <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <motion.article className="property-modal" initial={{ opacity: 0, y: 50, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .98 }} transition={{ duration: .35, ease: easing }} role="dialog" aria-modal="true" aria-label={`${property.name} details`}>
      <button className="modal-close" onClick={onClose} aria-label="Close property details"><X /></button><div className={`modal-image${tourOpen ? ' tour-active' : ''}`}>
        <AnimatePresence mode="wait">{tourOpen && property.panorama ? <motion.div className="panorama-layer" key="panorama" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .28 }}><PanoramaViewer src={property.panorama} name={property.name} /></motion.div> : <motion.img key="photo" src={property.image} alt={property.name} initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .28 }} />}</AnimatePresence>
        <span className="status-pill">{tourOpen ? 'Interactive tour' : property.status}</span>
        {property.panorama && <motion.button whileTap={{ scale: .95 }} className="tour-toggle" onClick={() => setTourOpen(current => !current)} aria-pressed={tourOpen}><Rotate3D size={17} /> {tourOpen ? 'Exit 360°' : 'View 360°'}</motion.button>}
      </div>
      <div className="modal-content"><div className="modal-title"><div><span>{property.area}, {property.city}</span><h2>{property.name}</h2></div><strong>{property.price}</strong></div><p>{property.description}</p>
        <div className="modal-facts"><div><BedDouble /><span>Bedrooms<strong>{property.beds}</strong></span></div><div><Bath /><span>Bathrooms<strong>{property.baths}</strong></span></div><div><Ruler /><span>Built-up area<strong>{property.size}</strong></span></div><div><Compass /><span>Aspect<strong>{property.facing}</strong></span></div></div>
        <div className="modal-note"><ShieldCheck /><p><strong>Before you visit</strong><br />A property advisor will confirm availability, ownership details and the exact meeting point.</p></div>
        <div className="modal-actions"><button className="secondary-button" onClick={() => onSave(property.id)}><Heart size={17} fill={saved ? 'currentColor' : 'none'} /> {saved ? 'Saved' : 'Save property'}</button><button className="primary-button" onClick={() => onEnquire(property)}>Request a viewing <CalendarDays size={17} /></button></div>
      </div>
    </motion.article>
  </motion.div>
}

function NearYou({ searchRequest, savedIds, setSavedIds, onEnquire }) {
  const [city, setCity] = useState(searchRequest.city || 'Mumbai'), [query, setQuery] = useState(searchRequest.city || 'Mumbai'), [type, setType] = useState(searchRequest.propertyType || 'Any type'), [budget, setBudget] = useState('Any budget'), [showSaved, setShowSaved] = useState(false), [selected, setSelected] = useState(null)
  useEffect(() => { if (searchRequest.city) { setCity(searchRequest.city); setQuery(searchRequest.city); setType(searchRequest.propertyType || 'Any type') } }, [searchRequest])
  const results = useMemo(() => properties.filter(p => {
    const cityMatch = !city || [p.city, p.area, p.name].some(v => v.toLowerCase().includes(city.toLowerCase()))
    const typeMatch = type === 'Any type' || p.type === type
    const budgetMatch = budget === 'Under ₹2 Cr' ? p.priceValue < 2 : budget === '₹2–5 Cr' ? p.priceValue >= 2 && p.priceValue <= 5 : budget === 'Above ₹5 Cr' ? p.priceValue > 5 : true
    return cityMatch && typeMatch && budgetMatch && (!showSaved || savedIds.includes(p.id))
  }), [city, type, budget, showSaved, savedIds])
  const toggleSaved = id => setSavedIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const reset = () => { setCity(''); setQuery(''); setType('Any type'); setBudget('Any budget'); setShowSaved(false) }
  return <section id="near-you" className="near section-pad">
    <Reveal className="near-head"><div><div className="section-kicker light">Property search</div><h2>Homes that fit<br />your real life.</h2></div><form className="city-search" onSubmit={e => { e.preventDefault(); setCity(query.trim()) }}><label htmlFor="city-search">Enter your city in India</label><div><input id="city-search" list="cities" value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. Pune" /><motion.button whileTap={{ scale: .92 }} aria-label="Search city"><ArrowRight /></motion.button></div><datalist id="cities">{cities.map(c => <option value={c} key={c} />)}</datalist></form></Reveal>
    <div className="filter-bar"><label><span>Property type</span><select value={type} onChange={e => setType(e.target.value)}>{types.map(item => <option key={item}>{item}</option>)}</select></label><label><span>Budget</span><select value={budget} onChange={e => setBudget(e.target.value)}><option>Any budget</option><option>Under ₹2 Cr</option><option>₹2–5 Cr</option><option>Above ₹5 Cr</option></select></label><button className={showSaved ? 'active' : ''} onClick={() => setShowSaved(!showSaved)}><Heart size={16} fill={showSaved ? 'currentColor' : 'none'} /> Saved only {savedIds.length > 0 && `(${savedIds.length})`}</button></div>
    <div className="result-bar"><p>{results.length ? <>Showing {results.length} matching sample place{results.length !== 1 && 's'} near <strong>{city || 'India'}</strong></> : <>No exact match for these filters.</>}</p><button onClick={reset}>Reset filters <ArrowRight size={15} /></button></div>
    <motion.div layout className="property-grid"><AnimatePresence mode="popLayout">{results.length ? results.map((property, i) => <PropertyCard property={property} index={i} key={property.id} saved={savedIds.includes(property.id)} onSave={toggleSaved} onOpen={setSelected} />) : <motion.div className="empty-state glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><MapPin /><h3>No homes match yet.</h3><p>Try a nearby city, a wider budget or a different property type.</p><button onClick={reset}>View all sample homes</button></motion.div>}</AnimatePresence></motion.div>
    <AnimatePresence>{selected && <PropertyModal property={selected} onClose={() => setSelected(null)} saved={savedIds.includes(selected.id)} onSave={toggleSaved} onEnquire={property => { setSelected(null); onEnquire(property) }} />}</AnimatePresence>
  </section>
}

function HowItWorks() {
  const steps = [[Search, 'Share the essentials', 'Tell us your preferred city, budget and the kind of home or buyer you have in mind.'], [FileCheck2, 'Review the details', 'We organise the property information, note open questions and prepare the next useful conversation.'], [CalendarDays, 'Plan a visit', 'Choose a suitable time after availability and location details have been confirmed.'], [KeyRound, 'Move with clarity', 'Keep important follow-ups, documents and decisions in one understandable path.']]
  return <section id="how-it-works" className="process section-pad"><Reveal className="process-head"><div><div className="section-kicker">How it works</div><h2>A clearer path,<br />from interest to action.</h2></div><p>Good property decisions do not need more noise. They need the right detail at the right moment, and a reliable next step.</p></Reveal><div className="process-grid">{steps.map(([Icon, title, copy], i) => <Reveal as="article" className="process-step" delay={i * .07} key={title}><div><Icon /></div><h3>{title}</h3><p>{copy}</p><ChevronRight /></Reveal>)}</div><Reveal className="service-strip"><div><Users /><span><strong>One conversation</strong> to understand the brief</span></div><div><ShieldCheck /><span><strong>Structured follow-up</strong> before visits</span></div><div><CircleCheckBig /><span><strong>Clear status</strong> after every submission</span></div></Reveal></section>
}

const makeRef = prefix => `${prefix}-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`

function Placed() {
  const [view, setView] = useState('sell'), [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem('envsites-listings') || '[]')), [confirmation, setConfirmation] = useState(null)
  function submit(event) {
    event.preventDefault(); const form = new FormData(event.currentTarget)
    const listing = { id: makeRef('LIST'), owner: form.get('owner'), email: form.get('email'), phone: form.get('phone'), city: form.get('city'), locality: form.get('locality'), kind: form.get('kind'), bedrooms: form.get('bedrooms'), price: form.get('price'), timeline: form.get('timeline'), status: 'Review pending', createdAt: new Date().toISOString() }
    const next = [listing, ...saved]; localStorage.setItem('envsites-listings', JSON.stringify(next)); setSaved(next); setConfirmation(listing.id); event.currentTarget.reset()
  }
  return <section id="placed" className="placed section-pad"><div className="placed-word" aria-hidden="true">PLACE</div><div className="placed-wrap">
    <Reveal className="placed-copy"><div className="section-kicker">Sell with envSites</div><h2>Your property.<br /><em>Well presented.</em></h2><p>Start with a structured owner registration. It gives our team enough context to review the property, prepare the right questions and plan a useful call.</p><ul className="check-list"><li><Check /> No listing fee at registration</li><li><Check /> Your contact details stay private</li><li><Check /> Review status saved on this device</li></ul><div className="placed-note"><ShieldCheck /><span>A simple, review-led listing journey</span></div></Reveal>
    <Reveal className="listing-panel glass" delay={.08}><div className="panel-tabs"><button className={view === 'sell' ? 'active' : ''} onClick={() => setView('sell')}>Register property</button><button className={view === 'registered' ? 'active' : ''} onClick={() => setView('registered')}>My submissions <span>{saved.length}</span></button></div>
      <AnimatePresence mode="wait">{view === 'sell' ? <motion.form key="sell-form" className="listing-form" onSubmit={submit} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }}>
        <div className="form-intro"><Building2 /><div><h3>Property owner details</h3><p>Required fields help us prepare the first review.</p></div></div>
        <div className="form-split"><label><span>Owner name *</span><input name="owner" required autoComplete="name" placeholder="Full name" /></label><label><span>Email *</span><input name="email" required type="email" autoComplete="email" placeholder="you@example.com" /></label></div>
        <div className="form-split"><label><span>Phone *</span><input name="phone" required inputMode="tel" autoComplete="tel" pattern="[0-9+ -]{8,15}" placeholder="+91 98765 43210" /></label><label><span>City *</span><input name="city" required list="sell-cities" placeholder="City" /></label></div><datalist id="sell-cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
        <label><span>Locality or project *</span><input name="locality" required placeholder="Neighbourhood or project name" /></label>
        <div className="form-split"><label><span>Property type *</span><div className="select-wrap"><select name="kind" defaultValue="Apartment"><option>Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option></select><ChevronDown size={16} /></div></label><label><span>Bedrooms</span><div className="select-wrap"><select name="bedrooms" defaultValue="3"><option>Studio</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option><option>Not applicable</option></select><ChevronDown size={16} /></div></label></div>
        <div className="form-split"><label><span>Expected price</span><input name="price" placeholder="e.g. ₹2.4 Cr" /></label><label><span>Sale timeline</span><div className="select-wrap"><select name="timeline" defaultValue="Within 3 months"><option>As soon as possible</option><option>Within 3 months</option><option>Within 6 months</option><option>Just exploring</option></select><ChevronDown size={16} /></div></label></div>
        <label className="consent"><input type="checkbox" required /><span>I confirm I am authorised to share these property details and agree to be contacted about this enquiry.</span></label>
        <motion.button whileTap={{ scale: .98 }} className="primary-button" type="submit">Submit for review <ArrowRight size={17} /></motion.button>
        <AnimatePresence>{confirmation && <motion.div className="success-card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><Check /><div><strong>Registration received</strong><span>Reference: {confirmation}. Save this number for follow-up.</span></div><button type="button" onClick={() => { setConfirmation(null); setView('registered') }}>View status</button></motion.div>}</AnimatePresence>
      </motion.form> : <motion.div key="registered" className="registered-list" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>{saved.length ? saved.map(item => <div className="submission-card" key={item.id}><span><Home size={17} /></span><div><strong>{item.kind} · {item.locality || item.city}</strong><small>{item.id} · {new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</small></div><em>{item.status || 'Review pending'}</em></div>) : <div className="empty-mini"><Building2 /><h3>No submissions yet</h3><p>Your registered properties and review status will appear here on this device.</p><button onClick={() => setView('sell')}>Register a property</button></div>}</motion.div>}</AnimatePresence>
    </Reveal>
  </div></section>
}

function Contact({ selectedProperty, clearSelectedProperty }) {
  const [intent, setIntent] = useState('buy'), [confirmation, setConfirmation] = useState(null)
  useEffect(() => { if (selectedProperty) setIntent('buy') }, [selectedProperty])
  function submit(event) {
    event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget)); const enquiry = { ...data, intent, propertyId: selectedProperty?.id || null, id: makeRef('ENQ'), createdAt: new Date().toISOString() }; const existing = JSON.parse(localStorage.getItem('envsites-enquiries') || '[]'); localStorage.setItem('envsites-enquiries', JSON.stringify([enquiry, ...existing])); setConfirmation(enquiry.id); event.currentTarget.reset(); clearSelectedProperty()
  }
  return <section id="contact" className="contact section-pad"><motion.div className="contact-orb orb-one" animate={{ x: [0, 18, 0], y: [0, -14, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} /><motion.div className="contact-orb orb-two" animate={{ x: [0, -14, 0], y: [0, 18, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} /><div className="contact-inner">
    <Reveal className="contact-head"><div className="section-kicker light">Start a conversation</div><h2>Tell us what<br /><em>comes next.</em></h2><p>Share the essentials and receive a reference number immediately. A complete brief makes every follow-up more useful.</p><div className="contact-points"><span><Phone /> Callback request</span><span><Mail /> Email follow-up</span><span><CalendarDays /> Visit planning</span></div></Reveal>
    <Reveal className="contact-form-wrap" delay={.08}><form className="contact-form glass" onSubmit={submit}><div className="intent-toggle"><button type="button" className={intent === 'buy' ? 'active' : ''} onClick={() => setIntent('buy')}>I want to buy</button><button type="button" className={intent === 'sell' ? 'active' : ''} onClick={() => setIntent('sell')}>I want to sell</button></div>
      {selectedProperty && <div className="selected-property"><img src={selectedProperty.image} alt="" /><div><span>Enquiring about</span><strong>{selectedProperty.name}</strong><small>{selectedProperty.area}, {selectedProperty.city}</small></div><button type="button" onClick={clearSelectedProperty}><X size={15} /></button></div>}
      <div className="form-split"><label><span>Name *</span><input name="name" required autoComplete="name" placeholder="Your name" /></label><label><span>Phone *</span><input name="phone" required autoComplete="tel" inputMode="tel" pattern="[0-9+ -]{8,15}" placeholder="+91 98765 43210" /></label></div>
      <div className="form-split"><label><span>Email *</span><input name="email" required type="email" autoComplete="email" placeholder="you@example.com" /></label><label><span>Preferred city *</span><input name="city" required list="contact-cities" placeholder="City" /></label></div><datalist id="contact-cities">{cities.map(c => <option key={c} value={c} />)}</datalist>
      <div className="form-split"><label><span>{intent === 'buy' ? 'Budget range' : 'Expected value'}</span><input name="budget" placeholder="e.g. ₹1.5–2 Cr" /></label><label><span>Preferred contact</span><div className="select-wrap"><select name="contactTime" defaultValue="Weekday evening"><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Weekend</option></select><ChevronDown size={16} /></div></label></div>
      <label><span>{intent === 'buy' ? 'What are you looking for? *' : 'Tell us about your property *'}</span><textarea name="message" required rows="4" placeholder={intent === 'buy' ? 'Preferred areas, property type, move-in timeline…' : 'Locality, property type, age and sale timeline…'} /></label><label className="consent"><input type="checkbox" required /><span>I agree to be contacted regarding this enquiry.</span></label>
      <motion.button whileTap={{ scale: .98 }} className="primary-button inverse" type="submit">Send enquiry <MoveUpRight size={17} /></motion.button><AnimatePresence>{confirmation && <motion.div className="success-card contact-success" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}><Check /><div><strong>Enquiry saved</strong><span>Reference: {confirmation}. Keep it for your records.</span></div></motion.div>}</AnimatePresence>
    </form></Reveal>
  </div></section>
}

function FAQ() {
  const [open, setOpen] = useState(0)
  const items = [['How does a property get listed?', 'An owner starts with the registration form. The details are reviewed, follow-up questions are noted, and the property is prepared for a clear public listing only after the information is complete.'], ['Can I request a visit directly?', 'Yes. Open a property, choose “Request a viewing”, and share your preferred contact details. Availability and meeting details should be confirmed before travel.'], ['What should sellers prepare?', 'Basic ownership context, location, property type, size, expected value, availability for photographs and a realistic sale timeline are enough for the first conversation.'], ['Does saving a home contact the owner?', 'No. Saving only adds the property to your shortlist on this device. An enquiry is created only when you complete and submit the contact form.']]
  return <section id="faq" className="faq section-pad"><Reveal className="faq-title"><div className="section-kicker">Common questions</div><h2>Useful answers,<br />before you ask.</h2></Reveal><div className="faq-list">{items.map(([q, a], i) => <div className={`faq-item ${open === i ? 'open' : ''}`} key={q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span>{q}</span><motion.span animate={{ rotate: open === i ? 45 : 0 }}><Sparkles size={18} /></motion.span></button><AnimatePresence initial={false}>{open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }}><p>{a}</p></motion.div>}</AnimatePresence></div>)}</div></section>
}

function Footer() {
  return <footer><div className="footer-brand"><Brand /><p>Spaces with intention. Decisions with clarity.</p></div><div className="footer-col"><strong>Explore</strong><a href="#near-you">Properties</a><a href="#how-it-works">How it works</a><a href="#placed">Sell a property</a></div><div className="footer-col"><strong>Support</strong><a href="#contact">Contact</a><a href="#faq">FAQs</a><a href="#contact">Send an enquiry</a></div><div className="footer-end"><span>India</span><small className="design-credit">Designed by Rashi Porwal</small><small>© {new Date().getFullYear()} envSites</small></div></footer>
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('envsites-theme') === 'dark')
  const [searchRequest, setSearchRequest] = useState({ city: '', intent: '', propertyType: 'Any type' })
  const [savedIds, setSavedIds] = useState(() => JSON.parse(localStorage.getItem('envsites-saved') || '[]'))
  const [selectedProperty, setSelectedProperty] = useState(null)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#121714' : '#f4f0e8'); localStorage.setItem('envsites-theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { localStorage.setItem('envsites-saved', JSON.stringify(savedIds)) }, [savedIds])
  function handleSearch(request) { if (request.intent === 'Sell') { document.querySelector('#placed')?.scrollIntoView({ behavior: 'smooth' }); return } setSearchRequest({ ...request, requestId: Date.now() }); requestAnimationFrame(() => document.querySelector('#near-you')?.scrollIntoView({ behavior: 'smooth' })) }
  function handleEnquire(property) { setSelectedProperty(property); requestAnimationFrame(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })) }
  return <><ScrollProgress /><Navbar dark={dark} setDark={setDark} savedCount={savedIds.length} /><main><Hero onSearch={handleSearch} /><About /><NearYou searchRequest={searchRequest} savedIds={savedIds} setSavedIds={setSavedIds} onEnquire={handleEnquire} /><HowItWorks /><Placed /><Contact selectedProperty={selectedProperty} clearSelectedProperty={() => setSelectedProperty(null)} /><FAQ /></main><Footer /></>
}
