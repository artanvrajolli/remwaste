import { ProductType } from "./ProductCard";

interface ProductInfoModalProps {
    product: ProductType;
    onClose: () => void;
    onContinuePurchase: () => void;
}

export default function ProductInfoModal({ product, onClose, onContinuePurchase }: ProductInfoModalProps) {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{product.name} Yard Skip</h2>
                <button
                    onClick={onClose}
                    className="text-[#e4673b] cursor-pointer hover:text-[#d35f30] text-2xl"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </div>
            <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover rounded-md w-full h-full"
                />
            </div>
            <div className="space-y-2 text-gray-700">
                <p>
                    <strong>Price:</strong> £{product.currentPrice.toFixed(2)} (VAT: £{product.vat.toFixed(2)})
                </p>
                <p>
                    <strong>Hire Period:</strong> {product.hirePeriodDays} days
                </p>
                <p>
                    <strong>Allowed on Road:</strong> {product.allowedOnRoad ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Allows Heavy Waste:</strong> {product.allowsHeavyWaste ? "Yes" : "No"}
                </p>
            </div>
            <button
                onClick={onContinuePurchase}
                className="mt-6 w-full cursor-pointer bg-[#e4673b] text-white py-2 px-4 rounded-md hover:bg-[#d35f30] transition-colors"
            >
                Continue Purchase
            </button>
        </>
    );
} 