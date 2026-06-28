export type DownloadState = "idle" | "loading" | "loading-formats" | "formats" | "loading-download" | "success" | "error"

export interface FormatInfo {
  formatId: string
  resolution: string
  quality: string
  ext: string
  filesize: number | null
  hasVideo: boolean
  hasAudio: boolean
}

export interface InfoSuccess {
  success: true
  title: string
  thumbnail: string
  formats: FormatInfo[]
  duration: number | null
}

export interface DownloadSuccess {
  success: true
  title: string
  thumbnail: string
  streamUrl: string
}

export interface DownloadError {
  success: false
  error: string
}

export type DownloadResponse = DownloadSuccess | DownloadError
export type InfoResponse = InfoSuccess | DownloadError
