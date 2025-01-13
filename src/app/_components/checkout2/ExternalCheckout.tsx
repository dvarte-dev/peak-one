import React from "react"
import Image from "next/image"

type Props = {
  firePaypal: () => void
  loading: string
}

const ExternalCheckout = ({ firePaypal, loading }: Props) => {
  return (
    <div className="pay-pal-btn-bx">
      <p className="exp-tx">Express Checkout</p>
      <button
        type="button"
        className="pay-pal-btn"
        title="PayPal"
        onClick={firePaypal}
        disabled={loading !== ""}
      >
        <Image
          src="/images/icons/paypal.png"
          alt=""
          width={310}
          height={78}
          className="pay-pal-icn"
          priority
        />
      </button>
    </div>
  )
}

export default ExternalCheckout
