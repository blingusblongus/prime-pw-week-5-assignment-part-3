console.log('***** Music Collection *****')

const collection = [];

function addToCollection(title, artist, yearPublished) {
  const obj = {
    title: title,
    artist: artist,
    yearPublished: yearPublished
  };

  collection.push(obj);
  return obj;
}

addToCollection('Apocalypse', 'Thundercat', 2009);
addToCollection('7Summers', 'Shaun Martin', 2015);
addToCollection('Motivational Music for the Syncopated Soul', 'Cory Wong', 2019);
addToCollection('The Beyond / Where the Giants Roam', 'Thundercat', 2015);
addToCollection('The Optimist', 'Cory Wong', 2018);
addToCollection('Covers', 'Dirty Loops', 2014);


console.log(collection);
