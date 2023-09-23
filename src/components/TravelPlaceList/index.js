import './index.css'

const TravelPlaceList = props => {
  const {each} = props
  const {name, description, imageUrl} = each

  return (
    <li className="placeContanier">
      <img src={imageUrl} className="place_img" alt={name} />
      <h1 className="heading">{name}</h1>
      <p className="des">{description} </p>
    </li>
  )
}

export default TravelPlaceList
