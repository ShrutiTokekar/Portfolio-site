import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Thank you for reaching out.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen w-screen bg-purple-100 flex items-center justify-center py-20 px-6">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-purple-900">
          Contact Me
        </h2>

        <div>
          <label htmlFor="name" className="block text-lg text-purple-900 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg text-purple-900 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg text-purple-900 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-purple-600 text-white font-semibold text-xl rounded-full hover:bg-purple-700 transition duration-300"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
