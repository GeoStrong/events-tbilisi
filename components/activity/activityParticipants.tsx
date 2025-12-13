import { BiDotsVerticalRounded } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ActivityParticipantsEntity, UserProfile } from "@/lib/types";
import { fetchUserInfo } from "@/lib/profile/profile";
import ExpandableContainer from "../general/expandableContainer";
import ParticipantAvatars from "../general/participantAvatars";
import { Button } from "../ui/button";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import UserFollowButton from "../general/userFollowButton";

const snapPoints = [0.5, 1];

type FullUserInfoType = Partial<UserProfile> & {
  additional_info?: string;
};

const ActivityParticipants: React.FC<{
  isHost?: boolean;
  participants: ActivityParticipantsEntity[];
}> = ({ isHost, participants }) => {
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [participantUserInfo, setParticipantUserInfo] = useState<
    Partial<UserProfile>[] | null
  >(null);
  const [activeUser, setActiveUser] = useState<FullUserInfoType | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    (async () => {
      const users = await Promise.all(
        participants.map(
          async (participant) => await fetchUserInfo(participant.user_id),
        ),
      );
      setParticipantUserInfo(users as Partial<UserProfile>[]);
    })();
  }, [participants]);

  return (
    <>
      <div className="hidden items-center justify-center md:flex">
        <ExpandableContainer
          layoutId="2"
          containerTrigger={
            <div className="flex flex-col">
              <h3 className="mb-3 font-bold md:text-lg">
                Participants
                <span className="inline-block pl-3">{participants.length}</span>
              </h3>
              <div className="flex items-center gap-2">
                {participantUserInfo?.map((user) => (
                  <ParticipantAvatars
                    key={user.id}
                    userImagePath={user.avatar_path || ""}
                  />
                ))}
              </div>
            </div>
          }
          openDialog={open}
          setOpenDialog={setOpen}
        >
          <motion.div
            animate={{
              width: activeUser ? "75vw" : "30vw",
            }}
            transition={{ duration: 0.3 }}
            ref={containerRef}
            className="h-[90vh] overflow-y-auto"
          >
            <div className="absolute right-1/2 w-full translate-x-1/2 bg-white dark:bg-gray-800">
              <div className="flex justify-between px-5 shadow-md">
                <div className=""></div>
                <h3 className="mb-5 text-xl font-bold">Participants</h3>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  className="p-2"
                >
                  <AiOutlineClose />
                </Button>
              </div>

              <div className="flex gap-2">
                <AnimatePresence>
                  <div className={`mt-5 ${activeUser ? "w-1/2" : "w-full"}`}>
                    {participantUserInfo?.map((user) => (
                      <div
                        key={user.id}
                        className="mb-4 flex items-center justify-between border-b px-5 pb-3 dark:border-b-gray-600"
                      >
                        <Link
                          className="flex items-center gap-4"
                          href={user.id ? `/users/${user.id}` : "#"}
                        >
                          <ParticipantAvatars
                            userImagePath={user.avatar_path || ""}
                          />
                          <span className="text-lg">{user.name}</span>
                        </Link>
                        <div className="flex items-center gap-3">
                          {!isHost && user.id && (
                            <UserFollowButton userId={user.id} />
                          )}
                          {isHost && (
                            <BiDotsVerticalRounded
                              onClick={() => {
                                const activeUser = participants.find(
                                  (participant) =>
                                    participant.user_id === user.id,
                                );

                                const fullUserInfo = {
                                  ...user,
                                  additional_info: activeUser?.additional_info,
                                };

                                setActiveUser(fullUserInfo || null);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {activeUser && (
                    <motion.div
                      key="participant-panel"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="m-5 w-1/2 rounded-xl border shadow-md dark:border-gray-600"
                    >
                      <div className="mt-2 flex items-center justify-between px-3">
                        <div></div>
                        <h3 className="text-xl font-bold">Participant Info</h3>

                        <Button
                          variant="outline"
                          className="p-2"
                          onClick={() => setActiveUser(null)}
                        >
                          <AiOutlineClose />
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="flex w-full justify-center">
                          <ParticipantAvatars
                            userImagePath={activeUser.avatar_path || ""}
                            size={20}
                          />
                        </div>
                        <h4 className="text-lg">
                          Name:
                          <span className="pl-2 font-bold">
                            {activeUser.name}
                          </span>
                        </h4>
                        <p className="text-lg">
                          Email:
                          <span className="pl-2 font-bold">
                            {activeUser.email}
                          </span>
                        </p>
                        <p className="text-lg">
                          Phone:
                          <span className="pl-2 font-bold">
                            {activeUser.phone}
                          </span>
                        </p>
                        <p className="text-lg">
                          Additional Info:
                          <span className="pl-2 font-bold">
                            {activeUser.additional_info}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </ExpandableContainer>
      </div>

      <div className="md:hidden">
        <Drawer
          snapPoints={snapPoints}
          activeSnapPoint={snap}
          setActiveSnapPoint={setSnap}
          fadeFromIndex={0}
        >
          <DrawerTrigger className="w-full rounded-xl bg-white px-3 py-4 text-left shadow-md dark:bg-gray-900">
            <h3 className="mb-3 font-bold md:text-lg">
              Participants
              <span className="inline-block pl-3">{participants.length}</span>
            </h3>
            <div className="flex items-center gap-2">
              {participantUserInfo?.map((user) => (
                <ParticipantAvatars
                  key={user.id}
                  userImagePath={user.avatar_path || ""}
                />
              ))}
            </div>
          </DrawerTrigger>
          <DrawerContent className="w-full" headerChildren={"Participants"}>
            <div className="mb-20 h-screen overflow-y-auto">
              <DrawerHeader>
                <DrawerTitle className="hidden">Participants</DrawerTitle>
                <DrawerDescription className="hidden">
                  Participants
                </DrawerDescription>
              </DrawerHeader>
              <div className="w-full">
                {participantUserInfo?.map((user) => (
                  <div
                    key={user.id}
                    className="mb-4 flex items-center justify-between border-b px-5 pb-3 dark:border-b-gray-600"
                  >
                    <Link
                      className="flex items-center gap-4"
                      href={user.id ? `/users/${user.id}` : "#"}
                    >
                      <ParticipantAvatars
                        userImagePath={user.avatar_path || ""}
                      />
                      <span className="text-lg">{user.name}</span>
                    </Link>
                    <div className="flex items-center gap-3">
                      {!isHost && user.id && (
                        <UserFollowButton userId={user.id} />
                      )}
                      {isHost && (
                        <Drawer>
                          <DrawerTrigger>
                            <BiDotsVerticalRounded
                              onClick={() => {
                                const activeUser = participants.find(
                                  (participant) =>
                                    participant.user_id === user.id,
                                );

                                const fullUserInfo = {
                                  ...user,
                                  additional_info: activeUser?.additional_info,
                                };

                                setActiveUser(fullUserInfo || null);
                              }}
                            />
                          </DrawerTrigger>
                          <DrawerContent className="h-[80%] w-full">
                            <DrawerHeader>
                              <DrawerTitle>Participant Info</DrawerTitle>
                              <DrawerDescription></DrawerDescription>
                              <div className="p-4 text-left">
                                <div className="flex w-full justify-center">
                                  <ParticipantAvatars
                                    userImagePath={
                                      activeUser?.avatar_path || ""
                                    }
                                    size={20}
                                  />
                                </div>
                                <h4 className="text-lg">
                                  Name:
                                  <span className="pl-2 font-bold">
                                    {activeUser?.name}
                                  </span>
                                </h4>
                                <p className="text-lg">
                                  Email:
                                  <span className="pl-2 font-bold">
                                    {activeUser?.email}
                                  </span>
                                </p>
                                <p className="text-lg">
                                  Phone:
                                  <span className="pl-2 font-bold">
                                    {activeUser?.phone}
                                  </span>
                                </p>
                                <p className="text-lg">
                                  Additional Info:
                                  <span className="pl-2 font-bold">
                                    {activeUser?.additional_info}
                                  </span>
                                </p>
                              </div>
                            </DrawerHeader>
                            <DrawerFooter></DrawerFooter>
                          </DrawerContent>
                        </Drawer>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <DrawerFooter className="fixed bottom-0 flex w-full flex-row items-center justify-between gap-3 border border-t-gray-100 bg-white shadow-md dark:border-t-gray-600 dark:bg-gray-800"></DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default ActivityParticipants;
