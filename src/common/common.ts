export function Timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
