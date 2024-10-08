import styled from "styled-components";

const Categories = () => {
  return (
    <>
      <div className="cate-section">
        <div className="cate-content">
          <h1 className="cate-h1">Find your way
            to our products</h1>
          <p className="cate-content-para">We never stop inventing. We have over
            100,000 patents to prove it.</p>
          <button className="solid-button">View All</button>
        </div>

        <div className="categories">
          <div className="single-cate">
            <p className="single-cate-para">Load Balancer</p>
            <img className="single-cate-img" src="/img/cat1.png" alt="" />
          </div>

          <div className="single-cate">
            <p className="single-cate-para">Wires</p>
            <img className="single-cate-img" src="/img/cat2.png" alt="" />
          </div>

          <div className="single-cate">
            <p className="single-cate-para">Keystone Jack, Shielded</p>
            <img className="single-cate-img" src="/img/cat3.png" alt="" />
          </div>

          <div className="single-cate">
            <p className="single-cate-para">Patch Cord</p>
            <img className="single-cate-img" src="/img/cat4.png" alt="" />
          </div>

          <div className="single-cate">
            <p className="single-cate-para">Patch Cord</p>
            <img className="single-cate-img" src="/img/cat5.png" alt="" />
          </div>

          <div className="single-cate">
            <p className="single-cate-para">CAT 3 Keystone Jack</p>
            <img className="single-cate-img" src="/img/cat6.png" alt="" />
          </div>
        </div>

      </div>
    </>
  );
};

export default Categories;