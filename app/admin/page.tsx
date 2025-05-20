"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import "./admin-panel.css";

type LoginData = {
  username: string;
  password: string;
};

type CategoryData = {
  name: string;
};

type ItemData = {
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: number;
};

//const API = "http://localhost:3003" ; // Change if needed
const API = process.env.NODE_ENV === "production"
  ? "https://restaurauntmenu-server.onrender.com"
  : "http://localhost:3003"; // Change if needed
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;

const AdminPanel: React.FC = () => {
  const [token, setToken] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""
  );
  const [view, setView] = useState<"login" | "dashboard">("login");
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [categoryData, setCategoryData] = useState<CategoryData>({
    name: "",
  });
  const [itemData, setItemData] = useState<ItemData>({
    name: "",
    description: "",
    price: 1000,
    image: "",
    category_id: 0,
  });
  const [menuData, setMenuData] = useState<{
    categories: any[];
    items: any[];
  }>({ categories: [], items: [] });
  const [showPassword, setShowPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchMenuData();
    }
  }, []);

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${API}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.url) {
        return res.data.url;
      } else {
        throw new Error("Failed to retrieve uploaded image URL");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("فشل رفع الصورة. يرجى المحاولة مرة أخرى.");
      return "";
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/admin/login`, loginData);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", res.data.token);
      }
      setToken(res.data.token);
      setView("dashboard");
    } catch (err) {
      alert("فشل تسجيل الدخول");
    }
  };

  const addCategory = async () => {
    try {
      await axios.post(`${API}/admin/category`, categoryData, authHeaders);
      alert("تمت إضافة الفئة!");
      setCategoryData({ name: "" });
      fetchMenuData();
    } catch (err) {
      alert("فشل في إضافة الفئة");
    }
  };

  const addItem = async () => {
    if (!itemData.name || !itemData.description || !itemData.price || !itemData.image || !itemData.category_id) {
      alert("يرجى ملء جميع الحقول قبل إضافة العنصر");
      return;
    }
    try {
      await axios.post(`${API}/admin/item`, itemData, authHeaders);
      alert("تمت إضافة العنصر!");
      setItemData({
        name: "",
        description: "",
        price: 1000,
        image: "",
        category_id: 0,
      });
      fetchMenuData();
    } catch (err) {
      alert("فشل في إضافة العنصر");
    }
  };

  const fetchMenuData = async () => {
    try {
      const res = await axios.get(`${API}/menu`);
      setMenuData(res.data);
    } catch (err) {
      alert("فشل في جلب بيانات القائمة");
    }
  };

  const deleteCategory = async (id: number) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذه الفئة؟")) {
      try {
        await axios.delete(`${API}/admin/category/${id}`, authHeaders);
        alert("تم حذف الفئة!");
        fetchMenuData();
      } catch (err) {
        alert("فشل في حذف الفئة");
      }
    }
  };

  const deleteItem = async (id: number) => {
    if (confirm("هل أنت متأكد أنك تريد حذف هذا العنصر؟")) {
      try {
        await axios.delete(`${API}/admin/item/${id}`, authHeaders);
        alert("تم حذف العنصر!");
        fetchMenuData();
      } catch (err) {
        alert("فشل في حذف العنصر");
      }
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken("");
    setView("login");
  };

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploading(true);
      const url = await uploadToCloudinary(e.target.files[0]);
      setCategoryData({ ...categoryData });
      setUploading(false);
    }
  };

  const handleItemImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploading(true);
      const url = await uploadToCloudinary(e.target.files[0]);
      setItemData({ ...itemData, image: url });
      setUploading(false);
    }
  };

  if (view === "login") {
    return (
      <div className="admin-panel">
        <h2 className="admin-title">تسجيل دخول المسؤول</h2>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="اسم المستخدم"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
          />
          <br />
          <div className="password-input-wrapper" style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              style={{ paddingLeft: "40px" }}
            />
          </div>
          <br />
          <button className="form-button" onClick={handleLogin}>
            تسجيل الدخول
          </button>
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
          <label htmlFor="category-name" className="form-label">
            الاسم <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="category-name"
            className="form-input"
            placeholder="الاسم"
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData({ ...categoryData, name: e.target.value })
            }
          />
          <br />
          <button className="form-button" onClick={addCategory}>
            إضافة الفئة
          </button>
        </div>
      </section>

      <hr />

      <section className="admin-section">
        <h2 className="section-title">إضافة عنصر</h2>
        <div className="form-group">
          <label htmlFor="item-name" className="form-label">
            الاسم <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="item-name"
            className="form-input"
            placeholder="الاسم"
            value={itemData.name}
            onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
          />
          <br />
          <label htmlFor="item-description" className="form-label">
            الوصف <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="item-description"
            className="form-input"
            placeholder="الوصف"
            value={itemData.description}
            onChange={(e) =>
              setItemData({ ...itemData, description: e.target.value })
            }
          />
          <br />
          <label htmlFor="item-price" className="form-label">
            السعر <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="item-price"
            className="form-input"
            type="number"
            placeholder="السعر"
            value={itemData.price}
            onChange={(e) =>
              setItemData({ ...itemData, price: Number(e.target.value) })
            }
          />
          <br />
          <label htmlFor="item-image-upload" className="form-label">
            ارفع صورة المنتج <span style={{ color: "red" }}>*</span>
            <br />
            <span style={{ color: "red", fontSize: "12px" }}>
              (يجب أن تكون الصورة أقل من 5 ميجابايت)
            </span>
          </label>
          <input
            id="item-image-upload"
            className="form-input"
            type="file"
            onChange={handleItemImageUpload}
          />
          {uploading && <p>جارٍ رفع الصورة...</p>}
          {itemData.image && (
            <img
              src={itemData.image}
              alt="Item Image Preview"
              className="w-full h-auto mt-2"
            />
          )}
          <br />
          <label htmlFor="item-category" className="form-label">
            اختر فئة <span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="item-category"
            className="form-select"
            onChange={(e) =>
              setItemData({ ...itemData, category_id: Number(e.target.value) })
            }
          >
            <option value="">اختر فئة</option>
            {menuData.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <br />
          <button className="form-button" onClick={addItem}>
            إضافة العنصر
          </button>
        </div>
      </section>

      <hr />

      <section className="admin-section">
        <h2 className="section-title">حذف فئة</h2>
        <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>
          ملاحظة: تأكد من مراجعة العناصر المرتبطة قبل حذف الفئة.
        </p>
        <select
          className="form-select"
          onChange={(e) => deleteCategory(Number(e.target.value))}
        >
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
        <select
          className="form-select"
          onChange={(e) => deleteItem(Number(e.target.value))}
        >
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