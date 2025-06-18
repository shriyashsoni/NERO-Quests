"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface FooterProps {
  onNavigate: (view: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const pageDescriptions = {
    home: "The ultimate plug-and-play quest engine for Web3 gaming. Create engaging quests, reward players with NFTs, and boost retention with AI-powered experiences.",
    product:
      "Explore our comprehensive suite of tools including Quest Engine, Developer SDK, AI Quest Generator, Analytics Dashboard, NFT Rewards system, and high-performance infrastructure built on NERO Chain.",
    about:
      "Learn about our mission to solve Web3's biggest challenge: user retention. Meet our team of gaming veterans, blockchain experts, and AI specialists building the future of Web3 gaming.",
    documentation:
      "Get started with detailed technical documentation for integrating NERO Quests. Explore quest schemas, wallet setups, event listeners, smart contract APIs, and comprehensive guides.",
    community:
      "Join our thriving community of developers and gamers. Connect on Discord, follow us on Twitter, contribute on GitHub, and participate in hackathons and workshops.",
    dashboard:
      "Monitor your quest performance with real-time analytics, track user engagement, manage rewards, and optimize your Web3 gaming experience.",
    admin:
      "Comprehensive admin panel for quest management, user analytics, reward configuration, and system settings with AI-powered quest generation capabilities.",
  }

  return (
    <footer className="relative z-10 mt-20 bg-black/80 backdrop-blur-sm border-t border-green-500/20">
      <div className="container mx-auto px-6 py-16">
        {/* Page Descriptions Section */}
        <div className="mb-16">
          <motion.h2
            className="text-3xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our Platform
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(pageDescriptions).map(([page, description], index) => (
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3 capitalize">
                  {page === "home" ? "NERO Quests" : page}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
                {page !== "home" && (
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                  >
                    Learn More →
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-12">
                <Image src="/images/nero-logo-final.png" alt="NERO Logo" fill className="object-contain" />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              NERO Quests is revolutionizing Web3 gaming with AI-powered quest systems, seamless integrations, and
              comprehensive reward mechanisms.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#00FFA3" }}
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#00FFA3" }}
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#00FFA3" }}
                className="text-gray-400 hover:text-green-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <motion.button
                  onClick={() => onNavigate("product")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🛠️ Quest Engine
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("product")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🧑‍💻 Developer SDK
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("product")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🤖 AI Quest Generator
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("product")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  📊 Analytics Dashboard
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("product")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🎁 NFT Rewards
                </motion.button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <motion.button
                  onClick={() => onNavigate("documentation")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  📚 Documentation
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("documentation")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🔌 API Reference
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("documentation")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🧑‍🏫 Tutorials
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("community")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🌐 Community
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("community")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🙋‍♂️ Support
                </motion.button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <motion.button
                  onClick={() => onNavigate("about")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🏢 About Us
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("about")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🧑‍💼 Careers
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("about")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  ✍️ Blog
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("about")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  🧳 Press Kit
                </motion.button>
              </li>
              <li>
                <motion.button
                  onClick={() => onNavigate("about")}
                  whileHover={{ x: 5, color: "#00FFA3" }}
                  className="text-gray-400 hover:text-green-400 transition-all text-left"
                >
                  📩 Contact
                </motion.button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated with NERO Quests</h3>
            <p className="text-gray-400 mb-8">
              Get the latest updates on new features, partnerships, and Web3 gaming insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all shadow-lg"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2024 NERO Quests. All rights reserved. Powered by NERO Chain.
          </div>
          <div className="flex space-x-8 text-sm">
            <motion.button
              onClick={() => onNavigate("about")}
              whileHover={{ color: "#00FFA3" }}
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              🛡️ Privacy Policy
            </motion.button>
            <motion.button
              onClick={() => onNavigate("about")}
              whileHover={{ color: "#00FFA3" }}
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              📄 Terms of Service
            </motion.button>
            <motion.button
              onClick={() => onNavigate("about")}
              whileHover={{ color: "#00FFA3" }}
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              🍪 Cookie Policy
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
