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
),
(
  (select id from public.categories where slug = 'fantasy'),
  'children-of-blood-and-bone', 'Children of Blood and Bone', 'Tomi Adeyemi', 'Zélie sets out to bring magic back to Orïsha before the crown finishes killing it. The fantasy novel teenagers in Accra pass around until the cover splits.',
  110, null, 'https://covers.openlibrary.org/b/id/8572526-L.jpg', 544, 2018,
  '9781250170972', 'Henry Holt', 'Paperback', null, 22, 640,
  'Bestseller', false
),
(
  (select id from public.categories where slug = 'fantasy'),
  'children-of-virtue-and-vengeance', 'Children of Virtue and Vengeance', 'Tomi Adeyemi', 'Magic returns, and so does the war. The second Orïsha book, for readers who finished the first on a school night and texted someone about it.',
  108, null, 'https://covers.openlibrary.org/b/id/9190319-L.jpg', 432, 2019,
  '9781250170996', 'Henry Holt', 'Paperback', null, 14, 220,
  null, false
),
(
  (select id from public.categories where slug = 'fantasy'),
  'akata-witch', 'Akata Witch', 'Nnedi Okorafor', 'Sunny, born in New York to Nigerian parents, learns she is a Leopard Person with magic hiding in plain sight. Okorafor''s YA book feels like a cousin to Ananse stories.',
  75, null, 'https://covers.openlibrary.org/b/id/7129360-L.jpg', 349, 2011,
  '9780142420915', 'Speak', 'Paperback', null, 16, 190,
  null, false
),
(
  (select id from public.categories where slug = 'fantasy'),
  'who-fears-death', 'Who Fears Death', 'Nnedi Okorafor', 'In a post-apocalyptic Sudan, Onyesonwu is born of violence and marked to change the story. Adult fantasy, fierce and unsentimental.',
  88, null, 'https://covers.openlibrary.org/b/id/7260326-L.jpg', 386, 2010,
  '9780756406691', 'DAW', 'Paperback', null, 9, 110,
  null, false
),
(
  (select id from public.categories where slug = 'fantasy'),
  'the-rage-of-dragons', 'The Rage of Dragons', 'Evan Winter', 'Tau is born without the gift that makes warriors, and trains anyway until the caste system has to notice him. Military fantasy with the pace of a chase.',
  115, null, 'https://covers.openlibrary.org/b/id/8753945-L.jpg', 544, 2019,
  '9780316489768', 'Orbit', 'Paperback', null, 12, 200,
  null, false
),
(
  (select id from public.categories where slug = 'fantasy'),
  'raybearer', 'Raybearer', 'Jordan Ifueko', 'Tarisai is raised to kill the prince she is magically bound to love. West African-inspired empire fantasy, lush enough to reread.',
  85, null, 'https://covers.openlibrary.org/b/id/10654911-L.jpg', 368, 2020,
  '9781471408586', 'Hot Key', 'Paperback', null, 11, 140,
  null, false
),
(
  (select id from public.categories where slug = 'fantasy'),
  'the-gilded-ones', 'The Gilded Ones', 'Namina Forna', 'Deka bleeds gold and is sent to an army of girls the empire would rather fear than understand. Forna builds a world that feels forged, not decorated.',
  90, null, 'https://covers.openlibrary.org/b/id/10085012-L.jpg', 432, 2021,
  '9781984848693', 'Delacorte', 'Paperback', null, 13, 155,
  null, false
),
(
  (select id from public.categories where slug = 'fantasy'),
  'black-leopard-red-wolf', 'Black Leopard, Red Wolf', 'Marlon James', 'A tracker is hired to find a missing boy, and every witness lies differently. Dense, mythic, adult, and worth the slow first chapter.',
  120, null, 'https://covers.openlibrary.org/b/id/10118789-L.jpg', 640, 2019,
  '9780735220171', 'Riverhead', 'Paperback', null, 7, 60,
  null, false
),
(
  (select id from public.categories where slug = 'inspirational'),
  'atomic-habits', 'Atomic Habits', 'James Clear', 'Tiny changes, stacked until a life looks different. The book we sell most often to people who say they want to read more and mean it.',
  130, 155, 'https://covers.openlibrary.org/b/id/12539702-L.jpg', 320, 2018,
  '9780735211292', 'Avery', 'Hardcover', null, 28, 980,
  'Sale', false
),
(
  (select id from public.categories where slug = 'inspirational'),
  'the-alchemist', 'The Alchemist', 'Paulo Coelho', 'A shepherd crosses the desert after a dream about treasure. The 25th anniversary edition, still the book people buy on the way to a new job.',
  60, null, 'https://covers.openlibrary.org/b/id/15091614-L.jpg', 208, 1988,
  '9780062315007', 'HarperOne', 'Paperback', null, 35, 740,
  'Bestseller', false
),
(
  (select id from public.categories where slug = 'inspirational'),
  'think-like-a-monk', 'Think Like a Monk', 'Jay Shetty', 'A former monk turns monastery practice into a manual for attention, envy, and purpose. Popular with readers who want calm without pretending life is quiet.',
  95, null, 'https://covers.openlibrary.org/b/id/10355397-L.jpg', 352, 2020,
  '9781982134488', 'Simon & Schuster', 'Paperback', null, 16, 260,
  null, false
),
(
  (select id from public.categories where slug = 'inspirational'),
  'ikigai', 'Ikigai', 'Héctor García & Francesc Miralles', 'A small book about the Japanese idea of a reason to get up. Readers here treat it as a weekend reset between semesters.',
  70, null, 'https://covers.openlibrary.org/b/id/11300391-L.jpg', 208, 2016,
  '9780143130727', 'Penguin', 'Hardcover', null, 18, 300,
  null, false
),
(
  (select id from public.categories where slug = 'inspirational'),
  'the-mountain-is-you', 'The Mountain Is You', 'Brianna Wiest', 'On self-sabotage, and the quieter work of becoming someone you do not have to escape. A frequent gift between friends.',
  85, null, 'https://covers.openlibrary.org/b/id/13838236-L.jpg', 248, 2020,
  '9781949759228', 'Thought Catalog', 'Paperback', null, 20, 410,
  null, false
),
(
  (select id from public.categories where slug = 'inspirational'),
  'cant-hurt-me', 'Can''t Hurt Me', 'David Goggins', 'A Navy SEAL''s account of building a mind that does not negotiate with discomfort. Loud, specific, and oddly useful at 5 a.m.',
  120, null, 'https://covers.openlibrary.org/b/id/8305903-L.jpg', 364, 2018,
  '9781544512280', 'Lioncrest', 'Paperback', null, 12, 280,
  null, false
),
(
  (select id from public.categories where slug = 'life-skills'),
  'psychology-of-money', 'The Psychology of Money', 'Morgan Housel', 'Short stories about how people actually behave with money, which is rarely how a spreadsheet says they should. The cedis version of the lesson still holds.',
  100, null, 'https://covers.openlibrary.org/b/id/10389354-L.jpg', 256, 2020,
  '9780857197689', 'Harriman House', 'Paperback', null, 22, 520,
  'Bestseller', false
),
(
  (select id from public.categories where slug = 'life-skills'),
  'how-to-win-friends', 'How to Win Friends and Influence People', 'Dale Carnegie', 'The old manual on not making every room about yourself. Still assigned, unofficially, by managers in Airport City.',
  55, null, 'https://covers.openlibrary.org/b/id/13314878-L.jpg', 288, 1936,
  '9780671027032', 'Pocket Books', 'Paperback', null, 20, 240,
  null, false
),
(
  (select id from public.categories where slug = 'life-skills'),
  'seven-habits', 'The 7 Habits of Highly Effective People', 'Stephen R. Covey', 'Begin with the end, and the other six. A thick book people buy when a promotion arrives before the skills do.',
  80, null, 'https://covers.openlibrary.org/b/id/10079937-L.jpg', 381, 1989,
  '9781982137274', 'Simon & Schuster', 'Paperback', null, 14, 170,
  null, false
),
(
  (select id from public.categories where slug = 'life-skills'),
  'rich-dad-poor-dad', 'Rich Dad Poor Dad', 'Robert T. Kiyosaki', 'Two fathers, two theories of money. Read it with a pencil, and with a Ghanaian eye on what ''asset'' means when the currency moves.',
  65, null, 'https://covers.openlibrary.org/b/id/8315603-L.jpg', 336, 1997,
  '9781612680194', 'Plata', 'Paperback', null, 26, 610,
  'Bestseller', false
),
(
  (select id from public.categories where slug = 'life-skills'),
  'deep-work', 'Deep Work', 'Cal Newport', 'Newport''s argument for unbroken attention in a city of notifications. Useful for students, founders, and anyone writing a thesis in a compound.',
  95, null, 'https://covers.openlibrary.org/b/id/7988607-L.jpg', 304, 2016,
  '9781455586691', 'Grand Central', 'Paperback', null, 13, 190,
  null, false
),
(
  (select id from public.categories where slug = 'life-skills'),
  'subconscious-mind', 'The Power of Your Subconscious Mind', 'Joseph Murphy', 'A mid-century book about suggestion and belief that still circulates in Accra church bookstalls and serious reading lists alike.',
  50, null, 'https://covers.openlibrary.org/b/id/6553019-L.jpg', 320, 1963,
  '9781604592016', 'Wilder', 'Paperback', null, 24, 350,
  null, false
),
(
  (select id from public.categories where slug = 'childrens'),
  'pot-of-wisdom', 'The Pot of Wisdom', 'Adwoa Badoe', 'Ananse stories retold by a Ghanaian writer, with the spider as clever, hungry, and not always admirable. The children''s book we gift first.',
  55, null, 'https://covers.openlibrary.org/b/id/1645062-L.jpg', 64, 2001,
  '9780888994295', 'Groundwood', 'Hardcover', null, 18, 220,
  null, false
),
(
  (select id from public.categories where slug = 'childrens'),
  'anansi-the-spider', 'Anansi the Spider', 'Gerald McDermott', 'A picture-book telling of Anansi and his six sons, painted in bold West African colour. For reading aloud before the light goes.',
  48, null, 'https://covers.openlibrary.org/b/id/579042-L.jpg', 48, 1972,
  '9780805003109', 'Henry Holt', 'Hardcover', null, 15, 140,
  null, false
),
(
  (select id from public.categories where slug = 'childrens'),
  'sulwe', 'Sulwe', 'Lupita Nyong''o', 'A girl with the darkest skin in her family goes looking for brightness and finds a better story about herself. A bedtime book that starts conversations.',
  70, null, 'https://covers.openlibrary.org/b/id/12705547-L.jpg', 48, 2019,
  '9781534425361', 'Simon & Schuster', 'Hardcover', null, 12, 160,
  null, false
),
(
  (select id from public.categories where slug = 'childrens'),
  'hair-love', 'Hair Love', 'Matthew A. Cherry', 'A father learns his daughter''s hair, with patience and a little panic. The picture book families ask for by name.',
  65, null, 'https://covers.openlibrary.org/b/id/8807635-L.jpg', 32, 2019,
  '9780525553366', 'Kokila', 'Hardcover', null, 14, 150,
  null, false
),
(
  (select id from public.categories where slug = 'business'),
  'zero-to-one', 'Zero to One', 'Peter Thiel', 'Thiel on building something that did not exist last year. Read by Accra founders who are tired of copying a pitch they saw online.',
  110, null, 'https://covers.openlibrary.org/b/id/9002334-L.jpg', 224, 2014,
  '9780804139298', 'Crown', 'Hardcover', null, 11, 130,
  null, false
),
(
  (select id from public.categories where slug = 'business'),
  'start-with-why', 'Start with Why', 'Simon Sinek', 'Purpose before product. A clear book for people opening a second branch, a studio, or a very ambitious group chat.',
  85, null, 'https://covers.openlibrary.org/b/id/6395237-L.jpg', 256, 2009,
  '9781591846444', 'Portfolio', 'Paperback', null, 13, 145,
  null, false
),
(
  (select id from public.categories where slug = 'business'),
  'the-lean-startup', 'The Lean Startup', 'Eric Ries', 'Build, measure, and stop polishing the thing nobody asked for. The practical half of a lot of Accra startup advice.',
  105, null, 'https://covers.openlibrary.org/b/id/7104760-L.jpg', 336, 2011,
  '9780307887894', 'Crown', 'Paperback', null, 10, 100,
  null, false
),
(
  (select id from public.categories where slug = 'business'),
  'shoe-dog', 'Shoe Dog', 'Phil Knight', 'Nike''s founder on the years when the company was mostly debt and nerve. A business memoir that reads like travel.',
  98, null, 'https://covers.openlibrary.org/b/id/8858487-L.jpg', 400, 2016,
  '9781501135910', 'Scribner', 'Paperback', null, 9, 86,
  null, false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'core-mathematics-jhs', 'Core Mathematics for JHS', 'Tome Scholars', 'Number, algebra, geometry, and the word problems BECE actually asks. Worked examples first, then practice sets a teacher can assign tonight.',
  58, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'JHS · BECE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'english-language-jhs', 'English Language for JHS', 'Tome Scholars', 'Grammar, composition, comprehension, and literature extracts for the three junior-high years. Written in the English students speak on the way to school.',
  54, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'JHS · BECE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'integrated-science-jhs', 'Integrated Science for JHS', 'Tome Scholars', 'Life, physical, and earth science arranged by term, with local examples a student in Tamale or Takoradi can picture.',
  56, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'JHS · BECE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'social-studies-jhs', 'Social Studies for JHS', 'Tome Scholars', 'The environment, governance, and the Ghanaian family, mapped to the NaCCA social studies outline.',
  48, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'JHS · BECE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'career-technology-jhs', 'Career Technology for JHS', 'Tome Scholars', 'Design, tools, and basic making. A practical book for the career technology periods that used to be called pre-tech.',
  52, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'JHS · BECE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'core-mathematics-shs', 'Core Mathematics for SHS', 'Tome Scholars', 'The core paper, from sets through trigonometry, with WASSCE-style questions and the marking logic written in the margin.',
  68, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'elective-mathematics-shs', 'Elective Mathematics for SHS', 'Tome Scholars', 'Calculus, mechanics-ready algebra, and the longer elective questions. For students who have already decided they like the hard paper.',
  72, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'integrated-science-shs', 'Integrated Science for SHS', 'Tome Scholars', 'The core science paper across biology, chemistry, and physics, kept in one book so the connections stay visible.',
  64, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'physics-shs', 'Physics for SHS', 'Tome Scholars', 'Mechanics, waves, electricity, and modern physics with diagrams a candidate can reproduce under timed conditions.',
  70, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'chemistry-shs', 'Chemistry for SHS', 'Tome Scholars', 'Stoichiometry, organic basics, and practical write-ups. The book science teachers ask parents to buy before the mock.',
  70, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'biology-shs', 'Biology for SHS', 'Tome Scholars', 'Cells, ecology, genetics, and the human body, with Ghanaian examples where a foreign textbook would have used a different forest.',
  70, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'economics-shs', 'Economics for SHS', 'Tome Scholars', 'Demand, money, public finance, and development, taught with cedis and the institutions students can name.',
  62, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'government-shs', 'Government for SHS', 'Tome Scholars', 'The constitution, arms of government, and Ghana''s political story from colony to the Fourth Republic.',
  60, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'literature-shs', 'Literature-in-English for SHS', 'Tome Scholars', 'How to read a poem, a play, and a novel for the WASSCE literature paper, with methods that survive a change of set books.',
  58, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
),
(
  (select id from public.categories where slug = 'school-textbooks'),
  'computing-shs', 'Computing for SHS', 'Tome Scholars', 'Hardware, networks, ethics, and the programming ideas the computing syllabus expects, written for labs that are sometimes offline.',
  60, null, null, 280, 2024,
  null, 'Tome Scholars', 'Paperback', 'SHS · WASSCE', 40, 90,
  'Textbook', false
);

insert into public.reviews (product_id, author_name, rating, body) values
(
  (select id from public.products where slug = 'homegoing'), 'Akua Boateng', 5, 'I bought this for a cousin leaving for university and then read it myself in three nights. The family tree at the front is a mercy.'
),
(
  (select id from public.products where slug = 'homegoing'), 'Yaw Mensah', 5, 'The Cape Coast chapters made the castle tour I took as a child feel unfinished. A serious book, and it moves.'
),
(
  (select id from public.products where slug = 'things-fall-apart'), 'Efua Darko', 5, 'The copy I was assigned in school fell apart. This one is the edition I wanted then.'
),
(
  (select id from public.products where slug = 'atomic-habits'), 'Kojo Owusu', 5, 'I started with the two-minute rule and, annoyingly, it worked. Clear without being cute.'
),
(
  (select id from public.products where slug = 'atomic-habits'), 'Abena Sarpong', 4, 'Some examples are very American, but the system translates. I use it for morning study.'
),
(
  (select id from public.products where slug = 'children-of-blood-and-bone'), 'Maame Esi', 5, 'My daughter finished it and immediately asked for the second. The world feels big in the right way.'
),
(
  (select id from public.products where slug = 'the-alchemist'), 'Nana Adjei', 4, 'I was sceptical and then I was late for work because of the last thirty pages.'
),
(
  (select id from public.products where slug = 'psychology-of-money'), 'Selorm Agbeko', 5, 'The best money book we stock if you want behaviour, not a stock tip. I keep a copy at the office.'
),
(
  (select id from public.products where slug = 'rich-dad-poor-dad'), 'Priscilla Ankrah', 4, 'Read the asset chapter twice and argue with it. Still the book that gets people started.'
),
(
  (select id from public.products where slug = 'americanah'), 'Linda Quaye', 5, 'Ifemelu''s blog posts are the parts I read aloud. Adichie writes homesickness without syrup.'
),
(
  (select id from public.products where slug = 'faceless'), 'Ibrahim Fuseini', 5, 'Darko does not look away from street girls in Accra. Short, angry, and necessary.'
),
(
  (select id from public.products where slug = 'the-hundred-wells-of-salaga'), 'Adwoa Serwaa', 5, 'I knew the name Salaga from history class. This made it a place with women in it.'
),
(
  (select id from public.products where slug = 'ghana-autobiography'), 'Kofi Asante', 5, 'Assigned it to myself before Independence Day. Nkrumah''s voice is faster than the textbook version.'
),
(
  (select id from public.products where slug = 'core-mathematics-jhs'), 'Mrs. Arthur', 5, 'I teach JHS 2. The practice sets match the way we actually revise, and the answers are at the back where they should be.'
),
(
  (select id from public.products where slug = 'pot-of-wisdom'), 'Esi Hammond', 5, 'My son asks for the story where Ananse is greedy, which is most of them. Beautiful to read aloud.'
),
(
  (select id from public.products where slug = 'the-beautyful-ones-are-not-yet-born'), 'Josephine Nyarko', 5, 'Still uncomfortable. Still right. The bus scenes are the Ghana I recognise.'
),
(
  (select id from public.products where slug = 'ikigai'), 'Daniel Lamptey', 4, 'Small enough to finish on a Sunday in Aburi. I bought a second copy for my father.'
),
(
  (select id from public.products where slug = 'raybearer'), 'Ama Pokua', 5, 'The court politics are delicious. I wanted a map and a sequel immediately.'
);
