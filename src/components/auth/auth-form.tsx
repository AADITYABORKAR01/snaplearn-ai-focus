// src/components/auth/auth-form.tsx - UPDATED FULL CODE

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";

// Firebase imports - NEW AND EXISTING
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User, // Import User type
  GoogleAuthProvider, // NEW: For Google Sign-in
  signInWithPopup,    // NEW: For Google Sign-in popup
} from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path if needed (e.g., if firebaseConfig.ts is in src/, then it's '../../firebaseConfig')

// Shadcn UI components (ensure these paths are correct for your project)
import {
  Form,
  FormControl,
  FormDescription, // (Optional - if not used, can remove)
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Your existing Zod schemas [cite: 18, 19, 20]
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = loginSchema.extend({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Firebase auth state and token state (kept for clarity, though redirection will make idToken display temporary)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  // Your existing react-hook-form setups [cite: 22, 23]
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Firebase Auth State Listener & Redirection (UPDATED)
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const token = await user.getIdToken();
          setIdToken(token); // Still set for console.log, but won't be displayed
          console.log("-----------------------------------------");
          console.log("YOUR FRESH FIREBASE ID TOKEN (Frontend):", token);
          console.log("-----------------------------------------");
          toast({
            title: "Signed In",
            description: `User: ${user.email}. Token logged in console.`,
          });

          // Redirect to dashboard after successful sign-in or sign-up
          if (navigate && window.location.pathname !== '/dashboard') {
            navigate("/dashboard");
          }

        } catch (error) {
          console.error("Error getting ID token:", error);
          toast({
            title: "Error",
            description: "Failed to get ID token.",
            variant: "destructive",
          });
        }
      } else {
        setIdToken(null);
        console.log("User is signed out.");
        toast({
          title: "Signed Out",
          description: "No user signed in.",
        });
      }
    });

    return () => unsubscribe();
  }, [toast, navigate]);

  // Firebase Email/Password Sign-in/Sign-up Functions (UPDATED to use form data)
  const handleSignUp = async (data: RegisterFormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Sign Up Success",
        description: "User created and signed in!",
      });
      // onAuthStateChanged will handle redirection
    } catch (error: any) {
      console.error("Sign Up failed:", error.message);
      toast({
        title: "Sign Up Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignIn = async (data: LoginFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Sign In Success",
        description: "User signed in!",
      });
      // onAuthStateChanged will handle redirection
    } catch (error: any) {
      console.error("Sign In failed:", error.message);
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Firebase Sign Out Function (EXISTING)
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast({
        title: "Signed Out",
        description: "User has been signed out.",
      });
    } catch (error: any) {
      console.error("Sign Out failed:", error.message);
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  // NEW: Google Sign-in Function
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // User is signed in, onAuthStateChanged useEffect will handle the rest (redirection, toast)
    } catch (error: any) {
      console.error("Google Sign In failed:", error.message);
      toast({
        title: "Google Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle>{isLogin ? "Login" : "Create an Account"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "Enter your credentials to access your account"
            : "Fill in your details to create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Conditional rendering based on currentUser for sign-out or forms */}
        {currentUser ? (
          <div className="space-y-4 text-center">
            <p className="text-xl font-semibold">Welcome, {currentUser.email}!</p>
            {/* Removed the idToken display as per user's request for production behavior */}
            <p className="text-sm text-muted-foreground">You are signed in. Redirecting to dashboard...</p>
            <Button onClick={handleSignOut} className="w-full">
              Sign Out
            </Button>
          </div>
        ) : isLogin ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="space-y-6">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-snapblue hover:bg-snapblue-dark">
                Login
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleSignUp)} className="space-y-6">
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-snapgreen hover:bg-snapgreen-dark">
                Create Account
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4"> {/* Adjusted for flex column to stack buttons */}
        <Button
          variant="link"
          onClick={toggleForm}
          className="w-full text-snapblue hover:text-snapblue-dark"
        >
        {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </Button>
        {/* NEW: Google Sign-in Button - appears below the toggle link */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full bg-green-500 hover:bg-green-600 text-white" // Example styling for Google button
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}