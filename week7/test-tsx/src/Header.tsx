import { useState } from "react";

export function Header() {
    const [ searchQuery, setSearchQuery ] = useState("");
    return (
        <header>
            <h1>Stupid Shopping Site</h1>
            <div className="searchbar">
                <input
                    aria-label="Product search"
                    placeholder="Search our stupid products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button>Search</button>
            </div>
        </header>
    );
}
