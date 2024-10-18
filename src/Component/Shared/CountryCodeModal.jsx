import React, { Fragment } from "react";
import {AiOutlineSearch} from "react-icons/ai";

const CountryCodeModal = ({
  showModal,
  setShowModal,
  codeList,
  name,
  filterSystem,
}) => {
  return (
    <Fragment>
      {/* modal*/}
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 mx-auto flex items-center justify-center ">
            <div className="relative my-6 h-full w-full">
              {/*content*/}
              <div className="relative mx-auto  mt-20 flex max-h-[85%] max-w-[90%] flex-col overflow-x-hidden overflow-y-scroll rounded-lg border-0 bg-white shadow-lg md:mt-48 md:max-w-[70%] lg:max-w-[30%]">
                {/*header*/}

                <div className="sticky top-0 z-10 border-b bg-white px-5 pb-2 pt-5">
                  <div className="flex items-start justify-between rounded">
                    <h3 className="text-xl">Select Your Country Code</h3>
                    <button
                      className="float-right ml-auto border-0 bg-transparent p-1 text-3xl leading-none"
                      onClick={() => setShowModal(false)}>
                      <span aria-hidden="true"> &times;</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <div className="mb-3 flex items-center rounded border border-gray-500 px-3">
                      <AiOutlineSearch className="text-xl" />
                      <input
                        defaultValue={name ? name : ""}
                        onChange={(e) => filterSystem(e.target.value)}
                        type="search"
                        className="h-full w-full border-0 py-1 pl-4 outline-none focus:outline-none"
                        placeholder="Country Search "
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6 ">
                  <div>{codeList}</div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </Fragment>
  );
};

export default CountryCodeModal;
