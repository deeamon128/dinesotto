interface Window {
  gtag: (
    command: string,
    action: string,
    params?: Record<string, string | number>
  ) => void;
  dataLayer: unknown[];
}