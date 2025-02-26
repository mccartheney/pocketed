const CardsLoading = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <div className="skeleton h-52"></div>
            <div className="skeleton h-52"></div>
            <div className="skeleton h-52"></div>
            <div className="skeleton h-52"></div>
            <div className="skeleton h-52"></div>
        </div>
    )
}

export default CardsLoading;