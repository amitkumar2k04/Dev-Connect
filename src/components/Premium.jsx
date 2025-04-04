import axios from "axios";
import { BASE_URL } from "../utils/constaints";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handledBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        memberShipType: type,
      },
      { withCredentials: true }
    );

    // It should open the razorpay dashboard
    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: "Connect to Other Developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    "You're already a premium user"
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>Chat with other people </li>
            <li>100 connection request per day</li>
            <li>Blue Tick</li>
            <li>3 months</li>
          </ul>
          <button
            onClick={() => handledBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold MemberShip</h1>
          <ul>
            <li>Chat with other people </li>
            <li>Infanite connection request per day</li>
            <li>Blue tick</li>
            <l1>6 months</l1>
          </ul>
          <button
            onClick={() => handledBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
