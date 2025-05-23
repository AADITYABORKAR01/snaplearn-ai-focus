
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { VideoPlayer } from "@/components/ui/video-player";
import { NoteEditor } from "@/components/notes/note-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageCircle, List, Settings, MoreVertical } from "lucide-react";

// Sample data for course content - in a real app this would come from an API
const SAMPLE_COURSES = {
  "001": {
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms and their applications.",
    videoId: "dQw4w9WgXcQ", // This is a placeholder - YouTube video ID
    sections: [
      {
        title: "Introduction",
        lessons: [
          { id: "001-1", title: "What is Machine Learning?", duration: "5:22" },
          { id: "001-2", title: "Types of Machine Learning", duration: "8:15" },
        ],
      },
      {
        title: "Supervised Learning",
        lessons: [
          { id: "001-3", title: "Linear Regression", duration: "12:34" },
          { id: "001-4", title: "Classification Algorithms", duration: "10:56" },
        ],
      },
    ],
  },
  "002": {
    title: "Web Development Basics",
    description: "Master HTML, CSS, and JavaScript to build modern websites.",
    videoId: "dQw4w9WgXcQ", // This is a placeholder - YouTube video ID
    sections: [
      {
        title: "HTML Fundamentals",
        lessons: [
          { id: "002-1", title: "Basic HTML Structure", duration: "7:45" },
          { id: "002-2", title: "HTML Forms and Inputs", duration: "9:20" },
        ],
      },
      {
        title: "CSS Styling",
        lessons: [
          { id: "002-3", title: "Selectors and Properties", duration: "11:15" },
          { id: "002-4", title: "Responsive Design", duration: "14:38" },
        ],
      },
    ],
  },
  "003": {
    title: "Data Visualization with Python",
    description: "Create compelling visualizations using Python libraries like Matplotlib and Seaborn.",
    videoId: "dQw4w9WgXcQ", // This is a placeholder - YouTube video ID
    sections: [
      {
        title: "Matplotlib Basics",
        lessons: [
          { id: "003-1", title: "Creating Basic Plots", duration: "8:52" },
          { id: "003-2", title: "Customizing Visualizations", duration: "10:23" },
        ],
      },
      {
        title: "Advanced Visualizations",
        lessons: [
          { id: "003-3", title: "Interactive Plots", duration: "13:45" },
          { id: "003-4", title: "Dashboard Creation", duration: "15:12" },
        ],
      },
    ],
  },
};

const Learn = () => {
  const { courseId } = useParams();
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [notes, setNotes] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Get course data from our sample data
  const course = courseId ? SAMPLE_COURSES[courseId as keyof typeof SAMPLE_COURSES] : null;
  
  // Handle video time updates
  const handleTimeUpdate = (time: number) => {
    setCurrentVideoTime(time);
  };
  
  // Handle note saving
  const handleSaveNotes = (newNotes: string) => {
    setNotes(newNotes);
    // In a real app, we'd save these to a backend
  };
  
  // Handle AI question submission
  const handleAIQuestion = (question: string) => {
    // In a real app, we'd send this to an AI API and get a response
    console.log("Question for AI:", question);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Course not found</h1>
        <Link to="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <Logo />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        {/* Content area with video and notes */}
        <div className={`flex-1 p-4 ${showSidebar ? 'md:mr-[300px]' : ''}`}>
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-snapgray-dark">{course.description}</p>
            </div>
            
            <div className="mb-6">
              <VideoPlayer 
                videoId={course.videoId}
                title={course.title}
                onTimeUpdate={handleTimeUpdate}
              />
            </div>
            
            <div className="mt-8">
              <NoteEditor
                videoId={course.videoId}
                initialNotes={notes}
                currentTime={currentVideoTime}
                onSave={handleSaveNotes}
              />
            </div>
            
            {/* AI Assistant Section */}
            <div className="mt-8 border rounded-lg bg-card p-4">
              <h3 className="font-medium text-lg mb-4">Ask AI Assistant</h3>
              <div className="bg-muted/50 rounded-lg p-4 mb-4 min-h-[100px]">
                <div className="flex items-start mb-4">
                  <div className="bg-snapblue rounded-full p-2 text-white mr-3">
                    <MessageCircle size={16} />
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm">
                      Welcome to the AI Assistant! I can answer questions about the content you're watching.
                      Try asking something like "Can you explain supervised learning?" or "What's the difference between HTML and CSS?"
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask AI about this video..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-snapblue focus:border-transparent"
                />
                <Button className="bg-snapblue hover:bg-snapblue-dark">
                  Ask
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar for course content */}
        <div 
          className={`
            bg-white border-l fixed right-0 top-[57px] bottom-0 w-full md:w-[300px] 
            transform transition-transform duration-300 z-20
            ${showSidebar ? 'translate-x-0' : 'translate-x-full md:translate-x-full'}
          `}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Course Content</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSidebar(false)}
              className="md:hidden"
            >
              <ArrowLeft size={16} />
            </Button>
          </div>
          
          <div className="p-4">
            {course.sections.map((section, i) => (
              <div key={i} className="mb-6">
                <h3 className="font-medium mb-2">{section.title}</h3>
                <div className="space-y-2">
                  {section.lessons.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-snapblue-light text-white text-xs">
                        {lesson.id.split('-')[1]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Toggle sidebar button for mobile/tablet */}
        {!showSidebar && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSidebar(true)}
            className="fixed bottom-4 right-4 rounded-full shadow-lg"
          >
            <List size={20} />
          </Button>
        )}
      </main>
    </div>
  );
};

export default Learn;
