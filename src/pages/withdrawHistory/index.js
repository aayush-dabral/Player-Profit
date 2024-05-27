import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "../../components";

import { currenyFormatter } from "../../utils/helper-functions";

function WithdrawHistory() {
  const [withdrawHistoryData, setWithdrawHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const withdrawHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        import.meta.env.VITE_REACT_APP_BACKEND_API_URL + "withdrawl/challenge/transaction",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("accessToken") || "",
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        const response = await res.json();
        setWithdrawHistoryData(response);
        setIsLoading(false);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  const finalWithdrawAfterApproval = async (withdrawId) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_REACT_APP_BACKEND_API_URL + "withdrawl/challenge/transaction/claim",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token " + localStorage.getItem("accessToken") || "",
          },
          body: JSON.stringify({
            withdrawl_transaction_id: withdrawId,
          }),
        }
      );
      if (res.status === 200 || res.status === 201) {
        const response = await res.json();
        if (response.message === "success") {
          toast.success("Please check the SMS sent to the registered Mobile Number.");
          withdrawHistory();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!");
    }
  };

  useEffect(() => {
    withdrawHistory();
  }, []);

  return (
    <div className="flex flex-col p-6 text-white w-full border-l-2 border-b-2 border-[#161616] min-h-[60vh]">
      <div className="hidden lg:block lg:w-[94%] xl:w-[80%] pb-16">
        {/* Payment History */}
        <div className="text-2xl pt-8 ml-8">
          {/* Heading */}
          Withdraw Transaction
        </div>
        <div className=" pt-8">
          {/* Main table */}

          {isLoading ? (
            <Loader height="3.5%" width="3.5%" />
          ) : (
            <table className="table-auto w-[94%] mx-auto pt-8">
              <thead>
                <tr className="border-b-2 border-b-[#191919] border-spacing-4 text-[#FFFFFF4D]">
                  <th className="pb-5">Withdrawal Date</th>
                  <th className="pb-5">Payment Status</th>
                  <th className="pb-5">Applied balance</th>
                  <th className="pb-5">Cash Withdraw</th>
                  <th className="pb-5">Action</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {withdrawHistoryData && withdrawHistoryData.length ? (
                  withdrawHistoryData.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="p-5 border-b-2 border-b-[#191919]">
                        {transaction?.withdrawl_date || "-"}
                      </td>
                      <td className="p-5 border-b-2 border-b-[#191919]">
                        {transaction?.payment_status === "ApprovalPending" && (
                          <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">
                            Pending for approval
                          </div>
                        )}
                        {transaction?.payment_status === "Approved" && (
                          <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Approved</div>
                        )}
                        {transaction?.payment_status === "Failed" && (
                          <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Failed</div>
                        )}
                        {transaction?.payment_status === "Claimed" && (
                          <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Claimed</div>
                        )}
                        {transaction?.payment_status === "Paid" && (
                          <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Paid</div>
                        )}
                      </td>
                      <td className="p-5 border-b-2 border-b-[#191919]">
                        {currenyFormatter.format(transaction?.applied_balance)}
                      </td>
                      <td className="p-5 border-b-2 border-b-[#191919]">
                        {currenyFormatter.format(transaction?.cash_withdraw)}
                      </td>
                      <td className="p-5 border-b-2 border-b-[#191919]">
                        {transaction?.payment_status === "Approved" ? (
                          <button
                            onClick={() => finalWithdrawAfterApproval(transaction?.id)}
                            className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-full text-black text-center py-2 px-2 font-bold"
                          >
                            Cash out
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <div className="w-full flex items-center justify-center mt-6">No Data Found!</div>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* For smaller Screen  */}
      <div className="w-full pb-10 my-4 lg:hidden">
        <div className="text-2xl w-[90%] mx-auto mb-8">Withdraw transaction</div>
        {isLoading ? (
          <Loader />
        ) : withdrawHistoryData && withdrawHistoryData.length ? (
          withdrawHistoryData.map((transaction) => (
            <div className="bg-[#0D0D0D] w-[90%] mx-auto mb-8 rounded-xl">
              <div className="pt-4 px-2 py-1 ml-6 text-xl text-center">
                {/* Payment status  */}
                {transaction?.payment_status === "ApprovalPending" && (
                  <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">
                    Pending for approval
                  </div>
                )}
                {transaction?.payment_status === "Approved" && (
                  <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Approved</div>
                )}
                {transaction?.payment_status === "Failed" && (
                  <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Failed</div>
                )}
                {transaction?.payment_status === "Claimed" && (
                  <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Claimed</div>
                )}
                {transaction?.payment_status === "Paid" && (
                  <div className="bg-[#121705] text-[#F11941] rounded-lg p-2">Paid</div>
                )}
              </div>

              <div className="mt-6 ml-8">
                <div className="flex w-full ">
                  <div className="w-[50%]">
                    {/* Amount Paid  */}
                    <div className="text-[#868686]">Applied balance</div>
                    <div className=" mt-2">{transaction?.applied_balance}</div>
                  </div>
                  <div className="w-[50%]">
                    {/* Purchase Date  */}
                    <div className="text-[#868686]">Cash Withdraw</div>
                    <div className=" mt-2">{transaction?.cash_withdraw}</div>
                  </div>
                </div>

                <div className="flex w-full mt-4 pb-6">
                  <div className="w-[50%]">
                    {/* Transaction ID  */}
                    <div className="text-[#868686]">Withdrawl Date</div>
                    <div className=" mt-2">{transaction.withdrawl_date || "-"}</div>
                  </div>
                  <div className="w-[50%]">
                    {/* Purchase via  */}
                    <div className="text-[#868686]">Action</div>
                    <div className=" mt-2">
                      {transaction.payment_status === "Approved" ? (
                        <button
                          onClick={() => finalWithdrawAfterApproval(transaction?.id)}
                          className="rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] w-full text-black text-center py-2 px-2 font-bold"
                        >
                          Cash out
                        </button>
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">No Data Found!</div>
        )}
      </div>
    </div>
  );
}

export default WithdrawHistory;
