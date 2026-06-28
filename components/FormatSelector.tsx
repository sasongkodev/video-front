import type { FormatInfo } from "@/lib/types"

type Props = {
  formats: FormatInfo[]
  selectedId: string | null
  onSelect: (id: string) => void
  onSubmit: (id: string) => void
  loading: boolean
}

function formatSize(bytes: number | null): string {
  if (!bytes) return ""
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

export default function FormatSelector({
  formats,
  selectedId,
  onSelect,
  onSubmit,
  loading,
}: Props) {
  const videoFormats = formats.filter((f) => f.hasVideo)

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Pilih resolusi video
      </h3>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Resolusi lebih tinggi menghasilkan kualitas lebih baik dengan ukuran file lebih besar.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {videoFormats.map((f) => {
          const isSelected = selectedId === f.formatId
          return (
            <button
              key={f.formatId}
              onClick={() => onSelect(f.formatId)}
              disabled={loading}
              className={`relative flex flex-col items-center gap-1 rounded-lg border-2 px-5 py-3 min-w-[120px] transition-all ${
                isSelected
                  ? "border-primary bg-blue-50 text-primary"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="font-bold text-sm">{f.resolution}</span>
              <span className="text-xs opacity-75">{f.ext.toUpperCase()}</span>
              {f.filesize && (
                <span className="text-[11px] opacity-60">
                  ~{formatSize(f.filesize)}
                </span>
              )}
              {isSelected && (
                <svg
                  className="w-4 h-4 text-primary absolute -top-2 -right-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )
        })}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => selectedId && onSubmit(selectedId)}
          disabled={!selectedId || loading}
          className="bg-primary hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {loading ? (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              Putar Video
            </>
          )}
        </button>
      </div>
    </div>
  )
}
