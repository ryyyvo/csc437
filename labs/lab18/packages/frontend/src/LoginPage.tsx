import React from "react";
import { Link, useNavigate } from "react-router";
import "./LoginPage.css";

interface LoginPageProps {
    isRegistering?: boolean;
    onAuthSuccess: (token: string) => void;
}

async function makeAuthRequest(endpoint: string, username: string, password: string) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    return response;
}

async function submitRegistration(username: string, password: string) {
    try {
        const response = await makeAuthRequest("/auth/register", username, password);

        if (!response.ok) {
            if (response.status === 409) {
                return { error: "Username already taken. Please choose a different username." };
            } else if (response.status === 400) {
                return { error: "Please provide both username and password." };
            } else {
                return { error: "Failed to create account. Please try again." };
            }
        }

        const data = await response.json();
        console.log("Successfully created account");
        return { success: true, token: data.token };
        
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Network error. Please check your connection and try again." };
    }
}

async function submitLogin(username: string, password: string) {
    try {
        const response = await makeAuthRequest("/auth/login", username, password);

        if (!response.ok) {
            if (response.status === 401) {
                return { error: "Invalid username or password." };
            } else if (response.status === 400) {
                return { error: "Please provide both username and password." };
            } else {
                return { error: "Login failed. Please try again." };
            }
        }

        const data = await response.json();
        return { success: true, token: data.token };
        
    } catch (error) {
        console.error("Login error:", error);
        return { error: "Network error. Please check your connection and try again." };
    }
}

async function submitAction(_prevState: any, formData: FormData, isRegistering: boolean) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    
    if (isRegistering) {
        return await submitRegistration(username, password);
    } else {
        return await submitLogin(username, password);
    }
}

export function LoginPage({ isRegistering = false, onAuthSuccess }: LoginPageProps) {
    const usernameInputId = React.useId();
    const passwordInputId = React.useId();
    const navigate = useNavigate();
    const [state, formAction, isPending] = React.useActionState(
        (prevState: any, formData: FormData) => submitAction(prevState, formData, isRegistering),
        null
    );

    React.useEffect(() => {
        if (state?.success && 'token' in state && state.token) {
            onAuthSuccess(state.token);
            navigate("/");
        }
    }, [state, onAuthSuccess, navigate]);

    return (
        <>
            <h2>{isRegistering ? "Register a new account" : "Login"}</h2>
            <form className="LoginPage-form" action={formAction}>
                <label htmlFor={usernameInputId}>Username</label>
                <input 
                    id={usernameInputId} 
                    name="username" 
                    required 
                    disabled={isPending}
                />

                <label htmlFor={passwordInputId}>Password</label>
                <input 
                    id={passwordInputId} 
                    name="password" 
                    type="password" 
                    required 
                    disabled={isPending}
                />

                <input 
                    type="submit" 
                    value={isRegistering ? "Register" : "Login"} 
                    disabled={isPending}
                />
                
                {state?.error && (
                    <p style={{ color: "red" }} aria-live="polite">
                        {state.error}
                    </p>
                )}
            </form>
            {!isRegistering && (
                <p>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            )}
        </>
    );
}