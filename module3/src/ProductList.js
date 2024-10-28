import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import dayjs from "dayjs";
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data));

    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesCategory = selectedCategory ? product.categoryId === Number(selectedCategory) : true;
    return matchesName && matchesCategory;
  });

  const sortedProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <Link
        to={'/add'}
        style={{
          textDecoration: 'none',
          color: '#fff',
          backgroundColor: '#007BFF',
          padding: '10px 15px',
          borderRadius: '4px',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '30px',
        }}
      >
        Add
      </Link>

      <Formik
        initialValues={{ searchName: '', selectedCategory: '' }}
        onSubmit={(values) => {
          setSearchName(values.searchName);
          setSelectedCategory(values.selectedCategory);
        }}
      >
        {({ setFieldValue }) => (
          <Form style={{ padding: '10px 0' }}>
            <div>
              <Field
                type="text"
                name="searchName"
                placeholder="Tìm kiếm theo tên sản phẩm"
                onChange={(e) => setFieldValue('searchName', e.target.value)}
              />
              <Field as="select" name="selectedCategory" onChange={(e) => setFieldValue('selectedCategory', e.target.value)}>
                <option value="">Tất cả thể loại</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Field>
            </div>
            <button type="submit">Tìm kiếm</button>
          </Form>
        )}
      </Formik>

      {sortedProducts.length === 0 ? (
        <p>Không có kết quả</p> 
      ) : (
        <table border={1}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm</th>
              <th>Thể loại</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Ngày nhập sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.categoryId}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{dayjs(product.importDate).format('DD/MM/YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;