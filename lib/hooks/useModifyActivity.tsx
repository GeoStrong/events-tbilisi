import * as Yup from "yup";
import { EventEntity, ImageType, NewEventEntity, UserProfile } from "../types";
import { JSX, RefObject, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { mapActions } from "../store/mapSlice";
import { Formik } from "formik";
import { toast } from "sonner";
import CreateActivityForm from "@/components/create-activity/createActivityForm";
import useScreenSize from "./useScreenSize";
import { handleUploadFile, isFile } from "../functions/helperFunctions";
import {
  postNewEvent,
  postNewEventCategories,
  updateEvent,
} from "../functions/supabaseFunctions";

interface useModifyActivityProps {
  user: UserProfile | null;
  eventId?: string;
  latLng: google.maps.LatLngLiteral | null | undefined;
  initialValues: NewEventEntity;
  isUpdatingActivity: boolean;
  enableMapFloating?: boolean;
  image?: ImageType;
}

const useModifyActivity: (props: useModifyActivityProps) => {
  formikComponent: JSX.Element;
  openMobileMapRef: RefObject<HTMLButtonElement | null>;
  openCreateActivityAlertRef: RefObject<HTMLButtonElement | null>;
} = ({
  user,
  eventId,
  latLng,
  initialValues,
  isUpdatingActivity = false,
  enableMapFloating = false,
  image,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const openMobileMapRef = useRef<HTMLButtonElement | null>(null);
  const openCreateActivityAlertRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    location: Yup.string().required("Location is required"),
    categories: Yup.array()
      .min(1, "Category is required")
      .max(3, "Maximum 3 categories allowed"),
    googleLocation: Yup.object().required(),
  });

  const onOpenMobileMap = () => {
    if (openMobileMapRef) openMobileMapRef.current?.click();
  };

  const displayCreateActivityAlert = () => {
    if (openCreateActivityAlertRef) openCreateActivityAlertRef.current?.click();
  };

  const submitHandler = async (values: NewEventEntity) => {
    const imageUrl = isFile(values.image)
      ? await handleUploadFile("activities", values.image, user!)
      : values.image;

    const newActivity: NewEventEntity = {
      user_id: user?.id,
      title: values.title,
      description: values.description,
      date: values.date,
      time: values.time,
      endTime: values.endTime || null,
      location: values.location,
      link: values.link || null,
      status: "active",
      targetAudience: values.targetAudience || null,
      maxAttendees: values.maxAttendees || null,
      image: imageUrl || null,
      googleLocation: values.googleLocation,
    };

    let activity;

    if (isUpdatingActivity) {
      activity = (await updateEvent(eventId!, newActivity)) as EventEntity[];
    } else {
      activity = (await postNewEvent(newActivity)) as EventEntity[];
    }

    if (values.categories)
      await postNewEventCategories(
        isUpdatingActivity ? eventId! : activity[0].id,
        values.categories,
      );
  };

  useEffect(() => {
    if (image) setImagePreview(image.toString());
  }, [image]);

  useEffect(() => {
    dispatch(mapActions.setIsFloatingEnabled(enableMapFloating));
  }, [dispatch, enableMapFloating]);

  const formikComponent = (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (JSON.stringify(values) === JSON.stringify(initialValues)) {
            toast.info("You have not made any changes");
            return;
          }
          submitHandler(values);
          resetForm();
          setImagePreview(null);
          displayCreateActivityAlert();
        } catch (err) {
          console.error(err);
          toast.error(
            isUpdatingActivity
              ? "There was an error editing your activity"
              : "There was an error posting your activity",
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <CreateActivityForm
          formik={formik}
          latLng={latLng || null}
          imagePreview={imagePreview}
          handleImagePreview={setImagePreview}
          handleOpenMobileMap={onOpenMobileMap}
          displayOpenMapButton={isUpdatingActivity ? true : isMobile}
          styles={`${isUpdatingActivity ? "h-1/2" : "md:h-[80%]"}`}
        />
      )}
    </Formik>
  );

  return { formikComponent, openMobileMapRef, openCreateActivityAlertRef };
};

export default useModifyActivity;
