// src/components/auth/auth-form.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/contexts/AuthContext"; 

// Firebase imports
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path if needed

// Shadcn UI components
import {
  Form,
  FormControl,
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

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    loginForm.reset();
    registerForm.reset();
  };

  const handleSignIn = async (data: LoginFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleSignUp = async (data: RegisterFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: "Account Created!",
        description: "You have successfully signed up. Please log in.",
      });
      setIsLogin(true); // Switch to login form after registration
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Success!",
        description: "You have successfully signed in with Google.",
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Google Sign-In Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLogin ? "Welcome Back!" : "Join SnapLearn"}</CardTitle>
        <CardDescription>
          {isLogin ? "Log in to your account to continue your learning journey." : "Create an account to start learning today!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLogin ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleSignIn)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
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
                className="w-full bg-snapgreen hover:bg-snapgreen-dark text-foreground" // ADDED: text-foreground
              >
                Log In
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleSignUp)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={registerForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="yourusername" {...field} />
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
              <Button 
                type="submit" 
                className="w-full bg-snapgreen hover:bg-snapgreen-dark text-foreground" // ADDED: text-foreground
              >
                Create Account
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4"> 
        <Button
          variant="link"
          onClick={toggleForm}
          className="w-full text-snapblue hover:text-snapblue-dark"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </Button>
        {/* Google Sign-in Button - now matches the image's style and text */}
        <Button
          onClick={handleGoogleSignIn}
          className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          variant="outline"
        >
          {/* Google SVG Icon (small, inline, black/dark) */}
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.24 10.27v3.09h6.12c-.25 1.58-.98 2.65-2.07 3.53-.41.36-.88.66-1.38.92l2.42 2.42c1.47-1.36 2.64-3.5 3.16-6.19H22V10.27h-9.76z" fill="#4285F4"/>
            <path d="M12.24 22c2.81 0 5.48-.92 7.31-2.5l-2.42-2.42c-1.12.98-2.58 1.5-4.89 1.5-4.48 0-8.2-3.08-9.58-7.23H.99c1.44 3.73 5.09 6.43 11.25 6.43z" fill="#34A853"/>
            <path d="M2.66 14.88c-.28-.84-.44-1.74-.44-2.73s.16-1.89.44-2.73l-2.66-2.06c-.46 1.05-.72 2.22-.72 3.82s.26 2.77.72 3.82L2.66 14.88z" fill="#FBBC05"/>
            <path d="M12.24 4.5c2.31 0 4.14.93 5.07 1.83l2.2-2.2C17.72 2.37 15.05 1 12.24 1c-6.16 0-9.81 2.7-11.25 6.43L2.66 9.59c1.38-4.15 5.1-7.23 9.58-7.23z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </Button>
      </CardFooter>
    </Card>
  );
}