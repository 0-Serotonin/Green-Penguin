import React, { Component } from "react";
import { articleList } from "./articleList";
import BrowseManager from "./BrowseManager";
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
              <BrowseManager 
              handleChange = {this.handleChange}
              name = "ewaste"
              checked = {this.state.categories.ewaste}
              title = " E-waste"
              />

              <BrowseManager
              handleChange = {this.handleChange}
              name = "lightingwaste"
              checked = {this.state.categories.lightingwaste}
              title = " Lighting Waste"
              />

              <BrowseManager 
              handleChange = {this.handleChange}
              name = "cashtrash"
              checked = {this.state.categories.cashtrash}
              title = " Cash for Trash"
              />

              <BrowseManager
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

