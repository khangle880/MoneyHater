export function formatMoney(number) {
  return number.toLocaleString("en-US", { minimumFractionDigits: 2 });
}
