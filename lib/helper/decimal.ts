export function formatCoin(amount: number, coin: string, decimals: number) {
  return Number(amount).toFixed(decimals);
}
