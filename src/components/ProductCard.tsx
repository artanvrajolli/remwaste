import { RiAlertLine } from "react-icons/ri";
import { RiWeightLine } from "react-icons/ri";
import { FiPlus, FiCheck } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export interface ProductType {
    id: number;
    name: string;
    imageUrl: string;
    currentPrice: number;
    allowedOnRoad: boolean;
    allowsHeavyWaste: boolean;
    hirePeriodDays: number;
    vat: number;
}

interface ProductCardProps {
    product: ProductType;
    onCardClick: (product: ProductType) => void;
}

export default function ProductCard({ product, onCardClick }: ProductCardProps) {
    const { addToCart, removeFromCart, state } = useCart();

    const cartItem = state.items.find(item => item.id === product.id);
    const isInCart = !!cartItem;
    const quantityInCart = cartItem?.quantity || 0;

    const handlePurchaseClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCardClick(product);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    return (<div
        className={`border hover:shadow-md ${isInCart
            ? 'border-green-400 bg-green-50'
            : 'border-gray-200'
            } rounded-lg flex flex-col items-center text-center shadow-sm transition-all duration-200 relative cursor-pointer`}
        onClick={() => onCardClick(product)}
    ><button
        onClick={handleAddToCart}
        className={`absolute top-2 right-2 z-10 ${isInCart
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-[#e15726] hover:bg-[#d35f30]'
            } text-white cursor-pointer rounded-full p-2 transition-colors shadow-md focus:outline-none focus:ring-2 ${isInCart ? 'focus:ring-green-600' : 'focus:ring-[#e15726]'
            } focus:ring-opacity-50`}
        aria-label={isInCart ? `In cart (${quantityInCart})` : "Add to cart"}
        title={isInCart ? `In cart (${quantityInCart})` : "Add to cart"}
    >
            {isInCart ? (
                <FiCheck className="w-4 h-4" />
            ) : (
                <FiPlus className="w-4 h-4" />
            )}
        </button>

        <div className="relative">
            {
                !product.allowedOnRoad && (
                    <span className="absolute bottom-0 left-2 bg-[#e15726] text-white pointer-events-none flex items-center bg-primary  font-medium text-xs px-1.5 py-0.5 rounded italic mt-3 h-[22px] mr-auto ">
                        <RiAlertLine className="w-5 h-5 mr-1" />
                        Not allowed on road
                    </span>
                )
            }
            {
                product.allowsHeavyWaste && (
                    <span className="absolute top-0 left-2 flex items-center rounded bg-[#e9f1fb] text-[#174e97] italic mt-3 text-xs px-1.5 py-0.5">
                        <RiWeightLine className="w-5 h-5 mr-1" />
                        Heavy waste
                    </span>
                )
            }
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-60 object-contain mb-4"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/skips/40-yarder-skip.png';
                }}
            />
        </div>
        <div className="p-4 text-left w-full">
            <h3 className="text-gray-700 text-sm md:text-base product-title-lines hover:underline font-medium mb-2">
                {product.name} Yard Skip
            </h3>
            <span className="price font-bold text-gray-700 text-base md:text-xl">£{product.currentPrice.toFixed(2)}</span>
            {product.vat && (
                <span className="text-xs text-gray-500 ml-2">VAT: £{product.vat?.toFixed(2) ?? 'N/A'}</span>
            )}            <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                    {product.hirePeriodDays} days hire
                </div>

                {isInCart && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                        <FiCheck className="w-3 h-3 mr-1" />
                        In Cart ({quantityInCart})
                    </span>
                )}
            </div>

            <button
                onClick={handlePurchaseClick}
                className="mt-4 cursor-pointer w-full bg-[#e15726] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#e15726] focus:ring-opacity-50"
            >
                Purchase
            </button>
        </div>
    </div>
    );
} 