import React from "react";
import { useNavigate } from "react-router-dom";
import "./category.css";
import '../utils/utility.css'

function Category() {
  const navigate = useNavigate();

  // Handler for category click
  const handleCategoryClick = (categoryName) => {
    navigate(`/products/${categoryName}`);
  };

  return (
    <div className="cat-parent">
      <h1 className="g-t">CATEGORIES</h1>
      <div className="cat-boxes">
        <div
          className="cat-box"
          onClick={() => handleCategoryClick("EXECUTIVE SERIES")}
        >
          <div className="img">
            <img src="/assets/cat-1.png" alt="Category Picture" />
          </div>
          <div className="txt">
            <h2>EXECUTIVE SERIES</h2>
          </div>
        </div>
        <div
          className="cat-box"
          onClick={() => handleCategoryClick("CEO COLLECTION")}
        >
          <div className="img">
            <img src="/assets/cat-2.png" alt="Category Picture" />
          </div>
          <div className="txt">
            <h2>CEO COLLECTION</h2>
          </div>
        </div>
        <div
          className="cat-box"
          onClick={() => handleCategoryClick("ELITE EXCLUSIVE")}
        >
          <div className="img">
            <img src="/assets/cat-3.png" alt="Category Picture" />
          </div>
          <div className="txt">
            <h2>ELITE EXCLUSIVE</h2>
          </div>
        </div>
        <div
          className="cat-box"
          onClick={() => handleCategoryClick("TAILORED PRESTIGED")}
        >
          <div className="img">
            <img src="/assets/cat-4.png" alt="Category Picture" />
          </div>
          <div className="txt">
            <h2>TAILORED PRESTIGED</h2>
          </div>
        </div>
        <div
          className="cat-box"
          onClick={() => handleCategoryClick("TIMELESS CLASSICS")}
        >
          <div className="img">
            <img src="/assets/cat-5.png" alt="Category Picture" />
          </div>
          <div className="txt">
            <h2>TIMELESS CLASSICS</h2>
          </div>
        </div>
        <div
          className="cat-box"
          onClick={() => handleCategoryClick("ROYAL HERITAGE")}
        >
          <div className="img">
            <img src="/assets/cat-6.png" alt="Category Picture" />
          </div>
          <div className="txt">
            <h2>ROYAL HERITAGE</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
