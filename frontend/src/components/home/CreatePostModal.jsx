import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import PrivacyBox from "./PrivacyBox";
import axios from "axios";
import { Vortex } from "react-loader-spinner";
import { postReset, uploadPostData } from "../../features/posts/postSlice";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CreatePostModal() {
  const dispatch = useDispatch();
  const { postError, postSuccess, postLoading, postMessage } = useSelector(
    (state) => state.posts
  );
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [emojiOpen, setEmojiOpen] = React.useState(false);
  const [showPrivacyBox, setShowPrivacyBox] = React.useState(false);
  const [post, setPost] = React.useState("");
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [visibility, setVisibility] = React.useState("");

  const [userImage, setUserImage] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [imageLoading, setImageLoading] = React.useState(null);

  React.useEffect(() => {
    if (post.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [post]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(file);
    setUserImage(imageUrl);
    setBtnDisabled(false);
  };

  const handleImageUpload = async () => {
    try {
      setImageLoading(true);
      const data = new FormData();
      data.append("upload_preset", "a4rofifj");
      data.append("file", image);
      const response = await axios.post(
        "http://api.cloudinary.com/v1_1/dt9rdbrod/image/upload",
        data
      );
      setImageLoading(false);
      setImage(null);
      setUserImage(null);
      return response?.data?.url;
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (postError) {
      toast.error(postMessage);
    }

    if (postSuccess) {
      toast.success("Post uploaded Successfully!");
      setPost("");
      setImage(null);
      setUserImage(null);
      handleClose();
    }

    // dispatch(postReset());
  }, [postError, postSuccess]);

  const handlePost = async () => {
    const imageURL = await handleImageUpload(image);
    const postData = {
      content: imageURL,
      caption: post,
      visibility,
    };
    dispatch(uploadPostData(postData));
  };
  return (
    <>
      <input
        onClick={handleOpen}
        className=" rounded-pill ps-3 w-100 bg-light border-0 outline-0 cursor-pointer"
        readOnly
        placeholder={`Whats on your mind ${user?.f_name}?`}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ background: "rgba(255,255,255,0.7)" }}
      >
        <Box
          sx={style}
          // style={{ overflow: "hidden" }}
          className="rounded-3 shadow-lg"
        >
          <h4 className="text-center">Create post</h4>
          <hr />
          <div className="d-flex align-items-center gap-2">
            <img
              src={user?.image ? user?.image : "/icons/user.png"}
              width={40}
              height={40}
              className="rounded-full"
              alt="user picture"
            />
            <div className="cursor-pointer">
              <h6 className="text-md fw-bold">
                {user?.f_name} {user?.l_name}
              </h6>
              <div className="bg-gray p-2  rounded-2 w-50">
                <div
                  onClick={() => setShowPrivacyBox(true)}
                  className="d-flex justify-content-center gap-1 align-items-center  text-sm fw-bold"
                >
                  <FaUserGroup size={15} className="fw-bold " />
                  Friends
                  <IoMdArrowDropdown size={15} />
                </div>
              </div>
            </div>
          </div>
          <textarea
            onClick={() => setEmojiOpen(false)}
            value={post}
            onChange={(e) => setPost(e.target.value)}
            rows={3}
            className="form-control text-area border-0 outline-0 box-shadow"
            placeholder={`Whats on your Mind ${user?.f_name}?`}
          ></textarea>
          {userImage && (
            <img
              src={userImage ? userImage : null}
              className="prev-image w-100   border border-dark"
              style={{ height: "200px", objectFit: "contains" }}
            />
          )}
          <div className="d-flex  justify-content-between align-items-center">
            <div className="colors bg-gray rounded-2 p-3"></div>
            <div className="emojis position-relative ">
              <BsEmojiSmile
                onClick={() => setEmojiOpen(!emojiOpen)}
                cursor={"pointer"}
                size={20}
              />
              <EmojiPicker
                onEmojiClick={(e) => setPost(post + e.emoji)}
                open={emojiOpen}
                style={{ transform: "translate(100%,-100%)" }}
                className="position-absolute top-0 end-0"
              />
            </div>
          </div>
          <div className="border my-1 w-100 rounded-2 p-2 d-flex justify-content-between align-items-center">
            <p className=" fw-semibold m-0">Add to Your Post</p>
            <div className="d-flex gap-2">
              <div className="position-relative">
                <input
                  type="file"
                  onChange={handleImage}
                  className="position-absolute opacity-0 "
                />
                <img
                  src="/icons/photos.png"
                  width={30}
                  className="cursor-pointer"
                  alt="facebook image"
                />
              </div>
              <img
                src="/icons/video.webp"
                width={30}
                className="cursor-pointer"
                alt="video image"
              />
            </div>
          </div>
          <Button
            onClick={handlePost}
            variant="contained"
            disabled={btnDisabled || imageLoading}
            className={` w-100 ${btnDisabled ? "btn-secondary" : ""}`}
          >
            {imageLoading ? (
              <>
                <Vortex
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={["black"]}
                />
              </>
            ) : (
              "Add a Post"
            )}
          </Button>

          <PrivacyBox
            visibility={visibility}
            setVisibility={setVisibility}
            showPrivacyBox={showPrivacyBox}
            setShowPrivacyBox={setShowPrivacyBox}
          />
        </Box>
      </Modal>
    </>
  );
}
