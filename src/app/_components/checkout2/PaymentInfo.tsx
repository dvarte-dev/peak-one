import React from "react"
import Image from "next/image"

type Props = {
  formik: any
}

const formatCardNumber = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, "")

  return onlyNumbers.replace(/(\d{4})(?=\d)/g, "$1 ")
}

const PaymentInfo = ({ formik }: Props) => {
  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formattedValue = formatCardNumber(event.target.value)
    formik.setFieldValue("card", formattedValue)
  }

  return (
    <div className="form_steps_wrap">
      <div className="form_header">
        <div className="frm_hdr_icon">
          <Image
            src="/images/icons/frm-hdr-icn4.png"
            alt=""
            width={100}
            height={80}
          />
        </div>
        <div className="frm_hdr_content">
          <h3>Payment Information</h3>
          <p>Safe & Secure Checkout</p>
        </div>
      </div>

      <div className="form_box">
        <div className="form_element">
          <label>Card Number</label>
          <input
            type="text"
            name="card"
            placeholder="Card Number"
            className="frm_flds"
            maxLength={19} // 16 números + 3 espaços
            onChange={handleCardNumberChange}
            onBlur={formik.handleBlur}
            value={formik.values.card}
          />
          <img
            src="/images/icons/cards-new.png"
            className="flds_cards"
            alt=""
            width="148"
            height="19"
          ></img>
        </div>

        <div className="flex space-x-4">
          <div className="form_element">
            <label>Expiry Month</label>
            <select
              name="month"
              className="frm_flds"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.month}
            >
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>

          <div className="form_element">
            <label>Expiry Year</label>
            <select
              name="year"
              className="frm_flds"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.year}
            >
              <option value="">Year</option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i} value={2024 + i}>
                  {2024 + i}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form_element">
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            className="frm_flds"
            maxLength={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cvv}
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentInfo
