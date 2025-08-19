import React from 'react';
import './About.css';
import { motion } from 'framer-motion';


const skills = ['React', 'CSS', 'Docker', 'Kubernetes', 'OpenShift 4', 'CI/CD'];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.12 }
  }
};

const itemA = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const textContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } } };
const textItem = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } };

const leftContainer = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } };
const leftItem = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } };
const skillContainer = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };

const blobStyle = { position: 'relative' };

const features = [
  {
    title: 'Infrastructure',
    description: 'Experience in cloud infrastructure, containerization, and CI/CD pipelines',
    icon: (
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="12" fill="#23243a" />
        <g stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
          <rect x="10" y="10" width="12" height="4" rx="2" />
          <rect x="10" y="18" width="12" height="4" rx="2" />
          <circle cx="13" cy="12" r="1" fill="#A78BFA" />
          <circle cx="13" cy="20" r="1" fill="#A78BFA" />
        </g>
      </svg>
    )
  },
  {
    title: 'Development',
    description: 'Full-stack development with modern frameworks and best practices',
    icon: (
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="12" fill="#23243a" />
        <g stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
          <polyline points="13,12 11,16 13,20" fill="none" />
          <polyline points="19,12 21,16 19,20" fill="none" />
        </g>
      </svg>
    )
  },
  {
    title: 'DevOps',
    description: 'Automation, monitoring, and scalable deployment strategies',
    icon: (
      <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="12" fill="#23243a" />
        <g stroke="#A78BFA" strokeWidth="2" strokeLinecap="round">
          <path d="M12 20c0-2.21 1.79-4 4-4s4 1.79 4 4" />
          <circle cx="16" cy="16" r="6" />
        </g>
      </svg>
    )
  }
];

const About = () => (
  <section className="about-section" id="about">
    <h2 className="about-title">About Me</h2>
    <div className="about-content">
      <motion.div
        className="about-left"
        variants={leftContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p variants={leftItem}>
          I'm a passionate DevOps Engineer and Frontend Developer with expertise in building robust, scalable infrastructure and crafting exceptional user experiences. With a deep understanding of both development and operations, I bridge the gap between code and deployment.
        </motion.p>
        <motion.p variants={leftItem}>
          My approach combines modern development practices with reliable infrastructure solutions, ensuring applications are not only beautiful but also performant and maintainable at scale.
        </motion.p>
        <motion.div className="about-skills" variants={skillContainer}>
          {skills.map(skill => (
            <motion.span className="about-skill" key={skill} variants={leftItem}>{skill}</motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="about-right"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {features.map(feature => (
          <motion.div
            className="about-feature"
            key={feature.title}
            style={{ borderRadius: 30, position: 'relative', ...blobStyle }}
            variants={itemA}
          >
            <div className="about-feature-icon">{feature.icon}</div>
            <motion.div variants={textContainer} className="about-feature-text">
              <motion.div className="about-feature-title" variants={textItem}>{feature.title}</motion.div>
              <motion.div className="about-feature-desc" variants={textItem}>{feature.description}</motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default About;
