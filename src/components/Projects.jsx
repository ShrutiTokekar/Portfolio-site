import React from "react";

const projects = [
  {
    name: "MoodBoard",
    description: "AI-based moodboard generator using Spotify listening history, facial emotion detection, and journal sentiment analysis.",
    techStack: ["Python", "Spotify API", "Machine Learning"],
    link: "https://github.com/YOUR_USERNAME/MoodBoard",
  },
  {
    name: "Music Analyzer Backend",
    description: "A PHP-based backend for a music analytics app with RESTful API endpoints, Docker, and MySQL.",
    techStack: ["PHP", "MySQL", "Docker", "API"],
    link: "https://github.com/shrutitokekar/music-analyzer-backend",
  },
  {
    name: "Student Management System",
    description: "A Java-based system to manage student data, including CRUD operations and data visualization.",
    techStack: ["Java", "MySQL"],
    link: "https://github.com/shrutitokekar/student-management-system",
  },
];

const Projects = () => {
  return (
    <section className="py-16 px-8 bg-purple-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-purple-900 mb-8 animate__animated animate__fadeIn animate__delay-1s">
          My Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-2s">
              <h3 className="text-2xl font-semibold text-purple-900 mb-4">{project.name}</h3>
              <p className="text-purple-700 mb-4">{project.description}</p>
              <div className="text-sm font-medium text-purple-600 mb-4">
                <strong>Tech Stack:</strong> {project.techStack.join(", ")}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-700"
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;


