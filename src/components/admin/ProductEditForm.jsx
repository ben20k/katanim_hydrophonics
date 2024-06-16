import { useState, useEffect } from "react"
import { baseUrl } from "../constants.js"

function ProductEditForm() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);


  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: ''
  });

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(baseUrl + "/categories/")
      setCategoryOptions(await response.json());
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(imageUrl == null) {
        setImageUrl("/assets/NoImage.png");
      }

      setFormData({
        title: title,
        price: price,
        description: description,
        categoryid: categoryId,
        imageUrl: imageUrl,
      })

      const response = await fetch(baseUrl + "/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({formData}.formData)
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      // Handle success
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name:</label>
              <input type="text" className="form-control" id="productName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required/>
            </div>
            <div className="mb-3">
              <label htmlFor="productCategory" className="form-label">Product Category:</label>
              <select id="productCategory" className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Select...</option>
                {categoryOptions.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Product Price:</label>
              <input type="number" className="form-control" id="productPrice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required/>
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">Product Description:</label>
              <textarea type="text" className="form-control" id="productDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required/>
            </div>
            
            <button className="btn btn-dark m-1" type="submit">{productToEdit ? 'Edit Product' : 'Add Product'}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProductEditForm