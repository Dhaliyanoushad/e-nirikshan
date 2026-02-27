export async function getNews(location){

const res=await fetch(

`https://gnews.io/api/v4/search?q=${location}&apikey=${process.env.GNEWS_KEY}`

);

const data=await res.json();

return data.articles.slice(0,2);

}
