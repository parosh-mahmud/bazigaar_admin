// src/Pages/Lottery/WinnerView.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PrimaryLayout from "../../Component/layouts/PrimaryLayout";
import { ENDPOINT } from "../../App/config/endpoint";
import { toast } from "react-hot-toast";
import { UnAuth } from "../Auth/UnAuth";

export default function WinnerView() {
  const { lotteryId } = useParams();
  const navigate = useNavigate();
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if param is missing, bounce back
    if (!lotteryId) {
      toast.error("Missing LotteryId, returning to lotteries.");
      return navigate("/manage-lottery/lotteries", { replace: true });
    }

    async function fetchWinners() {
      try {
        const token = JSON.parse(localStorage.getItem("authInfo"))?.token;
        const res = await axios.get(
          `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.winnerList}${lotteryId}`,
          { headers: { Authorization: "Token " + token } }
        );
        setWinners(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          UnAuth(err);
        } else {
          toast.error(err.response?.data?.message || "Failed to load winners");
        }
        navigate("/manage-lottery/lotteries", { replace: true });
      } finally {
        setLoading(false);
      }
    }

    fetchWinners();
  }, [lotteryId, navigate]);

  if (loading) {
    return (
      <PrimaryLayout pageTitle="Winner List">
        <div className="p-4 text-center">Loading winners…</div>
      </PrimaryLayout>
    );
  }

  return (
    <PrimaryLayout pageTitle="Winner List">
      {winners.length === 0 ? (
        <div className="p-4 text-gray-500">No winners found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Username
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Ticket ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Prize Type
                </th>
              </tr>
            </thead>
            <tbody>
              {winners.map((w) => (
                <tr key={w.ticketId} className="border-b">
                  <td className="px-4 py-2 text-sm text-gray-800">{w.username}</td>
                  <td className="px-4 py-2 text-sm font-mono text-gray-800">{w.ticketId}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{w.prizeType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PrimaryLayout>
  );
}
