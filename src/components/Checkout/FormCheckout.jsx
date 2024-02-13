import React from 'react'
import "./checkout.css"

const FormCheckout = ({datosForm, saveInputData, sendOrder }) => {
  return (
    <form onSubmit={sendOrder}>
        <h3 className='checkout__form__title'>Fill your data to continue with the purchase</h3>
        <label htmlFor='name'>Name</label>
        <input type="text" name = "name" id='name' value={datosForm.name} onChange={saveInputData} required/>
        <label htmlFor='email'>Email</label>
        <input type="email" name = "email" id='email' value={datosForm.email} onChange={saveInputData} required />
        <label htmlFor='repetir_email'>Repeat email</label>
        <input type="email" name = "repetir_email" id='repetir_email' value={datosForm.repetir_email} onChange={saveInputData} required />
        <label htmlFor='phone'>Phone</label>
        <input type="number" name = "phone" id='phone' value={datosForm.phone} onChange={saveInputData} required />
        <button type='submit'>Place order</button>
    </form>
  )
}

export default FormCheckout