import './index.css'

const DestinationItem = props => {
  const {eachDestination} = props
  const {id, name, imageUrl, description} = eachDestination
  return (
    <li className='list-item-styling'>
      <img src={imageUrl} alt={name} className='thumbnail-styling' />
      <h2 className='destination-title'>{name}</h2>
      <p className='description-styling'>{description}</p>
    </li>
  )
}

export default DestinationItem
