import { useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'

import './App.css'

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavLink {
  label: string
  href: string
}

interface Track {
  id: string
  name: string
  /** Optional: path to a real photo shown on hover. Leave empty for stick-figure only. */
  photo?: string
}

interface Skill {
  name: string
  pct: number
  /** Controls bar accent color */
  color: 'forest' | 'sage' | 'blush' | 'mixed'
}

interface AboutItem {
  heading: string
  body: string
}

// ─── Data ────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: 'About',   href: '#about' },
  { label: 'Work',    href: '#work' },
  { label: 'Design',  href: '#design' },
  { label: 'Network', href: '#network' },
  { label: 'Contact', href: '#contact' },
]

const TRACKS: Track[] = [
  {
    id: 'art',
    name: 'Artistic / Game Design',
    // photo: '/photos/muni-art.jpg',   ← uncomment + add drawing/photo to /public or /assets
  },
  {
    id: 'swe',
    name: 'Software Engineering',
    // photo: '/photos/muni-swe.jpg', ← uncomment + add drawing/photo to /public or /assets
  },
  {
    id: 'net',
    name: 'Network Engineering',
    // photo: '/photos/muni-net.jpg', ← uncomment + add drawing/photo to /public or /assets
  },
]

const ABOUT_ITEMS: AboutItem[] = [
  {
    heading: 'Interests',
    body: 'Game dev, UI/UX, systems design, and creative tech that sits at the edge of art and engineering.',
  },
  {
    heading: 'My Journey',
    body: 'Started in design, went deep into software, then into networks — always chasing the next curiosity.',
  },
  {
    heading: 'Hobbies & Extracurriculars',
    body: 'Illustration, hackathons, playing music, and building side projects that may or may not ship.',
  },
  {
    heading: 'What drives me',
    body: 'Bringing life into my work and discovering something new every single day.',
  },
]

const SKILLS: Skill[] = [
  { name: 'Java',              pct: 90, color: 'forest' },
  { name: 'TypeScript',        pct: 82, color: 'sage'   },
  { name: 'Network Protocols', pct: 75, color: 'blush'  },
  { name: 'C++',               pct: 68, color: 'mixed'  },
  { name: 'React / Vite',      pct: 80, color: 'sage'   },
  { name: 'UI / Figma',        pct: 88, color: 'blush'  },
]

// ─── Stick-figure SVGs per track (TEMPORARY) ─────────────────────────────────────────────

function StickFigureArt() {
  return (
    <svg viewBox="0 0 80 110" width={80} height={110} fill="none">
      <circle cx={40} cy={16} r={10}  stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={26} x2={40} y2={72}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={44} x2={18} y2={60}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <path   d="M18 60 Q14 70 14 76"                  stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" fill="none" strokeDasharray="3 2" />
      <line   x1={40} y1={44} x2={64} y2={52}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={64} y1={52} x2={70} y2={66}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={72} x2={28} y2={106}         stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={72} x2={54} y2={105}         stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  )
}

function StickFigureSwe() {
  return (
    <svg viewBox="0 0 80 110" width={80} height={110} fill="none">
      <circle cx={40} cy={16} r={10}  stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={26} x2={40} y2={72}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={42} x2={16} y2={56}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={16} y1={56} x2={12} y2={44}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <rect   x={5}   y={34}  width={10} height={13} rx={2} stroke="#2a2a2a" strokeWidth={1.5} />
      <line   x1={40} y1={42} x2={62} y2={55}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={62} y1={55} x2={68} y2={46}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={72} x2={30} y2={106}         stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={72} x2={52} y2={106}         stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  )
}

function StickFigureNet() {
  return (
    <svg viewBox="0 0 80 110" width={80} height={110} fill="none">
      <circle cx={40} cy={16} r={10}  stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={26} x2={40} y2={72}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={44} x2={18} y2={58}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <circle cx={18} cy={58} r={5}                    stroke="#2a2a2a" strokeWidth={1.4} strokeDasharray="2 2" />
      <line   x1={18} y1={63} x2={18} y2={76}          stroke="#2a2a2a" strokeWidth={1.4} strokeLinecap="round" strokeDasharray="2 2" />
      <line   x1={40} y1={44} x2={64} y2={60}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={64} y1={60} x2={72} y2={70}          stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={72} x2={28} y2={106}         stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
      <line   x1={40} y1={72} x2={54} y2={105}         stroke="#2a2a2a" strokeWidth={1.6} strokeLinecap="round" />
    </svg>
  )
}
const TRACK_FIGURES: Record<string, ReactElement> = {
  art: <StickFigureArt />,
  swe: <StickFigureSwe />,
  net: <StickFigureNet />,
}


// ─── Sub-components ───────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <a href="#" className="nav__logo" aria-label="Back to top">
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--cream)"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
</a>
      <div className="nav__links">
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="nav__link">
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero" id="about" aria-label="Introduction">
      <div className="hero__left">
        <h1 className="hero__name">
          Hi, I'm<br />
          Munisa<br />
          Ilhomova
        </h1>

        <p className="hero__title">Software Engineer / Designer</p>

        <p className="hero__bio">
          I love to wear many hats, ranging from design to network engineering -
          bringing life into my work and discovering new things every day.
        </p>
        <p className="hero__bio">
          Pick the track you'd like to explore. I have lots I'd love to share with you!
        </p>

        <div className="hero__location">
          <span className="hero__location-dot" aria-hidden="true" />
          Based in NYC · Available Now
        </div>

        {/* Palette swatches, purely decorative */}
        <div className="hero__swatches" aria-hidden="true">
          <button className="hero__swatch hero__swatch--forest" title="Forest" />
          <button className="hero__swatch hero__swatch--sage"   title="Sage"   />
          <button className="hero__swatch hero__swatch--blush"  title="Blush"  />
        </div>

        <div className="hero__divider" aria-hidden="true" />
      </div>

      {/* ── Artwork / photo column ─────────────────────────────────────── */}
      <div className="hero__art" aria-hidden="true">
        <div className="hero__art-bg" />

        {/*
         * TODO: Replace the placeholder below with the actual image.
         * Add the file to /public or /assets (/public/muni-hero.png) and swap:
         *
         *   <img
         *     src="/muni-hero.png"
         *     alt="Munisa Ilhomova"
         *     className="hero__art-image"
         *   />
         */}
        <div className="hero__art-placeholder">
          <svg width={70} height={105} viewBox="0 0 70 105" fill="none">
            <circle cx={35} cy={16}  r={12} stroke="#888" strokeWidth={1.5} />
            <line   x1={35} y1={28} x2={35} y2={72} stroke="#888" strokeWidth={1.5} strokeLinecap="round" />
            <line   x1={35} y1={46} x2={14} y2={60} stroke="#888" strokeWidth={1.5} strokeLinecap="round" />
            <line   x1={35} y1={46} x2={56} y2={60} stroke="#888" strokeWidth={1.5} strokeLinecap="round" />
            <line   x1={35} y1={72} x2={24} y2={100} stroke="#888" strokeWidth={1.5} strokeLinecap="round" />
            <line   x1={35} y1={72} x2={46} y2={100} stroke="#888" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
          <span> photo here</span>
        </div>

        {/*<div className="hero__art-badge">hover → photo</div>*/}
      </div>
    </section>
  )
}

function TrackCard({ track }: { track: Track }) {
  return (
    <a href={`#${track.id}`} className="track-card" aria-label={`Explore ${track.name}`}>
      <div className="track-card__figure">
        {TRACK_FIGURES[track.id]}

        {/* Different photo revealed on hover */}
        {track.photo && (
          <div
            className="track-card__photo"
            style={{ backgroundImage: `url(${track.photo})` }}
            aria-hidden="true"
          />
        )}

        {/* Dark overlay with track name? */}
        <div className="track-card__overlay" aria-hidden="true">
          {track.name}
        </div>
      </div>

      <span className="track-card__name">{track.name}</span>
    </a>
  )
}

function Tracks() {
  return (
    <section className="tracks" aria-label="Choose a track">
      <p className="tracks__label">Pick a track to explore</p>
      <div className="tracks__grid">
        {TRACKS.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about-detail" aria-label="About Munisa">
      <h2 className="section-heading">About Me:</h2>
      <div className="about__grid">
        {ABOUT_ITEMS.map((item) => (
          <div key={item.heading} className="about__item">
            <div className="about__dot" aria-hidden="true" />
            <div>
              <p className="about__heading">{item.heading}</p>
              <p className="about__body">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SkillBar({ skill }: { skill: Skill }) {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Small delay lets the element paint at width:0 first, then animates in
    const timeout = setTimeout(() => {
      if (fillRef.current) {
        fillRef.current.style.width = `${skill.pct}%`
      }
    }, 150)
    return () => clearTimeout(timeout)
  }, [skill.pct])

  return (
    <div className="skill">
      <div className="skill__meta">
        <span>{skill.name}</span>
        <span>{skill.pct}%</span>
      </div>
      <div className="skill__track" role="progressbar" aria-valuenow={skill.pct} aria-valuemin={0} aria-valuemax={100} aria-label={skill.name}>
        <div
          ref={fillRef}
          className={`skill__fill skill__fill--${skill.color}`}
        />
      </div>
    </div>
  )
}

function Stats() {
  return (
    <section className="stats" aria-label="Skills">
      <h2 className="stats__heading">Stats:</h2>
      {SKILLS.map((skill) => (
        <SkillBar key={skill.name} skill={skill} />
      ))}
    </section>
  )
}

function Footer() {
  const [copied, setCopied] = useState(false)
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('milhomova1@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) 
  }

  return (
    <footer className="footer">
      <span className="footer__name">Munisa Ilhomova</span>
      <nav className="footer__links" aria-label="Footer navigation">
        <a href="https://github.com/munisaILH" className="footer__link" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://linkedin.com"          className="footer__link" target="_blank" rel="noreferrer">LinkedIn</a>
        <button className="footer__link" onClick={handleCopyEmail}>
          {copied ? 'Copied!' : 'Email'}
        </button>
      </nav>
    </footer>
  )
}

// ─── Root component ───────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="portfolio">
      <Nav />
      <Hero />
      <Tracks />
      <About />
      <Stats />
      <Footer />
    </div>
  )
}
