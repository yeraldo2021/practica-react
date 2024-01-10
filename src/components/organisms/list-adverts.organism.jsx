import React, { useEffect, useState } from "react";
import AdvertCardMolecule from "../molecules/advert-card.molecule";
import { advertsService } from "../../services/adverts.service";

import "./organism.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function ListAdvertsOrganism() {
  const navigate = useNavigate();
  const [dataAdverts, setDataAdverts] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTags, setSelectedTags] = useState([]);
  const queryType = searchParams.get("sale");
  const queryTag = searchParams.get("tag");
  const [isError, setIsError] = useState(false);

  const [rangeValue, setRangeValue] = useState([0, 500]);

  const handleSliderChange = async (value) => {
    setRangeValue(value);
    let response = await advertsService.findAdverts();
    let temporalAdverts = response.data;
    const res = temporalAdverts.filter(
      (advert) => advert.price >= rangeValue[0] && advert.price <= rangeValue[1]
    );
    setDataAdverts(res);
  };

  const handleMinInputChange = (event) => {
    const minValue = parseInt(event.target.value, 10);
    setRangeValue([minValue, rangeValue[1]]);
  };

  const handleMaxInputChange = (event) => {
    const maxValue = parseInt(event.target.value, 10);
    setRangeValue([rangeValue[0], maxValue]);
  };

  async function fetchDataFilter() {
    let response;
    try {
      if (queryType) {
        if (queryType === "true")
          response = await advertsService.findAdvertsForSale(true);
        if (queryType === "false")
          response = await advertsService.findAdvertsForSale(false);
      } else {
        response = await advertsService.findAdverts();
      }

      setDataAdverts(response.data);
    } catch (error) {
      setIsError(true);
    }
  }

  async function fetchData() {
    const response = await advertsService.findAdverts();
    setDataAdverts(response.data);
    return response.data;
  }

  async function fetchTags() {
    const response = await advertsService.findTags();
    setTags(response);
  }

  useEffect(() => {
    fetchData();
    fetchTags();
    fetchDataFilter();
  }, []);

  async function handleChangeSearch(e) {
    const filter = e.target.value.toLowerCase();
    if (filter !== "") {
      const res = dataAdverts.filter((item) =>
        item.name.toLowerCase().includes(filter)
      );
      setDataAdverts(res);
    } else {
      fetchData();
    }
  }

  async function handleSelectSale(e) {
    const selected = e.target.value;
    const value = selected === "venta" ? true : false;
    let route = "/adverts";
    if (selected !== "") {
      const newData = await fetchData();
      const res = newData.filter((item) => item.sale === value);
      route = `/adverts?sale=${value}`;
      setDataAdverts(res);
    } else if (selected === "") {
      fetchData();
    }
    navigate(route);
  }

  function handleSelectTag(e) {
    const newTag = e.target.value;

    if (!selectedTags.includes(newTag)) {
      setSelectedTags((prevTags) => [...prevTags, newTag]);
    } else {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== newTag));
    }
  }

  useEffect(() => {
    const newDataAdvert = dataAdverts;

    if (selectedTags.length) {
      const filteredData = newDataAdvert.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag))
      );
      setDataAdverts(filteredData);
    } else {
      fetchData();
    }
  }, [selectedTags]);

  return (
    <div
      className="main-adverts d-flex flex-row"
      style={{ minHeight: "100vh" }}
    >
      {/* filtros */}
      <nav className="filters p-4" style={{ minWidth: "15rem" }}>
        <h5>Filtros</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <h6>Tipo venta</h6>
            <select onChange={(e) => handleSelectSale(e)}>
              <option value="">Todos</option>
              <option value="venta">Venta</option>
              <option value="compra">Compra</option>
            </select>
          </li>
          <li className="list-group-item">
            <h6>Precios</h6>
            <div className="d-flex flex-row justify-content-between">
              <input
                className="w-100"
                type="number"
                value={rangeValue[0]}
                onChange={handleMinInputChange}
              />
              <input
                className="w-100"
                type="number"
                value={rangeValue[1]}
                onChange={handleMaxInputChange}
              />
            </div>
            <Slider
              range
              value={rangeValue}
              onChange={handleSliderChange}
              min={0}
              max={500}
            />
          </li>
          <li className="list-group-item">
            <h6>Tags</h6>

            <div>
              {tags.map((tag, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={tag}
                    id={tag}
                    onChange={handleSelectTag}
                  />
                  <label className="form-check-label" htmlFor={tag}>
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </nav>

      {/* tabla dinámica */}
      <div className="content-right d-flex flex-column w-100">
        <div className="search-list p-2 mt-3">
          <label htmlFor="" className="mb-2">
            Buscar publicidad
          </label>
          <input
            className="form-control"
            type="text"
            autoComplete="off"
            onChange={handleChangeSearch}
          />
        </div>
        <div className=" list-adverts row p-4 ">
          {dataAdverts.length
            ? dataAdverts.map((advert, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 g-2 d-flex justify-content-center "
                  key={index}
                >
                  <AdvertCardMolecule data={advert} key={index} />
                </div>
              ))
            : "No hay productos"}
        </div>
      </div>
    </div>
  );
}

export default ListAdvertsOrganism;
