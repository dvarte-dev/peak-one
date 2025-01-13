import React, { useEffect, useState } from "react"
import Image from "next/image"
import { CheckoutPageType } from "@/interfaces/checkoutPage"

type DiscountProps = {
  product: number
  info: CheckoutPageType
  couponActive: boolean
  country: string
}

const DiscountBar2 = ({ product, info }: DiscountProps) => {
  const [mins, setMins] = useState(3)
  const [secs, setSecs] = useState(20)

  useEffect(() => {
    const timer = setInterval(() => {
      if (secs > 0) {
        setSecs(secs - 1)
      } else if (mins > 0) {
        setMins(mins - 1)
        setSecs(59)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [mins, secs])

  const formatTime = (time: number) => {
    return time.toString().padStart(2, "0")
  }

  const timeDisplay = `${formatTime(mins)}:${formatTime(secs)}`

  return (
    <div className="float-left w-full bg-[#fff1af] rounded-[7px] px-[50px] py-3 flex flex-wrap justify-center items-center">
      <div
        className="w-[63px] h-[63px] text-[17px] leading-[19px] text-white font-extrabold text-center uppercase pt-[13px]"
        style={{
          background: 'url("/images/icons/save-seal.png") no-repeat',
          backgroundSize: "63px",
        }}
      >
        <span className="discount_class">50</span>%
        <br />
        Off
      </div>
      <div className="w-[calc(100%-63px)] text-left pl-3">
        <h3 className="text-[19px] leading-[23px] font-bold tracking-[0.5px] uppercase">
          <span className="text-[#ff0000]">HURRY!</span> LIMITED TO 100 SPOTS
          ONLY!
        </h3>
        <p className="text-[19px] leading-[23px] tracking-[0.5px] mt-[5px] flex items-center">
          Your spot is reserved for{" "}
          <span className="inline-flex items-center ml-2">
            <div className="relative inline-block align-middle -mt-[3px] mx-[6px] w-[15px]">
              <Image
                src="/images/icons/clock-icon.png"
                alt="timer"
                width={30}
                height={36}
                className="w-[15px] h-auto"
              />
            </div>
            <span className="font-bold">{timeDisplay}</span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default DiscountBar2
