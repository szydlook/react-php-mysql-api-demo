import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function DVDAttributes({ value, onChange }) {
    return (
        <>
            <div className="pure-control-group">
                <label htmlFor="size">Size (MB)</label>
                <input type="number" id="size" name="size" min="0" step="1" aria-label="Size" value={value || ""} onChange={onChange} required />
                <span className="pure-form-message-inline"></span>
            </div>
            <div className="pure-controls">
                <p>Please provide size in MB.</p>
            </div>
        </>
    );
}

function FurnitureAttributes({ heightValue, widthValue, lengthValue, onChange }) {
    return (
        <>
            <div className="pure-control-group">
                <label htmlFor="height">Height (cm)</label>
                <input type="number" id="height" name="height" min="0" step="1" aria-label="Height" value={heightValue || ""} onChange={onChange} required />
                <span className="pure-form-message-inline"></span>
            </div>
            <div className="pure-control-group">
                <label htmlFor="width">Width (cm)</label>
                <input type="number" id="width" name="width" min="0" step="1" aria-label="Width" value={widthValue || ""} onChange={onChange} required />
                <span className="pure-form-message-inline"></span>
            </div>
            <div className="pure-control-group">
                <label htmlFor="length">Length (cm)</label>
                <input type="number" id="length" name="length" min="0" step="1" aria-label="Length" value={lengthValue || ""} onChange={onChange} required />
                <span className="pure-form-message-inline"></span>
            </div>
            <div className="pure-controls">
                <p>Please provide dimensions in cm.</p>
            </div>
        </>
    );
}

function BookAttributes({ value, onChange }) {
    return (
        <>
            <div className="pure-control-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input type="number" id="weight" name="weight" min="0" step="1" aria-label="Weight" value={value || ""} onChange={onChange} required />
                <span className="pure-form-message-inline"></span>
            </div>
            <div className="pure-controls">
                <p>Please provide weight in kg.</p>
            </div>
        </>
    );
}

export default function ProductAdd() {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const [inputValues, setInputValues] = useState([]);

    function validate() {
        // Conflict input named "length" with length attrib
        // const formLength = formRef.current.length;
        const nodeList = formRef.current.querySelectorAll("input, select");
        const formLength = nodeList.length;
        if (formRef.current.checkValidity() === false) {
            for (let i = 0; i < formLength; i++) {
                const element = nodeList[i];
                const errorElement = element.parentNode.querySelector(".pure-form-message-inline");
                if (errorElement) {
                    if (!element.validity.valid) {
                        errorElement.textContent = element.validationMessage;
                    } else {
                        errorElement.textContent = "";
                    }
                }
            }
            return false;
        }

        for (let i = 0; i < formLength; i++) {
            const element = nodeList[i];
            const errorElement = element.parentNode.querySelector(".pure-form-message-inline");
            if (errorElement) {
                errorElement.textContent = "";
            }
        }
        return true;
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validate()) {
            axios.post("http://react-php-mysql-api-demo.swo2.usermd.net/api/add", inputValues)
                .then((response) => {
                    if (response.data.status === "success") {
                        console.log(response);
                        navigate("/");
                    } else if (response.data.status === "duplicate") {
                        const errorElement = formRef.current.querySelector("#sku + .pure-form-message-inline");
                        errorElement.textContent = "SKU already taken."; // need to localize
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <>
            <form ref={formRef} id="product_form" className="pure-form pure-form-aligned" method="post" onSubmit={handleSubmit} noValidate>
                <fieldset>
                    <div className="pure-g header">
                        <div className="pure-u-4-5">
                            <h1>Product Add</h1>
                        </div>
                        <div className="pure-u-1-5 header-controls">
                            <button type="submit" id="saveButton" className="pure-button pure-button-primary">Save</button>
                            <Link to="/" className="pure-button">Cancel</Link>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="pure-control-group">
                        <label htmlFor="sku">SKU</label>
                        <input type="text" id="sku" name="sku" value={inputValues.sku || ""} aria-label="Stock keeping unit" placeholder="Stock keeping unit" onChange={handleChange} required />
                        <span className="pure-form-message-inline"></span>
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={inputValues.name || ""} aria-label="Name" onChange={handleChange} required />
                        <span className="pure-form-message-inline"></span>
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="price">Price ($)</label>
                        <input type="number" id="price" name="price" value={inputValues.price || ""} min="0.00" step="0.01" aria-label="Price" onChange={handleChange} required />
                        <span className="pure-form-message-inline"></span>
                    </div>
                    <div className="pure-control-group">
                        <label htmlFor="productType">Type Switcher</label>
                        <select id="productType" name="productType" value={inputValues.productType || ""} onChange={handleChange} required>
                            <option value="">Type Switcher</option>
                            <option id="DVD" value="DVD">DVD</option>
                            <option id="Furniture" value="Furniture">Furniture</option>
                            <option id="Book" value="Book">Book</option>
                        </select>
                        <span className="pure-form-message-inline"></span>
                    </div>
                    {inputValues.productType === "DVD" && <DVDAttributes value={inputValues.size} onChange={handleChange} />}
                    {inputValues.productType === "Furniture" && (
                        <FurnitureAttributes
                            heightValue={inputValues.height}
                            widthValue={inputValues.width}
                            lengthValue={inputValues.length}
                            onChange={handleChange} />
                    )}
                    {inputValues.productType === "Book" && <BookAttributes value={inputValues.weight} onChange={handleChange} />}
                </fieldset>
            </form>
            <div className="footer">
                <p>Scandiweb Test assignment</p>
            </div>
        </>
    );
}
