const Footer = () => {
    return (
        <footer className="footer p-10 bg-base-200 text-base-content">
            <div className="flex flex-row justify-between w-full">
                <div className="w-1/3 flex flex-col gap-4">
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Expense tracking</a>
                    <a className="link link-hover">Financial goals</a>
                    <a className="link link-hover">Reports</a>
                    <a className="link link-hover">Budgeting</a>
                </div>
                <div className="w-1/3 flex flex-col gap-4">
                    <span className="footer-title">Company</span>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Careers</a>
                    <a className="link link-hover">Press</a>
                </div>
                <div className="w-1/3 flex flex-col gap-4">
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </div>
            <div className="w-1/3 flex flex-col gap-4">
                <span className="footer-title">Newsletter</span>
                <div className="form-control w-80">
                    <label className="label">
                        <span className="label-text">Subscribe for updates</span>
                    </label>
                    <div className="relative">
                        <input type="text" placeholder="your@email.com" className="input input-bordered w-full pr-16" />
                        <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;