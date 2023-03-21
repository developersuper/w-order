import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "assets/icons/ChevronLeft";
import { Label, Input, SelectList } from "components/form";
import { useForm } from "react-hook-form";
import PlacesStatus from "./PlacesStatus";
import ImageUpload from "./ImageUpload";
import { TrashIcon } from "assets/icons/Trash";
import { ButtonDefault, ButtonPrimary } from "components/form/Buttton";
import { MenuItem } from "store/slices/places/placeSlice";
import { useAppSelector } from "store/hooks";
import customToast from "components/Toast/ToastSuccess";
import PlaceService from "services/places.service";
import { useAuth } from "contexts/Auth/AuthContext";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "components/spinner/Spinner";
import { AlertIcon } from "assets/icons";
import ConfirmDeleteItem from "./ConfirmDeleteItem";

const ItemForm = ({
  id,
  name,
  image,
  status,
  categoryId,
  price,
  description,
  currency,
  onBack,
  onAction,
}: MenuItem & { onBack: () => void; onAction: (index: number) => void }) => {
  const { categories } = useAppSelector((state) => state.places);
  const [listCategory, setListCategory] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const auth = useAuth();
  const param = useParams();
  const inputRef = useRef<any>(null);


  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    register,
    getFieldState,
    formState: { errors, isValid, isDirty },
  } = useForm<any>({
    defaultValues: {
      categoryId,
      price,
      status,
      description,
      image,
      name
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (categories?.length > 0) {
      let categoriesNew =
        categories?.map((item) => {
          return {
            ...item,
            value: item?.id,
          };
        }) || [];
      setListCategory(categoriesNew);
    }
  }, [categories]);

  const onSubmit = async (data: any, e: any) => {
    try {
      if (loading || !isValid) {
        return;
      }
      setLoading(true);
      await PlaceService.updateMenuItem(auth?.user?.userId, {
        ...data,
        id,
      });
      setLoading(false);
      customToast.success(`${name} is updated successfully`);
      onBack();
    } catch {
      customToast.error(`${name} is updated failure`);
      setLoading(false);
    }
  };

  const discardChanges = () => {
    setValue("categoryId", categoryId);
    setValue("price", price);
    setValue("status", status);
    setValue("description", description);
    setValue("image", image);
    trigger();
  };

  const deleteItem = async () => {
    try {
      await PlaceService.deleteMenuItem(auth?.user?.userId, { id });
      customToast.success(`${name} is deleted successfuly`);
      onBack();
    } catch {}
  };

  const textAreaAdjust = () => {
    var nameInput = document.getElementById('nameInput');
    if(nameInput) {
      nameInput.style.height = '1px';
      nameInput.style.height = nameInput.scrollHeight+'px';
    }
  }

  useEffect(() => {
    setValue('name', name);
    textAreaAdjust();
  }, [name]);

  return (
    <>
      <form className="px-4 md:px-0 md:py-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          <span className="flex-none text-neutral-60">
            <button
              type="button"
              onClick={onBack}
              className="flex justify-center items-center rounded-xl text-primary-light w-10 h-10 -ml-2 -mt-2 hover:bg-teal-10 transition"
            >
              <ChevronLeft />
            </button>
          </span>
          <h1 className="font-bold text-neutral-80 text-[22px] ml-2 w-full">
            <input {...register('name', {required: true})} hidden />
            <textarea
              id="nameInput"
              defaultValue={name}
              ref={inputRef}
              onChange={(event) => {
                textAreaAdjust();
                setValue('name', event?.target?.value, {shouldDirty: true});
              }}
              style={{ background: "transparent" }}
              className="bg-transparent no-resize focus:outline-none focus:bg-neutral-10 rounded-md p-1 transition w-full"
            ></textarea>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row mt-[17px] md:pl-2">
          <div className="md:w-2/5">
            <div className="mb-[29px] md:pr-2 md:max-w-[300px]">
              <Label name="Category" isRequired={true} />
              <SelectList
                data={listCategory}
                onSelected={(item) => {
                  setValue("categoryId", item?.id, { shouldDirty: true });
                }}
                selectDefault={getValues("categoryId") || categoryId}
              />
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="mb-[29px] md:pr-2 md:max-w-[260px]">
              <Label name="Price" isRequired={true} />
              <Input
                control={control}
                name="price"
                rules={{
                  required: "This is required.",
                }}
                placeholder="Enter Price"
                type="number"
              />
              <p className="body-small mt-2.5 !text-neutral-60">
                Price is in {currency || "USD"}. Change currency{" "}
                <Link
                  to={`/places/${param.id}?tab=information`}
                  target="_blank"
                >
                  here
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="md:w-1/5">
            <Label name="Status" isRequired={true} />
            <div className="mt-2">
              <PlacesStatus
                value={getValues("status")}
                onChange={(value: number) => {
                  setValue("status", value, { shouldDirty: true });
                  trigger("status");
                }}
              />
            </div>
          </div>
        </div>
        <div className="mb-[29px] md:pl-2 mt-[29px] md:mt-0">
          <Label name="Description" />
          <div className="mt-2">
            <textarea
              {...register("description", {})}
              name="description"
              className={`rounded-md border border-neutral-30 text-base w-full py-2 px-2.5
                            ${
                              errors.description &&
                              getFieldState("description").isTouched &&
                              "border-default-error"
                            }`}
              placeholder="Enter Description"
            ></textarea>
            {errors.description && getFieldState("description").isTouched && (
              <span className="text-sm text-default-error mt-2 flex items-center space-x-2">
                <span className="flex-none">
                  <AlertIcon />
                </span>
                <span>This is required.</span>
              </span>
            )}
          </div>
        </div>
        <div className="md:pl-2">
          <Label name="Image" />
          <div className="mt-2">
            <ImageUpload
              imageDefault={getValues("image")}
              onSelect={(data) => {
                setValue("image", data, { shouldDirty: true });
                trigger("image");
              }}
            />
          </div>
        </div>
        <div className="flex mt-6 md:pl-2">
          <button
            className="flex items-center text-sm font-medium border border-neutral-60 hover:border-default-error text-neutral-60 hover:text-default-error h-[40px] p-2.5 rounded-2xl"
            type="button"
            onClick={() => setConfirmDelete(true)}
          >
            <TrashIcon />
          </button>
          <div className="ml-auto flex">
            <ButtonDefault
              size="small"
              disabled={!isDirty}
              type="button"
              onClick={discardChanges}
            >
              Discard Changes
            </ButtonDefault>
            <ButtonPrimary
              type="submit"
              size="small"
              styles="flex ml-2 md:ml-4 white-nowwrap"
              disabled={!isDirty || !isValid}
            >
              {loading && <Spinner />}
              {(loading && "Please wait...") || "Save and Close"}
            </ButtonPrimary>
          </div>
        </div>
      </form>
      <ConfirmDeleteItem
        name={name}
        isOpen={confirmDelete}
        closeModal={(value) => {
          if (value) {
            deleteItem();
          } else {
            setConfirmDelete(false);
          }
        }}
      />
    </>
  );
};

export default ItemForm;
