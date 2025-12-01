import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiExpandAlt } from "react-icons/bi";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import defaultUserImg from "@/public/images/default-user.png";
import { CommentEntity } from "@/lib/types";
import useGetUserProfile from "@/lib/hooks/useGetUserProfile";
import { getImageUrl } from "@/lib/functions/supabaseFunctions";
import { groupCommentsOneLevel } from "@/lib/functions/helperFunctions";
import ActivityCommentItem from "./activityCommentItem";
import { Input } from "../ui/input";
import Form from "next/form";
import { IoIosSend } from "react-icons/io";

const snapPoints = [0.5, 1];

const ActivityComments: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useGetUserProfile();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [snap, setSnap] = React.useState<number | string | null>(snapPoints[0]);
  const [commentTextInput, setCommentTextInput] = useState<string>("");

  const commentsExample: CommentEntity[] = [
    {
      id: "123",
      activityid: "1",
      user: user!,
      created_at: new Date(),
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, unde.",
    },
    {
      id: "1234",
      activityid: "1",

      user: user!,
      created_at: new Date(),
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt error placeat accusamus nemo sint nulla eius consectetur! Ipsum officiis rerum neque ab autem quos labore debitis, voluptatibus obcaecati soluta veniam, blanditiis inventore optio! Officiis asperiores aspernatur qui pariatur aut, tempore expedita eum repudiandae exercitationem debitis cupiditate, facilis autem nobis eius!",
      parentCommentId: "123",
    },
    {
      id: "1235",
      activityid: "1",

      user: user!,
      created_at: new Date(),
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt error placeat accusamus nemo sint nulla eius consectetur! Ipsum officiis rerum neque ab autem quos labore debitis, voluptatibus obcaecati soluta veniam, blanditiis inventore optio! Officiis asperiores aspernatur qui pariatur aut, tempore expedita eum repudiandae exercitationem debitis cupiditate, facilis autem nobis eius!",
    },
    {
      id: "1236",
      activityid: "1",

      user: user!,
      created_at: new Date(),
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt error placeat accusamus nemo sint nulla eius consectetur! Ipsum officiis rerum neque ab autem quos labore debitis, voluptatibus obcaecati soluta veniam, blanditiis inventore optio! Officiis asperiores aspernatur qui pariatur aut, tempore expedita eum repudiandae exercitationem debitis cupiditate, facilis autem nobis eius!",
      parentCommentId: "1235",
    },
    {
      id: "1237",
      activityid: "1",

      user: user!,
      created_at: new Date(),
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt error placeat accusamus nemo sint nulla eius consectetur! Ipsum officiis rerum neque ab autem quos labore debitis, voluptatibus obcaecati soluta veniam, blanditiis inventore optio! Officiis asperiores aspernatur qui pariatur aut, tempore expedita eum repudiandae exercitationem debitis cupiditate, facilis autem nobis eius!",
      parentCommentId: "1236",
    },
    {
      activityid: "1",
      user: user!,
      id: "1238",
      created_at: new Date(),
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt error placeat accusamus nemo sint nulla eius consectetur! Ipsum officiis rerum neque ab autem quos labore debitis, voluptatibus obcaecati soluta veniam, blanditiis inventore optio! Officiis asperiores aspernatur qui pariatur aut, tempore expedita eum repudiandae exercitationem debitis cupiditate, facilis autem nobis eius!",
      parentCommentId: "1235",
    },
  ];

  useEffect(() => {
    (async () => {
      const image = await getImageUrl(user?.avatar_path || "");
      setAvatarUrl(image || "");
    })();
  }, [user]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const groupedComments = groupCommentsOneLevel(commentsExample);

  return (
    <>
      <div className="hidden items-center justify-center md:flex">
        <AnimatePresence>
          <div className="relative w-full rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900">
            {!open && (
              <motion.div
                layoutId="expandable"
                onClick={() => setOpen(true)}
                className="absolute right-0 top-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl"
              >
                <BiExpandAlt />
              </motion.div>
            )}
            <h3 className="mb-3 text-lg font-bold">Comments</h3>
            <div className="flex items-center gap-3">
              <Image
                src={avatarUrl || defaultUserImg.src}
                width={20}
                height={20}
                className="h-8 w-8 rounded-full"
                alt="profile"
              />
              <p className="text-sm font-extralight">
                {commentsExample[0].text.slice(0, 40) + "..."}
              </p>
            </div>
          </div>
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none fixed inset-0 z-40 bg-black/50"
              />

              <motion.div
                layoutId="expandable"
                className="fixed inset-0 z-50 flex items-center justify-center"
                onClick={() => setOpen(false)}
              >
                <motion.div
                  className="relative rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
                  initial={{ borderRadius: 20 }}
                  animate={{ borderRadius: 20 }}
                  exit={{ borderRadius: 20 }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="h-[90vh] w-full max-w-[80vw] overflow-y-scroll">
                    <div className="absolute right-1/2 w-full translate-x-1/2 border-b bg-white dark:border-b-gray-500 dark:bg-gray-800">
                      <div className="flex justify-between px-5 shadow-md">
                        <div className=""></div>
                        <h3 className="mb-5 text-xl font-bold">Comments</h3>
                        <Button
                          onClick={() => setOpen(false)}
                          variant="outline"
                          className="p-2"
                        >
                          <AiOutlineClose />
                        </Button>
                      </div>
                    </div>
                    <div className="my-20">
                      {groupedComments.map(({ root, replies }) => (
                        <div key={root.id} className="w-full">
                          <ActivityCommentItem comment={root} user={user!} />

                          {replies.length > 0 && (
                            <div className="ml-12 mt-4 flex flex-col gap-3 pl-4">
                              {replies.map((reply) => (
                                <ActivityCommentItem
                                  key={reply.id}
                                  comment={reply}
                                  user={user!}
                                  isReply
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-0 right-1/2 flex h-20 w-full translate-x-1/2 items-center rounded-b-3xl border bg-white shadow-md dark:border-t-gray-500 dark:bg-gray-800">
                      <div className="flex w-full items-center justify-between gap-5 px-10">
                        <Image
                          src={avatarUrl || defaultUserImg.src}
                          width={20}
                          height={20}
                          className="h-12 w-12 rounded-full"
                          alt="profile"
                        />
                        <Form
                          action=""
                          className="relative flex w-full items-center justify-between gap-3"
                          onSubmit={() => {
                            console.log(commentTextInput);
                          }}
                        >
                          <Input
                            type="text"
                            value={commentTextInput}
                            onChange={(event) => {
                              setCommentTextInput(event.target.value);
                            }}
                            className="h-12 rounded-full border !text-lg dark:border-gray-500"
                          />
                          <AnimatePresence>
                            {commentTextInput !== "" && (
                              <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="absolute right-2"
                              >
                                <button className="rounded-full bg-primary px-3 py-2">
                                  <IoIosSend className="text-xl text-white" />
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Form>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="md:hidden">
        <Drawer
          snapPoints={snapPoints}
          activeSnapPoint={snap}
          setActiveSnapPoint={setSnap}
          fadeFromIndex={0}
        >
          <DrawerTrigger className="w-full">
            <div className="relative w-full rounded-xl bg-white px-3 py-4 shadow-md dark:bg-gray-900">
              <h3 className="mb-3 text-left font-bold">Comments</h3>
              <div className="flex items-center gap-3 rounded-md bg-gray-100 p-2 dark:bg-gray-700">
                <Image
                  src={avatarUrl || defaultUserImg.src}
                  width={20}
                  height={20}
                  className="h-8 w-8 rounded-full"
                  alt="profile"
                />
                <p className="text-sm font-extralight">
                  {commentsExample[0].text.slice(0, 40) + "..."}
                </p>
              </div>
            </div>
          </DrawerTrigger>
          <DrawerContent className="w-full" headerChildren={"Comments"}>
            <div className="mb-20 h-screen overflow-y-auto">
              <DrawerHeader>
                <DrawerTitle className="hidden">Comments</DrawerTitle>
                <DrawerDescription className="hidden">
                  Comments
                </DrawerDescription>
                {groupedComments.map(({ root, replies }) => (
                  <div key={root.id} className="mb-6">
                    <ActivityCommentItem comment={root} user={user!} />

                    {replies.length > 0 && (
                      <div className="ml-12 mt-4 flex flex-col gap-3 pl-4">
                        {replies.map((reply) => (
                          <ActivityCommentItem
                            key={reply.id}
                            comment={reply}
                            user={user!}
                            isReply
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </DrawerHeader>
              <DrawerFooter className="fixed bottom-0 flex w-full flex-row items-center justify-between gap-3 border border-t-gray-100 bg-white shadow-md dark:border-t-gray-600 dark:bg-gray-800">
                <Image
                  src={avatarUrl || defaultUserImg.src}
                  width={20}
                  height={20}
                  className="h-12 w-12 rounded-full"
                  alt="profile"
                />
                <Form
                  action=""
                  className="relative flex w-[85%] items-center justify-between gap-3"
                  onSubmit={() => {
                    console.log(commentTextInput);
                  }}
                >
                  <Input
                    type="text"
                    value={commentTextInput}
                    onChange={(event) => {
                      setCommentTextInput(event.target.value);
                    }}
                    className="h-12 rounded-full border dark:border-gray-500"
                  />
                  <AnimatePresence>
                    {commentTextInput !== "" && (
                      <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute right-2"
                      >
                        <button className="rounded-full bg-primary px-3 py-2">
                          <IoIosSend className="text-xl text-white" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Form>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default ActivityComments;
