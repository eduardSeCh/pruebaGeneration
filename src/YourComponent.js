import React, {Component } from 'react';
import {coordenates} from './GetCoordinates'
/*
* Use this component as a launching-pad to build your functionality.
*
*/
Promise.all(coordenates)
  .then(resultados => {
    console.log('resultados', resultados);
    resultados.forEach(result => {
      markerPositions.push({ lat: result.latitude, lng: result.longitude });
    });
    console.log('markerPositions', markerPositions);
    addMarkersToMap();
  })
  .catch(error => console.log(error));

const addMarkersToMap = () => {
  const mexico = { lat: 23.634501, lng: -102.552784 };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: mexico,
    zoom: 5,
  });
  markerPositions.forEach(position => {
    new google.maps.Marker({
      position,
      map,
    });
  });
};

const mexico = {lat: 23.634501, lng:-102.552784};
let geocoder;
let map;
let marker;
function initMap() {
  //Mapa de mexico
  map = new google.maps.Map(document.getElementById('map'), {
    center: mexico,
    zoom: 5,
  });
  //markers
  
  
}
window.initMap = initMap;

export default class YourComponent extends Component {
  render() {
    return (
      <div style={divStyle}>
		    <h1> Mexico!</h1>
        <div style={{width:"100%", height: "400px"}}>
          <div id="map" style={{width:"100%", height: "400px"}}></div>
        </div>
     </div>
    );
  }
}


var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 20
};