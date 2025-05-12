import React, { useState } from "react";

interface INumberInputProps {
    label: string;
}

export function NumberInput({ label }: INumberInputProps) {
    const [value, setValue] = useState<number | "">(""); // The value is declared to be either a number or an empty string
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return (
        <label>
            {label}
            <input
                min={0}
                type="number"
                value={value}
                onChange={handleChange}
            />
        </label>
    );
}
