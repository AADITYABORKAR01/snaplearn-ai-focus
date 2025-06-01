
import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { LearningCard } from "@/components/dashboard/learning-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { Award, BookOpen, Calendar, Clock, Flame, LogOut, Bell, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
// Firebase imports
import { auth } from '../firebaseConfig'; // Adjust path if needed (e.g., if firebaseConfig.ts is in src/, it's '../firebaseConfig')
import { signOut } from 'firebase/auth'; // NEW: Import signOut function

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
    title: "Data Visualization with Python",
    description: "Create compelling visualizations using Python libraries like Matplotlib and Seaborn.",
    thumbnailUrl: "https://placehold.co/400x225/9b59b6/FFFFFF?text=Data+Viz",
    progress: 23,
    duration: "1h 50m",
  },
];

const PROGRESS_DATA = [
  { name: 'Mon', minutes: 10, progress: 5 },
  { name: 'Tue', minutes: 25, progress: 15 },
  { name: 'Wed', minutes: 15, progress: 10 },
  { name: 'Thu', minutes: 35, progress: 20 },
  { name: 'Fri', minutes: 20, progress: 12 },
  { name: 'Sat', minutes: 30, progress: 18 },
  { name: 'Sun', minutes: 40, progress: 25 },
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // NEW: Initialize navigate hook

  // NEW: Logout Function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out from Dashboard.");
      navigate("/auth"); // Redirect to the authentication page after logout
      // Optional: Add a toast notification here if you use it in Dashboard.tsx
      // (e.g., import { useToast } from "@/components/ui/use-toast"; and use toast({ ... }))
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error gracefully (e.g., show an error message)
    }
  };
  
  // Filter courses based on search query
  const filteredCourses = SAMPLE_COURSES.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const displayName = profile?.full_name || profile?.username || user?.email?.split('@')[0] || 'User';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                {userInitial}
              </div>
              <span className="hidden md:inline font-medium">{displayName}</span>
            </div>
            
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon" onClick={handleSignOut}> {/* NEW: onClick handler */}
      <LogOut size={20} /> {/* [cite: 115] */}
      <span className="sr-only">Logout</span> {/* For accessibility */}
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Logout</p> {/* NEW: Tooltip text */}
  </TooltipContent>
</Tooltip>
          </div>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden border-t p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {displayName}!</h1>
          <p className="text-muted-foreground">
            Continue your learning journey. You've been on a 5-day streak!
          </p>
        </div>

        {/* Stats and Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Flame className="h-5 w-5 mr-2 text-orange" />
                <span className="text-2xl font-bold">5 Days</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Learning Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span className="text-2xl font-bold">4.5 Hours</span>
                <span className="ml-2 text-xs text-green-500">+15% this week</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                <span className="text-2xl font-bold">12 Badges</span>
                <span className="ml-2 text-xs text-primary">3 new</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Chart */}
        <div className="mb-8">
          <ProgressChart data={PROGRESS_DATA} className="w-full" />
        </div>

        {/* Continue Learning */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Continue Learning</h2>
            <Link to="#" className="text-primary hover:underline text-sm font-medium">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <LearningCard key={course.id} {...course} />
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recommended For You</h2>
            <Link to="#" className="text-primary hover:underline text-sm font-medium">
              Explore More
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <img 
                src="https://placehold.co/400x225/e67e22/FFFFFF?text=Data+Science" 
                alt="Data Science Fundamentals" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">Data Science Fundamentals</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  Master the essential skills of data analysis, statistics, and visualization.
                </p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <BookOpen size={14} className="mr-1" />
                  <span>10 lessons</span>
                  <span className="mx-2">•</span>
                  <Clock size={14} className="mr-1" />
                  <span>4h 30m</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <img 
                src="https://placehold.co/400x225/3498db/FFFFFF?text=Mobile+Dev" 
                alt="Mobile App Development" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">Mobile App Development</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  Learn to build cross-platform mobile applications with React Native.
                </p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <BookOpen size={14} className="mr-1" />
                  <span>8 lessons</span>
                  <span className="mx-2">•</span>
                  <Clock size={14} className="mr-1" />
                  <span>3h 45m</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-all">
              <img 
                src="https://placehold.co/400x225/9b59b6/FFFFFF?text=AI+Ethics" 
                alt="AI Ethics" 
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">Ethics in Artificial Intelligence</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  Explore the ethical implications and considerations in modern AI development.
                </p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <BookOpen size={14} className="mr-1" />
                  <span>6 lessons</span>
                  <span className="mx-2">•</span>
                  <Clock size={14} className="mr-1" />
                  <span>2h 15m</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Learning Schedule</h2>
            <Button variant="outline" size="sm" className="text-primary border-primary">
              <Calendar size={16} className="mr-2" />
              View Calendar
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center p-3 border-l-4 border-primary bg-primary/10 rounded">
                  <div className="flex-shrink-0 mr-4 bg-card p-2 rounded shadow-sm">
                    <Calendar size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Web Development Basics</h3>
                    <p className="text-sm text-muted-foreground">Today, 3:00 PM - 4:30 PM</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">Join</Button>
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
