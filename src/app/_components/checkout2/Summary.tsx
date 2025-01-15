import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ProductInfoType } from "@/interfaces/productInfo"
import { CheckoutPageType } from "@/interfaces/checkoutPage"

type Props = {
  product: ProductInfoType
  info: CheckoutPageType
}

const Summary = ({ product, info }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const productKey = product.product

  const image = info.product[`image${productKey}` as keyof typeof info.product]
  const price = parseFloat(
    info.product[`price${productKey}` as keyof typeof info.product]
  )
  const ogPrice = parseFloat(
    info.product[`ogPrice${productKey}` as keyof typeof info.product]
  )
  const qty = info.product[`qty${productKey}` as keyof typeof info.product]
  const shipping = parseFloat(
    info.product[`ship${productKey}` as keyof typeof info.product]
  )
  const name = info.product.name

  const savings = ogPrice - price

  return (
    <div className="order_sumrybox">
      <h2
        className={`sumry-hdng ${isOpen ? "active" : ""} cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen
            ? 'url("/images/icons/summary_arw_act.png") no-repeat right center'
            : 'url("/images/icons/summary_arw.png") no-repeat right center',
          borderBottom: isOpen ? "1px solid #d7d7d7" : "none",
        }}
      >
        Order Summary
      </h2>

      <div
        ref={contentRef}
        className="order_sumry_details"
        style={{
          display: isOpen ? "block" : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div className="prod-box">
          <div className="ord-lft">
            <div className="prod-img">
              <Image src={image} alt={name} width={55} height={53} />
              <p className="product-quantity">{qty}</p>
            </div>
            <div className="odr-rgt">
              <p className="ord-title">{name}</p>
            </div>
          </div>
          <div className="ord-right">
            <p>
              <span className="cross_price">${ogPrice.toFixed(2)}</span>
              <br />
              <em className="actual_price">${price.toFixed(2)}</em>
            </p>
          </div>
        </div>

        <table className="cart-table" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td align="left">Subtotal</td>
              <td align="right">
                <span className="subtotal_price">${price.toFixed(2)}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="cart-table" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td align="left">Shipping</td>
              <td align="right">
                <span className="shipping_price">${shipping.toFixed(2)}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="devider-cp" />

        <table className="cart-table" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td align="left">Total Savings</td>
              <td align="right">
                <span className="green save_price">-${savings.toFixed(2)}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="cart-table" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td align="left" className="total-txt">
                Total
              </td>
              <td align="right" className="total-txt total_price">
                ${(price + shipping).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Summary
