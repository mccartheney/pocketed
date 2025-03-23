const LoadingFriends = () => {
    return (
        <div className="w-2/6 h-full bg-base-200 rounded-2xl p-3 flex flex-col">
            {/* header */}
            <div className="flex flex-row items-center justify-between">
                <div className={`w-1/2 flex flex-row items-center justify-center text-sm cursor-pointer $"text-primary"`}>connected friends</div>
                <div className="divider z-10 divider-horizontal" />
                <div className={`w-1/2 flex flex-row items-center justify-center text-sm cursor-pointer "text-base-content"`}>Unconnected friends</div>
            </div>

            <div className="w-full h-full skeleton mt-3"></div>
        </div>
    )
}

export default LoadingFriends