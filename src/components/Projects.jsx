import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Project_01 from "../assets/Project_01_IMS.jpg";
import Project_02 from "../assets/Project_02_ttms.jpg.png";
import Project_03 from "../assets/Project_03.jpg";
import Project_04 from "../assets/Project_04.jpg";

const projects = [
  {
    title: "Intern Management System",
    description:
      "Developed as a second-year group project at university under the supervision of 99x, this system streamlines the management of interns by handling evaluation forms, progress tracking, and reporting. Built using the MERN stack, the system enhances the efficiency of mentoring and evaluation processes for both interns and managers.",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/Tharusha-2000/InternManagementSystemFrontend-using-MERN-stack.git",
    additionalLink:
      "https://github.com/Tharusha-2000/InternManagementSystemBackend-using-MERN-stack.git",
    image: Project_01,
  },
  {
    title: "Web Application for Data Management and Reporting",
    description:
      "An ongoing individual project for Gislaved Gummi Lanka Pvt Limited, aimed at streamlining mold-making operations. This system centralizes data entry, tracks mold details, and generates structured reports, enhancing operational efficiency and process transparency.",
    technologies: ["Spring Boot", "React", "MongoDB"],
    link: "https://github.com/yourusername/project-two",
    image: Project_02,
  },
  {
    title: "ECommerce Platform",
    description:
      "A group project focused on developing an enterprise-level eCommerce platform using microservices architecture. The system is designed to handle high traffic, with features like product management, user authentication, and order processing, ensuring scalability and efficient performance.",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/yourusername/project-three",
    image: Project_03,
  },
  {
    title: "Biodegradable Plate Maker from Food Waste",
    description:
      "A first-year group project where we developed a machine that produces biodegradable plates from food waste. Utilizing Arduino for hardware control, this project addresses environmental sustainability by converting waste into eco-friendly products.",
    technologies: ["Arduino", "C++", "Hardware Prototyping"],
    link: "https://github.com/yourusername/project-four",
    image: Project_04,
  },
];

const Projects = () => {
  const openLinks = (link, additionalLink) => {
    window.open(link, "_blank", "noopener,noreferrer");
    if (additionalLink) {
      window.open(additionalLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="border-b border-neutral-900 pb-24">
      <h1 className="my-20 text-center text-4xl">Projects</h1>
      <div className="flex flex-wrap justify-center gap-8 max-h-[800px] overflow-y-auto scrollbar-hide scroll-smooth">
        {projects.map((project, index) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
          });

          return (
            <motion.div
              ref={ref}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/3 p-4"
              key={index}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <div className="font-bold text-2xl mb-2 text-cyan-400 hover:text-cyan-600 transition duration-300 ease-in-out">
                {project.title}
              </div>
              <p className="text-base mb-4 text-justify text-gray-300 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-block bg-cyan-500 rounded-full px-3 py-1 text-sm font-semibold text-cyan-900 mr-2 mb-2"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button
                onClick={() => openLinks(project.link, project.additionalLink)}
                className="text-cyan-400 hover:text-cyan-600"
              >
                View Project
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;