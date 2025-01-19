import {
  SignedInOrRedirect,
  SignedOut,
  SignedIn,
  SignedOutOrRedirect,
  Provider,
  useSignOut,
} from "@gadgetinc/react";
import { Suspense, useEffect } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
  Link,
} from "react-router-dom";
import "./App.css";
import { api } from "./api";
import Index from "./routes/index";
import SignedInPage from "./routes/index";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import ResetPasswordPage from "./routes/reset-password";
import VerifyEmailPage from "./routes/verify-email";
import ChangePassword from "./routes/change-password";
import ForgotPassword from "./routes/forgot-password";

const App = () => {
  useEffect(() => {
    document.title = `JARVIS. Clip That.`;
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <SignedOutOrRedirect>
              <Index />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="signed-in"
          element={
            <SignedInOrRedirect>
              <SignedInPage />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="change-password"
          element={
            <SignedInOrRedirect>
              <ChangePassword />
            </SignedInOrRedirect>
          }
        />
        <Route
          path="forgot-password"
          element={
            <SignedOutOrRedirect>
              <ForgotPassword />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-in"
          element={
            <SignedOutOrRedirect>
              <SignInPage />
            </SignedOutOrRedirect>
          }
        />
        <Route
          path="sign-up"
          element={
            <SignedOutOrRedirect>
              <SignUpPage />
            </SignedOutOrRedirect>
          }
        />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
      </Route>
    )
  );

  return (
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

const Layout = () => {
  const navigate = useNavigate();

  return (
    <Provider
      api={api}
      navigate={navigate}
      auth={window.gadgetConfig.authentication}
    >
      <Header />
      <div className="app">
        <div className="app-content">
          <div className="main">
            <Outlet />
          </div>
        </div>
      </div>
    </Provider>
  );
};

const Header = () => {
  const signOut = useSignOut();

  return (
    <div className="header">
      {/* Make the logo clickable */}
      <Link to="/" className="logo-link">
        <div className="logo">{process.env.GADGET_PUBLIC_APP_SLUG}</div>
      </Link>

      <div className="header-content">
        <SignedOut>
          <Link to="/sign-in" className="logo-link">
            sign in
          </Link>
          <Link to="/sign-up" className="logo-link">
            sign up
          </Link>
        </SignedOut>
        <SignedIn>
          <Link to="/change-password" className="logo-link" style={{ color: "white" }}>
            Change password
          </Link>
          <a className="logo-link" onClick={signOut} style={{ color: "white", cursor: "pointer" }}>
            Sign out
          </a>
        </SignedIn>
      </div>
    </div>
  );
};

export default App;
