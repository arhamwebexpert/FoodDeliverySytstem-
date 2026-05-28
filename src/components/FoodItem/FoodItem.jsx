import React, { useContext, useRef } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image, index }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)
  const cardRef = useRef(null)
  const glareRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateY = ((x / rect.width) - 0.5) * 26
    const rotateX = -((y / rect.height) - 0.5) * 26

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.03)`
    card.style.transition = 'transform 0.08s linear'
    card.style.boxShadow = '0 36px 70px rgba(0,0,0,0.22), 0 14px 30px rgba(0,0,0,0.14)'

    if (glareRef.current) {
      const gx = (x / rect.width) * 100
      const gy = (y / rect.height) * 100
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.32) 0%, transparent 60%)`
      glareRef.current.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)'
    card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
    card.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)'
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }

  return (
    <div className="food-item-wrapper" style={{ animationDelay: `${(index || 0) * 0.08}s` }}>
      <div
        ref={cardRef}
        className='food-item'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={glareRef} className="food-item-glare" />

        <div className="food-item-image-container">
          <img className='food-item-image' src={image} alt={name} />
          {!cartItems[id]
            ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add to cart" />
            : <div className='food-item-counter'>
                <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="remove" />
                <p key={cartItems[id]} className="counter-value">{cartItems[id]}</p>
                <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="add more" />
              </div>
          }
        </div>

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="rating" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">${price}</p>
        </div>
      </div>
    </div>
  )
}

export default FoodItem
