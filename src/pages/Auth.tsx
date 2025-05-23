
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { AuthForm } from "@/components/auth/auth-form";

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Authentication Form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 SnapLearn. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-snapblue">Privacy</a>
            <a href="#" className="hover:text-snapblue">Terms</a>
            <a href="#" className="hover:text-snapblue">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
