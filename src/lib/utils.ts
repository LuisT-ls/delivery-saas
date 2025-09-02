/**
 * Formata um valor numérico para moeda brasileira (R$)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

/**
 * Formata um valor numérico para moeda brasileira sem símbolo da moeda
 */
export function formatPriceWithoutSymbol(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
