const CardActions = () => {
    return (
        <div className="h-10 p-2 w-full bg-base-200 rounded-md items-center justify-between flex">
            <div className="">
                <button className="btn btn-primary btn-xs mr-2">New Expense</button>
                <button className="btn btn-primary btn-xs mr-2">Delete Expense</button>
            </div>
            <div className="">
                <button className="btn btn-neutral btn-xs mr-2">Edit Layout</button>
                <button className="btn btn-error btn-xs">Reset Layout</button>
            </div>
        </div>
    )
}

export default CardActions