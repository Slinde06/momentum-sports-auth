// // Navbar.js

// import React from 'react';
// import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

// import '../components/Navbar.css';

// import Home from '../Pages/Home';
// import Products from '../Pages/Products';
// import Support from '../Pages/Support';
// import About from '../Pages/About';
// import Upload from '../Pages/Upload';
// import Cart from '../Pages/Cart';
// import LoginPage from '../Pages/LoginPage';

// /* ───────────────── Icons ───────────────── */

// function CartIcon() {
//   return (
//     <svg
//       width="22"
//       height="22"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M6 6h15l-1.5 9h-12L6 6Z"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinejoin="round"
//       />

//       <path
//         d="M6 6 5 3H2"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />

//       <path
//         d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
//         fill="currentColor"
//       />

//       <path
//         d="M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }

// function ProfileIcon() {
//   return (
//     <svg
//       width="22"
//       height="22"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
//         stroke="currentColor"
//         strokeWidth="2"
//       />

//       <path
//         d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// /* ───────────────── Navbar ───────────────── */

// function Navbar() {
//   return (
//     <BrowserRouter>

//       <nav className="navbar">

//         {/* Logo */}
//         <div className="navbar__brand">
//           <img
//             className="navbar__logo"
//             src="./imgs/Asset 6@8x.png"
//             alt="Momentum Sports"
//           />
//         </div>

//         {/* Links */}
//         <div className="navbar__links">
//           <Link className="nav-link" to="/home">Home</Link>
//           <Link className="nav-link" to="/products">Products</Link>
//           <Link className="nav-link" to="/support">Support</Link>
//           <Link className="nav-link" to="/about">About</Link>
//           <Link className="nav-link" to="/upload">Upload</Link>
//         </div>

//         {/* Search */}
//         <div className="navbar__search">
//           <input
//             className="search-input"
//             type="text"
//             placeholder="Search..."
//           />
//         </div>

//         {/* Icons */}
//         <div className="navbar__icons">

//           <Link className="icon-link" to="/cart">
//             <span className="icon-circle">
//               <CartIcon />
//             </span>
//           </Link>

//           <Link className="icon-link" to="/login">
//             <span className="icon-circle">
//               <ProfileIcon />
//             </span>
//           </Link>

//         </div>

//       </nav>

//       {/* Routes */}
//       <Routes>
//         <Route path="/home" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/support" element={<Support />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/upload" element={<Upload />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/login" element={<LoginPage />} />
//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default Navbar;





import React from 'react';
import {
  BrowserRouter,
  NavLink,
  Routes,
  Route,
} from 'react-router-dom';

import '../components/Navbar.css';

import Home from '../Pages/Home';
import Products from '../Pages/Products';
import Support from '../Pages/Support';
import About from '../Pages/About';
import Upload from '../Pages/Upload';
import Cart from '../Pages/Cart';
import LoginPage from '../Pages/LoginPage';

/* ───────────────── Icons ───────────────── */

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="9" cy="20" r="1" fill="currentColor" />
      <circle cx="18" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ───────────────── Navbar ───────────────── */


function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__brand">
        <img
          className="navbar__logo"
          src="./imgs/Asset 6@8x.png"
          alt="Momentum Sports"
        />
      </div>
      {/* Links */}
      <div className="navbar__links">
        <NavLink to="/home" className="nav-link">Home</NavLink>
        <NavLink to="/products" className="nav-link">Products</NavLink>
        <NavLink to="/support" className="nav-link">Support</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>
        <NavLink to="/upload" className="nav-link">Upload</NavLink>
      </div>
      {/* Right Side */}
      <div className="navbar__right">
        {/* Search */}
        <div className="navbar__search">
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
          />
        </div>
        {/* Icons */}
        <div className="navbar__icons">
          <NavLink className="icon-link" to="/cart">
            <span className="icon-circle">
              <CartIcon />
            </span>
          </NavLink>
          <NavLink className="icon-link" to="/login">
            <span className="icon-circle">
              <ProfileIcon />
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;