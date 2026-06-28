type Props = {
  title: string
  thumbnail: string
  streamUrl: string
}

// Build a download URL that tells the backend to send the file as an
// attachment (save dialog) with a friendly filename based on the title.
function buildDownloadUrl(streamUrl: string, title: string): string {
  try {
    const url = new URL(streamUrl)
    url.searchParams.set("download", "1")
    if (title.trim()) {
      let safeTitle = title.trim()
      if (!safeTitle.toLowerCase().endsWith(".mp4")) {
        safeTitle += ".mp4"
      }
      url.searchParams.set("filename", safeTitle)
    }
    return url.toString()
  } catch {
    return streamUrl
  }
}

export default function VideoPreview({ title, thumbnail, streamUrl }: Props) {
  const downloadUrl = buildDownloadUrl(streamUrl, title)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <video
        controls
        className="aspect-video w-full bg-black"
        poster={thumbnail || undefined}
      >
        <source src={streamUrl} type="video/mp4" />
        Browser Anda tidak mendukung pemutar video.
      </video>
      <div className="space-y-4 p-5">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h2>
        <a
          href={downloadUrl}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white transition-all hover:bg-blue-700"
          download={`${title.trim() || 'video'}.mp4`}
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download Video
        </a>
      </div>
    </div>
  )
}
