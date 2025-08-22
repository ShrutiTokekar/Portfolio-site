import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import backgroundImage from './assets/background.jpeg';
import meImage from './assets/me.jpg';

const Hero = () => {
  return (
    <div className="text-white overflow-x-hidden">
      {/* Section 1: Welcome with background */}
      <section
        className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >

        <motion.div
          className="relative z-10 mt-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to My Portfolio
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-6">
            A creative showcase of my projects, passions, and journey in tech.
          </p>
          <Link
            to="/About"
            className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-medium px-6 py-3 rounded-full transition duration-300"
          >
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Section 2: Bio section static */}
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 md:px-20"
        style={{ backgroundColor: 'lavender' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white bg-opacity-60 rounded-xl p-8 md:p-10 shadow-2xl max-w-5xl w-full flex flex-col md:flex-row items-center gap-10"
        >
          <img
            src={meImage}
            alt="Shruti Tokekar"
            className="w-52 h-52 md:w-60 md:h-60 rounded-full object-cover shadow-lg"
          />
          <div className="text-black text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Hi, I'm Shruti Tokekar</h2>
            <p className="text-md md:text-lg text-gray-700">
              I'm a passionate software developer with experience in full-stack development,
              creative design, and data-driven projects. I love building expressive, functional
              tools that bring joy and impact to real users.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
