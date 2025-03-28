// src/app/privacy/page.tsx
export const metadata = {
    title: 'Privacy Policy | Pocketed',
    description: 'Privacy policy for Pocketed financial management app',
}

const PrivacyPage = () => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Data Collection</h2>
                <p className="mb-4">
                    As an academic project from ETIC Algarve, Pocketed collects minimal personal data...
                </p>
            </section>

        </div>
    )
}

export default PrivacyPage;