import { ProductType } from '../components/ProductCard';

interface SkipApiResponse {
    id: number;
    size: string;
    price_before_vat: number;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
    hire_period_days: number;
    vat: number;
}

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export const fetchSkipsByLocation = async (
    postcode: string = 'NR32',
    area: string = 'Lowestoft'
): Promise<ProductType[]> => {
    let response = null;
    try {
        response = await fetch(
            `${API_BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`
        ); if (!response.ok) {
            throw new Error(`Failed to fetch skips: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching skips:', error); response = new Response(JSON.stringify(fallBackProducts), {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'application/json',
                'x-comment-from-developer': 'Using fallback products if server response changes in the future'
            },
        });
    }
    const data: SkipApiResponse[] = await response.json();
    const processedProducts: ProductType[] = data.map((product) => ({
        id: product.id,
        name: product.size,
        imageUrl: `/skips/${product.size}-yarder-skip.png`,
        currentPrice: product.price_before_vat,
        allowedOnRoad: product.allowed_on_road,
        allowsHeavyWaste: product.allows_heavy_waste,
        hirePeriodDays: product.hire_period_days,
        vat: product.vat,
    }));
    return processedProducts;
};

export const handleApiError = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred while fetching data';
};



const fallBackProducts = [{ "id": 17933, "size": 4, "hire_period_days": 14, "transport_cost": null, "per_tonne_cost": null, "price_before_vat": 278, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:46.897146", "updated_at": "2025-04-07T13:16:52.813", "allowed_on_road": true, "allows_heavy_waste": true }, { "id": 17934, "size": 6, "hire_period_days": 14, "transport_cost": null, "per_tonne_cost": null, "price_before_vat": 305, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:46.897146", "updated_at": "2025-04-07T13:16:52.992", "allowed_on_road": true, "allows_heavy_waste": true }, { "id": 17935, "size": 8, "hire_period_days": 14, "transport_cost": null, "per_tonne_cost": null, "price_before_vat": 375, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:46.897146", "updated_at": "2025-04-07T13:16:53.171", "allowed_on_road": true, "allows_heavy_waste": true }, { "id": 17936, "size": 10, "hire_period_days": 14, "transport_cost": null, "per_tonne_cost": null, "price_before_vat": 400, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:46.897146", "updated_at": "2025-04-07T13:16:53.339", "allowed_on_road": false, "allows_heavy_waste": false }, { "id": 17937, "size": 12, "hire_period_days": 14, "transport_cost": null, "per_tonne_cost": null, "price_before_vat": 439, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:46.897146", "updated_at": "2025-04-07T13:16:53.516", "allowed_on_road": false, "allows_heavy_waste": false }, { "id": 17938, "size": 14, "hire_period_days": 14, "transport_cost": null, "per_tonne_cost": null, "price_before_vat": 470, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:46.897146", "updated_at": "2025-04-07T13:16:53.69", "allowed_on_road": false, "allows_heavy_waste": false }, { "id": 17939, "size": 16, "hire_period_days": 14, "transport_cost": null, "per_tonne_cost": null, "price_before_vat": 496, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:46.897146", "updated_at": "2025-04-07T13:16:53.876", "allowed_on_road": false, "allows_heavy_waste": false }, { "id": 15124, "size": 20, "hire_period_days": 14, "transport_cost": 248, "per_tonne_cost": 248, "price_before_vat": 992, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:40.344435", "updated_at": "2025-04-07T13:16:52.434", "allowed_on_road": false, "allows_heavy_waste": true }, { "id": 15125, "size": 40, "hire_period_days": 14, "transport_cost": 248, "per_tonne_cost": 248, "price_before_vat": 992, "vat": 20, "postcode": "NR32", "area": "", "forbidden": false, "created_at": "2025-04-03T13:51:40.344435", "updated_at": "2025-04-07T13:16:52.603", "allowed_on_road": false, "allows_heavy_waste": false }];