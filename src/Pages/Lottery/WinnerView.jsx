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
    if (!lotteryId) {
      toast.error("Missing LotteryId, returning to lotteries.");
      return navigate("/manage-lottery/lotteries", { replace: true });
    }
    fetchWinners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotteryId]);

  const fetchWinners = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("authInfo"))?.token;
      const response = await axios.get(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.winnerList}${lotteryId}`,
        {
          headers: { Authorization: "Token " + token },
        }
      );
      setWinners(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        UnAuth(err);
      } else {
        toast.error(err.response?.data?.error || "Failed to load winners");
      }
      navigate("/manage-lottery/lotteries", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const toggleClaim = async (ticket) => {
    // Only allow toggling once request_status === "approved"
    if (ticket.request_status !== "approved") {
      toast.error(
        ticket.request_status === "pending"
          ? "Cannot mark claimed until the request is approved."
          : "No approved request to toggle."
      );
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("authInfo"))?.token;
      await axios.patch(
        `${process.env.REACT_APP_MAIN_URL}${ENDPOINT.ticket.updateClaimStatus}${lotteryId}`,
        {
          number: ticket.ticket_number,
          claim_status: !ticket.claim_status,
        },
        { headers: { Authorization: "Token " + token } }
      );
      toast.success("Claim status updated");
      fetchWinners();
    } catch (err) {
      toast.error(err.response?.data?.error || "Could not update claim");
    }
  };

  return (
    <PrimaryLayout pageTitle="Winner List">
      {loading ? (
        <div className="p-6 text-center text-gray-600">Loading winners…</div>
      ) : !winners.length ? (
        <div className="p-6 text-center text-gray-500">
          No winners found for this draw.
        </div>
      ) : (
        <div className="overflow-auto p-4">
          <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Ticket
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Prize
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Claim Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
     

{winners.map((w, idx) => {
  let statusBadge;
  if (w.claim_status) {
    statusBadge = (
      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
        Claimed
      </span>
    );
  } else if (w.request_status === "pending") {
    statusBadge = (
      <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
        Pending
      </span>
    );
  } else {
    statusBadge = (
      <span className="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
        Not Claimed
      </span>
    );
  }

  return (
    <tr key={w.ticket_number}>
      <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>
      <td className="px-4 py-3 text-sm font-mono text-gray-800">{w.ticket_number}</td>
      <td className="px-4 py-3 text-sm text-gray-800">{w.prize}</td>
      <td className="px-4 py-3">{statusBadge}</td>
      <td className="px-4 py-3 text-sm text-gray-800">{w.claim_type || "-"}</td>
      <td className="px-4 py-3 text-sm text-gray-800">
        {w.claim_type === "product" ? w.address || "-" : "-"}
      </td>
      <td className="px-4 py-3 space-x-2">
        <button
          onClick={() => toggleClaim(w)}
          className={`px-3 py-1 text-xs font-medium rounded ${
            w.claim_status 
              ? "bg-red-100 text-red-800 hover:bg-red-200" 
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
          disabled={w.request_status !== "approved"}
          title={
            w.request_status !== "approved" 
              ? "Waiting for request approval" 
              : w.claim_status 
                ? "Click to revoke claim" 
                : "Click to mark as claimed"
          }
        >
          {w.claim_status ? "Revoke" : "Mark Claimed"}
        </button>
        {w.request_status === "pending" && (
          <span className="inline-block px-2 py-1 text-xs text-yellow-700 bg-yellow-50 rounded">
            Pending Approval
          </span>
        )}
      </td>
    </tr>
  );
})}


            </tbody>
          </table>
        </div>
      )}
    </PrimaryLayout>
  );
}
