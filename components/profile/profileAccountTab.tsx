import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TabsContent } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { UserProfile } from "@/lib/types";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth/auth";
import { useDispatch } from "react-redux";
import { userActions } from "@/lib/store/userSlice";
import { AppDispatch } from "@/lib/store/store";

interface ProfileAccountTabProps {
  user: UserProfile | null;
  edit: boolean;
  userDataValues: string[];
  onSetUserDataFunctions: React.Dispatch<React.SetStateAction<string>>[];
}

const ProfileAccountTab: React.FC<ProfileAccountTabProps> = ({
  user,
  edit,
  userDataValues,
  onSetUserDataFunctions,
}) => {
  const [nameValue, phoneValue, bioValue] = userDataValues;
  const [handleName, handlePhone, handleBio] = onSetUserDataFunctions;
  const dispatch = useDispatch<AppDispatch>();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name is too short")
      .max(30, "Name is too long")
      .required("Name is required"),

    phone: Yup.string().max(20, "Phone number is too long").nullable(),

    bio: Yup.string().max(100, "Bio cannot exceed 100 characters").nullable(),
  });

  return (
    <TabsContent value="account" className="space-y-4">
      <Formik
        enableReinitialize
        initialValues={{
          name: nameValue || "",
          phone: phoneValue || "",
          bio: bioValue || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // update parent state
          handleName(values.name);
          handlePhone(values.phone);
          handleBio(values.bio);
        }}
      >
        {({ handleSubmit }) => (
          <Form onBlur={handleSubmit}>
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <CardDescription className="text-base">
                  Update your personal information and bio.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="text-base" htmlFor="profile-name">
                    Name
                  </Label>
                  <Field
                    as={Input}
                    id="profile-name"
                    name="name"
                    disabled={!edit}
                    placeholder="Enter your name"
                    className="p-5 dark:border-gray-500"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Email (readonly) */}
                {user && (
                  <div className="space-y-2">
                    <Label className="text-base" htmlFor="profile-email">
                      Email
                    </Label>
                    <Input
                      id="profile-email"
                      value={user.email}
                      disabled
                      className="p-5 dark:border-gray-500"
                    />
                  </div>
                )}

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="text-base" htmlFor="profile-phone">
                    Phone
                  </Label>
                  <Field
                    as={Input}
                    id="profile-phone"
                    name="phone"
                    type="tel"
                    disabled={!edit}
                    placeholder="+123456789"
                    className="p-5 dark:border-gray-500"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label className="text-base" htmlFor="profile-bio">
                    Bio
                  </Label>
                  <Field
                    as={Textarea}
                    id="profile-bio"
                    name="bio"
                    disabled={!edit}
                    placeholder="Tell us about yourself..."
                    className="p-5 dark:border-gray-500"
                    rows={4}
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Log Out */}
                <Button
                  type="button"
                  variant="destructive"
                  onClick={async () => {
                    await signOut();
                    dispatch(userActions.logout());
                    window.location.reload();
                  }}
                  className="p-5 text-sm"
                >
                  Log out
                </Button>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </TabsContent>
  );
};

export default ProfileAccountTab;
