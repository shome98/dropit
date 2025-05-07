import SignUpForm from "@/components/auth/SignUpForm";
import Footer from "@/components/common/Footer";

export default function SignUpPage() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                {/* Use the Navbar component */}
                <main className="flex-1 flex justify-center items-center p-6">
                    <SignUpForm />
                </main>
                <Footer/>
            </div>
        </>
    );
}