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
<<<<<<< HEAD
  FormDescription, // (Optional - if not used, can remove)
=======
>>>>>>> 3e2f28fdd59e8e8aaa152c744101858bb6daa754
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
import { useToast } from "@/hooks/use-toast";

// Your existing Zod schemas [cite: 18, 19, 20]
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
<<<<<<< HEAD

  // Firebase auth state and token state (kept for clarity, though redirection will make idToken display temporary)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  // Your existing react-hook-form setups [cite: 22, 23]
=======
  const { signIn, signUp } = useAuth();
  
>>>>>>> 3e2f28fdd59e8e8aaa152c744101858bb6daa754
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

<<<<<<< HEAD
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
=======
  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log("Attempting login with:", { email: data.email });
    
    try {
      const result = await signIn(data.email, data.password);
      console.log("Login result:", result);
      
      if (result.error) {
        console.error("Login error:", result.error);
        toast({
          title: "Login failed",
          description: result.error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login catch error:", error);
      toast({
        title: "Login failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    console.log("Attempting registration with:", { 
      email: data.email, 
      username: data.username, 
      fullName: data.fullName 
    });
    
    try {
      const result = await signUp(data.email, data.password, {
        username: data.username,
        full_name: data.fullName,
      });
      console.log("Registration result:", result);
      
      if (result.error) {
        console.error("Registration error:", result.error);
        toast({
          title: "Registration failed",
          description: result.error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account, or try logging in if email confirmation is disabled.",
      });
      
      // Switch to login form after successful registration
      setIsLogin(true);
      registerForm.reset();
    } catch (error: any) {
      console.error("Registration catch error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
>>>>>>> 3e2f28fdd59e8e8aaa152c744101858bb6daa754
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    registerForm.reset();
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
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email"
                        {...field} 
                      />
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
              <Button 
                type="submit" 
                className="w-full bg-orange hover:bg-orange-dark"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
<<<<<<< HEAD
            <form onSubmit={registerForm.handleSubmit(handleSignUp)} className="space-y-6">
=======
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
>>>>>>> 3e2f28fdd59e8e8aaa152c744101858bb6daa754
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="johndoe" 
                        autoComplete="username"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        autoComplete="name"
                        {...field} 
                      />
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
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email"
                        autoComplete="email"
                        {...field} 
                      />
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
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        autoComplete="new-password"
                        {...field} 
                      />
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
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        autoComplete="new-password"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-orange hover:bg-orange-dark"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4"> {/* Adjusted for flex column to stack buttons */}
        <Button
          variant="link"
          onClick={toggleForm}
          className="w-full text-orange hover:text-orange-dark"
          disabled={isLoading}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </Button>
        {/* NEW: Google Sign-in Button - appears below the toggle link */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white" // Example styling for Google button
        >
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  );
}