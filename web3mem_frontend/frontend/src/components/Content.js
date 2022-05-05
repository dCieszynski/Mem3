import React, { useEffect } from "react";

import "../styles/Content.css";

import Image from "./Image";

const Content = ({ allImages, imgLike }) => {
  console.log(allImages);

  return (
    <div className="content">
      {allImages.map((image, index) => {
        return (
          <Image
            key={`id${index}`}
            imgId={index}
            imgSrc={image.imgUrl}
            imgLikes={image.likes}
            imgLike={imgLike}
          ></Image>
        );
      })}
    </div>
  );
};

export default Content;
