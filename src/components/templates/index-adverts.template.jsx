import React from "react";
import { Outlet } from "react-router-dom";
import HeaderOrganism from "../organisms/header.organism";

function IndexAdvertsTemplate() {
  return (
    <>
      <HeaderOrganism></HeaderOrganism>
      <Outlet></Outlet>
    </>
  );
}

export default IndexAdvertsTemplate;
