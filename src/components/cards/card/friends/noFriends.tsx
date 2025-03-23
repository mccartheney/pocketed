import Link from "next/link"

const NoFriends = () => {
    return (
        <div className="flex flex-col items-center justify-center text-sm h-full">
            <p className="text-center mb-4 text-base-content text-lg">sorry buddy, you don't have any friends at all 😔,</p>
            <br />
            <p className="text-center mb-4 text-primary-content">connect with your friends to start sharing expenses</p>
            <br />
            <Link href="/app/friends">
                <button className="btn btn-primary">connect with friends</button>
            </Link>
        </div>
    )
}

export default NoFriends    