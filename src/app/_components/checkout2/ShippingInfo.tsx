import React from "react"
import Image from "next/image"
import { usStates } from "@/app/_utils/usStates"

type Props = {
  formik: any
}

const ShippingInfo = ({ formik }: Props) => {
  const isFieldValid = (field: string) =>
    formik.touched[field] && !formik.errors[field]

  // Função para formatar o Zip Code
  const formatZipCode = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "") // Remove caracteres não numéricos
    if (onlyNumbers.length <= 5) return onlyNumbers // Formato 12345
    return `${onlyNumbers.slice(0, 5)}-${onlyNumbers.slice(5, 9)}` // Formato 12345-6789
  }

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatZipCode(event.target.value)
    formik.setFieldValue("zip", formattedValue) // Atualiza o valor no Formik
  }

  return (
    <div className="form_steps_wrap">
      <div className="form_header">
        <div className="frm_hdr_icon">
          <Image
            src="/images/icons/frm-hdr-icn3.png"
            alt=""
            width={100}
            height={80}
          />
        </div>
        <div className="frm_hdr_content">
          <h3>Shipping Information</h3>
          <p>Where do we send your products?</p>
        </div>
      </div>

      <div className="form_box">
        <div className="form_element">
          <label className="label_text">Country</label>
          <select
            className={`frm_flds select_flds ${
              isFieldValid("country") ? "no-error" : ""
            }`}
            name="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
          </select>
        </div>

        <div className="form_element">
          <label className="label_text">Delivery Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className={`frm_flds ${isFieldValid("address") ? "no-error" : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
          <input
            type="text"
            name="address2"
            placeholder="Apartment, suit, etc. (optional)"
            className={`mt-2 frm_flds ${
              isFieldValid("address2") ? "no-error" : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
          />
        </div>

        <div className="form_element">
          <label className="label_text">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            className={`frm_flds ${isFieldValid("city") ? "no-error" : ""}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          />
        </div>

        <div className="flex justify-between space-x-4">
          <div className="form_element">
            <label className="label_text">State</label>
            <select
              name="state"
              className={`frm_flds select_flds ${
                isFieldValid("state") ? "no-error" : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
            >
              <option value="">Select State</option>
              {usStates.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form_element">
            <label className="label_text">Zip Code</label>
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              className={`frm_flds ${isFieldValid("zip") ? "no-error" : ""}`}
              maxLength={10}
              onChange={handleZipCodeChange}
              onBlur={formik.handleBlur}
              value={formik.values.zip}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo
