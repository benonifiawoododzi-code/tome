insert into public.categories (slug, name, blurb, image_url, sort_order) values
('ghanaian-literature', 'Ghanaian Literature', 'Novels, stories, and poems written from home.', '/photos/red-book.jpg', 1),
('african-fiction', 'African Fiction', 'The wider shelf: Nigeria, Zimbabwe, South Africa, and beyond.', '/photos/stacks.jpg', 2),
('history', 'History', 'Kingdoms, independence, and the roads that made the present.', '/photos/shelf.jpg', 3),
('school-textbooks', 'School Textbooks', 'Tome Scholars editions arranged for the Ghanaian school term.', '/photos/journal.jpg', 4),
('fantasy', 'Fantasy', 'Gods, warriors, and second worlds with African imaginative roots.', '/photos/night-read.jpg', 5),
('inspirational', 'Inspirational', 'Books for the season you are trying to become someone steadier.', '/photos/open-book.jpg', 6),
('life-skills', 'Life Skills', 'Money, focus, conversation, and the habits that hold a week together.', '/photos/desk.jpg', 7),
('childrens', 'Children', 'Picture books and Ananse stories for the small readers in the house.', '/photos/classroom.jpg', 8),
('business', 'Business', 'For founders in Osu, Kejetia, and the group chat that will not rest.', '/photos/reading-table.jpg', 9);

insert into public.products (
  category_id, slug, title, author, blurb, price, compare_at_price, image_url, pages, published_year,
  isbn, publisher, format, level, stock, units_sold, badge, is_featured
) values
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'homegoing', 'Homegoing', 'Yaa Gyasi', 'Two sisters leave a Fanteland fort on opposite sides of the ocean, and eight generations inherit what that night began. The novel Accra keeps pressing into other people''s hands.',
  148, 175, 'https://covers.openlibrary.org/b/id/8081171-L.jpg', 320, 2016,
  '9781101947135', 'Vintage', 'Paperback', null, 24, 860,
  'Bestseller', true
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'the-beautyful-ones-are-not-yet-born', 'The Beautyful Ones Are Not Yet Born', 'Ayi Kwei Armah', 'A railway clerk in post-independence Ghana refuses the bribe everyone else has already priced in. Still the sharpest novel we have about rot, and about staying clean.',
  72, null, 'https://covers.openlibrary.org/b/id/8182662-L.jpg', 215, 1968,
  '9780435905408', 'Heinemann', 'Paperback', null, 18, 410,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'changes', 'Changes', 'Ama Ata Aidoo', 'Esi leaves a marriage that looks respectable from the outside and walks into a love that asks her to share. Aidoo writes Accra women with wit and no patience for easy endings.',
  68, null, 'https://covers.openlibrary.org/b/id/784382-L.jpg', 196, 1991,
  '9781558610651', 'The Feminist Press', 'Paperback', null, 16, 290,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'ghana-must-go', 'Ghana Must Go', 'Taiye Selasi', 'A Ghanaian-Nigerian family scatters across Accra, London, and America, then gathers again for a funeral that will not stay polite. Selasi''s sentences feel tailored.',
  115, null, 'https://covers.openlibrary.org/b/id/7985049-L.jpg', 318, 2013,
  '9780143124948', 'Penguin', 'Paperback', null, 14, 240,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'the-hundred-wells-of-salaga', 'The Hundred Wells of Salaga', 'Ayesha Harruna Attah', 'In the Salaga of the slave markets, two women — one royal, one captured — try to choose a life inside a trade that is eating the region. History worn close to the skin.',
  98, null, 'https://covers.openlibrary.org/b/id/8799689-L.jpg', 240, 2018,
  '9781590519950', 'Other Press', 'Paperback', null, 15, 180,
  'New', false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'his-only-wife', 'His Only Wife', 'Peace Adzo Medie', 'Afi is married, in a bright Accra flat, to a man who already has another life. Medie makes the comedy of respectability feel as tense as a thriller.',
  105, null, 'https://covers.openlibrary.org/b/id/10135759-L.jpg', 288, 2020,
  '9781643755287', 'Algonquin', 'Paperback', null, 12, 150,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'tail-of-the-blue-bird', 'Tail of the Blue Bird', 'Nii Ayikwei Parkes', 'A forensic pathologist is called from Accra to a village where a body will not behave like a case file. Myth and police work share the same red road.',
  88, null, 'https://covers.openlibrary.org/b/id/10341485-L.jpg', 176, 2009,
  '9780099526124', 'Jonathan Cape', 'Paperback', null, 11, 96,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'faceless', 'Faceless', 'Amma Darko', 'Street girls in Accra, a murder, and the institutions that look away. Darko refuses to make the city prettier than the morning after.',
  62, null, 'https://covers.openlibrary.org/b/id/2305494-L.jpg', 232, 2003,
  '9789988550509', 'Sub-Saharan Publishers', 'Paperback', null, 20, 210,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'search-sweet-country', 'Search Sweet Country', 'Kojo Laing', 'Accra in the late 1970s, crowded with prophets, politicians, and people inventing a language for a city that will not sit still. Laing''s English is its own country.',
  92, null, 'https://covers.openlibrary.org/b/id/12185710-L.jpg', 352, 1986,
  '9780241370094', 'Viking', 'Paperback', null, 9, 70,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'our-sister-killjoy', 'Our Sister Killjoy', 'Ama Ata Aidoo', 'Sissie travels to Europe on a scholarship and sends home a verdict. Part verse, part essay, entirely unwilling to be grateful.',
  58, null, 'https://covers.openlibrary.org/b/id/381314-L.jpg', 134, 1977,
  '9780582308459', 'Longman', 'Paperback', null, 13, 120,
  null, false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'nightbloom', 'Nightbloom', 'Peace Adzo Medie', 'Cousins Akorfa and Selasi grow up between Accra and the United States, and the story they tell about each other is not the one that happened. A new favourite on the Ghana shelf.',
  120, null, 'https://covers.openlibrary.org/b/id/13951358-L.jpg', 352, 2023,
  '9781643755288', 'Algonquin', 'Hardcover', null, 10, 64,
  'New', false
),
(
  (select id from public.categories where slug = 'ghanaian-literature'),
  'the-prophet-of-zongo-street', 'The Prophet of Zongo Street', 'Mohammed Naseehu Ali', 'Stories from a Zongo neighbourhood and from the Ghanaian rooms of New York. Ali writes faith, gossip, and migration at the same volume.',
  75, null, 'https://covers.openlibrary.org/b/id/39145-L.jpg', 224, 2005,
  '9780060523482', 'HarperCollins', 'Paperback', null, 8, 54,
  null, false
),
(
  (select id from public.categories where slug = 'history'),
  'ghana-autobiography', 'Ghana: The Autobiography of Kwame Nkrumah', 'Kwame Nkrumah', 'The independence story in the founder''s own voice: study, organising, prison, and the morning the flag went up. A book every Ghana shelf should be able to produce.',
  80, null, 'https://covers.openlibrary.org/b/id/9378038-L.jpg', 320, 1957,
  '9780901787606', 'Panaf', 'Paperback', null, 17, 330,
  'Bestseller', false
),
(
  (select id from public.categories where slug = 'history'),
  'africa-must-unite', 'Africa Must Unite', 'Kwame Nkrumah', 'Nkrumah''s case for a continent that refuses to be governed in pieces. Read it beside the evening news and it still argues back.',
  70, null, 'https://covers.openlibrary.org/b/id/14241157-L.jpg', 256, 1963,
  '9780901787132', 'Panaf', 'Paperback', null, 14, 140,
  null, false
),
(
  (select id from public.categories where slug = 'history'),
  'the-fall-of-the-asante-empire', 'The Fall of the Asante Empire', 'Robert B. Edgerton', 'The Anglo-Asante wars, Yaa Asantewaa, and the fall of Kumasi, told as military and political history rather than a footnote to London.',
  110, null, 'https://covers.openlibrary.org/b/id/472981-L.jpg', 304, 1995,
  '9780029087415', 'Free Press', 'Paperback', null, 9, 88,
  null, false
),
(
  (select id from public.categories where slug = 'history'),
  'lose-your-mother', 'Lose Your Mother', 'Saidiya Hartman', 'Hartman travels the Ghana coast looking for the slave route and finds a past that will not become a monument. Essential before a walk to Cape Coast.',
  125, null, 'https://covers.openlibrary.org/b/id/1188906-L.jpg', 296, 2007,
  '9780374531157', 'Farrar, Straus and Giroux', 'Paperback', null, 11, 150,
  null, false
),
(
  (select id from public.categories where slug = 'history'),
  'long-walk-to-freedom', 'Long Walk to Freedom', 'Nelson Mandela', 'The autobiography students and uncles both finish. A southern African life that shaped how Ghana talks about courage.',
  98, null, 'https://covers.openlibrary.org/b/id/12702407-L.jpg', 656, 1994,
  '9780316323543', 'Back Bay', 'Paperback', null, 16, 260,
  null, false
),
(
  (select id from public.categories where slug = 'history'),
  'king-peggy', 'King Peggy', 'Peggielene Bartels', 'A secretary in Washington learns she has been made king of Otuam, then flies home to govern. A true Ghana story with the timing of a novel.',
  95, null, 'https://covers.openlibrary.org/b/id/11035351-L.jpg', 352, 2012,
  '9780385534321', 'Doubleday', 'Paperback', null, 8, 74,
  null, false
),
(
  (select id from public.categories where slug = 'history'),
  'sapiens', 'Sapiens', 'Yuval Noah Harari', 'A short history of the species, useful when a dinner in Labone turns into an argument about why people believe anything at all.',
  140, 165, 'https://covers.openlibrary.org/b/id/8634250-L.jpg', 464, 2011,
  '9780062316097', 'Harper', 'Paperback', null, 20, 510,
  'Sale', false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'things-fall-apart', 'Things Fall Apart', 'Chinua Achebe', 'Okonkwo''s story is the novel West African classrooms and grown readers share. We stock the edition you will actually want to keep.',
  55, null, 'https://covers.openlibrary.org/b/id/12816943-L.jpg', 209, 1958,
  '9780385474542', 'Anchor', 'Paperback', null, 40, 1200,
  'Bestseller', false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'half-of-a-yellow-sun', 'Half of a Yellow Sun', 'Chimamanda Ngozi Adichie', 'The Biafran war through a house of lovers, twin sisters, and a houseboy who is keeping the truest record. Devastating, and widely loved in Accra.',
  85, null, 'https://covers.openlibrary.org/b/id/8472660-L.jpg', 448, 2006,
  '9780007200283', 'Fourth Estate', 'Paperback', null, 18, 340,
  null, false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'americanah', 'Americanah', 'Chimamanda Ngozi Adichie', 'Ifemelu leaves Nigeria, blogs about race in America, and considers the man she left. The novel people finish on a trotro and start recommending at the stop.',
  95, null, 'https://covers.openlibrary.org/b/id/8474037-L.jpg', 496, 2013,
  '9780307455925', 'Knopf', 'Paperback', null, 16, 390,
  'Bestseller', false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'purple-hibiscus', 'Purple Hibiscus', 'Chimamanda Ngozi Adichie', 'Kambili grows up inside a wealthy, silent, violent house, then spends a holiday with an aunt who laughs out loud. Adichie''s first novel, still the one many readers love most.',
  70, null, 'https://covers.openlibrary.org/b/id/12063933-L.jpg', 307, 2003,
  '9781616202415', 'Algonquin', 'Paperback', null, 15, 220,
  null, false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'stay-with-me', 'Stay with Me', 'Ayọ̀bámi Adébáyọ̀', 'Yejide and Akin want a child, and the family has its own plans. A Nigerian marriage novel that Accra book clubs refuse to discuss without spoilers.',
  78, null, 'https://covers.openlibrary.org/b/id/10250668-L.jpg', 272, 2017,
  '9781101905373', 'Knopf', 'Paperback', null, 12, 160,
  null, false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'the-fishermen', 'The Fishermen', 'Chigozie Obioma', 'Four brothers in a Nigerian town disobey their father, meet a prophecy, and cannot put the week back. Mythic, brotherly, and hard to forget.',
  80, null, 'https://covers.openlibrary.org/b/id/9139289-L.jpg', 304, 2015,
  '9780316338370', 'Little, Brown', 'Paperback', null, 10, 130,
  null, false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'nervous-conditions', 'Nervous Conditions', 'Tsitsi Dangarembga', 'Tambu wants the education her brother treats as a birthright. The Zimbabwean novel that belongs beside Aidoo on any serious shelf.',
  68, null, 'https://covers.openlibrary.org/b/id/7934158-L.jpg', 224, 1988,
  '9781580051347', 'Seal Press', 'Paperback', null, 11, 90,
  null, false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'baba-segi', 'The Secret Lives of Baba Segi''s Wives', 'Lola Shoneyin', 'A polygamous Ibadan household acquires a new, educated wife, and the older wives decide what she is allowed to know. Funny until it is not.',
  74, null, 'https://covers.openlibrary.org/b/id/10931100-L.jpg', 288, 2010,
  '9780061946387', 'William Morrow', 'Paperback', null, 13, 175,
  null, false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'we-should-all-be-feminists', 'We Should All Be Feminists', 'Chimamanda Ngozi Adichie', 'The essay adapted from Adichie''s TED talk. Short enough for a lunch hour, and the book aunties borrow and do not return.',
  45, null, 'https://covers.openlibrary.org/b/id/11324542-L.jpg', 64, 2014,
  '9781101911761', 'Anchor', 'Paperback', null, 30, 480,
  null, false
),
(
  (select id from public.categories where slug = 'african-fiction'),
  'born-a-crime', 'Born a Crime', 'Trevor Noah', 'Stories from a childhood that was illegal under apartheid, told by a mother who does not lose arguments. The audiobook is famous; the paperback still works on a Sunday.',
  90, null, 'https://covers.openlibrary.org/b/id/8294078-L.jpg', 304, 2016,
  '9780399588174', 'Spiegel & Grau', 'Paperback', null, 14, 210,
  null, false
);
