import type { DownloadResponse, InfoResponse } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

async function request<T>(path: string, body: unknown): Promise<T> {
  if (!API_URL) {
    return {
      success: false,
      error: "API belum dikonfigurasi. Set NEXT_PUBLIC_API_URL terlebih dahulu.",
    } as T
  }

  let res: Response
  try {
    res = await fetch(`${API_URL.replace(/\/$/, "")}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    return {
      success: false,
      error: "Tidak dapat terhubung ke server. Silakan coba lagi.",
    } as T
  }

  try {
    return (await res.json()) as T
  } catch {
    return {
      success: false,
      error: "Server mengembalikan respons yang tidak valid.",
    } as T
  }
}

export async function fetchFormats(url: string): Promise<InfoResponse> {
  return request<InfoResponse>("/info", { url })
}

export async function submitDownload(
  url: string,
  formatId?: string
): Promise<DownloadResponse> {
  return request<DownloadResponse>("/download", { url, formatId })
}
