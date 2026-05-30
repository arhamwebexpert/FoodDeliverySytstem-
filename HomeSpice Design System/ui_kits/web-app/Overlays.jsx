// HomeSpice UI kit — overlays: LoginModal, CartDrawer, CheckoutModal, OrderPreparing
const { useState: useStateO, useEffect: useEffectO } = React;

function LoginModal({ onClose, onAuth }) {
  const [mode, setMode] = useStateO('Login');
  const [name, setName] = useStateO('');
  return (
    <div className="scrim center" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title"><h3>{mode}</h3><button className="modal-x" onClick={onClose}>×</button></div>
        {mode==='Sign Up' && <input className="field" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />}
        <input className="field" placeholder="Your email" defaultValue="hello@homespice.com" />
        <input className="field" type="password" placeholder="Password" defaultValue="••••••••" />
        <label className="check"><input type="checkbox" defaultChecked /> By continuing, I agree to the terms of use &amp; privacy policy.</label>
        <button className="btn-cta" onClick={() => onAuth(mode==='Sign Up' && name ? name : 'Alex')}>
          {mode==='Sign Up' ? 'Create account' : 'Login'}
        </button>
        <small style={{display:'block',marginTop:'14px'}}>
          {mode==='Login'
            ? <>Create a new account? <span onClick={()=>setMode('Sign Up')}>Click here</span></>
            : <>Already have an account? <span onClick={()=>setMode('Login')}>Login here</span></>}
        </small>
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onCheckout, add, remove }) {
  const items = window.HS_FOOD.filter(f => cart[f.id]);
  const total = items.reduce((s,f) => s + f.price*cart[f.id], 0);
  return (
    <div className="scrim right" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-head"><h3>Your Cart</h3><button className="modal-x" onClick={onClose}>×</button></div>
        <div className="drawer-items">
          {items.length===0
            ? <div className="empty">Your cart is empty.<br />Add something delicious!</div>
            : items.map(f => (
              <div className="citem" key={f.id}>
                <img src={f.img} alt={f.name} />
                <div style={{flex:1}}>
                  <h4>{f.name}</h4>
                  <div className="cprice">${f.price}</div>
                  <div className="qty">
                    <button onClick={() => remove(f.id)}>−</button>
                    <span>{cart[f.id]}</span>
                    <button onClick={() => add(f.id)}>+</button>
                  </div>
                </div>
                <button className="citem-rm" onClick={() => remove(f.id, true)}>Remove</button>
              </div>
            ))}
        </div>
        {items.length>0 && (
          <div className="drawer-foot">
            <div className="drawer-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button className="btn-cta" onClick={onCheckout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutModal({ cart, onClose, onPlace }) {
  const items = window.HS_FOOD.filter(f => cart[f.id]);
  const sub = items.reduce((s,f) => s + f.price*cart[f.id], 0);
  const delivery = sub === 0 ? 0 : 2;
  return (
    <div className="scrim center" onClick={onClose}>
      <div className="modal" style={{width:'min(94vw,560px)',maxHeight:'90vh',overflowY:'auto'}} onClick={e => e.stopPropagation()}>
        <div className="modal-title"><h3>Delivery details</h3><button className="modal-x" onClick={onClose}>×</button></div>
        <div className="row2"><input className="field" placeholder="First name" /><input className="field" placeholder="Last name" /></div>
        <input className="field" placeholder="Street address" />
        <div className="row2"><input className="field" placeholder="City" /><input className="field" placeholder="Zip code" /></div>
        <input className="field" placeholder="Phone" />
        <div style={{background:'#f8f9fa',borderRadius:'6px',padding:'16px',margin:'6px 0 16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',color:'#666',marginBottom:'8px',fontSize:'14px'}}><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',color:'#666',marginBottom:'8px',fontSize:'14px'}}><span>Delivery fee</span><span>${delivery.toFixed(2)}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:'17px',borderTop:'1px solid #ddd',paddingTop:'8px'}}><span>Total</span><span>${(sub+delivery).toFixed(2)}</span></div>
        </div>
        <button className="btn-cta" onClick={onPlace}>Place Order</button>
      </div>
    </div>
  );
}

function OrderPreparing({ onDone }) {
  const stages = ['Order received', 'Preparing your food', 'Out for delivery', 'Delivered'];
  const [step, setStep] = useStateO(0);
  useEffectO(() => {
    if (step >= stages.length-1) return;
    const t = setTimeout(() => setStep(s => s+1), 1600);
    return () => clearTimeout(t);
  }, [step]);
  const done = step >= stages.length-1;
  const pct = Math.round(((step+1)/stages.length)*100);
  return (
    <div className="prep">
      <div className="prep-card">
        <img className="prep-icon-img" src={window.HS_ASSETS.basket} alt=""
             style={{width:'96px',height:'96px',objectFit:'contain',marginBottom:'14px',animation:'hsBounce 2s infinite',filter:'invert(48%) sepia(72%) saturate(2400%) hue-rotate(330deg) brightness(101%) contrast(101%)'}} />
        <h3>{done ? 'Enjoy your meal!' : 'Your order is on its way'}</h3>
        <div className="bar"><div className="bar-fill" style={{width:`${pct}%`}}></div></div>
        <p className="prep-status">{stages[step]}</p>
        {done
          ? <p className="prep-done">Your order has been delivered. Bon appétit!</p>
          : <p className="prep-eta">Estimated delivery · {25 - step*7} min</p>}
        {done && <button className="btn-coral" style={{marginTop:'22px'}} onClick={onDone}>Back to Home</button>}
      </div>
    </div>
  );
}

Object.assign(window, { LoginModal, CartDrawer, CheckoutModal, OrderPreparing });
