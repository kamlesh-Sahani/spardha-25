"use client"

import { Facebook, Twitter, Youtube, Instagram, Home, Info, FileText, AlertCircle, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#002147] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Social Section */}
          <div className="space-y-4">
            <div className="flex flex-col items-center space-x-2">
              <img
                src="https://www.donboscoitggsipu.org/images/logo.png"
                alt="DBIT Logo"
                className="w-15 h-15"
              />
              <h3 className="text-lg">Don Bosco Institute of Technology</h3>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#cca000] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#cca000] transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#cca000] transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#cca000] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center space-x-2 hover:text-[#cca000] transition-colors">
                  <Home className="w-4 h-4 text-red-500" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 hover:text-[#cca000] transition-colors">
                  <Info className="w-4 h-4 text-red-500" />
                  <span>About us</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 hover:text-[#cca000] transition-colors">
                  <FileText className="w-4 h-4 text-red-500" />
                  <span>Mandatory Disclosure</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 hover:text-[#cca000] transition-colors">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span>Grievance Redressal</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center space-x-2 hover:text-[#cca000] transition-colors">
                  <Mail className="w-4 h-4 text-red-500" />
                  <span>E-magazine</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>Okhla Road, New Delhi-110025</p>
              <p>+91-9868045426</p>
              <p>+91-9911297657</p>
              <p>hr@donboscoitggsipu.org</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-around items-center">
          <p>© Copyrights 2022 Don Bosco Institute of Technology.</p>
          <p>Designed by DBIT</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
