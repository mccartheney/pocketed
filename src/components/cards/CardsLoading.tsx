import CardLoadingItem from "./CardLoadingItem";

const CardsLoading = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4 md:max-h-[81%] overflow-y-scroll">
            <CardLoadingItem />
            <CardLoadingItem/>
            <CardLoadingItem/>
            <CardLoadingItem/>
            <CardLoadingItem />
          
        </div>
    )
}

export default CardsLoading;