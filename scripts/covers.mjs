const books = [
  ["Homegoing", "Yaa Gyasi"],
  ["The Beautyful Ones Are Not Yet Born", "Ayi Kwei Armah"],
  ["Changes", "Ama Ata Aidoo"],
  ["Ghana Must Go", "Taiye Selasi"],
  ["The Hundred Wells of Salaga", "Ayesha Harruna Attah"],
  ["His Only Wife", "Peace Adzo Medie"],
  ["Tail of the Blue Bird", "Nii Ayikwei Parkes"],
  ["Faceless", "Amma Darko"],
  ["Search Sweet Country", "Kojo Laing"],
  ["The Prophet of Zongo Street", "Mohammed Naseehu Ali"],
  ["Our Sister Killjoy", "Ama Ata Aidoo"],
  ["Nightbloom", "Peace Adzo Medie"],
  ["Things Fall Apart", "Chinua Achebe"],
  ["Half of a Yellow Sun", "Chimamanda Ngozi Adichie"],
  ["Americanah", "Chimamanda Ngozi Adichie"],
  ["Purple Hibiscus", "Chimamanda Ngozi Adichie"],
  ["Stay with Me", "Ayobami Adebayo"],
  ["The Fishermen", "Chigozie Obioma"],
  ["The Secret Lives of Baba Segis Wives", "Lola Shoneyin"],
  ["Nervous Conditions", "Tsitsi Dangarembga"],
  ["Africa Must Unite", "Kwame Nkrumah"],
  ["The Fall of the Asante Empire", "Robert Edgerton"],
  ["Lose Your Mother", "Saidiya Hartman"],
  ["Long Walk to Freedom", "Nelson Mandela"],
  ["King Peggy", "Peggielene Bartels"],
  ["Children of Blood and Bone", "Tomi Adeyemi"],
  ["Children of Virtue and Vengeance", "Tomi Adeyemi"],
  ["Akata Witch", "Nnedi Okorafor"],
  ["Who Fears Death", "Nnedi Okorafor"],
  ["The Rage of Dragons", "Evan Winter"],
  ["Raybearer", "Jordan Ifueko"],
  ["The Gilded Ones", "Namina Forna"],
  ["Black Leopard, Red Wolf", "Marlon James"],
  ["Atomic Habits", "James Clear"],
  ["The Alchemist", "Paulo Coelho"],
  ["Think Like a Monk", "Jay Shetty"],
  ["Ikigai", "Hector Garcia"],
  ["Man's Search for Meaning", "Viktor Frankl"],
  ["The Mountain Is You", "Brianna Wiest"],
  ["Can't Hurt Me", "David Goggins"],
  ["The Psychology of Money", "Morgan Housel"],
  ["How to Win Friends and Influence People", "Dale Carnegie"],
  ["The 7 Habits of Highly Effective People", "Stephen Covey"],
  ["Rich Dad Poor Dad", "Robert Kiyosaki"],
  ["Deep Work", "Cal Newport"],
  ["The Power of Your Subconscious Mind", "Joseph Murphy"],
  ["The Pot of Wisdom", "Adwoa Badoe"],
  ["Anansi the Spider", "Gerald McDermott"],
  ["Sulwe", "Lupita Nyong'o"],
  ["Hair Love", "Matthew A. Cherry"],
  ["Zero to One", "Peter Thiel"],
  ["Start with Why", "Simon Sinek"],
  ["The Lean Startup", "Eric Ries"],
  ["Shoe Dog", "Phil Knight"],
  ["We Should All Be Feminists", "Chimamanda Ngozi Adichie"],
  ["Born a Crime", "Trevor Noah"],
  ["Sapiens", "Yuval Noah Harari"],
  ["Ghana: The Autobiography of Kwame Nkrumah", "Kwame Nkrumah"],
];

const out = [];
for (const [title, author] of books) {
  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("title", title);
  url.searchParams.set("author", author);
  url.searchParams.set("limit", "5");
  url.searchParams.set(
    "fields",
    "key,title,author_name,cover_i,first_publish_year,isbn,number_of_pages_median",
  );
  try {
    const res = await fetch(url);
    const data = await res.json();
    const docs = data.docs || [];
    const needle = title.toLowerCase().slice(0, 14);
    const doc =
      docs.find(
        (d) => d.cover_i && (d.title || "").toLowerCase().includes(needle),
      ) ||
      docs.find((d) => d.cover_i) ||
      docs[0] ||
      {};
    out.push({
      q: title,
      found: doc.title || null,
      cover_i: doc.cover_i || null,
      year: doc.first_publish_year || null,
      pages: doc.number_of_pages_median || null,
      isbn: (doc.isbn || [])[0] || null,
    });
  } catch (e) {
    out.push({ q: title, error: String(e.cause || e.message || e) });
  }
  await new Promise((r) => setTimeout(r, 100));
}
console.log(JSON.stringify(out, null, 2));
