import type { IProduct } from "./products.ts";

export function ProductCard(props: {product : IProduct}) {
    const { name, description, imageSrc, price, originalPrice, numInCart } = props.product;
    const priceStyles: React.CSSProperties = {};
    if (originalPrice !== undefined) {
        priceStyles.color = "darkgreen";
    }

    return (
        <article>
            <img src={imageSrc} alt={name} />
            <div className="product-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <p className="price">
                    <span style={priceStyles}>${price}</span>
                    {originalPrice && <span className="old-price">{originalPrice}</span>}
                </p>
                <div>
                    <button className="buy-button">Add to cart</button>
                    {numInCart > 0 && <span className="num-in-cart">{numInCart} in cart</span>}
                </div>
            </div>
        </article>
    );
}
