import React from "react"
import Image from "next/image"
import { CustomerSection } from "@/interfaces/CostumerType"

type Props = {
  customers: CustomerSection
}

const CustomerReviews = ({ customers }: Props) => {
  console.log("customers", customers)
  return (
    <>
      <p className="right_box_heading">
        <span>Customer Reviews</span>
      </p>

      <div className="review_sec">
        {customers.reviews.map((review, index) => (
          <div key={index} className="review_row">
            <Image
              src={customers.icons.quote}
              className="quote_icon"
              alt="ic"
              width={84}
              height={84}
            />
            <Image
              src={review.image}
              className="rev_img"
              width={64}
              height={64}
              alt="img"
            />
            <p className="review_heading">{review.title}</p>
            <Image
              src={customers.icons.stars}
              className="review_star"
              width={176}
              height={34}
              alt="star"
            />
            <p className="review_text">{review.text}</p>
            <p className="review_name">
              <span>-{review.name}</span>{" "}
              <Image
                src={customers.icons.verified}
                width={34}
                height={34}
                alt="ic"
              />{" "}
              Verified Customer
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default CustomerReviews
