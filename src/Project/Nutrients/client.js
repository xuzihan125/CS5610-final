import axios from 'axios';
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
export const NUTRIENTS_API = `${BASE_API_URL}/nutrients`

const client = axios.create({
    withCredentials: true,
    baseURL: NUTRIENTS_API
})

export const createNutrient = async (nutrient) => {
    const response = await client.post('/', nutrient)
    return response.data
}

export const updateNutrient = async (nutrientId, nutrient) => {
    const response = await client.put(`/${nutrientId}`, nutrient)
    return response.data
}

export const deleteNutrient = async (nutrientId) => {
    const response = await client.delete(`/${nutrientId}`)
    return response.data
}

export const findAllNutrients = async () => {
    const response = await client.get('/')
    return response.data
}

export const findNutrientById = async (nutrientId) => {
    const response = await client.get(`/${nutrientId}`)
    return response.data
}

export const findNutrientsByName = async (name) => {
    const response = await client.get(`/name/${name}`)
    return response.data
}

export const findNutrientsBySearchTerm = async (searchTerm) => {
    const response = await client.get(`/search/${searchTerm}`)
    return response.data
}



