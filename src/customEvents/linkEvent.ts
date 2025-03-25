const linkEvent = (link: string) => new CustomEvent("linkEvent", { detail: { link } })

export default linkEvent