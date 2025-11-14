import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-[var(--font-display)]">
              About Decor
            </h1>

            <div className="prose max-w-none space-y-6 text-[var(--foreground)]">
              <p className="text-lg opacity-80 leading-relaxed">
                Welcome to Decor, your premier destination for exquisite interior design furniture
                and decor. We believe that your living space should be a reflection of your unique
                personality and style.
              </p>

              <div className="bg-white dark:bg-[var(--muted)] p-8 rounded-lg shadow-md my-8">
                <h2 className="text-2xl font-bold mb-4 font-[var(--font-display)]">Our Story</h2>
                <p className="opacity-80 leading-relaxed">
                  Founded with a passion for transforming houses into homes, Decor has been at the
                  forefront of interior design excellence for years. Our journey began with a simple
                  vision: to make premium, designer furniture accessible to everyone who values
                  quality and aesthetics.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 font-[var(--font-display)]">Our Mission</h3>
                  <p className="opacity-80 leading-relaxed">
                    To provide exceptional furniture and decor that combines timeless design,
                    superior craftsmanship, and sustainable practices to enhance every living space.
                  </p>
                </div>

                <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-3 font-[var(--font-display)]">Our Vision</h3>
                  <p className="opacity-80 leading-relaxed">
                    To become the most trusted name in interior design, inspiring people worldwide
                    to create beautiful, functional spaces they love to call home.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-[var(--muted)] p-8 rounded-lg shadow-md my-8">
                <h2 className="text-2xl font-bold mb-4 font-[var(--font-display)]">
                  What Sets Us Apart
                </h2>
                <ul className="space-y-3 opacity-80">
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Curated collection from world-renowned designers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Commitment to sustainable and eco-friendly materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Personalized design consultation services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Exceptional customer service and support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--primary)] mr-2">✓</span>
                    <span>Competitive pricing without compromising on quality</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[var(--primary)] text-white p-8 rounded-lg my-8">
                <h2 className="text-2xl font-bold mb-4 font-[var(--font-display)]">
                  Let's Create Something Beautiful Together
                </h2>
                <p className="mb-6 opacity-90">
                  Ready to transform your space? Browse our collection or get in touch with our
                  design experts for personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/products"
                    className="px-6 py-3 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-opacity-90 transition-all text-center"
                  >
                    Browse Products
                  </a>
                  <a
                    href="/contact"
                    className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[var(--primary)] transition-all text-center"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
