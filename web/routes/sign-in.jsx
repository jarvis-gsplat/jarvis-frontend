import GoogleIcon from "../assets/google.svg";
import { useActionForm } from "@gadgetinc/react";
import { api } from "../api";
import { Link, useLocation } from "react-router-dom";

export default function () {
  const {
    register,
    submit,
    formState: { errors, isSubmitting },
  } = useActionForm(api.user.signIn);
  const { search } = useLocation();

  return (
    <form className="custom-form" onSubmit={submit}>
  <h1 className="subtitle">Sign in to your account</h1>
  <a className="google-oauth-button" href={`/auth/google/start${search}`}>
    <img src={GoogleIcon} width={22} height={22} /> <p className="subtitle-black">Google</p>
  </a>
  <input
    className="custom-input"
    placeholder="Email"
    {...register("email")}
  />
  <input
    className="custom-input"
    placeholder="Password"
    type="password"
    {...register("password")}
  />
  {errors?.root?.message && (
    <p className="format-message error">{errors.root.message}</p>
  )}
  <div className="button-container">
  <button className="sign-in-button" disabled={isSubmitting} type="submit">
    <p className="minititle-black">Sign in</p>
  </button>

  <button className="sign-in-button reset-password-button" disabled={isSubmitting} type="button">
    <Link to="/forgot-password" className="minititle-black">Reset password</Link>
  </button>
</div>


</form>
  );
}
