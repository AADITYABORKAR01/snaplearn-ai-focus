
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Play, BookOpen, Users, Trophy, ArrowRight, Star, Zap, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-orange hover:bg-orange-dark">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-orange hover:bg-orange-dark">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Progress <span className="text-orange">Simplified</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                SnapLearn transforms your learning experience with AI-powered micro-lessons, 
                smart notes, and personalized learning paths - all in a distraction-free environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-orange hover:bg-orange-dark w-full sm:w-auto">
                    Start Learning Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    See Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 pl-0 md:pl-10">
              <div className="relative">
                <div className="bg-card rounded-xl shadow-xl overflow-hidden border transform rotate-2">
                  <img 
                    src="https://placehold.co/600x400/FC6600/FFFFFF?text=Video+Player+Demo" 
                    alt="SnapLearn Interface" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border transform -rotate-3">
                  <div className="text-sm font-medium text-orange">Notes</div>
                  <div className="mt-1 text-xs text-muted-foreground">Automatically synced with your video</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-orange text-white p-4 rounded-full shadow-lg transform rotate-12">
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn Smarter, Not Harder</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes learning efficient and enjoyable with these powerful features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Distraction-Free Learning</h3>
              <p className="text-muted-foreground">
                Our clean interface eliminates distractions and keeps you focused on what matters: learning.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Assistance</h3>
              <p className="text-muted-foreground">
                Get instant answers to your questions and AI-generated summaries of your learning materials.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Note-Taking</h3>
              <p className="text-muted-foreground">
                Dictate notes while watching videos, and our system automatically timestamps and organizes them.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Micro-Learning "Snaps"</h3>
              <p className="text-muted-foreground">
                Break down complex topics into bite-sized, digestible segments that make learning efficient.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gamified Progress</h3>
              <p className="text-muted-foreground">
                Earn badges, track streaks, and visualize your learning progress to stay motivated.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange/10 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Paths</h3>
              <p className="text-muted-foreground">
                Get custom-tailored learning recommendations based on your progress and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform How You Learn?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of students who are already learning smarter with SnapLearn.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-orange hover:bg-gray-100">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-darkest text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Logo className="text-white" />
              <p className="mt-4 max-w-xs text-gray-400">
                Your progress simplified with AI-powered micro-learning.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Tutorials</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 SnapLearn. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
