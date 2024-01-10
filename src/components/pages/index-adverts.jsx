import React from "react";
import { Outlet, redirect } from "react-router-dom";
import IndexAdvertsTemplate from "../templates/index-adverts.template";
import { authService } from "../../services/auth.service";

export async function LoaderAdverts() {
  const response = await authService.validateSession();

  if (!response) return redirect("/login");

  return null;
}

function IndexAdverts() {
  return (
    <div style={{ overflowY: "hidden" }}>
      <IndexAdvertsTemplate></IndexAdvertsTemplate>
    </div>
  );
}

export default IndexAdverts;
