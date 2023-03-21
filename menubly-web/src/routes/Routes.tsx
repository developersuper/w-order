import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./../contexts/Auth/AuthContext";
import MasterLayout from "layouts/MasterLayout/";
import { LoadingBarProcess } from "components/loadingBarProcess";
import AccountPage from "pages/Account/AccountPage";
import PreviewPage from "pages/Preview/Preview";

const Login = React.lazy(() => import("./../pages/Login"));
const Signup = React.lazy(() => import("./../pages/Signup/SignupPage"));
const Home = React.lazy(() => import("./../pages/Home/HomePage"));
const SetupMenu = React.lazy(() => import("./../pages/SetupMenu/SetupMenuPage"));
const ForgotPassword = React.lazy(() => import("../pages/ResetPassword/ForgotPasswordPage"));
const CheckYourMail = React.lazy(() => import("./../pages/ResetPassword/CheckYourMail"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword/ResetPasswordPage"));
const ChangePasswordSuccess = React.lazy(() => import("../pages/ResetPassword/ChangePasswordSuccess"));
const PlacesPage = React.lazy(() => import("./../pages/Places/PlacesPage"));
const ItemsCollectionPage = React.lazy(() => import("./../pages/ItemsCollection/ItemsCollectionPage"));

const RequireAuth: React.FC<{ children: JSX.Element }> = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const auth = useAuth();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<MasterLayout type="header" />}>
        <Route
          index
          element={
            <React.Suspense fallback={<LoadingBarProcess />}>
              <RequireAuth>
                <Home />
              </RequireAuth>
            </React.Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <React.Suspense fallback={<LoadingBarProcess />}>
              <RequireAuth>
                <AccountPage />
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/home"
          element={
            <React.Suspense fallback={<LoadingBarProcess />}>
              <RequireAuth>
                <Home />
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/places/:id"
          element={
            <React.Suspense fallback={<LoadingBarProcess />}>
              <RequireAuth>
                <PlacesPage />
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/places/:id/item/:itemId"
          element={
            <React.Suspense fallback={<LoadingBarProcess />}>
              <RequireAuth>
                <PlacesPage />
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>
        <Route
          path="/items-collection"
          element={
            <React.Suspense fallback={<LoadingBarProcess />}>
              <RequireAuth>
                <ItemsCollectionPage />
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>
      </Route>
      <Route
        path="/setup-menu"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <RequireAuth>
              <SetupMenu />
            </RequireAuth>
          </React.Suspense>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <Login />
          </React.Suspense>
        }
      />
      <Route
        path="/signup"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <Signup />
          </React.Suspense>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <ForgotPassword />
          </React.Suspense>
        }
      />
      <Route
        path="/reset-password"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <ResetPassword />
          </React.Suspense>
        }
      />
      <Route
        path="/check-your-mail"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <CheckYourMail />
          </React.Suspense>
        }
      />
      <Route
        path="/change-password-success"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <ChangePasswordSuccess />
          </React.Suspense>
        }
      />
      <Route
        path="/p/:name"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <PreviewPage />
          </React.Suspense>
        }
      ></Route>
      <Route
        path="/p/:name/:id"
        element={
          <React.Suspense fallback={<LoadingBarProcess />}>
            <PreviewPage />
          </React.Suspense>
        }
      ></Route>
    </Routes>
  );
};

export default routes;
