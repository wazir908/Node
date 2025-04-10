import React from "react";
import { FaTimes } from "react-icons/fa"; // Import Close Icon

const QuickViewPopup = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[80%] md:w-[60%] lg:w-[40%] p-5 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
        >
          <FaTimes />
        </button>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Product Image */}
          <div className="flex-1">
            <img
              src={product.selectedVariant?.images?.[0]?.url || "/default-image.jpg"}
              alt={product.title}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          {/* Product Info */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-800">
                ${product.selectedVariant?.price}
              </p>
              {product.selectedVariant.compareAtPrice && (
                <span className="text-sm line-through text-gray-400">
                  ${product.selectedVariant.compareAtPrice}
                </span>
              )}
            </div>
            {/* Variant Swatches */}
            <div className="flex gap-2 mt-4">
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => {}}
                  className="w-6 h-6 rounded-full border-2"
                  style={{ backgroundColor: variant.colorHex }}
                />
              ))}
            </div>
            {/* Add to Cart Button */}
            <button className="mt-5 w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewPopup;