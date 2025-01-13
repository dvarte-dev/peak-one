import React from "react"

type Props = {
  productName: string
}

const TermsText = ({ productName }: Props) => {
  return (
    <p className="terms_text">
      By placing this order you agree to {productName}{" "}
      <a
        href="/terms-conditions"
        className="text-blue-300 underline cursor-pointer hover:text-blue-500"
        tabIndex={1}
      >
        terms and conditions
      </a>{" "}
      and{" "}
      <a
        href="/privacy-policy"
        className="text-blue-300 underline cursor-pointer hover:text-blue-500"
        tabIndex={2}
      >
        privacy policy
      </a>
      .
    </p>
  )
}

export default TermsText
