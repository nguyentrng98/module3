import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const ProductAdd = ({ onProductAdded }) => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);

  useEffect(() => {
  
    fetch('http://localhost:3000/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

 
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^PROD-\d{4}$/, 'Mã sản phẩm phải đúng định dạng PROD–XXXX')
      .required('Mã sản phẩm là bắt buộc'),
    name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    // categoryId: Yup.number().required('Thể loại là bắt buộc'),
    importDate: Yup.date()
      .max(new Date(), 'Ngày nhập không được lớn hơn ngày hiện tại')
      .required('Ngày nhập là bắt buộc'),
    quantity: Yup.number()
      .integer('Số lượng phải là số nguyên')
      .positive('Số lượng phải lớn hơn 0')
      .required('Số lượng là bắt buộc'),
    price: Yup.number()
      .positive('Giá phải lớn hơn 0')
      .required('Giá là bắt buộc'),
  });

  const handleSubmit = (values, { resetForm }) => {
 
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (response.ok) {
          alert('Thêm sản phẩm thành công!');
          navigate('/')
        } else {
          alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
      })
      .catch(error => {
        alert('Có lỗi xảy ra, vui lòng thử lại.');
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Thêm sản phẩm mới</h1>
      <Formik
        initialValues={{
          code: '',
          name: '',
          categoryId: '',
          importDate: '',
          quantity: '',
          price: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <label>Mã sản phẩm:</label>
              <Field type="text" name="code" />
              <ErrorMessage name="code" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Tên sản phẩm:</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Thể loại:</label>
              <Field as="select" name="categoryId">
                <option value="">Chọn thể loại</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Field>
              <ErrorMessage name="categoryId" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Ngày nhập sản phẩm:</label>
              <Field type="date" name="importDate" />
              <ErrorMessage name="importDate" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Số lượng:</label>
              <Field type="number" name="quantity" />
              <ErrorMessage name="quantity" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label>Giá:</label>
              <Field type="number" name="price" />
              <ErrorMessage name="price" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit">Thêm sản phẩm</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductAdd;