import React from "react"
import {
  useCurrencyRates,
  countryToCurrency,
  currencySymbols,
} from "@/app/_utils/currencyUtils"

interface PriceDisplayProps {
  priceUSD: number
  countryCode: string
  priceId?: string
  ogPrice?: boolean
}

export function PriceDisplay({
  priceUSD,
  countryCode,
  priceId,
  ogPrice,
}: PriceDisplayProps) {
  const { rates } = useCurrencyRates()

  const currency = countryToCurrency[countryCode] || "USD"
  const symbol = currencySymbols[currency] || "$"

  const exchangeRate = rates ? rates[currency] : 1
  const convertedPrice = priceUSD * (exchangeRate || 1)

  return (
    <p
      className={`${
        ogPrice ? "text-[#c1c2c3] line-through" : "text-[#5acd65]"
      } text-[16px] font-bold`}
      id={priceId}
    >
      {symbol}
      {ogPrice ? convertedPrice.toFixed(0) : convertedPrice.toFixed(2)}
    </p>
  )
}

type PriceDisplaySimpleProps = {
  priceUSD: number
  countryCode: string
  digits: number
  smallSymbol?: boolean
}

export function PriceDisplaySimple2({
  priceUSD,
  countryCode,
  digits,
  smallSymbol,
}: PriceDisplaySimpleProps) {
  const { rates } = useCurrencyRates()

  const currency = countryToCurrency[countryCode] || "USD"
  const symbol = currencySymbols[currency] || "$"

  const exchangeRate = rates ? rates[currency] : 1
  const convertedPrice = priceUSD * (exchangeRate || 1)

  return (
    <>
      <span>
        {symbol}
        {convertedPrice.toFixed(digits)}
      </span>
    </>
  )
}
