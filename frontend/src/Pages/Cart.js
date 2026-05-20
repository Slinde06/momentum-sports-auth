
import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Cart.css";

const SHIPPING = 49.99;
const VAT_RATE = 0.15;

/*Die trollie se aanvangsinhoud, met id's, name, brand, size, color, price, originalPrice (vir afslag), qty, en emoji vir die prentjie. In 'n regte app sou hierdie data van 'n backend kom en nie hardcoded in die frontend nie.*/
const INITIAL_CART = [
  { id: 1, brand: "Nike",  name: "Air Max 270 React",      size: "UK 9", color: "Black",        price: 2499, originalPrice: 2999, qty: 1 },
  { id: 2, brand: "Sony",  name: "WH-1000XM5 Headphones",  size: null,   color: "Midnight Blue", price: 5299, originalPrice: 6499, qty: 1},
  { id: 3, brand: "Apple", name: "AirPods Pro (2nd Gen)",   size: null,   color: "White",         price: 4299, originalPrice: 4799, qty: 2},
];

/* formats a number as Rand currency by (1) forcing 2 decimal places with toFixed(2), (2) inserting thousands separators with a regex replace, and (3) prefixing with "R".*/


function fmt(n) {
  return "R" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CartCard({ item, onChangeQty, onRemove, animDelay }) {
  const [removing, setRemoving] = useState(false);

  function handleRemove() {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  }

  const hasDiscount = item.originalPrice > item.price;

  return (
    <div
      className={`cart-card${removing ? " removing" : ""}`}
      style={{ animationDelay: animDelay + "s" }}
    >
      <div className="product-img">{item.emoji}</div>

      <div className="product-info">
        <div className="product-brand">{item.brand}</div>
        <div className="product-name">{item.name}</div>
        <div className="product-meta">
          {item.size  && <span className="tag">{item.size}</span>}
          {item.color && <span className="tag">{item.color}</span>}
        </div>
      </div>

      <div className="product-actions">
        <div className="product-price">
          {hasDiscount && <span className="original">{fmt(item.originalPrice)}</span>}
          {fmt(item.price * item.qty)}
        </div>

        <div className="qty-control">
          <button className="qty-btn" onClick={() => onChangeQty(item.id, -1)}>−</button>
          <div className="qty-value">{item.qty}</div>
          <button className="qty-btn" onClick={() => onChangeQty(item.id, +1)}>+</button>
        </div>

        <button className="remove-btn" onClick={handleRemove}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6M14 11v6"/>
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}

/*ShippingForm*/
function ShippingForm() {
  const [fields, setFields] = useState({
    firstName: "", lastName: "", address: "",
    city: "", province: "", postalCode: "",
  });

  function update(key, val) {
    setFields(prev => ({ ...prev, [key]: val }));
  }

  function handleContinue() {
    const missing = Object.entries(fields).find(([, v]) => !v.trim());
    if (missing) {
      alert("Please fill in all shipping fields before continuing.");
      return;
    }
    alert(` Shipping to:\n${fields.firstName} ${fields.lastName}\n${fields.address}, ${fields.city}\n${fields.province}, ${fields.postalCode}`);
  }

  const provinces = [
    "Gauteng","Western Cape","KwaZulu-Natal","Eastern Cape",
    "Free State","Limpopo","Mpumalanga","North West","Northern Cape",
  ];

  return (
    <div className="shipping-section">
      <div className="section-title">Shipping Details</div>
      <div className="form-grid">
        <div className="form-field">
          <label>First Name</label>
          <input type="text" placeholder="John" value={fields.firstName} onChange={e => update("firstName", e.target.value)} />
        </div>
        <div className="form-field">
          <label>Last Name</label>
          <input type="text" placeholder="Doe" value={fields.lastName} onChange={e => update("lastName", e.target.value)} />
        </div>
        <div className="form-field full">
          <label>Address</label>
          <input type="text" placeholder="123 Main Street" value={fields.address} onChange={e => update("address", e.target.value)} />
        </div>
        <div className="form-field">
          <label>City</label>
          <input type="text" placeholder="Cape Town" value={fields.city} onChange={e => update("city", e.target.value)} />
        </div>
        <div className="form-field">
          <label>Province</label>
          <select value={fields.province} onChange={e => update("province", e.target.value)}>
            <option value="">Select…</option>
            {provinces.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-field">
          <label>Postal Code</label>
          <input type="text" placeholder="0001" value={fields.postalCode} onChange={e => update("postalCode", e.target.value)} />
        </div>
      </div>
      <button className="continue-btn" onClick={handleContinue}>Continue to Payment →</button>
    </div>
  );
}

/*OrderSummary*/
function OrderSummary({ cart, promoDiscount, onCheckout, onExpress }) {
    {/*Die berekening van die subtotaal*/}
  const subtotal      = cart.reduce((s, i) => s + i.price * i.qty, 0);
  {/*Die afslag*/}
  const discount      = subtotal * promoDiscount;
  {/*Die subtotaal minus die afslag*/}
  const afterDiscount = subtotal - discount;
    {/*Die versendingskoste word slegs bygevoeg as daar items in die trollie is, anders is dit 0*/}
  const shipping      = cart.length ? SHIPPING : 0;
  {/*Die BTW word bereken op die subtotaal minus die afslag, en word slegs van toepassing as daar items in die trollie is. Anders is dit 0.*/}
  const vat           = afterDiscount * VAT_RATE;
  {/*Die totale bedrag is die subtotaal minus die afslag, plus die versendingskoste, plus die BTW. As daar geen items in die trollie is nie, is dit 0 omdat al drie komponente 0 is.*/}
  const total         = afterDiscount + shipping + vat;

  return (
    <div className="summary-card">
      <div className="summary-title">Order Summary</div>

      <div className="summary-row">
        <span className="label">Subtotal</span>
        <span className="value">{fmt(subtotal)}</span>
      </div>

      <div className="summary-row">
        <span className="label">Shipping</span>
        <span className="value">{cart.length ? fmt(shipping) : "—"}</span>
      </div>

        {/*Die VAT word slegs getoon as daar items in die trollie is, anders wys dit 'n streep ("—") om aan te dui dat dit nie van toepassing is nie.*/}
    
      <div className="summary-row">
        <span className="label">VAT (15%)</span>
        <span className="value">{fmt(vat)}</span>
      </div>

      <hr className="summary-divider" />

      <div className="summary-total">
        <span className="label">Total</span>
        <span className="amount">{fmt(total)}</span>
      </div>

      <button className="checkout-btn" onClick={() => onCheckout(fmt(total))}>
        Proceed to Checkout
      </button>
      <button className="btn btn-express" onClick={onExpress}>
         Express Checkout
      </button>

      <div className="trust-badges">
        <span className="trust-badge">Secure</span>
        <span className="trust-badge">30-day returns</span>
        <span className="trust-badge">Fast delivery</span>
      </div>

      <div className="payment-section">
        <div className="payment-label">Accepted Payments</div>
        <div className="payment-icons">
          {["VISA","MC","Amex","PayFast","EFT","Capitec Pay"].map(p => (
            <span key={p} className="pay-chip">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/*Cart*/
export default function Cart() {
  const [cart, setCart]             = useState(INITIAL_CART);
  const [promoDiscount, setPromo]   = useState(0);

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  function changeQty(id, delta) {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  function resetCart() {
    setCart([{
      id: 99, brand: "Adidas", name: "Ultraboost 23",
      size: "UK 10", color: "Core White",
      price: 3199, originalPrice: 3799, qty: 1, emoji: "👟",
    }]);
    setPromo(0);
  }

  function handleCheckout(total) {
    alert(`Proceeding to checkout!\n\nTotal: ${total}`);
  }

  return (
    <>

      <div className="page-title">
        Shopping Cart
        <span className="count">{totalQty} {totalQty === 1 ? "item" : "items"}</span>
      </div>

      <div className="layout">
        {/* LEFT */}
        <div>
          {cart.length === 0 ? (
            <div className="empty-state" style={{ display: "flex" }}>
              <div className="icon"></div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added anything yet.</p>
              <button className="btn btn-primary" onClick={resetCart}>Browse Products</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item, idx) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    animDelay={idx * 0.05}
                    onChangeQty={changeQty}
                    onRemove={removeItem}
                  />
                ))}
              </div>

              <ShippingForm />
            </>
          )}
        </div>

        {/* RIGHT */}
        <div>
          <OrderSummary
            cart={cart}
            promoDiscount={promoDiscount}
            onCheckout={handleCheckout}
            onExpress={() => alert(" Express checkout initiated!")}
          />
        </div>
      </div>
    </>
  );
}