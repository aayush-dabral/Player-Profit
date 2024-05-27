import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getPaymentHistory, resetPaymentHistory } from "../../../redux/action/paymentHistory";
import { useDispatch, useSelector } from "react-redux";

//checking

import { toast } from "react-toastify";
import { Loader } from "../../../components";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentHistoryData = useSelector(state => { return state?.getPaymentHistoryReducer?.paymentHistory });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (token) {
    // } else {
    //   navigation.push("login");
    // }
    setIsLoading(true)
    dispatch(getPaymentHistory(""));
  }, []);

  const scrollContainerRef = useRef(null);

  function scrollSidebar(direction) {
    const container = scrollContainerRef.current;

    if (container) {
      const scrollAmount = 100; // Adjust scroll amount as needed

      if (direction === "left") {
        container.scrollLeft -= scrollAmount; // Scroll left
      } else {
        container.scrollLeft += scrollAmount; // Scroll right
      }
    }
  }

  useEffect(() => {
    if (paymentHistoryData?.status) {
      if (
        paymentHistoryData?.data?.data?.length === 0
      ) {
        setData([]);
        window.scrollTo(0, 0)
        toast({
          type: "error",
          props: {
            heading: "Payment History",
            desc: "No data found.",
          },
        });
        setIsLoading(false);
        dispatch(resetPaymentHistory());
      } else if (
        paymentHistoryData?.data?.data?.length >= 1
      ) {
        setData(paymentHistoryData?.data?.data);
        setIsLoading(false);
      }
    }
  }, [paymentHistoryData]);

  return (
    <div className="flex flex-col text-white border-b-2 border-b-[#161616] min-h-screen
    xl:flex-row">
      <div
        className="hidden
        lg:block lg:w-[94%]
        xl:w-[80%] pb-16 border-l-2 border-l-[#191919]"
      >
        {/* Payment History */}
        <div className="text-2xl pt-8 ml-8">
          {/* Heading */}
          Order Details
        </div>
        <div>{/* Date Filter */}</div>
        <div className=" pt-8">
          {/* Main table */}

          {isLoading ? <Loader height='3.5%' width='3.5%'/> : <table className="table-auto w-[94%] mx-auto pt-8">
            <thead>
              <tr className="border-b-2 border-b-[#191919] border-spacing-4 text-[#FFFFFF4D]">
                <th className="pb-5">Transaction ID</th>
                <th className="pb-5">Purchase Date</th>
                <th className="pb-5">Package Name/Type</th>
                <th className="pb-5">Payment Status</th>
                <th className="pb-5">Paid via</th>
                <th className="pb-5">Amount Paid</th>
              </tr>
            </thead>
            
            <tbody className="text-center">
              {data && data.length ? data.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="p-5 border-b-2 border-b-[#191919]">
                    {transaction?.transaction_id}
                  </td>
                  <td className="p-5 border-b-2 border-b-[#191919]">
                    {transaction?.date}
                  </td>
                  <td className="p-5 border-b-2 border-b-[#191919]">
                    {transaction?.details}
                  </td>
                  <td className="p-5 border-b-2 border-b-[#191919]">
                    {transaction?.status === "Confirmed" || "Paid" ? (
                      <div className="bg-[#121705] text-[#b8e834] rounded-lg px-[4px] py-[2px]">
                        {transaction?.status}
                      </div>
                    ) : (
                      <div className="bg-[#170505] text-[#e83434] rounded-lg px-[4px] py-[2px]">
                        {transaction?.status}
                      </div>
                    )}
                  </td>
                  <td className="p-5 border-b-2 border-b-[#191919]">
                    {transaction?.paidVia}
                  </td>
                  <td className="p-5 border-b-2 border-b-[#191919]">
                    {transaction?.amount}
                  </td>
                </tr>
              )) :
                <div className="w-full mt-6 ml-[250%]">
                  No Data Found!
                </div>
              }
            </tbody>
          </table>}
        </div>
      </div>

      {/* For smaller Screen  */}
      <div
        className="w-full pb-10 my-4
      lg:hidden"
      >
        <div className="text-2xl w-[90%] mx-auto mb-8">Order Details</div>
        {isLoading ? <Loader /> : data && data.length ? data.map((transaction) => (
          <div className="bg-[#0D0D0D] w-[90%] mx-auto mb-8 rounded-xl">
            <div className="pt-4 px-2 py-1 ml-6 text-xl text-center">
              {/* Payment status  */}
              {transaction?.status === "Confirmed" || "Paid" ? (
                <div className="bg-[#121705] text-[#b8e834] rounded-lg w-16">
                  {transaction?.status}
                </div>
              ) : (
                <div className="bg-[#170505] text-[#e83434] rounded-lg w-24">
                  {transaction?.status}
                </div>
              )}
            </div>

            <div className="text-2xl mt-4 ml-8">
              {/* Package Name */}
              {transaction?.details}
            </div>

            <div className="mt-6 ml-8">
              <div className="flex w-full ">
                <div className="w-[50%]">
                  {/* Amount Paid  */}
                  <div className="text-[#868686]">Amount Paid</div>
                  <div className=" mt-2">{transaction?.amount}</div>
                </div>
                <div className="w-[50%]">
                  {/* Purchase Date  */}
                  <div className="text-[#868686]">Purchase Date</div>
                  <div className=" mt-2">{transaction?.date}</div>
                </div>
              </div>

              <div className="flex w-full mt-4 pb-6">
                <div className="w-[50%]">
                  {/* Transaction ID  */}
                  <div className="text-[#868686]">Transaction ID</div>
                  <div className=" mt-2">
                    {transaction?.transaction_id}
                  </div>
                </div>
                <div className="w-[50%]">
                  {/* Purchase via  */}
                  <div className="text-[#868686]">Paid Via</div>
                  <div className=" mt-2">{transaction?.paidVia}</div>
                </div>
              </div>
            </div>
          </div>
        )) : 
        <div className="flex items-center justify-center">
          No Data Found!
        </div>
        }
      </div>
    </div>
  );
};

export default Payment;