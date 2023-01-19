import React, { Fragment, useState } from "react";
import "./Footer.scss";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const changeInputHandler = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });

    setLoading(false);
  };

  return (
    <Fragment>
      <h2 className="head-text">Take a coffee & chat with me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:mtrenchev00@gmail.com" className="p-text">
            mtrenchev00@gmail.com
          </a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a className="p-text">0886530295</a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={changeInputHandler}
            />
          </div>

          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              value={email}
              name="email"
              onChange={changeInputHandler}
            />
          </div>

          <div>
            <textarea
              className="p-text"
              placeholder="Your message"
              value={message}
              name="message"
              onChange={changeInputHandler}
            />
          </div>
          <button type="button" className="p-text" onClick={submitHandler}>
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </Fragment>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
