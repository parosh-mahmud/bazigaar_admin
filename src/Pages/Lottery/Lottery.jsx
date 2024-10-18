import React, { Fragment, useEffect, useState } from "react";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import AllLotteryTable from "../../Component/Lottery/AllLotteryTable";
import CreateNewLottery from "../../Component/Lottery/CreateNewLottery";
import Modal from "../../Component/Modals/Modal";
import { toast } from "react-hot-toast";
import { ENDPOINT } from "../../App/config/endpoint";
import axios from "axios";
import { UnAuth } from "../Auth/UnAuth";

const Lottery = ({ isLoading, setIsLoading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(
    <CreateNewLottery
      setModalOpen={setModalOpen}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />
  );
  const [tableDatas, setTableDatas] = useState([]);
  const [tableDatas2, setTableDatas2] = useState([]);
  const token = JSON.parse(localStorage.getItem("authInfo"));
  useEffect(() => {
    setModalOpen(false);
  }, []);
  const handleData = () => {
    axios
      .get(
        // `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getTicket}`,
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.ticket?.getTicket}`,
        {
          headers: {
            Authorization: "Token " + token.token,
          },
        }
      )
      .then((res) => {
        if (res.data.type === "error") {
          toast.error(res.message);
        } else {
          console.log(res.data);
          let temp = res.data;
          temp = temp.reverse();
          setTableDatas(temp);
          setTableDatas2(temp);
        }
      })
      .catch((e) => {
        // console.log(e);
        UnAuth(e);
      });
  };
  useEffect(() => {
    handleData();
  }, []);

  const handleModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
    setModalContent(
      <CreateNewLottery
        setModalOpen={setModalOpen}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        handleData={handleData}
      />
    );
  };
  return (
    <Fragment>
      <PrimaryLayout pageTitle="All Lotteries">
        <AllLotteryTable
          handleModal={handleModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          handleData={handleData}
          tableDatas={tableDatas}
          tableDatas2={tableDatas2}
          setTableDatas2={setTableDatas2}
        />

        <Modal
          title="Create New Lottery"
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          modalContent={modalContent}
        />
      </PrimaryLayout>
    </Fragment>
  );
};

export default Lottery;
