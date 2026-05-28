import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list, loading, error } = useContext(StoreContext)

  if (loading) {
    return (
      <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="food-item-skeleton" style={{ animationDelay: `${i * 0.07}s` }} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="food-display-error">{error}</div>
  }

  const filtered = food_list.filter(
    item => category === "All" || category === item.category
  )

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filtered.map((item, index) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            index={index}
          />
        ))}
        {filtered.length === 0 && (
          <p className="food-display-empty">No dishes found in this category.</p>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay
