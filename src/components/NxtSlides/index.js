import {Component} from 'react'
import {v4 as uuid} from 'uuid'

import Header from '../Header'

import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlides extends Component {
  state = {
    slidesList: initialSlidesList,
    activeId: initialSlidesList[0].id,
    isHeadingEditing: false,
    isDescriptionEditing: false,
    headingValue: initialSlidesList[0].heading,
    descriptionValue: initialSlidesList[0].description,
  }

  changeHeadingValue = event => {
    this.setState({headingValue: event.target.value})
  }

  changeDescriptionValue = e => {
    this.setState({descriptionValue: e.target.value})
  }

  changeActiveId = e => {
    console.log(e.target)
    this.setState({activeId: e.target.id})
  }

  renderSlideCard = slide => {
    const {slidesList, activeId} = this.state
    const {id, heading, description} = slide
    const index = slidesList.findIndex(s => s.id === id)
    const slideNumber = index + 1
    return (
      <li
        key={id}
        className={`slide-card-li ${
          activeId === id ? 'active-slide-card' : ''
        }`}
        testid={`slideTab${slideNumber}`}
        id={id}
        onClick={this.changeActiveId}
        active={activeId === id}
      >
        <p id={id}>{index + 1}</p>
        <div className="slide-card" id={id}>
          <h1 className="heading" id={id}>
            {heading}
          </h1>
          <p className="description" id={id}>
            {description}
          </p>
        </div>
      </li>
    )
  }

  headingEditable = () => {
    this.setState(prev => ({isHeadingEditing: !prev.isHeadingEditing}))
  }

  changeHeading = e => {
    console.log(e)
    const {slidesList, activeId} = this.state
    const list = slidesList.map(slide => {
      if (slide.id === activeId) {
        return {
          ...slide,
          heading: e.target.value,
        }
      }
      return slide
    })
    console.log(list)
    this.setState(prev => ({
      slidesList: list,
      isHeadingEditing: !prev.isHeadingEditing,
    }))
  }

  descriptionEditable = () => {
    this.setState(prev => ({isDescriptionEditing: !prev.isDescriptionEditing}))
  }

  changeDescription = e => {
    console.log(e)
    const {slidesList, activeId} = this.state
    const list = slidesList.map(slide => {
      if (slide.id === activeId) {
        return {
          ...slide,
          description: e.target.value,
        }
      }
      return slide
    })
    console.log(list)
    this.setState(prev => ({
      slidesList: list,
      isDescriptionEditing: !prev.isDescriptionEditing,
    }))
  }

  addNewSlide = () => {
    const {slidesList, activeId} = this.state
    const index = slidesList.findIndex(s => s.id === activeId)
    const id = uuid()
    slidesList.splice(index + 1, 0, {
      id,
      heading: 'Heading',
      description: 'Description',
    })
    console.log(slidesList)
    this.setState({slidesList, activeId: id})
  }

  render() {
    const {
      slidesList,
      activeId,
      isHeadingEditing,
      isDescriptionEditing,
      headingValue,
      descriptionValue,
    } = this.state
    const currSlide = slidesList.filter(slide => slide.id === activeId)[0]
    console.log(currSlide)
    const {heading, description} = currSlide
    return (
      <div>
        <Header />
        <div>
          <button
            type="button"
            className="new-button button-container"
            onClick={this.addNewSlide}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
              className="plus-icon"
            />
            <p>New</p>
          </button>

          <div className="container">
            <ol className="slides-container">
              {slidesList.map(slide => this.renderSlideCard(slide))}
            </ol>
            <div className="active-card-container">
              <div className="active-card">
                {isHeadingEditing ? (
                  <input
                    type="text"
                    onChange={this.changeHeadingValue}
                    value={headingValue}
                    onBlur={this.changeHeading}
                  />
                ) : (
                  <h1 onClick={this.headingEditable} className="hed-slide">
                    {heading}
                  </h1>
                )}
                {isDescriptionEditing ? (
                  <input
                    type="text"
                    onChange={this.changeDescriptionValue}
                    value={descriptionValue}
                    onBlur={this.changeDescription}
                  />
                ) : (
                  <p onClick={this.descriptionEditable} className="desc-slide">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NxtSlides
