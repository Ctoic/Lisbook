import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const About = () => {
  const { t } = useLanguage()

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

      <main className="container mx-auto my-5 px-4">
        {/* Hero Section with Image */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-lg p-5" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <div className="mb-5 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-semibold mb-4" style={{ color: '#fff' }}>
              LisBook - A Simple Audio Book Player
            </h1>
            <p className="mt-4 text-gray-300 leading-relaxed">
              LisBook is a straightforward audiobook player designed for simplicity and ease of use. With LisBook, you can listen to your favorite books in MP3 format. The app provides essential playback features such as play, pause, stop, and the ability to skip chapters. You can also adjust playback speed and volume to suit your listening preferences.
            </p>
          </div>
          <div className="pe-5 ps-lg-5">
            <img
              src="/Images/lisbook-about.jpg"
              className="w-full rounded-lg"
              alt="lisbook logo"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="rounded-lg p-5 my-5" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <h2 className="text-4xl font-semibold mb-4" style={{ color: '#94d769' }}>
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="col">
              <div className="border rounded-lg p-4 transition-transform duration-300 hover:scale-105" style={{ backgroundColor: '#181818', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', height: '100%' }}>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#94d769' }}>
                    Play/Pause
                  </h3>
                  <p className="text-gray-300">
                    Start or pause the playback of your audiobook anytime with a single click.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="border rounded-lg p-4 transition-transform duration-300 hover:scale-105" style={{ backgroundColor: '#181818', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', height: '100%' }}>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#94d769' }}>
                    Stop
                  </h3>
                  <p className="text-gray-300">
                    Stop the audiobook and reset its position to the beginning, ready to restart.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="border rounded-lg p-4 transition-transform duration-300 hover:scale-105" style={{ backgroundColor: '#181818', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', height: '100%' }}>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#94d769' }}>
                    Skip Chapters
                  </h3>
                  <p className="text-gray-300">
                    Effortlessly navigate between different chapters of the audiobook with ease.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="border rounded-lg p-4 transition-transform duration-300 hover:scale-105" style={{ backgroundColor: '#181818', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', height: '100%' }}>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#94d769' }}>
                    Change Speed
                  </h3>
                  <p className="text-gray-300">
                    Adjust the playback speed of the audiobook to listen faster or slower as needed.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="border rounded-lg p-4 transition-transform duration-300 hover:scale-105" style={{ backgroundColor: '#181818', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', height: '100%' }}>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#94d769' }}>
                    Change Volume
                  </h3>
                  <p className="text-gray-300">
                    Control the volume of your audiobook to ensure a comfortable listening experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="border rounded-lg p-4 transition-transform duration-300 hover:scale-105" style={{ backgroundColor: '#181818', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', height: '100%' }}>
                <div className="card-body">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#94d769' }}>
                    Change Theme
                  </h3>
                  <p className="text-gray-300">
                    Customize your audiobook player by switching between themes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="rounded-lg p-5 my-5" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-3">
              {/* Left side: Text content */}
              <div className="text-left py-5 pr-5">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#fff' }}>
                  Join our open-source project!
                </h2>
                <p className="mb-4 text-gray-300">
                  Join our open-source project and contribute your ideas. We look forward to collaborating and innovating with you.
                </p>
                <a
                  href="https://github.com/Ctoic/Lisbook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-3 rounded-full font-semibold transition-all duration-300"
                  style={{
                    color: '#94d769',
                    backgroundColor: 'transparent',
                    border: '1px solid #94d769'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#94d769'
                    e.target.style.color = '#191414'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#94d769'
                  }}
                >
                  Get involved today
                </a>
              </div>
              {/* Right side: Image */}
              <div>
                <img
                  src="/Images/lisbook-about.jpg"
                  alt="Join us"
                  className="w-full rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default About