export interface Film {
	filmId: string;
	title: string;
	year: number;
	language: string;
	description: string;
	metascore: number;
	rank: number;
}

export const filmsData: Film[] = [
	{
		filmId: 'dekalog',
		title: 'Dekalog',
		year: 1988,
		language: 'Polish',
		description:
			"This masterwork by Krzysztof Kieślowski is one of the twentieth century's greatest achievements in visual storytelling. Originally made for Polish television, Dekalog focuses on the residents of a housing complex in late-Communist Poland, whose lives become subtly intertwined as they face emotional dilemmas that are at once deeply personal and universally human. Its ten hour-long films, drawing from the Ten Commandments for thematic inspiration and an overarching structure, grapple deftly with complex moral and existential questions concerning life, death, love, hate, truth, and the passage of time. Shot by nine different cinematographers, with stirring music by Zbigniew Preisner and compelling performances from established and unknown actors alike, Dekalog arrestingly explores the unknowable forces that shape our lives. Also available are the longer theatrical versions of the series' fifth and sixth films: A Short Film About Killing and A Short Film About Love. [Janus Films]",
		metascore: 100,
		rank: 1,
	},
	{
		filmId: 'boyhood',
		title: 'Boyhood',
		year: 2014,
		language: 'English',
		description:
			"Filmed over 12 years with the same cast, Richard Linklater's Boyhood is a groundbreaking story of growing up as seen through the eyes of a child named Mason (Ellar Coltrane), who literally grows up on screen before our eyes. Starring Ethan Hawke and Patricia Arquette as Mason's parents and newcomer Lorelei Linklater as his sister Samantha, Boyhood charts the rocky terrain of childhood like no other film has before and is both a nostalgic time capsule of the recent past and an ode to growing up and parenting. [IFC Films]",
		metascore: 100,
		rank: 2,
	},
	{
		filmId: 'godfather',
		title: 'The Godfather',
		year: 1972,
		language: 'English',
		description:
			"Francis Ford Coppola's epic features Marlon Brando in his Oscar-winning role as the patriarch of the Corleone family. Director Coppola paints a chilling portrait of the Sicilian clan's rise and near fall from power in America, masterfully balancing the story between the Corleone's family life and the ugly crime business in which they are engaged. Based on Mario Puzo's best-selling novel and featuring career-making performances by Al Pacino, James Caan and Robert Duvall, this searing and brilliant film garnered ten Academy Award nominations, and won three including Best Picture of 1972. [Paramount Pictures]",
		metascore: 100,
		rank: 3,
	},
	{
		filmId: 'colors-red',
		title: 'Three Colors: Red',
		year: 1994,
		language: 'French',
		description:
			'Krzysztof Kieslowski closes his Three Colors trilogy in grand fashion, with an incandescent meditation on fate and chance, starring Irène Jacob as a sweet-souled yet somber runway model in Geneva whose life dramatically intersects with that of a bitter retired judge, played by Jean-Louis Trintignant. Meanwhile, just down the street, a seemingly unrelated story of jealousy and betrayal unfolds. Red is an intimate look at forged connections and a splendid final statement from a remarkable filmmaker at the height of his powers. [Criterion]',
		metascore: 100,
		rank: 4,
	},
	{
		filmId: 'leopard',
		title: 'The Leopard',
		year: 1963,
		language: 'Italian',
		description:
			"Set in Sicily in 1860, Luchino Visconti's spectacular 1963 adaptation of Giuseppe di Lampedusa's international bestseller is one of the cinema's greatest evocations of the past, achingly depicting the passing of an ancient order. (Film Forum)",
		metascore: 100,
		rank: 5,
	},
	{
		filmId: 'lawrence-arabia',
		title: 'Lawrence of Arabia',
		year: 1962,
		language: 'English',
		description:
			"The 40th anniversary re-release of David Lean's 1962 masterpiece, starring Peter O'Toole in one of the most electrifying debuts in film history.",
		metascore: 100,
		rank: 6,
	},
	{
		filmId: 'tokyo-story',
		title: 'Tokyo Story',
		year: 1972,
		language: 'Japanese',
		description:
			"Yasujiro Ozu's Tokyo Story follows an aging couple, Tomi and Sukichi, on their journey from their rural village to visit their two married children in bustling, postwar Tokyo.Their reception is disappointing: too busy to entertain them, their children send them off to a health spa.After Tomi falls ill she and Sukichi return home, while the children, grief- stricken, hasten to be with her.From a simple tale unfolds one of the greatest of all Japanese films.Starring Ozu regulars Chishu Ryu and Setsuko Hara, the film reprises one of the director's favorite themes—that of generational conflict—in a way that is quintessentially Japanese and yet so universal in its appeal that it continues to resonate as one of cinema's greatest masterpieces. (Janus Films)",
		metascore: 100,
		rank: 7,
	},
	{
		filmId: 'casablanca',
		title: 'Casablanca',
		year: 1943,
		language: 'English',
		description:
			'A Casablanca, Morocco casino owner in 1941 shelters his former lover and her husband, a Czechoslovakian freedom fighter, from the Nazis.',
		metascore: 100,
		rank: 8,
	},
	{
		filmId: 'citizen-kane',
		title: 'Citizen Kane',
		year: 1941,
		language: 'English',
		description:
			'Following the death of a publishing tycoon, news reporters scramble to discover the meaning of his final utterance.',
		metascore: 100,
		rank: 9,
	},
	{
		filmId: 'conformist',
		title: 'The Conformist',
		year: 1970,
		language: 'Italian',
		description:
			"Set in Rome in the 1930s, this re-release of Bernardo Bertolucci's 1970 breakthrough feature stars Jean-Louis Trintignant as a Mussolini operative sent to Paris to locate and eliminate an old professor who fled Italy when the fascists came to power.",
		metascore: 100,
		rank: 10,
	},
	{
		filmId: 'rear-window',
		title: 'Rear Window',
		year: 1954,
		language: 'English',
		description:
			'A wheelchair-bound photographer spies on his neighbours from his apartment window and becomes convinced one of them has committed murder.',
		metascore: 100,
		rank: 11,
	},
	{
		filmId: 'vertigo',
		title: 'Vertigo',
		year: 1958,
		language: 'English',
		description:
			'Vertigo creates a dizzying web of mistaken identity, passion and murder after an acrophobic detective rescues a mysterious blonde from the bay. [Universal Pictures]',
		metascore: 100,
		rank: 12,
	},
	{
		filmId: 'notorious',
		title: 'Notorious',
		year: 1946,
		language: 'English',
		description:
			'A woman is asked to spy on a group of Nazi friends in South America. How far will she have to go to ingratiate herself with them?',
		metascore: 100,
		rank: 13,
	},
	{
		filmId: 'fanny-alexander',
		title: 'Fanny and Alexander',
		year: 1982,
		language: 'Swedish',
		description:
			'During the early twentieth century, Fanny and Alexander are the children of the Ekdahl family in a Swedish town. They are living a peaceful life until their father Mr. Oscar dies.',
		metascore: 100,
		rank: 14,
	},
	{
		filmId: 'sing-rain',
		title: "Singin' in the Rain",
		year: 1952,
		language: 'English',
		description:
			'A silent film production company and cast make a difficult transition to sound.',
		metascore: 99,
		rank: 15,
	},
	{
		filmId: 'playtime',
		title: 'Playtime',
		year: 1973,
		language: 'French',
		description:
			"Monsieur Hulot curiously wanders around a high-tech Paris, paralleling a trip with a group of American tourists. Meanwhile, a nightclub/restaurant prepares its opening night, but it's still under construction.",
		metascore: 99,
		rank: 16,
	},
	{
		filmId: 'touch-evil',
		title: 'Touch of Evil',
		year: 1958,
		language: 'English',
		description:
			"This film noir portrait of corruption and morally-compromised obsessions stars Welles as Hank Quinlan, a crooked police chief who frames a Mexican youth as part of an intricate criminal plot. Charlton Heston plays an honorable Mexican narcotics investigator who clashes with the bigoted Quinlan after probing into his dark past. A memorable supporting cast including Janet Leigh as Heston's inquisitive wife, Akim Tamiroff as a seedy underworld leader, Zsa Zsa Gabor and Marlene Dietrich as an enigmatic gypsy complete this fascinating drama engulfed in haunting cinematography and a magnificently eerie score by Henry Mancini.",
		metascore: 99,
		rank: 17,
	},
	{
		filmId: 'army-shadows',
		title: 'Army of Shadows',
		year: 2006,
		language: 'French',
		description:
			"Making its U.S. debut, Jean-Pierre Melville's 1969 Army of Shadows is an intimate epic of the French Resistance in WWII.",
		metascore: 99,
		rank: 18,
	},
	{
		filmId: 'city-lights',
		title: 'City Lights',
		year: 1931,
		language: 'English',
		description:
			'The Tramp (Charlie Chaplin) struggles to help a blind flower girl he has fallen in love with.',
		metascore: 99,
		rank: 19,
	},
	{
		filmId: 'moonlight',
		title: 'Moonlight',
		year: 2016,
		language: 'English',
		description:
			"Moonlight is the tender, heartbreaking story of a young man's struggle to find himself, told across three defining chapters in his life as he experiences the ecstasy, pain, and beauty of falling in love, while grappling with his own sexuality.",
		metascore: 99,
		rank: 20,
	},
	{
		filmId: 'intolerance',
		title: 'Intolerance',
		year: 1916,
		language: 'English',
		description:
			'The story of a poor young woman, separated by prejudice from her husband and baby, is interwoven with tales of intolerance from throughout history.',
		metascore: 99,
		rank: 21,
	},
	{
		filmId: 'rules-game',
		title: 'The Rules of the Game',
		year: 1950,
		language: 'French',
		description:
			'A bourgeois life in France at the onset of World War II, as the rich and their poor servants meet up at a French chateau.',
		metascore: 99,
		rank: 22,
	},
	{
		filmId: 'pinocchio',
		title: 'Pinocchio',
		year: 1940,
		language: 'English',
		description:
			'A living puppet, with the help of a cricket as his conscience, must prove himself worthy to become a real boy.',
		metascore: 99,
		rank: 23,
	},
	{
		filmId: 'seven-samurai',
		title: 'Seven Samurai',
		year: 1956,
		language: 'Japanese',
		description:
			'Seven Samurai (Shichinin no samurai) tells the story of a sixteenth-century village whose desperate inhabitants hire the eponymous warriors to protect them from invading bandits.',
		metascore: 98,
		rank: 24,
	},
	{
		filmId: 'wild-bunch',
		title: 'The Wild Bunch',
		year: 1969,
		language: 'English',
		description:
			'An aging group of outlaws look for one last big score as the "traditional" American West is disappearing around them.',
		metascore: 98,
		rank: 25,
	},
	{
		filmId: 'balthazar',
		title: 'Au hasard Balthazar',
		year: 1966,
		language: 'French',
		description:
			"Robert Bresson's 1966 film focuses on the story of the donkey Balthazar and the people around him.",
		metascore: 98,
		rank: 26,
	},
	{
		filmId: 'lady-vanishes',
		title: 'The Lady Vanishes',
		year: 1938,
		language: 'English',
		description:
			'While traveling in continental Europe, a rich young playgirl realizes that an elderly lady seems to have disappeared from the train.',
		metascore: 98,
		rank: 27,
	},
	{
		filmId: 'pepe-le-moko',
		title: 'Pépé le Moko',
		year: 1937,
		language: 'French',
		description:
			'Pépé le Moko, a notorious gangster, hides in an Algerian citadel for two years to avoid arrest. When he falls in love with a tourist, a local policeman tries to use her to capture him.',
		metascore: 98,
		rank: 28,
	},
	{
		filmId: 'sierra-madre',
		title: 'The Treasure of the Sierra Madre',
		year: 1948,
		language: 'English',
		description:
			'Fred Dobbs and Bob Curtin, two Americans searching for work in Mexico, convince an old prospector to help them mine for gold in the Sierra Madre Mountains.',
		metascore: 98,
		rank: 29,
	},
	{
		filmId: 'pans-labyrinth',
		title: "Pan's Labyrinth",
		year: 2006,
		language: 'Spanish',
		description:
			'Following a bloody civil war, young Ofelia enters a world of unimaginable cruelty when she moves in with her new stepfather, a tyrannical military officer. Armed with only her imagination, Ofelia discovers a mysterious labyrinth and meets a faun who sets her on a path to saving herself and her ailing mother. But soon, the lines between fantasy and reality begin to blur, and before Ofelia can turn back, she finds herself at the center of a ferocious battle between good and evil. [Warner Bros.]',
		metascore: 98,
		rank: 30,
	},
	{
		filmId: 'some-like-hot',
		title: 'Some Like It Hot',
		year: 1959,
		language: 'English',
		description:
			'When two male musicians witness a mob hit, they flee the state in an all-female band disguised as women, but further complications set in.',
		metascore: 98,
		rank: 31,
	},
	{
		filmId: 'north-northwest',
		title: 'North by Northwest',
		year: 1959,
		language: 'English',
		description:
			'A hapless New York advertising executive is mistaken for a government agent by a group of foreign spies, and is pursued across the country while he looks for a way to survive.',
		metascore: 98,
		rank: 32,
	},
	{
		filmId: 'hoop-dreams',
		title: 'Hoop Dreams',
		year: 1994,
		language: 'English',
		description:
			'Two inner-city Chicago boys with hopes of becoming professional basketball players struggle to become college players.',
		metascore: 98,
		rank: 33,
	},
	{
		filmId: 'rashomon',
		title: 'Rashomon',
		year: 1951,
		language: 'Japanese',
		description:
			"The rape of a bride and the murder of her samurai husband are recalled from the perspectives of a bandit, the bride, the samurai's ghost and a woodcutter.",
		metascore: 98,
		rank: 34,
	},
	{
		filmId: 'joan-of-arc',
		title: 'The Passion of Joan of Arc',
		year: 1929,
		language: 'French',
		description:
			"In 1431, Jeanne d'Arc is placed on trial on charges of heresy. The ecclesiastical jurists attempt to force Jeanne to recant her claims of holy visions.",
		metascore: 98,
		rank: 35,
	},
	{
		filmId: 'all-about-eve',
		title: 'All About Eve',
		year: 1950,
		language: 'English',
		description:
			'An ingenue insinuates herself into the company of an established but aging stage actress and her circle of theater friends.',
		metascore: 98,
		rank: 36,
	},
	{
		filmId: 'metropolis',
		title: 'Metropolis',
		year: 1927,
		language: 'German',
		description:
			"Possibly the crowning achievement of silent cinema, Fritz Lang's 1927 blockbuster fuses the frenetic storytelling of twenties pulp fiction with Lang's personal fascination with the darker side of human nature. (Kino International)",
		metascore: 98,
		rank: 37,
	},
	{
		filmId: 'jules-and-jim',
		title: 'Jules and Jim',
		year: 1962,
		language: 'French',
		description:
			'Decades of a love triangle concerning two friends and an impulsive woman.',
		metascore: 97,
		rank: 38,
	},
	{
		filmId: 'my-left-foot',
		title: 'My Left Foot',
		year: 1989,
		language: 'English',
		description:
			'True story of cerebral palsied Christy Brown, who overcame his illness and poverty to become an accomplished artist, poet and writer.',
		metascore: 97,
		rank: 39,
	},
	{
		filmId: 'night-hunter',
		title: 'The Night of the Hunter',
		year: 1955,
		language: 'English',
		description:
			"A traveling preacher's (Robert Mitchum) nefarious motives for marrying a fragile widow (Shelley Winters) are uncovered by her terrified young children.",
		metascore: 97,
		rank: 40,
	},
	{
		filmId: 'ran',
		title: 'Ran',
		year: 1985,
		language: 'Japanese',
		description:
			"An adaptation of William Shakespeare's King Lear, Ran considers the disastrous consequences of Lord Hidetora Ichimonji's (Tatsuya Nakadai) decision to split his kingdom among his three sons.",
		metascore: 97,
		rank: 41,
	},
	{
		filmId: 'gone-wind',
		title: 'Gone with the Wind',
		year: 1940,
		language: 'English',
		description:
			'A Southern belle struggles with the devastation of the Civil War and Reconstruction. This classic won 8 Academy Awards, including Best Picture.',
		metascore: 97,
		rank: 42,
	},
	{
		filmId: 'third-man',
		title: 'The Third Man',
		year: 1949,
		language: 'English',
		description:
			'Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.',
		metascore: 97,
		rank: 43,
	},
	{
		filmId: 'dr-strangelove',
		title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
		year: 1964,
		language: 'English',
		description:
			"Through a series of military and political accidents, a psychotic general - U.S. Air Force Commander Jack D. Ripper (Hayden) - triggers an ingenious, irrevocable scheme to attack Russia's strategic targets with nuclear bombs. The U.S. President (Sellers) and Dr. Strangelove (Sellers), a wheelchair-bound nuclear scientist who has bizarre ideas about man's future, work with the Soviet premier in a desperate effort to save the world.",
		metascore: 97,
		rank: 44,
	},
	{
		filmId: 'quo-vadis-aida',
		title: 'Quo Vadis, Aida?',
		year: 2021,
		language: 'Bosnian',
		description:
			'Bosnia, July 11th 1995. Aida is a translator for the United Nations in the small town of Srebrenica. When the Serbian army takes over the town, her family is among the thousands of citizens looking for shelter in the UN camp. As an insider to the negotiations Aida has access to crucial information that she needs to interpret. What is at the horizon for her family and people - rescue or death? Which move should she take? [Super LTD]',
		metascore: 97,
		rank: 45,
	},
	{
		filmId: 'psycho',
		title: 'Psycho',
		year: 1960,
		language: 'English',
		description:
			"A Phoenix secretary embezzles $40,000 from her employer's client, goes on the run, and checks into a remote motel run by a young man, Norman Bates (Anthony Perkins) under the domination of his mother.",
		metascore: 97,
		rank: 46,
	},
	{
		filmId: 'rififi',
		title: 'Rififi',
		year: 1955,
		language: 'French',
		description:
			'On being betrayed by his girlfriend, Tony takes the route of crime again and proposes an act of burglary to his friends Jo and Mario. Everything goes right until an uncertain event turns the tide.',
		metascore: 97,
		rank: 47,
	},
	{
		filmId: '4-months-3weeks',
		title: '4 Months, 3 Weeks and 2 Days',
		year: 2008,
		language: 'Romanian',
		description:
			"During the final days of communism in Romania, two college roommates Otilia and Gabita are busy preparing for a night away. But rather than planning for a holiday, they are making arrangements for Gabita's illegal abortion and unwittingly, both find themselves burrowing deep down a rabbit hole of unexpected revelations. [IFC Films]",
		metascore: 97,
		rank: 48,
	},
	{
		filmId: 'parasite',
		title: 'Parasite',
		year: 2019,
		language: 'Korean',
		description:
			"Meet the Park Family: the picture of aspirational wealth. And the Kim Family, rich in street smarts but not much else. Be it chance or fate, these two houses are brought together and the Kims sense a golden opportunity. Masterminded by college-aged Ki-woo, the Kim children expediently install themselves as tutor and art therapist, to the Parks. Soon, a symbiotic relationship forms between the two families. The Kims provide 'indispensable' luxury services while the Parks obliviously bankroll their entire household. When a parasitic interloper threatens the Kims' newfound comfort, a savage, underhanded battle for dominance breaks out, threatening to destroy the fragile ecosystem between the Kims and the Parks.",
		metascore: 97,
		rank: 49,
	},
	{
		filmId: 'battleship',
		title: 'Battleship Potemkin',
		year: 1926,
		language: 'Russian',
		description:
			"In the midst of the Russian Revolution of 1905, the crew of the battleship Potemkin mutiny against the brutal, tyrannical regime of the vessel's officers. The resulting street demonstration in Odessa brings on a police massacre.",
		metascore: 97,
		rank: 50,
	},
	{
		filmId: 'streetcar',
		title: 'A Streetcar Named Desire',
		year: 1951,
		language: 'English',
		description:
			'Disturbed Blanche DuBois (Vivien Leigh) moves in with her sister in New Orleans and is tormented by her brutish brother-in-law (Marlon Brando) while her reality crumbles around her.',
		metascore: 97,
		rank: 51,
	},
	{
		filmId: 'maltese-falcon',
		title: 'The Maltese Falcon',
		year: 1941,
		language: 'English',
		description:
			'A private detective (Humphrey Bogart) takes on a case that involves him with three eccentric criminals, a gorgeous liar, and their quest for a priceless statuette.',
		metascore: 97,
		rank: 52,
	},
	{
		filmId: 'american-graf',
		title: 'American Graffiti',
		year: 1973,
		language: 'English',
		description:
			'A couple of high school grads spend one final night cruising the strip with their buddies before they go off to college.',
		metascore: 97,
		rank: 53,
	},
	{
		filmId: '12-angry-men',
		title: '12 Angry Men',
		year: 1957,
		language: 'English',
		description:
			"12 Angry Men, by Sidney Lumet, is a behind-closed-doors look at the American legal system. This iconic adaptation of Reginald Rose's teleplay stars Henry Fonda as the dissenting member on a jury of white men ready to pass judgment on a Puerto Rican teenager charged with murdering his father.The result is a saga of epic proportions that plays out over a tense afternoon in one sweltering room.",
		metascore: 97,
		rank: 54,
	},
	{
		filmId: 'dumbo',
		title: 'Dumbo',
		year: 1941,
		language: 'English',
		description:
			'This simple animated tale is set in a circus and spotlights a baby elephant, Dumbo, who is mocked and ridiculed because his ears are too big, only to be assisted by a mouse to achieve his full potential.',
		metascore: 96,
		rank: 55,
	},
	{
		filmId: 'roma',
		title: 'Roma',
		year: 2018,
		language: 'Spanish',
		description:
			'Roma follows Cleo (Yalitza Aparicio), a young domestic worker for a family in the middle-class neighborhood of Roma in Mexico City. Delivering an artful love letter to the women who raised him, Cuarón draws on his own childhood to create a vivid and emotional portrait of domestic strife and social hierarchy amidst political turmoil of the 1970s.',
		metascore: 96,
		rank: 56,
	},
	{
		filmId: 'movie-camera',
		title: 'Man with a Movie Camera',
		year: 1929,
		language: 'Silent',
		description:
			'A man travels around a city with a camera slung over his shoulder, documenting urban life with dazzling invention.',
		metascore: 96,
		rank: 57,
	},
	{
		filmId: 'spirited-away',
		title: 'Spirited Away',
		year: 2002,
		language: 'Japanese',
		description:
			'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free herself and return her family to the outside world.',
		metascore: 96,
		rank: 58,
	},
	{
		filmId: 'toy-story',
		title: 'Toy Story',
		year: 1995,
		language: 'English',
		description:
			"Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
		metascore: 96,
		rank: 59,
	},
	{
		filmId: 'summer-soul',
		title: 'Summer of Soul (...Or, When the Revolution Could Not Be Televised)',
		year: 2021,
		language: 'English',
		description:
			'In 1969, during the same summer as Woodstock, a different music festival took place 100 miles away. More than 300,000 people attended the summer concert series known as the Harlem Cultural Festival. It was filmed, but after that summer, the footage sat in a basement for 50 years. It has never been seen. Until now.',
		metascore: 96,
		rank: 60,
	},
	{
		filmId: 'shop-corner',
		title: 'The Shop Around the Corner',
		year: 1940,
		language: 'English',
		description:
			"Two employees at a gift shop can barely stand each other, without realizing that they are falling in love through the post as each other's anonymous pen pal.",
		metascore: 96,
		rank: 61,
	},
	{
		filmId: 'rosemarys-baby',
		title: "Rosemary's Baby",
		year: 1968,
		language: 'English',
		description:
			'A young couple move into an apartment, only to be surrounded by peculiar neighbors and occurrences. When the wife becomes mysteriously pregnant, paranoia over the safety of her unborn child begins to control her life.',
		metascore: 96,
		rank: 62,
	},
	{
		filmId: '12-years-slave',
		title: '12 Years a Slave',
		year: 2013,
		language: 'English',
		description:
			'In the pre-Civil War United States, Solomon Northup, a free black man living in upstate New York, is abducted and sold into slavery.',
		metascore: 96,
		rank: 63,
	},
	{
		filmId: 'manchester-sea',
		title: 'Manchester by the Sea',
		year: 2016,
		language: 'English',
		description:
			'After the death of his older brother Joe (Kyle Chandler), Lee Chandler (Casey Affleck) is shocked to learn that Joe has made him sole guardian of his nephew Patrick (Lucas Hedges). Taking leave of his job, Lee reluctantly returns to Manchester-by-the-Sea to care for Patrick, a spirited 15-year-old, and is forced to deal with a past that separated him from his wife Randi (Michelle Williams) and the community where he was born and raised. Bonded by the man who held their family together, Lee and Patrick struggle to adjust to a world without him.',
		metascore: 96,
		rank: 64,
	},
	{
		filmId: 'battle-algiers',
		title: 'The Battle of Algiers',
		year: 2004,
		language: 'Arabic',
		description:
			'The Battle of Algiers re-creates a key year in the tumultuous Algerian struggle for independence from the occupying French in the 1950s. As violence escalates on both sides, children shoot soldiers at point-blank range, women plant bombs in cafés, and French soldiers resort to torture to break the will of the insurgents. Shot on the streets of Algiers in documentary style, the film is a case study in modern warfare, with its terrorist attacks and the brutal techniques used to combat them.',
		metascore: 96,
		rank: 65,
	},
	{
		filmId: 'hard-days-night',
		title: "A Hard Day's Night",
		year: 1964,
		language: 'English',
		description:
			"Meet the Beatles! Just one month after they exploded onto the U.S. scene with their Ed Sullivan Show appearance, John, Paul, George, and Ringo began working on a project that would bring their revolutionary talent to the big screen. A Hard Day's Night, in which the bandmates play cheeky comic versions of themselves, captured the astonishing moment when they officially became the singular, irreverent idols of their generation and changed music forever.",
		metascore: 96,
		rank: 66,
	},
	{
		filmId: 'killer-sheep',
		title: 'Killer of Sheep',
		year: 2007,
		language: 'English',
		description:
			'Killer of Sheep examines the black Los Angeles ghetto of Watts in the mid-1970s through the eyes of Stan, a sensitive dreamer who is growing detached and numb from the psychic toll of working at a slaughterhouse. The film offers no solutions; it merely presents life -- sometimes hauntingly bleak, sometimes filled with transcendent joy and gentle humor.',
		metascore: 96,
		rank: 67,
	},
	{
		filmId: 'nashville',
		title: 'Nashville',
		year: 1975,
		language: 'English',
		description:
			'Over the course of a few hectic days, numerous interrelated people prepare for a political convention as secrets and lies are surfaced and revealed.',
		metascore: 96,
		rank: 68,
	},
	{
		filmId: 'red-river',
		title: 'Red River',
		year: 1948,
		language: 'English',
		description:
			'Dunson leads a cattle drive, the culmination of over 14 years of work, to its destination in Missouri. But his tyrannical behavior along the way causes a mutiny, led by his adopted son.',
		metascore: 96,
		rank: 69,
	},
	{
		filmId: 'philadelphia',
		title: 'The Philadelphia Story',
		year: 1940,
		language: 'English',
		description:
			"When a rich woman's ex-husband (Cary Grant) and a tabloid-type reporter (James Stewart) turn up just before her planned remarriage, she (Katherine Hepburn) begins to learn the truth about herself.",
		metascore: 96,
		rank: 70,
	},
	{
		filmId: 'sansho-bailiff',
		title: 'Sansho the Bailiff',
		year: 1955,
		language: 'Japanese',
		description:
			"When an idealistic governor disobeys the reigning feudal lord, he is cast into exile, his wife and children left to fend for themselves and eventually wrenched apart by vicious slave traders. Under Kenji Mizoguchi's dazzling direction, this classic Japanese story became one of cinema's greatest masterpieces, a monumental, empathetic expression of human resilience in the face of evil.",
		metascore: 96,
		rank: 71,
	},
	{
		filmId: 'ratatouille',
		title: 'Ratatouille',
		year: 2007,
		language: 'English',
		description:
			"Despite his sensational sniffer and sophisticated palate, Remy's dreams of becoming a chef seem hopeless due to one small detail--he's a rat! Through a twist of fate, he ends up in the world-famous restaurant of his late hero, Auguste Gusteau. With a dash of culinary courage and the help of garbage boy Linguini, Remy whips up exquisite meals that impress even the nasty chef Skinner and food critic Anton Ego. Together they conquer the kitchen and prove that big dreams can come true no matter how small you are.",
		metascore: 96,
		rank: 72,
	},
	{
		filmId: 'grapes-wrath',
		title: 'The Grapes of Wrath',
		year: 1940,
		language: 'English',
		description:
			'A poor Midwest family is forced off their land. They travel to California, suffering the misfortunes of the homeless in the Great Depression.',
		metascore: 96,
		rank: 73,
	},
	{
		filmId: 'snow-white',
		title: 'Snow White and the Seven Dwarfs',
		year: 1938,
		language: 'English',
		description:
			'Exiled into the dangerous forest by her wicked stepmother, a princess is rescued by seven dwarf miners who make her part of their household.',
		metascore: 96,
		rank: 74,
	},
	{
		filmId: 'children-parad',
		title: 'Children of Paradise',
		year: 1945,
		language: 'French',
		description:
			'Children of Paradise is the tale of a woman loved by four different men. Deftly entwining theater, literature, music, and design, director Marcel Carné and screenwriter Jacques Prévert resurrect the tumultuous world of nineteenth-century Paris, teeming with hucksters and aristocrats, thieves and courtesans, pimps and seers.',
		metascore: 96,
		rank: 75,
	},
	{
		filmId: 'mean-streets',
		title: 'Mean Streets',
		year: 1973,
		language: 'English',
		description:
			"Charlie (Harvey Keitel) is working his way up the ranks of a local mob. Teresa (Amy Robinson) is the girlfriend his family deems unsuitable because of her epilepsy. Johnny Boy (Robert De Niro) is a small-time gambler in big-time debt to loan sharks. This is a story Martin Scorsese lived, a semi-biographical tale of the first-generation sons and daughters of New York's Little Italy.",
		metascore: 96,
		rank: 76,
	},
	{
		filmId: 'lady-eve',
		title: 'The Lady Eve',
		year: 1941,
		language: 'English',
		description:
			'A trio of classy card sharks targets the socially awkward heir to brewery millions for his money, until one of them falls in love with him.',
		metascore: 96,
		rank: 77,
	},
	{
		filmId: 'gravity',
		title: 'Gravity',
		year: 2013,
		language: 'English',
		description:
			'Dr. Ryan Stone (Sandra Bullock) is a brilliant medical engineer on her first shuttle mission, with veteran astronaut Matt Kowalsky (George Clooney) in command of his last flight before retiring. But on a seemingly routine spacewalk, disaster strikes. The shuttle is destroyed, leaving Stone and Kowalsky completely alone - tethered to nothing but each other and spiraling out into the blackness. The deafening silence tells them they have lost any link to Earth - and any chance for rescue. As fear turns to panic, every gulp of air eats away at what little oxygen is left. But the only way home may be to go further out into the terrifying expanse of space.',
		metascore: 96,
		rank: 78,
	},
	{
		filmId: 'fantasia',
		title: 'Fantasia',
		year: 1940,
		language: 'English',
		description:
			'A collection of animated interpretations of great works of Western classical music.',
		metascore: 96,
		rank: 79,
	},
	{
		filmId: 'beauty-beast',
		title: 'Beauty and the Beast',
		year: 1991,
		language: 'English',
		description:
			"This 'tale as old as time' follows the adventures of Belle, a bright young woman who finds herself imprisoned in a castle of a mysterious beast. With the assistance of the castle's enchanted staff, a delightful and tender romance develops between these two unlikely friends and Belle soon learns the most important lesson of all - that true beauty comes from within.",
		metascore: 95,
		rank: 80,
	},
	{
		filmId: 'lovers-rock',
		title: 'Small Axe: Lovers Rock',
		year: 2020,
		language: 'English',
		description:
			'A single evening at a house party in 1980s West London sets the scene, developing intertwined relationships against a background of violence, romance and music.',
		metascore: 95,
		rank: 81,
	},
	{
		filmId: 'frankenstein',
		title: 'The Bride of Frankenstein',
		year: 1935,
		language: 'English',
		description:
			'Mary Shelley reveals the main characters of her novel survived: Dr. Frankenstein, goaded by an even madder scientist, builds his monster a mate.',
		metascore: 95,
		rank: 82,
	},
	{
		filmId: 'dont-look-now',
		title: "Don't Look Now",
		year: 1973,
		language: 'English',
		description:
			'A married couple grieving the recent death of their young daughter are in Venice when they encounter two elderly sisters, one of whom is psychic and brings a warning from beyond.',
		metascore: 95,
		rank: 83,
	},
	{
		filmId: 'social-network',
		title: 'The Social Network',
		year: 2010,
		language: 'English',
		description:
			'On a fall night in 2003, Harvard undergrad and computer programming genius Mark Zuckerberg (Jesse Eisenberg) sits down at his computer and heatedly begins working on a new idea. In a fury of blogging and programming, what begins in his dorm room soon becomes a global social network and a revolution in communication. A mere six years and 500 million friends later, Mark Zuckerberg is the youngest billionaire in history... but for this entrepreneur, success leads to both personal and legal complications.',
		metascore: 95,
		rank: 84,
	},
	{
		filmId: 'end-of-world',
		title: 'Do Not Expect Too Much From the End of the World',
		year: 2024,
		language: 'Romanian',
		description:
			'An overworked and underpaid production assistant must drive around the city of Bucharest to film the casting for a workplace safety video commissioned by a multinational company. When one of her interviewees makes a statement that ignites a scandal she is forced to re-invent the whole story.',
		metascore: 95,
		rank: 85,
	},
	{
		filmId: 'my-fair-lady',
		title: 'My Fair Lady',
		year: 1964,
		language: 'English',
		description:
			'A snobbish phonetics professor agrees to a wager that he can take a flower girl and make her presentable in high society.',
		metascore: 95,
		rank: 86,
	},
	{
		filmId: 'lady-on-fire',
		title: 'Portrait of a Lady on Fire',
		year: 2019,
		language: 'French',
		description:
			"France, 1760. Marianne is commissioned to paint the wedding portrait of Héloïse, a young woman who has just left the convent. Because she is a reluctant bride-to-be, Marianne arrives under the guise of companionship, observing Héloïse by day and secretly painting her by firelight at night. As the two women orbit one another, intimacy and attraction grow as they share Héloïse's first moments of freedom. Héloïse's portrait soon becomes a collaborative act of and testament to their love.",
		metascore: 95,
		rank: 87,
	},
	{
		filmId: 'not-your-negro',
		title: 'I Am Not Your Negro',
		year: 2016,
		language: 'English',
		description:
			"Director Raoul Peck envisions the book James Baldwin never finished - a radical narration about race in America, using the writer's original words.He draws upon James Baldwin's notes on the lives and assassinations of Medgar Evers, Malcolm X, and Martin Luther King Jr to explore and bring a fresh and radical perspective to the current racial narrative in America.",
		metascore: 95,
		rank: 88,
	},
	{
		filmId: 'woodstock',
		title: 'Woodstock',
		year: 1970,
		language: 'English',
		description:
			"It happened on a small farm in upstate New York, for three remarkable days of mud and happiness in 1969, when over half a million people came together to celebrate life, love, and music--Woodstock. One camera crew was there, in the middle of everything, recording the live performances of many of the greatest singers and musicians of the era, and the joy, peace and rock 'n' roll experienced by hundreds of thousands.",
		metascore: 95,
		rank: 89,
	},
	{
		filmId: 'aftersun',
		title: 'Aftersun',
		year: 2022,
		language: 'English',
		description:
			"Sophie reflects on the shared joy and private melancholy of a holiday she took with her father twenty years earlier. Memories real and imagined fill the gaps between miniDV footage as she tries to reconcile the father she knew with the man she didn't.",
		metascore: 95,
		rank: 90,
	},
	{
		filmId: 'rocks',
		title: 'Rocks',
		year: 2021,
		language: 'English',
		description:
			'A teenage girl suddenly finds herself struggling to take care of herself and her younger brother.',
		metascore: 95,
		rank: 91,
	},
	{
		filmId: 'amour',
		title: 'Amour',
		year: 2012,
		language: 'French',
		description:
			"Georges and Anne are in their eighties. They are cultivated, retired music teachers. Their daughter, who is also a musician, lives abroad with her family. One day, Anne has an attack. The couple's bond of love is severely tested.",
		metascore: 95,
		rank: 92,
	},
	{
		filmId: 'hurt-locker',
		title: 'The Hurt Locker',
		year: 2009,
		language: 'English',
		description:
			"When a new sergeant, James (Jeremy Renner), takes over a highly trained bomb disposal team amidst violent conflict, he surprises his two subordinates, Sanborn (Anthony Mackie) and Eldridge (Brian Geraghty), by recklessly plunging them into a deadly game of urban combat. James behaves as if he's indifferent to death. As the men struggle to control their wild new leader, the city explodes into chaos, and James' true character reveals itself in a way that will change each man forever.",
		metascore: 95,
		rank: 93,
	},
	{
		filmId: 'anatomy-murder',
		title: 'Anatomy of a Murder',
		year: 1959,
		language: 'English',
		description:
			'In a murder trial, the defendant says he suffered temporary insanity after the victim raped his wife. What is the truth, and will he win his case?',
		metascore: 95,
		rank: 94,
	},
	{
		filmId: 'pulp-fiction',
		title: 'Pulp Fiction',
		year: 1994,
		language: 'English',
		description:
			'Several inter-locking stories of crime and intrigue form a temporal mosaic set in the Los Angeles underworld.',
		metascore: 95,
		rank: 95,
	},
	{
		filmId: 'zero-dark',
		title: 'Zero Dark Thirty',
		year: 2012,
		language: 'English',
		description:
			'For a decade, an elite team of intelligence and military operatives, working in secret across the globe, devoted themselves to a single goal: to find and eliminate Osama bin Laden.',
		metascore: 95,
		rank: 96,
	},
	{
		filmId: 'collective',
		title: 'Collective',
		year: 2020,
		language: 'Romanian',
		description:
			'Collective follows a heroic team of journalists as they uncover shocking, widespread corruption. After a deadly nightclub fire, the mysterious death of the owner of a powerful pharmaceutical firm, and the quiet resignation of a health minister—seemingly unrelated events, all within weeks of each other—the team of intrepid reporters exposes a much larger, much more explosive political scandal. COLLECTIVE is a fast-paced, real-time detective story about truth, accountability, and the value of an independent press in partisan times.',
		metascore: 95,
		rank: 97,
	},
	{
		filmId: 'separation',
		title: 'A Separation',
		year: 2011,
		language: 'Persian',
		description:
			"Set in contemporary Iran, A Separation is a compelling drama about the dissolution of a marriage. Simin wants to leave Iran with her husband Nader and daughter Termeh. Simin sues for divorce when Nader refuses to leave behind his Alzheimer-suffering father. Her request having failed, Simin returns to her parents' home, but Termeh decides to stay with Nader. When Nader hires a young woman to assist with his father in his wife's absence, he hopes that his life will return to a normal state. However, when he discovers that the new maid has been lying to him, he realizes that there is more on the line than just his marriage.",
		metascore: 95,
		rank: 98,
	},
	{
		filmId: 'double-indem',
		title: 'Double Indemnity',
		year: 1944,
		language: 'English',
		description:
			"An insurance representative lets himself be talked into a murder/insurance fraud scheme that arouses an insurance investigator's suspicions.",
		metascore: 95,
		rank: 99,
	},
	{
		filmId: 'sunrise',
		title: 'Sunrise',
		year: 1927,
		language: 'English',
		description:
			'A sophisticated urban woman seduces a farmer in the hopes that he will murder his neglected wife and join her in the city, but he ends up rekindling his romance with his wife when she discovers their scheme.',
		metascore: 95,
		rank: 100,
	},
];
