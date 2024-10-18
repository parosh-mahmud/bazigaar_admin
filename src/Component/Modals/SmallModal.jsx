import React, { useEffect, useRef } from "react";
import Transition from "../../utils/Transition";

function SmallModal({ title, modalOpen, setModalOpen, modalContent }) {
  const modalContentRef = useRef(null);
  // close on click outside
  //   useEffect(() => {
  //     const clickHandler = ({ target }) => {
  //       if (!modalOpen || modalContent.current.contains(target))
  //         return setModalOpen(false);
  //     };
  //     document.addEventListener("click", clickHandler);
  //     return () => document.removeEventListener("click", clickHandler);
  //   });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });
  const handleModal = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };
  return (
    <div className={`${modalOpen === true ? "block" : "hidden"}`}>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 z-50 bg-slate-900 bg-opacity-30 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <Transition
        className="fixed inset-0 top-20 z-50 mb-4 flex transform items-start justify-center overflow-hidden px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4">
        <div
          ref={modalContentRef}
          className={`max-h-full w-full max-w-xl overflow-auto rounded bg-white shadow-lg`}>
          <div className="flex items-center justify-between border-b p-3 lg:p-6">
            <h1 className="font-poppins text-[18px] font-semibold text-blackText">
              {title}
            </h1>
            <button onClick={(e) => handleModal(e)}>
              <svg
                style={{ color: "#222222" }}
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
              </svg>
            </button>
          </div>
          <div className="p-3 lg:p-6">{modalContent}</div>
        </div>
      </Transition>
    </div>
  );
}

export default SmallModal;
