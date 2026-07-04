import { contact, identity } from '../data/profile.ts'
import { Reveal } from './Reveal.tsx'
import { Magnetic } from './Magnetic.tsx'

export function Contact() {
  return (
    <section
      className="section-dark contact"
      id="contact"
      aria-labelledby="contact-title"
      data-theme="dark"
    >
      <Reveal className="contact-inner">
        <p className="eyebrow eyebrow-center">
          <span className="eyebrow-dot" aria-hidden="true" />
          Open channel
        </p>
        <h2 className="section-title contact-title" id="contact-title">
          {contact.heading} <em>{contact.sub}</em>
        </h2>
        <p className="contact-body">{contact.body}</p>
        <Magnetic strength={0.4}>
          <a
            className="button button-primary button-large"
            href={`https://wa.me/${identity.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hi Tushar, I came across your portfolio and would like to discuss a project opportunity.')}`}
            target="_blank"
            rel="noreferrer"
          >
            {contact.cta}
          </a>
        </Magnetic>
        <ul className="contact-links" role="list">
          <li>
            <span>Email</span>
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a href={identity.linkedin} target="_blank" rel="noreferrer">
              /in/rctushar07
            </a>
          </li>
          <li>
            <span>GitHub</span>
            <a href={identity.github} target="_blank" rel="noreferrer">
              /darkprinx
            </a>
          </li>
          <li>
            <span>Phone</span>
            <a href={`tel:${identity.phone.replace(/[^+\d]/g, '')}`}>{identity.phone}</a>
          </li>
        </ul>
        <p className="contact-base">
          Based in {identity.location} ({identity.timezone}) — years of remote
          delivery with teams across Europe.
        </p>
      </Reveal>
    </section>
  )
}
