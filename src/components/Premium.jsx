import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { Check, Crown, Star } from "lucide-react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Failed to verify premium status:", err);
    }
  };

  const handledBuyClick = async (type) => {
    try {
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
        name: "DevConnect",
        description: "Connect to Other Developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#ec4899",
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
    }
  };

  if (isUserPremium) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Crown size={48} className="text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            You're a Premium Member! 🎉
          </h1>
          <p className="text-gray-400 text-lg">
            Enjoy all the exclusive benefits of your membership.
          </p>
        </div>
      </div>
    );
  }

  const plans = [
    {
      name: "Silver Membership",
      type: "silver",
      price: "₹499",
      duration: "3 months",
      description: "Perfect for growing your developer network",
      icon: <Star size={32} className="text-gray-400" />,
      features: [
        "Chat with other developers",
        "100 connection requests per day",
        "Verified badge",
        "Priority support"
      ],
      buttonClass: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
    },
    {
      name: "Gold Membership",
      type: "gold",
      price: "₹999",
      duration: "6 months",
      description: "Best for serious networking professionals",
      icon: <Crown size={32} className="text-yellow-500" />,
      popular: true,
      features: [
        "Everything in Silver",
        "Unlimited connection requests",
        "Premium verified badge",
        "Advanced profile features",
        "24/7 Priority support"
      ],
      buttonClass: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upgrade Your
            <span className="block mt-2 bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              DevConnect Experience
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose a premium plan to unlock unlimited connections and exclusive features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900 rounded-2xl shadow-xl p-8 border-2 transition-all hover:scale-105 ${
                plan.popular ? 'border-pink-500' : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-cyan-400 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star size={14} className="mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">for {plan.duration}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-gray-300">
                    <Check size={20} className="text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handledBuyClick(plan.type)}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${plan.buttonClass}`}
              >
                Buy {plan.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Premium;
