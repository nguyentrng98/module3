import { Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import ProductAdd from "./ProductAdd";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductAdd />} />
      </Routes>

    </>
  );
}

export default App;