import axios from "axios";

const base = "http://localhost:3001";

class AdvertsService {
  async findAdverts() {
    const token = window.localStorage.getItem("user");

    const response = await axios.get(`${base}/api/v1/adverts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  async findAdvertsForSale(sale) {
    const token = window.localStorage.getItem("user");

    const response = await axios.get(`${base}/api/v1/adverts?sale=${sale}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  async createAdverts(data) {
    const token = window.localStorage.getItem("user");

    const form = new FormData();
    form.append("name", data.name);
    form.append("sale", data.sale === "compra" ? false : true);
    form.append("tags", data.tags);
    form.append("price", data.price);
    form.append("photo", data.photo);

    await axios.post(`${base}/api/v1/adverts/`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async findAdvert(id) {
    const token = window.localStorage.getItem("user");
    const response = await axios.get(`${base}/api/v1/adverts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async deleteAdvert(id) {
    const token = window.localStorage.getItem("user");

    await axios.delete(`${base}/api/v1/adverts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async findTags() {
    const response = await axios.get(`${base}/api/v1/adverts/tags`);
    return response.data;
  }
}

export const advertsService = new AdvertsService();
