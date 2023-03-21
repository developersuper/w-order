import { AUTH, HOST_URL } from "../constant/api.contant";
import axiosInstance, { RestfulService } from "./restful.service";
import { PlacePayloadType } from "types/Place.type";

const createPlacesService = (userId: string, params: PlacePayloadType) => {
    return axiosInstance.post(HOST_URL + AUTH.PLACES(userId), params);
};

const createPlacesServiceFirst = (userId: string, params: PlacePayloadType) => {
    return axiosInstance.post(HOST_URL + AUTH.PLACES_FIRST(userId), params);
};

const createCategory = (userId: string, placeId?: string, params?: {name?: string, status: number}) => {
    return axiosInstance.post(HOST_URL + AUTH.CATEGORY(userId, placeId), params);
};

const createMenuItem = (userId: string, params?: any) => {
    return axiosInstance.post(HOST_URL + AUTH.MENU_ITEM(userId), params);
};

const deletePlacesById = (userId: string, placeId?: string) => {
    return axiosInstance.delete(HOST_URL + AUTH.PLACES_BY_ID(userId, placeId));
};

const deleteMenuItem = (userId: string, params?: any) => {
    return axiosInstance.delete(HOST_URL + AUTH.MENU_ITEM(userId) + `/${params?.id}`);
};

const updateCategory = (userId: string, placeId?: string, categoryId?: string, params?: any) => {
    return axiosInstance.put(HOST_URL + AUTH.CATEGORY(userId, placeId) + `/${categoryId}`, params);
};

const deleteCategory = (userId: string, placeId?: string, categoryId?: string, params?: any) => {
    return axiosInstance.delete(HOST_URL + AUTH.CATEGORY(userId, placeId) + `/${categoryId}`);
};

const updatePlacesById = (userId: string, placeId?: string, params?: any) => {
    return axiosInstance.put(HOST_URL + AUTH.PLACES_BY_ID(userId, placeId), params);
};

const updateMenuItem = (userId: string, params?: any) => {
    return axiosInstance.put(HOST_URL + AUTH.MENU_ITEM(userId) + `/${params?.id}`, params);
};


const getPlacesService = (userId: string) => {
    return axiosInstance.get(HOST_URL + AUTH.PLACES(userId));
};

const getPlacesPublic = (name?: string) => {
    return axiosInstance.get(HOST_URL + AUTH.PLACES_PUBLIC(name));
};

const getPlacesById = (userId: string, placeId?: string) => {
    return axiosInstance.get(HOST_URL + AUTH.PLACES_BY_ID(userId, placeId));
};

const getMenuItemById = (userId: string, menuId?: string) => {
    return axiosInstance.get(HOST_URL + AUTH.MENU_ITEM_BY_ID(userId, menuId));
}


const PlaceService = {
    createPlacesService,
    createPlacesServiceFirst,
    createCategory,
    deleteCategory,
    createMenuItem,
    deletePlacesById,
    deleteMenuItem,
    updatePlacesById,
    updateCategory,
    updateMenuItem,
    getPlacesService,
    getPlacesById,
    getPlacesPublic,
    getMenuItemById,

};

export default PlaceService;