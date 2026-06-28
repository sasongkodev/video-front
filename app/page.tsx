"use client"

import { useState } from "react"
import DownloadForm from "@/components/DownloadForm"
import VideoPreview from "@/components/VideoPreview"
import type { DownloadSuccess } from "@/lib/types"

function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Video<span className="text-primary">Downloader</span>
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-primary font-medium border-b-2 border-primary pb-1">
              Beranda
            </a>
            <a href="#cara-kerja" className="text-gray-500 hover:text-gray-900 font-medium">
              Cara Kerja
            </a>
            <a href="#didukung" className="text-gray-500 hover:text-gray-900 font-medium">
              Didukung
            </a>
            <a href="#faq" className="text-gray-500 hover:text-gray-900 font-medium">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Tempel Link",
      desc: "Tempel link video yang ingin Anda download.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      ),
    },
    {
      number: 2,
      title: "Pilih Kualitas",
      desc: "Pilih resolusi video yang Anda inginkan.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      ),
    },
    {
      number: 3,
      title: "Putar & Download",
      desc: "Putar video langsung di browser atau download ke perangkat Anda.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      ),
    },
  ]

  return (
    <section id="cara-kerja" className="max-w-6xl mx-auto py-16 px-4 sm:px-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Cara Kerja</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {steps.map((step, i) => (
          <div key={step.number} className="flex items-start gap-4 max-w-xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {step.icon}
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {step.number}
                </span>
                {step.title}
              </h3>
              <p className="text-sm text-gray-500">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:block text-gray-300 self-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function SupportedPlatforms() {
  const platforms = [
    {
      name: "YouTube",
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.26c.05 1.58-.33 3.16-1.12 4.51-1.07 1.83-2.85 3.12-4.93 3.51-1.99.38-4.09.11-5.85-1.01-1.87-1.19-3.08-3.13-3.32-5.34-.24-2.22.42-4.47 1.83-6.14 1.34-1.59 3.32-2.5 5.37-2.61v4.01c-.56.03-1.13.16-1.63.45-1.13.65-1.85 1.96-1.74 3.29.11 1.33.99 2.51 2.21 3.02 1.25.52 2.74.45 3.91-.25 1.25-.75 2.01-2.13 2.01-3.58V.02z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" className="text-pink-600 fill-current" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" className="text-white" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" className="text-white" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Dan lainnya",
      icon: (
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 12a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      ),
    },
  ]

  return (
    <section id="didukung" className="max-w-5xl mx-auto pb-20 px-4 sm:px-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Didukung</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {platforms.map((p) => (
          <div
            key={p.name}
            className="bg-white border border-gray-200 rounded-lg py-3 px-6 flex items-center justify-center gap-3 w-40 shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
          >
            {p.icon}
            <span className="font-medium text-gray-800">{p.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "Apakah layanan ini gratis?",
      a: "Ya, VidoTools sepenuhnya gratis. Anda dapat mendownload video tanpa biaya apapun.",
    },
    {
      q: "Platform apa saja yang didukung?",
      a: "Saat ini kami mendukung YouTube, TikTok, Instagram, dan Facebook. Kami terus menambahkan platform baru.",
    },
    {
      q: "Apakah ada batasan jumlah download?",
      a: "Tidak ada batasan. Anda dapat mendownload video sebanyak yang Anda mau.",
    },
    {
      q: "Bagaimana cara memilih kualitas video?",
      a: "Tempel link video, klik 'Cari Video', lalu pilih resolusi yang tersedia. Video akan diputar langsung di browser Anda.",
    },
  ]

  return (
    <section id="faq" className="max-w-3xl mx-auto pb-20 px-4 sm:px-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">FAQ</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex justify-between items-center px-5 py-4">
              <h3 className="font-medium text-gray-900">{faq.q}</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-500">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <>
      <hr className="border-gray-200" />
      <footer className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              <span className="font-bold text-lg text-gray-900">
                Video<span className="text-primary">Downloader</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tool gratis untuk download video dari berbagai website dengan mudah.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Link</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#cara-kerja" className="hover:text-primary transition-colors">
                  Cara Kerja
                </a>
              </li>
              <li>
                <a href="#didukung" className="hover:text-primary transition-colors">
                  Didukung
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="text-sm text-gray-500">
            <p className="mb-2 text-gray-900 font-medium">Dibuat dengan ❤️</p>
            <p>&copy; 2024 VidoTools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default function Home() {
  const [result, setResult] = useState<DownloadSuccess | null>(null)

  return (
    <>
      <Header />

      <main className="flex-grow">
        <section className="max-w-4xl mx-auto text-center pt-16 pb-12 px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Download video dari <br /> <span className="text-primary">berbagai website</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10">
            Tempel link video di bawah, pilih kualitas, lalu putar atau download.
          </p>

          <DownloadForm onResult={setResult} />

          <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Kami tidak menyimpan video apapun di server kami.
          </p>
        </section>

        {result && (
          <section className="max-w-2xl mx-auto pb-12 px-4 sm:px-6">
            <VideoPreview
              title={result.title}
              thumbnail={result.thumbnail}
              streamUrl={result.streamUrl}
            />
          </section>
        )}

        <hr className="border-gray-200" />

        <HowItWorks />

        <SupportedPlatforms />

        <FAQ />
      </main>

      <Footer />
    </>
  )
}
