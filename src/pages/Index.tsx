import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, BookOpen, Brain, Lightbulb, Mic, Award } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <Link to="/auth" className="text-snapblue hover:text-snapblue-dark font-medium">
              Login
            </Link>
            <Link to="/auth">
              <Button className="bg-snapblue hover:bg-snapblue-dark">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-snapgray-lightest bg-stone-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-50 lg:text-6xl">
                Your Progress <span className="text-orange-500">Simplified</span>
              </h1>
              <p className="text-lg md:text-xl text-snapgray-dark mb-8 max-w-lg">
                SnapLearn transforms your learning experience with AI-powered micro-lessons, 
                smart notes, and personalized learning paths - all in a distraction-free environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="bg-snapblue hover:bg-snapblue-dark w-full sm:w-auto">
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
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transform rotate-2">
                  <img src="https://placehold.co/600x400/3498db/FFFFFF?text=Video+Player+Demo" alt="SnapLearn Interface" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100 transform -rotate-3">
                  <div className="text-sm font-medium text-snapblue">Notes</div>
                  <div className="mt-1 text-xs text-gray-500">Automatically synced with your video</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-snapgreen text-white p-4 rounded-full shadow-lg transform rotate-12">
                  <Award className="h-8 w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn Smarter, Not Harder</h2>
            <p className="text-lg text-snapgray-dark max-w-2xl mx-auto">
              Our AI-powered platform makes learning efficient and enjoyable with these powerful features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-snapblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Distraction-Free Learning</h3>
              <p className="text-snapgray-dark">
                Our clean interface eliminates distractions and keeps you focused on what matters: learning.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-snapgreen" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Assistance</h3>
              <p className="text-snapgray-dark">
                Get instant answers to your questions and AI-generated summaries of your learning materials.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-snapblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Note-Taking</h3>
              <p className="text-snapgray-dark">
                Dictate notes while watching videos, and our system automatically timestamps and organizes them.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-snapgreen" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Micro-Learning "Snaps"</h3>
              <p className="text-snapgray-dark">
                Break down complex topics into bite-sized, digestible segments that make learning efficient.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-snapblue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gamified Progress</h3>
              <p className="text-snapgray-dark">
                Earn badges, track streaks, and visualize your learning progress to stay motivated.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="h-6 w-6 text-snapgreen" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Paths</h3>
              <p className="text-snapgray-dark">
                Get custom-tailored learning recommendations based on your progress and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-white bg-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform How You Learn?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning smarter with SnapLearn.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-snapblue hover:bg-gray-100">
              Create Your Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
    </div>;
};
export default Index;