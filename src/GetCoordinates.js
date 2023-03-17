import React from "react";
import { async } from "regenerator-runtime";
import 'regenerator-runtime/runtime'

const apiKey = 'pk.e28e5d75c0c2b45b5671f4e837e7dbe1';
const apiUrl = 'https://us1.locationiq.com/v1/search.php'
const addresses = []
const coordenates = []

fetch('./store_directory.json')
  .then(response => response.json())
  .then(data => {
    data.slice(0,18).forEach(store => {
      addresses.push(store.Address);
    });

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      const address = addresses[currentIndex];
      GetCoordinates(address)
        .then(data => coordenates.push(data))
        .catch(error => console.log(error));

      currentIndex++;
      if (currentIndex >= addresses.length) {
        clearInterval(intervalId);
        console.log('All addresses geocoded.',coordenates);
      }
    }, 2000);

    console.log(coordenates)
  })
  .catch(error => console.log(error));

const GetCoordinates = (address) => {  
  const url = `${apiUrl}?key=${apiKey}&q=${address}&format=json`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        resolve({latitude,longitude});
      })
      .catch(error => reject(error));
  });
}
export {coordenates}