import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    }

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300">
      {/* Animated Background Circles */}
      {Array.from({ length: 22 }, (_, i) => (
        <div
          key={i}
          className="circle fixed w-6 h-6 rounded-full pointer-events-none opacity-50"
          style={{
            backgroundColor: 'transparent',
            zIndex: 9999,
            transition: 'transform 0.1s ease-out, left 0.15s, top 0.15s'
          }}
        />
      ))}

      {/* Contact Section */}
      <section className="contact-hero py-5 relative">
        {/* Floating elements */}
        <div className="floating-element absolute w-20 h-20 rounded-full bg-green-500 opacity-10 animate-pulse" style={{ top: '10%', left: '5%' }}></div>
        <div className="floating-element absolute w-16 h-16 rounded-full bg-green-500 opacity-10 animate-pulse" style={{ top: '20%', right: '10%', animationDelay: '1s' }}></div>
        <div className="floating-element absolute w-24 h-24 rounded-full bg-green-500 opacity-10 animate-pulse" style={{ bottom: '15%', left: '15%', animationDelay: '2s' }}></div>
        <div className="floating-element absolute w-20 h-20 rounded-full bg-green-500 opacity-10 animate-pulse" style={{ bottom: '25%', right: '5%', animationDelay: '3s' }}></div>
        
        <div className="container mx-auto my-5 px-4">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Contact Info */}
            <div className="mb-5 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-semibold mb-3">
                Get in <span style={{ color: '#94d769' }}>Touch</span>
              </h2>
              <p className="text-lg mb-4 text-gray-300">
                Our friendly team would love to hear from you! We're here to help with any questions about our app, features, or anything else.
              </p>
              
              {/* Contact Options */}
              <div className="mb-5 space-y-3">
                <div className="contact-option p-3 rounded-lg" style={{ backgroundColor: 'rgba(148, 215, 105, 0.1)' }}>
                  <div className="flex items-center">
                    <div className="mr-3" style={{ color: '#94d769' }}>
                      <i className="bi bi-envelope-fill text-xl"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 font-semibold text-white">Email us</h5>
                      <p className="mb-0 text-gray-400">contact-us@gmail.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-option p-3 rounded-lg" style={{ backgroundColor: 'rgba(148, 215, 105, 0.1)' }}>
                  <div className="flex items-center">
                    <div className="mr-3" style={{ color: '#94d769' }}>
                      <i className="bi bi-telephone-fill text-xl"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 font-semibold text-white">Call us</h5>
                      <p className="mb-0 text-gray-400">IN +91 000-000-0000</p>
                    </div>
                  </div>
                </div>
                
                <div className="contact-option p-3 rounded-lg" style={{ backgroundColor: 'rgba(148, 215, 105, 0.1)' }}>
                  <div className="flex items-center">
                    <div className="mr-3" style={{ color: '#94d769' }}>
                      <i className="bi bi-geo-alt-fill text-xl"></i>
                    </div>
                    <div>
                      <h5 className="mb-1 font-semibold text-white">Visit us</h5>
                      <p className="mb-0 text-gray-400">Bangalore, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-start space-x-4">
                <a href="https://www.instagram.com/dev_with_ctoic" className="text-gray-300 hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram text-2xl"></i>
                </a>
                <a href="https://x.com/Ct0ic" className="text-gray-300 hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter-x text-2xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/ctoic/" className="text-gray-300 hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-linkedin text-2xl"></i>
                </a>
                <a href="https://github.com/Ctoic" className="text-gray-300 hover:text-green-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-github text-2xl"></i>
                </a>
              </div>
            </div>
            
            {/* Right Side - Contact Form */}
            <div>
              {/* Contact Form Card */}
              <div className="contact-card p-4 md:p-5 rounded-xl" style={{ backgroundColor: '#1a1a1a', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
                <h3 className="mb-4 text-center text-2xl font-semibold text-white">Send us a message</h3>
                
                {submitStatus === 'success' && (
                  <div className="text-center mb-4" style={{ color: '#94d769' }}>
                    <i className="bi bi-check-circle-fill mr-2"></i>
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* First and Last Name in Two Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">First name:</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg text-white"
                        style={{ backgroundColor: '#374151' }}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last name:</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg text-white"
                        style={{ backgroundColor: '#374151' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="contact-us@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg text-white"
                      style={{ backgroundColor: '#374151' }}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone number:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="IN +91 000-000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg text-white"
                      style={{ backgroundColor: '#374151' }}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message:</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Tell us how we can help..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 rounded-lg text-white"
                      style={{ backgroundColor: '#374151' }}
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3 px-8 rounded-full font-medium transition-all duration-300"
                      style={{
                        backgroundColor: '#94d769',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#7bc142')}
                      onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#94d769')}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto my-5 px-4">
        <div>
          <h3 className="text-center mb-4 text-2xl font-semibold" style={{ color: '#94d769' }}>Find Us Here</h3>
          <div className="map-container rounded-lg overflow-hidden" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.491339599082!2d77.59456291440737!3d12.971598616057055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1687391781db%3A0x5ef3b46e7aa569b6!2sBangalore%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1638827560011"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact