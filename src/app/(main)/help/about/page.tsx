import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | [Your Company Name]',
  description: 'Learn about our story, vision, and mission at [Your Company Name]. We are committed to delivering innovative solutions and high-quality services to our clients.',
  openGraph: {
    title: 'About Us | [Your Company Name]',
    description: 'Learn about our story, vision, and mission at [Your Company Name]',
    type: 'website',
    locale: 'en-US',
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Our Company</h1>
            <p className="text-xl opacity-90">Building the Future Together</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in [year], [Your Company Name] was established with the vision of [describe main goal]. Since then, we&apos;ve been relentlessly pursuing excellence in everything we do.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We take pride in serving over [number] clients and successfully completing [number] projects throughout our journey.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">We constantly seek innovative and unique solutions to our clients&apos; challenges.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quality</h3>
              <p className="text-gray-600">We maintain the highest standards of quality in all our products and services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Integrity</h3>
              <p className="text-gray-600">We believe in transparency and honesty in all our dealings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Chief Executive Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Mike Johnson</h3>
              <p className="text-gray-600">Sales Director</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Sarah Wilson</h3>
              <p className="text-gray-600">Marketing Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Get in Touch?</h2>
          <p className="mb-8 text-xl">We&apos;re here to answer all your questions</p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition duration-300">
            Contact Us
          </button>
        </div>
      </section>
    </main>
  )
}