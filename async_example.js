// write a function to retrieve a blob of json
// make an ajax request. Use the 'fetch' function.

function fetchAlbums() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
        .then(res => res.json()) //this returns a promise, ergo the next then()
        .then(json => console.log(json));

}
    
// ES2016 Syntax
const fetchAlbums = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();
    
    console.log(json);
}

fetchAlbums();