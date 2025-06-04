import "./Header.css";
import { Link } from "react-router";

interface IHeaderProps {
    authToken?: string;
    onLogout?: () => void;
}

export function Header({ authToken, onLogout }: IHeaderProps) {
    return (
        <header>
            <h1>My cool image site</h1>
            <div>
                <label>
                    Some switch (dark mode?) <input type="checkbox" />
                </label>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/upload">Upload</Link>
                    {authToken ? (
                        <button onClick={onLogout}>Log out</button>
                    ) : (
                        <Link to="/login">Log in</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
