import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { advertsService } from "../../services/adverts.service";
import { useNavigate } from "react-router-dom";

function NewAdvertOrganism() {
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);

  const { handleSubmit, control, register } = useForm();

  const onSubmit = async (data) => {
    try {
      if (selectedTags.length) {
        await advertsService.createAdverts({
          ...data,
          tags: selectedTags,
          photo: photoRef.current,
        });
        navigate("/adverts");
      }
    } catch (error) {}
  };

  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectTag = (e) => {
    const newTag = e.target.value;

    if (!selectedTags.includes(newTag)) {
      setSelectedTags((prevTags) => [...prevTags, newTag]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== newTag));
    }
  };

  const photoRef = useRef(null);

  function handleChangePhoto(ev) {
    photoRef.current = ev.target.files[0];
  }
  async function fetchTags() {
    const response = await advertsService.findTags();
    setTags(response);
  }

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name" className="mb-4">
              <Form.Label>Nombre</Form.Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control required autoComplete="off" {...field} />
                )}
              />
            </Form.Group>

            <Form.Group controlId="sale" className="mb-4">
              <Form.Label>Compra / Venta</Form.Label>
              <Controller
                name="sale"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Select required as="select" {...field}>
                    <option value="">Selecciona</option>
                    <option value="compra">Compra</option>
                    <option value="venta">Venta</option>
                  </Form.Select>
                )}
              />
            </Form.Group>

            <Form.Group controlId="tags" className="mb-4">
              <Form.Label>Tags disponibles</Form.Label>
              <Controller
                name="tags"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Select
                    as="select"
                    {...field}
                    onChange={handleSelectTag}
                  >
                    <option value="" disabled>
                      Selecciona
                    </option>
                    {tags.map((tag, index) => (
                      <option key={index} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </Form.Select>
                )}
              />
              <div className="mt-3">
                {selectedTags.length
                  ? selectedTags.map((tag, index) => (
                      <span className="ms-2" key={index}>
                        <Badge bg="secondary">{tag}</Badge>
                      </span>
                    ))
                  : "No hay tags seleccionados"}
              </div>
            </Form.Group>

            <Form.Group controlId="price" className="mb-4">
              <Form.Label>Precio</Form.Label>
              <Controller
                name="price"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control required autoComplete="off" {...field} />
                )}
              />
            </Form.Group>

            <Form.Group controlId="photo" className="mb-4">
              <Form.Label>Foto</Form.Label>

              <Form.Control
                required
                type="file"
                autoComplete="off"
                onChange={(e) => handleChangePhoto(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewAdvertOrganism;
