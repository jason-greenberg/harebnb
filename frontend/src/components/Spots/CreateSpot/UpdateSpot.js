import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleSpotData, updateSingleSpot } from '../../../store/spots';
import './CreateSpot.css';

function UpdateSpot() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorsLoaded, setErrorsLoaded] = useState(false)
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spot = useSelector(state => state.spots.singleSpot);
  const user = useSelector(state => state.session.user);
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState('');
  const history = useHistory();

  const setSpot = async () => {
    const spotData = await dispatch(getSingleSpotData(spotId));
    setCountry(spotData.country);
    setAddress(spotData.address);
    setCity(spotData.city);
    setState(spotData.state);
    setLatitude(spotData.lat);
    setLongitude(spotData.lng);
    setDescription(spotData.description);
    setName(spotData.name);
    setPrice(spotData.price);
    setIsLoaded(true);
  }

  useEffect(() => {
    setSpot()
  }, [dispatch, spotId]);

  const validate = () => {
    const validationErrors = {};
    if (!country) validationErrors.country = 'Country is required';
    if (!address) validationErrors.address = 'Address is required';
    if (!city) validationErrors.city = 'City is required';
    if (!state) validationErrors.state = 'State is required';
    if (!latitude) validationErrors.latitude = 'Latitude is required';
    if (!longitude) validationErrors.longitude = 'Longitude is required';
    if (description.length < 30) {
      validationErrors.description = 'Description needs a minimum of 30 characters';
    }
    if (!description) validationErrors.description = 'Description is required';
    if (!name) validationErrors.name = 'Name is required';
    if (!price) validationErrors.price = 'Price is required';

    setErrorsLoaded(false)
    return validationErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors)
    if (!Object.keys(validationErrors).length) {
      const newSpot = {
        id: spot.id,
        address,
        city,
        state,
        country,
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
        name,
        description,
        price: parseFloat(price)
      }
      // Update Spot and add to spots.singleSpot slice of state
      const spotData = await dispatch(updateSingleSpot(newSpot));

      // Redirect user to newly created spot details page
      history.push(`/spots/${spot.id}`);
    } else {
      return;
    }
  }

  // Prevent users from attempting to view edit page for spot they don't own
  if (isLoaded && (!user || spot.ownerId !== user.id) ) {
    history.push('/');
    return (
      <div className="create-spot-container">
          <h1>Forbidden</h1>
      </div>
    )
  }

  return (
    <>
      {isLoaded && (
        <div className="create-spot-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h2 className="form-header">Update your Spot</h2>
              <div className="location-header">
                <h3>Where's your place located?</h3>
                <h5>Guests will only get your exact address once they booked a reservation.</h5>
              </div>
              <label>
                Country { errors.country && <span className="error-message">{errors.country}</span>}<br/>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                />
              </label>
              <label>
                Address { errors.address && <span className="error-message">{errors.address}</span>}<br/>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                />
              </label>
              <div className="city-state">
                <label>
                  City { errors.city && <span className="error-message">{errors.city}</span>}<br/>
                  <input
                    className="city-input"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </label>
                <div className="comma">,</div>
                <label>
                  State { errors.state && <span className="error-message">{errors.state}</span>}<br/>
                  <input
                    className="state-input"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                  />
                </label>
              </div>
              <div className="lat-lng">
                <label>
                  Latitude { errors.latitude && <span className="error-message">{errors.latitude}</span>}<br/>
                  <input
                    className="lat-input"
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                  />
                </label>
                <div className="comma">,</div>
                <label>
                  Longitude { errors.longitude && <span className="error-message">{errors.longitude}</span>}<br/>
                  <input
                    className="lng-input"
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                  />
                </label>
              </div>
              <div className="break"></div>
              <div className="description-header">
                <h3>Describe your place to guests</h3>
                <h5>
                  Mention the best features of your space, any special amentities like
                  fast wifi or parking, and what you love about the neighborhood.
                </h5>
              </div>
              <label>
                <textarea
                  rows="8"
                  cols="52"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please write at least 30 characters"
                  className="description-input"
                />
                <div className="error-message">{errors.description}</div>
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
                  placeholder="Name of your spot"
                />
                <div className="error-message">{errors.name}</div>
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
                  placeholder="Price per night (USD)"
                  className="price-input"
                />
                <div className="error-message">{errors.price}</div>
              </label>
              <div className="break"></div>
              <button className="create-spot-button">Update Spot</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UpdateSpot;
