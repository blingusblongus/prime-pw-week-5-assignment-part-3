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
