import React from "react"
import Image from "next/image"

type Props = {
  onClick: () => void
}

const CheckoutButton = ({ onClick }: Props) => {
  return (
    <button
      type="button"
      className="common_btn"
      onClick={onClick}
      id="checkoutButton"
    >
      Complete Checkout
      <Image
        src="/images/icons/btn-arw.png"
        className="btn_arw"
        alt="Arrow"
        width={36}
        height={28}
      />
    </button>
  )
}

export default CheckoutButton
