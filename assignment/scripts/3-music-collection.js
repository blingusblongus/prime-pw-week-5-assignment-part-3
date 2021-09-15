console.log('***** Music Collection *****')

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
addToCollection('Apocalypse', 'Thundercat', 2009, [
  {
  trackName: 'Tenfold',
  duration: '3:04'
},
{
  trackName: 'Heartbreaks + Setbacks',
  duration: '3:23'
},
{
  trackName: 'The Life Aquatic',
  duration: '2:36'
},
{
  trackName: 'Special Stage',
  duration: '2:56'
},
{
  trackName: 'Tron Song',
  duration: '2:34'
},
{
  trackName: 'Seven',
  duration: '2:16'
},
{
  trackName: 'Oh Sheit It\'s X',
  duration: '3:47'
},
{
  trackName: 'Without You',
  duration: '4:41'
},{
  trackName: 'Lotus and the Jondy',
  duration: '4:52'
},{
  trackName: 'Evangelion',
  duration: '2:20'
},{
  trackName: 'We\'ll Die',
  duration: '0:55'
},{
  trackName: 'A Message for Austin/Praise the Lord/Enter the Void',
  duration: '6:35'
}]);
addToCollection('7Summers', 'Shaun Martin', 2015);
addToCollection('Motivational Music for the Syncopated Soul', 'Cory Wong', 2019);
addToCollection('The Beyond / Where the Giants Roam', 'Thundercat', 2015);
addToCollection('The Optimist', 'Cory Wong', 2018);
addToCollection('Covers', 'Dirty Loops', 2014);

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
      //console.log(prop);
      //console.log(album[prop]);
      //console.log(crit[prop]);

      //notes for fixing later:
      // conditional is not perfect
      // maybe it's enough if tracks just doesn't match
      //specific to trackName

      //if trackName exists
      if(prop === 'trackName'){
        let hasTrack = false;
        console.log('prop trackName: ', prop);
        //if the album has no tracks, flag false and stop checking props
        if(!album.tracks){
          meetsCrit = false;
          break;
        }

        //if album does have tracks, check for the given track
        for(let track of album.tracks){
          console.log(track);
          console.log(crit[prop]);
          console.log(track.trackName)
          if(crit[prop] === track.trackName){
            console.log('crit[prop]: ', crit[prop], '= track.trackName: ', track.trackName);
          }
        }

        //if the album has the track, flag meetsCrit true;
        if(hasTrack) meetsCrit = true;
      }


      // check criteria
      if (crit[prop] !== album[prop]){
        console.log(crit[prop], ' does not match ', album[prop]);
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
}

//test search
console.log('\n*** Testing search ***');
console.log('Test single property search============');
console.log(search({artist: 'Thundercat'})); // should return two albums
console.log('\nTest multi-prop search==========');
console.log(search({artist: 'Thundercat', yearPublished: 2009})); //should return 1
console.log('\nTest no-prop search=============');
console.log(search({}));

console.log('\nTest trackName search ==========');
console.log(search({trackName: 'The Life Aquatic'}))


const apocalypseTracks = [
  {
  trackName: 'Tenfold',
  duration: '3:04'
},
{
  trackName: 'Heartbreaks + Setbacks',
  duration: '3:23'
},
{
  trackName: 'The Life Aquatic',
  duration: '2:36'
},
{
  trackName: 'Special Stage',
  duration: '2:56'
},
{
  trackName: 'Tron Song',
  duration: '2:34'
},
{
  trackName: 'Seven',
  duration: '2:16'
},
{
  trackName: 'Oh Sheit It\'s X',
  duration: '3:47'
},
{
  trackName: 'Without You',
  duration: '4:41'
},{
  trackName: 'Lotus and the Jondy',
  duration: '4:52'
},{
  trackName: 'Evangelion',
  duration: '2:20'
},{
  trackName: 'We\'ll Die',
  duration: '0:55'
},{
  trackName: 'A Message for Austin/Praise the Lord/Enter the Void',
  duration: '6:35'
}]; // just for arranging/testing
