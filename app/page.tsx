import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FiArrowRight } from 'react-icons/fi'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[var(--font-display)]">
              Transform Your Space
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
              Discover premium interior design furniture and decor that brings elegance to your home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="px-8 py-4 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Explore Collection
                <FiArrowRight />
              </Link>
              <Link
                href="/quote"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[var(--primary)] transition-all"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-[var(--muted)]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">✨</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-[var(--font-display)]">Premium Quality</h3>
                <p className="text-[var(--foreground)] opacity-70">
                  Handpicked furniture and decor from top designers worldwide
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-[var(--font-display)]">Custom Design</h3>
                <p className="text-[var(--foreground)] opacity-70">
                  Personalized solutions tailored to your unique style and space
                </p>
              </div>

              <div className="text-center p-8">
                <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">🚚</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-[var(--font-display)]">Fast Delivery</h3>
                <p className="text-[var(--foreground)] opacity-70">
                  Quick and secure shipping to bring your vision to life
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 font-[var(--font-display)]">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Living Room', 'Bedroom', 'Dining', 'Office'].map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category.toLowerCase().replace(' ', '-')}`}
                  className="group relative h-64 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 group-hover:opacity-70 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-end p-6">
                    <h3 className="text-2xl font-bold text-white font-[var(--font-display)]">
                      {category}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-[var(--primary)] opacity-20"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[var(--secondary)] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 font-[var(--font-display)]">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get started with a free consultation and discover how we can bring your vision to life
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[var(--accent)] text-[var(--secondary)] font-semibold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
