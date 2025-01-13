import React from "react"
import Image from "next/image"
import { CheckoutPageType } from "@/interfaces/checkoutPage"
import { ProductInfoType } from "@/interfaces/productInfo"
import { PriceDisplaySimple } from "../checkout/checkout-price-display"
import { PriceDisplaySimple2 } from "./PriceDisplaySimple2"

type QuantityProps = {
  product: ProductInfoType
  info: CheckoutPageType
  setProduct: (product: ProductInfoType) => void
  couponActive: boolean
  country: string
}

const QuantitySelector2 = ({
  product,
  info,
  setProduct,
  couponActive,
  country,
}: QuantityProps) => {
  const getProductValue = (fieldPrefix: string, index: number): string => {
    const key = `${fieldPrefix}${index + 1}` as keyof typeof info.product
    return info.product[key] || "0"
  }

  const handleProductClick = (
    productNum: number,
    productPrice: number,
    productShipping: number,
    productShippingId: number,
    productOfferId: number,
    productStickyId: number
  ) => {
    setProduct({
      product: productNum,
      productName: `Buy ${productNum + 1} Pair`,
      productPrice: productPrice.toString(),
      productShipping: productShipping.toString(),
      productShippingId: productShippingId.toString(),
      productOfferId: productOfferId.toString(),
      productStickyId: productStickyId.toString(),
    })
  }

  return (
    <div className="form_container">
      <div className="form_steps_wrap">
        <div className="form_header ">
          <div className="frm_hdr_icon">
            <Image
              src="/images/icons/cubes.png"
              alt=""
              width={100}
              height={80}
              className="w-[50px] h-auto"
            />
          </div>
          <div className="frm_hdr_content">
            <h3 className="text-[28px] leading-[28px] text-black font-bold">
              Select Quantity
            </h3>
            <p className="text-[15px] leading-[21px] text-black tracking-[0.3px] mt-[5px]">
              How many products do you want?
            </p>
          </div>
        </div>

        <div className="demand_strip">
          <p className="text-[17px] leading-[21px] text-black font-medium">
            <Image
              src="/images/icons/fire.png"
              alt=""
              width={26}
              height={36}
              className="inline-block align-middle -mt-1 mr-2"
            />
            <span className="text-[#e32d2d] font-bold">High Demand:</span> 54
            people are looking this offer!
          </p>
        </div>

        <div className="selectBox">
          {[0, 1, 2].map((index) => (
            <label
              key={index}
              className={`prd-opt ${product.product === index ? "active" : ""}`}
              style={{
                margin: `${index === 1 ? "50px auto 0" : ""}`,
              }}
              onClick={() =>
                handleProductClick(
                  index,
                  Number(getProductValue("price", index)),
                  Number(getProductValue("ship", index)),
                  Number(getProductValue("shippingId", index)),
                  Number(getProductValue("offerId", index)),
                  Number(getProductValue("stickyId", index))
                )
              }
            >
              {index === 1 && (
                <div className="best_value_text">
                  <Image
                    src="/images/icons/star.png"
                    alt=""
                    width={14}
                    height={14}
                    className="inline-block align-middle -mt-1 mr-2"
                  />
                  bestseller
                </div>
              )}

              <div className="sel-prd-info ">
                <div className="check_box">
                  <div className="rad-opt">
                    <input
                      type="radio"
                      name="rad-btn"
                      checked={product.product === index}
                      onChange={() => {}}
                    />
                    <span>
                      <Image
                        src="/images/icons/check-white.svg"
                        alt=""
                        width={18}
                        height={18}
                        className={
                          product.product === index ? "block" : "hidden"
                        }
                      />
                    </span>
                  </div>
                  <p className="prd-qty">Buy {index + 1} Pair</p>
                </div>

                <div className="check_prod_box">
                  <Image
                    src={getProductValue("image", index)}
                    alt=""
                    width={400}
                    height={250}
                    className="check-prod"
                  />
                  {index > 0 && (
                    <div className="check_off_seal">
                      {index === 1 ? "50%" : "60%"}
                      <br />
                      off
                    </div>
                  )}
                </div>
              </div>

              <div className="sel-prd-prc ">
                <p className="prod-det_cut-tx">
                  <PriceDisplaySimple2
                    priceUSD={parseFloat(getProductValue("ogPrice", index))}
                    countryCode={country}
                    digits={0}
                  />
                </p>
                <p className="prd-prc">
                  <PriceDisplaySimple2
                    priceUSD={parseFloat(getProductValue("price", index))}
                    countryCode={country}
                    digits={2}
                  />
                </p>
                <p className="prd-save">
                  You Save{" "}
                  <PriceDisplaySimple2
                    priceUSD={
                      parseFloat(getProductValue("ogPrice", index)) -
                      parseFloat(getProductValue("price", index))
                    }
                    countryCode={country}
                    digits={2}
                  />
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuantitySelector2
