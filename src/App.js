import React, { Component } from 'react';
import axios from 'axios';
import Qs from 'qs';
import { FaPaw } from 'react-icons/fa';
import './App.scss';


const apiKey = '6d092bf1a0565b78d624c7da781eca63'
const url = 'http://api.petfinder.com/'
const findShelterURL = url + 'shelter.find'
const getBreedURL = url + 'shelter.getPets'

class App extends Component {
  constructor () {
    super();
    this.state={
      shelter: [],
      input: '',
      pets: [],
    }
  }

  // capture change of userinput then updates the state 
  handleChange = (e) => {
    this.setState ({
      [e.target.name]: e.target.value
    })
  }

 
  // makes axios call using userinput postal code to locate shelters
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    axios ({
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      method: 'GET',
      paramsSerializer: function (params) {
        return Qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      },
      params: {
        reqUrl: findShelterURL,
        params: {
          key: apiKey,
          format: 'json',
          output: 'basic',
          location: this.state.input,
          count: 12,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((res) => {
      // console.log(res);
      res = res.data.petfinder.shelters.shelter
      console.log(res);
      this.setState({
        shelter: res,
        input: ''
      })
    })
  }

  // when button is clicked, make axios call to grab pets
  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: [e.target.value]
    })
    axios({
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      method: 'GET',
      paramsSerializer: function (params) {
        return Qs.stringify(params,
          {
            arrayFormat: 'brackets'
          })
      },
      params: {
        reqUrl: getBreedURL,
        params: {
          key: apiKey,
          format: 'json',
          output: 'basic',
          id: e.target.value, // shows ID OF THAT SPECIFIC SHELTER
          count: 20,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then((res)=>{
      res = res.data.petfinder.pets.pet
      console.log(typeof res, res);
      this.setState({
        pets: res,
      })
  })
}
  render() {
    return (
      <div className="App">

      <header>
          <div className="title">
              <h1>Simple <FaPaw color="#f3f3f3"/> Adopt</h1>
          </div>
          
          
            <form onSubmit={this.handleSubmit} >
              <label htmlFor="input"></label>
              <input type="text" name="input" id="userInput" onChange={this.handleChange} value={this.state.input} placeholder="Type in your postal code" />
              <label htmlFor="submit"></label>
              <input type="submit" id="submit" value="Find Shelters" />
            </form>
        
        </header>

        <div id="displayShelters">
          <div className="wrapper shelters">
            {this.state.shelter.map(shelter => {
              return (
                <div key={shelter.id.$t} className="shelter">
                    <h3>{shelter.name.$t}</h3>
                    <p>{shelter.city.$t}</p>
                    <button onClick={this.handleClick} name="shelterid" value={shelter.id.$t}>Display Pets</button>
                </div>
              )
            })
            }
          </div>
        </div>

        <div id="displayPets">
          <div className="wrapper pets">
            {this.state.pets.map(pet => {
              // const petImg = backgroundImage: url({pet.media.photos.photo[3].$t}),
            
                return (
                <div key={pet.id.$t} className="pet">
                  <h2>{pet.name.$t}</h2>
                  <div className="petImg">
                    <img src={pet.media.photos.photo[3].$t}/>
                  </div>

                  <div className="petDescription">
                      <p>Mix: {pet.mix.$t}</p>
                      <p>Age: {pet.age.$t}</p>
                      <p>Sex: {pet.sex.$t}</p>
                      {/* <div className="contact"> */}
                        <a href={"mailto:" + pet.contact.email.$t}>Email</a>
                        <a href={"tel:" + pet.contact.phone.$t}>Phone</a>
                      {/* </div> */}
                     
                    </div>
                </div>
                )
            })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
