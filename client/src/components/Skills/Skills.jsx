import React from 'react';
import './Skills.css';
import { motion } from 'framer-motion';

const skillsData = [
  {
    title: 'Frontend Development',
    items: [
      'React / Vite',
      'JavaScript',
    
      'HTML5 / CSS3',
      'Responsive Design',
    ],
  },
  {
    title: 'Backend & DevOps',
    items: [
      'Node.js / Express',
      'Python / Django',
      'Docker / Kubernetes',
      'OpenShift 4 / Tekton',
      'CI/CD Pipelines',
      'Infrastructure as Code',
    ],
  },
  {
    title: 'Database & Tools',
    items: [
      'SQL / MySQL',
      'MongoDB',
      'Git / GitHub Actions',
      "GitHub CoPilot",
      'Monitoring & Logging',
    ],
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

const card = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } }
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

const Skills = () => (
  <section className="skills-section" id="skills">
    <h2 className="skills-title">Skills &amp; Technologies</h2>
    <motion.div className="skills-cards" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
      {skillsData.map((col) => (
        <motion.div className="skills-card" key={col.title} variants={card}>
          <div className="skills-card-title">{col.title}</div>
          <ul className="skills-list">
            {col.items.map((it) => (
              <motion.li className="skills-list-item" key={it} variants={item}>{it}</motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
    <motion.div className="skills-note" variants={item} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      Always learning and staying up-to-date with the latest technologies and industry best practices to deliver cutting-edge solutions.
    </motion.div>
  </section>
);

export default Skills;
