import React from 'react';
import { ArrowRight } from 'lucide-react';
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Button from '../Button';

const CTA = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute left-0 right-0 bottom-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-pink-500 opacity-20 blur-[100px]"></div>
        <div className="absolute left-1/4 top-1/3 -z-10 h-[250px] w-[250px] rounded-full bg-cyan-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Find Your{' '}
            <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Dev Match
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers already collaborating on projects. Sign
            up today and start swiping for your perfect coding partner.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleLogout} size="lg">
              Get Started Now
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg">
              View Success Stories
            </Button>
          </div>

          <div className="mt-12 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
            <p className="text-gray-300 mb-4">
              Join over 10,000+ developers already on DevMatch
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-gray-700/50 px-4 py-2 rounded-lg text-white">
                5,000+ Matches Made
              </div>
              <div className="bg-gray-700/50 px-4 py-2 rounded-lg text-white">
                2,500+ Projects Launched
              </div>
              <div className="bg-gray-700/50 px-4 py-2 rounded-lg text-white">
                98% Match Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
