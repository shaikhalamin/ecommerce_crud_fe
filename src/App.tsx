import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import ProductCreate from "./components/dashboard/products/create/ProductCreate";
import EditProduct from "./components/dashboard/products/edit/EditProduct";
import ProductIndex from "./components/dashboard/products/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProductIndex />} />
      <Route path="/dashboard/products" element={<ProductIndex />} />
      <Route path="/dashboard/products/create" element={<ProductCreate />} />
      <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
    </Routes>
  );
}

export default App;
