import React from "react"
import CheckoutPage from "./_components/checkout-page"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { getCheckoutBySlug } from "@/app/_utils/api"
// import { baseCheckout } from "@/lib/site-info";

const baseCheckout = "splash-foam-checkout"

const inter = Inter({ subsets: ["latin"] })

export function generateMetadata(): Metadata {
  const info = getCheckoutBySlug(baseCheckout)

  return {
    title: info.metaTitle,
    description: info.metaDescription,
  }
}

const Page = () => {
  const checkoutInfo = getCheckoutBySlug(baseCheckout)

  return (
    <div className={inter.className}>
      <CheckoutPage info={checkoutInfo} />
    </div>
  )
}

export default Page
