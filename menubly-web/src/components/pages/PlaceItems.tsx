import React, { Fragment, ReactNode, useEffect, useState } from "react";
import {
    AddIcon, ArrowDown, ArrowUp,
    ChevronDown, DeleteIcon, PencilIcon, SearchIcon, TrashIcon, UnionIcon
} from "assets/icons";
import { ButtonPrimary } from "components/form/Buttton";
import PlacesStatus from "./PlacesStatus";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
    addItemToCategory,
    changePositionCategory,
    changePositionItem, deleteCategoryState, deleteItemState, Field,
    MenuItem,
    PlaceCategory,
    PlaceState,
    searchItems,
    updateCategoryField,
    updateItemField
} from "store/slices/places/placeSlice";
import { useAuth } from "contexts/Auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import PlaceService from "services/places.service";
import { Spinner } from "components/spinner/Spinner";
import customToast from "components/Toast/ToastSuccess";
import { array_move, convert_vi_to_en, IsMobileScreen, openChat } from "utils";
import H3 from "components/headings/H3";
import Modal from "components/modal";
import { Menu, Transition } from '@headlessui/react';
import ConfirmDeletePlace from "./ConfirmDeletePlace";
import ConfirmDeleteCategory from "./ConfirmDeleteCategory";
import ConfirmDeleteItem from "./ConfirmDeleteItem";
import { EditCategoryPopup } from "./EditCategoryPopup";

const PlaceItems = ({ places, onSelectItem, actionAdd, loading }: {
    places?: PlaceState,
    onSelectItem: (value: MenuItem) => void,
    actionAdd: () => void,
    loading?: boolean,
}) => {
    const navigate = useNavigate();
    const auth = useAuth();
    const { id, itemId } = useParams();
    const { categories } = useAppSelector(state => state.places);
    const dispath = useAppDispatch();
    const [openCreatePlace, setOpenCreatePlace] = useState(false);
    const [categoriesOriginal, setCategoriesOriginal] = useState<PlaceCategory[]>([]);
    const [hasSaved, setHasSaved] = useState(false);
    const [categorySelected, setCategorySelected] = useState<any>(null);
    const [itemSelected, setItemSelected] = useState<any>(null);
    const [categorySelecedEdit, setCategorySelectEdit] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onAddCategory = async () => {
        setIsSubmitting(true);
        await PlaceService.createCategory(auth?.user?.userId, id, { name: 'New category', status: 2 });
        customToast.success(`New category is created successfully`);
        setIsSubmitting(false);
        actionAdd();
    }

    useEffect(() => {
        if (categoriesOriginal?.length == 0) {
            setCategoriesOriginal(categories);
        }
    }, [categories]);

    useEffect(() => {
        const getMenuItem = async () => {
            let response = await PlaceService.getMenuItemById(auth?.user?.userId, itemId);
            if (response?.data) {
                onSelectItem(response?.data);
            }
        }
        if (itemId) {
            getMenuItem();
        }
    }, [itemId])

    const onAddItemToCategory = async (item: PlaceCategory, index: number) => {
        try {
            await PlaceService.createMenuItem(auth.user?.userId, {
                placeId: id,
                categoryId: item.id,
                name: "New Item",
                price: 0,
                description: "",
                image: "",
                status: 2
            });
            dispath(addItemToCategory(index));
            customToast.success(`New Item is created successfully`);
            actionAdd();
        } catch {
            setOpenCreatePlace(true);
        }

    }

    const onChangePositionCategory = async (index: number, type: string) => {
        let categoriesUpdate = [...categories];
        if (type == 'back') {
            categoriesUpdate = array_move(categoriesUpdate, index, index - 1);
        } else {
            categoriesUpdate = array_move(categoriesUpdate, index, index + 1)
        }
        await dispath(changePositionCategory({ categories: categoriesUpdate }));
        if (categoriesUpdate?.length > 0) {
            const categoryIds: string[] = [];
            categoriesUpdate?.forEach(item => {
                if (item?.id)
                    categoryIds.push(item.id);
            });
            PlaceService.updatePlacesById(auth?.user?.userId, id, { categoryIds: categoryIds });
        }
    }

    const onchangePositionItem = async (categoryIndex: number, indexItem: number, type: string) => {
        let categoriesUpdate = [...categories];
        categoriesUpdate = categoriesUpdate.map((item, index) => {
            if (categoryIndex === index) {
                let menuItems = [...item?.menuItems] || [];
                if (type == 'back') {
                    menuItems = array_move(menuItems, indexItem, indexItem - 1);
                } else {
                    menuItems = array_move(menuItems, indexItem, indexItem + 1)
                }
                return {
                    ...item,
                    menuItems
                }
            }
            return item;
        })

        await dispath(changePositionItem({ categories: categoriesUpdate }));
        if (categoriesUpdate?.length > 0) {
            const menuItemIds: string[] = [];
            categoriesUpdate?.forEach(item => {
                if (item?.id) {
                    item.menuItems.forEach(menu => {
                        if (menu?.id)
                            menuItemIds.push(menu.id.toString());
                    })
                }

            });
            PlaceService.updateCategory(auth?.user?.userId, id, categories[categoryIndex]?.id, { menuItemIds });
        }
    }

    const toggleExpandCategory = async (index: number, values: Field) => {
        await dispath(updateCategoryField({ index, values }));
    }

    const onUpdateItemField = async (item: MenuItem, categoryIndex: number, index: number, values: Field) => {

        try {
            let payload: MenuItem = {
                id: item.id,
                name: item?.name,
                status: item?.status,
                price: item.price
            };
            if (values.field == 'status') {
                payload = {
                    ...payload,
                    name: item?.name,
                    status: Number(values.value)
                };
                dispath(updateItemField({ categoryIndex, index, values }));
                await PlaceService.updateMenuItem(auth?.user?.userId, payload);
                customToast.success(`${item?.name} is updated successfully`);
            }
            if (values.field == 'name') {
                payload = {
                    ...payload,
                    name: values.value.toString()
                }
                const itemOriginal = categoriesOriginal[categoryIndex].menuItems[index];
                if(itemOriginal?.name == values.value) {
                    return;
                }
                await PlaceService.updateMenuItem(auth?.user?.userId, payload);
                customToast.success(`${item?.name} is updated successfully`);
                setCategoriesOriginal(categories);
            }

        } catch { }

    }

    const onUpdateItemFieldState = async (categoryIndex: number, index: number, values: Field) => {
        dispath(updateItemField({ categoryIndex, index, values }));
    }

    const onUpdateCategoryField = async (item: PlaceCategory, index: number, values: Field) => {
        let payload = {};
        if (values.field == 'status') {
            payload = {
                name: item?.name,
                status: values.value
            };
        }
        if (values.field == 'name') {
            if(categoriesOriginal?.filter(place => place?.id == item.id)[0]?.name == values.value) {
                return;
            }
            payload = {
                name: values.value
            }
        }
        dispath(updateCategoryField({ index, values }));
        await PlaceService.updateCategory(auth?.user?.userId, id, item?.id, payload);
        customToast.success(`${item?.name} is updated successfully`);
        setCategoriesOriginal(categories);
    }

    const onUpdateCategoryFieldState = (index: number, values: Field) => {
        dispath(updateCategoryField({ index, values }));
    }
    const onSearching = (event: any) => {
        let keyword = event?.target.value;
        let newCategories: PlaceCategory[] = [];
        categoriesOriginal?.map((item: PlaceCategory, index) => {
            let menuItemSearch = item.menuItems?.filter(menu => convert_vi_to_en(menu?.name)?.indexOf(keyword) != -1 ||
                (menu?.name?.toLowerCase())?.indexOf(keyword?.toLowerCase()) != -1);
            if (menuItemSearch?.length > 0) {
                newCategories.push({ ...item, menuItems: menuItemSearch, expanded: true });
            }
        })
        if (keyword == '') {
            newCategories = categoriesOriginal;
        }
        dispath(searchItems({ newCategories }));
    }
    useEffect(() => {
    }, [categories]);

    const chatWithMe = () => {
        openChat();
    };
    const deleteCategory = (item: any, index: number) => {
        setCategorySelected(item);
    }
    const onDeleteCategory = async (value: any) => {
        if (value) {
            try {
                await PlaceService.deleteCategory(auth?.user?.userId, id, categorySelected?.id);
                dispath(deleteCategoryState({ id: categorySelected?.id }));
                setCategorySelected(null);
                return customToast.success(`${categorySelected?.name} is updated successfully`);
            } catch (error) {
                customToast.error(`${categorySelected?.name} is deleted failure`);
            }
        }
        setCategorySelected(null);
    }

    const deleteItem = (item: any) => {
        setItemSelected(item);
    }

    const onDeleteItem = async (value: any) => {
        if (value) {
            try {
                await PlaceService.deleteMenuItem(auth?.user?.userId, itemSelected);
                dispath(deleteItemState({ id: itemSelected?.id }));
                setItemSelected(null);
                return customToast.success(`${itemSelected?.name} is deleted successfully`);
            } catch {
                return customToast.error(`${itemSelected?.name} is deleted failure`);
            }

        }
        setItemSelected(null);
    }

    return (
        <>
            <div className="">
                <div className="flex px-4 md:px-0">
                    <div className="flex shadow-InputBorder rounded-md items-center px-3 mr-2">
                        <span className="flex-none"><SearchIcon /></span>
                        <input onChange={onSearching} type="text" className="px-2 border-0 focus:outline-none" placeholder="Search" />
                    </div>
                    <div className="flex-none ml-auto">
                        <ButtonPrimary size="small" onClick={onAddCategory}>
                            {isSubmitting && <><Spinner /> Creating...</>}
                            {!isSubmitting && <span className="flex items-center">
                                <span className="mr-2.5"><AddIcon /></span>
                                Add Category
                            </span>}
                        </ButtonPrimary>
                    </div>
                </div>
                <div className="">
                    <div className="flex bg-neutral-10 rounded-md px-4 py-[18px] text-neutral-80 text-base mt-4">
                        <div className="w-full md:w-1/2 font-medium">Name <span className="inline-block md:hidden">- Price</span></div>
                        <div className="w-1/4 hidden md:flex font-medium">Price (USD)</div>
                        <div className="flex flex-none w-1/4 font-medium">
                            Status
                        </div>
                        <div className="flex flex-none w-[30px] md:w-[110px] ml-2.5 md:ml-0">
                        </div>
                    </div>
                    {
                        loading && <div className="flext p-4 mt-2 justify-center">
                            <Spinner color="loader-primary" />
                        </div>
                    }
                    {categories?.length <= 0 && !loading && <p className="body-default text-center my-10">No Category found.</p>}
                    {categories?.map((item, indexPlace) => {
                        return <>
                            <div key={`category-${indexPlace}`} className="items-content">
                                <div className="flex items-center pl-0 pr-2 md:px-4 py-[8px] text-neutral-80 text-base border-b border-[#D9DDEA]" onClick={() => {
                                        if(IsMobileScreen()) {
                                            setCategorySelectEdit({...item, indexPlace});
                                        }
                                    }}>
                                    <div className="w-full md:w-1/2 flex items-center">
                                        <button type="button"
                                            onClick={(event: any) => {
                                                toggleExpandCategory(indexPlace, { field: 'expanded', value: !item?.expanded });
                                                event.stopPropagation();
                                            }}
                                            className={`flex items-center justify-center text-neutral-100 hover:bg-teal-10 transition h-8 w-8 md:h-10 md:w-10 rounded-xl
                                                ${!item?.expanded && '-rotate-90'}
                                                ${item?.menuItems?.length <= 0 && 'opacity-0'}
                                            `}>
                                            <ChevronDown />
                                        </button>
                                        <span className="font-bold min-w-[70px] ml-1 md:ml-2.5 mr-2.5">
                                            <input type="text"
                                                value={item?.name}
                                                disabled={IsMobileScreen()}
                                                onBlur={(event) => {
                                                    if (hasSaved || IsMobileScreen()) {
                                                        return
                                                    }
                                                    onUpdateCategoryField(item, indexPlace, { field: 'name', value: event.target.value })
                                                }
                                                }
                                                onKeyPress={(event: any) => {
                                                    if (IsMobileScreen()) {
                                                        return
                                                    }
                                                    if (event.key === 'Enter') {
                                                        setHasSaved(true);
                                                        onUpdateCategoryField(item, indexPlace, { field: 'name', value: event.target.value })
                                                    }
                                                }}
                                                onChange={(event) => {
                                                    if (IsMobileScreen()) {
                                                        return
                                                    }
                                                    setHasSaved(false);
                                                    onUpdateCategoryFieldState(indexPlace, { field: 'name', value: event.target.value });
                                                }
                                                }
                                                className="focus:outline-none focus:bg-neutral-10 rounded-md p-1 disabled:bg-white transition" />
                                        </span>
                                        <span className="rounded-full bg-neutral-10 font-sm px-3 py-0.5 inline-block">{item?.menuItems?.length}</span>
                                        <button onClick={() => onAddItemToCategory(item, indexPlace)}
                                            className="hidden md:flex justify-center items-center rounded-xl text-primary-light w-10 h-10 ml-2.5 hover:bg-teal-10 transition">
                                            <AddIcon />
                                        </button>
                                    </div>
                                    <div className="w-1/4 hidden md:flex"></div>
                                    <div className="flex flex-none w-1/4 h-full" >
                                        {false && <PlacesStatus
                                            value={Number(item.status)}
                                            onChange={(value: number) => onUpdateCategoryField(item, indexPlace, { field: 'status', value: value })} />}
                                    </div>
                                    <div className="flex flex-none w-[30px] md:w-[110px] ml-2.5 md:ml-0">
                                        <button type="button"
                                            onClick={() => onChangePositionCategory(indexPlace, 'back')}
                                            className={`hidden md:flex md:flex-none items-center justify-center text-neutral-100 hover:bg-teal-10 transition h-10 w-10 rounded-xl
                                                ${indexPlace == 0 && 'opacity-0 cursor-default pointer-events-none'}
                                            `}>
                                            <ArrowUp />
                                        </button>
                                        <button type="button"
                                            onClick={() => onChangePositionCategory(indexPlace, 'next')}
                                            className={`hidden md:flex md:flex-none  items-center justify-center text-neutral-100 hover:bg-teal-10 transition h-10 w-10 rounded-xl
                                                ${indexPlace == categories?.length - 1 && 'opacity-0 cursor-default pointer-events-none'}
                                            `}>
                                            <ArrowDown />
                                        </button>
                                        <Menu as="div" className="hidden relative md:inline-block text-center w-[30px]">
                                            <div className="h-[40px] w-[40px] hover:bg-teal-10 justify-center rounded-[12px] flex items-center">
                                                <Menu.Button className="text-neutral-60 p-2">
                                                    <UnionIcon />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-2 z-20 mt-2 min-w-[180px] p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-dropdown focus:outline-none">
                                                    <div className="px-1 py-1 ">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button type="button"
                                                                    onClick={() => deleteCategory(item, indexPlace)}
                                                                    className={`flex pl-1 items-center text-sm text-neutral-80 hover:bg-teal-10 transition h-10 w-full rounded-xl`}>
                                                                    <span className="ml-2">

                                                                        Delete</span>
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>

                                        <Menu as="div" className="relative inline-block md:hidden text-center w-[30px]">
                                            <div className="-mr-3">
                                                <Menu.Button className="text-neutral-60 p-2" onClick={(event: any) => {
                                                    event.stopPropagation();
                                                }}>
                                                    <UnionIcon />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-2 z-20 mt-2 min-w-[180px]  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-dropdown focus:outline-none">
                                                    <div className="p-0">
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button type="button"
                                                                    onClick={() => onAddItemToCategory(item, indexPlace)}
                                                                    className={`flex px-2 items-center text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-md`}>
                                                                    <span className="w-5"><AddIcon /></span>
                                                                    <span className="ml-1">
                                                                        Add Item</span>
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button type="button"
                                                                    onClick={() => { }}
                                                                    className={`flex px-2 items-center text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-md`}>
                                                                    <span className="w-5"><PencilIcon /></span>
                                                                    <span className="ml-1">
                                                                        Edit</span>
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        {indexPlace != 0 && <Menu.Item>
                                                            {({ active }) => (
                                                                <button type="button"
                                                                    onClick={() => onChangePositionCategory(indexPlace, 'back')}
                                                                    className={`flex px-2 items-center text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-md
                                                                    ${indexPlace == 0 && 'opacity-0 cursor-default pointer-events-none'}
                                                                `}>
                                                                    <span className="w-5 flex justify-center"><ArrowUp /></span> <span className="ml-1">Move Up</span>
                                                                </button>
                                                            )}
                                                        </Menu.Item>}
                                                        {indexPlace != categories?.length - 1 && <Menu.Item>
                                                            {({ active }) => (
                                                                <button type="button"
                                                                    onClick={() => onChangePositionCategory(indexPlace, 'next')}
                                                                    className={`flex px-2 items-center text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-md
                                                                    ${indexPlace == categories?.length - 1 && 'opacity-0 cursor-default pointer-events-none'}
                                                                `}>
                                                                    <span className="w-5 flex justify-center"><ArrowDown /></span> <span className="ml-1">Move Down</span>
                                                                </button>
                                                            )}
                                                        </Menu.Item>}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button type="button"
                                                                    onClick={() => deleteCategory(item, indexPlace)}
                                                                    className={`flex px-2 items-center text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-md`}>
                                                                    <span className="w-5"><TrashIcon /></span>
                                                                    <span className="ml-1">
                                                                        Delete</span>
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                {item.expanded && <div className="items-list">
                                    {item.menuItems.map((menu, index) => {
                                        return (
                                            <div key={index}
                                                onClick={() => {
                                                    onSelectItem({ ...menu, categoryId: item?.id });
                                                    navigate(`/places/${id}/item/${menu?.id}`);
                                                }}
                                                className="flex items-center hover:bg-teal-30 cursor-pointer transition px-4 py-[8px] text-neutral-80 text-base border-b border-[#D9DDEA]">
                                                <div className="w-full md:w-1/2 pl-5 md:pl-[48px]">
                                                    <input type="text"
                                                        onClick={(event) => {
                                                            if(!IsMobileScreen()) {
                                                                event.preventDefault();
                                                                event.stopPropagation();
                                                            }
                                                        }}
                                                        value={menu?.name}
                                                        onBlur={(event) => {
                                                            if (hasSaved || IsMobileScreen()) {
                                                                return;
                                                            }
                                                            onUpdateItemField(menu, indexPlace, index, { field: 'name', value: event.target.value })
                                                        }}
                                                        onKeyPress={(event: any) => {
                                                            if(IsMobileScreen()) {
                                                                return;
                                                            }
                                                            if (event.key === 'Enter') {
                                                                setHasSaved(true);
                                                                onUpdateItemField(menu, indexPlace, index, { field: 'name', value: event.target.value });
                                                            }
                                                        }}
                                                        onChange={(event) => {
                                                            setHasSaved(false);
                                                            onUpdateItemFieldState(indexPlace, index, { field: 'name', value: event.target.value })
                                                        }
                                                        }
                                                        style={{background: 'transparent'}}
                                                        className="bg-transparent  focus:outline-none focus:bg-neutral-10 rounded-md p-1 transition" />
                                                    <span className="block md:hidden text-neutral-90 text-sm mt-1 pl-1">{Number(menu?.price)?.toFixed(2)}</span>
                                                </div>
                                                <div className="w-1/4 hidden md:flex">{Number(menu?.price)?.toFixed(2)}</div>
                                                <div className="flex flex-none w-1/4">
                                                    <div className="inline-block" onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                    }}>
                                                        <PlacesStatus value={Number(menu?.status)}
                                                            onChange={(value: number) => {
                                                                onUpdateItemField(menu, indexPlace, index, { field: 'status', value });
                                                            }} />
                                                    </div>
                                                </div>
                                                <div className="flex flex-none w-[30px] md:w-[110px] ml-3.5 -mr-2 md:m-0" onClick={(event) => {
                                                    event.preventDefault();
                                                    event.stopPropagation();
                                                }}>
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            onchangePositionItem(indexPlace, index, 'back');
                                                        }}
                                                        className={`hidden md:flex flex-none items-center justify-center text-neutral-100 hover:bg-teal-10 transition h-10 w-10 rounded-xl
                                                        ${index == 0 && 'opacity-0 cursor-default pointer-events-none'}
                                                    `}>
                                                        <ArrowUp />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            onchangePositionItem(indexPlace, index, 'next');
                                                        }}
                                                        className={`hidden md:flex flex-none items-center justify-center text-neutral-100 hover:bg-teal-10 transition h-10 w-10 rounded-xl
                                                        ${index == item?.menuItems?.length - 1 && 'opacity-0 cursor-default pointer-events-none'}
                                                    `}>
                                                        <ArrowDown />
                                                    </button>
                                                    <Menu as="div" className="hidden relative md:inline-block text-center w-[30px]">
                                                        <div className="h-[40px] w-[40px] hover:bg-teal-10 justify-center rounded-[12px] flex items-center">
                                                            <Menu.Button className="text-neutral-60 p-2">
                                                                <UnionIcon />
                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="absolute right-2 z-20 mt-2 min-w-[180px] p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-dropdown focus:outline-none">
                                                                <div className="px-1 py-1 ">
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button type="button"
                                                                                onClick={() => deleteItem(menu)}
                                                                                className={`flex pl-1 items-center text-sm text-neutral-80 hover:bg-teal-10 transition h-10 w-full rounded-xl`}>
                                                                                <span className="ml-2">Delete</span>
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                    <Menu as="div" className="relative inline-block md:hidden text-center w-[30px] ">
                                                        <div className="-mr-3">
                                                            <Menu.Button className="text-neutral-60 p-2">
                                                                <UnionIcon />
                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="absolute right-2 z-20 mt-2 min-w-[180px] p-0 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-dropdown focus:outline-none">
                                                                <div className="p-0">
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button type="button"
                                                                                onClick={() => {
                                                                                    onSelectItem({ ...menu, categoryId: item?.id });
                                                                                    navigate(`/places/${id}/item/${menu?.id}`);
                                                                                }}
                                                                                className={`flex px-2 items-center text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-xl`}>
                                                                                <span className="w-5 flex justify-center">
                                                                                    <PencilIcon />
                                                                                </span>
                                                                                <span className="ml-1">
                                                                                    Edit
                                                                                </span>
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                    {index != 0 && <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                type="button"
                                                                                onClick={(event) => {
                                                                                    onchangePositionItem(indexPlace, index, 'back');
                                                                                }}
                                                                                className={`flex px-2  items-center text-sm text-neutral-80 w-full hover:bg-neutral-10 transition h-10 md:w-10 rounded-xl
                                                                            ${index == 0 && 'opacity-0 cursor-default pointer-events-none'}
                                                                        `}>
                                                                                <span className="flex text-sm justify-center w-5"><ArrowUp /></span> <span className="ml-1">Move Up</span>
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>}
                                                                    {index != item?.menuItems?.length - 1 && <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                type="button"
                                                                                onClick={(event) => {
                                                                                    onchangePositionItem(indexPlace, index, 'next');
                                                                                }}
                                                                                className={`flex px-2 items-center  text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-xl
                                                                            ${index == item?.menuItems?.length - 1 && 'opacity-0 cursor-default pointer-events-none'}
                                                                        `}>
                                                                                <span className="w-5 flex text-sm justify-center"><ArrowDown /></span> <span className="ml-1">Move Down</span>
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>}
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button type="button"
                                                                                onClick={() => deleteItem(menu)}
                                                                                className={`flex px-2 items-center text-sm text-neutral-80 hover:bg-neutral-10 transition h-10 w-full rounded-xl`}>
                                                                                <span className="w-5 flex justify-center">
                                                                                    <TrashIcon />
                                                                                </span>
                                                                                <span className="ml-1">

                                                                                    Delete
                                                                                </span>
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>}
                            </div>
                        </>
                    })}

                </div>
            </div>
            <Modal
                show={openCreatePlace}
                onClose={() => { }}
                className={'max-w-[500px]'}
            >

                <>
                    <div className="flex justify-end">
                        <button type="button"
                            onClick={() => {
                                setOpenCreatePlace(false);
                            }}
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary-light transition">
                            <DeleteIcon />
                        </button>
                    </div>
                    <H3 className="text-center">Contact us for additional item</H3>
                    <p className="body-default mt-2 mb-8 text-center">We’re glad you’re wanting more items!<br />
                        Contact us via email at <a href="" onClick={chatWithMe}>support@menubly.com</a> or simply send us a message!</p>
                    <ButtonPrimary onClick={() => { window.open('https://jivo.chat/9vTvT12IiJ', "_blank") }} type="smnall" styles="text-center mx-auto block">
                        Chat with us
                    </ButtonPrimary>
                </>
            </Modal>
            <ConfirmDeleteCategory isOpen={!!categorySelected?.name} name={categorySelected?.name} closeModal={onDeleteCategory} />
            <ConfirmDeleteItem isOpen={!!itemSelected?.name} name={itemSelected?.name} closeModal={onDeleteItem} />
            <EditCategoryPopup isOpen={!!categorySelecedEdit} {...categorySelecedEdit} closeModal={(values: any) => {
                onUpdateCategoryField(categorySelecedEdit, values.indexPlace, { field: 'name', value: values.value })
                setCategorySelectEdit(null);
            }} />                
        </>
    )
}

export default PlaceItems;