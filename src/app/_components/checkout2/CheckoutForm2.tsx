"use client"
import * as Yup from "yup"
import React, { useState } from "react"
import { CheckoutPageType } from "@/interfaces/checkoutPage"
import { useSession } from "@/app/_context/SessionContext"
import { useFormik } from "formik"
import { ProductInfoType } from "@/interfaces/productInfo"
import { CustomerInfoType } from "@/interfaces/customerInfo"
import { ReasonType } from "@/interfaces/ReasonType"
import HandleSessionStart from "../checkout/checkout-handle-session-start"
import DiscountBar2 from "./DiscountBar2"
import QuantitySelector2 from "./QuantitySelector2"
import ExternalCheckout from "./ExternalCheckout"
import CustomerInfo2 from "./CostumerInfo2"
import PaymentInfo2 from "./PaymentInfo"
import ShippingInfo2 from "./ShippingInfo"
import TermsText from "./TermsText"
import CheckoutButton from "./CheckoutButton"
import Image from "next/image"
import Summary from "./Summary"
import WhyChoose from "./WhyChoose"
import CustomerReviews from "./CustomerReviews"

type Props = {
  info: CheckoutPageType
}

const CheckoutForm = ({ info }: Props) => {
  const { sessionId } = useSession()
  const [loading, setLoading] = useState("")
  const [country, setCountry] = useState("US")
  const reasons: ReasonType[] = info.reasons || []
  const [product, setProduct] = useState<ProductInfoType>({
    product: 1,
    productName: `2x ${info.product.name}`,
    productPrice: `${info.product.price2}`,
    productShipping: `${info.product.ship2}`,
    productShippingId: `${info.product.shippingId2}`,
    productOfferId: `${info.product.offerId2}`,
    productStickyId: `${info.product.stickyId2}`,
  })

  const initialCustomerInfo: CustomerInfoType = {
    sessionId: sessionId || "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "US",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    card: "",
    month: "",
    year: "",
    cvv: "",
    couponActive: false,
    couponValue: info.product.couponValue,
  }

  const [customerInfo, setCustomerInfo] =
    useState<CustomerInfoType>(initialCustomerInfo)

  const zipRegexes: { [key: string]: RegExp } = {
    US: /^\d{5}(-\d{4})?$/, // United States: 12345 or 12345-6789
    AU: /^\d{4}$/, // Australia: 1234
    CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i, // Canada: A1A 1A1
    FI: /^\d{5}$/, // Finland: 12345
    FR: /^\d{5}$/, // France: 12345
    DE: /^\d{5}$/, // Germany: 12345
    IS: /^\d{3}$/, // Iceland: 123
    IE: /^[A-Z]\d{2}[A-Z\d]?[A-Z]?( \d{4})?$/i, // Ireland: A12 B3CD or A12 1234
    IL: /^\d{5}(\d{2})?$/, // Israel: 1234567 or 12345
    NZ: /^\d{4}$/, // New Zealand: 1234
    NO: /^\d{4}$/, // Norway: 1234
    SE: /^\d{3}[ ]?\d{2}$/, // Sweden: 123 45 or 12345
    GB: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, // United Kingdom: AB1 2CD or AB12 3CD
  }

  const formik = useFormik({
    initialValues: customerInfo,
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      address2: Yup.string(),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string()
        .test(
          "zip",
          "Invalid Postal/ZIP code",
          function (value: string | undefined) {
            if (!value) return false // Handle undefined case
            const country = this.parent.country as string // Type assertion
            const regex = zipRegexes[country] || /.+/ // Default to any non-empty string
            return regex.test(value)
          }
        )
        .required("Postal/ZIP code is required"),
      card: Yup.string()
        .matches(/^[0-9]{13,19}$/, "Card number must be 13-19 digits")
        .required("Card Number is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3,4}$/, "CVV must be 3-4 digits")
        .required("CVV is required"),
      month: Yup.string().required("Expiry Month is required"),
      year: Yup.string().required("Expiry Year is required"),
    }),
    onSubmit: async (values) => {
      setCustomerInfo({
        ...customerInfo,
        ...values,
        couponActive: customerInfo.couponActive,
      })
    },
  })

  return (
    <>
      <HandleSessionStart
        info={info}
        setCustomerInfo={setCustomerInfo}
        product={product}
      />
      <div className="checkout_main_section">
        <div className="container">
          <div className="checkout_inner_section ">
            <div className="checkout_left bg-white">
              <div className="w-full mb-4">
                <DiscountBar2
                  product={product.product}
                  info={info}
                  couponActive={customerInfo.couponActive}
                  country={country}
                />
              </div>
              <div className="w-full mb-4">
                <QuantitySelector2
                  product={product}
                  info={info}
                  setProduct={setProduct}
                  couponActive={customerInfo.couponActive}
                  country={country}
                />
              </div>
              <div className="w-full mb-4">
                <ExternalCheckout
                  firePaypal={() => alert("Paypal Payment!")}
                  loading={loading}
                />
              </div>
              <div className="w-full mb-4">
                <CustomerInfo2 formik={formik} />
              </div>
              <div className="w-full mb-4">
                <ShippingInfo2 formik={formik} />
              </div>
              <div className="w-full mb-4">
                <PaymentInfo2 formik={formik} />
              </div>
              <div className="w-full mb-4">
                <TermsText productName={info.product.name} />
              </div>
              <div className="w-full mb-4 flex flex-col items-center justify-center">
                <CheckoutButton onClick={() => alert("Checkout Payment")} />
                <Image
                  src="/images/icons/guaranty-seal.jpg"
                  alt="Guaranteed Safe Checkout"
                  width={538}
                  height={130}
                  className="guaranty_seal mt-4"
                />
              </div>
            </div>
            <div className="checkout_right">
              <div className="w-full mb-4">
                <Summary product={product} info={info} />
                <WhyChoose reasons={reasons} />
                {info.customers && (
                  <CustomerReviews customers={info.customers} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CheckoutForm
