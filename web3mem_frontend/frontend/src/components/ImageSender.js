import React from "react";

import "../styles/ImageSender.css";

const ImageSender = ({ imageUrlInput, setImageUrlInput, sendImageUrl }) => {
  return (
    <div className="imageSender">
      <label className="imageSender__label">Send Meme Image Url</label>
      <input
        className="imageSender__input"
        value={imageUrlInput}
        onChange={(e) => setImageUrlInput(e.target.value)}
      ></input>
      <button
        className="btn btn--send"
        onClick={() => sendImageUrl(imageUrlInput)}
      >
        Send
      </button>
    </div>
  );
};

export default ImageSender;
