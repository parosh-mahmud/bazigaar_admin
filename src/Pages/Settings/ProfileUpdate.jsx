import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import axios from "axios";
import { ENDPOINT } from "../../App/config/endpoint";
import { toast } from "react-hot-toast";
import { UnAuth } from "../Auth/UnAuth";
import BtnLoader from "../../Component/Shared/BtnLoader";
import ImageUploader from "../../Component/Shared/ImageUploader";
import CountryCodeModal from "../../Component/Shared/CountryCodeModal";
import CountryList from "country-list-with-dial-code-and-flag";

const ProfileUpdate = ({ isLoading, setIsLoading }) => {
  const token = JSON.parse(localStorage.getItem("authInfo"));
  const data = JSON.parse(localStorage.getItem("WalletID"));
  const [showModal, setShowModal] = useState(false);
  const [codeList, setcodeList] = useState([]);
  const [Ccode, setCcode] = useState([]);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState(
    data?.user?.countryCode === "" ? "N/A" : data?.user?.countryCode
  );


  const filterSystem = (e) => {
    const keyword = e;

    if (keyword !== "") {
      const results = CountryList.getAll().filter((user) => {
        return (
          user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
          user.dial_code.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        );
      });
      setCcode(results);
    } else {
      setCcode(CountryList);
      // If the text field is empty, show all users
    }
    setName(keyword);
  };
  useEffect(() => {
    if (Ccode.length > 0) {
      const list2 = Ccode.map((n, i) => {
        const flag = `https://flagcdn.com/${n.code.toLowerCase()}.svg`;
        return (
          <div
            onClick={() => {
              setCountryCode(n.dial_code);
              setShowModal(false);
            }}
            defaultValue={n.dial_code}
            className="mb-2 flex w-full cursor-pointer justify-between rounded border bg-white px-2 py-2 text-gray-700"
            key={i}>
            <span id="li" className="flex items-center">
              <img
                className="mr-2 h-[50%]"
                src={flag}
                width="16"
                height="12"
                alt={n.flag}
              />
              <span id="a">{n.name}</span>
            </span>
            <span>{n.dial_code}</span>
          </div>
        );
      });
      setcodeList(list2);
    }
  }, [Ccode]);

  const [propImg, setPropImg] = useState({img:`${process.env.REACT_APP_MAIN_URL}${data?.user?.profile_picture}`});
  const [userData, setUserData] = useState({
    address: data?.user?.address || "",
    city: data?.user?.city || "",
    country: data?.user?.country || "",
    countryCode: data?.user?.countryCode || "",
    date_of_birth: data?.user?.date_of_birth || "",
    email: data?.user?.email || "",
    first_name: data?.user?.first_name || "",
    gender: data?.user?.gender || "",
    last_name: data?.user?.last_name || "",
    nickname: data?.user?.nickname || "",
    phoneNumber: data?.user?.phoneNumber || "",
    postal_code: data?.user?.postal_code || "",
    profile_picture: data?.user?.profile_picture || "",
    state: data?.user?.state || "",
  });

  useEffect(() => {
    if (propImg?.image && typeof propImg.image === "string") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        profile_picture: propImg.image
      }));
    } else if (propImg?.image instanceof File) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        profile_picture: propImg.image
      }));
    }
  }, [propImg]);
  useEffect(() => {
    setUserData({
      ...userData,
      countryCode: countryCode,
    });
  }, [countryCode]);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (token.token) {
      axios
      .put(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.user.updateProfile}`,
        userData,
        {
          headers: {
            Authorization: "token " + token.token,
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data.status === "error") {
          throw new Error(res.data.message); // This will be caught in the catch block
        } else {
          toast.success(res.data.message);
          return res.data; // Pass the data to the next then block
        }
      })

     .then((data) => {

        return new Promise((resolve) => {
          setTimeout(() => {
            const token = JSON.parse(localStorage.getItem("authInfo"));
            resolve(token);
          }, 1000); // Wait for 1 second before making the next request
        });
      })
      .then((token) => {
        return axios.get(
          `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.wallet.getWallet}`,
          {
            headers: {
              Authorization: "token " + token?.token,
            },
          }
        );
      })
      .then((res) => {
        if (res.data.type === "error") {
          throw new Error(res.data.msg); // This will be caught in the catch block
        } else {
          localStorage.setItem("WalletID", JSON.stringify(res.data));
        }
      })
      .catch((e) => {
        toast.error(e.message); // Show the error message
        UnAuth(e); // Handle unauthenticated error
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false in the finally block to ensure it always runs
      });
  }
};

  
  return (
    <PrimaryLayout pageTitle="Profile Update">
      <form className="py-6" action="" encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          {/* section 1 */}
          <div>
            {/* profile_picture */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Profile Picture:
              </p>

              <ImageUploader image={propImg} setState={(newImage) => setPropImg({ image: newImage })} />
            </div>

            {/* first_name */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                First Name:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.first_name === ""
                    ? "N/A"
                    : data?.user?.first_name
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    first_name: e.target.value,
                  });
                }}
                required={true}
              />
            </div>

            {/* last_name: */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Last Name:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.last_name === "" ? "N/A" : data?.user?.last_name
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    last_name: e.target.value,
                  });
                }}
                required={true}
              />
            </div>
            {/* nickname: */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Nick Name:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.nickname === null || ""
                    ? "N/A"
                    : data?.user?.nickname
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    nickname: e.target.value,
                  });
                }}
                required={true}
              />
            </div>

            {/* email */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Email
              </p>
              <input
                disabled={true}
                type="email"
                className="mb-2 w-full rounded-lg border border-gray-400 bg-[#f4f4f4] px-4  py-3 text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.email === "" ? "N/A" : data?.user?.email
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  });
                }}
                required={true}
              />
            </div>

            {/* date_of_birth */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Date Of Birth:
              </p>
              <input
                type="date"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.date_of_birth === "" || null
                    ? "N/A"
                    : data?.user?.date_of_birth
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    date_of_birth: e.target.value,
                  });
                }}
                required={true}
              />
            </div>
          </div>

          {/* section 2 */}
          <div>
            {/* gender */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Gender:
              </p>
              <select
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                name=""
                id=""
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    gender: e.target.value,
                  });
                }}>
                <option value="">
                  {data?.user?.gender === "" ? "N/A" : data?.user?.gender}
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Others</option>
              </select>
            </div>
            {/* phone_number */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Phone Number:
              </p>
              {/* <div className="mb-4 flex w-full items-center rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"> */}
              {/* <div className="flex items-center">
                  <input
                    className="border-0 focus:border-0 focus:outline-none focus:ring-0"
                    type="text"
                    onClick={() => setShowModal(true)}
                    defaultValue={countryCode}
                    required={true}
                  />
                  <MdOutlineArrowDropDown />
                </div> */}
              <div>
                {/* <input
                    className="w-full border-0 focus:border-0 focus:outline-none focus:ring-0 "
                    type="tel"
                    defaultValue={
                      data?.user?.phoneNumber === ""
                        ? "N/A"
                        : data?.user?.phoneNumber
                    }
                    onChange={(e) => {
                      setUserData({
                        ...userData,
                        phoneNumber: e.target.value,
                      });
                    }}
                    required={true}
                  /> */}
                <input
                  className="mb-4 flex w-full items-center rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  type="tel"
                  defaultValue={
                    data?.user?.phoneNumber === ""
                      ? "N/A"

                      : data?.user?.phoneNumber

                  }
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      phoneNumber: e.target.value,
                    });
                  }}
                  required={true}
                />
              </div>
              {/* </div> */}
            </div>
            {/* address */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Address:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.address === null || ""
                    ? "N/A"
                    : data?.user?.address
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    address: e.target.value,
                  });
                }}
                required={true}
              />
            </div>
            {/* city */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                City Name:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.city === null || "" ? "N/A" : data?.user?.city
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    city: e.target.value,
                  });
                }}
                required={true}
              />
            </div>

            {/* state */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                State:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.state === null || "" ? "N/A" : data?.user?.state
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    state: e.target.value,
                  });
                }}
                required={true}
              />
            </div>

            {/* postal_code */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Postal Code:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.postal_code === null || ""
                    ? "N/A"
                    : data?.user?.postal_code
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    postal_code: e.target.value,
                  });
                }}
                required={true}
              />
            </div>

            {/* country */}
            <div>
              <p className="pb-2 font-poppins text-base font-normal text-blackText">
                Country:
              </p>
              <input
                type="text"
                className="mb-4 w-full rounded-lg border border-gray-400 px-4 py-3  focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue={
                  data?.user?.country === null || ""
                    ? "N/A"
                    : data?.user?.country
                }
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    country: e.target.value,
                  });
                }}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-end gap-3 lg:gap-5">
          {isLoading ? (
            <BtnLoader />
          ) : (
            <button
              type="submit"
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
          )}
        </div>
      </form>
      {
        <CountryCodeModal
          showModal={showModal}
          setShowModal={setShowModal}
          codeList={codeList}
          name={name}
          filterSystem={filterSystem}
        />
      }
    </PrimaryLayout>
  );
};

export default ProfileUpdate;
