
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface LearningCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  progress: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  className?: string;
}

export function LearningCard({
  id,
  title,
  description,
  thumbnailUrl,
  progress,
  duration,
  difficulty,
  category,
  className,
}: LearningCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <div className="relative">
        <img
          src={thumbnailUrl || "https://placehold.co/400x225?text=Course+Thumbnail"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full bg-black/50 p-1">
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{duration}</span>
          </div>
          <span className={getDifficultyColor(difficulty)}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        {progress > 0 && (
          <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link to={`/learn/${id}`}>
          <Button variant="outline" size="sm" className="text-snapblue">
            <BookOpen size={16} className="mr-1" /> Continue
          </Button>
        </Link>
        <Link to={`/learn/${id}`}>
          <Button size="sm" className="bg-snapblue hover:bg-snapblue-dark">
            <PlayCircle size={16} className="mr-1" /> Play
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
