import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 font-[var(--font-display)]">
              Contact Us
            </h1>
            <p className="text-lg text-[var(--foreground)] opacity-70 mb-12">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md text-center">
                <FiMail className="w-8 h-8 mx-auto mb-4 text-[var(--primary)]" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-[var(--foreground)] opacity-70">info@decor.com</p>
              </div>

              <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md text-center">
                <FiPhone className="w-8 h-8 mx-auto mb-4 text-[var(--primary)]" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-[var(--foreground)] opacity-70">+1 234 567 8900</p>
              </div>

              <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md text-center">
                <FiMapPin className="w-8 h-8 mx-auto mb-4 text-[var(--primary)]" />
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-[var(--foreground)] opacity-70">123 Design Street, NY 10001</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--muted)] p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 font-[var(--font-display)]">
                Send us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
