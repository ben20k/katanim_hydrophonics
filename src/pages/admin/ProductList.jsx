import { Navbar, Footer, LeftNav } from "../../components";
import React, { useState, useEffect } from "react";
import { getProducts, getCategories } from '../../services/productService.js';
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "../../utils/NumberFormatter";

function ProductListPage() {

    const [products, setProducts] = useState([]);

    // State to manage the checked status of all checkboxes
    const [headerChecked, setHeaderChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        new Array(products.length).fill(false)
    );

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProducts();
            setProducts(response);
            setCheckedItems(new Array(products.length).fill(false));
        };
        fetchProducts();
    }, []);

    // Handle header checkbox change
    const handleHeaderCheckboxChange = (event) => {
        const isChecked = event.target.checked;
        setHeaderChecked(isChecked);
        setCheckedItems(new Array(products.length).fill(isChecked));
    };

    // Handle individual checkbox change
    const handleCheckboxChange = (index) => (event) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = event.target.checked;
        setCheckedItems(newCheckedItems);

        // If any checkbox is unchecked, uncheck the header checkbox
        if (!event.target.checked) {
            setHeaderChecked(false);
        } else if (newCheckedItems.every((item) => item)) {
            // If all checkboxes are checked, check the header checkbox
            setHeaderChecked(true);
        }
    };

    return (
        <>
            <div className="row">
                <Navbar />
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-3 col-lg-3">
                    <LeftNav />
                </div>
                <div className="pe-3 col-md-9 col-sm-9 col-lg-9">
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col">
                                <div className="row border-bottom py-2 bg-light">
                                    <div className="col-1">
                                        <input type="checkbox"
                                            checked={headerChecked}
                                            onChange={handleHeaderCheckboxChange} />
                                    </div>
                                    <div className="col-6">Product(s)</div>
                                    <div className="col-1">Sales</div>
                                    <div className="col-2">Price</div>
                                    <div className="col-1">Stock</div>
                                    <div className="col-1">Action</div>
                                </div>
                                {products.map((product, index) => (
                                    <div className="row border-bottom py-2 align-items-center" key={product.id}>
                                        <div className="col-1">
                                            <input type="checkbox"
                                                checked={checkedItems[index]}
                                                onChange={handleCheckboxChange(index)} />
                                        </div>
                                        <div className="col-6">
                                            <div className="row small align-items-center">
                                                <div className="col-sm-3">
                                                    <Link to={"/product/" + product.id}>
                                                        <img
                                                            className="card-img-top p-1"
                                                            src={product.imageUrl}
                                                            alt="Card"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="col-sm-9">
                                                    <div className="row">
                                                        <div className="col-sm-12 fw-bold">
                                                            {product.title.substring(0, 20)}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12 small">
                                                            {product.description.substring(0, 70)}...
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            Product ID: {product.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-1"></div>
                                        <div className="col-2">Php {formatNumberWithCommas(product.price)}</div>
                                        <div className="col-1"></div>
                                        <div className="col-1">
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Footer />
            </div>
        </>
    )
}

export default ProductListPage