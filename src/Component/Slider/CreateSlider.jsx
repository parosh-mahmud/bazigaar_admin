import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "../Shared/ImageUploader";
import { ENDPOINT } from "../../App/config/endpoint";
import { toast } from "react-hot-toast";
import { UnAuth } from "../../Pages/Auth/UnAuth";

const CreateSlider = ({ setModalOpen, getData }) => {
  const [image, setImage] = useState({});


  const token = JSON.parse(localStorage.getItem("authInfo"));
  const [formData, setformData] = useState({
    sliderImage: "",
    image_url: "",
    title: "",
    active: "",
  });

  useEffect(() => {
    if (image?.type) {
      setformData({ ...formData, sliderImage: image });
    }
  }, [image]);

  async function getResponse() {
    console.log("formData", formData);
    try {
      const response1 = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.slider.addSlider}`,
        formData,
        {
          headers: {
            Authorization: "Token " + token.token,
            "content-type": "multipart/form-data",
          },
        }
      );

      if (response1.data.type === "error") {
        toast.error(response1.data.msg);
      } else {
        toast.success(response1.data.msg);
        setModalOpen(false);
        getData();
      }
    } catch (error) {
      // console.error("error", error);
      UnAuth(error);
      setModalOpen(false);
      // setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getResponse();
  };

  return (
    <Fragment>
      <form action="" encType="multipart/form-data">
        {/* Slider Image */}
        <div>
          <p className="pb-2 font-poppins text-base font-normal text-blackText">
            Slider Image
          </p>
          <ImageUploader image={image} setState={setImage} />
        </div>

        {/* Slider Title */}
        <div>
          <p className="pb-2 font-poppins text-base font-normal text-blackText">
            Slider Title
          </p>
          <input
            type="text"
            className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Enter Slider Title"
            onChange={(e) => {
              setformData({
                ...formData,
                title: e.target.value,
              });
            }}
            required={true}
          />
        </div>

        {/* status */}
        <div>
          <p className="pb-2 font-poppins text-base font-normal text-blackText">
            Status
          </p>
          <select
            className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            placeholder="Status"
            onChange={(e) => {
              setformData({
                ...formData,
                active: e.target.value,
              });
            }}
            required={true}>
            <option value="">Select</option>
            <option value="True">Active</option>
            <option value="False">Inactive</option>
          </select>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3 lg:gap-5">
          <button
            onClick={() => setModalOpen(false)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] px-4 py-2 font-poppins text-base font-normal text-white">
            <svg
              style={{ color: "#fff" }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x cursor-pointer">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>{" "}
            Cancel
          </button>
          <button
            onClick={(e) => handleSubmit(e)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] px-4 py-2 font-poppins text-base font-normal text-white">
            <svg
              style={{ color: "#fff" }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check">
              <polyline points="20 6 9 17 4 12" />
            </svg>{" "}
            Confirm
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default CreateSlider;
