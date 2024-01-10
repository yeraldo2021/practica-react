import React, { Suspense } from "react";

const ListAdvertsOrganism = React.lazy(() =>
  import("../organisms/list-adverts.organism")
);

function AdvertsTemplate() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ListAdvertsOrganism></ListAdvertsOrganism>
      </Suspense>
    </div>
  );
}

export default AdvertsTemplate;
