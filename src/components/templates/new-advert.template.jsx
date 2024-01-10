import React, { Suspense } from "react";
import NewAdvertOrganism from "../organisms/new-advert.organism";

function NewAdvertTemplate() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <NewAdvertOrganism></NewAdvertOrganism>
      </Suspense>
    </div>
  );
}

export default NewAdvertTemplate;
