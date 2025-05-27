
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, BookOpen, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface LearningCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  progress: number;
  duration: string;
  className?: string;
}

export function LearningCard({
  id,
  title,
  description,
  thumbnailUrl,
  progress,
  duration,
  className,
}: LearningCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-lg", className)}>
      <div className="relative">
        <img
          src={thumbnailUrl || "https://placehold.co/400x225?text=Thumbnail"}
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
        <div className="flex items-center mt-2 text-xs text-muted-foreground">
          <Clock size={14} className="mr-1" />
          <span>{duration}</span>
          {progress > 0 && (
            <>
              <span className="mx-2">•</span>
              <span>{progress}% complete</span>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link to={`/learn/${id}`}>
          <Button variant="outline" size="sm" className="text-primary">
            <BookOpen size={16} className="mr-1" /> Continue
          </Button>
        </Link>
        <Link to={`/learn/${id}`}>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <PlayCircle size={16} className="mr-1" /> Play
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
