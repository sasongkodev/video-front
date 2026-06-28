"use client"

import { useState } from "react"
import { submitDownload, fetchFormats } from "@/lib/api"
import FormatSelector from "@/components/FormatSelector"
import type { DownloadState, FormatInfo, DownloadSuccess } from "@/lib/types"

type Props = {
  onResult: (data: DownloadSuccess) => void
}

export default function DownloadForm({ onResult }: Props) {
  const [url, setUrl] = useState("")
  const [state, setState] = useState<DownloadState>("idle")
  const [error, setError] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [formats, setFormats] = useState<FormatInfo[]>([])
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!url.trim()) {
      setState("error")
      setError("Masukkan URL video.")
      return
    }

    setState("loading-formats")
    setError("")
    setFormats([])
    setSelectedFormatId(null)

    const res = await fetchFormats(url.trim())

    if (res.success) {
      setState("formats")
      setFormats(res.formats)
      if (res.formats.length === 1) {
        setSelectedFormatId(res.formats[0].formatId)
      }
    } else {
      setState("error")
      setError(res.error)
    }
  }

  function handleSelectFormat(formatId: string) {
    if (isDownloading) return
    setSelectedFormatId(formatId)
  }

  async function handleDownload(formatId: string) {
    if (isDownloading) return

    setIsDownloading(true)
    setError("")

    try {
      const res = await submitDownload(url.trim(), formatId)

      if (res.success) {
        setState("success")
        onResult(res)
      } else {
        setError(res.error)
      }
    } catch {
      setError("Gagal terhubung ke server. Silakan coba lagi.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 flex items-center max-w-3xl mx-auto"
      >
        <div className="pl-4 pr-2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
            if (state === "error") {
              setState("idle")
              setError("")
            }
          }}
          placeholder="Tempel link video di sini..."
          className="w-full py-3 px-2 text-gray-700 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading-formats" || isDownloading}
          className="bg-primary hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(state === "loading-formats" || isDownloading) ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Memproses...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Cari Video
            </>
          )}
        </button>
      </form>

      {state === "error" && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}

      {state === "formats" && formats.length > 0 && (
        <FormatSelector
          formats={formats}
          selectedId={selectedFormatId}
          onSelect={handleSelectFormat}
          onSubmit={handleDownload}
          loading={isDownloading}
        />
      )}
    </div>
  )
}
