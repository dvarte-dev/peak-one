import React from "react"
import Image from "next/image"
import { ReasonType } from "@/interfaces/ReasonType"

type Props = {
  reasons: ReasonType[]
}

const WhyChoose = ({ reasons }: Props) => {
  return (
    <div className="hideMob">
      <p className="right_box_heading">
        <span>Why Choose Splash</span>
      </p>
      <div className="choose_box">
        {reasons.map((item, index) => (
          <div className="choose_row" key={index}>
            <Image
              src={item.imgSrc}
              alt={item.imgAlt}
              className="choose_seal"
              width={200}
              height={200}
            />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyChoose
