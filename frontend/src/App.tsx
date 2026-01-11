import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Editor from "./editor/Editor";
import TeacherDashboard from "./dashboard/TeacherDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/dashboard" element={<TeacherDashboard />} />
        <Route
  path="/editor"
  element={
    <ProtectedRoute role="student">
      <Editor />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute role="teacher">
      <TeacherDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}
