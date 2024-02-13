import React from 'react'
import "./checkout.css"

const FormCheckout = ({datosForm, saveInputData, sendOrder }) => {
  return (
    <form onSubmit={sendOrder}>
        <label htmlFor='name'>Name</label>
        <input type="text" name = "name" id='name' value={datosForm.name} onChange={saveInputData} required/>
        <label htmlFor='email'>Email</label>
        <input type="email" name = "email" id='email' value={datosForm.email} onChange={saveInputData} required />
        <label htmlFor='phone'>Phone</label>
        <input type="number" name = "phone" id='phone' value={datosForm.phone} onChange={saveInputData} required />
        <button type='submit'>Place order</button>
    </form>
  )
}

export default FormCheckout