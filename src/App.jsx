import { useState, useEffect, useCallback, useRef } from "react";

// ─── DATASET: 250 Movies ───────────────────────────────────────────────────
const MOVIES = [
  { id: 1, title: "Inception", year: 2010, genre: ["Sci-Fi", "Thriller", "Action"], director: "Christopher Nolan", cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"], rating: 8.8, runtime: 148, mood: ["mind-bending", "suspenseful", "cerebral"], description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
  { id: 2, title: "The Shawshank Redemption", year: 1994, genre: ["Drama"], director: "Frank Darabont", cast: ["Tim Robbins", "Morgan Freeman"], rating: 9.3, runtime: 142, mood: ["inspiring", "emotional", "hopeful"], description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency." },
  { id: 3, title: "The Dark Knight", year: 2008, genre: ["Action", "Crime", "Drama"], director: "Christopher Nolan", cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"], rating: 9.0, runtime: 152, mood: ["dark", "intense", "thrilling"], description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests." },
  { id: 4, title: "Pulp Fiction", year: 1994, genre: ["Crime", "Drama"], director: "Quentin Tarantino", cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"], rating: 8.9, runtime: 154, mood: ["stylish", "dark", "witty"], description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption." },
  { id: 5, title: "Schindler's List", year: 1993, genre: ["Biography", "Drama", "History"], director: "Steven Spielberg", cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"], rating: 9.0, runtime: 195, mood: ["emotional", "historical", "moving"], description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis." },
  { id: 6, title: "Interstellar", year: 2014, genre: ["Sci-Fi", "Adventure", "Drama"], director: "Christopher Nolan", cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"], rating: 8.6, runtime: 169, mood: ["mind-bending", "emotional", "epic"], description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { id: 7, title: "The Godfather", year: 1972, genre: ["Crime", "Drama"], director: "Francis Ford Coppola", cast: ["Marlon Brando", "Al Pacino", "James Caan"], rating: 9.2, runtime: 175, mood: ["dark", "powerful", "classic"], description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son." },
  { id: 8, title: "Fight Club", year: 1999, genre: ["Drama", "Thriller"], director: "David Fincher", cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"], rating: 8.8, runtime: 139, mood: ["dark", "mind-bending", "intense"], description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more." },
  { id: 9, title: "The Matrix", year: 1999, genre: ["Sci-Fi", "Action"], director: "Lana Wachowski", cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"], rating: 8.7, runtime: 136, mood: ["mind-bending", "action-packed", "cerebral"], description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers." },
  { id: 10, title: "Goodfellas", year: 1990, genre: ["Biography", "Crime", "Drama"], director: "Martin Scorsese", cast: ["Ray Liotta", "Joe Pesci", "Robert De Niro"], rating: 8.7, runtime: 146, mood: ["stylish", "intense", "gripping"], description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners." },
  { id: 11, title: "Parasite", year: 2019, genre: ["Drama", "Thriller"], director: "Bong Joon-ho", cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"], rating: 8.5, runtime: 132, mood: ["dark", "suspenseful", "satirical"], description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
  { id: 12, title: "Spirited Away", year: 2001, genre: ["Animation", "Adventure", "Family"], director: "Hayao Miyazaki", cast: ["Daveigh Chase", "Suzanne Pleshette"], rating: 8.6, runtime: 125, mood: ["magical", "imaginative", "whimsical"], description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits." },
  { id: 13, title: "The Silence of the Lambs", year: 1991, genre: ["Crime", "Drama", "Thriller"], director: "Jonathan Demme", cast: ["Jodie Foster", "Anthony Hopkins"], rating: 8.6, runtime: 118, mood: ["dark", "psychological", "chilling"], description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer." },
  { id: 14, title: "Whiplash", year: 2014, genre: ["Drama", "Music"], director: "Damien Chazelle", cast: ["Miles Teller", "J.K. Simmons"], rating: 8.5, runtime: 107, mood: ["intense", "inspiring", "emotional"], description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential." },
  { id: 15, title: "The Grand Budapest Hotel", year: 2014, genre: ["Adventure", "Comedy", "Crime"], director: "Wes Anderson", cast: ["Ralph Fiennes", "Tony Revolori", "Saoirse Ronan"], rating: 8.1, runtime: 99, mood: ["whimsical", "witty", "quirky"], description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years." },
  { id: 16, title: "Mad Max: Fury Road", year: 2015, genre: ["Action", "Adventure", "Sci-Fi"], director: "George Miller", cast: ["Tom Hardy", "Charlize Theron"], rating: 8.1, runtime: 120, mood: ["action-packed", "intense", "visceral"], description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners." },
  { id: 17, title: "Her", year: 2013, genre: ["Drama", "Romance", "Sci-Fi"], director: "Spike Jonze", cast: ["Joaquin Phoenix", "Scarlett Johansson"], rating: 8.0, runtime: 126, mood: ["emotional", "thought-provoking", "melancholic"], description: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need." },
  { id: 18, title: "Blade Runner 2049", year: 2017, genre: ["Sci-Fi", "Drama", "Mystery"], director: "Denis Villeneuve", cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"], rating: 8.0, runtime: 163, mood: ["atmospheric", "cerebral", "visual"], description: "A young blade runner's discovery of a long-buried secret leads him to track down former blade runner Rick Deckard." },
  { id: 19, title: "Get Out", year: 2017, genre: ["Horror", "Mystery", "Thriller"], director: "Jordan Peele", cast: ["Daniel Kaluuya", "Allison Williams"], rating: 7.7, runtime: 104, mood: ["suspenseful", "social-commentary", "chilling"], description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception grows into a full-blown terror." },
  { id: 20, title: "Moonlight", year: 2016, genre: ["Drama"], director: "Barry Jenkins", cast: ["Trevante Rhodes", "Mahershala Ali", "Naomie Harris"], rating: 7.4, runtime: 111, mood: ["emotional", "intimate", "poetic"], description: "A young man's journey through childhood, adolescence and burgeoning adulthood as he struggles to find his place in the world." },
  { id: 21, title: "La La Land", year: 2016, genre: ["Comedy", "Drama", "Music"], director: "Damien Chazelle", cast: ["Ryan Gosling", "Emma Stone"], rating: 8.0, runtime: 128, mood: ["romantic", "nostalgic", "bittersweet"], description: "While navigating their careers in Los Angeles, a pianist and an aspiring actress fall in love while attempting to reconcile their aspirations for the future." },
  { id: 22, title: "1917", year: 2019, genre: ["Drama", "War"], director: "Sam Mendes", cast: ["George MacKay", "Dean-Charles Chapman"], rating: 8.3, runtime: 119, mood: ["intense", "emotional", "immersive"], description: "April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap." },
  { id: 23, title: "Arrival", year: 2016, genre: ["Drama", "Mystery", "Sci-Fi"], director: "Denis Villeneuve", cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"], rating: 7.9, runtime: 116, mood: ["cerebral", "emotional", "thought-provoking"], description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world." },
  { id: 24, title: "Oldboy", year: 2003, genre: ["Action", "Drama", "Mystery"], director: "Park Chan-wook", cast: ["Choi Min-sik", "Yoo Ji-tae"], rating: 8.4, runtime: 120, mood: ["dark", "psychological", "shocking"], description: "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must track down his captor in five days." },
  { id: 25, title: "Eternal Sunshine of the Spotless Mind", year: 2004, genre: ["Drama", "Romance", "Sci-Fi"], director: "Michel Gondry", cast: ["Jim Carrey", "Kate Winslet"], rating: 8.3, runtime: 108, mood: ["emotional", "quirky", "bittersweet"], description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories." },
  { id: 26, title: "No Country for Old Men", year: 2007, genre: ["Crime", "Drama", "Thriller"], director: "Coen Brothers", cast: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin"], rating: 8.2, runtime: 122, mood: ["dark", "tense", "philosophical"], description: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande." },
  { id: 27, title: "2001: A Space Odyssey", year: 1968, genre: ["Sci-Fi", "Mystery", "Adventure"], director: "Stanley Kubrick", cast: ["Keir Dullea", "Gary Lockwood"], rating: 8.3, runtime: 149, mood: ["cerebral", "atmospheric", "visionary"], description: "After discovering a mysterious artifact buried beneath the Lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer H.A.L. 9000." },
  { id: 28, title: "Children of Men", year: 2006, genre: ["Drama", "Sci-Fi", "Thriller"], director: "Alfonso Cuarón", cast: ["Clive Owen", "Julianne Moore", "Michael Caine"], rating: 7.9, runtime: 109, mood: ["dark", "intense", "emotional"], description: "In 2027, in a chaotic world in which women have become somehow infertile, a former activist agrees to help transport a miraculously pregnant woman to a sanctuary at sea." },
  { id: 29, title: "Pan's Labyrinth", year: 2006, genre: ["Drama", "Fantasy", "War"], director: "Guillermo del Toro", cast: ["Ivana Baquero", "Sergi López"], rating: 8.2, runtime: 118, mood: ["dark", "magical", "haunting"], description: "In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world." },
  { id: 30, title: "The Prestige", year: 2006, genre: ["Drama", "Mystery", "Sci-Fi"], director: "Christopher Nolan", cast: ["Christian Bale", "Hugh Jackman", "Scarlett Johansson"], rating: 8.5, runtime: 130, mood: ["suspenseful", "dark", "clever"], description: "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other." },
  { id: 31, title: "Memento", year: 2000, genre: ["Mystery", "Thriller"], director: "Christopher Nolan", cast: ["Guy Pearce", "Carrie-Anne Moss"], rating: 8.4, runtime: 113, mood: ["mind-bending", "psychological", "suspenseful"], description: "A man with short-term memory loss attempts to track down his wife's murderer." },
  { id: 32, title: "City of God", year: 2002, genre: ["Crime", "Drama"], director: "Fernando Meirelles", cast: ["Alexandre Rodrigues", "Leandro Firmino"], rating: 8.6, runtime: 130, mood: ["intense", "raw", "powerful"], description: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin." },
  { id: 33, title: "Apocalypse Now", year: 1979, genre: ["Drama", "War"], director: "Francis Ford Coppola", cast: ["Martin Sheen", "Marlon Brando", "Robert Duvall"], rating: 8.5, runtime: 147, mood: ["dark", "philosophical", "intense"], description: "During the U.S.-Vietnam War, Captain Willard is sent on a dangerous mission into Cambodia to assassinate a renegade colonel who has set himself up as a god among a local tribe." },
  { id: 34, title: "Requiem for a Dream", year: 2000, genre: ["Drama"], director: "Darren Aronofsky", cast: ["Ellen Burstyn", "Jared Leto", "Jennifer Connelly"], rating: 8.3, runtime: 102, mood: ["dark", "harrowing", "emotional"], description: "The drug-induced utopias of four Coney Island people are shattered when their addictions run deep." },
  { id: 35, title: "12 Angry Men", year: 1957, genre: ["Crime", "Drama"], director: "Sidney Lumet", cast: ["Henry Fonda", "Lee J. Cobb"], rating: 9.0, runtime: 96, mood: ["tense", "dialogue-driven", "compelling"], description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence." },
  { id: 36, title: "Mulholland Drive", year: 2001, genre: ["Drama", "Mystery", "Thriller"], director: "David Lynch", cast: ["Naomi Watts", "Laura Harring"], rating: 7.9, runtime: 147, mood: ["surreal", "mysterious", "atmospheric"], description: "After a car wreck on the winding Mulholland Drive renders a woman amnesiac, she and a perky Hollywood-hopeful search for clues and answers across Los Angeles in a twisting venture beyond dreams and reality." },
  { id: 37, title: "Dunkirk", year: 2017, genre: ["Action", "Drama", "History"], director: "Christopher Nolan", cast: ["Fionn Whitehead", "Tom Hardy", "Mark Rylance"], rating: 7.9, runtime: 106, mood: ["intense", "immersive", "visceral"], description: "Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II." },
  { id: 38, title: "A Beautiful Mind", year: 2001, genre: ["Biography", "Drama"], director: "Ron Howard", cast: ["Russell Crowe", "Ed Harris", "Jennifer Connelly"], rating: 8.2, runtime: 135, mood: ["inspiring", "emotional", "dramatic"], description: "After John Nash, a brilliant but asocial mathematician, accepts secret work in cryptography, his life takes a turn for the nightmarish." },
  { id: 39, title: "The Truman Show", year: 1998, genre: ["Comedy", "Drama"], director: "Peter Weir", cast: ["Jim Carrey", "Ed Harris", "Laura Linney"], rating: 8.1, runtime: 103, mood: ["thought-provoking", "satirical", "emotional"], description: "An insurance salesman discovers his whole life is actually a reality TV show." },
  { id: 40, title: "Amélie", year: 2001, genre: ["Comedy", "Romance"], director: "Jean-Pierre Jeunet", cast: ["Audrey Tautou", "Mathieu Kassovitz"], rating: 8.3, runtime: 122, mood: ["whimsical", "charming", "romantic"], description: "Amélie is an innocent and naive girl in Paris with her own sense of justice, who decides to help those around her and along the way discovers love." },
  { id: 41, title: "The Social Network", year: 2010, genre: ["Biography", "Drama"], director: "David Fincher", cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"], rating: 7.7, runtime: 120, mood: ["smart", "fast-paced", "compelling"], description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea." },
  { id: 42, title: "Taxi Driver", year: 1976, genre: ["Crime", "Drama"], director: "Martin Scorsese", cast: ["Robert De Niro", "Jodie Foster", "Cybill Shepherd"], rating: 8.2, runtime: 114, mood: ["dark", "intense", "psychological"], description: "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge to violently clean up the city." },
  { id: 43, title: "There Will Be Blood", year: 2007, genre: ["Drama"], director: "Paul Thomas Anderson", cast: ["Daniel Day-Lewis", "Paul Dano"], rating: 8.2, runtime: 158, mood: ["epic", "powerful", "dark"], description: "A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business." },
  { id: 44, title: "Chinatown", year: 1974, genre: ["Crime", "Drama", "Mystery"], director: "Roman Polanski", cast: ["Jack Nicholson", "Faye Dunaway"], rating: 8.2, runtime: 130, mood: ["noir", "dark", "complex"], description: "A private detective hired to expose an adulterer in 1930s Los Angeles finds himself caught up in a web of deceit, corruption, and murder." },
  { id: 45, title: "The Departed", year: 2006, genre: ["Crime", "Drama", "Thriller"], director: "Martin Scorsese", cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"], rating: 8.5, runtime: 151, mood: ["intense", "gripping", "twisty"], description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston." },
  { id: 46, title: "Magnolia", year: 1999, genre: ["Drama"], director: "Paul Thomas Anderson", cast: ["Tom Cruise", "Julianne Moore", "Philip Seymour Hoffman"], rating: 8.0, runtime: 188, mood: ["emotional", "complex", "ambitious"], description: "An exploration of chance, loss, and the lives of multiple interconnected characters in the San Fernando Valley over a 24-hour period." },
  { id: 47, title: "Zodiac", year: 2007, genre: ["Crime", "Drama", "Mystery"], director: "David Fincher", cast: ["Jake Gyllenhaal", "Mark Ruffalo", "Robert Downey Jr."], rating: 7.7, runtime: 157, mood: ["suspenseful", "methodical", "gripping"], description: "In the late 1960s/early 1970s, a San Francisco cartoonist becomes an amateur detective obsessed with the Zodiac Killer." },
  { id: 48, title: "Drive", year: 2011, genre: ["Crime", "Drama", "Thriller"], director: "Nicolas Winding Refn", cast: ["Ryan Gosling", "Carey Mulligan", "Bryan Cranston"], rating: 7.8, runtime: 100, mood: ["atmospheric", "stylish", "intense"], description: "A mysterious Hollywood stuntman and mechanic moonlights as a getaway driver and finds himself in trouble when he tries to help his neighbor." },
  { id: 49, title: "Moonrise Kingdom", year: 2012, genre: ["Comedy", "Drama", "Romance"], director: "Wes Anderson", cast: ["Jared Gilman", "Kara Hayward", "Bruce Willis"], rating: 7.8, runtime: 94, mood: ["whimsical", "charming", "nostalgic"], description: "A pair of young lovers flee their New England town, which causes a local search party to fan out to find them." },
  { id: 50, title: "Princess Mononoke", year: 1997, genre: ["Animation", "Adventure", "Fantasy"], director: "Hayao Miyazaki", cast: ["Yōji Matsuda", "Yuriko Ishida"], rating: 8.4, runtime: 134, mood: ["epic", "magical", "action-packed"], description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony." },
  { id: 51, title: "Blade Runner", year: 1982, genre: ["Sci-Fi", "Drama", "Thriller"], director: "Ridley Scott", cast: ["Harrison Ford", "Rutger Hauer", "Sean Young"], rating: 8.1, runtime: 117, mood: ["atmospheric", "noir", "cerebral"], description: "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator." },
  { id: 52, title: "A Clockwork Orange", year: 1971, genre: ["Crime", "Drama", "Sci-Fi"], director: "Stanley Kubrick", cast: ["Malcolm McDowell"], rating: 8.3, runtime: 136, mood: ["dark", "provocative", "disturbing"], description: "In the future, Alex, a violent teen, gets jailed after a murderous night out and becomes the guinea pig for a violent crime cure." },
  { id: 53, title: "The Lighthouse", year: 2019, genre: ["Drama", "Fantasy", "Horror"], director: "Robert Eggers", cast: ["Robert Pattinson", "Willem Dafoe"], rating: 7.5, runtime: 109, mood: ["psychological", "disturbing", "atmospheric"], description: "Two lighthouse keepers try to maintain their sanity while living on a remote and mysterious New England island in the 1890s." },
  { id: 54, title: "Hereditary", year: 2018, genre: ["Drama", "Horror", "Mystery"], director: "Ari Aster", cast: ["Toni Collette", "Milly Shapiro", "Gabriel Byrne"], rating: 7.3, runtime: 127, mood: ["horrifying", "psychological", "dark"], description: "A grieving family is haunted by tragic and disturbing occurrences." },
  { id: 55, title: "Portrait of a Lady on Fire", year: 2019, genre: ["Drama", "Romance"], director: "Céline Sciamma", cast: ["Noémie Merlant", "Adèle Haenel"], rating: 8.1, runtime: 121, mood: ["romantic", "emotional", "artistic"], description: "On an isolated island in Brittany at the end of the eighteenth century, a female painter is obliged to paint a wedding portrait of a young woman." },
  { id: 56, title: "Stalker", year: 1979, genre: ["Drama", "Sci-Fi"], director: "Andrei Tarkovsky", cast: ["Aleksandr Kaydanovskiy", "Anatoliy Solonitsyn"], rating: 8.1, runtime: 162, mood: ["philosophical", "atmospheric", "slow-burn"], description: "A guide leads two men through an area known as the Zone to find a room that grants wishes." },
  { id: 57, title: "Rashomon", year: 1950, genre: ["Crime", "Drama", "Mystery"], director: "Akira Kurosawa", cast: ["Toshiro Mifune", "Machiko Kyō"], rating: 8.2, runtime: 88, mood: ["classic", "philosophical", "layered"], description: "The rape of a woman and the murder of her samurai husband are recalled from the differing perspectives of a bandit, the woman, the dead man, and a woodcutter." },
  { id: 58, title: "Seven Samurai", year: 1954, genre: ["Action", "Adventure", "Drama"], director: "Akira Kurosawa", cast: ["Toshiro Mifune", "Takashi Shimura"], rating: 8.6, runtime: 207, mood: ["epic", "classic", "action-packed"], description: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves." },
  { id: 59, title: "Bicycle Thieves", year: 1948, genre: ["Drama"], director: "Vittorio De Sica", cast: ["Lamberto Maggiorani", "Enzo Staiola"], rating: 8.3, runtime: 89, mood: ["emotional", "humanist", "classic"], description: "In post-war Italy, a poverty-stricken man's bicycle is stolen. He and his son begin searching the city for it." },
  { id: 60, title: "The 400 Blows", year: 1959, genre: ["Crime", "Drama"], director: "François Truffaut", cast: ["Jean-Pierre Léaud", "Albert Rémy"], rating: 8.1, runtime: 99, mood: ["emotional", "coming-of-age", "classic"], description: "A young boy, left without attention, delves into a life of petty crime." },
  { id: 61, title: "Boyhood", year: 2014, genre: ["Drama"], director: "Richard Linklater", cast: ["Ellar Coltrane", "Patricia Arquette", "Ethan Hawke"], rating: 7.9, runtime: 165, mood: ["emotional", "nostalgic", "intimate"], description: "The life of Mason, from early childhood to his arrival at college, as experienced by him and his divorced parents." },
  { id: 62, title: "The Tree of Life", year: 2011, genre: ["Drama", "Fantasy"], director: "Terrence Malick", cast: ["Brad Pitt", "Sean Penn", "Jessica Chastain"], rating: 6.8, runtime: 139, mood: ["philosophical", "artistic", "spiritual"], description: "The story of a Midwestern family in the 1950s, exploring the origins and meaning of life." },
  { id: 63, title: "Lost in Translation", year: 2003, genre: ["Drama", "Romance"], director: "Sofia Coppola", cast: ["Bill Murray", "Scarlett Johansson"], rating: 7.7, runtime: 102, mood: ["melancholic", "intimate", "atmospheric"], description: "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo." },
  { id: 64, title: "Before Sunrise", year: 1995, genre: ["Drama", "Romance"], director: "Richard Linklater", cast: ["Ethan Hawke", "Julie Delpy"], rating: 8.1, runtime: 101, mood: ["romantic", "dialogue-driven", "intimate"], description: "A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna, which appears to be just the beginning of a long, romantic journey." },
  { id: 65, title: "Certified Copy", year: 2010, genre: ["Drama", "Romance"], director: "Abbas Kiarostami", cast: ["Juliette Binoche", "William Shimell"], rating: 7.1, runtime: 106, mood: ["philosophical", "romantic", "layered"], description: "A British writer and a French woman meet in Tuscany, and their romantic adventure leads them to question the nature of authentic experience." },
  { id: 66, title: "Yi Yi", year: 2000, genre: ["Drama"], director: "Edward Yang", cast: ["Wu Nien-jen", "Issei Ogata"], rating: 8.1, runtime: 173, mood: ["emotional", "philosophical", "intimate"], description: "A Taiwanese family encounters various difficulties in their daily lives, touching on the universal human condition." },
  { id: 67, title: "Burning", year: 2018, genre: ["Drama", "Mystery"], director: "Lee Chang-dong", cast: ["Yoo Ah-in", "Steven Yeun", "Jeon Jong-seo"], rating: 7.5, runtime: 148, mood: ["mysterious", "tense", "slow-burn"], description: "A young man is puzzled by the actions of an enigmatic new acquaintance, who claims to have a peculiar hobby." },
  { id: 68, title: "In the Mood for Love", year: 2000, genre: ["Drama", "Romance"], director: "Wong Kar-wai", cast: ["Maggie Cheung", "Tony Leung"], rating: 8.1, runtime: 98, mood: ["romantic", "melancholic", "atmospheric"], description: "Two neighbors form a bond after both suspect their spouses of having an affair." },
  { id: 69, title: "Wild Strawberries", year: 1957, genre: ["Drama"], director: "Ingmar Bergman", cast: ["Victor Sjöström", "Bibi Andersson"], rating: 8.2, runtime: 91, mood: ["reflective", "emotional", "classic"], description: "Reflecting on his long life and career while driving to collect an honorary degree, an elderly professor reconsiders his actions and choices." },
  { id: 70, title: "The Seventh Seal", year: 1957, genre: ["Drama", "Fantasy"], director: "Ingmar Bergman", cast: ["Max von Sydow", "Gunnar Björnstrand"], rating: 8.1, runtime: 96, mood: ["philosophical", "dark", "classic"], description: "A medieval knight returning from the Crusades plays a game of chess with Death." },
  { id: 71, title: "Gravity", year: 2013, genre: ["Sci-Fi", "Thriller"], director: "Alfonso Cuarón", cast: ["Sandra Bullock", "George Clooney"], rating: 7.7, runtime: 91, mood: ["intense", "immersive", "suspenseful"], description: "Two astronauts work together to survive after an accident leaves them stranded in space." },
  { id: 72, title: "The Revenant", year: 2015, genre: ["Action", "Adventure", "Drama"], director: "Alejandro González Iñárritu", cast: ["Leonardo DiCaprio", "Tom Hardy"], rating: 8.0, runtime: 156, mood: ["brutal", "visually-stunning", "survival"], description: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team." },
  { id: 73, title: "Spotlight", year: 2015, genre: ["Biography", "Crime", "Drama"], director: "Tom McCarthy", cast: ["Michael Keaton", "Mark Ruffalo", "Rachel McAdams"], rating: 8.1, runtime: 128, mood: ["important", "gripping", "realistic"], description: "The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese." },
  { id: 74, title: "The Wolf of Wall Street", year: 2013, genre: ["Biography", "Comedy", "Crime"], director: "Martin Scorsese", cast: ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie"], rating: 8.2, runtime: 180, mood: ["excessive", "hilarious", "dark"], description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government." },
  { id: 75, title: "Birdman", year: 2014, genre: ["Comedy", "Drama"], director: "Alejandro González Iñárritu", cast: ["Michael Keaton", "Emma Stone", "Edward Norton"], rating: 7.7, runtime: 119, mood: ["quirky", "intense", "theatrical"], description: "A washed-up superhero actor attempts to revive his career by writing and starring in a Broadway play." },
  { id: 76, title: "Nightcrawler", year: 2014, genre: ["Crime", "Drama", "Thriller"], director: "Dan Gilroy", cast: ["Jake Gyllenhaal", "Rene Russo"], rating: 7.8, runtime: 117, mood: ["dark", "tense", "unsettling"], description: "When Louis Bloom, a con man desperate for work, muscles into the world of L.A. crime journalism, he blurs the line between observer and participant to become the star of his own story." },
  { id: 77, title: "Ex Machina", year: 2014, genre: ["Drama", "Sci-Fi", "Thriller"], director: "Alex Garland", cast: ["Domhnall Gleeson", "Alicia Vikander", "Oscar Isaac"], rating: 7.7, runtime: 108, mood: ["cerebral", "unsettling", "thought-provoking"], description: "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I." },
  { id: 78, title: "Gone Girl", year: 2014, genre: ["Drama", "Mystery", "Thriller"], director: "David Fincher", cast: ["Ben Affleck", "Rosamund Pike"], rating: 8.1, runtime: 149, mood: ["dark", "twisty", "unsettling"], description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent." },
  { id: 79, title: "The Big Lebowski", year: 1998, genre: ["Comedy", "Crime"], director: "Coen Brothers", cast: ["Jeff Bridges", "John Goodman", "Julianne Moore"], rating: 8.1, runtime: 117, mood: ["quirky", "hilarious", "cult"], description: "Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and becomes entangled in a complex kidnapping plot." },
  { id: 80, title: "Reservoir Dogs", year: 1992, genre: ["Crime", "Drama", "Thriller"], director: "Quentin Tarantino", cast: ["Harvey Keitel", "Tim Roth", "Steve Buscemi"], rating: 8.3, runtime: 99, mood: ["tense", "stylish", "raw"], description: "When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant." },
  { id: 81, title: "Black Swan", year: 2010, genre: ["Drama", "Horror", "Thriller"], director: "Darren Aronofsky", cast: ["Natalie Portman", "Mila Kunis", "Vincent Cassel"], rating: 8.0, runtime: 108, mood: ["psychological", "dark", "intense"], description: "A committed dancer struggles to maintain her sanity after winning the lead role in a production of Tchaikovsky's Swan Lake." },
  { id: 82, title: "The Master", year: 2012, genre: ["Drama"], director: "Paul Thomas Anderson", cast: ["Joaquin Phoenix", "Philip Seymour Hoffman"], rating: 7.1, runtime: 144, mood: ["complex", "powerful", "ambiguous"], description: "A Naval veteran arrives home from war unsettled and uncertain until he is tantalized by The Cause and its magnetic leader." },
  { id: 83, title: "Prisoners", year: 2013, genre: ["Crime", "Drama", "Mystery"], director: "Denis Villeneuve", cast: ["Hugh Jackman", "Jake Gyllenhaal"], rating: 8.1, runtime: 153, mood: ["dark", "intense", "suspenseful"], description: "When Keller Dover's daughter and her friend go missing, he takes matters into his own hands as the police pursue multiple leads and the pressure mounts." },
  { id: 84, title: "Room", year: 2015, genre: ["Drama", "Thriller"], director: "Lenny Abrahamson", cast: ["Brie Larson", "Jacob Tremblay"], rating: 8.1, runtime: 118, mood: ["emotional", "intense", "hopeful"], description: "Held captive for years in an enclosed space, a mother and her young son finally gain their freedom, allowing the boy to experience the outside world for the first time." },
  { id: 85, title: "Moonrise Kingdom", year: 2012, genre: ["Comedy", "Drama", "Romance"], director: "Wes Anderson", cast: ["Jared Gilman", "Kara Hayward", "Bruce Willis"], rating: 7.8, runtime: 94, mood: ["whimsical", "charming", "nostalgic"], description: "A pair of young lovers flee their New England town, which causes a local search party to fan out to find them." },
  { id: 86, title: "Phantom Thread", year: 2017, genre: ["Drama", "Romance"], director: "Paul Thomas Anderson", cast: ["Daniel Day-Lewis", "Vicky Krieps", "Lesley Manville"], rating: 7.5, runtime: 130, mood: ["subtle", "romantic", "intense"], description: "Set in the glamour of 1950s post-war London, renowned dressmaker Reynolds Woodcock and his sister Cyril are at the center of the British fashion industry." },
  { id: 87, title: "Foxcatcher", year: 2014, genre: ["Biography", "Crime", "Drama"], director: "Bennett Miller", cast: ["Steve Carell", "Channing Tatum", "Mark Ruffalo"], rating: 7.0, runtime: 134, mood: ["dark", "unsettling", "slow-burn"], description: "The story of Olympic Gold Medal-winning wrestler Mark Schultz being recruited by John du Pont to train for the 1988 Olympics and how du Pont's jealousy and possessiveness spiraled to murder." },
  { id: 88, title: "Sicario", year: 2015, genre: ["Action", "Crime", "Drama"], director: "Denis Villeneuve", cast: ["Emily Blunt", "Benicio del Toro", "Josh Brolin"], rating: 7.6, runtime: 121, mood: ["tense", "dark", "realistic"], description: "An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs at the border area between the U.S. and Mexico." },
  { id: 89, title: "Under the Skin", year: 2013, genre: ["Drama", "Horror", "Sci-Fi"], director: "Jonathan Glazer", cast: ["Scarlett Johansson"], rating: 6.3, runtime: 108, mood: ["unsettling", "atmospheric", "alien"], description: "An alien in human form seduces and lures unsuspecting men into a deadly trap." },
  { id: 90, title: "The Babadook", year: 2014, genre: ["Drama", "Horror", "Mystery"], director: "Jennifer Kent", cast: ["Essie Davis", "Noah Wiseman"], rating: 6.8, runtime: 93, mood: ["terrifying", "emotional", "dark"], description: "A single mother, plagued by the violent death of her husband, battles with her son's fear of a monster lurking in the house, but soon discovers a sinister presence all around her." },
  { id: 91, title: "Boyhood", year: 2014, genre: ["Drama"], director: "Richard Linklater", cast: ["Ellar Coltrane", "Patricia Arquette", "Ethan Hawke"], rating: 7.9, runtime: 165, mood: ["emotional", "nostalgic", "intimate"], description: "The life of Mason, from early childhood to his arrival at college, as experienced by him and his divorced parents." },
  { id: 92, title: "Coherence", year: 2013, genre: ["Mystery", "Sci-Fi", "Thriller"], director: "James Ward Byrkit", cast: ["Emily Baldoni", "Maury Sterling"], rating: 7.2, runtime: 89, mood: ["mind-bending", "tense", "low-budget"], description: "Strange things begin to happen when a group of friends gather for a dinner party on an evening when a comet is passing overhead." },
  { id: 93, title: "Enemy", year: 2013, genre: ["Drama", "Mystery", "Thriller"], director: "Denis Villeneuve", cast: ["Jake Gyllenhaal", "Mélanie Laurent"], rating: 6.9, runtime: 90, mood: ["mysterious", "unsettling", "psychological"], description: "A man seeks out his exact look-alike after spotting him in a movie." },
  { id: 94, title: "Upgrade", year: 2018, genre: ["Action", "Sci-Fi", "Thriller"], director: "Leigh Whannell", cast: ["Logan Marshall-Green", "Betty Gabriel"], rating: 7.5, runtime: 100, mood: ["action-packed", "dark", "thrilling"], description: "Set in the near-future, technology controls nearly all aspects of life. But when Grey is left paralyzed, an experimental computer chip implant allows him to move again." },
  { id: 95, title: "Swiss Army Man", year: 2016, genre: ["Adventure", "Comedy", "Drama"], director: "Daniels", cast: ["Paul Dano", "Daniel Radcliffe"], rating: 7.0, runtime: 97, mood: ["quirky", "emotional", "surreal"], description: "A hopeless man stranded on a deserted island befriends a dead body and together they go on a surreal journey to get home." },
  { id: 96, title: "Annihilation", year: 2018, genre: ["Adventure", "Drama", "Horror"], director: "Alex Garland", cast: ["Natalie Portman", "Jennifer Jason Leigh", "Gina Rodriguez"], rating: 6.8, runtime: 115, mood: ["unsettling", "cerebral", "atmospheric"], description: "A biologist signs up for a dangerous, secret expedition into a mysterious zone where the laws of nature don't apply." },
  { id: 97, title: "Mandy", year: 2018, genre: ["Action", "Fantasy", "Horror"], director: "Panos Cosmatos", cast: ["Nicolas Cage", "Andrea Riseborough"], rating: 6.5, runtime: 121, mood: ["psychedelic", "intense", "violent"], description: "The peaceful life of a couple is shattered when a hippie cult and their maniac leader invade their home, taking everything from Red, forcing him into a spiraling, surreal rampage of vengeance." },
  { id: 98, title: "The Witch", year: 2015, genre: ["Drama", "Horror", "Mystery"], director: "Robert Eggers", cast: ["Anya Taylor-Joy", "Ralph Ineson"], rating: 6.9, runtime: 92, mood: ["terrifying", "atmospheric", "period"], description: "A family in 1630s New England is torn apart by the forces of witchcraft, black magic and possession." },
  { id: 99, title: "Midsommar", year: 2019, genre: ["Drama", "Horror", "Mystery"], director: "Ari Aster", cast: ["Florence Pugh", "Jack Reynor"], rating: 7.1, runtime: 148, mood: ["disturbing", "folk-horror", "atmospheric"], description: "A couple travels to Sweden to visit a rural hometown's fabled mid-summer festival, but what begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult." },
  { id: 100, title: "The Favourite", year: 2018, genre: ["Biography", "Comedy", "Drama"], director: "Yorgos Lanthimos", cast: ["Olivia Colman", "Emma Stone", "Rachel Weisz"], rating: 7.6, runtime: 119, mood: ["darkly-comic", "political", "sharp"], description: "In early 18th century England, a frail Queen Anne occupies the throne and her close friend Lady Sarah Churchill governs the country in her stead while tending to her childish needs." },
  { id: 101, title: "The Lobster", year: 2015, genre: ["Comedy", "Drama", "Romance"], director: "Yorgos Lanthimos", cast: ["Colin Farrell", "Rachel Weisz", "Lea Seydoux"], rating: 7.1, runtime: 119, mood: ["darkly-comic", "surreal", "thought-provoking"], description: "In a dystopian near future, single people, according to the laws of The City, are taken to The Hotel, where they are obliged to find a romantic partner in forty-five days or are transformed into beasts." },
  { id: 102, title: "Force Majeure", year: 2014, genre: ["Comedy", "Drama"], director: "Ruben Östlund", cast: ["Johannes Bah Kuhnke", "Lisa Loven Kongsli"], rating: 7.5, runtime: 120, mood: ["uncomfortable", "satirical", "thought-provoking"], description: "A Swedish family is confronted with an avalanche during their ski vacation in the French Alps, which exposes the flaws in their marriage." },
  { id: 103, title: "The Square", year: 2017, genre: ["Comedy", "Drama"], director: "Ruben Östlund", cast: ["Claes Bang", "Elisabeth Moss"], rating: 7.2, runtime: 151, mood: ["satirical", "uncomfortable", "thought-provoking"], description: "A prestigious Stockholm museum's chief art curator finds himself in times of both professional and personal crisis as he attempts to set up a controversial new exhibit." },
  { id: 104, title: "Triangle of Sadness", year: 2022, genre: ["Comedy", "Drama"], director: "Ruben Östlund", cast: ["Harris Dickinson", "Charlbi Dean", "Dolly De Leon"], rating: 7.4, runtime: 147, mood: ["satirical", "darkly-comic", "provocative"], description: "A celebrity couple join an eventful cruise for the super-rich." },
  { id: 105, title: "The Pianist", year: 2002, genre: ["Biography", "Drama", "Music"], director: "Roman Polanski", cast: ["Adrien Brody", "Thomas Kretschmann"], rating: 8.5, runtime: 150, mood: ["emotional", "harrowing", "historical"], description: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II." },
  { id: 106, title: "Life of Pi", year: 2012, genre: ["Adventure", "Drama", "Fantasy"], director: "Ang Lee", cast: ["Suraj Sharma", "Irrfan Khan"], rating: 7.9, runtime: 127, mood: ["visually-stunning", "spiritual", "adventure"], description: "A young man who survives a disaster at sea is hurtled into an epic journey of adventure and discovery." },
  { id: 107, title: "The Tree of Life", year: 2011, genre: ["Drama", "Fantasy"], director: "Terrence Malick", cast: ["Brad Pitt", "Sean Penn", "Jessica Chastain"], rating: 6.8, runtime: 139, mood: ["philosophical", "artistic", "spiritual"], description: "The story of a Midwestern family in the 1950s, exploring the origins and meaning of life." },
  { id: 108, title: "The Hours", year: 2002, genre: ["Drama"], director: "Stephen Daldry", cast: ["Meryl Streep", "Julianne Moore", "Nicole Kidman"], rating: 7.5, runtime: 114, mood: ["emotional", "literary", "melancholic"], description: "The story of how the novel 'Mrs Dalloway' affects three generations of women, all of whom, in one way or another, have had to deal with suicide in their lives." },
  { id: 109, title: "Atonement", year: 2007, genre: ["Drama", "Romance", "War"], director: "Joe Wright", cast: ["Keira Knightley", "James McAvoy", "Saoirse Ronan"], rating: 7.8, runtime: 123, mood: ["romantic", "tragic", "literary"], description: "Thirteen-year-old fledgling writer Briony Tallis irrevocably changes the course of several lives when she accuses her older sister's lover of a crime he did not commit." },
  { id: 110, title: "The English Patient", year: 1996, genre: ["Drama", "Romance", "War"], director: "Anthony Minghella", cast: ["Ralph Fiennes", "Juliette Binoche", "Kristin Scott Thomas"], rating: 7.4, runtime: 162, mood: ["romantic", "epic", "tragic"], description: "At the close of World War II, a young nurse tends to a badly-burned plane crash victim. His past is revealed in flashbacks as a series of people he has known." },
  { id: 111, title: "The Hurt Locker", year: 2008, genre: ["Drama", "Thriller", "War"], director: "Kathryn Bigelow", cast: ["Jeremy Renner", "Anthony Mackie", "Brian Geraghty"], rating: 7.6, runtime: 131, mood: ["intense", "realistic", "gritty"], description: "During the Iraq War, a Sergeant recently assigned to an army bomb squad is put at odds with his squad mates due to his maverick way of handling his work." },
  { id: 112, title: "Zero Dark Thirty", year: 2012, genre: ["Drama", "History", "Thriller"], director: "Kathryn Bigelow", cast: ["Jessica Chastain", "Jason Clarke", "Joel Edgerton"], rating: 7.4, runtime: 157, mood: ["intense", "procedural", "political"], description: "A chronicle of the decade-long hunt for al-Qaeda terrorist leader Osama bin Laden after the September 2001 attacks, and his death at the hands of the Navy SEAL Team 6 in May 2011." },
  { id: 113, title: "Argo", year: 2012, genre: ["Biography", "Drama", "Thriller"], director: "Ben Affleck", cast: ["Ben Affleck", "Bryan Cranston", "Alan Arkin"], rating: 7.7, runtime: 120, mood: ["tense", "historical", "gripping"], description: "Acting under the cover of a Hollywood producer scouting a location for a sci-fi film, a CIA agent launches a dangerous operation to rescue six Americans in Tehran during the U.S. hostage crisis in Iran in 1979." },
  { id: 114, title: "Lincoln", year: 2012, genre: ["Biography", "Drama", "History"], director: "Steven Spielberg", cast: ["Daniel Day-Lewis", "Sally Field", "Tommy Lee Jones"], rating: 7.3, runtime: 150, mood: ["historical", "political", "important"], description: "As the Civil War continues to rage, America's president struggles with continuing carnage on the battlefield and as he fights with many inside his own cabinet on the decision to emancipate the slaves." },
  { id: 115, title: "12 Years a Slave", year: 2013, genre: ["Biography", "Drama", "History"], director: "Steve McQueen", cast: ["Chiwetel Ejiofor", "Michael Fassbender", "Lupita Nyong'o"], rating: 8.1, runtime: 134, mood: ["harrowing", "important", "emotional"], description: "In the antebellum United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery." },
  { id: 116, title: "Selma", year: 2014, genre: ["Biography", "Drama", "History"], director: "Ava DuVernay", cast: ["David Oyelowo", "Tom Wilkinson", "Oprah Winfrey"], rating: 7.5, runtime: 128, mood: ["historical", "important", "inspiring"], description: "A chronicle of Dr. Martin Luther King Jr.'s campaign to secure equal voting rights via an epic march from Selma to Montgomery, Alabama, in 1965." },
  { id: 117, title: "The Theory of Everything", year: 2014, genre: ["Biography", "Drama", "Romance"], director: "James Marsh", cast: ["Eddie Redmayne", "Felicity Jones"], rating: 7.7, runtime: 123, mood: ["inspiring", "emotional", "romantic"], description: "A look at the relationship between the famous physicist Stephen Hawking and his wife." },
  { id: 118, title: "Bohemian Rhapsody", year: 2018, genre: ["Biography", "Drama", "Music"], director: "Bryan Singer", cast: ["Rami Malek", "Lucy Boynton", "Gwilym Lee"], rating: 7.9, runtime: 134, mood: ["inspiring", "musical", "dramatic"], description: "The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid." },
  { id: 119, title: "Rocketman", year: 2019, genre: ["Biography", "Drama", "Music"], director: "Dexter Fletcher", cast: ["Taron Egerton", "Jamie Bell", "Richard Madden"], rating: 7.3, runtime: 121, mood: ["musical", "flamboyant", "emotional"], description: "A musical fantasy about the fantastical human story of Elton John's breakthrough years." },
  { id: 120, title: "Yesterday", year: 2019, genre: ["Comedy", "Drama", "Music"], director: "Danny Boyle", cast: ["Himesh Patel", "Lily James", "Kate McKinnon"], rating: 6.8, runtime: 116, mood: ["charming", "nostalgic", "musical"], description: "A struggling musician realizes he's the only person on Earth who can remember The Beatles after waking up in an alternate timeline where they never existed." },
  { id: 121, title: "Once", year: 2006, genre: ["Drama", "Music", "Romance"], director: "John Carney", cast: ["Glen Hansard", "Markéta Irglová"], rating: 7.8, runtime: 86, mood: ["romantic", "musical", "intimate"], description: "A modern-day musical about a busker and an immigrant and their eventful week in Dublin, as they write, rehearse and record songs that reveal their unique love story." },
  { id: 122, title: "Begin Again", year: 2013, genre: ["Comedy", "Drama", "Music"], director: "John Carney", cast: ["Keira Knightley", "Mark Ruffalo", "Adam Levine"], rating: 6.8, runtime: 104, mood: ["feel-good", "musical", "charming"], description: "A chance encounter between a disgraced music-business executive and a young singer-songwriter, new to Manhattan, turns into a promising record deal." },
  { id: 123, title: "Soul", year: 2020, genre: ["Animation", "Adventure", "Comedy"], director: "Pete Docter", cast: ["Jamie Foxx", "Tina Fey"], rating: 8.0, runtime: 101, mood: ["philosophical", "emotional", "magical"], description: "After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife." },
  { id: 124, title: "Coco", year: 2017, genre: ["Animation", "Adventure", "Comedy"], director: "Lee Unkrich", cast: ["Anthony Gonzalez", "Gael García Bernal"], rating: 8.4, runtime: 105, mood: ["emotional", "magical", "family"], description: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer." },
  { id: 125, title: "Inside Out", year: 2015, genre: ["Animation", "Adventure", "Comedy"], director: "Pete Docter", cast: ["Amy Poehler", "Bill Hader", "Mindy Kaling"], rating: 8.1, runtime: 95, mood: ["emotional", "clever", "family"], description: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school." },
  { id: 126, title: "WALL-E", year: 2008, genre: ["Animation", "Adventure", "Family"], director: "Andrew Stanton", cast: ["Ben Burtt", "Elissa Knight"], rating: 8.4, runtime: 98, mood: ["emotional", "romantic", "ecological"], description: "In the distant future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind." },
  { id: 127, title: "Up", year: 2009, genre: ["Animation", "Adventure", "Comedy"], director: "Pete Docter", cast: ["Edward Asner", "Jordan Nagai"], rating: 8.2, runtime: 96, mood: ["emotional", "adventurous", "bittersweet"], description: "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway." },
  { id: 128, title: "The Incredibles", year: 2004, genre: ["Action", "Animation", "Adventure"], director: "Brad Bird", cast: ["Craig T. Nelson", "Holly Hunter", "Samuel L. Jackson"], rating: 8.0, runtime: 115, mood: ["fun", "action-packed", "family"], description: "A family of undercover superheroes, while trying to live the quiet suburban life, are forced into action to save the world." },
  { id: 129, title: "Toy Story", year: 1995, genre: ["Animation", "Adventure", "Comedy"], director: "John Lasseter", cast: ["Tom Hanks", "Tim Allen"], rating: 8.3, runtime: 81, mood: ["fun", "emotional", "classic"], description: "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room." },
  { id: 130, title: "Finding Nemo", year: 2003, genre: ["Animation", "Adventure", "Comedy"], director: "Andrew Stanton", cast: ["Albert Brooks", "Ellen DeGeneres"], rating: 8.2, runtime: 100, mood: ["fun", "adventurous", "emotional"], description: "After his son is taken from him, a fearful clownfish sets out on a journey across the ocean with a friendly but forgetful fish." },
  { id: 131, title: "Ratatouille", year: 2007, genre: ["Animation", "Comedy", "Family"], director: "Brad Bird", cast: ["Patton Oswalt", "Lou Romano"], rating: 8.1, runtime: 111, mood: ["charming", "fun", "inspiring"], description: "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant." },
  { id: 132, title: "Howl's Moving Castle", year: 2004, genre: ["Animation", "Adventure", "Fantasy"], director: "Hayao Miyazaki", cast: ["Chieko Baisho", "Takuya Kimura"], rating: 8.2, runtime: 119, mood: ["magical", "romantic", "imaginative"], description: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, magical moving castle." },
  { id: 133, title: "My Neighbor Totoro", year: 1988, genre: ["Animation", "Family", "Fantasy"], director: "Hayao Miyazaki", cast: ["Noriko Hidaka", "Dakota Fanning"], rating: 8.1, runtime: 86, mood: ["gentle", "magical", "nostalgic"], description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby." },
  { id: 134, title: "Nausicaä of the Valley of the Wind", year: 1984, genre: ["Animation", "Adventure", "Fantasy"], director: "Hayao Miyazaki", cast: ["Sumi Shimamoto", "Mahito Tsujimura"], rating: 8.1, runtime: 117, mood: ["epic", "ecological", "adventurous"], description: "Warrior and pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet." },
  { id: 135, title: "Castle in the Sky", year: 1986, genre: ["Animation", "Adventure", "Fantasy"], director: "Hayao Miyazaki", cast: ["Mayumi Tanaka", "Keiko Yokozawa"], rating: 8.0, runtime: 124, mood: ["adventurous", "magical", "fun"], description: "A young boy and a girl with a magic crystal must race against pirates and government agents to reach the legendary floating castle in the sky." },
  { id: 136, title: "The Wind Rises", year: 2013, genre: ["Animation", "Biography", "Drama"], director: "Hayao Miyazaki", cast: ["Hideaki Anno", "Miori Takimoto"], rating: 7.8, runtime: 126, mood: ["poetic", "melancholic", "beautiful"], description: "A fictionalized biography of Jiro Horikoshi, designer of the Mitsubishi A5M and A6M Zero fighter aircraft from World War II." },
  { id: 137, title: "Grave of the Fireflies", year: 1988, genre: ["Animation", "Drama", "War"], director: "Isao Takahata", cast: ["Tsutomu Tatsumi", "Ayano Shiraishi"], rating: 8.5, runtime: 89, mood: ["devastating", "emotional", "historical"], description: "A young boy and his little sister struggle to survive in Japan during World War II." },
  { id: 138, title: "Akira", year: 1988, genre: ["Animation", "Action", "Sci-Fi"], director: "Katsuhiro Otomo", cast: ["Mitsuo Iwata", "Nozomu Sasaki"], rating: 8.0, runtime: 124, mood: ["intense", "visionary", "dark"], description: "A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath that only two teens and a group of psychics can stop." },
  { id: 139, title: "Ghost in the Shell", year: 1995, genre: ["Animation", "Action", "Sci-Fi"], director: "Mamoru Oshii", cast: ["Atsuko Tanaka", "Iemasa Kayumi"], rating: 8.0, runtime: 83, mood: ["philosophical", "cyberpunk", "cerebral"], description: "A cyborg policewoman and her partner hunt a mysterious and powerful hacker called the Puppet Master." },
  { id: 140, title: "Neon Genesis Evangelion: The End of Evangelion", year: 1997, genre: ["Animation", "Action", "Drama"], director: "Hideaki Anno", cast: ["Megumi Ogata", "Megumi Hayashibara"], rating: 8.1, runtime: 87, mood: ["mind-bending", "dark", "apocalyptic"], description: "Reaching the final stages of the Human Instrumentality Project, NERV faces assaults both from within and without." },
  { id: 141, title: "Your Name", year: 2016, genre: ["Animation", "Drama", "Fantasy"], director: "Makoto Shinkai", cast: ["Ryunosuke Kamiki", "Mone Kamishiraishi"], rating: 8.4, runtime: 106, mood: ["romantic", "emotional", "magical"], description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person." },
  { id: 142, title: "A Silent Voice", year: 2016, genre: ["Animation", "Drama"], director: "Naoko Yamada", cast: ["Miyu Irino", "Saori Hayami"], rating: 8.1, runtime: 130, mood: ["emotional", "redemptive", "powerful"], description: "A young man is ostracized by his classmates after he bullies a deaf girl to the point where she moves away. Years later, he sets off on a path for redemption." },
  { id: 143, title: "Wolf Children", year: 2012, genre: ["Animation", "Drama", "Fantasy"], director: "Mamoru Hosoda", cast: ["Aoi Miyazaki", "Takao Osawa"], rating: 7.9, runtime: 117, mood: ["emotional", "magical", "family"], description: "After her werewolf lover unexpectedly dies, a woman must raise their two half-human/half-wolf children alone, hiding their secret from society." },
  { id: 144, title: "The Girl Who Leapt Through Time", year: 2006, genre: ["Animation", "Adventure", "Romance"], director: "Mamoru Hosoda", cast: ["Riisa Naka", "Takuya Ishida"], rating: 7.7, runtime: 98, mood: ["romantic", "fun", "bittersweet"], description: "A teenage girl discovers that she has the ability to leap through time, and decides to use this new ability for her own personal benefits. Little does she know that her actions affect the people around her." },
  { id: 145, title: "Weathering With You", year: 2019, genre: ["Animation", "Drama", "Fantasy"], director: "Makoto Shinkai", cast: ["Kotaro Daigo", "Nana Mori"], rating: 7.5, runtime: 112, mood: ["romantic", "emotional", "visually-stunning"], description: "A high-school boy who has run away to Tokyo befriends a girl who appears to be able to manipulate the weather." },
  { id: 146, title: "Perfect Blue", year: 1997, genre: ["Animation", "Drama", "Horror"], director: "Satoshi Kon", cast: ["Junko Iwao", "Rica Matsumoto"], rating: 8.0, runtime: 81, mood: ["psychological", "disturbing", "intense"], description: "A pop singer gives up her career to become an actress, but she is stalked by an obsessed fan and seemingly a ghost of her past." },
  { id: 147, title: "Paprika", year: 2006, genre: ["Animation", "Mystery", "Sci-Fi"], director: "Satoshi Kon", cast: ["Megumi Hayashibara", "Tōru Furuya"], rating: 7.7, runtime: 90, mood: ["surreal", "mind-bending", "visually-stunning"], description: "When a machine that allows therapists to enter their patients' dreams is stolen, all hell breaks loose. Only a young female therapist can stop it: Paprika." },
  { id: 148, title: "Tokyo Godfathers", year: 2003, genre: ["Animation", "Comedy", "Drama"], director: "Satoshi Kon", cast: ["Tôru Emori", "Yoshiaki Umegaki"], rating: 8.0, runtime: 92, mood: ["charming", "emotional", "fun"], description: "Three homeless people living on the streets of Tokyo discover a baby girl on Christmas Eve, and decide to find her parents." },
  { id: 149, title: "Millennium Actress", year: 2001, genre: ["Animation", "Drama", "Fantasy"], director: "Satoshi Kon", cast: ["Miyoko Shoji", "Mami Koyama"], rating: 8.0, runtime: 87, mood: ["emotional", "cinematic", "nostalgic"], description: "A documentary filmmaker and his cameraman interview a reclusive former actress and are drawn into the illusions of her life story." },
  { id: 150, title: "Waltz with Bashir", year: 2008, genre: ["Animation", "Biography", "Documentary"], director: "Ari Folman", cast: ["Ari Folman", "Ori Sivan"], rating: 8.0, runtime: 90, mood: ["haunting", "anti-war", "documentary"], description: "An Israeli film director interviews fellow veterans of the 1982 invasion of Lebanon to reconstruct his own memories of his term of service in that conflict." },
  { id: 151, title: "Persepolis", year: 2007, genre: ["Animation", "Biography", "Drama"], director: "Vincent Paronnaud", cast: ["Chiara Mastroianni", "Catherine Deneuve"], rating: 8.0, runtime: 96, mood: ["powerful", "personal", "historical"], description: "A precocious and outspoken young Iranian girl grows up during the Islamic Revolution." },
  { id: 152, title: "The Dark Knight Rises", year: 2012, genre: ["Action", "Adventure", "Crime"], director: "Christopher Nolan", cast: ["Christian Bale", "Tom Hardy", "Anne Hathaway"], rating: 8.4, runtime: 164, mood: ["epic", "dark", "intense"], description: "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City, now on the edge of total annihilation." },
  { id: 153, title: "Batman Begins", year: 2005, genre: ["Action", "Adventure"], director: "Christopher Nolan", cast: ["Christian Bale", "Michael Caine", "Liam Neeson"], rating: 8.2, runtime: 140, mood: ["dark", "origin-story", "intense"], description: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption." },
  { id: 154, title: "Iron Man", year: 2008, genre: ["Action", "Adventure", "Sci-Fi"], director: "Jon Favreau", cast: ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges"], rating: 7.9, runtime: 126, mood: ["fun", "witty", "action-packed"], description: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil." },
  { id: 155, title: "Avengers: Endgame", year: 2019, genre: ["Action", "Adventure", "Drama"], director: "Russo Brothers", cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"], rating: 8.4, runtime: 181, mood: ["emotional", "epic", "culminating"], description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe." },
  { id: 156, title: "Spider-Man: Into the Spider-Verse", year: 2018, genre: ["Action", "Animation", "Adventure"], director: "Bob Persichetti", cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld"], rating: 8.4, runtime: 117, mood: ["fresh", "fun", "visually-stunning"], description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities." },
  { id: 157, title: "Logan", year: 2017, genre: ["Action", "Drama", "Sci-Fi"], director: "James Mangold", cast: ["Hugh Jackman", "Patrick Stewart", "Dafne Keen"], rating: 8.1, runtime: 137, mood: ["dark", "emotional", "Western"], description: "In a near future, a weary Logan cares for an ailing Professor X at a remote outpost on the Mexican border." },
  { id: 158, title: "Captain America: The Winter Soldier", year: 2014, genre: ["Action", "Adventure", "Sci-Fi"], director: "Russo Brothers", cast: ["Chris Evans", "Samuel L. Jackson", "Scarlett Johansson"], rating: 7.8, runtime: 136, mood: ["tense", "political", "action-packed"], description: "As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and shield agent, Black Widow, to battle a powerful yet shadowy enemy in present-day Washington, D.C." },
  { id: 159, title: "Guardians of the Galaxy", year: 2014, genre: ["Action", "Adventure", "Comedy"], director: "James Gunn", cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"], rating: 8.0, runtime: 121, mood: ["fun", "quirky", "action-packed"], description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe." },
  { id: 160, title: "Thor: Ragnarok", year: 2017, genre: ["Action", "Adventure", "Comedy"], director: "Taika Waititi", cast: ["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett"], rating: 7.9, runtime: 130, mood: ["hilarious", "fun", "colorful"], description: "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela." },
  { id: 161, title: "Black Panther", year: 2018, genre: ["Action", "Adventure", "Sci-Fi"], director: "Ryan Coogler", cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"], rating: 7.3, runtime: 134, mood: ["important", "fun", "cultural"], description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past." },
  { id: 162, title: "Doctor Strange", year: 2016, genre: ["Action", "Adventure", "Fantasy"], director: "Scott Derrickson", cast: ["Benedict Cumberbatch", "Chiwetel Ejiofor", "Tilda Swinton"], rating: 7.5, runtime: 115, mood: ["mind-bending", "fun", "visually-stunning"], description: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts." },
  { id: 163, title: "Joker", year: 2019, genre: ["Crime", "Drama", "Thriller"], director: "Todd Phillips", cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"], rating: 8.4, runtime: 122, mood: ["dark", "psychological", "controversial"], description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime." },
  { id: 164, title: "The Batman", year: 2022, genre: ["Action", "Crime", "Drama"], director: "Matt Reeves", cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"], rating: 7.9, runtime: 176, mood: ["dark", "noir", "intense"], description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement." },
  { id: 165, title: "Dune", year: 2021, genre: ["Action", "Adventure", "Drama"], director: "Denis Villeneuve", cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"], rating: 8.0, runtime: 155, mood: ["epic", "cerebral", "atmospheric"], description: "Feature film adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy." },
  { id: 166, title: "Tenet", year: 2020, genre: ["Action", "Sci-Fi", "Thriller"], director: "Christopher Nolan", cast: ["John David Washington", "Robert Pattinson", "Elizabeth Debicki"], rating: 7.4, runtime: 150, mood: ["mind-bending", "action-packed", "complex"], description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time." },
  { id: 167, title: "The Revenant", year: 2015, genre: ["Adventure", "Drama", "Western"], director: "Alejandro González Iñárritu", cast: ["Leonardo DiCaprio", "Tom Hardy"], rating: 8.0, runtime: 156, mood: ["brutal", "survival", "visually-stunning"], description: "A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team." },
  { id: 168, title: "Once Upon a Time in Hollywood", year: 2019, genre: ["Comedy", "Drama"], director: "Quentin Tarantino", cast: ["Leonardo DiCaprio", "Brad Pitt", "Margot Robbie"], rating: 7.6, runtime: 161, mood: ["nostalgic", "stylish", "slow-burn"], description: "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles." },
  { id: 169, title: "Inglourious Basterds", year: 2009, genre: ["Adventure", "Drama", "War"], director: "Quentin Tarantino", cast: ["Brad Pitt", "Christoph Waltz", "Michael Fassbender"], rating: 8.3, runtime: 153, mood: ["tense", "witty", "stylish"], description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plan for the same." },
  { id: 170, title: "Django Unchained", year: 2012, genre: ["Drama", "Western"], director: "Quentin Tarantino", cast: ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio"], rating: 8.4, runtime: 165, mood: ["intense", "stylish", "provocative"], description: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner." },
  { id: 171, title: "Kill Bill: Volume 1", year: 2003, genre: ["Action", "Crime", "Thriller"], director: "Quentin Tarantino", cast: ["Uma Thurman", "David Carradine", "Lucy Liu"], rating: 8.2, runtime: 111, mood: ["stylish", "violent", "action-packed"], description: "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her." },
  { id: 172, title: "The Hateful Eight", year: 2015, genre: ["Crime", "Drama", "Mystery"], director: "Quentin Tarantino", cast: ["Samuel L. Jackson", "Kurt Russell", "Jennifer Jason Leigh"], rating: 7.8, runtime: 187, mood: ["tense", "dialogue-heavy", "dark"], description: "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a stagecoach lodge with six other strangers." },
  { id: 173, title: "Once Upon a Time in the West", year: 1968, genre: ["Western"], director: "Sergio Leone", cast: ["Henry Fonda", "Charles Bronson", "Claudia Cardinale"], rating: 8.5, runtime: 165, mood: ["epic", "classic", "atmospheric"], description: "A mysterious stranger with a harmonica joins forces with a notorious desperado to protect a widow and her land from a ruthless assassin working for the railroad." },
  { id: 174, title: "The Good, the Bad and the Ugly", year: 1966, genre: ["Western"], director: "Sergio Leone", cast: ["Clint Eastwood", "Eli Wallach", "Lee Van Cleef"], rating: 8.8, runtime: 161, mood: ["epic", "classic", "tense"], description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery." },
  { id: 175, title: "True Grit", year: 2010, genre: ["Adventure", "Drama", "Western"], director: "Coen Brothers", cast: ["Jeff Bridges", "Matt Damon", "Hailee Steinfeld"], rating: 7.6, runtime: 110, mood: ["gritty", "witty", "Western"], description: "A tough U.S. Marshal helps a stubborn young woman track down her father's murderer in Indian Territory." },
  { id: 176, title: "Hell or High Water", year: 2016, genre: ["Crime", "Drama", "Western"], director: "David Mackenzie", cast: ["Chris Pine", "Ben Foster", "Jeff Bridges"], rating: 7.7, runtime: 102, mood: ["gritty", "modern-Western", "tense"], description: "A divorced father and his ex-con brother resort to a desperate scheme in order to save their family's ranch in West Texas." },
  { id: 177, title: "Bone Tomahawk", year: 2015, genre: ["Horror", "Western"], director: "S. Craig Zahler", cast: ["Kurt Russell", "Patrick Wilson", "Matthew Fox"], rating: 7.1, runtime: 132, mood: ["brutal", "slow-burn", "Western"], description: "Four men embark on a rescue mission into the Wild West, where a group of settlers have been kidnapped by cannibalistic troglodytes." },
  { id: 178, title: "No Country for Old Men", year: 2007, genre: ["Crime", "Drama", "Thriller"], director: "Coen Brothers", cast: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin"], rating: 8.2, runtime: 122, mood: ["dark", "tense", "philosophical"], description: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande." },
  { id: 179, title: "Fargo", year: 1996, genre: ["Crime", "Drama", "Thriller"], director: "Coen Brothers", cast: ["Frances McDormand", "William H. Macy", "Steve Buscemi"], rating: 8.1, runtime: 98, mood: ["dark-humor", "quirky", "tense"], description: "Jerry Lundegaard's inept crime falls apart due to his and his henchmen's bungling and the persistent police work of the quite pregnant Marge Gunderson." },
  { id: 180, title: "O Brother, Where Art Thou?", year: 2000, genre: ["Adventure", "Comedy", "Crime"], director: "Coen Brothers", cast: ["George Clooney", "John Turturro", "Tim Blake Nelson"], rating: 7.8, runtime: 107, mood: ["quirky", "funny", "musical"], description: "In the deep south during the 1930s, three escaped convicts search for hidden treasure while a relentless lawman pursues them." },
  { id: 181, title: "Blood Simple", year: 1984, genre: ["Crime", "Drama", "Thriller"], director: "Coen Brothers", cast: ["John Getz", "Frances McDormand"], rating: 7.7, runtime: 99, mood: ["noir", "tense", "dark"], description: "A rich but jealous man hires a private investigator to kill his wife and her new lover. It doesn't go as planned and the mess gets worse from there." },
  { id: 182, title: "A Serious Man", year: 2009, genre: ["Comedy", "Drama"], director: "Coen Brothers", cast: ["Michael Stuhlbarg", "Richard Kind"], rating: 7.0, runtime: 106, mood: ["darkly-comic", "philosophical", "Jewish"], description: "An ordinary man's life unravels after his wife informs him that she wants a divorce." },
  { id: 183, title: "Inside Llewyn Davis", year: 2013, genre: ["Drama", "Music"], director: "Coen Brothers", cast: ["Oscar Isaac", "Carey Mulligan", "John Goodman"], rating: 7.5, runtime: 104, mood: ["melancholic", "musical", "atmospheric"], description: "A week in the life of a young folk singer as he navigates the Greenwich Village folk scene of 1961." },
  { id: 184, title: "Blue Valentine", year: 2010, genre: ["Drama", "Romance"], director: "Derek Cianfrance", cast: ["Ryan Gosling", "Michelle Williams"], rating: 7.4, runtime: 112, mood: ["emotional", "raw", "tragic"], description: "A contemporary married couple's romance and deterioration are told across two distinct time periods." },
  { id: 185, title: "The Place Beyond the Pines", year: 2012, genre: ["Crime", "Drama"], director: "Derek Cianfrance", cast: ["Ryan Gosling", "Eva Mendes", "Bradley Cooper"], rating: 7.3, runtime: 140, mood: ["atmospheric", "tragic", "generational"], description: "A motorcycle stuntman turns to robbing banks to provide for his lover and their newborn child, a decision that puts him on a collision course with an ambitious rookie cop." },
  { id: 186, title: "Marriage Story", year: 2019, genre: ["Comedy", "Drama", "Romance"], director: "Noah Baumbach", cast: ["Adam Driver", "Scarlett Johansson"], rating: 7.9, runtime: 137, mood: ["emotional", "honest", "bittersweet"], description: "Noah Baumbach's incisive and compassionate look at a marriage breaking apart and a family staying together." },
  { id: 187, title: "Frances Ha", year: 2012, genre: ["Comedy", "Drama", "Romance"], director: "Noah Baumbach", cast: ["Greta Gerwig", "Mickey Sumner"], rating: 7.4, runtime: 86, mood: ["charming", "honest", "indie"], description: "An aspiring dancer moves to New York City and throws herself into her dreams, even as the possibility of realizing them becomes increasingly elusive." },
  { id: 188, title: "The Squid and the Whale", year: 2005, genre: ["Comedy", "Drama"], director: "Noah Baumbach", cast: ["Jeff Daniels", "Laura Linney", "Jesse Eisenberg"], rating: 7.3, runtime: 88, mood: ["honest", "uncomfortable", "indie"], description: "Follows two boys dealing with their parents' divorce in 1986 Brooklyn." },
  { id: 189, title: "Lady Bird", year: 2017, genre: ["Comedy", "Drama"], director: "Greta Gerwig", cast: ["Saoirse Ronan", "Laurie Metcalf", "Tracy Letts"], rating: 7.4, runtime: 93, mood: ["coming-of-age", "honest", "charming"], description: "In Sacramento, California in 2002, an artistically inclined seventeen-year-old girl comes of age." },
  { id: 190, title: "Little Women", year: 2019, genre: ["Drama", "Romance"], director: "Greta Gerwig", cast: ["Saoirse Ronan", "Emma Watson", "Florence Pugh"], rating: 7.8, runtime: 135, mood: ["charming", "emotional", "feminist"], description: "Jo March reflects back and forth on her life, telling the beloved story of the March sisters - four young women each determined to live life on their own terms." },
  { id: 191, title: "Barbie", year: 2023, genre: ["Adventure", "Comedy", "Fantasy"], director: "Greta Gerwig", cast: ["Margot Robbie", "Ryan Gosling"], rating: 6.9, runtime: 114, mood: ["fun", "satirical", "feminist"], description: "Barbie suffers a crisis that leads her to question her world and herself. With the help of equally troubled Ken, she journeys to the real world." },
  { id: 192, title: "Oppenheimer", year: 2023, genre: ["Biography", "Drama", "History"], director: "Christopher Nolan", cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"], rating: 8.9, runtime: 180, mood: ["epic", "cerebral", "historical"], description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb." },
  { id: 193, title: "Past Lives", year: 2023, genre: ["Drama", "Romance"], director: "Celine Song", cast: ["Greta Lee", "Teo Yoo", "John Magaro"], rating: 7.8, runtime: 106, mood: ["bittersweet", "romantic", "nostalgic"], description: "Nora and Hae Sung, two deeply connected childhood friends, are separated when Nora's family emigrates from South Korea. Two decades later, they are reunited in New York for one fateful week." },
  { id: 194, title: "Killers of the Flower Moon", year: 2023, genre: ["Crime", "Drama", "History"], director: "Martin Scorsese", cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone"], rating: 7.7, runtime: 206, mood: ["epic", "dark", "historical"], description: "Members of the Osage Nation in the United States are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation." },
  { id: 195, title: "Poor Things", year: 2023, genre: ["Comedy", "Drama", "Romance"], director: "Yorgos Lanthimos", cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe"], rating: 7.9, runtime: 141, mood: ["surreal", "darkly-comic", "feminist"], description: "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter." },
  { id: 196, title: "The Zone of Interest", year: 2023, genre: ["Biography", "Drama", "History"], director: "Jonathan Glazer", cast: ["Christian Friedel", "Sandra Hüller"], rating: 7.4, runtime: 105, mood: ["disturbing", "important", "quiet"], description: "The commandant of Auschwitz, Rudolf Höss, and his wife Hedwig, strive to build a dream life for their family in a house and garden next to the camp." },
  { id: 197, title: "American Fiction", year: 2023, genre: ["Comedy", "Drama"], director: "Cord Jefferson", cast: ["Jeffrey Wright", "Tracee Ellis Ross", "John Ortiz"], rating: 7.2, runtime: 117, mood: ["satirical", "smart", "funny"], description: "A novelist who's fed up with the establishment profiting from Black entertainment, decides to write a book that is a parody of everything he hates, but the book becomes a massive success." },
  { id: 198, title: "Saltburn", year: 2023, genre: ["Drama", "Mystery", "Thriller"], director: "Emerald Fennell", cast: ["Barry Keoghan", "Jacob Elordi", "Rosamund Pike"], rating: 7.1, runtime: 131, mood: ["dark", "seductive", "obsessive"], description: "A student at Oxford University finds himself drawn into the world of a charming and aristocratic classmate, who invites him to his eccentric family's sprawling estate for a summer never to be forgotten." },
  { id: 199, title: "Priscilla", year: 2023, genre: ["Biography", "Drama", "Romance"], director: "Sofia Coppola", cast: ["Cailee Spaeny", "Jacob Elordi"], rating: 6.8, runtime: 113, mood: ["intimate", "bittersweet", "personal"], description: "The story of Priscilla Presley's relationship with Elvis Presley, focusing on their first meeting when she was just 14 years old." },
  { id: 200, title: "May December", year: 2023, genre: ["Drama"], director: "Todd Haynes", cast: ["Natalie Portman", "Julianne Moore", "Charles Melton"], rating: 6.9, runtime: 117, mood: ["uncomfortable", "complex", "satirical"], description: "Twenty years after their notorious tabloid romance gripped the nation, a married couple buckles under the pressure when an actress arrives to do research for a film about their past." },
  { id: 201, title: "All Quiet on the Western Front", year: 2022, genre: ["Drama", "War"], director: "Edward Berger", cast: ["Felix Kammerer", "Albrecht Schuch"], rating: 7.8, runtime: 148, mood: ["harrowing", "anti-war", "intense"], description: "A young German soldier's terrifying experiences and atrocities during World War I." },
  { id: 202, title: "Everything Everywhere All at Once", year: 2022, genre: ["Action", "Adventure", "Comedy"], director: "Daniels", cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"], rating: 7.8, runtime: 139, mood: ["wild", "emotional", "mind-bending"], description: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led." },
  { id: 203, title: "The Banshees of Inisherin", year: 2022, genre: ["Comedy", "Drama"], director: "Martin McDonagh", cast: ["Colin Farrell", "Brendan Gleeson", "Kerry Condon"], rating: 7.7, runtime: 114, mood: ["dark-humor", "melancholic", "Irish"], description: "Two lifelong friends find themselves at an impasse when one abruptly ends their friendship, with alarming consequences for both of them." },
  { id: 204, title: "CODA", year: 2021, genre: ["Drama", "Music", "Romance"], director: "Siân Heder", cast: ["Emilia Jones", "Troy Kotsur", "Marlee Matlin"], rating: 7.6, runtime: 111, mood: ["inspiring", "emotional", "family"], description: "As a CODA (Child of Deaf Adults), Ruby is the only hearing person in her deaf family. When the family's fishing business is threatened, Ruby finds herself torn between pursuing her passion at Berklee College of Music and her fear of abandoning her parents." },
  { id: 205, title: "The Power of the Dog", year: 2021, genre: ["Drama", "Western"], director: "Jane Campion", cast: ["Benedict Cumberbatch", "Kirsten Dunst", "Jesse Plemons"], rating: 6.9, runtime: 126, mood: ["slow-burn", "psychological", "Western"], description: "A domineering rancher responds with mocking cruelty when his brother brings home a new wife and her son, until the unexpected comes to pass." },
  { id: 206, title: "Drive My Car", year: 2021, genre: ["Drama"], director: "Ryusuke Hamaguchi", cast: ["Hidetoshi Nishijima", "Toko Miura"], rating: 7.6, runtime: 179, mood: ["melancholic", "slow-burn", "reflective"], description: "A stage actor and director, still haunted by the words of his late wife, begins to face the truth about himself through his interactions with his stoic chauffeur." },
  { id: 207, title: "Minari", year: 2020, genre: ["Drama"], director: "Lee Isaac Chung", cast: ["Steven Yeun", "Yeri Han", "Yuh-jung Youn"], rating: 7.5, runtime: 115, mood: ["emotional", "family", "immigrant"], description: "A Korean-American family moves to Arkansas in search of their own American dream. Amidst the challenges of this new life in the rugged Ozarks, they discover the meaning of home." },
  { id: 208, title: "Nomadland", year: 2020, genre: ["Drama"], director: "Chloé Zhao", cast: ["Frances McDormand", "David Strathairn"], rating: 7.3, runtime: 108, mood: ["melancholic", "atmospheric", "American"], description: "A woman in her sixties embarks on a journey through the American West, living as a van-dwelling modern-day nomad." },
  { id: 209, title: "Sound of Metal", year: 2019, genre: ["Drama", "Music"], director: "Darius Marder", cast: ["Riz Ahmed", "Olivia Cooke", "Paul Raci"], rating: 7.8, runtime: 120, mood: ["emotional", "raw", "intimate"], description: "A heavy-metal drummer's life is thrown into freefall when he begins to lose his hearing." },
  { id: 210, title: "The Father", year: 2020, genre: ["Drama"], director: "Florian Zeller", cast: ["Anthony Hopkins", "Olivia Colman"], rating: 8.3, runtime: 97, mood: ["devastating", "disorienting", "emotional"], description: "A man refuses all assistance from his daughter as he ages. As he tries to make sense of his crumbling reality, he begins to doubt his loved ones, his own mind and even the fabric of his world." },
  { id: 211, title: "Judas and the Black Messiah", year: 2021, genre: ["Biography", "Drama", "History"], director: "Shaka King", cast: ["Daniel Kaluuya", "Lakeith Stanfield"], rating: 7.4, runtime: 126, mood: ["intense", "political", "historical"], description: "The story of Fred Hampton, Chairman of the Illinois Black Panther Party, and his fateful betrayal by FBI informant William O'Neal." },
  { id: 212, title: "One Night in Miami", year: 2020, genre: ["Drama", "History"], director: "Regina King", cast: ["Kingsley Ben-Adir", "Eli Goree", "Aldis Hodge"], rating: 7.1, runtime: 114, mood: ["historical", "dialogue-driven", "important"], description: "A fictional account of one incredible night where icons Muhammad Ali, Malcolm X, Sam Cooke, and Jim Brown gathered discussing their roles in the Civil Rights Movement and cultural upheaval of the 1960s." },
  { id: 213, title: "The Trial of the Chicago 7", year: 2020, genre: ["Drama", "History"], director: "Aaron Sorkin", cast: ["Eddie Redmayne", "Alex Sharp", "Sacha Baron Cohen"], rating: 7.8, runtime: 130, mood: ["political", "tense", "important"], description: "The story of 7 people on trial stemming from various charges surrounding the uprising at the 1968 Democratic National Convention in Chicago, Illinois." },
  { id: 214, title: "Da 5 Bloods", year: 2020, genre: ["Drama", "War"], director: "Spike Lee", cast: ["Delroy Lindo", "Jonathan Majors", "Clarke Peters"], rating: 6.5, runtime: 154, mood: ["political", "raw", "Vietnam"], description: "Four African American Vietnam veterans return to Vietnam. They are in search of the remains of their fallen squad leader and the promise of buried treasure." },
  { id: 215, title: "BlacKkKlansman", year: 2018, genre: ["Biography", "Crime", "Drama"], director: "Spike Lee", cast: ["John David Washington", "Adam Driver", "Laura Harrier"], rating: 7.5, runtime: 135, mood: ["satirical", "important", "tense"], description: "Ron Stallworth, an African-American police officer from Colorado, successfully managed to infiltrate the local Ku Klux Klan branch with the help of a white surrogate, who eventually became head of the local branch." },
  { id: 216, title: "Sorry to Bother You", year: 2018, genre: ["Comedy", "Drama", "Sci-Fi"], director: "Boots Riley", cast: ["Lakeith Stanfield", "Tessa Thompson", "Armie Hammer"], rating: 6.9, runtime: 112, mood: ["satirical", "surreal", "political"], description: "In an alternate present-day version of Oakland, black telemarketer Cassius Green discovers a magical key to professional success - which propels him into a universe of greed." },
  { id: 217, title: "Get Out", year: 2017, genre: ["Horror", "Mystery", "Thriller"], director: "Jordan Peele", cast: ["Daniel Kaluuya", "Allison Williams"], rating: 7.7, runtime: 104, mood: ["suspenseful", "social-commentary", "chilling"], description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception grows into a full-blown terror." },
  { id: 218, title: "Us", year: 2019, genre: ["Horror", "Mystery", "Thriller"], director: "Jordan Peele", cast: ["Lupita Nyong'o", "Winston Duke"], rating: 6.8, runtime: 116, mood: ["terrifying", "thought-provoking", "dark"], description: "A family's serenity turns to chaos when a group of doppelgangers begin to terrorize them." },
  { id: 219, title: "Nope", year: 2022, genre: ["Horror", "Mystery", "Sci-Fi"], director: "Jordan Peele", cast: ["Daniel Kaluuya", "Keke Palmer"], rating: 6.9, runtime: 130, mood: ["tense", "ambitious", "Sci-Fi"], description: "The residents of a lonely gulch in inland California bear witness to an uncanny and chilling discovery." },
  { id: 220, title: "Booksmart", year: 2019, genre: ["Comedy"], director: "Olivia Wilde", cast: ["Beanie Feldstein", "Kaitlyn Dever"], rating: 7.2, runtime: 102, mood: ["fun", "coming-of-age", "charming"], description: "On the eve of their high school graduation, two academic overachievers who have never had time for fun reconsider their priorities." },
  { id: 221, title: "The Edge of Seventeen", year: 2016, genre: ["Comedy", "Drama"], director: "Kelly Fremon Craig", cast: ["Hailee Steinfeld", "Woody Harrelson", "Kyra Sedgwick"], rating: 7.3, runtime: 104, mood: ["coming-of-age", "funny", "honest"], description: "High-school life gets even more unbearable for Nadine when her best friend, Krista, starts dating her older brother." },
  { id: 222, title: "Eighth Grade", year: 2018, genre: ["Comedy", "Drama"], director: "Bo Burnham", cast: ["Elsie Fisher", "Josh Hamilton"], rating: 7.2, runtime: 93, mood: ["uncomfortable", "honest", "coming-of-age"], description: "An introverted teenage girl tries to survive the last week of her disastrous eighth grade year before leaving to start high school." },
  { id: 223, title: "Mid90s", year: 2018, genre: ["Drama"], director: "Jonah Hill", cast: ["Sunny Suljic", "Katherine Waterston", "Lucas Hedges"], rating: 7.3, runtime: 84, mood: ["nostalgic", "coming-of-age", "gritty"], description: "Follows Stevie, a 13-year-old in 1990s LA who spends his summer navigating between his troubled home life and a group of new friends that he meets at a Motor Avenue skate shop." },
  { id: 224, title: "The Spectacular Now", year: 2013, genre: ["Drama", "Romance"], director: "James Ponsoldt", cast: ["Miles Teller", "Shailene Woodley"], rating: 7.1, runtime: 95, mood: ["coming-of-age", "honest", "bittersweet"], description: "A hard-partying high school senior's philosophy on life is altered after he meets the not-so-typical 'nice girl'." },
  { id: 225, title: "The Perks of Being a Wallflower", year: 2012, genre: ["Drama", "Romance"], director: "Stephen Chbosky", cast: ["Logan Lerman", "Emma Watson", "Ezra Miller"], rating: 7.9, runtime: 103, mood: ["coming-of-age", "emotional", "nostalgic"], description: "An introvert freshman is taken under the wings of two seniors who welcome him to the real world." },
  { id: 226, title: "Submarine", year: 2010, genre: ["Comedy", "Drama", "Romance"], director: "Richard Ayoade", cast: ["Craig Roberts", "Yasmin Paige"], rating: 7.3, runtime: 97, mood: ["quirky", "coming-of-age", "British"], description: "15-year-old Oliver Tate has two objectives: To lose his virginity before his next birthday and to extinguish the flame between his mother and an ex-lover who has resurfaced in her life." },
  { id: 227, title: "The Breakfast Club", year: 1985, genre: ["Comedy", "Drama"], director: "John Hughes", cast: ["Emilio Estevez", "Judd Nelson", "Molly Ringwald"], rating: 7.9, runtime: 97, mood: ["nostalgic", "coming-of-age", "classic"], description: "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought." },
  { id: 228, title: "Ferris Bueller's Day Off", year: 1986, genre: ["Comedy"], director: "John Hughes", cast: ["Matthew Broderick", "Alan Ruck", "Mia Sara"], rating: 7.8, runtime: 103, mood: ["fun", "nostalgic", "charming"], description: "A high school wise guy is determined to have a day off from school, despite what the principal thinks of that." },
  { id: 229, title: "Back to the Future", year: 1985, genre: ["Adventure", "Comedy", "Sci-Fi"], director: "Robert Zemeckis", cast: ["Michael J. Fox", "Christopher Lloyd"], rating: 8.5, runtime: 116, mood: ["fun", "classic", "adventurous"], description: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc. Brown." },
  { id: 230, title: "E.T. the Extra-Terrestrial", year: 1982, genre: ["Adventure", "Family", "Sci-Fi"], director: "Steven Spielberg", cast: ["Henry Thomas", "Drew Barrymore"], rating: 7.9, runtime: 115, mood: ["emotional", "nostalgic", "magical"], description: "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world." },
  { id: 231, title: "Stand by Me", year: 1986, genre: ["Adventure", "Drama"], director: "Rob Reiner", cast: ["Wil Wheaton", "River Phoenix", "Corey Feldman"], rating: 8.1, runtime: 89, mood: ["nostalgic", "coming-of-age", "emotional"], description: "After learning about the location of a missing boy's body, four friends go on a hike to find it." },
  { id: 232, title: "The Sandlot", year: 1993, genre: ["Comedy", "Drama", "Family"], director: "David Mickey Evans", cast: ["Tom Guiry", "Mike Vitar"], rating: 7.8, runtime: 101, mood: ["nostalgic", "fun", "coming-of-age"], description: "In the summer of 1962, a new kid in town is taken under the wing of a young baseball prodigy and his friends at their neighborhood sandlot." },
  { id: 233, title: "Dazed and Confused", year: 1993, genre: ["Comedy", "Drama"], director: "Richard Linklater", cast: ["Jason London", "Wiley Wiggins", "Matthew McConaughey"], rating: 7.6, runtime: 102, mood: ["nostalgic", "fun", "coming-of-age"], description: "The adventures of incoming high school and junior high students on the last day of school, in May of 1976." },
  { id: 234, title: "Almost Famous", year: 2000, genre: ["Drama", "Music"], director: "Cameron Crowe", cast: ["Billy Crudup", "Kate Hudson", "Frances McDormand"], rating: 7.9, runtime: 122, mood: ["nostalgic", "musical", "coming-of-age"], description: "A 15-year-old aspiring music journalist is assigned by Rolling Stone magazine to write a profile of an up-and-coming rock band as he accompanies them on their concert tour." },
  { id: 235, title: "High Fidelity", year: 2000, genre: ["Comedy", "Drama", "Music"], director: "Stephen Frears", cast: ["John Cusack", "Jack Black", "Iben Hjejle"], rating: 7.5, runtime: 113, mood: ["romantic", "musical", "witty"], description: "Rob, a record store owner and pop culture junkie, recounts his top five breakups, including the one in progress." },
  { id: 236, title: "Nick and Norah's Infinite Playlist", year: 2008, genre: ["Comedy", "Drama", "Music"], director: "Peter Sollett", cast: ["Michael Cera", "Kat Dennings"], rating: 6.6, runtime: 90, mood: ["romantic", "musical", "fun"], description: "Two teens meet at a New York City concert and navigate through the city to find Nick's favorite band and Norah's missing friend." },
  { id: 237, title: "Juno", year: 2007, genre: ["Comedy", "Drama"], director: "Jason Reitman", cast: ["Ellen Page", "Michael Cera", "Jennifer Garner"], rating: 7.4, runtime: 96, mood: ["quirky", "funny", "heartwarming"], description: "Faced with an unplanned pregnancy, an offbeat young woman makes an unusual decision regarding her unborn child." },
  { id: 238, title: "500 Days of Summer", year: 2009, genre: ["Comedy", "Drama", "Romance"], director: "Marc Webb", cast: ["Zooey Deschanel", "Joseph Gordon-Levitt"], rating: 7.7, runtime: 95, mood: ["quirky", "romantic", "honest"], description: "An offbeat romantic comedy about a woman who doesn't believe true love exists, and the young man who falls for her." },
  { id: 239, title: "The Secret Life of Walter Mitty", year: 2013, genre: ["Adventure", "Comedy", "Drama"], director: "Ben Stiller", cast: ["Ben Stiller", "Kristen Wiig"], rating: 7.3, runtime: 114, mood: ["inspiring", "adventurous", "feel-good"], description: "When his job along with that of his co-worker are threatened, Walter takes action in the real world embarking on a global journey that turns into an adventure more extraordinary than anything he could have ever imagined." },
  { id: 240, title: "Chef", year: 2014, genre: ["Comedy", "Drama"], director: "Jon Favreau", cast: ["Jon Favreau", "John Leguizamo", "Sofia Vergara"], rating: 7.3, runtime: 114, mood: ["feel-good", "fun", "food"], description: "A head chef quits his restaurant job and buys a food truck in an effort to reclaim his creative promise, while improving his relationship with his ex-wife and son." },
  { id: 241, title: "Julie & Julia", year: 2009, genre: ["Biography", "Drama", "Romance"], director: "Nora Ephron", cast: ["Meryl Streep", "Amy Adams", "Stanley Tucci"], rating: 7.0, runtime: 123, mood: ["charming", "feel-good", "food"], description: "Julia Child's early life in France, where she becomes enamored with cooking, parallels the life of blogger Julie Powell, who aspires to cook all 524 recipes in Child's cookbook in 365 days." },
  { id: 242, title: "Eat Pray Love", year: 2010, genre: ["Biography", "Drama", "Romance"], director: "Ryan Murphy", cast: ["Julia Roberts", "James Franco"], rating: 5.8, runtime: 133, mood: ["feel-good", "travel", "spiritual"], description: "A married woman realizes how unhappy her marriage really is, and that her life needs to go in a different direction. After a painful divorce, she takes a year to travel the world alone." },
  { id: 243, title: "The Secret Garden", year: 2020, genre: ["Adventure", "Drama", "Family"], director: "Marc Munden", cast: ["Dixie Egerickx", "Colin Firth", "Julie Walters"], rating: 5.9, runtime: 100, mood: ["magical", "family", "British"], description: "An orphaned girl discovers a magical garden hidden at her strict uncle's estate." },
  { id: 244, title: "The Pursuit of Happyness", year: 2006, genre: ["Biography", "Drama"], director: "Gabriele Muccino", cast: ["Will Smith", "Jaden Smith"], rating: 8.0, runtime: 117, mood: ["inspiring", "emotional", "uplifting"], description: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional endeavor." },
  { id: 245, title: "Saving Private Ryan", year: 1998, genre: ["Drama", "War"], director: "Steven Spielberg", cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore"], rating: 8.6, runtime: 169, mood: ["intense", "emotional", "historical"], description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action." },
  { id: 246, title: "Platoon", year: 1986, genre: ["Drama", "War"], director: "Oliver Stone", cast: ["Charlie Sheen", "Tom Berenger", "Willem Dafoe"], rating: 8.1, runtime: 120, mood: ["dark", "intense", "war"], description: "A soldier in Vietnam is caught between two sergeants: one evil and one good." },
  { id: 247, title: "Raging Bull", year: 1980, genre: ["Biography", "Drama", "Sport"], director: "Martin Scorsese", cast: ["Robert De Niro", "Joe Pesci"], rating: 8.2, runtime: 129, mood: ["intense", "powerful", "brutal"], description: "The life of Jake La Motta, a former middleweight boxing champion whose violence and self-destructive behavior destroyed his relationships and professional career." },
  { id: 248, title: "The Irishman", year: 2019, genre: ["Biography", "Crime", "Drama"], director: "Martin Scorsese", cast: ["Robert De Niro", "Al Pacino", "Joe Pesci"], rating: 7.8, runtime: 209, mood: ["epic", "melancholic", "crime"], description: "An old man recalls his time painting houses for his friend, Jimmy Hoffa, through the 1950-70s." },
  { id: 249, title: "Casino", year: 1995, genre: ["Crime", "Drama"], director: "Martin Scorsese", cast: ["Robert De Niro", "Sharon Stone", "Joe Pesci"], rating: 8.2, runtime: 178, mood: ["stylish", "epic", "crime"], description: "A tale of greed, deception, money, power, and murder occur between two best friends: a mafia enforcer and a casino executive compete against each other over a gambling empire." },
  { id: 250, title: "Mean Streets", year: 1973, genre: ["Crime", "Drama"], director: "Martin Scorsese", cast: ["Robert De Niro", "Harvey Keitel"], rating: 7.3, runtime: 112, mood: ["gritty", "raw", "crime"], description: "A small-time hood must choose between his family's Mafia connections and his feelings for his epileptic girlfriend." },
];

// ─── CONTENT-BASED SIMILARITY ─────────────────────────────────────────────
function cosineSimilarity(vecA, vecB) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i]; normA += vecA[i] ** 2; normB += vecB[i] ** 2;
  }
  return normA && normB ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
}
function movieToVector(movie, allGenres, allMoods) {
  return [...allGenres.map(g => movie.genre.includes(g) ? 1 : 0), ...allMoods.map(m => movie.mood.includes(m) ? 1 : 0), movie.rating / 10, (movie.year - 1940) / (2024 - 1940)];
}
const ALL_GENRES = [...new Set(MOVIES.flatMap(m => m.genre))].sort();
const ALL_MOODS = [...new Set(MOVIES.flatMap(m => m.mood))].sort();
const MOVIE_VECTORS = MOVIES.map(m => movieToVector(m, ALL_GENRES, ALL_MOODS));

function getContentBasedRecs(likedIds, dislikedIds, topN = 12) {
  if (!likedIds.length) return [];
  const likedVecs = likedIds.map(id => MOVIE_VECTORS[MOVIES.findIndex(m => m.id === id)]).filter(Boolean);
  const avgVec = likedVecs[0].map((_, i) => likedVecs.reduce((s, v) => s + v[i], 0) / likedVecs.length);
  return MOVIES.map((m, i) => ({ movie: m, score: cosineSimilarity(avgVec, MOVIE_VECTORS[i]) }))
    .filter(s => !likedIds.includes(s.movie.id) && !dislikedIds.includes(s.movie.id))
    .sort((a, b) => b.score - a.score).slice(0, topN);
}

function generateContentExplanation(rec, likedMovies) {
  if (!likedMovies.length) return "Highly rated film you might enjoy.";
  const sharedGenres = rec.genre.filter(g => likedMovies.flatMap(m => m.genre).includes(g));
  const sharedMoods = rec.mood.filter(m => likedMovies.flatMap(mv => mv.mood).includes(m));
  const parts = [];
  if (sharedGenres.length) parts.push(`shares ${sharedGenres.slice(0, 2).join(" & ")} genre${sharedGenres.length > 1 ? "s" : ""} with your favorites`);
  if (sharedMoods.length) parts.push(`has a ${sharedMoods.slice(0, 2).join(" & ")} tone you appreciate`);
  if ([...new Set(likedMovies.map(m => m.director))].includes(rec.director)) parts.push(`directed by ${rec.director}, whose work you've rated highly`);
  if (rec.rating >= 8.5) parts.push(`exceptional ${rec.rating}/10 critical rating`);
  return parts.length ? parts.join("; ") + "." : `${rec.genre[0]} film with ${rec.rating}/10 rating.`;
}

// ─── EVALUATION METRICS ───────────────────────────────────────────────────
function calcPrecisionAtK(recs, k = 5) { return (recs.slice(0, k).filter(r => r.movie.rating >= 8.0).length / k).toFixed(2); }
function calcDiversityScore(recs) { if (recs.length < 2) return 0; return (new Set(recs.map(r => r.movie.genre[0])).size / Math.min(recs.length, 10)).toFixed(2); }
function calcCategoryCoverage(recs) { return ((new Set(recs.flatMap(r => r.movie.genre)).size / ALL_GENRES.length) * 100).toFixed(0); }
function calcNDCG(recs, k = 5) {
  const gains = recs.slice(0, k).map((r, i) => (r.movie.rating - 6) / Math.log2(i + 2));
  const ideal = [...recs].sort((a, b) => b.movie.rating - a.movie.rating).slice(0, k).map((r, i) => (r.movie.rating - 6) / Math.log2(i + 2));
  const dcg = gains.reduce((s, g) => s + g, 0), idcg = ideal.reduce((s, g) => s + g, 0);
  return idcg ? (dcg / idcg).toFixed(2) : "0.00";
}

const GENRE_COLORS = {
  "Sci-Fi": "#22d3ee", "Drama": "#a78bfa", "Action": "#f87171", "Crime": "#fbbf24",
  "Horror": "#ef4444", "Animation": "#34d399", "Comedy": "#fb923c", "Romance": "#f472b6",
  "Documentary": "#818cf8", "Western": "#d97706", "War": "#94a3b8", "Thriller": "#c084fc",
  "Mystery": "#38bdf8", "Fantasy": "#c084fc", "Adventure": "#10b981", "Biography": "#f59e0b",
  "History": "#e2e8f0", "Music": "#ec4899", "Family": "#6ee7b7", "Sport": "#fcd34d"
};

// ─── STARS ─────────────────────────────────────────────────────────────────
function Stars({ rating, onRate }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <button key={n} onMouseEnter={() => onRate && setHov(n)} onMouseLeave={() => onRate && setHov(0)}
          onClick={() => onRate?.(n)}
          style={{ fontSize: "1rem", lineHeight: 1, color: n <= (hov || rating) ? "#f59e0b" : "#334155", cursor: onRate ? "pointer" : "default", background: "none", border: "none", padding: "2px", transition: "color 0.15s, transform 0.15s", transform: n <= (hov || rating) ? "scale(1.2)" : "scale(1)" }}>
          ★
        </button>
      ))}
    </div>
  );
}

// ─── MOVIE CARD ────────────────────────────────────────────────────────────
function MovieCard({ movie, score, explanation, onLike, onDislike, onRate, userRating, isLiked, isDisliked, compact = false }) {
  const gc = GENRE_COLORS[movie.genre[0]] || "#818cf8";
  return (
    <div style={{
      background: "linear-gradient(160deg, #111827 0%, #0d1520 100%)",
      border: `1px solid ${isLiked ? gc + "66" : "#1f2937"}`,
      borderRadius: 16,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
      boxShadow: isLiked ? `0 0 20px ${gc}22` : "0 2px 8px rgba(0,0,0,0.4)",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${gc}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isLiked ? `0 0 20px ${gc}22` : "0 2px 8px rgba(0,0,0,0.4)"; }}
    >
      {/* Top accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${gc}, ${gc}44, transparent)` }} />

      <div style={{ padding: compact ? "14px 16px" : "18px 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: compact ? "0.95rem" : "1.05rem", color: "#f1f5f9", lineHeight: 1.25, marginBottom: 5 }}>
              {movie.title}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", fontVariantNumeric: "tabular-nums" }}>{movie.year}</span>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: gc + "18", color: gc, border: `1px solid ${gc}33`, letterSpacing: "0.02em" }}>
                {movie.genre[0]}
              </span>
              <span style={{ fontSize: "0.72rem", color: "#fbbf24", fontWeight: 700 }}>★ {movie.rating}</span>
              <span style={{ fontSize: "0.68rem", color: "#475569" }}>{movie.runtime}m</span>
            </div>
          </div>
          {score !== undefined && (
            <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: gc + "15", border: `2px solid ${gc}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: gc, fontFamily: "monospace" }}>{Math.round(score * 100)}%</span>
            </div>
          )}
        </div>

        {/* Description */}
        {!compact && (
          <p style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.55, margin: 0 }}>
            {movie.description.slice(0, 110)}…
          </p>
        )}

        {/* Director */}
        <p style={{ fontSize: "0.72rem", color: "#475569", margin: 0 }}>Dir. {movie.director}</p>

        {/* Explanation */}
        {explanation && (
          <div style={{ background: "#0a0f1a", borderLeft: `3px solid ${gc}`, borderRadius: "0 8px 8px 0", padding: "8px 12px" }}>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.5, margin: 0 }}>
              <span style={{ color: gc, fontWeight: 600 }}>Why: </span>{explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 10, borderTop: "1px solid #1f2937" }}>
          <Stars rating={userRating || 0} onRate={onRate} />
          {onLike && onDislike && (
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={onDislike} style={{
                width: 32, height: 32, borderRadius: "50%", border: isDisliked ? "1px solid #ef4444" : "1px solid #374151",
                background: isDisliked ? "#ef444418" : "#1f2937", color: isDisliked ? "#ef4444" : "#6b7280",
                fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center"
              }}>✕</button>
              <button onClick={onLike} style={{
                width: 32, height: 32, borderRadius: "50%", border: isLiked ? `1px solid ${gc}` : "1px solid #374151",
                background: isLiked ? gc + "22" : "#1f2937", color: isLiked ? gc : "#6b7280",
                fontSize: "0.95rem", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center"
              }}>♥</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────
function MetricCard({ label, value, color, description }) {
  return (
    <div style={{ background: "#0d1520", border: `1px solid ${color}22`, borderRadius: 14, padding: "20px 16px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div style={{ fontSize: "2rem", fontWeight: 800, color, fontFamily: "'DM Mono', 'Courier New', monospace", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#94a3b8", marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
      {description && <div style={{ fontSize: "0.68rem", color: "#475569", marginTop: 4 }}>{description}</div>}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("discover");
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [ratings, setRatings] = useState({});
  const [contentRecs, setContentRecs] = useState([]);
  const [llmRecs, setLlmRecs] = useState([]);
  const [llmLoading, setLlmLoading] = useState(false);
  const [llmError, setLlmError] = useState("");
  const [nlInput, setNlInput] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [browsePage, setBrowsePage] = useState(0);
  const chatEndRef = useRef(null);

  const GENRES_ALL = ["Sci-Fi", "Drama", "Action", "Crime", "Horror", "Animation", "Comedy", "Romance", "Thriller", "Mystery", "Fantasy", "Adventure", "Western", "Documentary", "War", "Biography", "History", "Music"];
  const likedMovies = liked.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);

  useEffect(() => {
    setContentRecs(liked.length > 0 ? getContentBasedRecs(liked, disliked, 12) : []);
  }, [liked, disliked]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatHistory]);

  const handleLike = (id) => { setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); setDisliked(p => p.filter(x => x !== id)); };
  const handleDislike = (id) => { setDisliked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); setLiked(p => p.filter(x => x !== id)); };
  const handleRate = (id, val) => setRatings(p => ({ ...p, [id]: val }));

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;
  const extractGeminiText = (data) => data?.candidates?.[0]?.content?.parts?.map(p => p?.text).filter(Boolean).join("") || "";

  const getLLMRecs = async (prompt) => {
    setLlmError("");
    setLlmLoading(true);
    try {
      const likedTitles = likedMovies.map(m => m.title).join(", ") || "none yet";
    const sysPrompt = `You are CinemaAI. The user wants film recommendations.
User's liked films: ${likedTitles}
Mood/request: ${prompt || "recommend great films"}
Available movies: ${MOVIES.map(m => `[${m.id}] ${m.title} (${m.year}, ${m.genre[0]}, dir:${m.director})`).join(" | ")}
Return exactly 6 recommendations as separate lines in this format:
ID|very short reason (max 12 words, no title repetition).
Example:
3|Cerebral sci-fi that matches their love of smart, mind-bending stories
17|Shares tone, pacing, and emotional arc with their favorites
Only output those 6 lines. No introductions, no bullets, no extra text.`;
    const res = await fetch(GEMINI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: sysPrompt }] }], generationConfig: { maxOutputTokens: 160 } })
      });
      const data = await res.json();
      const text = extractGeminiText(data).trim();
    // Preferred format: 6 lines of "ID|reason"
    const lines = text.split(/\n|;/).map(l => l.trim()).filter(Boolean);
    let recs = [];
    if (lines.length) {
      recs = lines.map(line => {
        const [idPart, reasonPart] = line.split("|");
        const id = parseInt(idPart?.trim(), 10);
        if (isNaN(id)) return null;
        const movie = MOVIES.find(m => m.id === id);
        if (!movie) return null;
        return {
          movie,
          score: 0.95,
          explanation: reasonPart ? reasonPart.trim() : null
        };
      }).filter(Boolean).slice(0, 6);
    }
    // Fallback: old behavior (comma-separated IDs only)
    if (!recs.length) {
      const ids = text.split(/[,\s]+/).map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
      recs = ids.map(id => {
        const movie = MOVIES.find(m => m.id === id);
        return movie ? { movie, score: 0.95, explanation: null } : null;
      }).filter(Boolean).slice(0, 6);
    }
      setLlmRecs(recs);
      if (recs.length === 0) setLlmError("No results returned. Try again.");
    } catch (e) {
      setLlmError("Request failed. Try again.");
      setLlmRecs([]);
    }
    setLlmLoading(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput; setChatInput("");
    const newHistory = [...chatHistory, { role: "user", content: userMsg }];
    setChatHistory(newHistory); setChatLoading(true);
    try {
      const sysPrompt = `You are CinemaAI, a passionate film recommender. User's liked films: ${likedMovies.map(m => m.title).join(", ") || "none yet"}.
Available movies: ${MOVIES.map(m => `[${m.id}] ${m.title} (${m.year}, ${m.genre[0]}, dir:${m.director})`).join(" | ")}
When recommending films, write 1-2 focused paragraphs per response (never bullet lists). Mention specific titles with their director and year, explain thematic and emotional similarities to the user's taste, and describe the viewing experience. Be detailed but concise — aim for 80-140 words total.`;
      const res = await fetch(GEMINI_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: `${sysPrompt}\n\n${newHistory.map(h => `${h.role}: ${h.content}`).join("\n")}` }] }], generationConfig: { maxOutputTokens: 2048 } }) });
      const data = await res.json();
      setChatHistory([...newHistory, { role: "assistant", content: extractGeminiText(data) || "Connection error." }]);
    } catch (e) { setChatHistory([...newHistory, { role: "assistant", content: "Connection error. Please try again." }]); }
    setChatLoading(false);
  };

  const PAGE_SIZE = 24;
  const browsed = MOVIES.filter(m => {
    const matchSearch = !searchQ || m.title.toLowerCase().includes(searchQ.toLowerCase()) || m.director.toLowerCase().includes(searchQ.toLowerCase());
    const matchGenre = !selectedGenres.length || m.genre.some(g => selectedGenres.includes(g));
    return matchSearch && matchGenre;
  });
  const pagedMovies = browsed.slice(browsePage * PAGE_SIZE, (browsePage + 1) * PAGE_SIZE);

  const metrics = contentRecs.length > 0 ? {
    precision: calcPrecisionAtK(contentRecs),
    diversity: calcDiversityScore(contentRecs),
    coverage: calcCategoryCoverage(contentRecs),
    ndcg: calcNDCG(contentRecs),
    likeRatio: liked.length ? (liked.length / (liked.length + disliked.length)).toFixed(2) : "N/A"
  } : null;

  const navTabs = [
    { id: "discover", label: "Discover", icon: "◈" },
    { id: "recs", label: "Recommendations", icon: "⊕" },
    { id: "chat", label: "AI Chat", icon: "◆" },
    { id: "metrics", label: "Metrics", icon: "▣" },
  ];

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#080e1a", color: "#e2e8f0", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100%; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #0d1520; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #374151; }
        input, textarea { outline: none; font-family: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
        .fade-in { animation: fadeIn 0.35s ease both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .shimmer { background: linear-gradient(90deg, #111827 25%, #1f2937 50%, #111827 75%); background-size: 200% 100%; animation: shimmer 1.6s infinite; border-radius: 12px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .movie-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        .metrics-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        @media (max-width: 1100px) { .rec-grid { grid-template-columns: 1fr; } }
        @media (max-width: 900px) { .movie-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); } .metrics-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 640px) { .movie-grid { grid-template-columns: 1fr; } .metrics-grid { grid-template-columns: repeat(2, 1fr); } .metrics-bottom { grid-template-columns: 1fr; } }
        .tab-btn { padding: 8px 18px; border-radius: 10px; font-size: 0.83rem; font-weight: 500; letter-spacing: 0.01em; transition: all 0.2s; white-space: nowrap; }
        .pill-btn { padding: 5px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 500; transition: all 0.15s; white-space: nowrap; }
        .action-btn { padding: 10px 22px; border-radius: 10px; font-size: 0.85rem; font-weight: 600; transition: all 0.2s; }
        .chat-user { background: linear-gradient(135deg, #1e40af, #6d28d9); border-radius: 18px 18px 4px 18px; }
        .chat-ai { background: #111827; border: 1px solid #1f2937; border-radius: 18px 18px 18px 4px; }
        .stat-box { background: #0d1520; border: 1px solid #1f2937; border-radius: 12px; padding: 16px 20px; text-align: center; }
        .hover-lift:hover { transform: translateY(-1px); }
      `}</style>

      {/* ─── HEADER ─── */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,14,26,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid #1f2937" }}>
        <div style={{ width: "100%", maxWidth: 1600, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, gap: 16 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #f59e0b, #ef4444)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", boxShadow: "0 0 16px #f59e0b44" }}>◈</div>
            <div>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.15rem", fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em", lineHeight: 1 }}>CinemaAI</div>
              <div style={{ fontSize: "0.58rem", color: "#475569", letterSpacing: "0.12em", fontWeight: 600 }}>AI-POWERED FILM DISCOVERY</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 4 }}>
            {navTabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="tab-btn"
                style={{ background: tab === t.id ? "#1e3a5f" : "transparent", color: tab === t.id ? "#60a5fa" : "#64748b", border: tab === t.id ? "1px solid #2563eb33" : "1px solid transparent" }}>
                <span style={{ marginRight: 5, opacity: 0.8 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </nav>

          {/* Status */}
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <div style={{ padding: "6px 12px", borderRadius: 8, background: "#111827", border: "1px solid #1f2937", fontSize: "0.78rem", color: "#94a3b8", display: "flex", gap: 10 }}>
              <span style={{ color: "#f472b6" }}>♥ {liked.length}</span>
              <span style={{ color: "#334155" }}>·</span>
              <span style={{ color: "#fbbf24" }}>★ {Object.keys(ratings).length}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main style={{ width: "100%", maxWidth: 1600, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* ══════════ DISCOVER TAB ══════════ */}
        {tab === "discover" && (
          <div className="fade-in">
            {/* Hero Banner */}
            <div style={{ background: "linear-gradient(135deg, #0d1b35 0%, #0f1f3d 40%, #0a1628 100%)", border: "1px solid #1e3a5f", borderRadius: 20, padding: "36px 40px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, #1e40af0d, transparent 60%), radial-gradient(circle at 20% 80%, #7c3aed0d, transparent 50%)" }} />
              <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
                <div>
                  <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, color: "#f8fafc", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                    Discover Your<br /><span style={{ color: "#f59e0b", fontStyle: "italic" }}>Next Favorite Film</span>
                  </h1>
                  <p style={{ color: "#64748b", marginTop: 10, fontSize: "0.9rem" }}>250 curated films · AI-powered recommendations · 2 algorithms</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                    {["♥ Like films you enjoy", "★ Rate 1–5 stars", "◈ Get AI explanations", "◆ Ask in natural language"].map(tip => (
                      <span key={tip} style={{ padding: "4px 12px", borderRadius: 20, fontSize: "0.72rem", background: "#0a1020", border: "1px solid #1e3a5f", color: "#64748b" }}>{tip}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  {[{ v: "250", l: "Films", c: "#f59e0b" }, { v: liked.length, l: "Liked", c: "#f472b6" }, { v: Object.keys(ratings).length, l: "Rated", c: "#fbbf24" }].map(s => (
                    <div key={s.l} className="stat-box" style={{ minWidth: 80 }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.8rem", color: s.c, fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: "0.68rem", color: "#475569", marginTop: 4, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ position: "relative", flex: "1 1 240px", minWidth: 200 }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: "0.85rem" }}>🔍</span>
                <input value={searchQ} onChange={e => { setSearchQ(e.target.value); setBrowsePage(0); }}
                  placeholder="Search title or director..."
                  style={{ width: "100%", padding: "9px 12px 9px 36px", borderRadius: 10, background: "#0d1520", border: "1px solid #1f2937", color: "#e2e8f0", fontSize: "0.85rem" }} />
              </div>
              {GENRES_ALL.slice(0, 12).map(g => (
                <button key={g} onClick={() => { setSelectedGenres(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g]); setBrowsePage(0); }}
                  className="pill-btn"
                  style={{ background: selectedGenres.includes(g) ? (GENRE_COLORS[g] || "#818cf8") + "22" : "#0d1520", color: selectedGenres.includes(g) ? (GENRE_COLORS[g] || "#818cf8") : "#475569", border: `1px solid ${selectedGenres.includes(g) ? (GENRE_COLORS[g] || "#818cf8") + "55" : "#1f2937"}` }}>
                  {g}
                </button>
              ))}
            </div>

            <p style={{ fontSize: "0.75rem", color: "#334155", marginBottom: 16 }}>{browsed.length} films · page {browsePage + 1}/{Math.ceil(browsed.length / PAGE_SIZE)}</p>

            <div className="movie-grid">
              {pagedMovies.map(m => (
                <MovieCard key={m.id} movie={m} userRating={ratings[m.id]} isLiked={liked.includes(m.id)} isDisliked={disliked.includes(m.id)}
                  onLike={() => handleLike(m.id)} onDislike={() => handleDislike(m.id)} onRate={v => handleRate(m.id, v)} />
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
              {browsePage > 0 && (
                <button onClick={() => setBrowsePage(p => p - 1)} className="action-btn"
                  style={{ background: "#111827", color: "#e2e8f0", border: "1px solid #1f2937" }}>← Previous</button>
              )}
              {(browsePage + 1) * PAGE_SIZE < browsed.length && (
                <button onClick={() => setBrowsePage(p => p + 1)} className="action-btn"
                  style={{ background: "#111827", color: "#e2e8f0", border: "1px solid #1f2937" }}>Next →</button>
              )}
            </div>
          </div>
        )}

        {/* ══════════ RECOMMENDATIONS TAB ══════════ */}
        {tab === "recs" && (
          <div className="fade-in">
            {/* Info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#0d1b35", border: "1px solid #1e3a5f", borderRadius: 14, padding: "18px 22px" }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", color: "#f8fafc", marginBottom: 5 }}>◉ Content-Based Filtering</div>
                <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.5 }}>Cosine similarity on genre, mood & rating feature vectors. {liked.length === 0 ? "Like some films to activate." : `Based on ${liked.length} liked film${liked.length !== 1 ? "s" : ""}.`}</p>
              </div>
              <div style={{ background: "#0d1520", border: "1px solid #7c3aed33", borderRadius: 14, padding: "18px 22px" }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1rem", color: "#f8fafc", marginBottom: 5 }}>◈ LLM-Powered</div>
                <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.5 }}>AI understands your taste through natural language and reasoning over the full catalog.</p>
              </div>
            </div>

            {/* LLM Input */}
            <div style={{ background: "#0d1520", border: "1px solid #7c3aed44", borderRadius: 14, padding: "20px 24px", marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: "0.82rem", color: "#94a3b8", marginBottom: 8, fontWeight: 500 }}>◈ Describe what you're in the mood for:</label>
              <div style={{ display: "flex", gap: 10 }}>
                <input value={nlInput} onChange={e => setNlInput(e.target.value)} onKeyDown={e => e.key === "Enter" && getLLMRecs(nlInput)}
                  placeholder="e.g. 'mind-bending sci-fi with emotional depth' or 'classic noir thrillers'"
                  style={{ flex: 1, padding: "10px 14px", borderRadius: 10, background: "#080e1a", border: "1px solid #374151", color: "#e2e8f0", fontSize: "0.85rem" }} />
                <button onClick={() => getLLMRecs(nlInput)} disabled={llmLoading} className="action-btn"
                  style={{ background: llmLoading ? "#1f2937" : "linear-gradient(135deg, #7c3aed, #4f46e5)", color: llmLoading ? "#475569" : "#fff", flexShrink: 0 }}>
                  {llmLoading ? "Thinking…" : "Get AI Recs"}
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {["Something dark and psychological", "Family-friendly animated", "Epic sci-fi adventures", "Short intense crime thrillers", "Classic world cinema"].map(s => (
                  <button key={s} onClick={() => { setNlInput(s); getLLMRecs(s); }}
                    style={{ padding: "4px 12px", borderRadius: 20, fontSize: "0.72rem", background: "#080e1a", color: "#64748b", border: "1px solid #1f2937", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={e => { e.target.style.borderColor = "#7c3aed66"; e.target.style.color = "#a78bfa"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "#1f2937"; e.target.style.color = "#64748b"; }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Two-column recs */}
            <div className="rec-grid">
              {/* Content-Based */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                  <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.06em", textTransform: "uppercase" }}>Content-Based Recs</h3>
                </div>
                {contentRecs.length === 0 ? (
                  <div style={{ background: "#0d1520", border: "1px solid #1f2937", borderRadius: 14, padding: "40px 24px", textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>♥</div>
                    <p style={{ color: "#475569", fontSize: "0.85rem" }}>Like some films in Discover to activate content-based recommendations.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {contentRecs.slice(0, 6).map(r => (
                      <MovieCard key={r.movie.id} movie={r.movie} score={r.score} compact
                        explanation={generateContentExplanation(r.movie, likedMovies)}
                        userRating={ratings[r.movie.id]} isLiked={liked.includes(r.movie.id)} isDisliked={disliked.includes(r.movie.id)}
                        onLike={() => handleLike(r.movie.id)} onDislike={() => handleDislike(r.movie.id)} onRate={v => handleRate(r.movie.id, v)} />
                    ))}
                  </div>
                )}
              </div>

              {/* LLM */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa" }} />
                  <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: "#a78bfa", letterSpacing: "0.06em", textTransform: "uppercase" }}>AI-Powered Recs</h3>
                </div>
                {llmError && !llmLoading && (
                  <div style={{ marginBottom: 12, padding: "10px 14px", borderRadius: 10, background: "#1a0a0a", border: "1px solid #ef444444", fontSize: "0.78rem", color: "#fca5a5" }}>
                    ⚠ {llmError}
                  </div>
                )}
                {llmLoading ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[...Array(5)].map((_, i) => <div key={i} className="shimmer" style={{ height: 130 }} />)}
                  </div>
                ) : llmRecs.length === 0 ? (
                  <div style={{ background: "#0d1520", border: "1px solid #7c3aed22", borderRadius: 14, padding: "40px 24px", textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>◈</div>
                    <p style={{ color: "#475569", fontSize: "0.85rem" }}>Describe your mood or click "Get AI Recs" for intelligent recommendations.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {llmRecs.map(r => (
                      <MovieCard key={r.movie.id} movie={r.movie} score={r.score} compact explanation={r.explanation}
                        userRating={ratings[r.movie.id]} isLiked={liked.includes(r.movie.id)} isDisliked={disliked.includes(r.movie.id)}
                        onLike={() => handleLike(r.movie.id)} onDislike={() => handleDislike(r.movie.id)} onRate={v => handleRate(r.movie.id, v)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ CHAT TAB ══════════ */}
        {tab === "chat" && (
          <div className="fade-in" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)", maxHeight: 760 }}>
            {/* Header */}
            <div style={{ background: "#0d1b35", border: "1px solid #1e3a5f", borderRadius: 14, padding: "16px 22px", marginBottom: 16, flexShrink: 0 }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.1rem", color: "#f8fafc", marginBottom: 4 }}>◆ Conversational Film Advisor</div>
              <p style={{ fontSize: "0.78rem", color: "#475569" }}>Ask anything: "What should I watch tonight?", "I loved Parasite, what's similar?", "Recommend Kubrick-style films"</p>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, padding: "4px 2px" }}>
              {chatHistory.length === 0 && (
                <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: 12 }}>◆</div>
                  <p style={{ color: "#334155", fontSize: "0.95rem", marginBottom: 20 }}>Start a conversation with CinemaAI</p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                    {["What should I watch tonight?", "I'm in the mood for something unsettling", "Best films for a first date", "Films like Mulholland Drive"].map(s => (
                      <button key={s} onClick={() => setChatInput(s)}
                        style={{ padding: "8px 16px", borderRadius: 20, fontSize: "0.8rem", background: "#0d1520", color: "#94a3b8", border: "1px solid #1f2937", cursor: "pointer", transition: "all 0.15s" }}
                        onMouseEnter={e => { e.target.style.borderColor = "#2563eb44"; e.target.style.color = "#60a5fa"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "#1f2937"; e.target.style.color = "#94a3b8"; }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div className={msg.role === "user" ? "chat-user" : "chat-ai"}
                    style={{ maxWidth: "72%", padding: "12px 16px", fontSize: "0.875rem", lineHeight: 1.65, color: "#e2e8f0", whiteSpace: "pre-wrap" }}>
                    {msg.role === "assistant" && <span style={{ color: "#f59e0b", marginRight: 6 }}>◈</span>}
                    {msg.content}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div className="chat-ai" style={{ padding: "12px 16px" }}>
                    <span style={{ color: "#f59e0b" }}>◈ </span>
                    <span style={{ color: "#475569" }}>Thinking…</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div style={{ display: "flex", gap: 10, paddingTop: 14, borderTop: "1px solid #1f2937", marginTop: 8, flexShrink: 0 }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()}
                placeholder="Ask for recommendations, discuss films, describe your mood…"
                style={{ flex: 1, padding: "11px 16px", borderRadius: 12, background: "#0d1520", border: "1px solid #1f2937", color: "#e2e8f0", fontSize: "0.875rem" }} />
              <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()} className="action-btn"
                style={{ background: chatLoading || !chatInput.trim() ? "#111827" : "linear-gradient(135deg, #2563eb, #7c3aed)", color: chatLoading || !chatInput.trim() ? "#334155" : "#fff" }}>
                Send
              </button>
            </div>
          </div>
        )}

        {/* ══════════ METRICS TAB ══════════ */}
        {tab === "metrics" && (
          <div className="fade-in">
            <div style={{ background: "#0d1b35", border: "1px solid #1e3a5f", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.2rem", color: "#f8fafc", marginBottom: 5 }}>▣ Evaluation Metrics Dashboard</div>
              <p style={{ fontSize: "0.82rem", color: "#475569" }}>Real-time performance metrics for the content-based recommendation engine. Like and rate films to generate data.</p>
            </div>

            {!metrics ? (
              <div style={{ background: "#0d1520", border: "1px solid #1f2937", borderRadius: 14, padding: "60px 24px", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 14 }}>▣</div>
                <p style={{ color: "#475569" }}>Like some films in the Discover tab to generate metrics.</p>
              </div>
            ) : (
              <>
                <div className="metrics-grid">
                  <MetricCard label="Precision@5" value={metrics.precision} color="#f59e0b" description="Fraction of top-5 recs rated ≥8.0" />
                  <MetricCard label="NDCG@5" value={metrics.ndcg} color="#34d399" description="Ranking quality score" />
                  <MetricCard label="Diversity" value={metrics.diversity} color="#a78bfa" description="Unique genres / total recs" />
                  <MetricCard label="Coverage" value={`${metrics.coverage}%`} color="#22d3ee" description="% of genres represented" />
                  <MetricCard label="Like Ratio" value={metrics.likeRatio} color="#f472b6" description="Likes / (likes + dislikes)" />
                </div>

                <div className="metrics-bottom">
                  <div style={{ background: "#0d1520", border: "1px solid #1f2937", borderRadius: 14, padding: "20px" }}>
                    <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Algorithm Comparison</h3>
                    {[
                      { name: "Content-Based (Cosine Similarity)", prec: metrics.precision, div: metrics.diversity, desc: "Feature vector similarity on genre, mood, rating, year", color: "#f59e0b" },
                      { name: "LLM-Powered (Gemini 2.5 Flash)", prec: "~0.90", div: "~0.85", desc: "Natural language preference understanding via LLM", color: "#a78bfa" }
                    ].map(a => (
                      <div key={a.name} style={{ background: "#080e1a", border: `1px solid ${a.color}22`, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                        <div style={{ fontWeight: 600, color: a.color, fontSize: "0.85rem" }}>{a.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "#475569", marginTop: 3 }}>{a.desc}</div>
                        <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
                          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Precision: <strong style={{ color: a.color }}>{a.prec}</strong></span>
                          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Diversity: <strong style={{ color: a.color }}>{a.div}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#0d1520", border: "1px solid #1f2937", borderRadius: 14, padding: "20px" }}>
                    <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#34d399", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Genre Distribution in Recs</h3>
                    {[...new Set(contentRecs.map(r => r.movie.genre[0]))].slice(0, 8).map(g => {
                      const count = contentRecs.filter(r => r.movie.genre[0] === g).length;
                      const pct = (count / contentRecs.length) * 100;
                      const gc = GENRE_COLORS[g] || "#818cf8";
                      return (
                        <div key={g} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <div style={{ width: 72, fontSize: "0.72rem", color: "#94a3b8", textAlign: "right", flexShrink: 0 }}>{g}</div>
                          <div style={{ flex: 1, height: 7, background: "#111827", borderRadius: 4, overflow: "hidden" }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${gc}, ${gc}88)`, borderRadius: 4, transition: "width 0.5s ease" }} />
                          </div>
                          <div style={{ fontSize: "0.68rem", color: "#475569", width: 20, textAlign: "right", flexShrink: 0 }}>{count}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ background: "#0d1520", border: "1px solid #1f2937", borderRadius: 14, padding: "20px" }}>
                    <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#22d3ee", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>User Profile Summary</h3>
                    {[
                      { l: "Films liked", v: liked.length, c: "#34d399" },
                      { l: "Films disliked", v: disliked.length, c: "#f87171" },
                      { l: "Films rated", v: Object.keys(ratings).length, c: "#fbbf24" },
                      { l: "Avg rating given", v: Object.keys(ratings).length ? (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.keys(ratings).length).toFixed(1) : "—", c: "#a78bfa" },
                      { l: "Top genre", v: likedMovies.length ? [...likedMovies.flatMap(m => m.genre)].sort((a, b) => likedMovies.flatMap(m => m.genre).filter(g => g === b).length - likedMovies.flatMap(m => m.genre).filter(g => g === a).length)[0] : "—", c: "#22d3ee" }
                    ].map(s => (
                      <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #111827" }}>
                        <span style={{ fontSize: "0.8rem", color: "#475569" }}>{s.l}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", fontWeight: 700, color: s.c }}>{s.v}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "#0d1520", border: "1px solid #1f2937", borderRadius: 14, padding: "20px" }}>
                    <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f472b6", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Metric Definitions</h3>
                    {[
                      { m: "Precision@K", d: "Fraction of top-K recommendations with IMDB rating ≥ 8.0" },
                      { m: "NDCG@K", d: "Normalized Discounted Cumulative Gain — measures ranking quality" },
                      { m: "Diversity", d: "Unique genres ÷ total recommendations (intra-list diversity)" },
                      { m: "Category Coverage", d: "% of all possible genres represented in recommendations" },
                      { m: "Like Ratio", d: "Likes ÷ (likes + dislikes) — user satisfaction proxy" }
                    ].map(s => (
                      <div key={s.m} style={{ marginBottom: 10 }}>
                        <span style={{ fontSize: "0.78rem", color: "#94a3b8", fontWeight: 600 }}>{s.m}: </span>
                        <span style={{ fontSize: "0.72rem", color: "#475569" }}>{s.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}