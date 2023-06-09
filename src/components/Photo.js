import React from "react";

const Photo = ({
  urls: { regular },
  likes,
  alt_decription,
  user: {
    portfolio_url,
    name,
    profile_image: { medium },
  },
}) => {
  return (
    <section>
      <div className="img-container">
        <img src={regular} alt={alt_decription} className="photo" />
        <div className="img-info">
          <div className="img-desc">
            <p>{name}</p>
            <p>{likes}</p>
          </div>
          <a href={portfolio_url}>
            <img src={medium} alt={name} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Photo;
