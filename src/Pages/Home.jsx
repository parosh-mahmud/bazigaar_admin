import React, { Fragment, useEffect, useState } from "react";
import Cards from "../Component/dashboard/Cards";
import PrimaryLayout from "../Component/layouts/PrimaryLayout";
import { toast } from "react-hot-toast";
import { UnAuth } from "./Auth/UnAuth";
import { ENDPOINT } from "../App/config/endpoint";
import axios from "axios";
import Charts from "../Component/dashboard/Charts";

const Home = () => {
  const [data, setDatas] = useState([]);
  const [data2, setDatas2] = useState({});

  // fetching user data
  const getAllInfo = () => {
    const token = JSON.parse(localStorage.getItem("authInfo"));

    axios
      .get(
        `${process.env.REACT_APP_MAIN_URL}/api${ENDPOINT?.dashboard?.dashboardInfo}`,
        {
          headers: {
            Authorization: "token " + token.token,
          },
        }
      )
      .then((res) => {
        // console.log("Res", res)
        if (res.data.type === "error") {
          toast.error(res.data.msg);
        } else {
          setDatas(res.data);
        }
      })
      .catch((e) => {
        UnAuth(e);
      });
  };

  useEffect(() => {
    getAllInfo();
  }, []);
  // fetching chart data
  const getChartInfo = () => {
    const token = JSON.parse(localStorage.getItem("authInfo"));

    axios
      .get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT?.dashboard?.dashboardChart}`,
        {
          headers: {
            Authorization: "token " + token.token,
          },
        }
      )
      .then((res) => {
        // console.log("Res", res)
        if (res.data.type === "error") {
          toast.error(res.data.msg);
        } else {
          setDatas2(res.data);
        }
      })
      .catch((e) => {
        UnAuth(e);
      });
  };

  useEffect(() => {
    getChartInfo();
  }, []);

  return (
    <Fragment>
      <PrimaryLayout>
        <Cards data={data} />
        <Charts data={data2} />
      </PrimaryLayout>
    </Fragment>
  );
};

export default Home;
