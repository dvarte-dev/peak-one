import React from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckoutPageType } from "@/interfaces/checkoutPage"
import { Raleway } from "next/font/google"

const raleway = Raleway({ subsets: ["latin"] })

type Props = {
  info: CheckoutPageType
}

const Footer2 = ({ info }: Props) => {
  return (
    <footer className="flex flex-col w-full">
      <div
        className={`bg-white flex flex-col items-center py-12 ${raleway.className}`}
      >
        <Image
          src={info.logo}
          width={160}
          height={160}
          alt="Logo"
          className="mb-6 hover:opacity-75 cursor-pointer"
        />

        <div className="flex flex-col md:flex-row w-full max-w-[1024px] justify-center items-center font-bold">
          <div className="flex flex-wrap justify-center md:justify-start border-b-[1px] border-[#aaa] pb-6 px-4 text-center">
            <Link
              href="/return-policy.php"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 mb-2 text-[16px] text-[#333] hover:text-blue-400 cursor-pointer"
            >
              Shipping & Returns
            </Link>
            <span>|</span>
            <Link
              href="/terms-conditions"
              target="_blank"
              className="px-4 mb-2 text-[16px] text-[#333] hover:text-blue-400 cursor-pointer"
            >
              Terms of Service
            </Link>
            <span>|</span>
            <Link
              href="/privacy-policy"
              target="_blank"
              className="px-4 mb-2 text-[16px] text-[#333] hover:text-blue-400 cursor-pointer"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              href="/shipping-returns"
              target="_blank"
              className="px-4 mb-2 text-[16px] text-[#333] hover:text-blue-400 cursor-pointer"
            >
              Shipping & Returns
            </Link>
            <span>|</span>
            <Link
              href="/mobile-terms-conditions"
              target="_blank"
              className="px-4 mb-2 text-[16px] text-[#333] hover:text-blue-400 cursor-pointer"
            >
              Mobile Terms
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-6 mb-12 font-bold text-[16px] text-center">
          <p>
            {" "}
            Copyright © {new Date().getFullYear()}. Splash Foam. All Rights
            Reserved.
          </p>
          <Image
            src="/images/icons/footer_card.png"
            alt="Footer Cards"
            width={320}
            height={54}
            className="footer_card"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer2
