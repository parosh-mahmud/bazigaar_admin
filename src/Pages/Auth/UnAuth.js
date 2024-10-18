import toast from "react-hot-toast";

export const UnAuth = (e) => {
  const value = e?.response;

  if (value?.status) {
    if (value?.status === 401 || value?.status === 403) {
      localStorage.removeItem("authInfo");
      localStorage.removeItem("WalletID");
      toast.error(value?.statusText ? value?.statusText : "Network Error");
      setTimeout(() => {
        window.location.reload(true);
      }, 100);
    } else {
      toast.error(value?.statusText ? value?.statusText : "Network Error");
    }
  } else {
    toast.error("Network Error");
    localStorage.removeItem("authInfo");
    setTimeout(() => {
      window.location.reload(true);
    }, 100);
  }
};
