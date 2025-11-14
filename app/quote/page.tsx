'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FiTrash2, FiPlus, FiMinus, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useQuoteStore } from '@/store/useQuoteStore'

export default function QuotePage() {
  const [mounted, setMounted] = useState(false)
  const { items, removeItem, updateQuantity, clearItems } = useQuoteStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        clearItems()
        setFormData({ name: '', email: '', phone: '', message: '' })
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Failed to submit quote. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsApp = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
    const message = `Hi! I'd like to request a quote for the following items:\n\n${items
      .map((item) => `- ${item.product.name} (Qty: ${item.quantity}) - $${item.product.price}`)
      .join('\n')}\n\nTotal: $${getTotalPrice().toFixed(2)}\n\nName: ${formData.name}\nEmail: ${
      formData.email
    }\nPhone: ${formData.phone}\nMessage: ${formData.message}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank')
  }

  if (!mounted) {
    return null
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto bg-white dark:bg-[var(--muted)] p-8 rounded-lg shadow-lg">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4 font-[var(--font-display)]">
                Quote Request Submitted!
              </h1>
              <p className="text-[var(--foreground)] opacity-70 mb-6">
                Thank you for your interest! We'll get back to you shortly with a detailed quote.
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-[var(--font-display)]">
            Request a Quote
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl font-semibold text-[var(--foreground)] opacity-50 mb-6">
                Your quote cart is empty
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quote Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white dark:bg-[var(--muted)] p-4 rounded-lg shadow-md flex gap-4"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold text-lg hover:text-[var(--primary)] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-[var(--primary)] font-bold mt-1">
                        ${item.product.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-1 hover:bg-[var(--muted)] rounded"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-[var(--muted)] rounded"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-[var(--primary)]">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote Form */}
              <div>
                <div className="bg-white dark:bg-[var(--muted)] p-6 rounded-lg shadow-md sticky top-24">
                  <h2 className="text-2xl font-bold mb-6 font-[var(--font-display)]">
                    Your Information
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        placeholder="Any special requirements or questions?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary-dark)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <FiSend />
                      {submitting ? 'Submitting...' : 'Submit Quote Request'}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Request via WhatsApp
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
