const usersEvents = (userEventType: "getFriends" | "getUsers" | "both") => new CustomEvent("userEvents", { detail: { userEventType } })

export default usersEvents