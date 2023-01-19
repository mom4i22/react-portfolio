import "./Skills.scss";
import React, { useState, useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { urlFor, client } from "../../client";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <Fragment>
      <h2 className="head-text">Skills & experience</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="app__skills-exp">
          {experiences.map((experience) => {
            return (
              <motion.div
                className="app__skills-exp-item"
                key={experience.year}
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>

                <motion.div className="app__skills-exp-works">
                  {experience.works.map((work) => (
                    <Fragment>
                      <motion.div
                        id={`work-name-${work.name}`}
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className="app__skills-exp-work"
                        data-tooltip-content={work.desc}
                        key={work.name}
                      >
                        <h4 className="bold-text">{work.name}</h4>
                        <p className="p-text">{work.company}</p>
                      </motion.div>
                      <Tooltip
                        anchorId={`work-name-${work.name}`}
                        // content={work.desc}
                        className="skills-tooltip"
                      />
                    </Fragment>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
