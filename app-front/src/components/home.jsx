import MainContainer from './MainContainer'
import PageHeader from './pageHeader'
import SearchBar from './searchBar'
import Slider from './Slider'
const Home = () => {
  return (
    <>
      <SearchBar />
      <Slider />
      <hr />
      <PageHeader
        title={
          <>
            {' '}
            Welcome To Shop <i className="bi bi-suit-heart"></i> Now!
          </>
        }
      />
      <div className="row text-center">
        <div className="col-12 p-2 m-3">
          <h5 className="lh-lg">
            We got a look for every occasions. <br /> Let’s find yours.
          </h5>
          <hr />
        </div>
      </div>
      <MainContainer />
    </>
  )
}

export default Home
