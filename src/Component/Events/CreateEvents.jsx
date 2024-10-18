import React, { Fragment, useState } from "react";
const CreateAgent = ({ setModalOpen }) => {
  // const [files, setFiles] = useState([]);
  const [formData, setformData] = useState({
  
    title: "",
    host: "",
    url: "",
    startDate: "",
    startTime: "",
    category: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("files", formData);
  };
  return (
    <Fragment>
      <div>
        <form action="" className="">
          {/* Video Thumnail */}
          {/* <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              Video Thumnail
            </p>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              allowMultiple={true}
              maxFiles={3}
              server="/api"
              name="videoThumnail"
              labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
            />
          </div> */}

          {/* Title */}
          <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              Title
            </p>
            <input
              type="text"
              className="mb-4 w-full rounded-lg border border-gray-400 py-3 px-4  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Enter Title"
              onChange={(e) => {
                setformData({
                  ...formData,
                  title: e.target.value,
                });
              }}
              required={true}
            />
          </div>
          {/* host */}
          <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              Host Name
            </p>
            <input
              type="text"
              className="mb-4 w-full rounded-lg border border-gray-400 py-3 px-4  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Enter Host Name"
              onChange={(e) => {
                setformData({
                  ...formData,
                  host: e.target.value,
                });
              }}
              required={true}
            />
          </div>
          {/* url */}
          <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              Event Link
            </p>
            <input
              type="text"
              className="mb-4 w-full rounded-lg border border-gray-400 py-3 px-4  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Enter Event Link"
              onChange={(e) => {
                setformData({
                  ...formData,
                  url: e.target.value,
                });
              }}
              required={true}
            />
          </div>
          {/* Start Date And Time */}
          <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              Start Date And Time
            </p>

            <div className="mb-4 grid w-full grid-cols-1 gap-3 rounded-lg border border-gray-400 py-3 px-4 lg:grid-cols-2">
              <div className="flex items-center">
                <p className="pr-2 font-poppins text-base font-normal  text-blackText">
                  Date:
                </p>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-400 p-2  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="0"
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      startDate: e.target.value,
                    });
                  }}
                  required={true}
                />
              </div>
              <div className="flex items-center">
                <p className="pr-2 font-poppins text-base font-normal text-blackText">
                  Time:
                </p>
                <input
                  type="time"
                  className="w-full rounded-lg border border-gray-400 p-2  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder=""
                  onChange={(e) => {
                    setformData({
                      ...formData,
                      startTime: e.target.value,
                    });
                  }}
                  required={true}
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              Category
            </p>
            <select
              className="mb-4 w-full rounded-lg border border-gray-400 py-3 px-4  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Category"
              onChange={(e) => {
                setformData({
                  ...formData,
                  category: e.target.value,
                });
              }}
              required={true}>
              <option value="">Select</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div>
          {/* status */}
          <div>
            <p className="pb-2 font-poppins text-base font-normal text-blackText">
              Status
            </p>
            <select
              className="mb-4 w-full rounded-lg border border-gray-400 py-3 px-4  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="Status"
              onChange={(e) => {
                setformData({
                  ...formData,
                  status: e.target.value,
                });
              }}
              required={true}>
              <option value="">Select</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </form>
        <div className="mt-5 flex items-center justify-end gap-3 lg:gap-5">
          <button
            onClick={() => setModalOpen(false)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#F56E6E] py-2 px-4 font-poppins text-base font-normal text-white">
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
            className="flex items-center justify-center gap-2 rounded-lg bg-[#63AD6F] py-2 px-4 font-poppins text-base font-normal text-white">
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
      </div>
    </Fragment>
  );
};

export default CreateAgent;
