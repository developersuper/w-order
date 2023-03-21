import React, { Fragment, useEffect, useState } from "react";
import H2 from "components/headings/H2";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import PlaceService from "services/places.service";
import { useAuth } from "contexts/Auth/AuthContext";
import { Tab } from "@headlessui/react";
import Modal from "components/modal";
import {
  DeleteIcon,
  LinkIcon,
  ShareIcon,
  QQCodeIcon,
  TrashIcon,
  CopyIcon,
  Redo,
  LocationIcon,
  IphoneIcon,
  UnionIcon,
} from "assets/icons";
import { GetQRCode } from "components/pages";
import { Tooltip } from "react-tooltip";
import customToast from "components/Toast/ToastSuccess";
import "react-tooltip/dist/react-tooltip.css";
import ItemForm from "components/pages/ItemForm";
import InforAndBrandForm from "components/pages/InforAndBrandForm";
import ConfirmDeletePlace from "components/pages/ConfirmDeletePlace";
import PlaceItems from "components/pages/PlaceItems";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  MenuItem,
  PlaceCategory,
  PlaceState,
  setPlaces,
} from "store/slices/places/placeSlice";
import mobileBg from "assets/images/mobile-demo.png";
import menuDefault from "assets/images/menu.png";
import { Currencies } from "constant/currencies";
import { Menu, Transition } from "@headlessui/react";
import soldOut from "assets/images/sold-out.png";
import { ScrollContainer, FixedElement } from "react-nice-scroll";
import "react-nice-scroll/dist/styles.css";
import BusinessInformationForm from "components/pages/BusinessInformationForm";

const PlacesPage = () => {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const tab = searchParams?.get("tab");
  const navigate = useNavigate();
  const auth = useAuth();
  const useDispatch = useAppDispatch();
  const [placeDetails, setPlaceDetails] = useState<PlaceState>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectItem, setSelectItem] = useState<MenuItem | null>();
  const [deletePlace, setDeletePlace] = useState<boolean>(false);
  const [inforAndBrand, setInforAndBrand] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { categories } = useAppSelector((state) => state.places);
  const [itemPreview, setItemPreview] = useState<PlaceCategory>();
  const [placeName, setPlacceName] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) getPlaceById();
  }, [id, tab]);

  useEffect(() => {
    if (tab == "items") {
      setSelectedIndex(0);
    }
    if (tab == "information") {
      setSelectedIndex(1);
    }
    if (tab == "branding") {
      setSelectedIndex(2);
    }
  }, [tab]);

  const getPlaceById = async () => {
    setLoading(true);
    const response = await PlaceService.getPlacesById(
      auth?.user?.userId,
      id?.toString()
    );
    if (response?.data) {
      let places = response?.data;
      let categories: PlaceCategory[] = response?.data?.categories;
      if (categories?.length > 0) {
        categories = categories.map((item: PlaceCategory, index: number) => {
          return {
            ...item,
          };
        });
        places = {
          ...places,
          categories,
        };
        setItemPreview(categories[0]);
      }
      useDispatch(setPlaces(places));
      setPlaceDetails({ ...response?.data });
      setInforAndBrand({ ...response?.data });
      setPlacceName(response?.data?.name);
      setLoading(false);
    }
  };

  const onConfirmDeletePlace = async (data?: boolean) => {
    if (data) {
      try {
        await PlaceService.deletePlacesById(auth?.user?.userId, id?.toString());
        history.back();
        customToast.success(`${placeDetails?.name} is deleted successfully`);
      } catch { }
    }
    setDeletePlace(false);
  };

  const tabChange = (index: number) => {
    if (index == 0) {
      navigate(`/places/${id}?tab=items`);
    }
    if (index == 1) {
      navigate(`/places/${id}?tab=information`);
    }
    if (index == 2) {
      navigate(`/places/${id}?tab=branding`);
    }
  };
  let placeNameUpdate = '';
  const updatePlaceName = async () => {
    if (placeName != placeDetails?.name && placeName != placeNameUpdate) {
      const response = await PlaceService.updatePlacesById(auth?.user?.userId, id, { name: placeName });
      placeNameUpdate = response?.data?.name;
      customToast.success(`${placeName} is updated successfully`);
      getPlaceById();
    }
  }

  useEffect(() => {
    if (itemPreview?.id) {
      const itemCurrentPreview = categories?.filter(
        (item) => item?.id == itemPreview.id
      )[0];
      setItemPreview(itemCurrentPreview);
    }
  }, [categories]);

  return (
    <>
      <div className="flex flex-col md:flex-row px-4 md:px-0">
        <div className="flex">
          <input
            type="text"
            value={placeName}
            onBlur={(event) => {
              updatePlaceName();
            }}
            onKeyPress={(event: any) => {
              if (event.key === "Enter") {
                updatePlaceName();
              }
            }}
            onChange={(event) => {
              setPlacceName(event?.target?.value);

            }}
            style={{ background: "transparent" }}
            className="bg-transparent font-bold text-neutral-80 text-4xl focus:outline-none focus:bg-neutral-10 rounded-md transition w-full"
          />
          <div className="flex md:hidden ml-auto">
            <Menu as="div" className="relative inline-block text-left">
              <div>
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
                <Menu.Items className="absolute -right-2 mt-2 min-w-[180px] p-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-dropdown focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setDeletePlace(true)}
                          className="text-red-60 !font-normal text-left cursor-pointer text-sm hover:bg-neutral-10 w-full p-2 rounded-md transition"
                        >
                          <span className="text-red-60">Delete</span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="flex items-center md:ml-auto mt-4 md:mt-0">
          <div
            id={id}
            className="flex items-center text-base mr-6 text-primary-light h-4"
            data-tooltip-delay-hide={2000}
          >
            <span className="text-primary-light mr-2.5">
              <LinkIcon />
            </span>{" "}
            {placeDetails?.shortUrl}
          </div>
          <Tooltip anchorId={id} events={["hover"]}>
            <div className="flex text-sm cursor-pointer">
              <span className="mr-1">
                <CopyIcon />
              </span>
              <span
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://${placeDetails?.shortUrl}`
                  );
                  customToast.success("Link copied");
                }}
              >
                Copy link
              </span>
              <span className="mx-2">|</span>
              <a
                href={`https://${placeDetails?.shortUrl}`}
                target="_blank"
                rel="noreferrer"
                className="flex text-white cursor-pointer"
              >
                <span className="mr-1">
                  <ShareIcon />
                </span>{" "}
                Open link
              </a>
            </div>
          </Tooltip>
          <div className="ml-auto md:ml-0">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center text-sm font-semibold md:bg-primary-light text-primary-light md:text-white md:px-4 md:py-2.5 rounded-[12px] hover:bg-teal-70"
              type="button"
            >
              <span className="md:mr-2.5">
                <QQCodeIcon />
              </span>{" "}
              <span className="hidden md:inline-block">Get QR Code</span>
            </button>
          </div>
          <button
            onClick={() => setDeletePlace(true)}
            className="hidden md:flex items-center justify-center text-sm font-medium border border-neutral-60 hover:border-default-error text-neutral-60 hover:text-default-error h-[40px] w-[40px] ml-6  rounded-[12px]"
            type="button"
          >
            <TrashIcon />
          </button>
          <ConfirmDeletePlace
            name={placeDetails?.name}
            isOpen={deletePlace}
            closeModal={onConfirmDeletePlace}
          />
        </div>
      </div>
      <div className="flex md:mb-6">
        <div className="w-full lg:w-3/4 mt-[29px] tabs lg:pr-4">
          <Tab.Group selectedIndex={selectedIndex} onChange={tabChange}>
            <Tab.List>
              <Tab className="font-bold text-base">Items</Tab>
              <Tab className="font-bold  text-base">Business Information</Tab>
              <Tab className="font-bold  text-base">Branding</Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {!selectItem ? (
                  <PlaceItems
                    loading={loading}
                    places={placeDetails}
                    onSelectItem={(value) =>
                      setSelectItem({
                        ...value,
                        currency: placeDetails?.currency,
                      })
                    }
                    actionAdd={() => getPlaceById()}
                  />
                ) : (
                  <ItemForm
                    {...selectItem}
                    onAction={(value: number) =>
                      navigate(`/places/${id}/?tab=information`)
                    }
                    onBack={() => {
                      setSelectItem(null);
                      getPlaceById();
                      navigate(`/places/${id}`);
                    }}
                  />
                )}
              </Tab.Panel>
              <Tab.Panel>
                <BusinessInformationForm
                  {...inforAndBrand}
                  onSaved={() => getPlaceById()}
                />
              </Tab.Panel>
              <Tab.Panel>
                <InforAndBrandForm
                  {...inforAndBrand}
                  onSaved={() => getPlaceById()}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className="hidden lg:flex flex-col flex-none w-[375px]">
          <button
            onClick={() => getPlaceById()}
            type="button"
            className="flex items-center py-3 px-[14px] mx-auto rounded-xl text-teal-50 font-semibold hover:bg-primary-light hover:text-white transition mt-[29px] mb-3"
          >
            <span className="mr-2.5">
              <Redo />
            </span>{" "}
            Refresh preview
          </button>
          <div
            className="relative pb-6 pt-[22px] px-[24px] h-[756px] bg-center rounded-[43px]"
            style={{
              backgroundImage: `url(${mobileBg})`,
              height: "756px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              className="relative w-full h-[714px]  rounded-[43px] -mt-[2px] pr-0 overflow-y-auto hiddenScroll"
              style={{ height: "714px", background: inforAndBrand?.backgroundColor || "#ffffff" }}
            >
              <div
                className="w-full h-full  rounded-b-none -mr-4"
                style={{ background: inforAndBrand?.headerColor || "#30A9A6" }}
              >
                <div
                  className="flex items-center justify-center h-[190px] bg-cover pb-[42px]"
                  style={{
                    backgroundImage: `url("${inforAndBrand?.headerImage}")`,
                  }}
                >
                  {inforAndBrand?.logo && (
                    <img
                      src={inforAndBrand?.logo}
                      alt=""
                      className="w-[88px] h-[88px]"
                    />
                  )}
                </div>
                <div
                  className="p-4 pb-10 w-full h-full rounded-[42px] rounded-b-none -mt-[42px] mb-10"
                  style={{ background: inforAndBrand?.backgroundColor || "#ffffff" }}
                >
                  <h3 className={`text-black text-[22px]`} style={{
                    color: inforAndBrand?.textColor || "#000",
                  }}>
                    {inforAndBrand?.name}
                  </h3>
                  <div className="mt-4">
                    <div className="flex text-sm text-neutral-80">
                      <span
                        className="text-primary-light mr-1.5"
                        style={{
                          color: inforAndBrand?.themeColor || "#30A9A6",
                        }}
                      >
                        <LocationIcon />
                      </span>
                      <span style={{
                        color: inforAndBrand?.textColor || "#000",
                      }}>{inforAndBrand?.address || "Your address here"}</span>
                    </div>
                    <div className="flex text-sm text-neutral-80 mt-0.5">
                      <span
                        className="text-primary-light mr-1.5"
                        style={{
                          color: inforAndBrand?.themeColor || "#30A9A6",
                        }}
                      >
                        <IphoneIcon />
                      </span>
                      <span style={{
                        color: inforAndBrand?.textColor || "#000",
                      }}>{inforAndBrand?.phoneNumber || "123456789"}</span>
                    </div>
                    <p className="text-sm text-neutral-80 mt-4" style={{
                      color: inforAndBrand?.textColor || "#000",
                    }}>
                      <span dangerouslySetInnerHTML={{__html: inforAndBrand?.note?.replaceAll('\n', '<br />').toString() || 'Any note here'}}></span>
                    </p>
                  </div>
                  <div className="mt-6 overflow-x-auto whitespace-nowrap pb-3 mb-1 hiddenScroll2">
                    {categories?.map((item) => {
                      return (
                        <button
                          onClick={() => setItemPreview(item)}
                          type="button"
                          key={item.id}
                          style={{
                            borderColor: inforAndBrand?.themeColor || "#30A9A6",
                            backgroundColor:
                              (itemPreview?.id == item.id &&
                                inforAndBrand?.themeColor) ||
                              "",
                            color:
                              itemPreview?.id == item.id
                                ? "#fff"
                                : inforAndBrand?.themeColor || "#30A9A6",
                          }}
                          className={`font-semibold text-sm text-primary-light border border-primary-light rounded-[60px] px-[14px] py-[8px] mr-2
                                                ${itemPreview?.id == item.id &&
                            "bg-primary-light text-white"
                            }
                                                `}
                        >
                          {item?.name}
                        </button>
                      );
                    })}
                  </div>
                  {itemPreview?.menuItems?.map((menu) => {
                    return (
                      menu.status != 0 && (
                        <div key={menu?.id} className="mt-3">
                          {menu?.image && (
                            <div className="relative rounded overflow-hidden">
                              <div
                                className=" bg-cover bg-center rounded overflow-hidden"
                                style={{
                                  backgroundImage: `url("${menu?.image || menuDefault
                                    }")`,
                                  paddingTop: "70%",
                                }}
                              ></div>
                              {menu?.status == 1 && (
                                <div className="absolute flex items-center justify-center rounded bg-black/50 top-0 left-0 w-full h-full">
                                  <img
                                    src={soldOut}
                                    alt=""
                                    className="w-auto max-w-[119px]"
                                  />
                                </div>
                              )}
                            </div>
                          )}
                          <h2 className="font-bold mt-2 text-[#000] text-sm" style={{
                            color: inforAndBrand?.textColor || "#000",
                          }}>
                            {menu?.name}
                          </h2>
                          <p className="body-small mt-0.5 " style={{
                            color: inforAndBrand?.textColor || "#000",
                          }}>
                            {menu?.description}
                          </p>
                          <p className="font-bold text-sm mt-0.5" style={{
                            color: inforAndBrand?.textColor || "#000",
                          }}>
                            {menu?.price.toFixed(2)}{" "}
                            <sup>
                              {inforAndBrand?.currency
                                ? Currencies.find(
                                  (item: any) =>
                                    item.code == inforAndBrand?.currency
                                )?.symbol
                                : "$"}
                            </sup>
                          </p>
                        </div>
                      )
                    );
                  })}
                  {itemPreview?.menuItems?.length == 0 && (
                    <p className="text-sm text-center mt-4" style={{
                      color: inforAndBrand?.textColor || "#000",
                    }}>No items found.</p>
                  )}
                  <div className="mt-3 opacity-0 h-10"></div>
                </div>
              </div>
            </div>
            {inforAndBrand?.footerNote && <div className="absolute  bottom-4 p-4 left-[24px] text-xs w-[calc(100%-48px)] flex rounded-bl-[43px] rounded-br-[43px] items-center justify-center" style={{
                    color: inforAndBrand?.textColor || "#000",
                    background: inforAndBrand?.backgroundColor || '#fff',
                    boxShadow: "-3px 2px 3px #000"
                  }}>
                  <span className="text-center" dangerouslySetInnerHTML={{__html: inforAndBrand?.footerNote?.replaceAll('\n', '<br />').toString() || ''}}></span>
                  </div>}
          </div>
        </div>
      </div>
      <Modal show={isOpen} onClose={() => { }} className={"max-w-[500px]"}>
        <button
          className="right-8 top-6 absolute text-neutral-60 hover:text-neutral-80"
          onClick={() => setIsOpen(false)}
        >
          <DeleteIcon />
        </button>
        <div className="text-center pt-6">
          <GetQRCode name={placeDetails?.name} qrCode={placeDetails?.qrCode} />
        </div>
      </Modal>
    </>
  );
};

export default PlacesPage;
