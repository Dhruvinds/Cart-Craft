import React from "react";
import "../styles/banner.css";

const Banner = () => {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        data-interval="1000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active " >
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Acc/boAt/Shop_now/New/1500x300.jpg"
              className="d-block w-100"
              alt="poster"
            />
          </div>
          <div className="carousel-item" >
            <img
              src="../../images/banner2.jpg"
              className="d-block w-100"
              alt="poster"
            />
          </div>
          <div className="carousel-item " >
            <img
              src="https://images-na.ssl-images-amazon.com/images/G/31/img22/Beauty/SS22_Flip/Beauty/Headers/PC/Header-PC-01._SX3000_QL85_.jpg"
              className="d-block w-100"
              alt="poster"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

{/* <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Acc/boAt/Shop_now/New/1500x300.jpg" alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="../../images/banner2.jpg" alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="https://images-na.ssl-images-amazon.com/images/G/31/img22/Beauty/SS22_Flip/Beauty/Headers/PC/Header-PC-01._SX3000_QL85_.jpg" alt="Third slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div> */}

    </>
  );
};
export default Banner;
