import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import SetupQuiz from "./pages/SetupQuiz";
import Login from "./components/Login";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { QuizProvider } from "./context/QuizContext";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (user === undefined) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function LoginRedirect({ children }) {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to={"/"} replace /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginRedirect>
                  <Login />
                </LoginRedirect>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/setup"
              element={
                <PrivateRoute>
                  <SetupQuiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/result"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
            {/* Redirect default */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

// export default function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <QuizProvider>
//           <Routes>
//             {/* Jika sudah login, arahkan langsung ke Home */}
//             <Route
//               path="/login"
//               element={
//                 <LoginRedirectWrapper>
//                   <Login />
//                 </LoginRedirectWrapper>
//               }
//             />
//             <Route
//               path="/"
//               element={
//                 <PrivateRoute>
//                   <Home />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/setup"
//               element={
//                 <PrivateRoute>
//                   <SetupQuiz />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/quiz"
//               element={
//                 <PrivateRoute>
//                   <Quiz />
//                 </PrivateRoute>
//               }
//             />
//             <Route
//               path="/result"
//               element={
//                 <PrivateRoute>
//                   <Result />
//                 </PrivateRoute>
//               }
//             />
//             {/* Default redirect */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </QuizProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// function LoginRedirectWrapper({ children }) {
//   const { user } = useContext(AuthContext);
//   if (user) return <Navigate to="/" replace />;
//   return children;
// }
