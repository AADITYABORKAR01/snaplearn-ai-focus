
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LearningCard } from "@/components/dashboard/learning-card";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Flame, BookOpen, Clock, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: courses, isLoading: coursesLoading } = useCourses();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
    </div>;
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Sample progress data for the chart
  const progressData = [
    { name: 'Mon', minutes: 10, progress: 5 },
    { name: 'Tue', minutes: 25, progress: 15 },
    { name: 'Wed', minutes: 15, progress: 10 },
    { name: 'Thu', minutes: 35, progress: 20 },
    { name: 'Fri', minutes: 20, progress: 12 },
    { name: 'Sat', minutes: 30, progress: 18 },
    { name: 'Sun', minutes: 40, progress: 25 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Welcome Section */}
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Learning Journey</h1>
              <p className="text-snapgray-dark">Continue where you left off or explore new topics</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-snapblue mr-3" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-snapgray-dark">Hours Learned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Trophy className="h-8 w-8 text-orange mr-3" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-snapgray-dark">Courses Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Flame className="h-8 w-8 text-red-500 mr-3" />
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-snapgray-dark">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Courses */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
              {coursesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-full mb-4" />
                        <Skeleton className="h-8 w-24" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses?.map((course) => (
                    <LearningCard
                      key={course.id}
                      id={course.id}
                      title={course.title}
                      description={course.description || ''}
                      thumbnailUrl={course.thumbnail_url}
                      progress={0}
                      duration={`${Math.floor((course.duration || 0) / 60)} min`}
                      difficulty={course.difficulty_level}
                      category={course.category || 'General'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Chart */}
            <ProgressChart data={progressData} />

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Badges you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-gray-500">
                    <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Complete your first course to earn badges!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse All Courses
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Continue Last Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
