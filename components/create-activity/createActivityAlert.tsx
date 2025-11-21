import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

interface CreateActivityAlertProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isActivityCreated: boolean;
}

const CreateActivityAlert: React.FC<CreateActivityAlertProps> = ({
  buttonRef,
  isActivityCreated,
}) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger ref={buttonRef} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isActivityCreated
                ? "You created Activity!"
                : "You updated Activity"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isActivityCreated
                ? "You have successfully created an Activity 🎉."
                : "You have successfully updated an Activity 🎉"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>
              <Link href="/">Main Menu</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default CreateActivityAlert;
