import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import ControlsList from "./pages/ControlsList.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ControlDetail from "./pages/ControlDetail.jsx";
import AIPanel from "./components/AIPanel.jsx";
import Analytics from "./pages/Analytics.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ControlsList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/detail"
            element={
              <ProtectedRoute>
                <ControlDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
           }
         />

          <Route
            path="/ai-panel"
            element={
              <ProtectedRoute>
                <AIPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;