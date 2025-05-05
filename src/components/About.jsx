import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardData = [
  {
    title: "🧠 Skills",
    content: [
      "JavaScript, React, Node.js",
      "C++, Python, Java",
      "SQL, MySQL, MongoDB",
      "Version Control (Git, GitHub)",
      "Linux, Docker, Kubernetes",
    ],
  },
  {
    title: "💼 Experience",
    content: [
      "Optometric Technician at The Eye Exam Group"
    ],
  },
  {
    title: "🎓 Education",
    content: [
      "B.S. Computer Science - East Stroudsburg University",
      "A.S. Computer Science - Middlesex College",
    ],
  },
  {
    title: "📜 Certificates",
    content: [
      "Computer Programming Certificate",
      "Visual Arts Certificate",
      "AWS Cloud Practitioner (in progress)",
    ],
  },
];

const Card = ({ title, content, isOpen, toggleOpen }) => (
  <motion.div
    layout
    onClick={toggleOpen}
    className="bg-white cursor-pointer rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 text-left"
  >
    <motion.h3 layout className="text-2xl font-semibold text-purple-900 mb-2">
      {title}
    </motion.h3>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="text-purple-700 overflow-hidden"
        >
          <ul className="list-disc pl-5 space-y-1 mt-2">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const About = () => {
  const [openStates, setOpenStates] = useState(Array(cardData.length).fill(false));

  const toggleCard = (index) => {
    setOpenStates((prev) =>
      prev.map((val, i) => (i === index ? !val : val))
    );
  };

  const toggleAll = () => {
    const allOpen = openStates.every(Boolean);
    setOpenStates(Array(cardData.length).fill(!allOpen));
  };

  return (
    <section className="min-h-screen bg-purple-100 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-purple-900 mb-6">About Me</h2>
        <p className="text-lg md:text-xl text-purple-800 mb-8">
          Hi, I'm Shruti Tokekar, a passionate and driven computer science student with a strong interest in software development. 
          I am constantly learning new technologies and improving my coding skills to create innovative solutions.
        </p>

        <button
          onClick={toggleAll}
          className="mb-10 px-6 py-2 rounded-lg bg-purple-800 text-white hover:bg-purple-700 transition"
        >
          {openStates.every(Boolean) ? "Collapse All" : "Expand All"}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              content={card.content}
              isOpen={openStates[index]}
              toggleOpen={() => toggleCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
