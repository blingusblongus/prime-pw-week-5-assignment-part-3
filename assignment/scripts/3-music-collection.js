console.log('***** Music Collection *****')
import {apocalypseTracks, folkloreTracks} from './tracks.js';
console.log('apocalypseTracks', apocalypseTracks);


const collection = [];

function addToCollection(title, artist, yearPublished, tracks) {
  const obj = {
    title: title,
    artist: artist,
    yearPublished: yearPublished,
    tracks: tracks
  };

  collection.push(obj);
  return obj;
}

//add the albums to the collection
addToCollection('Apocalypse', 'Thundercat', 2009, apocalypseTracks);
addToCollection('7Summers', 'Shaun Martin', 2015);
addToCollection('Motivational Music for the Syncopated Soul', 'Cory Wong', 2019);
addToCollection('The Beyond / Where the Giants Roam', 'Thundercat', 2015);
addToCollection('The Optimist', 'Cory Wong', 2018);
addToCollection('Covers', 'Dirty Loops', 2014);
addToCollection('Folklore', 'Taylor Swift', 2020, folkloreTracks);

//testing addToCollection
console.log('***Testing addToCollection');
//console.log(collection);
collection.forEach((obj) => console.log(obj));

// Start showCollection ==============
function showCollection(array){
  //return number of items in array
  console.log('Number of items:', array.length);

  //display info:
  for(let obj of array){
    const title = obj.title;
    const artist = obj.artist;
    const year = obj.yearPublished;

    console.log(`${title} by ${artist}, published in ${year}`)
  }
}

//testing showCollection
console.log('\n***Testing showCollection***');
showCollection(collection);

//start findByArtist ===================
function findByArtist(artist){
  const result = [];

  for(let album of collection){
    if(album.artist === artist) result.push(album);
  }

  return result;
}

//testing findByArtist
console.log('\n***Testing findByArtist***');
console.log(findByArtist('Thundercat')); //should return 2 albums
console.log(findByArtist('Phish')); //should return 0 albums


//start search ======================
function search(crit){
  const result = [];

  //loop through Collection
  for(let album of collection){
    console.log('\nchecking', album.title);
    let meetsCrit = true;

    //check each parameter of the criteria
    for(let prop in crit){
      const search = crit[prop];
      //console.log(prop);
      //console.log(album[prop]);
      //console.log(crit[prop]);
      console.log('prop: ', prop);

      if(prop === 'trackName'){
        console.log('checking trackname...')
        console.log('searching for: ', search, 'in album: ', album.title);

        //run helper function
        if(!checkTracks(search, album)){
          console.log('no tracks match');
          meetsCrit = false;
          break;
        }else{
          meetsCrit = true;
        }
      }else if (search !== album[prop]){ //check normal criteria
        console.log('search: ', search, ' prop: ', prop);
        console.log(search, ' does not match ', album[prop]);
        meetsCrit = false;
        break; // prevents unnecessary checking
      }
    }

    //if doesn't meetsCrit, skip to next album;
    if(!meetsCrit) continue;
    //if none fail, push to result
    console.log('full match for', album.title);
    result.push(album);
  }
  return result;
} // search() end ====================

// helper function to return true if album contains track===
function checkTracks(searchTrack, album){
  console.log('checkTracks - searchtrack: ', searchTrack, ', album: ', album.title);
  if(!album.tracks){
    console.log('no track info');
    return false;
  }else{
    for(let track of album.tracks){
      if(searchTrack === track.trackName){
        console.log('track matches!');
        return true;
      }
    }
  }
  return false;
} // checkTracks() end================

//test search
console.log('\n*** Testing search ***');
console.log('Test single property search============');
console.log(search({artist: 'Thundercat'})); // should return two albums
console.log('\nTest multi-prop search==========');
console.log(search({artist: 'Thundercat', yearPublished: 2009})); //should return 1
console.log('\nTest no-prop search=============');
console.log(search({}));

console.log('\nTest trackName search ==========');
console.log('#########should return apocalypse', search({trackName: 'The Life Aquatic'}));
console.log('###########should return apocalypse: ', search({trackName: 'The Life Aquatic', title: 'Apocalypse'})); //should return apocalype
console.log('########should return empty:', search({trackName: 'The Life Aquatic', title: 'The Beyond / Where the Giants Roam'})); //should return empty
console.log('########should return Apocaplse AND Folklore:', search({trackName: 'Seven'}));
console.log('########should return ONLY Folklore: ', search({trackName: 'Seven', artist: 'Taylor Swift'}));
