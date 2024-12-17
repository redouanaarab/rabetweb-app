// app/contact/page.tsx
import { Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              We're here to help. Our team is ready to answer all your questions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* General Information Section */}
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Info className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold">About Contacting Us</h2>
              </div>
              
              <div className="space-y-6 text-gray-600">
                <p className="text-lg">
                  Our customer service team is dedicated to providing you with the best possible support. 
                  Before contacting us, please consider the following:
                </p>
                
                <ul className="space-y-3 list-disc list-inside pl-4">
                  <li>Check our FAQ section for quick answers to common questions</li>
                  <li>For urgent technical issues, please include relevant error messages or screenshots</li>
                  <li>Response times may vary depending on the nature of your inquiry</li>
                  <li>We prioritize support tickets based on urgency and complexity</li>
                </ul>

                <p>
                  We value your feedback and are committed to continuously improving our services based on your input.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Hero Footer */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white mt-12">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Email Section */}
            <div className="text-center space-y-4">
              <Mail className="h-8 w-8 mx-auto text-blue-200" />
              <h3 className="text-xl font-bold">Email Us</h3>
              <div className="space-y-2">
                <p className="text-blue-100">support@company.com</p>
                <p className="text-blue-100">info@company.com</p>
              </div>
            </div>

            {/* Business Hours Section */}
            <div className="text-center space-y-4">
              <Clock className="h-8 w-8 mx-auto text-blue-200" />
              <h3 className="text-xl font-bold">Business Hours</h3>
              <div className="space-y-2">
                <p className="text-blue-100">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p className="text-blue-100">Saturday - Sunday: Closed</p>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-800/50">
                  <Facebook className="h-6 w-6 text-blue-100" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-800/50">
                  <Twitter className="h-6 w-6 text-blue-100" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-800/50">
                  <Instagram className="h-6 w-6 text-blue-100" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-800/50">
                  <Linkedin className="h-6 w-6 text-blue-100" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}