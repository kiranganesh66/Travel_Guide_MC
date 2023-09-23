import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelPlaceList from '../TravelPlaceList'
import './index.css'

const apiStatusContants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inProgress: 'IN_PROGRESS',
}

class TravelGuide extends Component {
  state = {placeList: [], apiStatus: apiStatusContants.initial}

  componentDidMount() {
    this.getTravelPlaces()
  }

  renderFormattedData = data => ({
    id: data.id,
    name: data.name,
    imageUrl: data.image_url,
    description: data.description,
  })

  getTravelPlaces = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})

    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fectchedData = await response.json()
      const updatedList = fectchedData.packages.map(eachone =>
        this.renderFormattedData(eachone),
      )
      this.setState({
        placeList: updatedList,
        apiStatus: apiStatusContants.success,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPlaceVeiw = () => {
    const {placeList} = this.state
    return (
      <ul className="place-list-contanier">
        {placeList.map(each => (
          <TravelPlaceList each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContants.success:
        return this.renderPlaceVeiw()
      case apiStatusContants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="travelGuideCOn">
        <h1 className="Heading">Travel Guide</h1>
        <hr className="separ" />
        {this.renderViewBasedOnApiStatus()}
      </div>
    )
  }
}

export default TravelGuide
