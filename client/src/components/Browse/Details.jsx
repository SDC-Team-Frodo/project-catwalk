import React, { useState, useEffect } from 'react';
import request from '../../requests';
import Modal from '../Modal';

const Details = (props) => {
  const { id, clicked, setProduct } = props;
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);

  if (clicked && !loaded) {
    request.get(`products/${id}`, {})
      .then((res) => {
        console.log(res.data);
        setLoaded(true);
        setName(res.data.name);
        setDescription(res.data.description);
        request.get(`products/${id}/styles`, {})
          .then((res2) => {
            console.log(res2.data);
            setPhotos(res2.data.results[0].photos);
          }).catch((err) => console.error(err));
      }).catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="details">
      <h2>{name}</h2>
      <p>{description}</p>
      {photos.map((photo, i) => {
        return <img alt="No Image" className="BrowseImage" src={photo.thumbnail_url} />;
      })}
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
