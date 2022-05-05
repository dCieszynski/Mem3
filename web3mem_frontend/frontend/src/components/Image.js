import React, { useEffect, useState } from "react";

import "../styles/Image.css";
import { GiMineralHeart } from "react-icons/gi";

const Image = ({ imgId, imgSrc, imgLikes, imgLike }) => {
  const [likes, setLikes] = useState(imgLikes);

  useEffect(() => {
    setLikes(imgLikes);
  }, [imgLikes]);

  return (
    <div className="image">
      <img className="image__src" src={imgSrc}></img>
      <div className="image__like">
        <button className="btn btn--like" onClick={() => imgLike(imgId)}>
          <GiMineralHeart className="likeIcon" />
        </button>
        <span className="span--likes">Likes: {likes}</span>
      </div>
    </div>
  );
};

export default Image;
