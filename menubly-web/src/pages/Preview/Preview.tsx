import React, { useEffect, useState } from "react";
import 'react-tooltip/dist/react-tooltip.css';
import { IphoneIcon, LocationIcon, Vector } from "assets/icons";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Currencies } from "constant/currencies";
import PlaceService from "services/places.service";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import soldOut from 'assets/images/sold-out.png';
import { ImageContent } from "components/Image/Image";

const PreviewPage = () => {
    const navigate = useNavigate();
    const { name, id } = useParams();
    const [searchParams] = useSearchParams();
    const [itemPreview, setItemPreview] = useState<any>();
    const [inforAndBrand, setInforAndBrand] = useState<any>();
    const [colorThemes, setColorThemes] = useState('#30A9A6');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPlacce = async () => {
            try {
                const response = await PlaceService.getPlacesPublic(name);
                if (response?.data) {
                    setInforAndBrand(response.data);
                    setItemPreview(response.data?.categories[0]);
                }
                setLoading(false);
            } catch {
                setLoading(false);
            }
        }
        if (name) {
            getPlacce();
        }

    }, [name]);

    useEffect(() => {
        if (id && inforAndBrand?.categories) {
            setItemPreview(inforAndBrand?.categories.filter((item: any) => item.id === id)[0]);
        }
    }, [inforAndBrand, id])

    useEffect(() => {
        if (inforAndBrand?.themeColor) {
            setColorThemes(inforAndBrand?.themeColor);
        }
    }, [inforAndBrand]);

    const [scrollTop, setScrollTop] = useState(0);
    const [positionCategories, setPositionCategories] = useState<any>();

    useEffect(() => {
        const handleScroll = (event: any) => {
            setScrollTop(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        setPositionCategories(document?.getElementById('categoriesList')?.offsetTop || 0);
        document.body.classList.add('previewPage');

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.classList.remove('previewPage');
        };
    }, []);

    const handleScroll = (event: any) => {
        setScrollTop(event.currentTarget.scrollTop);
    };


    return (<>
        <div className="preview h-[calc(100vh)] overflow-y-auto hiddenScroll" onScroll={handleScroll}
        style={{ background: inforAndBrand?.backgroundColor || "#ffffff"}}>
            <div className="w-full h-full pb-10"
                style={{ background: inforAndBrand?.headerColor || '#30A9A6' }}>
                <div className="flex items-center justify-center h-[180px] bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${inforAndBrand?.headerImage}")`
                    }}>
                    {inforAndBrand?.logo && <img src={inforAndBrand?.logo} alt="" className="w-[88px] h-[88px]" />}
                </div>
                <div className="py-4 md:py-6 lg:py-6 px-4 -mt-10 lg:px-[45px] w-full h-full rounded-[40px] rounded-b-none "
                    style={{ background: inforAndBrand?.backgroundColor || "#ffffff"}}>
                    <div>
                        <h3 className="text-black text-[22px] lg:text-[34px]" style={{
                            color: inforAndBrand?.textColor || "#000",
                        }}>
                            {loading ?
                                <div className="animate-pulse h-6 w-1/2 lg:w-1/3 bg-neutral-30 rounded-full"></div> : inforAndBrand?.name
                            }
                        </h3>
                        <div className="flex flex-wrap mt-4 text-sm md:text-lg">
                            <div className="flex  text-neutral-80 mr-4 lg:mr-10">
                                {loading ? <div className="animate-pulse h-[20px] w-[100px] bg-neutral-30 rounded-full"></div> :
                                    <>
                                        <span className="mr-1.5 md:mt-1" style={{ color: colorThemes }}><LocationIcon /></span>
                                        <span style={{
                                            color: inforAndBrand?.textColor || "#000",
                                        }}>{inforAndBrand?.address || 'Your address here'}</span>
                                    </>}
                            </div>
                            <div className="flex text-neutral-80  mr-4 lg:mr-10">
                                {loading ? <div className="animate-pulse h-[20px] w-[100px] bg-neutral-30 rounded-full"></div> :
                                    <>
                                        <span className=" mr-1.5 md:mt-1" style={{ color: colorThemes }}><IphoneIcon width={20} /></span>
                                        <span style={{
                                            color: inforAndBrand?.textColor || "#000",
                                        }}>{inforAndBrand?.phoneNumber || '123456789'}</span>
                                    </>}
                            </div>
                            <div className="hidden lg:flex text-neutral-80  mt-4 lg:mt-0">
                                {loading ? <div className="animate-pulse h-[20px] w-[100px] bg-neutral-30 rounded-full"></div> : <>
                                    <span className="mr-[8.5px] mt-[5px]" style={{ color: colorThemes }}><Vector /></span>
                                    <span style={{
                                        color: inforAndBrand?.textColor || "#000",
                                    }}>
                                    <span dangerouslySetInnerHTML={{__html: inforAndBrand?.note?.replaceAll('\n', '<br />').toString() || 'Any note here'}}></span>
                                    </span>
                                </>
                                }
                            </div>
                        </div>
                        <div className="block text-sm md:text-lg lg:hidden text-neutral-80 items-center mt-4">
                            {loading ? <div className="animate-pulse h-[20px] w-[100px] bg-neutral-30 rounded-full"></div> :
                                <>
                                    <span dangerouslySetInnerHTML={{__html: inforAndBrand?.note?.replaceAll('\n', '<br />').toString() || 'Any note here'}}></span>
                                </>
                            }
                        </div>
                    </div>
                    <div id='categoriesList' className="mt-6 lg:mt-10 overflow-x-auto whitespace-nowrap pb-4 mb-4 hiddenScroll2">
                        {loading ? <div className="flex space-x-2">
                            {[1, 2, 3].map((index) => {
                                return <>
                                    <div key={'item_loading_' + index} className="animate-pulse h-[38px] w-[135px] bg-neutral-30 rounded-full"></div>
                                </>
                            })}
                        </div> :
                            inforAndBrand?.categories?.map((item: any) => {
                                return (
                                    <button
                                        onClick={() => navigate(`/p/${name}/${item?.id}`)}
                                        type="button"
                                        key={item.id}
                                        style={{
                                            backgroundColor: itemPreview?.id == item.id ? colorThemes : '', borderColor: colorThemes,
                                            color: itemPreview?.id == item.id ? '#fff' : colorThemes ? colorThemes : '#30A9A6'
                                        }}
                                        className={`font-semibold text-sm text-primary-light border rounded-[60px] px-[14px] py-[8px] mr-2
                                                ${itemPreview?.id == item.id && 'text-white'}
                                                `}>
                                        {item?.name}
                                    </button>
                                )
                            })}
                    </div>
                    <div id="headerFix" className="fixed top-0 left-0 w-full px-4 lg:px-[45px] transition"
                        style={{ opacity: `${scrollTop > positionCategories + 60 ? 1 : 0}`, 
                        background: inforAndBrand?.backgroundColor || "#ffffff",
                        zIndex: `${scrollTop > positionCategories + 60 ? 20 : -1}` }}
                    >
                        <h3 className="hidden md:block text-black text-[34px]" style={{
                            color: inforAndBrand?.textColor || "#000",
                        }}>{inforAndBrand?.name}</h3>
                        <div className="hidden md:flex text-sm md:text-lg flex-wrap">
                            <div className="flex text-neutral-80 items-center mr-4 lg:mr-10 mt-4">
                                <span className="mr-1.5" style={{ color: colorThemes }}><LocationIcon /></span>
                                <span style={{
                                    color: inforAndBrand?.textColor || "#000",
                                }}>{inforAndBrand?.address || 'Your address here'}</span>
                            </div>
                            <div className="flex text-neutral-80 items-center mr-4 lg:mr-10 mt-4">
                                <span className=" mr-1.5" style={{ color: colorThemes }}><IphoneIcon width={20} /></span>
                                <span style={{
                                    color: inforAndBrand?.textColor || "#000",
                                }}>{inforAndBrand?.phoneNumber || '123456789'}</span>
                            </div>
                            <div className="hidden lg:flex text-neutral-80 items-center mt-4">
                                <span className="mr-[8.5px]" style={{ color: colorThemes }}><Vector /></span>
                                <span style={{
                                    color: inforAndBrand?.textColor || "#000",
                                }}>{inforAndBrand?.note || 'Any note here'}</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-10 overflow-x-auto whitespace-nowrap pb-2 mb-2 hiddenScroll2">
                            {inforAndBrand?.categories?.map((item: any) => {
                                return (
                                    <button
                                        onClick={() => navigate(`/p/${name}/${item?.id}`)}
                                        type="button"
                                        key={item.id}
                                        style={{
                                            backgroundColor: itemPreview?.id == item.id ? colorThemes : '', borderColor: colorThemes,
                                            color: itemPreview?.id == item.id ? '#fff' : colorThemes ? colorThemes : '#30A9A6'
                                        }}
                                        className={`font-semibold text-sm text-primary-light border rounded-[60px] px-[14px] py-[8px] mr-2
                                                ${itemPreview?.id == item.id && 'text-white'}
                                                `}>
                                        {item?.name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4 lg:-mx-[22px] pb-10">
                        {loading ? [1, 2, 3, 4].map(index => <div key={'skeleton_list_' + index} className="w-full md:w-1/2 lg:w-1/4  px-4 lg:px-[22px] mb-8">
                            <div className="">
                                <div className="animate-pulse h-[28px] w-full bg-neutral-30 rounded-[8px]" style={{ paddingTop: '60%' }}></div>
                            </div>
                            <div className="animate-pulse h-[16px] w-[80px] bg-neutral-30 rounded-[8px] mt-2"></div>
                            <div className="animate-pulse h-[16px] w-[50px] bg-neutral-30 rounded-[8px] mt-2"></div>
                        </div>) :
                            itemPreview?.menuItems?.map((menu: any) => {
                                return menu?.status != 0 && (
                                    <div key={menu?.id} className="mb-6 w-full md:w-1/2 lg:w-1/4 px-4 lg:px-[22px]">
                                        {menu?.image && <div className="relative rounded overflow-hidden mb-2">
                                            <LazyLoadComponent delayTime={500}>
                                                <ImageContent src={menu?.image} />
                                            </LazyLoadComponent>
                                            {/* <img src={menu?.image || menuDefault} alt="" className="w-full" /> */}
                                            {menu?.status == 1 && <div className="absolute flex items-center justify-center rounded bg-black/50 top-0 left-0 w-full h-full">
                                                <img src={soldOut} alt="" className="w-auto max-w-[119px]" />
                                            </div>}
                                        </div>}
                                        <h2 className="font-bold  text-[#000] text-base lg:text-sm" style={{
                                            color: inforAndBrand?.textColor || "#000",
                                        }}>
                                            {menu?.name}
                                        </h2>
                                        <p className="body-small mt-0.5" style={{
                                            color: inforAndBrand?.textColor || "#000",
                                        }}>
                                            {menu?.description}
                                        </p>
                                        <p className="font-bold text-sm mt-0.5" style={{
                                            color: inforAndBrand?.textColor || "#000",
                                        }}>{
                                                menu?.price.toFixed(2)
                                            } <sup>{inforAndBrand?.currency ? Currencies.find((item: any) => item.code == (inforAndBrand?.currency || 'USD'))?.symbol : '$'}</sup></p>
                                    </div>
                                )
                            })
                        }
                        {
                            itemPreview?.menuItems?.length <= 0 && <p className="py-8 w-full text-center" style={{
                                color: inforAndBrand?.textColor || "#000",
                            }}>No items found.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
        {inforAndBrand?.footerNote && <div className="fixed  bottom-0 p-4 left-0 text-xs lg:text-base w-full flex items-center justify-center" style={{
                    color: inforAndBrand?.textColor || "#000",
                    background: inforAndBrand?.backgroundColor || '#ffff'
                  }} >
                    <span className="text-center" dangerouslySetInnerHTML={{__html: inforAndBrand?.footerNote?.replaceAll('\n', '<br />').toString() || ''}}></span>
                </div>}
    </>)
}

export default PreviewPage;