import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { advertsService } from "../../services/adverts.service";

function AdvertPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [isError, setisError] = useState(false);

  const [data, setData] = useState({
    id: null,
    photo: "",
    name: "",
    price: "",
    sale: "",
    tags: [],
  });

  async function fetchData() {
    try {
      const response = await advertsService.findAdvert(id);
      setData({ ...data, ...response });
    } catch (error) {
      setisError(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    try {
      await advertsService.deleteAdvert(id);
      navigate("/adverts");
    } catch (error) {
      setisError(true);
    }
  }

  return (
    <div className="p-4">
      <div className="card">
        {data.id ? (
          <div className="card-body">
            <div className="row">
              {/* Columna izquierda: Imagen del Producto */}
              <div className="col-md-6 ">
                <img
                  style={{ width: "100%" }}
                  src={
                    data.photo
                      ? data.photo
                      : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                  }
                  alt="Producto"
                  className="img-fluid rounded"
                />
              </div>

              {/* Columna derecha: Información del Producto */}
              <div className="col-md-6">
                <h4 className="card-title mb-4">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{data.name}</span>
                    <span>$ {data.price}.00</span>
                  </div>
                </h4>
                <h4 className="card-text text-uppercase text-primary mb-4">
                  {data.sale ? "Venta" : "Compra"}
                </h4>

                <div className="card-text mb-4">
                  <div className="d-flex  flex-row gap-2">
                    {data.tags.map((tag, index) => (
                      <span
                        className="bg-info p-1 rounded mb-2"
                        key={index}
                        style={{ width: "fit-content" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-text">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(data.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotProductFound />
        )}
      </div>
    </div>
  );
}

function NotProductFound() {
  return (
    <div className="card-body">
      <h1>El producto no existe</h1>
    </div>
  );
}

export default AdvertPage;
