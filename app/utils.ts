export function formatBalance(amount: number, currency: string) {
    const displayedAmount = amount.toLocaleString('en')

    switch (currency.toUpperCase()) {
        case 'EUR': return `€${displayedAmount}`
        case 'USD': 
        case 'CAD':
            return `$${displayedAmount}`
        case 'RON': return `${displayedAmount} lei`
        case 'DKK': return `${displayedAmount} kr.`
        default: return displayedAmount
    }
}

const rates = {   //sorry, random nubers here
  EUR: {
    EUR: 1.0,
    USD: 1.1,
    RON: 2,
    CAD: 1.3,
    DKK: 1.4,
  },
  USD: {
    EUR: 0.9,
    USD: 1.0,
    RON: 0.8,
    CAD: 1.7,
    DKK: 1.8,
  },
  RON: {
    EUR: 0.9,
    USD: 0.8,
    RON: 1.0,
    CAD: 1.7,
    DKK: 1.8,
  },
  CAD: {
    EUR: 0.9,
    USD: 0.8,
    RON: 1.7,
    CAD: 1.0,
    DKK: 1.8,
  },
  DKK: {
    EUR: 0.9,
    USD: 0.8,
    RON: 2,
    CAD: 1.8,
    DKK: 1.0,
  },
};

export type CurrencyType = keyof typeof rates


export function getRate(currency1: CurrencyType, currency2: CurrencyType):number {
    if(currency1 === currency2) return 1

    return rates[currency1][currency2]
}

export function computeCreditAmount(amount: number, debitCurrency: CurrencyType, creditCurrency: CurrencyType) {
    const rate = getRate(debitCurrency, creditCurrency)
    return Math.round(amount * rate * 100)/100
}