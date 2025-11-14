import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-[var(--secondary)] text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold font-[var(--font-display)] mb-4">
              <span className="text-[var(--accent)]">Decor</span>
            </h3>
            <p className="text-gray-300">
              Premium interior design and furniture for modern living spaces.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/quote" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>info@decor.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4" />
                <span>+1 234 567 8900</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--accent)] transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Decor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
