import React, { Component } from 'react';
// import axios from 'axios';
// import Qs from 'qs';

// const apiKey = '6d092bf1a0565b78d624c7da781eca63'
// const url = 'http://api.petfinder.com/'
// const findShelterURL = url + 'shelter.find'
// const getBreedURL = url + 'shelter.getPets'

class DisplayPets extends Component {
    constructor() {
        super();
        this.state={
            shelter: [],
            pets: [],
            input: ''
        }
    }
    render() {
        return (
            <div id="displayPets">
                {this.state.pets.map(pet => {
                    return (
                        <div key={pet.id.$t} className="pets">
                            <h2>{pet.name.$t}</h2>
                            <div className="petImg">
                                <img src={pet.media.photos.photo[2].$t} />
                            </div>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default DisplayPets;