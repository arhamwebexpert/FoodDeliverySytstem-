import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, clearCart } = useContext(StoreContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Please login to place an order')
      }

      // Create order
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: getTotalCartAmount(),
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          },
          paymentDetails: {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv
          }
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to place order')
      }

      const orderData = await response.json()

      // Clear cart and redirect to preparing page with order details
      clearCart()
      navigate('/preparing', {
        state: {
          order: {
            items: cartItems,
            totalAmount: getTotalCartAmount(),
            shippingAddress: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              country: formData.country
            }
          }
        }
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="firstName"
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder='Email Address'
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder='Street'
          value={formData.street}
          onChange={handleInputChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder='City'
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder='State'
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zipCode"
            placeholder='Zip Code'
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder='Country'
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          placeholder='Phone'
          value={formData.phone}
          onChange={handleInputChange}
          required
        />

        <p className='title'>Payment Information</p>
        <input
          type="text"
          name="cardNumber"
          placeholder='Card Number'
          value={formData.cardNumber}
          onChange={handleInputChange}
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="expiryDate"
            placeholder='MM/YY'
            value={formData.expiryDate}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder='CVV'
            value={formData.cvv}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Proceed To Payment'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
