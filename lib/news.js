export async function getNews(location) {

// ✅ Log incoming location
console.log("📰 getNews called with location:", location);


if (!location || location.trim() === "") {

console.log("⚠️ Location is empty, skipping news fetch");

return [];

}


try {

const controller = new AbortController();

const timeout = setTimeout(() => {

controller.abort();

}, 4000);


// today's date

const today = new Date().toISOString().split("T")[0];


const url =
`https://gnews.io/api/v4/search?q=${encodeURIComponent(location)}&from=${today}&lang=en&country=in&max=10&apikey=${process.env.GNEWS_KEY}`;


// ✅ Log URL
console.log("🌐 News API URL:", url);


const res = await fetch(url, {
signal: controller.signal
});


clearTimeout(timeout);


if (!res.ok) {

console.error("❌ News API HTTP error:", res.status);

return [];

}


const data = await res.json();


// ✅ Log total articles
console.log("📰 Total articles received:", data.articles?.length || 0);


if (!data.articles) {

console.log("⚠️ No articles found");

return [];

}


// keywords

const keywords = [

"rain",
"flood",
"strike",
"protest",
"construction",
"weather",
"cyclone",
"landslide"

];


// filter

const filtered = data.articles.filter(article =>

keywords.some(word =>

article.title.toLowerCase().includes(word)

)

);


// ✅ Log filtered count
console.log("✅ Relevant articles after filtering:", filtered.length);


return filtered.map(article => ({

title: article.title,

date: article.publishedAt,

source: article.source.name

}));


}

catch (error) {

console.error("❌ News fetch failed:", error.message);

return [];

}

}
