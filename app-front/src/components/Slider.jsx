import Carousel from 'react-bootstrap/Carousel'

const Slider = () => {
  return (
    <div className="containerCarusle">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_1280.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>To Every Look</h3>
            <p>Step Into The House Of Sun.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2017/09/01/21/53/sunglasses-2705642_1280.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>All The Shades</h3>
            <p>Explore Our Exlusive Style.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cdn.pixabay.com/photo/2016/11/21/16/01/woman-1846127_1280.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>No Metter Who You Are </h3>
            <p>
              We Got You.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default Slider
