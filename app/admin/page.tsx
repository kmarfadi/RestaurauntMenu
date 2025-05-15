"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin-panel.css'; // Add a CSS file for styling

type LoginData = {
  username: string;
  password: string;
};

type CategoryData = {
  name: string;
  cover_image: string;
};

type ItemData = {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
};

const API = 'http://localhost:3003'; // Change if needed

const AdminPanel: React.FC = () => {
  const [token, setToken] = useState<string>(typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '');
  const [view, setView] = useState<'login' | 'dashboard'>(token ? 'dashboard' : 'login');
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
  const [categoryData, setCategoryData] = useState<CategoryData>({ name: '', cover_image: '' });
  const [itemData, setItemData] = useState<ItemData>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category_id: 0,
  });
  const [menuData, setMenuData] = useState<{ categories: any[]; items: any[] }>({ categories: [], items: [] });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchMenuData();
    }
  }, []);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/admin/login`, loginData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.token);
      }
      setToken(res.data.token);
      setView('dashboard');
    } catch (err) {
      alert('فشل تسجيل الدخول');
    }
  };

  const addCategory = async () => {
    try {
      await axios.post(`${API}/admin/category`, categoryData, authHeaders);
      alert('تمت إضافة الفئة!');
      fetchMenuData();
    } catch (err) {
      alert('فشل في إضافة الفئة');
    }
  };

  const addItem = async () => {
    if (!itemData.name || !itemData.description || !itemData.price || !itemData.image || !itemData.category_id) {
      alert('يرجى ملء جميع الحقول قبل إضافة العنصر');
      return;
    }
    try {
      await axios.post(`${API}/admin/item`, itemData, authHeaders);
      alert('تمت إضافة العنصر!');
      fetchMenuData();
    } catch (err) {
      alert('فشل في إضافة العنصر');
    }
  };

  const fetchMenuData = async () => {
    try {
      const res = await axios.get(`${API}/menu`);
      setMenuData(res.data);
    } catch (err) {
      alert('فشل في جلب بيانات القائمة');
    }
  };

  const deleteCategory = async (id: number) => {
    if (confirm('هل أنت متأكد أنك تريد حذف هذه الفئة؟')) {
      try {
        await axios.delete(`${API}/admin/category/${id}`, authHeaders);
        alert('تم حذف الفئة!');
        fetchMenuData();
      } catch (err) {
        alert('فشل في حذف الفئة');
      }
    }
  };

  const deleteItem = async (id: number) => {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟')) {
      try {
        await axios.delete(`${API}/admin/item/${id}`, authHeaders);
        alert('تم حذف العنصر!');
        fetchMenuData();
      } catch (err) {
        alert('فشل في حذف العنصر');
      }
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setToken('');
    setView('login');
  };

  if (view === 'login') {
    return (
      
      <div className="admin-panel">
        <h2 className="admin-title">تسجيل دخول المسؤول</h2>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="اسم المستخدم"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
          /><br />
          <input
            className="form-input"
            type="password"
            placeholder="كلمة المرور"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          /><br />
          <button className="form-button" onClick={handleLogin}>تسجيل الدخول</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
        <button className="form-button" onClick={logout}>
            تسجيل الخروج    
        </button>
      <h2 className="admin-title">لوحة المسؤول</h2>

      <hr />

      <section className="admin-section">
        <h2 className="section-title">إضافة فئة</h2>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="الاسم"
            value={categoryData.name}
            onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
          /><br />
         <br />
          <button className="form-button" onClick={addCategory}>إضافة الفئة</button>
        </div>
      </section>

      <hr />

      <section className="admin-section">
        <h2 className="section-title">إضافة عنصر</h2>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="الاسم"
            value={itemData.name}
            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
          /><br />
          <input
            className="form-input"
            placeholder="الوصف"
            value={itemData.description}
            onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
          /><br />
          <input
            className="form-input"
            type="number"
            placeholder="السعر"
            value={itemData.price}
            onChange={(e) => setItemData({ ...itemData, price: Number(e.target.value) })}
          /><br />
          <input
            className="form-input"
            placeholder="رابط الصورة"
            value={itemData.image}
            onChange={(e) => setItemData({ ...itemData, image: e.target.value })}
          /><br />
          <select
            className="form-select"
            onChange={(e) => setItemData({ ...itemData, category_id: Number(e.target.value) })}
          >
            <option value="">اختر فئة</option>
            {menuData.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select><br />
          <button className="form-button" onClick={addItem}>إضافة العنصر</button>
        </div>
      </section>

      <hr />

      <section className="admin-section">
        <h2 className="section-title">حذف فئة</h2>
       
        <p style={{ color: 'red', fontSize: '12px', marginTop: '5px', marginBottom: '10px' }}>
          ملاحظة: تأكد من مراجعة العناصر المرتبطة قبل حذف الفئة.
        </p>
        <select className="form-select" onChange={(e) => deleteCategory(Number(e.target.value))}>
          <option value="">اختر فئة للحذف</option>
          {menuData.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </section>

      <hr />

      <section className="admin-section">
        <h2 className="section-title">حذف عنصر</h2>
        <select className="form-select" onChange={(e) => deleteItem(Number(e.target.value))}>
          <option value="">اختر عنصر للحذف</option>
          {menuData.items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </section>
    </div>
  );
};

export default AdminPanel;
