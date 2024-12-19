import {
  ChatIcon,
  DashboardIcon,
  EarningIcon,
  EventIcon,
  HistoryIcon,
  LotteryIcon,
  PartnerIcon,
  PaymentIcon,
  RequestIcon,
  SettingIcon,
  SliderIcon,
  UserIcon,
} from "./SideNavigationIcons";

export const sidebarDatas = [
  {
    id: 1,
    title: "MENU",
    mainMenus: [
      {
        id: 11,
        name: "Dashboard",
        url: "/",
        icon: (
          <DashboardIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [],
      },
    ],
  },
  {
    id: 2,
    title: "APP MANAGEMENT",
    mainMenus: [
      {
        id: 12,
        name: "Manage Lottery",
        url: "",
        icon: (
          <LotteryIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          { id: 21, name: "Lotteries", url: "/manage-lottery/lotteries" },
          { id: 22, name: "Manual Draw", url: "/manage-lottery/manual-draw" },
        ],
      },
      {
        id: 2,
        name: "Manage Users",
        url: "",
        icon: (
          <UserIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          { id: 23, name: "All User", url: "/manage-users/all-user" },
          { id: 24, name: "Active User", url: "/manage-users/active-user" },
          { id: 25, name: "Block User", url: "/manage-users/block-user" },
        ],
      },
      {
        id: 3,
        name: "Manage Slider",
        url: "",
        icon: (
          <SliderIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          {
            id: 28,
            name: "Onboarding Slider",
            url: "/manage-slider/onboarding-slider",
          },
        ],
      },
      {
        id: 6,
        name: "Scratchcards",
        url: "/manage-scratchcards",
        icon: (
          <LotteryIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
      },
      {
        id: 5,
        name: "Partner",
        url: "",
        icon: (
          <PartnerIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          {
            id: 30,
            name: "Host",
            url: "/partner/host",
          },
          { id: 2, name: "Agent", url: "/partner/agent" },
          { id: 3, name: "Reseller", url: "/partner/reseller" },
        ],
      },
      {
        id: 7,
        name: "History",
        url: "",
        icon: (
          <HistoryIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          { id: 31, name: "Package History", url: "/history" },
          { id: 32, name: "Winner History", url: "/history/winner-history" },
          {
            id: 33,
            name: "Transaction History",
            url: "/history/transaction-history",
          },
        ],
      },
      {
        id: 8,
        name: "Request",
        url: "/request",
        icon: (
          <RequestIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [],
      },
    ],
  },
  {
    id: 3,
    title: "PAYMENTS",
    mainMenus: [
      {
        id: 13,
        name: "Wallet",
        url: "",
        icon: (
          <PaymentIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          {
            id: 1,
            name: "Mobile Banking",
            url: "/wallet/mobile-banking",
          },
          {
            id: 2,
            name: "Banking",
            url: "/wallet/banking",
          },
          {
            id: 3,
            name: "Crypto Currency",
            url: "/wallet/crypto-currency",
          },
        ],
      },
      {
        id: 20,
        name: "Withdraw",
        url: "",
        icon: (
          <PaymentIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          {
            id: 1,
            name: "Mobile Withdraw",
            url: "/withdraw/mobile-banking",
          },
          {
            id: 2,
            name: "Banking Withdraw",
            url: "/withdraw/banking",
          },
          {
            id: 3,
            name: "Crypto Withdraw",
            url: "/withdraw/crypto-currency",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "SETTINGS",
    mainMenus: [
      {
        id: 14,
        name: "Setting",
        url: "",
        icon: (
          <SettingIcon className="focus:fill-white active:fill-white group-hover:fill-white" />
        ),
        submenu: [
          {
            id: 1,
            name: "Update Profile",
            url: "/setting/update-profile",
          },
        ],
      },
    ],
  },
];
