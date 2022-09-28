import Button from './button'
import './css/mainContainer.css'

const MainContainer = () => {
  return (
    <>
      <br />
      <br />
      <div className="row featurette p-4 mb-3">
        <div className="col-md-7 order-md-2">
          <h2 className="featurette-heading fw-normal lh-1 mt-4 text-center">
            Oh yeah, it’s that good.{' '}
            <span className="text-muted">See for yourself.</span>
          </h2>
          <p className="lead text-center m-3">
            Our new summer collaction is already here! <br /> let's have a
            stylish SUMMER!
          </p>
          <Button />
        </div>

        <div className="col-md-5 order-md-1">
          <img
            className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto w-75 justify-content-center "
            src={require('../assests/sunglasses.png')}
            alt=""
          />
        </div>
      </div>
    </>
  )
}

export default MainContainer
