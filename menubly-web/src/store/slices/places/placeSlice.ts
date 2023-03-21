import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { array_move } from 'utils';

export interface PlaceCategory {
    id?: string;
    name: string;
    createdDate?: Date;
    menuItems: MenuItem[];
    placeId?: string;
    status: number;
    expanded?: boolean;
}

export interface MenuItem {
    id?: string | number,
    name: string;
    price: number;
    status: string | number;
    createdDate?: Date;
    description?: string;
    image?: string;
    categoryId?: string;
    currency?: string;
}

export interface Field {
    field: string;
    value: string | number | boolean;
}

export interface PlaceState {
    name: string;
    categories: PlaceCategory[],
    id?: string;
    url: string;
    createdDate?: Date | null;
    qrCode: string;
    shortUrl: string;
    menuItemCount: number | string | null,
    categoryCount: number | string | null,
    currency?: string;
}

const initialState: PlaceState = {
    name: '',
    categories: [],
    url: '',
    createdDate: null,
    qrCode: '',
    shortUrl: '',
    menuItemCount: null,
    categoryCount: null
}

export const PlaceSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        setPlaces: (state, action: PayloadAction<PlaceState>) => {
            const prevCategories = JSON.parse(JSON.stringify(state?.categories));
            const newCategories = action.payload.categories?.map((item, index) => {
                return {
                    ...item,
                    expanded: prevCategories[index]?.expanded || false
                }
            });
            state.categories = newCategories;
        },
        addCategory: (state) => {
            const newCategoryItem: PlaceCategory = {
                name: 'New category',
                expanded: true,
                menuItems: [
                    {
                        name: 'New item',
                        price: 0,
                        status: 0,
                    }
                ],
                status: 0
            };
            let categories = state.categories;
            categories.push(newCategoryItem);
            state.categories = categories;
        },
        addItemToCategory: (state, action: PayloadAction<number>) => {
            const newItem: MenuItem = {
                name: 'New item',
                price: 0,
                status: 2
            };
            let categories = state.categories;
            categories = categories.map((item, index) => {
                if (action.payload === index) {
                    const menuItems = item?.menuItems || [];
                    menuItems.push(newItem);
                    return {
                        ...item,
                        expanded: true,
                        newItem,
                    }
                }
                return item;
            })
            state.categories = categories;
        },
        changePositionCategory: (state, action: PayloadAction<{ categories: any }>) => {
            state.categories = action.payload.categories;
        },
        changePositionItem: (state, action: PayloadAction<{ categories: any }>) => {
            state.categories = action.payload.categories;
        },
        updateCategoryField: (state, action: PayloadAction<{ 
            index: number, 
            values: Field}>) => {
            let categories = state.categories;
            categories = categories.map((item: any, index) => {
                if(index === action.payload.index) {
                    item[action.payload.values.field] = action.payload.values.value;
                    return item;
                }
                return item;
            })
            state.categories = categories;
        },
        updateItemField: (state, action: PayloadAction<{ categoryIndex: number, index: number, values: Field  }>) => {
            let categories = state.categories;
            categories = categories.map((item, index) => {
                if (action.payload.categoryIndex === index) {
                    let menuItems: MenuItem[] = item.menuItems;
                    menuItems = menuItems?.map((menu: any, indexMenu) => {
                        if(indexMenu == action.payload.index) {
                            menu[action.payload.values.field] = action.payload.values.value;
                        }
                        return menu;
                    })
                    return {
                        ...item,
                        menuItems
                    }
                }
                return item;
            })
            state.categories = categories;
        },
        searchItems: (state, action: PayloadAction<{ 
            newCategories: PlaceCategory[]
        }>) => {
            state.categories = action.payload.newCategories;
        },
        deleteItemState: (state, action: PayloadAction<{ id: string  }>) => {
            let categories = state.categories;
            categories = categories.map((item, index) => {
                return {
                    ...item,
                    menuItems: item?.menuItems?.filter(menu => menu?.id != action.payload.id)
                }
            })
            state.categories = categories;
        },
        deleteCategoryState: (state, action: PayloadAction<{ id: string  }>) => {
            let categories = state.categories;
            categories = categories.filter((item, index) => item?.id != action?.payload?.id);
            state.categories = categories;
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    addCategory,
    addItemToCategory,
    changePositionCategory,
    changePositionItem,
    setPlaces,
    updateCategoryField,
    updateItemField,
    searchItems,
    deleteItemState,
    deleteCategoryState
} = PlaceSlice.actions

export default PlaceSlice.reducer