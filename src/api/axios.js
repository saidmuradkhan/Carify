import axios from "axios";
import {
  cars,
  blogPosts,
  shipments,
  reviews,
  team,
  faq,
  brands,
  customsRates,
} from "../../db.json";

const collections = { cars, blogPosts, shipments, reviews, team, faq, brands, customsRates, carOrders: [] };

function matches(item, key, value) {
  if (key.endsWith("_gte")) return Number(item[key.slice(0, -4)]) >= Number(value);
  if (key.endsWith("_lte")) return Number(item[key.slice(0, -4)]) <= Number(value);
  return String(item[key]) === String(value);
}

function staticAdapter(config) {
  const url = new URL(config.url, "http://static.local");
  const [name, id] = url.pathname.split("/").filter(Boolean);
  const collection = collections[name];
  const respond = (status, data) =>
    Promise[status < 400 ? "resolve" : "reject"]({ data, status, statusText: "", headers: {}, config });

  if (!collection) return respond(404, {});

  if (config.method === "post") {
    const body = typeof config.data === "string" ? JSON.parse(config.data) : config.data;
    const created = { id: String(Date.now()), ...body };
    collection.push(created);
    return respond(201, created);
  }

  if (id) {
    const item = collection.find((entry) => String(entry.id) === id);
    return item ? respond(200, item) : respond(404, {});
  }

  const { _sort, _order, _limit, ...filters } = Object.fromEntries(url.searchParams);
  let result = collection.filter((item) =>
    Object.entries(filters).every(([key, value]) => matches(item, key, value))
  );
  if (_sort) {
    const direction = _order === "desc" ? -1 : 1;
    result = [...result].sort((a, b) => (a[_sort] > b[_sort] ? direction : -direction));
  }
  if (_limit) result = result.slice(0, Number(_limit));
  return respond(200, result);
}

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create(apiUrl ? { baseURL: apiUrl } : { adapter: staticAdapter });

export default api;
