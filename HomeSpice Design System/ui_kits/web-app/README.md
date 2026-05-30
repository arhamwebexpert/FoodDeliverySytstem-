# HomeSpice — Web App UI Kit

A high-fidelity, interactive recreation of the **HomeSpice customer web app** (the only shipping product). Built from the production React source at `github.com/arhamwebexpert/FoodDeliverySytstem-`. These are cosmetic, mostly-stateless recreations meant for assembling on-brand mockups and prototypes — not production code.

## Run / preview
Open `index.html`. It boots a fake-but-interactive click-through:

**Browse** the hero + category filter + food grid → **Add to cart** (floating + button → animated counter) → **Cart drawer** (right side, adjust qty) → **Checkout** (requires sign-in; tries to checkout while signed-out → toast + login modal) → **Sign in** → **Place Order** → animated **Order Preparing** status screen → back home.

Everything is local state; no backend.

## Files
| File | Exports | Notes |
|---|---|---|
| `index.html` | — | Mounts React + Babel, loads scripts in order. |
| `app.css` | — | All styles (mirrors the production component CSS). |
| `data.js` | `HS_FOOD`, `HS_CATEGORIES`, `HS_ASSETS` | Menu + asset paths (→ `../../assets`). |
| `Chrome.jsx` | `Navbar`, `Footer`, `Toasts` | Dark fixed navbar, charcoal footer, gradient toasts. |
| `Home.jsx` | `Hero`, `ExploreMenu`, `FoodCard`, `FoodGrid`, `AppDownload` | `FoodCard` has the signature 3D mouse-tilt. |
| `Overlays.jsx` | `LoginModal`, `CartDrawer`, `CheckoutModal`, `OrderPreparing` | Modals + drawer + progress screen. |
| `App.jsx` | `App` | Orchestrates view/cart/user/overlay/toast state. |

## Component coverage
Navbar (logged-out & logged-in) · search/cart icons with count dot · Hero with pill CTA · circular category filter with tomato active ring · food card (default + counter states, hover tilt + image zoom) · responsive food grid · cart drawer with qty steppers · login/sign-up modal · checkout modal with order summary · animated order-tracking screen · success/error toasts · app-download band · footer.

## Reuse notes
- Each component is a plain function reading from `window.HS_*` globals and styled by class — drop any subset into a new page by including `app.css`, `data.js`, and the file(s) you need, then export to `window` (already done at the bottom of each file).
- To restyle, edit tokens in the root `colors_and_type.css` philosophy — `app.css` inlines the same values.
- **Fidelity caveats:** the order-tracking icon uses a tinted `basket` PNG (the original referenced `cooking-icon`/`delivery-icon` images that aren't in the exported asset set). The original Cart/Checkout used a deeper `#ff4d4d` red on some buttons; consolidated here to the tomato/coral ramp. Flagged in the root README.
