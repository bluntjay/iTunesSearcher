module.exports = async(query) =>{
	const APIcall = await (`https://itunes.apple.com/search?term${query.search}?media${query.media}`);
    const data = await APIcall.json();
    console.log(data)
      return data
	}