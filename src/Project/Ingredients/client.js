import axios from 'axios'
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000"
export const INGREDIENTS_API = `${BASE_API_URL}/ingredients`

const client = axios.create({
    withCredentials: true,
    baseURL: INGREDIENTS_API
})

export const createIngredient = async (ingredient) => {
    const response = await client.post('/', ingredient)
    return response.data
}

export const updateIngredient = async (ingredientId, ingredient) => {
    const response = await client.put(`/${ingredientId}`, ingredient)
    return response.data
}

export const deleteIngredient = async (ingredientId) => {
    const response = await client.delete(`/${ingredientId}`)
    return response.data
}

export const findIngredientById = async (ingredientId) => {
    const response = await client.get(`/${ingredientId}`)
    return response.data
}

export const findIngredientByName = async (name) => {
    const response = await client.get(`/name/${name}`)
    return response.data
}

export const findAllIngredients = async () => {
    const response = await client.get('/')
    return response.data
}

export const findIngredientsBySearchTerm = async (searchTerm) => {
    const response = await client.get(`/search/${searchTerm}`)
    return response.data
}

