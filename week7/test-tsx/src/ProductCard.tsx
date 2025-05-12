import type { IProduct } from "./products.ts";

export function ProductCard(props: IProduct) {
    const { name, description, imgSrc, price, originalPrice, numInCart } = props;
    const priceStyles = {};
    if (originalPrice !== undefined) {
        priceStyles.color = "darkgreen";
    }

    return (
        <article>
            <img src={imgSrc} alt={name} />
            <div className="product-details">
                <h3>{name}</h3>
                <p>{description}</p>
                <p className="price">
                    <span style={priceStyles}>${price}</span>
                    {originalPrice && <span className="old-price">{originalPrice}</span>}
                </p>
                <div>
                    <button className="buy-button">Add to cart</button>
                    {props.numInCart > 0 && <span className="num-in-cart">{numInCart} in cart</span>}
                </div>
            </div>
        </article>
    );
}
