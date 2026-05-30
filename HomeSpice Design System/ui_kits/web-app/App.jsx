// HomeSpice UI kit — App orchestrator (fake but interactive click-through)
const { useState: useStateA } = React;

function App() {
  const [view, setView] = useStateA('home');        // 'home' | 'orders'
  const [active, setActive] = useStateA('home');     // navbar highlight
  const [category, setCategory] = useStateA('All');
  const [cart, setCart] = useStateA({});
  const [user, setUser] = useStateA(null);
  const [overlay, setOverlay] = useStateA(null);     // 'login' | 'cart' | 'checkout'
  const [toasts, setToasts] = useStateA([]);

  const toast = (msg, type='success') => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2600);
  };
  const dismiss = (id) => setToasts(t => t.filter(x => x.id !== id));

  const add = (id) => { setCart(c => ({ ...c, [id]: (c[id]||0)+1 })); };
  const remove = (id, all=false) => setCart(c => {
    const n = { ...c };
    if (all || n[id] <= 1) delete n[id]; else n[id] -= 1;
    return n;
  });
  const count = Object.values(cart).reduce((a,b) => a+b, 0);

  const nav = (k) => {
    if (k === 'home') { setView('home'); setActive('home'); }
    else if (k === 'menu') { setView('home'); setActive('menu'); document.getElementById('explore')?.scrollIntoView({behavior:'smooth'}); }
    else if (k === 'orders') { setView('orders'); setActive('orders'); }
  };

  const auth = (name) => { setUser(name); setOverlay(null); toast(`Welcome, ${name}!`); };
  const logout = () => { setUser(null); setView('home'); setActive('home'); toast('Signed out', 'success'); };
  const openCart = () => { if (count===0){ toast('Your cart is empty','error'); return; } setOverlay('cart'); };
  const goCheckout = () => { if (!user){ setOverlay('login'); toast('Please sign in to continue','error'); return; } setOverlay('checkout'); };
  const place = () => { setOverlay(null); setCart({}); setView('orders'); setActive('orders'); toast('Order placed!'); };

  return (
    <div className="hs-app">
      <Navbar active={active} onNav={nav} cartCount={count} user={user}
        onCart={openCart} onSignIn={() => setOverlay('login')} onLogout={logout} />

      {view === 'home' && (
        <div className="hs-wrap">
          <Hero onView={() => nav('menu')} />
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodGrid category={category} cart={cart}
            add={(id)=>{add(id);}} remove={remove} />
          <AppDownload />
        </div>
      )}

      {view === 'orders' && (
        <div className="hs-wrap"><OrderPreparing onDone={() => nav('home')} /></div>
      )}

      <Footer />

      {overlay === 'login' && <LoginModal onClose={() => setOverlay(null)} onAuth={auth} />}
      {overlay === 'cart' && <CartDrawer cart={cart} onClose={() => setOverlay(null)}
        onCheckout={goCheckout} add={add} remove={remove} />}
      {overlay === 'checkout' && <CheckoutModal cart={cart} onClose={() => setOverlay(null)} onPlace={place} />}

      <Toasts toasts={toasts} dismiss={dismiss} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
