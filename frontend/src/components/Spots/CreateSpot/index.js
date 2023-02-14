import { useState } from 'react';
import './CreateSpot.css';

function CreateSpot() {
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [imageUrl3, setImageUrl3] = useState('');
  const [imageUrl4, setImageUrl4] = useState('');
  const [imageUrl5, setImageUrl5] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="create-spot-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-header">Create a new Spot</h2>
          <ul className="errors">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <div className="location-header">
            <h3>Where's your place located?</h3>
            <h5>Guests will only get your exact address once they booked a reservation.</h5>
          </div>
          <label>
            Country: <br/>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="Country"
            />
          </label>
          <label>
            Address: <br/>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Address"
            />
          </label>
          <label>
            City: <br/>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City"
            />
          </label>
          <label>
            State: <br/>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="State"
            />
          </label>
          <label>
            Latitude: <br/>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              placeholder="Latitude"
            />
          </label>
          <label>
            Longitude: <br/>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              placeholder="Longitude"
            />
          </label>
          <div className="break"></div>
          <div className="description-header">
            <h3>Describe your place to guests</h3>
            <h5>
              Mention the best features of your space, any special amentities like
              fast wifi or parking, and what you love about the neighborhood.
            </h5>
          </div>
          <label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Please write at least 30 characters"
            />
          </label>
          <div className="break"></div>
          <div className="title-header">
            <h3>Create a title for your spot</h3>
            <h5>
              Catch guests' attention with a spot title that highlights what makes 
              your place special.
            </h5>
          </div>
          <label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Name of your spot"
            />
          </label>
          <div className="break"></div>
          <div className="price-header">
            <h3>Set a base price for your spot</h3>
            <h5>
              Competitive pricing can help your listing stand out and rank higher
              in search results.
            </h5>
          </div>
          <label>
            <span className="dollar-sign">$</span>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Price"
            />
          </label>
          <div className="break"></div>
          <div className="images-header">
            <h3>Liven up your spot with photos</h3>
            <h5>Submit a link to at least one photo to publish your spot.</h5>
          </div>
          <label>
            Preview Image URL: <br/>
            <input
              type="text"
              value={previewImageUrl}
              onChange={(e) => setPreviewImageUrl(e.target.value)}
              required
              placeholder="Preview Image URL"
            />
          </label>
          <label>
            Image URL 2: <br/>
            <input
              type="text"
              value={imageUrl2}
              onChange={(e) => setImageUrl2(e.target.value)}
              placeholder="Image URL 2"
            />
          </label>
          <label>
            Image URL 3: <br/>
            <input
              type="text"
              value={imageUrl3}
              onChange={(e) => setImageUrl3(e.target.value)}
              placeholder="Image URL 3"
            />
          </label>
          <label>
            Image URL 4: <br/>
            <input
              type="text"
              value={imageUrl4}
              onChange={(e) => setImageUrl4(e.target.value)}
              placeholder="Image URL 4"
            />
          </label>
          <label>
            Image URL 5: <br/>
            <input
              type="text"
              value={imageUrl5}
              onChange={(e) => setImageUrl5(e.target.value)}
              placeholder="Image URL 5"
            />
          </label>
      </form>
      </div>
    </div>
  )
}

export default CreateSpot;
