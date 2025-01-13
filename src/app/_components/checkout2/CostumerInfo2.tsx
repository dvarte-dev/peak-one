import React, { useState, useEffect } from "react"
import Image from "next/image"

type CustomerInfoProps = {
  formik: any
}

const CustomerInfo2 = ({ formik }: CustomerInfoProps) => {
  const [formattedPhone, setFormattedPhone] = useState("")

  useEffect(() => {
    if (formik.values.phone) {
      setFormattedPhone(formatPhoneNumber(formik.values.phone))
    }
  }, [])

  const formatPhoneNumber = (phone: string): string => {
    phone = phone.replace(/\D/g, "")
    if (phone.length === 10) {
      return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`
    }
    return phone
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    const cleanedValue = value.replace(/\D/g, "")
    if (cleanedValue.length <= 15) {
      formik.handleChange(e)
      setFormattedPhone(formatPhoneNumber(value))
    }
  }

  return (
    <div className="form_steps_wrap">
      <div className="form_header">
        <div className="frm_hdr_icon">
          <Image
            src="/images/icons/frm-hdr-icn2.png"
            alt=""
            width={100}
            height={80}
          />
        </div>
        <div className="frm_hdr_content">
          <h3>Customer Information</h3>
          <p>Order Confirmation Details Will Be Sent Here</p>
        </div>
      </div>

      <div className="form_box">
        <form onSubmit={formik.handleSubmit}>
          <div className="form_element">
            <div className="flds_half fl kform_spacer">
              <label className="label_text" htmlFor="securityFirst">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="securityFirst"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                className="frm_flds required"
                placeholder="First Name"
              />
            </div>

            <div className="flds_half fr kform_spacer">
              <label className="label_text" htmlFor="securityLast">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="securityLast"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                className="frm_flds required"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="form_element kform_spacer">
            <label className="label_text">Email Address</label>
            <input
              type="email"
              id="contact_email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="frm_flds required"
              placeholder="Email Address"
            />
          </div>

          <div className="form_element kform_spacer">
            <label className="label_text" htmlFor="contact_phone">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="contact_phone"
              onChange={handleChange}
              onBlur={formik.handleBlur}
              value={formattedPhone}
              className="frm_flds required"
              placeholder="Phone Number"
              maxLength={10}
              data-min-length="10"
              data-max-length="10"
              data-country="US"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerInfo2
