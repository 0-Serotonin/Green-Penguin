import React from "react";

function Contact() {
  return (
    <div className="contact">
      <div class="container">
      <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
        <h1 class="font-weight-light">Contact Us</h1>
      </div>
        <div class="row align-items-center my-4">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="https://www.littledayout.com/wp-content/uploads/e01-yunnan-garden.jpg"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <ul>
            &#128222; +65 8888 8888
            </ul>
            <ul>
            &#128231; GreenPirates@gmail.com
            </ul>
            <ul>
            &#9978;Yunnan Corner <br></br>
            Nanyang Technological University (NTU), <br></br>
            3 Students Walk 639546 
            </ul>
              
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
