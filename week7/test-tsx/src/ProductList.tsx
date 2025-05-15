import type { IProduct } from "./products.ts";
import { ProductCard } from "./ProductCard.tsx";

interface IProductListProps {
    products: IProduct[];
}

export function ProductList(props: IProductListProps) {
    return (
        <section className="product-list">
            <h2>Search results</h2>
            {props.products.map((product) => <ProductCard product={product} />)}
        </section>
    );
}
