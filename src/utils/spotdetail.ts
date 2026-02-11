export function formatKRW(value: string | number) {
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(num)) return "";

  return new Intl.NumberFormat("ko-KR").format(num);
}

export function normalizeUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}
