// HomeSpice UI kit — Home surface: Hero, ExploreMenu, FoodCard, FoodGrid, AppDownload
const HSA = window.HS_ASSETS;

function Hero({ onView }) {
  return (
    <div className="hero">
      <img src={HSA.hero} alt="Featured dish" />
      <div className="hero-body">
        <h1>Order your favourite food here</h1>
        <p>Choose from a diverse menu of dishes crafted with the finest ingredients and culinary expertise — made to satisfy your cravings, one delicious meal at a time.</p>
        <button onClick={onView}>View Menu</button>
      </div>
    </div>
  );
}

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore" id="explore">
      <h2>Explore our menu</h2>
      <p className="explore-text">Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className="explore-list">
        {window.HS_CATEGORIES.map(c => (
          <div key={c.name} className={`cat ${category===c.name ? 'active':''}`}
               onClick={() => setCategory(category===c.name ? 'All' : c.name)}>
            <img src={c.img} alt={c.name} />
            <p>{c.name}</p>
          </div>
        ))}
      </div>
      <hr className="hr" />
    </div>
  );
}

function FoodCard({ food, qty, add, remove }) {
  const tilt = (e) => {
    const c = e.currentTarget, r = c.getBoundingClientRect();
    const ry = ((e.clientX - r.left)/r.width - .5) * 16;
    const rx = -((e.clientY - r.top)/r.height - .5) * 16;
    c.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px) scale(1.02)`;
    c.style.transition = 'transform .08s linear';
  };
  const reset = (e) => {
    const c = e.currentTarget;
    c.style.transform = '';
    c.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1), box-shadow .6s';
  };
  return (
    <div className="fcard" onMouseMove={tilt} onMouseLeave={reset}>
      <div className="fcard-img">
        <img className="food" src={food.img} alt={food.name} />
        {!qty
          ? <img className="add" src={HSA.addWhite} alt="add" onClick={() => add(food.id)} />
          : <div className="counter">
              <img src={HSA.removeRed} alt="remove" onClick={() => remove(food.id)} />
              <span className="cv">{qty}</span>
              <img src={HSA.addGreen} alt="add" onClick={() => add(food.id)} />
            </div>}
      </div>
      <div className="fcard-info">
        <div className="fcard-nr"><p>{food.name}</p><img src={HSA.rating} alt="rating" /></div>
        <p className="fcard-desc">{food.desc}</p>
        <p className="fcard-price">${food.price}</p>
      </div>
    </div>
  );
}

function FoodGrid({ category, cart, add, remove }) {
  const list = window.HS_FOOD.filter(f => category==='All' || f.cat===category);
  return (
    <div>
      <h2 className="food-head">Top dishes near you</h2>
      <div className="grid">
        {list.map(f => <FoodCard key={f.id} food={f} qty={cart[f.id]||0} add={add} remove={remove} />)}
      </div>
    </div>
  );
}

function AppDownload() {
  return (
    <div className="appdl">
      <p>For better experience download <br /><span>HomeSpice</span> App</p>
      <div className="appdl-row">
        <img src={HSA.appStore} alt="App Store" />
        <img src={HSA.playStore} alt="Google Play" />
      </div>
    </div>
  );
}

Object.assign(window, { Hero, ExploreMenu, FoodCard, FoodGrid, AppDownload });
