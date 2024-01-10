import React from "react";
import { redirect } from "react-router-dom";
import { authService } from "../../services/auth.service";
import LoginTemplate from "../templates/login.template";

export async function LoaderLogin() {
  const res = await authService.validateSession();
  if (res) return redirect("/adverts");
  return null;
}

function LoginPage() {
  return (
    <div className="w-50 m-auto mt-4">
      <LoginTemplate></LoginTemplate>
    </div>
  );
}

export default LoginPage;
