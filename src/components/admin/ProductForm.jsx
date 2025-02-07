import React, { useState } from 'react';
import './admin.css';
import Sidemenu from './Sidemenu';
import AdminNav from './AdminNav';
import API_BASE_URL from '../../../config/ApiBaseUrl.js';

const ProductForm = () => {
    const [imageFile, setImageFile] = useState(null);
    const [productTitle, setProductTitle] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [notification, setNotification] = useState('');

    const handleCategoryClick = (value) => {
        setCategory(value);
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile || !productTitle || !price || !desc || !category) {
            alert('All Fields Are Required. Please Fill All');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('name', productTitle);
        formData.append('price', price);
        formData.append('desc', desc);
        formData.append('category', category);

        try {
            const response = await fetch(`${API_BASE_URL}/createproduct`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setNotification('PRODUCT CREATED SUCCESSFULLY')
                setTimeout(() => {
                    setNotification('')
                }, 8000);
                setImageFile(null);
                setProductTitle('');
                setPrice('');
                setDesc('');
                setCategory('');
            } else {
                alert(`ERROR: ${data.message}`);
            }
        } catch (err) {
            console.error('Error Submitting Form', err);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className="panelform-parent">
                <form onSubmit={handleSubmit} id="panelform">
                    <div className="panelcategories">
                        <h4>CATEGORY</h4>
                        {['EXECUTIVE SERIES', 'CEO COLLECTION', 'ELITE EXCLUSIVE', 'TAILORED PRESTIGED', 'TIMELESS CLASSICS', 'ROYAL HERITAGE'].map((categoryOption) => (
                            <div
                                key={categoryOption}
                                className={`paneloption ${category === categoryOption ? 'selected' : ''}`}
                                onClick={() => handleCategoryClick(categoryOption)}
                            >
                                {categoryOption}
                            </div>
                        ))}
                    </div>
                    <div className="panelinputs">
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            className="imgfile"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="fileInput" className="file-label">
                            Upload Image
                        </label>
                        <input
                            type="text"
                            placeholder="PRODUCT TITLE"
                            className="producttitle"
                            value={productTitle}
                            onChange={(e) => setProductTitle(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="PRICE"
                            className="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <textarea
                            id="paneldesc"
                            cols="32"
                            rows="5"
                            placeholder="Enter Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></textarea>
                        <input
                            type="submit"
                            value="ADD PRODUCT"
                            id="panelsubmit"
                        />
                    </div>
                </form>
            </div>
            {notification && (
                <div className="notification-div-admin-products">
                    <h3>{notification}</h3>
                </div>
            )}
        </>
    );
};

export default ProductForm;
