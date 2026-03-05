import React from 'react'
import ContactHero from '../components/ContactPage/ContactHero'
import ContactSection from '../components/ContactPage/ContactSection'
import ContactForm from '../components/ContactPage/ContactForm'
import ContactSlider from '../components/ContactPage/ContactSlider'
import MapSection from '../components/ContactPage/MapSection'

function ContactUs() {
  return (
    <div>
        <ContactHero/>
        <ContactSection/>
        <ContactForm/>
        <ContactSlider/>
        <MapSection/>
    </div>
  )
}

export default ContactUs