
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link } from "react-router-dom";
import { Play, BookOpen, Zap, Users, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-snapblue to-orange bg-clip-text text-transparent">
          Learn Anything,
          <br />
          Anytime with AI
        </h1>
        <p className="text-xl text-snapgray-dark mb-8 max-w-2xl mx-auto">
          SnapLearn transforms any video into an interactive learning experience with AI-powered notes, 
          real-time assistance, and gamified progress tracking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-snapblue hover:bg-snapblue-dark">
                Continue Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="bg-snapblue hover:bg-snapblue-dark">
                Start Learning Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
          <Button size="lg" variant="outline">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SnapLearn?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-snapblue-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-snapblue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
            <p className="text-snapgray-dark">
              Get instant answers, summaries, and explanations powered by advanced AI technology.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-orange" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Note-Taking</h3>
            <p className="text-snapgray-dark">
              Automatic transcription and synchronized notes that follow your video progress.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gamified Progress</h3>
            <p className="text-snapgray-dark">
              Earn badges, maintain streaks, and track your learning journey with engaging rewards.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-lg shadow-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl text-snapgray-dark mb-8">
            Join thousands of learners who are already using SnapLearn to accelerate their education.
          </p>
          {user ? (
            <Link to="/dashboard">
              <Button size="lg" className="bg-orange hover:bg-orange-dark">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="bg-orange hover:bg-orange-dark">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
