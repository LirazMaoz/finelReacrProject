import { Link } from 'react-router-dom'
import PageHeader from './pageHeader'

const About = () => {
  return (
    <>
      <PageHeader title={<> A little about us!</>} />
      <div className="row text-center m-2">
        <div className="col-12">
          <h3 className="text-center m-3">The story of shop now site</h3>
          <hr />
          <h5 className="">
            Welcome to{' '}
            <Link
              to="/"
              className="text-secondary"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              ShopNow.com
            </Link>{' '}
            <br />
          </h5>
          <p className="fs-5 m-2 lh-lg">
            As a people who lives in <span className="fw-bolder">Israel,</span>{' '}
            most of the year we enjoys from a lovely sunny days! but of course
            we need to be safe from it as well. <br /> This is why we decided to
            start a new little company by the name Shop Now who provided a
            stylish sunglasses in a affordable prices without compromising on
            the quality.
          </p>

          <h6>
            We welcoming you to chose a perfect sunglasses who match your style!
          </h6>
        </div>
      </div>
    </>
  )
}

export default About
