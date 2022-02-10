import {tileW,tileH} from './game.js';

export default class Vaccine {
    constructor(position){
        this.currentPos	= position; // item position in grid units
        this.position	= [position[0]*tileW,position[1]*tileH]; // item position in pixels
        this.dimensions	= [80,50];
    }

    addVaccine(vaccineElements){
        let bodyEl = document.getElementsByTagName("body")[0];
        let vaccineEl = document.createElement("img");
        vaccineEl.src = "./images/vaccine.png";
        bodyEl.append(vaccineEl);
        vaccineElements.push(vaccineEl);
        }
    
}