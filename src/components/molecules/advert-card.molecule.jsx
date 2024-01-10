import React from "react";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function AdvertCardMolecule({ data }) {
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          height={"200"}
          variant="top"
          src={
            data.photo
              ? data.photo
              : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
          }
        />
        <Card.Body>
          <Card.Title className="text-muted font-weight-normal mb-2">
            <div className="d-flex flex-row justify-content-between">
              <span>{data.name}</span>
              <span>$ {data.price}.00</span>
            </div>
          </Card.Title>

          <div className="text-start mb-2">
            <div className="d-flex flex-row gap-2 ">
              {data.tags.map((item, index) => (
                <Badge className="" bg="success" key={index}>
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-start mb-4">
            <Badge className="" bg="warning text-black text-uppercase">
              {data.sale ? "Venta" : "Compra"}
            </Badge>
          </div>
          <Link
            className="btn btn-primary"
            variant="primary"
            to={`/adverts/${data.id}`}
          >
            Detalle
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}

export default AdvertCardMolecule;
