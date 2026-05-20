import React, { useState, useEffect, useMemo } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from 'react-bootstrap';
import './Products.css';

// Die is die URL van die backend, wat in die .env file gedefinieer is.
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Hierdie helper normaliseer die produkdata wat van die backend af kom.
function normaliseProduct(doc) {
  return {
    id: doc._id,
    name: doc.name,
    description: doc.description || '',
    price: doc.price,
    category: doc.category || 'Uncategorized',
    img: doc.imgURL || '',
    stock: doc.stock ?? 0,
    badge: deriveBadge(doc),
  };
}

// Hierdie funksie bepaal watter badge 'n produk kry op grond van sy voorraad.
function deriveBadge(doc) {
  // As die produk se voorraad 0 is, gee dit 'n "Out of Stock" badge.
  if (doc.stock === 0) {
    return { text: 'Out of Stock' };
  }
  // As die produk se voorraad minder as 5 is, gee dit 'n "Low Stock" badge.
  if (doc.stock < 5) {
    return { text: 'Low Stock' };
  }
  // As die produk onlangs geskep is (binne die laaste 7 dae), gee dit 'n "New" badge.
  if (doc.createdAt) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    if (new Date(doc.createdAt) > sevenDaysAgo) {
      return { text: 'New' };
    }
    return null;
  }
}

// Hierdie is 'n statiese lys van beskikbare kleure vir die produkkaarte.
const COLORS = [
  { label: 'Black',  hex: '#1a1a2e' },
  { label: 'White',  hex: '#c0c8d8' },
  { label: 'Blue',   hex: '#3a7bd5' },
  { label: 'Red',    hex: '#e05555' },
  { label: 'Green',  hex: '#3dba6f' },
  { label: 'Yellow', hex: '#f0c040' },
];

function ProductCard({ product, isWishlisted, onWishlistToggle, onSelect }) {
  const badgeLabels = { new: 'NEW', low: 'LOW', out: 'OUT', sale: 'SALE', hot: 'HOT' };
 
  return (
    <Card className="product_card" onClick={() => onSelect(product)}>
 
      {/*Gebruik die img veld om die produk se prentjie te wys. As daar geen prentjie is nie, wys 'n emoji as 'n houer.*/}
      {product.img ? (
        <Card.Img variant="top" src={product.img} alt={product.name} loading="lazy" />
      ) : (
        <div className="card_img_placeholder"></div>
      )}
 
      <Card.Body>
        {/* Die naam veld */}
        <Card.Title className="card_title">{product.name}</Card.Title>
 
        {/* Category + die stock */}
        <p className="card_subtitle_text">
          {product.category}
          {' · '}
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
 
        <div className="card_footer_row">
          {/* Prys Veld */}
          <span className="card_price">${product.price}</span>
 
          <div className="card_actions">
            {product.badge && (
              <Badge className={`product_badge badge-${product.badge}`}>
                {badgeLabels[product.badge] || product.badge}
              </Badge>
            )}
 
            <button
              className={`wishlist_btn ${isWishlisted ? 'active' : ''}`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              onClick={(e) => {
                e.stopPropagation(); // Stop die kliek can die kaart om die wishlist toggle te hanteer sonder om die kaart se onSelect te aktiveer
                onWishlistToggle(product.id);
              }}
            >
            {/* Gebruik 'n hart-emoji as die wishlist-ikoon, en verander dit op grond van of die produk in die wishlist is of nie. */}
              {isWishlisted ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

// Hierdie is die modale komponent wat gedetailleerde inligting oor 'n produk wys wanneer dit gekies word.
function ProductModal({ product, isWishlisted, onWishlistToggle, onHide }) {
  if (!product) return null;
 
  const outOfStock = product.stock === 0;
 
  // Gebruik die velde van die produck om die model se inhoud te vul.
  return (
    <Modal show={!!product} onHide={onHide} centered className="product_modal">
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
 
      <Modal.Body>
        {/* imgURL */}
        {product.img ? (
          <img src={product.img} alt={product.name} className="modal_product_img" />
        ) : (
          // As daar geen prentjie is nie, wys 'n houer met 'n emoji of teks.
          <div className="modal_product_img_placeholder"></div>
        )}
 
        {/* Prys */}
        <p className="modal_price">${product.price}</p>
 
        {/* Category */}
        <p className="modal_cat">Category: {product.category}</p>
 
        {/* Stock */}
        <p className="modal_stock">
          Stock:{' '}
          <span style={{ color: outOfStock ? 'var(--badge-sale-txt)' : 'inherit' }}>
            {outOfStock ? 'Out of stock' : `${product.stock} available`}
          </span>
        </p>

         {/* Deskripsie */}
        {product.description && (
          <p className="modal_desc" style={{ marginTop: 10, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {product.description}
          </p>
        )}
 
        {/* Add to Cart, disabled when stock is 0 */}
        <button
          className="btn_add_cart"
          disabled={outOfStock}
          style={{ opacity: outOfStock ? 0.5 : 1, cursor: outOfStock ? 'not-allowed' : 'pointer' }}
        >
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
 
        <Button
          variant="link"
          style={{ display: 'block', marginTop: 10, color: 'var(--text-muted)', fontSize: 13 }}
          onClick={() => onWishlistToggle(product.id)}
        >
          {isWishlisted ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

// Hierdie komponent is die sybalk wat verskeie filters bevat wat gebruikers kan toepas om die produklys te verfyn.
function FilterSidebar({ filters, categories, onFiltersChange, onApply, onClear }) {
 
  //Die funksie toggleArray hanteer die toggling van checkbox filters soos kategorieë.
  const toggleArray = (key, value) => {
    const next = filters[key].includes(value)
      ? filters[key].filter((v) => v !== value)
      : [...filters[key], value];
    onFiltersChange({ ...filters, [key]: next });
  };
 
  //Die funksie hanteer die kleure filter.
  const toggleColor = (label) => {
    const next = filters.colors.includes(label)
      ? filters.colors.filter((c) => c !== label)
      : [...filters.colors, label];
    onFiltersChange({ ...filters, colors: next });
  };
 
  return (
    <aside className="product_sidebar">
      <p className="sidebar_title">Filters</p>
 
      {/* Category lys */}
      <div className="filter_section">
        <p className="filter_section_title">Category</p>
        {categories.length === 0 && (
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Loading…</p>
        )}
        {categories.map((cat) => (
          <Form.Check
            key={cat}
            type="checkbox"
            id={`cat-${cat}`}
            label={cat}
            className="filter_check"
            checked={filters.categories.includes(cat)}
            onChange={() => toggleArray('categories', cat)}
          />
        ))}
      </div>
 
      {/* Price range */}
      <div className="filter_section">
        <p className="filter_section_title">Price Range</p>
        <div className="price_range">
          <Form.Control
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => onFiltersChange({ ...filters, minPrice: Number(e.target.value) })}
          />

          {/* 'n eenvoudige separator tussen die minimum en maksimum prys invoervelde */}
          <span className="price_separator">–</span>
          <Form.Control
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => onFiltersChange({ ...filters, maxPrice: Number(e.target.value) })}
          />
        </div>
      </div>
 
      {/* Colour swatches(UI Only) */}
      <div className="filter_section">
        <p className="filter_section_title">Color</p>
        <div className="color_swatches">
          {COLORS.map(({ label, hex }) => (
            <div
              key={label}
              className={`color_swatch ${filters.colors.includes(label) ? 'active' : ''}`}
              style={{ backgroundColor: hex }}
              title={label}
              role="checkbox"
              aria-checked={filters.colors.includes(label)}
              tabIndex={0}
              onClick={() => toggleColor(label)}
              onKeyDown={(e) => e.key === 'Enter' && toggleColor(label)}
            />
          ))}
        </div>
      </div>
 
      {/* Availability(Gebruik die stock veld) */}
      <div className="filter_section">
        <p className="filter_section_title">Availability</p>
        <Form.Check
          type="checkbox"
          id="instock-only"
          label="In stock only"
          className="filter_check"
          checked={filters.inStockOnly}
          onChange={() => onFiltersChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </div>
 
      <button className="btn_apply" onClick={onApply}>Apply Filters</button>
      <button className="btn_clear" onClick={onClear}>Clear All</button>
    </aside>
  );
}

// Hierdie is die hoofkomponent vir die Products bladsy, wat die produklys, filters, en modale logika hanteer.
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
 
        const response = await fetch(`${API_BASE}/api/products`);
 
        if (!response.ok) {
          // As die response status nie 200-299 is nie, gooi 'n fout met die status kode en teks.
          throw new Error(`Server error ${response.status}: ${response.statusText}`);
        }

        // Probeer om die response as JSON te parseer. As dit misluk, sal dit 'n fout gooi wat deur die catch blok hanteer word.
        const data = await response.json();   
        setProducts(data.map(normaliseProduct));
        
      } catch (err) {
        // Covers: network down, wrong URL, CORS blocked, JSON parse failure
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    fetchProducts();
  }, []);

    // Hierdie useMemo hook bereken die unieke kategorieë uit die produklys en sorteer dit alfabeties.
  const categoryOptions = useMemo(() => {
    return [...new Set(products.map((p) => p.category))].sort();
  }, [products]);

// Let op: Hierdie is 'n helper funksie wat die rou data van die backend normaliseer in die formaat wat die frontend verwag.
  const emptyFilters = {
    categories:  [],
    minPrice:    0,
    maxPrice:    9999,
    colors:      [],
    inStockOnly: false,
  };

// Hierdie state hou die huidige filters wat die gebruiker aanpas (maar nog nie toegepas het nie) en die filters wat tans op die produklys van toepassing is.
  const [pendingFilters, setPendingFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [search,         setSearch]         = useState('');
  const [sort,           setSort]           = useState('default');
  const [wishlist,       setWishlist]       = useState(new Set());
  const [selected,       setSelected]       = useState(null);
 
  const handleApply = () => setAppliedFilters({ ...pendingFilters });
 
  const handleClear = () => {
    setPendingFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
  };

  // Hierdie funksie word gebruik om 'n filter tag te verwyder wanneer die gebruiker op die "x" op 'n tag kliek.
    const removeTag = (type, value) => {
    const f = { ...appliedFilters };
    if (type === 'category') f.categories  = f.categories.filter((v) => v !== value);
    if (type === 'color')    f.colors      = f.colors.filter((v) => v !== value);
    if (type === 'inStock')  f.inStockOnly = false;
    setAppliedFilters(f);
    setPendingFilters(f);
  };
 
  // Hierdie funksie hanteer die toggling van 'n produk in die wishlist wanneer die gebruiker op die hart-ikoon kliek.
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Hierdie useMemo hook bereken die gefiltreerde en gesorteerde lys van produkte op grond van die toegepaste filters, soekterm, en sortering.
  const filtered = useMemo(() => {
    const f = appliedFilters;
 
    let list = products.filter((p) => {
      if (f.categories.length && !f.categories.includes(p.category))           return false;
      if (p.price < f.minPrice || p.price > f.maxPrice)                        return false;
      if (f.inStockOnly && p.stock === 0)                                       return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.category.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
 
    switch (sort) {
      case 'price-asc':   list = [...list].sort((a, b) => a.price - b.price);            break;
      case 'price-desc':  list = [...list].sort((a, b) => b.price - a.price);            break;
      case 'name':        list = [...list].sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'stock-desc':  list = [...list].sort((a, b) => b.stock - a.stock);            break;
      default: break;
    }
    return list;
  }, [products, appliedFilters, search, sort]);
 
  // Hierdie array bereken die aktiewe filter tags wat bo die produklys vertoon word, gebaseer op die toegepaste filters.
  const activeTags = [
    ...appliedFilters.categories.map((v) => ({ type: 'category', label: v,             value: v    })),
    ...appliedFilters.colors.map((v)      => ({ type: 'color',    label: v,             value: v    })),
    ...(appliedFilters.inStockOnly        ? [{ type: 'inStock',   label: 'In stock only', value: null }] : []),
  ];

   return (
    <div className="product_page">
 
      {/*  Sidebar */}
      <FilterSidebar
        filters={pendingFilters}
        categories={categoryOptions}         
        onFiltersChange={setPendingFilters}
        onApply={handleApply}
        onClear={handleClear}
      />
 
      {/* Main content */}
      <main className="product_main">
 
        {/* Top bar */}
        <div className="product_topbar">
          <input
            type="text"
            className="search_input"
            placeholder="Search by name, category or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="sort_select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name">Name A to Z</option>
            <option value="stock-desc">Most Stock</option>
          </select>
          <span className="result_count">
            {loading ? 'Loading…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>
 
        {/* Active filter tags */}
        {activeTags.length > 0 && (
          <div className="active_filters">
            {activeTags.map((tag) => (
              <span
                key={`${tag.type}-${tag.value}`}
                className="filter_tag"
                onClick={() => removeTag(tag.type, tag.value)}
              >
                <span className="filter_tag_close">✕</span>
                {tag.label}
              </span>
            ))}
          </div>
        )}
 
        {/* LOADING STATE */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Spinner animation="border" style={{ color: 'var(--accent)' }} />
            <p style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: 13 }}>
              Loading products from server…
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <Alert
            style={{
              background: 'var(--badge-sale-bg)',
              color: 'var(--badge-sale-txt)',
              border: 'none',
              borderRadius: 8,
            }}
          >
            <strong>Could not load products.</strong> {error}
            <br />
            <small>
              Check that your Express server is running on the correct port
              and that REACT_APP_API_URL in your .env matches it.
            </small>
          </Alert>
        )}

        {/* Product grid */}
         {!loading && !error && (
          <Container fluid className="product_container">
            <Row className="product_row">
              {filtered.length === 0 ? (
                <div className="empty_state">
                  <p>No products match your filters.</p>
                </div>
              ) : (
                filtered.map((product) => (
                  <Col
                    key={product.id}
                    xs={6} sm={4} md={3} lg={3} xl={2}
                    className="p-1"
                  >
                    <ProductCard
                      product={product}
                      isWishlisted={wishlist.has(product.id)}
                      onWishlistToggle={toggleWishlist}
                      onSelect={setSelected}
                    />
                  </Col>
                ))
              )}
            </Row>
          </Container>
        )}
      </main>
 
      {/* Product detail modal */}
      <ProductModal
        product={selected}
        isWishlisted={selected ? wishlist.has(selected.id) : false}
        onWishlistToggle={toggleWishlist}
        onHide={() => setSelected(null)}
      />
    </div>
  );
}

