import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import DestinationItem from '../DestinationItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProcess: 'INPROCESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class TravelBook extends Component {
  state = {
    status: apiStatusConstants.initial,
    packagesList: [],
  }

  componentDidMount() {
    this.renderPackages()
  }

  renderFormat = data => {
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.image_url,
      description: data.description,
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderPackages = async () => {
    this.setState({status: apiStatusConstants.inProcess})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const response = await fetch(apiUrl)
    if (response.ok) {
      this.setState({status: apiStatusConstants.success})
      const data = await response.json()
      console.log(data.packages)
      this.setState({
        packagesList: data.packages.map(eachItem =>
          this.renderFormat(eachItem),
        ),
      })
    }
  }

  renderDestinationList = () => {
    const {packagesList} = this.state
    return(
      <ul className="destinations-list-styling">
      {
        packagesList.map(eachDestination => (<DestinationItem eachDestination={eachDestination} key={eachDestination.id}/>))
      }
      </ul>
    )
  }

  renderOutput = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.inProcess:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderDestinationList()
      default:
        return null
    }
  }

  render() {
    const {status} = this.state
    console.log(status)
    return (
      <div className="main-container">
        <div className="content-container">
          <h1 className="title-text">Travel Guide</h1>
          {this.renderOutput()}
        </div>
      </div>
    )
  }
}

export default TravelBook
