import React, { useState  } from 'react';
import ReactStars from 'react-rating-stars-component';

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
  }
  const [rating, setRating] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [charRatings, setCharRatings] = useState(
    Object.keys(characteristics).reduce((result, char) => {
      result[char] = null;
      return result;
    }, {}),
  );
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const submitReview = (e) => {
    e.preventDefault();
    if (!rating) {
      alert('You must enter the following: Rating');
      return;
    }
    if (!recommended) {
      alert('You must enter the following: Recommended');
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
    console.log('You submitted me');
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
        {rating && ratingDescriptions[rating]}
      </div>
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
                  old[char] = e.target.value;
                  return old;
                })}
                required
              />
              {/* 1 */}
              <input
                type="radio"
                name={`${char}-input`}
                value={2}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char] = e.target.value;
                  return old;
                })}
              />
              {/* 2 */}
              <input
                type="radio"
                name={`${char}-input`}
                value={3}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char] = e.target.value;
                  return old;
                })}
              />
              {/* 3 */}
              <input
                type="radio"
                name={`${char}-input`}
                value={4}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char] = e.target.value;
                  return old;
                })}
              />
              {/* 4 */}
              <input
                type="radio"
                name={`${char}-input`}
                value={5}
                onClick={(e) => setCharRatings(() => {
                  const old = { ...charRatings };
                  old[char] = Number(e.target.value);
                  return old;
                })}
              />
              {/* 5 */}
            </div>
            <div className="rating-meaning">{meanings[char][charRatings[char]] || 'None selected'}</div>
          </label>
        ))}
      </div>
      <label htmlFor="summary-input">
        Review Summary
        <br />
        <input
          type="text"
          name="summary-input"
          placeholder="Example: Best purchase ever!"
          maxLength="60"
          onChange={(e) => setSummary(e.target.value)}
        />
      </label>
      <br />
      <label htmlFor="body-input">
        Review Body
        <sup>*</sup>
        <br />
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
        {body.length < 50 ? `Minimum required characters left: ${50 - body.length}` : 'Minimum reached'}
      </label>
      <br />
      {photos.length < 5
      && (
      <label htmlFor="photo-input">
        Upload your photos
        <input
          type="file"
          name="photo-input"
          accept=".png, .jpg, .jpeg, .svg"
          onChange={(e) => setPhotos([...photos, e.target.value])}
        />
      </label>
      )}
      <br />
      {photos.map((url) => <img key={url} src={url} alt="img thumbnail" />)}
      <br />
      <label htmlFor="username-input">
        What is your nickname?
        <sup>*</sup>
        <input
          type="text"
          name="username-input"
          placeholder="Example: jackson11!"
          maxLength="60"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        For privacy reasons, do not use your full name or email address
      </label>
      <br />
      <label htmlFor="email-input">
        Your email
        <sup>*</sup>
        <input
          type="email"
          name="username-input"
          placeholder="Example: jackson11@email.com"
          maxLength="60"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        For authentication reasons, you will not be emailed
      </label>
      <br />
      <label htmlFor="submit-input">
        <input
          type="button"
          name="submit-input"
          value="Submit"
          onClick={submitReview}
        />
      </label>
    </form>
  );
};

export default ReviewForm;
