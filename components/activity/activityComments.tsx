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
import { buildCommentTree } from "@/lib/functions/helperFunctions";
import ActivityCommentItem from "./activityCommentItem";

const ActivityComments: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user } = useGetUserProfile();
  const [avatarUrl, setAvatarUrl] = useState<string>();

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

  const tree = buildCommentTree(commentsExample);

  console.log(tree);

  return (
    <>
      <div className="hidden items-center justify-center md:flex">
        <AnimatePresence>
          <div className="relative w-full rounded-xl bg-gray-100 px-3 py-4 shadow-md dark:bg-gray-900">
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
                  className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-800"
                  initial={{ borderRadius: 20 }}
                  animate={{ borderRadius: 20 }}
                  exit={{ borderRadius: 20 }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    className="absolute right-3 top-3 p-2"
                  >
                    <AiOutlineClose />
                  </Button>

                  <h2 className="mb-4 text-xl font-semibold text-black"></h2>
                  <p></p>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="md:hidden">
        <Drawer snapPoints={[0.5, 1]}>
          <DrawerTrigger className="w-full">
            <div className="relative w-full rounded-xl bg-gray-100 px-3 py-4 shadow-md dark:bg-gray-900">
              <h3 className="mb-3 text-left font-bold">Comments</h3>
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
          </DrawerTrigger>
          <DrawerContent className="w-full">
            <div className="h-screen overflow-y-auto">
              <DrawerHeader>
                <DrawerTitle>Comments</DrawerTitle>
                <DrawerDescription></DrawerDescription>
                <div className="flex flex-col gap-5">
                  {tree.map((comment) => (
                    <ActivityCommentItem
                      comment={comment}
                      user={user!}
                      key={comment.id}
                    />
                  ))}
                </div>
              </DrawerHeader>
              <DrawerFooter className="border-top fixed bottom-0 w-full border bg-white">
                <Image
                  src={avatarUrl || defaultUserImg.src}
                  width={20}
                  height={20}
                  className="h-10 w-10 rounded-full"
                  alt="profile"
                />
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default ActivityComments;
