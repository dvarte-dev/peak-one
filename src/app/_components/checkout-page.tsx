import React from "react"

import FunnelFluxScripts from "@/lib/funnel-flux-scripts"
import CheckoutHeader from "./checkout/checkout-header"
import CheckoutForm from "./checkout/checkout-form"
import Footer from "./checkout/checkout-footer"

import CheckoutClickId from "./checkout/checkout-click-id"

import CheckoutHeader2 from "./checkout2/CheckoutHeader2"
import CheckoutForm2 from "./checkout2/CheckoutForm2"
import Footer2 from "./checkout2/Footer2"
import FunnelFluxScripts2 from "./checkout2/FunnelFluxScripts2"

import { CheckoutPageType } from "@/interfaces/checkoutPage"

type Props = {
  info: CheckoutPageType
}

const CheckoutPage = ({ info }: Props) => {
  if (!info) {
    return (
      <div>
        Error: Unable to load checkout information. Please try again later.
      </div>
    )
  }

  return (
    <>
      {info.template === "1" && (
        <div className="flex flex-col items-center relative">
          <CheckoutHeader info={info} />
          <CheckoutForm info={info} />
          <Footer info={info} />
          <FunnelFluxScripts funnelFlux={info.funnelFlux} />
          <CheckoutClickId />
        </div>
      )}
      {info.template === "2" && (
        <div className="flex flex-col items-center relative w-full">
          <CheckoutHeader2 info={info} />
          <CheckoutForm2 info={info} />
          <Footer2 info={info} />
          <FunnelFluxScripts2 funnelFlux={info.funnelFlux} />
          <CheckoutClickId />
        </div>
      )}
    </>
  )
}

export default CheckoutPage
