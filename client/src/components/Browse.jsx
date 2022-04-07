import React, { Component } from "react";
import styled from "styled-components";
import { articleList } from "./articleList";
import BrowseFilter from "./BrowseFilter";
import RenderArticles from "./RenderArticles";

export default class Browse extends Component{
  state = {
    articles: articleList,
    categories: {
      "ewaste": false,
      "lightingwaste": false,
      "cashtrash": false,
      "oldproducts": false
    }
  }

  handleChange = (e) => {
    const { name } = e.target;

    this.setState((prevState) => {
      return {
        categories: {
          ...prevState.categories,
          [name]: !prevState.categories[name]
        }
      };
    });
  };

  render(){

    {/* Filtering*/}
    const checkedArticles = Object.entries(this.state.categories)
      .filter((category) => category[1])
      .map((category) => category[0]);

    const filteredArticles = this.state.articles.filter(({ category }) =>
    checkedArticles.includes(category)
    );
    
    return (
      <div className="browse">
        <div class="container">
          <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
            <h1 class="font-weight-light">Activities</h1>
          </div>
     
          <div class ="row">
        
            <div class="col-lg-3">
              <h4>Filter</h4>
              <BrowseFilter 
              handleChange = {this.handleChange}
              name = "ewaste"
              checked = {this.state.categories.ewaste}
              title = " E-waste"
              />

              <BrowseFilter 
              handleChange = {this.handleChange}
              name = "lightingwaste"
              checked = {this.state.categories.lightingwaste}
              title = " Lighting Waste"
              />

              <BrowseFilter 
              handleChange = {this.handleChange}
              name = "cashtrash"
              checked = {this.state.categories.cashtrash}
              title = " Cash for Trash"
              />

              <BrowseFilter 
              handleChange = {this.handleChange}
              name = "oldproducts"
              checked = {this.state.categories.oldproducts}
              title = " Old Products"
              />
            </div>

            {/* Generates all Articles*/}
            <RenderArticles
              articles = {
                filteredArticles.length === 0 ? this.state.articles : filteredArticles
              }
            />

          </div>
        </div>
      </div>
    );
  }
}



const Button = styled.button`
  background-color: white;
  color: black;
  font-size: 14px;
  padding: 10px 145px;
  border-radius: 0px;
  margin: 1px 100px
  cursor: pointer;
`;

// import React from "react";
// import styled from "styled-components";
// import { NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";

// function Browse() {
//   // /** NEW FILTERED HOTEL STATE  **/
//   // const [Activities, setNewActivity] = useState([]);
//   // const [handleCheck, setHandleCheck] = useState({});
   

//   //   const handleChange =  (e) => {
//   //          setHandleCheck({...handleCheck, [e.target.name]: e.target.checked})
//   //      }

//   //     useEffect(() => {
//   //       function filterbyName (value) {
//   //           if (handleCheck !== undefined) {
//   //               let filterKeys = ['E-waste', 'Lighting waste', 'Cash for trash', 'Old clothes'];
        
//   //               return filterKeys.every(function(key) {
//   //                   return !handleCheck[key] || value[key];
//   //               });
//   //           } else {
//   //               return value;
//   //           }
//   //       }
        
     
//   //     //  setNewActivity(
//   //     //      Browse.filter(filterbyName)
//   //     //  )
//   //     });


//   return (
//     <div className="browse">
//       <div class="container">
//       <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '20vh'}}>
//         <h1 class="font-weight-light">Activities</h1>
//       </div>
     
        
//       <div class ="row">
        
//         <div class="col-lg-3">
//         <h4>Filter</h4>
//          <div class="form-check">
//             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
//             <label class="form-check-label" for="flexCheckDefault">
//               E-waste
//             </label>
//           </div>

//            <div class="form-check">
//             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
//             <label class="form-check-label" for="flexCheckDefault">
//               Lighting waste
//             </label>
//           </div>

//           <div class="form-check">
//             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
//             <label class="form-check-label" for="flexCheckDefault">
//               Cash for trash
//             </label>
//           </div>

//           <div class="form-check">
//             <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
//             <label class="form-check-label" for="flexCheckDefault">
//               Old Products
//             </label>
//           </div>
//           </div>

//         <div class="col-lg-4">
//             <ul> <img
//               class="thumbnail"
//               src="https://images.unsplash.com/photo-1605493666596-f605022f28ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2FsbCUyMGV8ZW58MHx8MHx8&w=1000&q=80"
//               alt=""
//               width="300"
//               height='200'
//             />
//           </ul>
//           </div>
          
//         <div class="col-lg-5">
//           <h4 className style={{ fontFamily: "Arial", fontWeight: 'normal'}}>Recycle E-Waste today</h4>
//           <p className style={{ textAlign: 'justify'}}>IT devices and equipment contain toxic substances like lead, mercury, cadmium, polybrominated flame retardants, barium and lithium. If not properly handled, these toxic substances can leach into soil or pollute our air and water supplies. It is thus vital that end-of-life IT equipment be only handled by trusted, professional recycling companies like METech.</p>  
//           <NavLink className="nav-link" to="/ewaste">
//                   <Button>SEE MORE</Button>
//           </NavLink>
//         </div>

//         <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '45vh'}}></div>
//         <div class="col-lg-3"></div>
//         <div class="col-lg-4">
//             <ul> <img
//               class="thumbnail"
//               size="small"
//               src="https://cdn.vox-cdn.com/thumbor/621Xh7QwY6EMEs8nL2dlhZ_hDuw=/0x0:5171x3447/1200x800/filters:focal(2173x1311:2999x2137)/cdn.vox-cdn.com/uploads/chorus_image/image/65178250/hue_edison.0.jpg"
//               alt=""
//               width="300"
//               height='200'
//             />
//           </ul>
//           </div>
//         <div class="col-lg-5">
//           <h4 className style={{ fontFamily: "Arial", fontWeight: 'normal'}}>Recycle Lighting Waste today</h4>
//           <p className style={{ textAlign: 'justify'}}>Lighting recycling is getting easier
// Recycling light bulbs keeps toxic metals like mercury out of landfill, where it can contaminate the environment and waterways. It also recovers a variety of materials such as glass, ceramic, aluminium and phosphor that can be reused in products like aluminium cans and fertiliser.</p>  
//           <NavLink className="nav-link" to="/lightingwaste">
//                   <Button>SEE MORE</Button>
//           </NavLink>  
//         </div>

          
        
//         <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '45vh'}}></div>
//         <div class="col-lg-3"></div>
//         <div class="col-lg-4">
//             <ul> <img
//               class="thumbnail"
//               size="small"
//               src="https://www.sciencenewsforstudents.org/wp-content/uploads/2020/12/1030_recycling_clothes.jpg"
//               alt=""
//               width="300"
//               height='200'
//             />
//           </ul>
//           </div>
//         <div class="col-lg-5">
//           <h4 className style={{ fontFamily: "Arial", fontWeight: 'normal'}}>Cash For Trash</h4>
//           <p className style={{ textAlign: 'justify'}}>Cash-for-Trash is an incentive programme by Public Waste Collectors, where residents may bring their recyclables to the Cash-for-Trash stations and cash is given in exchange for recyclables. For more information on the rebates, please contact your Public Waste Collector.
//           </p>  
//           <NavLink className="nav-link" to="/cash">
//                   <Button>SEE MORE</Button>
//           </NavLink>  
//         </div>

//         <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '45vh'}}></div>
//         <div class="col-lg-3"></div>
//         <div class="col-lg-4">
//             <ul> <img
//               class="thumbnail"
//               size="small"
//               src="https://blog.ijugaad.com/file/2017/02/old-jeans-e1499247390705.jpg"
//               alt=""
//               width="300"
//               height='200'
//             />
//           </ul>
//           </div>
//         <div class="col-lg-5">
//           <h4 className style={{ fontFamily: "Arial", fontWeight: 'normal'}}>Recycle old products</h4>
//           <p className style={{ textAlign: 'justify'}}>There are numerous places you can recycle your old products! 
// From Salvation Army to Minds, the possibilities are endless.
//           </p>  
//           <NavLink className="nav-link" to="/oldproducts">
//                   <Button>SEE MORE</Button>
//           </NavLink>  
//         </div>

      
        
        
//         </div>
//         </div>
//       </div>

//   );
// }

// export default Browse;

// const Button = styled.button`
//   background-color: white;
//   color: black;
//   font-size: 14px;
//   padding: 10px 145px;
//   border-radius: 0px;
//   margin: 1px 100px
//   cursor: pointer;
// `;