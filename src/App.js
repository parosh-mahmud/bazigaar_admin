// import React, { lazy, Suspense, useState } from "react";
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import PageNotFound from "./Pages/PageNotFound";
// import GlobalLoader from "./GlobalLoader";
// import PrivateRoute from "./Component/Shared/PrivateRoute";
// import MobileWithdraw from "./Pages/Withdraw/MobileWithdraw";
// import BankWithdraw from "./Pages/Withdraw/BankWithdraw";
// import CryptoWithdraw from "./Pages/Withdraw/CryptoWithdraw";

// const Login = lazy(() => import("./Pages/Auth/Login"));
// const Registration = lazy(() => import("./Pages/Auth/Registration"));
// const AllReseller = lazy(() => import("./Pages/ManageReseller/AllReseller"));
// const AllAgent = lazy(() => import("./Pages/ManageAgent/AllAgent"));
// const UserDetails = lazy(() => import("./Component/ManageUser/UserDetails"));
// const BlockedUser = lazy(() => import("./Pages/ManageUser/BlockedUser"));
// const AllHost = lazy(() => import("./Pages/ManageHost/AllHost"));
// const Home = lazy(() => import("./Pages/Home"));
// const Lottery = lazy(() => import("./Pages/Lottery/Lottery"));
// const ManualDraw = lazy(() => import("./Pages/Lottery/ManualDraw"));
// const StartManualDraw = lazy(() =>
//   import("./Component/Lottery/ManualDraw/StartManualDraw")
// );
// const AllUser = lazy(() => import("./Pages/ManageUser/AllUser"));
// const ActiveUser = lazy(() => import("./Pages/ManageUser/ActiveUser"));
// const OnboardingSlider = lazy(() => import("./Pages/Slider/OnboardingSlider"));
// const AllEvents = lazy(() => import("./Pages/ManageEvents/AllEvents"));
// const RecoverAccount = lazy(() => import("./Pages/Auth/RecoverAccount"));
// const Chat = lazy(() => import("./Pages/Chat"));
// const AllHistory = lazy(() => import("./Pages/History/AllHistory"));
// const WinnerHistory = lazy(() => import("./Pages/History/WinnerHistory"));
// const TransactionHistory = lazy(() =>
//   import("./Pages/History/TransactionHistory")
// );
// const LotteryHistory = lazy(() =>
//   import("./Component/AllHistory/LotteryHistory")
// );
// const LotteryWinnerHistory = lazy(() =>
//   import("./Component/AllHistory/LotteryWinnerHistory")
// );
// const Request = lazy(() => import("./Pages/Request/Request"));
// const ProfileUpdate = lazy(() => import("./Pages/Settings/ProfileUpdate"));
// const RequestDetails = lazy(() => import("./Pages/Request/RequestDetails"));
// const CryptoCurrency = lazy(() => import("./Pages/Wallet/CryptoCurrency"));
// const Banking = lazy(() => import("./Pages/Wallet/Banking"));
// const MobileBanking = lazy(() => import("./Pages/Wallet/MobileBanking"));
// const Scratchcards = lazy(() =>
//   import("./Component/manage-scratchcards/AllScratchCards")
// );

// const WinnerView = lazy(() => import("./Pages/Lottery/WinnerView"));
// export default function App() {
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <Suspense fallback={<GlobalLoader />}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/loding" element={<GlobalLoader />} />
//           <Route
//             path="/login"
//             element={
//               <Login isLoading={isLoading} setIsLoading={setIsLoading} />
//             }
//           />
//           <Route path="/registration" element={<Registration />} />
//           <Route path="/recover-account" element={<RecoverAccount />} />
//           <Route path="/" element={<PrivateRoute />}>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/manage-lottery/lotteries"
//               element={
//                 <Lottery isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />

//             <Route path="/manage-scratchcards" element={<Scratchcards />} />
//             <Route
//               path="/manage-lottery/manual-draw"
//               element={
//                 <ManualDraw isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/manage-lottery/package/:id"
//               element={
//                 <StartManualDraw
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />

//             <Route
//               path="/manage-users/all-user"
//               element={
//                 <AllUser isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/manage-users/user-details/:id"
//               element={
//                 <UserDetails
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/manage-users/active-user"
//               element={
//                 <ActiveUser isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/manage-users/block-user"
//               element={
//                 <BlockedUser
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/manage-slider/onboarding-slider"
//               element={
//                 <OnboardingSlider
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/manage-event/all-event"
//               element={
//                 <AllEvents isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/partner/agent"
//               element={
//                 <AllAgent isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/partner/reseller"
//               element={
//                 <AllReseller
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/partner/host"
//               element={
//                 <AllHost isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/history"
//               element={
//                 <AllHistory isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/history/sold-lottery/:id"
//               element={
//                 <LotteryHistory
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/history/draw-winner/:id"
//               element={
//                 <LotteryWinnerHistory
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/request"
//               element={
//                 <Request isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/request-details/:id"
//               element={
//                 <RequestDetails
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />

//             <Route
//               path="/chat"
//               element={
//                 <Chat isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/wallet/crypto-currency"
//               element={
//                 <CryptoCurrency
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/wallet/banking"
//               element={
//                 <Banking isLoading={isLoading} setIsLoading={setIsLoading} />
//               }
//             />
//             <Route
//               path="/wallet/mobile-banking"
//               element={
//                 <MobileBanking
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/withdraw/mobile-banking"
//               element={
//                 <MobileWithdraw
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/withdraw/banking"
//               element={
//                 <BankWithdraw
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/withdraw/crypto-currency"
//               element={
//                 <CryptoWithdraw
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//             <Route
//               path="/setting/update-profile"
//               element={
//                 <ProfileUpdate
//                   isLoading={isLoading}
//                   setIsLoading={setIsLoading}
//                 />
//               }
//             />
//           </Route>
//           <Route
//             path="/history/winner-history"
//             element={
//               <WinnerHistory
//                 isLoading={isLoading}
//                 setIsLoading={setIsLoading}
//               />
//             }
//           />
//           <Route
//             path="/history/transaction-history"
//             element={
//               <TransactionHistory
//                 isLoading={isLoading}
//                 setIsLoading={setIsLoading}
//               />
//             }
//           />
//           <Route
//             path="/manage-lottery/winner-list"
//             element={
//               <WinnerList isLoading={isLoading} setIsLoading={setIsLoading} />
//             }
//           />
//           <Route
//             path="/manage-lottery/:lotteryId/winners"
//             element={
//               <WinnerView isLoading={isLoading} setIsLoading={setIsLoading} />
//             }
//           />
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </Suspense>
//   );
// }

// src/App.js
import React, { lazy, Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import GlobalLoader from "./GlobalLoader";
import PrivateRoute from "./Component/Shared/PrivateRoute";
import MobileWithdraw from "./Pages/Withdraw/MobileWithdraw";
import BankWithdraw from "./Pages/Withdraw/BankWithdraw";
import CryptoWithdraw from "./Pages/Withdraw/CryptoWithdraw";

const Login = lazy(() => import("./Pages/Auth/Login"));
const Registration = lazy(() => import("./Pages/Auth/Registration"));
const RecoverAccount = lazy(() => import("./Pages/Auth/RecoverAccount"));

const Home = lazy(() => import("./Pages/Home"));
const LotteryList = lazy(() => import("./Pages/Lottery/LotteryList"));
const ManualDraw = lazy(() => import("./Pages/Lottery/ManualDraw"));
const StartManualDraw = lazy(() =>
  import("./Component/Lottery/ManualDraw/StartManualDraw")
);
const WinnerView = lazy(() => import("./Pages/Lottery/WinnerView"));

const AllUser = lazy(() => import("./Pages/ManageUser/AllUser"));
const ActiveUser = lazy(() => import("./Pages/ManageUser/ActiveUser"));
const UserDetails = lazy(() => import("./Component/ManageUser/UserDetails"));
const BlockedUser = lazy(() => import("./Pages/ManageUser/BlockedUser"));

const AllAgent = lazy(() => import("./Pages/ManageAgent/AllAgent"));
const AllReseller = lazy(() => import("./Pages/ManageReseller/AllReseller"));
const AllHost = lazy(() => import("./Pages/ManageHost/AllHost"));

const OnboardingSlider = lazy(() => import("./Pages/Slider/OnboardingSlider"));
const Scratchcards = lazy(() =>
  import("./Component/manage-scratchcards/AllScratchCards")
);

const AllEvents = lazy(() => import("./Pages/ManageEvents/AllEvents"));
const Chat = lazy(() => import("./Pages/Chat"));
const Request = lazy(() => import("./Pages/Request/Request"));
const RequestDetails = lazy(() => import("./Pages/Request/RequestDetails"));

const AllHistory = lazy(() => import("./Pages/History/AllHistory"));
const WinnerHistory = lazy(() => import("./Pages/History/WinnerHistory"));
const TransactionHistory = lazy(() =>
  import("./Pages/History/TransactionHistory")
);
const LotteryHistory = lazy(() =>
  import("./Component/AllHistory/LotteryHistory")
);
const LotteryWinnerHistory = lazy(() =>
  import("./Component/AllHistory/LotteryWinnerHistory")
);

const CryptoCurrency = lazy(() => import("./Pages/Wallet/CryptoCurrency"));
const Banking = lazy(() => import("./Pages/Wallet/Banking"));
const MobileBanking = lazy(() => import("./Pages/Wallet/MobileBanking"));

const ProfileUpdate = lazy(() => import("./Pages/Settings/ProfileUpdate"));
const Lottery = lazy(() => import("./Pages/Lottery/Lottery"));
export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Suspense fallback={<GlobalLoader />}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/loading" element={<GlobalLoader />} />
          <Route
            path="/login"
            element={
              <Login isLoading={isLoading} setIsLoading={setIsLoading} />
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/recover-account" element={<RecoverAccount />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />

            {/* Lottery */}
            {/* 2) card-style lottery list */}
            <Route path="/manage-lottery/cards" element={<LotteryList />} />

            <Route
              path="/manage-lottery/lotteries"
              element={
                <Lottery isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/manage-lottery/:lotteryId/winners"
              element={
                <WinnerView isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/manage-lottery/manual-draw"
              element={
                <ManualDraw isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/manage-lottery/package/:id"
              element={
                <StartManualDraw
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            {/* Users */}
            <Route
              path="/manage-users/all-user"
              element={
                <AllUser isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/manage-users/active-user"
              element={
                <ActiveUser isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/manage-users/user-details/:id"
              element={
                <UserDetails
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/manage-users/block-user"
              element={
                <BlockedUser
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            {/* Partners */}
            <Route
              path="/partner/agent"
              element={
                <AllAgent isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/partner/reseller"
              element={
                <AllReseller
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/partner/host"
              element={
                <AllHost isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />

            {/* Slider */}
            <Route
              path="/manage-slider/onboarding-slider"
              element={
                <OnboardingSlider
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            {/* Scratchcards */}
            <Route path="/manage-scratchcards" element={<Scratchcards />} />

            {/* Events */}
            <Route
              path="/manage-event/all-event"
              element={
                <AllEvents isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />

            {/* Chat */}
            <Route
              path="/chat"
              element={
                <Chat isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />

            {/* Requests */}
            <Route
              path="/request"
              element={
                <Request isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/request-details/:id"
              element={
                <RequestDetails
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            {/* History */}
            <Route
              path="/history"
              element={
                <AllHistory isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/history/winner-history"
              element={
                <WinnerHistory
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/history/transaction-history"
              element={
                <TransactionHistory
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/history/sold-lottery/:id"
              element={
                <LotteryHistory
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/history/draw-winner/:id"
              element={
                <LotteryWinnerHistory
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            {/* Wallet */}
            <Route
              path="/wallet/crypto-currency"
              element={
                <CryptoCurrency
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/wallet/banking"
              element={
                <Banking isLoading={isLoading} setIsLoading={setIsLoading} />
              }
            />
            <Route
              path="/wallet/mobile-banking"
              element={
                <MobileBanking
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            {/* Withdraw */}
            <Route
              path="/withdraw/mobile-banking"
              element={
                <MobileWithdraw
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/withdraw/banking"
              element={
                <BankWithdraw
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route
              path="/withdraw/crypto-currency"
              element={
                <CryptoWithdraw
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            {/* Settings */}
            <Route
              path="/setting/update-profile"
              element={
                <ProfileUpdate
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
