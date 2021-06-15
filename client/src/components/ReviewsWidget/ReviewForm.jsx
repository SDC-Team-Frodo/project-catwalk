import React, { useState, useContext } from 'react';
import ReactStars from 'react-rating-stars-component';
import ReviewContext from '../../contexts/ReviewContext';
import ModalOff from '../../contexts/ModalOffContext';
import request from '../../requests';

const ReviewForm = ({ product, characteristics }) => {
  const ratingDescriptions = {
    1: 'Poor', 2: 'Fair', 3: 'Average', 4: 'Good', 5: 'Great',
  };
  const meanings = {
    Size: {
      1: 'A size too small',
      2: '½ a size too small',
      3: 'Perfect',
      4: '½ a size too big',
      5: 'A size too wide',
    },
    Width: {
      1: 'Too narrow',
      2: 'Slightly narrow',
      3: 'Perfect',
      4: 'Slightly wide',
      5: 'Too wide',
    },
    Comfort: {
      1: 'Uncomfortable',
      2: 'Slightly uncomfortable',
      3: 'Ok',
      4: 'Comfortable',
      5: 'Perfect',
    },
    Quality: {
      1: 'Poor',
      2: 'Below average',
      3: 'What I expected',
      4: 'Pretty great',
      5: 'Perfect',
    },
    Length: {
      1: 'Runs short',
      2: 'Runs slightly short',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
    Fit: {
      1: 'Runs tight',
      2: 'Runs slightly tight',
      3: 'Perfect',
      4: 'Runs slightly long',
      5: 'Runs long',
    },
  };
  const { modalOff, setModalOff } = useContext(ModalOff);
  const [allReviews, setAllReviews] = useContext(ReviewContext);
  const [rating, setRating] = useState(null);
  const [recommended, setRecommended] = useState(true);
  const [charRatings, setCharRatings] = useState(
    Object.keys(characteristics).reduce((result, char) => {
      result[char] = {};
      result[char].id = characteristics[char].id;
      result[char].value = null;
      return result;
    }, {}),
  );
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const postPhotos = (files) => {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const fileData = event.target.result;
      setThumbnails([...thumbnails, fileData]);
      request.postPhotos(fileData)
        .then((result) => {
          setPhotos([...photos, result.data]);
        })
        .catch((err) => new Error(err));
    });
    reader.readAsDataURL(files[0]);
  };
  const submitReview = (e) => {
    e.preventDefault();
    if (!rating) {
      alert('You must enter the following: Rating');
      return;
    }
    for (let char of Object.keys(charRatings)) {
      if (charRatings[char] === null) {
        alert(`You must enter the following: Characteristic: ${char}`);
        return;
      }
    }
    if (body.length < 50) {
      alert('You must enter the following: Body');
      return;
    }
    if (!username) {
      alert('You must enter the following: Username');
      return;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      alert('You must enter the following: Email');
      return;
    }
    request.post('reviews', {
      product_id: product.id,
      rating,
      summary,
      body,
      recommend: recommended,
      name: username,
      email,
      photos,
      characteristics: Object.keys(charRatings).reduce((result, char) => {
        result[charRatings[char].id] = charRatings[char].value;
        return result;
      }, {}),
    })
      .then(() => {
        setModalOff(true);
        console.log('You submitted me');
      })
      .then(() => {
        setAllReviews([...allReviews, {}]);
      })
      .catch((err) => new Error(err));
  };
  return (
    <form id="review-form">
      <div className="rating-input">
        <div className="review-topic">
          Overall Rating
          <sup>*</sup>
        </div>
        <ReactStars
          a11y
          activeColor="red"
          count={5}
          size={16}
          value={0}
          onChange={(newValue) => setRating(newValue)}
        />
        {rating
        && (
        <div className="rating-description">
          {ratingDescriptions[rating]}
        </div>
        )}
      </div>
      <br />
      <label htmlFor="recommended-input">
        <div className="review-topic">
          Do you recommend this product?
          <sup>*</sup>
        </div>
        <input
          type="radio"
          name="recommended-input"
          value="Yes"
          onClick={() => setRecommended(true)}
          defaultChecked
        />
        Yes
        <input
          type="radio"
          name="recommended-input"
          value="No"
          onClick={() => setRecommended(false)}
          required
        />
        No
      </label>
      <br />
      <br />
      <div className="review-topic">
        Characteristics
        <sup>*</sup>
      </div>
      <div className="all-chars">
        {Object.keys(charRatings).map((char) => (
          <label htmlFor={`${char}-input`} className="char-input" key={char}>
            <div className="current-char">{char}</div>
            <div className="char-rating-buttons">
              <input
                type="radio"
                name={`${char}-input`}
                value={1}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char].value = Number(e.target.value);
                  return old;
                })}
                required
              />
              <input
                type="radio"
                name={`${char}-input`}
                value={2}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char].value = Number(e.target.value);
                  return old;
                })}
              />
              <input
                type="radio"
                name={`${char}-input`}
                value={3}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char].value = Number(e.target.value);
                  return old;
                })}
              />
              <input
                type="radio"
                name={`${char}-input`}
                value={4}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char].value = Number(e.target.value);
                  return old;
                })}
              />
              <input
                type="radio"
                name={`${char}-input`}
                value={5}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char].value = Number(e.target.value);
                  return old;
                })}
              />
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
            </div>
            <div className="rating-meaning">{meanings[char][charRatings[char].value] || 'None selected'}</div>
          </label>
        ))}
      </div>
      <br />
      <label htmlFor="summary-input">
        <div className="review-topic">Review Summary</div>
        <textarea
          name="summary-input"
          rows="2"
          maxLength="60"
          placeholder="Example: Best purchase ever!"
          onChange={(e) => setSummary(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label htmlFor="body-input">
        <div className="review-topic">
          Review Body
          <sup>*</sup>
        </div>
        <textarea
          name="body-input"
          rows="5"
          maxLength="1000"
          minLength="50"
          placeholder="Why did you like the product or not?"
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <br />
        <div className="remaining-chars" style={{ color: body.length < 50 ? 'red' : 'black' }}>
          {body.length < 50 ? `Minimum required characters left: ${50 - body.length}` : 'Minimum reached'}
        </div>
      </label>
      <br />
      {photos.length < 5
      && (
      <label htmlFor="photo-input">
        <div className="review-topic">Upload your photos</div>
        <input
          type="file"
          name="photo-input"
          accept=".png, .jpg, .jpeg, .svg"
          onChange={(e) => postPhotos(e.target.files)}
        />
      </label>
      )}
      <br />
      {!!thumbnails.length
      && (
      <div className="photo-thumbnails">
        {thumbnails.map((url) => <img key={url} src={url} alt="img thumbnail" />)}
        <br />
      </div>
      )}
      <br />
      <label htmlFor="username-input">
        <div className="review-topic">
          What is your nickname?
          <sup>*</sup>
        </div>
        <input
          type="text"
          name="username-input"
          className="username-input"
          placeholder="jackson11!"
          maxLength="60"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <div className="privacy-warning">For privacy reasons, do not use your full name or email address</div>
      </label>
      <br />
      <label htmlFor="email-input">
        <div className="review-topic">
          Your email
          <sup>*</sup>
        </div>
        <input
          type="email"
          name="username-input"
          className="email-input"
          placeholder="jackson11@email.com"
          maxLength="60"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <div className="privacy-warning">For authentication reasons, you will not be emailed</div>
      </label>
      <br />
      <label htmlFor="submit-input">
        <div className="submit">
          <input
            type="button"
            name="submit-input"
            value="Submit Review"
            onClick={submitReview}
          />
        </div>
      </label>
    </form>
  );
};

export default ReviewForm;
