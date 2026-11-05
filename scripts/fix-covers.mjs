const searches = [
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki" },
  { title: "Man's Search for Meaning", author: "Viktor Frankl" },
  { title: "The Secret Lives of Baba Segi's Wives", author: "Lola Shoneyin" },
  { title: "Ghana", author: "Kwame Nkrumah" },
  { title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie" },
  { title: "Born a Crime", author: "Trevor Noah" },
];

for (const search of searches) {
  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("q", `${search.title} ${search.author}`);
  url.searchParams.set("limit", "8");
  url.searchParams.set("fields", "title,author_name,cover_i,first_publish_year,isbn");
  const data = await (await fetch(url)).json();
  console.log("\n==", search.title);
  for (const doc of data.docs || []) {
    console.log(
      [doc.cover_i, doc.first_publish_year, doc.title, (doc.isbn || [])[0]].join(
        " | ",
      ),
    );
  }
}
