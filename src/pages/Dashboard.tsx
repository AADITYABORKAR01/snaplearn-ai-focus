import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { LearningCard } from "@/components/dashboard/learning-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext"; // Ensure this import is correct
import { Award, BookOpen, Calendar, Clock, Flame, LogOut, Bell, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// NO LONGER NEEDED: Firebase imports are handled by AuthContext now
// import { auth } from '../firebaseConfig';
// import { signOut } from 'firebase/auth';

// Sample data - in a real app this would come from API
const SAMPLE_COURSES = [
  {
    id: "001",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms and their applications.",
    thumbnailUrl: "https://placehold.co/400x225/3498db/FFFFFF?text=Machine+Learning",
    progress: 45,
    duration: "2h 15m",
  },
  {
    id: "002",
    title: "Web Development Basics",
    description: "Master HTML, CSS, and JavaScript to build modern websites.",
    thumbnailUrl: "https://placehold.co/400x225/2ecc71/FFFFFF?text=Web+Dev",
    progress: 68,
    duration: "3h 40m",
  },
  {
    id: "003",
    title: "Data Structures & Algorithms",
    description: "A comprehensive guide to essential data structures and algorithms.",
    thumbnailUrl: "https://placehold.co/400x225/e74c3c/FFFFFF?text=DSA",
    progress: 10,
    duration: "5h 00m",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  // CHANGED: Destructure currentUser instead of user
  const { currentUser, signOut, loading } = useAuth();

  // Redirect to auth page if not logged in and loading is complete
  if (!loading && !currentUser) {
    navigate('/auth');
    return null; // Don't render anything while redirecting
  }

  // Moved handleSignOut inside the component if it relies on navigate/signOut
  const handleSignOut = async () => {
    try {
      await signOut(); // Use the signOut from AuthContext
      navigate("/auth"); // Redirect to auth page after successful sign out
    } catch (error) {
      console.error("Error signing out:", error);
      // Optionally, show a toast notification here
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            {/* Display user email or a generic name */}
            <span className="text-sm text-muted-foreground hidden sm:block">
              {/* CHANGED: Use currentUser?.email instead of user?.email */}
              {currentUser ? `Welcome, ${currentUser.email || 'User'}` : 'Welcome'}
            </span>
            {/* Logout Button */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - User Info & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="text-center p-6">
            <img
              src={currentUser?.photoURL || "https://placehold.co/100x100/e0e0e0/FFFFFF?text=JD"}
              alt="User Avatar"
              className="rounded-full w-24 h-24 mx-auto mb-4 object-cover"
            />
            {/* CHANGED: Use currentUser?.displayName or currentUser?.email */}
            <h2 className="text-2xl font-bold">{currentUser?.displayName || currentUser?.email || 'SnapLearner'}</h2>
            <p className="text-muted-foreground">Level 12 - Advanced Learner</p>
            <div className="flex justify-around mt-6">
              <div>
                <Flame className="h-6 w-6 text-snapgreen mx-auto" />
                <p className="text-sm font-medium">30 Day Streak</p>
              </div>
              <div>
                <Award className="h-6 w-6 text-yellow-500 mx-auto" />
                <p className="text-sm font-medium">5 Badges</p>
              </div>
              <div>
                <Clock className="h-6 w-6 text-blue-500 mx-auto" />
                <p className="text-sm font-medium">120 Hrs Learning</p>
              </div>
            </div>
            <Button className="w-full mt-6 bg-snapblue hover:bg-snapblue-dark">View Profile</Button>
          </Card>

          {/* Daily Goal Card */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-center text-snapgreen">60%</p>
              <p className="text-center text-muted-foreground mt-2">of your daily learning goal achieved</p>
              <ProgressChart
                data={[
                  { name: "Mon", minutes: 30, progress: 50 },
                  { name: "Tue", minutes: 40, progress: 70 },
                  { name: "Wed", minutes: 20, progress: 30 },
                  { name: "Thu", minutes: 50, progress: 90 },
                  { name: "Fri", minutes: 10, progress: 20 },
                  { name: "Sat", minutes: 60, progress: 100 },
                  { name: "Sun", minutes: 25, progress: 40 },
                ]}
              />
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Learning Paths & Upcoming */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Learning */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Continue Learning</CardTitle>
              <Link to="/learn/all" className="text-sm text-snapblue hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_COURSES.map((course) => (
                <LearningCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  thumbnailUrl={course.thumbnailUrl}
                  progress={course.progress}
                  duration={course.duration}
                />
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 border-l-4 border-muted rounded hover:bg-muted/50">
                  <div className="flex-shrink-0 mr-4 bg-card p-2 rounded shadow-sm">
                    <Calendar size={24} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Live Q&A with Industry Expert</h3>
                    <p className="text-sm text-muted-foreground">Today, 10:00 AM - 11:00 AM</p>
                  </div>
                  <Button size="sm" variant="outline">Join Now</Button>
                </div>

                <div className="flex items-center p-3 border-l-4 border-muted rounded hover:bg-muted/50">
                  <div className="flex-shrink-0 mr-4 bg-card p-2 rounded shadow-sm">
                    <Calendar size={24} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Data Visualization Workshop</h3>
                    <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - 3:30 PM</p>
                  </div>
                  <Button size="sm" variant="outline">Remind Me</Button>
                </div>

                <div className="flex items-center p-3 border-l-4 border-muted rounded hover:bg-muted/50">
                  <div className="flex-shrink-0 mr-4 bg-card p-2 rounded shadow-sm">
                    <Calendar size={24} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Machine Learning Practice Session</h3>
                    <p className="text-sm text-muted-foreground">Friday, 5:00 PM - 6:30 PM</p>
                  </div>
                  <Button size="sm" variant="outline">Remind Me</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;