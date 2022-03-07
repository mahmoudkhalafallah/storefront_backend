CREATE TABLE order_products (
    PRIMARY KEY(order_id, product_id),
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
