import axios from "axios";

export const backendService = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API_URL!}/api` })
