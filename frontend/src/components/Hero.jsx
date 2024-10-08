import '../style.css'

const Hero = () => {

  return (
    <>
      <div className="hero">
        <div className="hero-img-div"><img className="hero-img" src="/img/world.png" alt="" /></div>
        <div className="hero-content">
          <h1 className="hero-heading">Connect the world to Higher Standards</h1>
          <button className="transparent-button">Learn more</button>
        </div>
      </div>
    </>
  );
};

export default Hero;
