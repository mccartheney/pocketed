const CardLoadingItem = () => {
    return (
        <div className="mt-2 w-full h-52 m-auto bg-base-200 rounded-xl relative shadow-2xl skeleton">
            {/* Top-right button skeleton */}
            <div className="absolute top-4 right-4">
                <div className="btn btn-xs btn-ghost bg-base-300  h-6 w-6"></div>
            </div>

            <div className="w-full px-8 absolute top-8 space-y-4">
                {/* Name section */}
                <div className="flex justify-between">
                    <div className="space-y-2">
                        <div className="h-3 w-16 bg-base-300 rounded-full"></div>
                        <div className="h-4 w-24 bg-base-300 rounded-full"></div>
                    </div>
                    {/* <div className="w-14 h-14 rounded-full bg-base-300"></div> */}
                </div>

                {/* Card name section */}
                <div className="space-y-2">
                    <div className="h-3 w-20 bg-base-300 rounded-full"></div>
                    <div className="h-4 w-32 bg-base-300 rounded-full"></div>
                </div>

                {/* Bottom info section */}
                <div className="pt-6 pr-6">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <div className="h-3 w-16 bg-base-300 rounded-full"></div>
                            <div className="h-4 w-12 bg-base-300 rounded-full"></div>
                        </div>
                        <div className="space-y-1">
                            <div className="h-3 w-16 bg-base-300 rounded-full"></div>
                            <div className="h-4 w-12 bg-base-300 rounded-full"></div>
                        </div>
                        <div className="space-y-1 flex flex-col items-center">
                            <div className="h-3 w-16 bg-base-300 rounded-full"></div>
                            <div className="avatar-group -space-x-3">
                                <div className="avatar">
                                    <div className="w-6 bg-base-300 rounded-full"></div>
                                </div>
                                <div className="avatar">
                                    <div className="w-6 bg-base-300 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CardLoadingItem