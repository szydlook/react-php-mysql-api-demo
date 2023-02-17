import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductBox({ id, sku, name, price, attribute}) {
    return (
        <div className="pure-u-1-4">
            <div className="product-box">
                <input type="checkbox" name={id} value={id || ""} className="delete-checkbox" aria-label="Check me" />
                <p>{sku}</p>
                <p>{name}</p>
                <p>{price} $</p>
                <p>{attribute}</p>
            </div>
        </div>
    );
}

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const formRef = useRef(null);

    useEffect(() => {
        getProducts();
    }, []);

    function getProducts() {
        axios.get("http://react-php-mysql-api-demo.swo2.usermd.net/api/list")
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleClick() {
        const nodeList = formRef.current.querySelectorAll(".delete-checkbox");
        const ids = [];
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].checked === true) {
                ids.push(nodeList[i].value);
            }
        }

        if (ids.length > 0) {
            axios.post("http://react-php-mysql-api-demo.swo2.usermd.net/api/delete", ids)
                .then((response) => {
                    console.log(response.data);
                    getProducts();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const items = products.map((product) => (
        <ProductBox
            key={product.id}
            id={product.id}
            sku={product.sku}
            name={product.name}
            price={product.price}
            attribute={product.attribute}
        />
    ));

    return (
        <>
            <form ref={formRef} className="pure-form pure-form-aligned" noValidate>
                <fieldset>
                    <div className="pure-g header">
                        <div className="pure-u-4-5">
                            <h1>Product List</h1>
                        </div>
                        <div className="pure-u-1-5 header-controls">
                            <Link to="/add-product" className="pure-button pure-button-primary">ADD</Link>
                            <button type="button" id="delete-product-btn" className="pure-button" onClick={handleClick}>MASS DELETE</button>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="pure-g">
                        {items}
                    </div>
                </fieldset>
            </form>
            <div className="footer">
                <p>Scandiweb Test assignment</p>
            </div>
        </>
    );
}
