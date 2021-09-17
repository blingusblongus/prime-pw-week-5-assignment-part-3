console.log('***** Music Collection *****')
//I don't know how modules work in html so I just added a script tag to import
//   tracks.js instead
//import {apocalypseTracks, folkloreTracks} from './tracks.js';
//console.log('apocalypseTracks', apocalypseTracks); just checking import

// declare and fill collection array;
const collection = [];
addToCollection('Apocalypse', 'Thundercat', 2009, apocalypseTracks);
addToCollection('7Summers', 'Shaun Martin', 2015);
addToCollection('Motivational Music for the Syncopated Soul', 'Cory Wong', 2019);
addToCollection('The Beyond / Where the Giants Roam', 'Thundercat', 2015);
addToCollection('The Optimist', 'Cory Wong', 2018);
addToCollection('Covers', 'Dirty Loops', 2014);
addToCollection('Folklore', 'Taylor Swift', 2020, folkloreTracks);

function addToCollection(title, artist, yearPublished, tracks) {
  const album = {
    title: title,
    artist: artist,
    yearPublished: yearPublished,
    tracks: tracks
  };

  collection.push(album);
  return album;
}

//testing addToCollection
console.log('***Testing addToCollection');
//console.log(collection); // initial collection test
collection.forEach((obj) => console.log(obj));

// Start showCollection ====================================
function showCollection(array){
  //return number of items in array
  console.log('Number of items:', array.length);

  //display info for each album in collection:
  for(let album of array){
    const title = album.title;
    const artist = album.artist;
    const year = album.yearPublished;

    console.log(`${title} by ${artist}, published in ${year}`);

    if(album.tracks){
      //print tracklist if it exists
      for(let i=0; i<album.tracks.length; i++){
        console.log(`  ${i + 1}. ${album.tracks[i].trackName}`);
      }
    }else{
      //print 'no info' if !album.tracks
      console.log('  No Track Info');
    }
  }
}

//testing showCollection
console.log('\n***Testing showCollection***');
showCollection(collection);

//start findByArtist ====================================
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


//start search ======================================
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
      console.log('checking prop: ', prop);

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

    //if doesn't meet criteria, skip to next album;
    if(!meetsCrit) continue;
    //if no criteria tests fail, push to result
    console.log('full match for', album.title);
    result.push(album);
  }
  return result;
} // search() end =====================================

// start checkTracks - helper function returns true if album contains track=====
function checkTracks(searchTrackName, album){
  //log arguments for reference
  console.log('checkTracks - searchTrackName: ', searchTrackName, ', album: ', album.title);

  //check if album has track info
  if(!album.tracks){
    console.log('no track info');
    return false;
  }else{
    //loop through tracks and return true on match
    for(let track of album.tracks){
      if(searchTrackName === track.trackName){
        console.log('track matches!');
        return true;
      }
    }
  }
  return false;
} // checkTracks() end=================================

//test search()
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
