import { NumberInput } from "./NumberInput.tsx";

export function ProductFilters() {
    return (
        <section>
            <h2>Filters</h2>
            <div className="filters">
                <div><NumberInput label={"Min price ($)"}/></div>
                <div><NumberInput label={"Max price ($)"}/></div>
            </div>
        </section>
    )
}
