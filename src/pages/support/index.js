import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  resetSendFeedback,
  sendFeedback,
} from "../../redux/action/sendFeedback";
import { validateEmail } from "../../utils/constants";
import FeedbackSent from "../../assets/feedback-sent.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [validationError, setValidationError] = useState({
    email: "",
    message: "",
  });
  const sendFeedbackAPIState = useSelector(
    (state) => state?.sendFeedbackReducer?.sendFeedback
  );
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (sendFeedbackAPIState?.status) {
      setResponse(sendFeedbackAPIState);
      if (sendFeedbackAPIState?.data?.Success) {
        setShowSuccessMsg(true);
      }
      // setShowLoading(false);
      setEmail("");
      setMessage("");
      dispatch(resetSendFeedback());
    } else {
      const timer = setTimeout(() => {
        // setShowLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [sendFeedbackAPIState]);

  const onCancel = () => {
    setEmail("");
    setMessage("");
  };
  const sendFeedbackAPI = () => {
    setValidationError({
      email: "",
      message: "",
    });
    if (!email) {
      return setValidationError({
        email: "Please enter an email address",
        message: "",
      });
    } else if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: "",
      });
    } else if (!message) {
      return setValidationError({
        message: "Please enter message",
        email: "",
      });
    } else {
      const body = {
        email: email,
        message: message,
      };
      // setShowLoading(true);
      dispatch(sendFeedback(body));
    }
  };

  let msg = response?.data?.msg.replace(/!/g, "");

  const SuccessMessage = () => {
    return (
      <div>
        <div>
          <div
            className="mt-4"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <img className="h-16 w-16" src={FeedbackSent} />
            <div className="text-center ml-4">{msg}</div>
          </div>
          <button
            onClick={() => setShowSuccessMsg(false)}
            className="mr-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-6 py-2 font-bold mt-16"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

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

  return (
    <div
      className="flex flex-col text-white w-full border-b-2 border-b-[#161616] min-h-screen
    xl:flex-row
    "
    >
      <div
        className=" flex flex-col mx-auto
        xl:block pb-16 xl:border-l-2 w-full border-l-[#191919] p-8 "
      >
        {" "}
        {showSuccessMsg ? (
          <SuccessMessage />
        ) : (
          <div>
            <div className="xl:w-[80%] w-full h-auto bg-[#191919] rounded overflow-hidden p-2">
              <div className="lg:p-8 md:p-4 sm:p-1">
                <div className="text-2xl">Get answers to commom questions</div>
                <div className="text-sm text-[#b2b2b2] font-thin mt-2">
                  Check out our FAQs page for answers to your most frequently
                  answered questions
                </div>
                <button className="flex flex-row text-white font-extrabold py-2 underline mt-4 text-sm">
                  Visit FAQs
                  <ArrowRightIcon
                    className="h-5 w-5 text-white ml-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div
              className="flex flex-col w-full mx-auto 
        md:mx-0 max-w-ful"
            >
              <label className="mt-4">Enter Email Address</label>
              <input
                type="text"
                name="username"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={validationError.email}
                className="w-full md:w-full lg:w-[500px] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
              />
              <label className="mt-4">Enter Message</label>
              <textarea
                type="text"
                name="username"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                error={validationError.message}
                className="h-32 md:w-full lg:w-[500px] rounded-lg border-2 border-[#1C1C1C] bg-[#1C1C1C] text-[#c9c9c9] mt-1 py-1 px-1"
              />
            </div>
            <div className="flex w-full mt-8">
              <button
                onClick={sendFeedbackAPI}
                className="mr-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-6 py-2 font-bold"
              >
                Submit
              </button>
              <button
                onClick={onCancel}
                className="mr-4 rounded-lg bg-gradient-to-r from-[#E9193F] to-[#831126] text-black text-center px-6 py-2 font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
