import React from "react"
import Image from "next/image"
import { CheckoutPageType } from "@/interfaces/checkoutPage"
import { ProductInfoType } from "@/interfaces/productInfo"
import { PriceDisplaySimple2 } from "./PriceDisplaySimple2"

type QuantityProps = {
  product: ProductInfoType
  info: CheckoutPageType
  setProduct: (product: ProductInfoType) => void
  country: string
  couponActive: boolean
}

const QuantitySelector2 = ({
  product,
  info,
  setProduct,
  country,
}: QuantityProps) => {
  // Função para acessar dinamicamente os valores do produto
  const getProductValue = (fieldPrefix: string, index: number): string => {
    return info.product[
      `${fieldPrefix}${index + 1}` as keyof typeof info.product
    ] as string
  }

  // Mapeando produtos dinamicamente
  const products = Object.keys(info.product)
    .filter((key) => key.startsWith("price"))
    .map((_, index) => ({
      productNum: index + 1,
      name: info.product.name,
      price: getProductValue("price", index),
      ogPrice: getProductValue("ogPrice", index),
      qty: getProductValue("qty", index),
      ship: getProductValue("ship", index),
      shippingId: getProductValue("shippingId", index),
      offerId: getProductValue("offerId", index),
      stickyId: getProductValue("stickyId", index),
      image: getProductValue("image", index),
    }))

  const handleProductClick = (item: (typeof products)[0]) => {
    setProduct({
      product: item.productNum,
      productName: `Buy ${item.qty} Pair`,
      productPrice: item.price,
      productShipping: item.ship,
      productShippingId: item.shippingId,
      productOfferId: item.offerId,
      productStickyId: item.stickyId,
    })
  }

  return (
    <div className="form_container">
      <div className="form_steps_wrap">
        <div className="form_header">
          <div className="frm_hdr_icon">
            <Image
              src="/images/icons/cubes.png"
              alt="Select Quantity"
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
              alt="High Demand"
              width={26}
              height={36}
              className="inline-block align-middle -mt-1 mr-2"
            />
            <span className="text-[#e32d2d] font-bold">High Demand:</span> 54
            people are looking at this offer!
          </p>
        </div>

        <div className="selectBox">
          {products.map((item, index) => (
            <label
              key={index}
              className={`prd-opt ${
                product.product === item.productNum ? "active" : ""
              }`}
              style={{
                margin: `${index === 1 ? "50px auto 0" : ""}`,
              }}
              onClick={() => handleProductClick(item)}
            >
              {index === 1 && (
                <div className="best_value_text">
                  <Image
                    src="/images/icons/star.png"
                    alt="Bestseller"
                    width={14}
                    height={14}
                    className="inline-block align-middle -mt-1 mr-2"
                  />
                  Bestseller
                </div>
              )}

              <div className="sel-prd-info">
                <div className="check_box">
                  <div className="rad-opt">
                    <input
                      type="radio"
                      name="rad-btn"
                      checked={product.product === item.productNum}
                      onChange={() => {}}
                    />
                    <span>
                      <Image
                        src="/images/icons/check-white.svg"
                        alt="Checked"
                        width={18}
                        height={18}
                        className={
                          product.product === item.productNum
                            ? "block"
                            : "hidden"
                        }
                      />
                    </span>
                  </div>
                  <p className="prd-qty">Buy {item.qty} Pair</p>
                </div>

                <div className="check_prod_box">
                  <Image
                    src={item.image}
                    alt={item.name}
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

              <div className="sel-prd-prc">
                <p className="prod-det_cut-tx">
                  <PriceDisplaySimple2
                    priceUSD={parseFloat(item.ogPrice)}
                    countryCode={country}
                    digits={0}
                  />
                </p>
                <p className="prd-prc">
                  <PriceDisplaySimple2
                    priceUSD={parseFloat(item.price)}
                    countryCode={country}
                    digits={2}
                  />
                </p>
                <p className="prd-save">
                  You Save{" "}
                  <PriceDisplaySimple2
                    priceUSD={parseFloat(item.ogPrice) - parseFloat(item.price)}
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
