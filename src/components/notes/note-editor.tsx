
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mic, MicOff, Save, Download, Clock } from "lucide-react";

interface NoteEditorProps {
  videoId?: string;
  initialNotes?: string;
  currentTime?: number;
  onSave?: (notes: string) => void;
}

export function NoteEditor({
  videoId,
  initialNotes = "",
  currentTime = 0,
  onSave,
}: NoteEditorProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isRecording, setIsRecording] = useState(false);
  const [timestamps, setTimestamps] = useState<{ time: number; text: string }[]>([]);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveNotes = () => {
    if (onSave) {
      onSave(notes);
    }
    
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully.",
    });
  };

  const handleDownloadNotes = () => {
    // Create a blob with the notes content
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Create a link element and trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = `notes-${videoId || "video"}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Notes downloaded",
      description: "Your notes have been downloaded as a text file.",
    });
  };

  const toggleRecording = () => {
    // In a real application, we would use the Web Speech API
    // This is a simplified mockup of the functionality
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
      
      // Simulate the speech recognition process
      setTimeout(() => {
        const newNote = `[${formatTime(currentTime)}] This is a simulated transcription of what you would say during voice recording.`;
        const updatedNotes = notes ? `${notes}\n\n${newNote}` : newNote;
        setNotes(updatedNotes);
        
        // Add timestamp
        setTimestamps([...timestamps, { time: currentTime, text: newNote }]);
        
        // Stop recording after simulation
        setIsRecording(false);
        
        toast({
          title: "Recording completed",
          description: "Your notes have been updated with the transcription.",
        });
      }, 3000);
    } else {
      toast({
        title: "Recording stopped",
        description: "Voice recording has been stopped.",
      });
    }
    
    setIsRecording(!isRecording);
  };

  const insertTimestamp = () => {
    if (textareaRef.current) {
      const cursorPosition = textareaRef.current.selectionStart;
      const timestampText = `[${formatTime(currentTime)}] `;
      
      const newNotes = 
        notes.substring(0, cursorPosition) + 
        timestampText + 
        notes.substring(cursorPosition);
      
      setNotes(newNotes);
      
      // Set cursor position after the inserted timestamp
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPosition = cursorPosition + timestampText.length;
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="border rounded-lg bg-card p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Notes</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleRecording}
            className={isRecording ? "text-red-500" : ""}
          >
            {isRecording ? <MicOff size={16} className="mr-1" /> : <Mic size={16} className="mr-1" />}
            {isRecording ? "Stop" : "Record"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={insertTimestamp}
          >
            <Clock size={16} className="mr-1" />
            Add Timestamp
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="editor" className="flex-1 flex flex-col">
        <TabsList className="w-full">
          <TabsTrigger value="editor" className="flex-1">Editor</TabsTrigger>
          <TabsTrigger value="timestamps" className="flex-1">Timestamps</TabsTrigger>
          <TabsTrigger value="ai-summary" className="flex-1">AI Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="flex-1 flex flex-col mt-4 space-y-4">
          <Textarea
            ref={textareaRef}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Start taking notes here..."
            className="flex-1 resize-none min-h-[200px]"
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={handleDownloadNotes}
              disabled={!notes.trim()}
            >
              <Download size={16} className="mr-1" />
              Download
            </Button>
            <Button
              onClick={handleSaveNotes}
              disabled={!notes.trim()}
              className="bg-snapblue hover:bg-snapblue-dark"
            >
              <Save size={16} className="mr-1" />
              Save Notes
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="timestamps" className="flex-1 mt-4">
          {timestamps.length > 0 ? (
            <div className="space-y-2">
              {timestamps.map((stamp, index) => (
                <div
                  key={index}
                  className="p-2 border rounded hover:bg-muted/50 cursor-pointer flex items-start"
                >
                  <span className="bg-snapblue text-white px-2 py-1 rounded text-xs font-medium mr-2">
                    {formatTime(stamp.time)}
                  </span>
                  <p className="text-sm">{stamp.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No timestamps added yet. Use the "Add Timestamp" button while watching the video.
            </p>
          )}
        </TabsContent>
        
        <TabsContent value="ai-summary" className="flex-1 mt-4">
          <div className="border-2 border-dashed border-muted rounded-lg p-6 h-full flex flex-col items-center justify-center text-center">
            <h3 className="font-medium mb-2">AI Summary</h3>
            <p className="text-muted-foreground mb-4">
              The AI assistant will analyze your notes and provide a concise summary.
            </p>
            <Button disabled className="bg-gray-300">
              Generate Summary (Coming Soon)
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
