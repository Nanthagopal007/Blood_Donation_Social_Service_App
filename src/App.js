import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider
import { CartProvider } from "./context/CartContext"; // ✅ Import CartProvider

const App = () => {
  return (
    <AuthProvider> {/* ✅ Ensure AuthProvider wraps CartProvider */}
      <CartProvider>  
        <AllRoutes />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
