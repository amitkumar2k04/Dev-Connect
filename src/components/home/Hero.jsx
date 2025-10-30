import React from "react";
import axios from "axios";
import { Code, ArrowRight, Globe, Cpu, Sparkles } from "lucide-react";
import Button from "../Button";
import { motion } from "framer-motion";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
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
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-950 opacity-90"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-600 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute right-0 top-1/3 -z-10 h-[280px] w-[280px] rounded-full bg-cyan-400 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute left-1/4 bottom-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-indigo-500 blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-gray-800/50 backdrop-blur-sm text-purple-400 border border-purple-500/20"
            >
              <Globe size={16} className="mr-2" />
              Connect with developers worldwide
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Find Your Perfect{" "}
              <motion.span
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 bg-clip-text text-transparent bg-[size:200%]"
              >
                Dev Match
              </motion.span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              DevMatch connects developers based on skills, interests, and
              projects. Swipe, match, and build amazing things together.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button onClick={handleLogout} size="lg" className="group">
                Get Started
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
              <Button variant="outline" size="lg" className="group">
                Learn More
              </Button> 
            </motion.div>
          </motion.div>

          {/* Hero Cards Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative h-[480px] w-[340px] mx-auto">
              {/* Card Stack */}
              <div className="absolute top-0 left-0 w-full h-full perspective-1000">
                {/* Card 1 - Back */}
                <motion.div
                  initial={{ rotate: 16, y: 10, x: 6 }}
                  animate={{ rotate: 16, y: [10, 16, 10], x: [6, 16, 6] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-800/80 to-indigo-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-indigo-500/20">
                    <div className="bg-indigo-900/30 h-28 rounded-lg mb-4 flex items-center justify-center">
                      <Cpu size={48} className="text-indigo-400" />
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-8 rounded-lg w-3/5 mb-3 flex items-center justify-center text-white font-medium">
                      Backend Developer
                    </div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-3/4 mb-2"></div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-2/3"></div>
                  </div>
                </motion.div>

                {/* Card 2 - Middle Back */}
                <motion.div
                  initial={{ rotate: 8, y: 6, x: 4 }}
                  animate={{ rotate: 8, y: [6, 10, 6], x: [4, 6, 4] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-800/90 to-purple-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-500/20">
                    <div className="bg-purple-900/30 h-28 rounded-lg mb-4 flex items-center justify-center">
                      <Sparkles size={48} className="text-purple-400" />
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-8 rounded-lg w-3/5 mb-3 flex items-center justify-center text-white font-medium">
                      UI/UX Designer
                    </div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-3/4 mb-2"></div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-2/3"></div>
                  </div>
                </motion.div>

                {/* Card 3 - Middle Front */}
                <motion.div
                  initial={{ rotate: -3, y: 2 }}
                  animate={{ rotate: -3, y: [2, 6, 2] }}
                  transition={{
                    duration: 3,
                    delay: 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-800/90 to-cyan-900/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-cyan-500/20">
                    <div className="bg-cyan-900/30 h-28 rounded-lg mb-4 flex items-center justify-center">
                      <Globe size={48} className="text-cyan-400" />
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-8 rounded-lg w-3/5 mb-3 flex items-center justify-center text-white font-medium">
                      Full Stack Dev
                    </div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-3/4 mb-2"></div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-2/3"></div>
                  </div>
                </motion.div>

                {/* Card 4 - Front */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.02, rotate: 3, y: -10, x: 4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-full cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl p-6 border border-purple-500/20">
                    <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 h-28 rounded-lg mb-4 flex items-center justify-center">
                      <Code size={48} className="text-purple-400" />
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-8 rounded-lg w-3/5 mb-3 flex items-center justify-center text-white font-medium">
                      Find Your Match
                    </div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-3/4 mb-2"></div>
                    <div className="bg-gray-700/50 h-4 rounded-lg w-2/3"></div>
                    <div className="flex justify-between mt-8">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center cursor-pointer"
                      >
                        <ArrowRight size={20} className="text-purple-400" />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center cursor-pointer"
                      >
                        <ArrowRight
                          size={20}
                          className="text-cyan-400 transform rotate-180"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
