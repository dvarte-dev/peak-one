import React from "react"
import Image from "next/image"
import { CheckoutPageType } from "@/interfaces/checkoutPage"

type Props = {
  info: CheckoutPageType
}

const Footer2 = ({ info }: Props) => {
  return (
    <div className="footer_div">
      <div className="footer_container text-center">
        <Image
          src={`${info.logo}`}
          alt="Logo"
          width={140}
          height={54}
          className="footer_logo mb-4"
        />
        <p className="footer_text">
          <a
            href="return-policy.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Shipping & Returns
          </a>
          |
          <a
            href="page-contact.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Contact Us
          </a>
          |
          <a
            href="page-privacy.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Privacy Policy
          </a>
          |
          <a
            href="page-terms.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Terms and Conditions
          </a>
        </p>
        <div className="clearall"></div>
        <p className="footer_text">
          Copyright © {new Date().getFullYear()}. Splash Foam. All Rights
          Reserved.
        </p>
        <Image
          src="/images/icons/footer_card.png"
          alt="Footer Cards"
          width={320}
          height={54}
          className="footer_card mt-4"
        />
      </div>
    </div>
  )
}

export default Footer2
