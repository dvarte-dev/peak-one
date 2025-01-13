import React from "react"
import { CheckoutPageType } from "@/interfaces/checkoutPage"

type Props = {
  info: CheckoutPageType
}

const CheckoutHeader2 = ({ info }: Props) => {
  return (
    <div className="header w-full bg-white border-b border-gray-200">
      <div className="max-w-[1200px] w-full mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex-shrink-0">
          <img src={info.header.logo} className="logo h-12 w-auto" alt="logo" />
        </div>

        <div className="flex-shrink-0">
          <img
            src={info.header.badge}
            className="quaranty_seal hidden md:block h-12 w-auto"
            alt="Guaranteed Safe Checkout"
          />
        </div>
      </div>
    </div>
  )
}

export default CheckoutHeader2
