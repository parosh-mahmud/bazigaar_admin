import React from "react";
import PrimaryLayout from "../Component/layouts/PrimaryLayout";

const Chat = () => {
  return (
    <PrimaryLayout pageTitle="Message                           ">
      <div className="mb-4 grid gap-10 px-4 py-5 md:mb-0 md:px-6 lg:grid-cols-2 lg:px-[3.156rem] xl:grid-cols-5 ">
        <div className="xl:col-span-2">
          <div className="card_shadow border p-2.5">
            <div className="grid gap-2.5">
              <div className="relative rounded border-[.031rem] border-[#999999]">
                <input
                  className="poppins-400 w-full rounded px-4 py-2 text-base leading-[1.4rem] text-[#999999]"
                  type="text"
                />
                <img
                  className="absolute top-1/2 right-4 -translate-y-1/2"
                  src="./images/message/Search_icon.svg"
                  alt=""
                />
              </div>
              <div className="grid gap-2.5">
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border-b-[.031rem] border-[#999999] py-3 sm:p-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-4">
                    <div className="relative">
                      <div className="aspect-square w-10 overflow-hidden  rounded-full sm:w-[3.125rem]">
                        <img
                          className=""
                          src="./images/message/man.svg"
                          alt=""
                        />
                      </div>
                      <img
                        className="absolute left-0 bottom-0"
                        src="./images/message/green_dot.svg"
                        alt=""
                      />
                    </div>
                    <div className="grow">
                      <div className="text-start">
                        <h4 className="inter-500 text-sm  leading-[1.4rem] text-[#222222] sm:mb-1 sm:text-base">
                          Brooklyn Simmons
                        </h4>
                        <p className="poppins-400 text-xs leading-[1.225rem] text-[#999999] sm:text-sm">
                          How can I help You
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <h5 className="inter-500 text-[.625rem] leading-[1.05rem] text-[#999999] sm:text-xs">
                          15 min ago
                        </h5>
                        <p className=" inter-400 ml-auto mt-1 flex aspect-square w-[1.125rem] items-center justify-center rounded-full bg-[#63AD6F] text-[.625rem] leading-[.875rem] text-white sm:mt-[.375rem]">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card_shadow flex flex-col pb-[1.813rem] xl:col-span-3 ">
          <div className="border-b-[.031rem] border-[#999999] px-5 pt-1 pb-4">
            <div className="flex flex-wrap items-center justify-between">
              <div className="">
                <h2 className="poppins-600 mb-2 text-lg text-[#222222]">
                  Steven Franklin
                </h2>
                <div className="flex flex-wrap items-center justify-start gap-2">
                  <img
                    className="inline-block"
                    src="./images/message/green_dot.svg"
                    alt=""
                    srcSet=""
                  />
                  <h5 className="poppins-600 text-base text-[#999999]">
                    Online
                  </h5>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <img src="./images/message/Search_icon.svg" alt="" srcSet="" />
                <img
                  src="./images/message/three_dot_horizental.svg"
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 pt-5 sm:px-6">
            <div className="mb-5 text-center">
              <h6 className="poppins-400 inline-block rounded-[0.313rem] bg-[#EEEEEE] px-2.5 py-[0.125rem] text-[0.625rem] leading-[.938rem] text-[#9A9A9A]">
                Today
              </h6>
            </div>
            <div className="space-y-[3.125rem] ">
              <div className="flex items-center justify-end">
                <img
                  className="mr-5 inline-block"
                  src="./images/message/three_dot_vartical.svg"
                  alt=""
                />
                <p className="poppins-500 inline-block max-w-[80%] rounded-t-[0.313rem] rounded-bl-[0.313rem] bg-[#F5F6F8] p-2 text-xs leading-[1.125rem] text-[#222222]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
                  aperiam omnis quam cumque nisi. Dolore repudiandae corrupti
                  nisi facilis sit?
                </p>
                <div className="self-end">
                  <img
                    className=""
                    src="./images/message/try_angel_white.svg"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <img
                  className="mr-5 inline-block"
                  src="./images/message/three_dot_vartical.svg"
                  alt=""
                />
                <p className="poppins-500 inline-block max-w-[80%] rounded-t-[0.313rem] rounded-bl-[0.313rem] bg-[#F5F6F8] p-2 text-xs leading-[1.125rem] text-[#222222]">
                  Lorem ipsum dolor
                </p>
                <div className="self-end">
                  <img
                    className=""
                    src="./images/message/try_angel_white.svg"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <img
                  className="mr-5 inline-block"
                  src="./images/message/three_dot_vartical.svg"
                  alt=""
                />
                <p className="poppins-500 inline-block max-w-[80%] rounded-t-[0.313rem] rounded-bl-[0.313rem] bg-[#F5F6F8] p-2 text-xs leading-[1.125rem] text-[#222222]">
                  plz....
                </p>
                <div className="self-end">
                  <img
                    className=""
                    src="./images/message/try_angel_white.svg"
                    alt=""
                  />
                </div>
              </div>

              <div className="flex items-center justify-start">
                <div className="self-end">
                  <img
                    className=""
                    src="./images/message/try_angle.svg"
                    alt=""
                  />
                </div>
                <p className="poppins-500 inline-block max-w-[80%] rounded-t-[0.313rem] rounded-br-[0.313rem] bg-[#0D0D10] p-2 text-xs leading-[1.125rem] text-[#FFFFFF]">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Sapiente cumque unde assumenda tempore fugiat quae tempora
                  veritatis libero? Omnis, totam.
                </p>
                <img
                  className="ml-5 inline-block"
                  src="./images/message/three_dot_vartical.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="mt-7 px-4 sm:px-6">
            <div className="flex h-full w-full flex-wrap items-center gap-1 sm:gap-5">
              <input
                className="poppins-400 w-full flex-1 rounded border-[.031rem] border-[#999999] px-4 py-2 text-base leading-[1.4rem] text-[#999999]"
                type="text"
                placeholder="Enter Message..."
              />
              <button
                className="poppins-500 flex h-full items-center rounded-lg bg-[#0D0D10] p-2.5 text-xs text-white sm:text-base"
                type="submit">
                Send{" "}
                <img
                  className="ml-1 inline-block w-2.5 p-0 sm:ml-[0.938rem] sm:w-auto sm:p-1"
                  src="./images/message/send_icon.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default Chat;
