export async function getNews(location) {
  if (!location || location.trim() === "") return [];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const today = new Date().toISOString().split("T")[0];
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(location)}&from=${today}&lang=en&country=in&max=10&apikey=${process.env.GNEWS_KEY}`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) return [];

    const data = await res.json();
    if (!data.articles) return [];

    const keywords = ["rain", "flood", "strike", "protest", "construction", "weather", "cyclone", "landslide"];
    const filtered = data.articles.filter(article =>
      keywords.some(word => article.title.toLowerCase().includes(word))
    );

    return filtered.map(article => ({
      title: article.title,
      date: article.publishedAt,
      source: article.source.name
    }));
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error("News fetch failed:", error.message);
    }
    return [];
  }
}
