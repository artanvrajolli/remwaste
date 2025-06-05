import { Button, TextInput, ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";

export default function ProductFiler({ filters, setFilters }: { filters: { heavyWaste: boolean, showNotAllowedOnRoad: boolean, minPrice?: number, maxPrice?: number }, setFilters: (filters: { heavyWaste: boolean, showNotAllowedOnRoad: boolean, minPrice?: number, maxPrice?: number }) => void }) {
    const [minPrice, setMinPrice] = useState<number | undefined>(filters.minPrice);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(filters.maxPrice);

    const handleApplyPriceFilter = () => {
        setFilters({ ...filters, minPrice, maxPrice });
    };

    return (
        <div className="sticky top-20 border border-gray-200 bg-white p-4 rounded-lg">
            <div className="flex flex-col gap-2">
                <div className="flex mb-2 justify-between items-center">
                    <label className="text-sm " htmlFor="price">Heavy Waste</label>
                    <ToggleSwitch id="heavy-waste" checked={filters.heavyWaste} onChange={() => setFilters({ ...filters, heavyWaste: !filters.heavyWaste })} />
                </div>
                <div className="flex mb-3 justify-between items-center">
                    <label className="text-sm" htmlFor="show-not-allowed-on-road">Hide '<span className="font-medium">Not allowed on road</span>'</label>
                    <ToggleSwitch id="show-not-allowed-on-road" checked={filters.showNotAllowedOnRoad} onChange={() => setFilters({ ...filters, showNotAllowedOnRoad: !filters.showNotAllowedOnRoad })} />
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="flex flex-col gap-2">
                    <h3 className="text-sm flex items-center gap-2 font-medium">
                        <AiOutlineDollarCircle className="size-6 text-slate-400" />
                        Filter by Price
                    </h3>
                    <div className="flex items-center gap-2">
                        <TextInput
                            id="min-price"
                            type="number"
                            placeholder="Min"
                            value={minPrice === undefined ? '' : minPrice}
                            onChange={(e) => setMinPrice(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                            className="w-1/2 bg-white"
                        />
                        <span className="text-gray-500">to</span>
                        <TextInput
                            id="max-price"
                            type="number"
                            placeholder="Max"
                            value={maxPrice === undefined ? '' : maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                            className="w-1/2"
                        />
                    </div>
                    <Button onClick={handleApplyPriceFilter} color="primary" size="sm" className="w-full cursor-pointer mt-2">
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    )
}
