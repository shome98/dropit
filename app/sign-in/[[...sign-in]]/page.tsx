import SignInForm from "@/components/auth/SignInForm";
import Footer from "@/components/common/Footer";

export default function SignInPage() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                {/* paste a navbar component here later */}

                <main className="flex-1 flex justify-center items-center p-6">
                    <SignInForm />
                </main>

                <Footer />
            </div>
        </>
    );
}