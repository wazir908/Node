import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import mockProduct from '../lib/mockProduct'; // Ensure the path is correct
import { FaEye, FaCartArrowDown } from 'react-icons/fa';
import QuickViewPopup from './QuickViewPopup'; // Import the QuickViewPopup component


export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Create separate product entries per variant for display
    const variantProducts = mockProduct.variants.map((variant) => ({
      ...mockProduct,
      variants: [variant], // Only one variant per product
      selectedVariant: variant
    }));

    setTimeout(() => {
      setProducts(variantProducts);
    }, 500); // Simulated loading
  }, []);

  if (products.length === 0) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [hovered, setHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup

  const mainImage = selectedVariant?.images?.[0]?.url || '/productimages/default.jpg';
  const hoverImage = selectedVariant?.images?.[1]?.url || mainImage;

  const savings = (parseFloat(selectedVariant.compareAtPrice) - parseFloat(selectedVariant.price)).toFixed(2);

  const handleQuickViewClick = () => {
    setShowPopup(true); // Open the popup when clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div
      className="group relative w-full max-w-xs bg-white rounded-2xl border border-gray-300 overflow-hidden transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Sale Badge */}
      {product.isOnSale && selectedVariant.compareAtPrice && (
        <div className="absolute top-3 left-3 z-10 bg-white border-2 border-red-600 flex items-center gap-1 px-2 py-0.5 rounded-full">
          <span className="line-through text-red-600 font-semibold text-xs">
            ${parseFloat(selectedVariant.compareAtPrice - selectedVariant.price).toFixed(2)}
          </span>
          <span className="ml-1 font-bold text-black text-xs">
            ({((selectedVariant.compareAtPrice - selectedVariant.price) / selectedVariant.compareAtPrice * 100).toFixed(0)}% OFF)
          </span>
        </div>
      )}

      {/* Image */}
      <div className="aspect-[4/5] w-full overflow-hidden rounded-t-xl relative">
        <img
          src={hovered ? hoverImage : mainImage}
          alt={product.title}
          className="h-full w-full object-cover transition-opacity duration-500 shadow-sm"
        />

        {/* Hover Actions: Quick View & Buy Now */}
        {hovered && (
          <div className="absolute bottom-5 left-5 right-5 flex justify-between gap-1">
            {/* Quick View Button (White) */}
            <button
              onClick={handleQuickViewClick}
              className="flex items-center justify-center gap-2 text-xs bg-white text-black px-6 py-1 w-[150px] rounded-md border-2 border-black hover:bg-gray-100 transition"
            >
              <FaEye /> {/* Quick View Icon */}
              Quick View
            </button>

            {/* Buy Now Button (Black) */}
            <button className="flex items-center justify-center gap-2 text-xs bg-black text-white px-6 py-1 w-[150px] rounded-md border-2 border-black hover:bg-gray-800 transition">
              <FaCartArrowDown /> {/* Buy Now Icon */}
              Buy Now
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3">
        <p className="text-xs text-gray-500 font-medium">{product.brand}</p> {/* Brand name reduced size */}
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-medium text-gray-800">
            ${selectedVariant.price}
          </span>
          {selectedVariant.compareAtPrice && (
            <span className="text-sm font-bold text-red-600 line-through">
              ${selectedVariant.compareAtPrice}
            </span>
          )}
        </div>

        {/* Swatches */}
        <div className="flex gap-2 mt-4">
          {mockProduct.variants.map((variant, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedVariant(variant)}
              className={twMerge(
                "w-6 h-6 rounded-full border-2 transition-all",
                selectedVariant.color === variant.color
                  ? "border-gray-900"
                  : "border-gray-300"
              )}
              style={{ backgroundColor: variant.colorHex }}
              aria-label={`Color swatch: ${variant.color}`}
            />
          ))}
        </div>
      </div>

      {/* Quick View Popup */}
      {showPopup && <QuickViewPopup product={product} selectedVariant={selectedVariant} onClose={handleClosePopup} />}
    </div>
  );
}