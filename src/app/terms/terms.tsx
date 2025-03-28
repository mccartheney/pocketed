// src/app/terms/page.tsx
export const metadata = {
    title: 'Terms of Service | Pocketed',
    description: 'Terms of service for Pocketed financial management app',
}

const TermsPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Academic Project Disclaimer</h2>
                <p className="mb-4">
                    Pocketed is an academic project developed at ETIC Algarve...
                </p>
            </section>
        </div>
    )
}

export default TermsPage;