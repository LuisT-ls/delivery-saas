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

/**
 * Log seguro que não expõe dados sensíveis
 */
export const secureLog = (message: string, data?: any, sensitiveFields: string[] = []) => {
  if (process.env.NODE_ENV === 'development') {
    if (data && sensitiveFields.length > 0) {
      const sanitizedData = { ...data };
      sensitiveFields.forEach(field => {
        if (sanitizedData[field]) {
          sanitizedData[field] = '[REDACTED]';
        }
      });
      console.log(message, sanitizedData);
    } else {
      console.log(message, data);
    }
  }
};

/**
 * Validar se um email é válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar se uma senha é forte o suficiente
 */
export const isStrongPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validar formato de telefone brasileiro
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitizar dados para logging (remove campos sensíveis)
 */
export const sanitizeForLogging = (data: any, sensitiveFields: string[] = ['password', 'email', 'telefone']): any => {
  if (!data || typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  sensitiveFields.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  });
  
  return sanitized;
};
