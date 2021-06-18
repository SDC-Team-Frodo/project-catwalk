/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import request from '../../requests';

const Details = (props) => {
  const { id, clicked, setProduct } = props;
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);

  if (clicked && !loaded) {
    request.get(`products/${id}`, {})
      .then((res) => {
        setLoaded(true);
        setName(res.data.name);
        setDescription(res.data.description);
        request.get(`products/${id}/styles`, {})
          .then((res2) => {
            setPhotos(res2.data.results[0].photos);
          }).catch((err) => console.error(err));
      }).catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="details">
      <h2>{name}</h2>
      <p className="description">{description}</p>
      <div className="browsePhotosDiv">
        {photos.slice(0, 8).map((photo, i) => (
          <img key={i} alt="No Img" className="BrowseImage" src={photo.thumbnail_url} />
        ))}
      </div>
      <button
        className="goToProduct hoverGrey"
        value="Go"
        type="button"
        onClick={() => {
          setProduct(id);
        }}
      >
        Go To Product Page
      </button>
    </div>
  );
};

export default Details;
