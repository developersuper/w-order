import React, { useEffect, useState } from "react";
import { AddIcon } from "assets/icons/Add";
import { ButtonDefault, ButtonPrimary } from "components/form/Buttton";
import H2 from "components/headings/H2";
import H4 from "components/headings/H4";
import { Link, useNavigate } from 'react-router-dom';
import Modal from "components/modal";
import H3 from "components/headings/H3";
import { useAuth } from "contexts/Auth/AuthContext";
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { Label, Input, InputPrefix } from "components/form";
import { Spinner } from "components/spinner/Spinner";
import PlaceService from "services/places.service";
import { PlacePayloadType, PlaceResponseType } from "types/Place.type";
import customToast from "components/Toast/ToastSuccess";
import PlaceCard from "./PlaceCard";
import PlaceCardSeleton from "components/sekeletons/PlaceCardSeleton";
import { convert_vi_to_en, openChat } from "utils";
import { DeleteIcon } from "assets/icons";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [openCreatePlace, setOpenCreatePlace] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const [error, setError] = useState<any>();
  const [places, setPlaces] = useState<PlaceResponseType[]>([]);
  const [limitCreatePlace, setLimitCreatePlace] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm({
    defaultValues: {
      placeName: "",
      placeUrl: ""
    },
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<PlacePayloadType> = async (value) => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const response = await PlaceService.createPlacesService(auth.user?.userId, { ...value });
      customToast.success(`${value?.placeName} is created successfully`);
      if (response?.data) {
        navigate('/places/' + response?.data?.id);
      }
      setOpenCreatePlace(false);

    } catch (error: any) {
      setError(error?.response?.data?.error || 'fail');
      setLoading(false);
    }
  }

  const business_name = useWatch({
    control,
    name: "placeName"
  });
  useEffect(() => {
    setValue('placeUrl', convert_vi_to_en(business_name)?.toLowerCase().replaceAll(' ', '-'))
  }, [business_name]);

  useEffect(() => {
    if (auth.user?.userId) {
      getPlaces(auth.user?.userId);
    }
  }, [auth.user?.userId]);

  const getPlaces = async (userId: string) => {
    try {
      setLoading(true);
      let response = await PlaceService.getPlacesService(userId);
      if (response?.data) {
        setPlaces(response?.data);
      } else {
        getPlaces(auth.user?.userId);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  const createPlace = () => {
    setOpenCreatePlace(true);
    if(auth?.user?.maxPlacePerAccountConfig <= places?.length) {
      setLimitCreatePlace(true);
    } else {
      setLimitCreatePlace(false);
    }
    
  }

  const chatWithMe = () => {
    openChat();
  }

  return (
    <>
      <div className="flex items-center px-4 md:px-0">
        {
          <>
            < H2 title="Places"></H2>
            <div className="ml-auto">
              <ButtonPrimary size="small" onClick={() => {createPlace()}}>
                <span className="flex items-center space-x-2.5">
                  <AddIcon />
                  <span>New Place</span>
                </span>
              </ButtonPrimary>
            </div>
          </>
        }

      </div>
      <div className="flex flex-col min-h-[300px] w-full  px-4 md:px-0">
        {loading &&
          <>
            <div className="flex flex-wrap mt-[29px] -mx-3 w-[calc(100% + 24px)]">
              {[1, 2, 3].map(item =>
                <div className="w-full sm:w-1/2 lg:w-1/3 mb-6" key={item}>
                  <div className="px-3">
                    <PlaceCardSeleton key={item} />
                  </div>
                </div>
              )}
            </div>
          </>
        }
        {places?.length > 0 && !loading &&
          <div className="flex flex-wrap mt-[29px] -mx-3 w-[calc(100% + 24px)]">
            {places.map(item =>
              <div className="w-full sm:w-1/2 lg:w-1/3 mb-6" key={item.id}>
                <div className="px-3">
                  <PlaceCard {...item} />
                </div>
              </div>
            )}
          </div>
        }
        {places?.length <= 0 && !loading &&
          <H4 className="text-center w-full">It looks a bit empty here...<br />
            Start <Link to="" onClick={() => setOpenCreatePlace(true)}>adding new place</Link> and create your beautiful menu.</H4>
        }
      </div>
      <Modal
        show={openCreatePlace}
        onClose={() => { }}
        className={'max-w-[500px]'}
      >
        {!limitCreatePlace &&
          <>
            <H3>Create New Place</H3>
            <form className="mt-4">
              {error && <div className='bg-red-30 px-8 py-5 text-neutral-80 text-base mb-6 rounded-md'>
                {error?.message || "Opps, something wrong, Please try again."}
              </div>}
              <div className='mb-4'>
                <Label name="Name" isRequired={true} />
                <Input control={control} name="placeName"
                  rules={{
                    required: 'This is required.',
                  }} placeholder="Your place name" type="text" />
              </div>
              <div className='mb-6'>
                <Label name="URL " isRequired={true} />
                <InputPrefix prefix="menubly.com/" control={control} name="placeUrl" disabled={true} rules={{ required: 'This is required.' }} placeholder="" type="text" />
              </div>
              <div className="flex justify-end w-full">
                <div className={`flex space-x-4 ${loading ? ' max-w-[355px]' : ' max-w-[195px]'}`}>
                  <ButtonDefault onClick={() => setOpenCreatePlace(false)} styles="w-[150px]">
                    Cancel
                  </ButtonDefault>
                  <ButtonPrimary onClick={handleSubmit(onSubmit)} styles={`${loading ? 'w-[260px]' : 'w-[200px]'}`}>
                    <div className='flex items-center justify-center'>
                      {loading && <Spinner />}
                      <span className="truncate">{loading && 'Please wait...' || 'Create'}</span>
                    </div>
                  </ButtonPrimary>
                </div>
              </div>
            </form>
          </>
        }
        {limitCreatePlace &&
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
            <H3 className="text-center">Contact us for additional place</H3>
            <p className="body-default mt-2 mb-8 text-center">We’re glad you’re wanting more places!<br />
              Contact us via email at <a onClick={chatWithMe}>support@menubly.com</a> or simply send us a message!</p>
            <ButtonPrimary onClick={() => { window.open('https://jivo.chat/9vTvT12IiJ', "_blank") }} type="smnall" styles="text-center mx-auto block">
              Chat with us
            </ButtonPrimary>
          </>
        }
      </Modal>
    </>
  );
};

export default HomePage;
