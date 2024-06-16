import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { baseUrl } from "./constants.js"
import { getProducts, getCategories } from '../services/productService.js';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "../utils/NumberFormatter";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState([products]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (componentMounted) {
          const data = await getProducts();
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      if (selectedCategoryId == 0) {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter(product => product.categoryid === selectedCategoryId));
      }
    };

    filterProducts();
  }, [selectedCategoryId]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button key="0"
            className={`btn ${selectedCategoryId == 0 ? "btn-dark" : "btn-outline-dark"} btn-sm m-2`}
            onClick={() => setCategoryId(0)}>All</button>
          {categories.map((category, i) => {
            return (
              <button key={category.id}
                className={`btn ${selectedCategoryId == category.id ? "btn-dark" : "btn-outline-dark"} btn-sm m-2`}
                onClick={() => setCategoryId(category.id)}>{category.name}</button>
            )
          })}
        </div>

        {filteredProducts.map((product) => {
          if (product.description)
            return (
              <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                <div className="card text-center h-100" key={product.id}>
                  <Link
                    to={"/product/" + product.id}
                  >
                    <img
                      className="card-img-top p-3"
                      src={product.imageUrl}
                      alt="Card"
                      height="auto"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">Php {formatNumberWithCommas(product.price)}</li>
                  </ul>
                  <div className="card-body">
                    <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                      Buy Now
                    </Link>
                    <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

            );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
