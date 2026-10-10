"""All voice lines for videos 03–17. Lines with 'lang' are separate clips (own TTS call)."""
import json, os
V = {
'03': ["POV: you finally tell a language app the truth.", "It asks why you're learning.", "Honestly? A kitchen internship. In Madrid. In three weeks.",
       "No judgement. Just a quick level test.", "Then: fifty lessons, built for exactly that.", "No cartoon animals. No random sentences.",
       "Your words. Your kitchen. Your Madrid.", "Borderless. Tell it the truth."],
'04': ["English doesn't have a word for these. Honestly? It should.", "Tsundoku. Japanese. Buying books, and never reading them.",
       "Sobremesa. Spanish. Staying at the table long after dinner, just talking.", "Gezellig. Dutch. Warm, cosy, good company. Try translating that.",
       "Saudade. Portuguese. Missing something you might never get back.", "Schadenfreude. German. Enjoying someone else's bad luck. Just a little.",
       "L'esprit de l'escalier. French. The perfect comeback, on the stairs, way too late.", "So. Which one are you?"],
'05': ["Now boarding: your Spanish.", "Your course is your boarding pass.", "Every lesson takes you further.", "Fifty words? Stamp. Two hundred? Stamp.",
       "Your passport fills up as you actually learn.", "Earn miles. Spend them in Duty Free.", "New looks only. Never shortcuts.",
       "The only way to fill this passport, is to learn.", "Your next stamp is waiting."],
'06': ["Where are you flying?", "Japanese. Korean. Swahili. Greek. Hindi. Dutch.", "Seventy-four languages, on one board.", "Pick one. Tell it why.",
       "A short test finds your level.", "Fifty lessons, built for that trip.", "Same airport. Seventy-four different flights.", "Nobody gets the same course.",
       "Borderless. Departures are open."],
'07': ["The five hardest languages for English speakers. According to the US diplomats' own school.", "Five: Arabic.",
       "Written right to left, and letters change shape depending on where they sit.", "Four: Korean.", "The alphabet is easy. The politeness levels are not.",
       "Three: Cantonese. Six tones.", "Say a word a little higher, and it means something else.", "Two: Mandarin. Four tones, and thousands of characters to read.",
       "And number one: Japanese.", "Three writing systems. And you speak differently depending on who you're talking to.",
       "Each one: around two thousand two hundred class hours.", "Hard? Yes. Impossible? No.", "All five are on Borderless."],
'08': ["The five easiest languages for English speakers. Number one is closer than you think.", "Five: Italian. You read it exactly how it's written.",
       "Four: Spanish. Same trick. Plus words you already know.", "Hospital. Chocolate. Idea.", "Three: Swedish. Verbs don't change for I, you, or they.",
       "Two: Norwegian. Same deal, and the word order feels almost English.", "And number one: Dutch.", "One of English's closest relatives. Water. Warm. Appel.",
       "Around six hundred class hours each. That's twenty-four weeks.", "So, what's your excuse?"],
'09': ["Borderless. In twenty seconds.", "One. Tell it why.", "Work. Love. A move. An exam.", "Two. A short test finds your level.",
       "Three. Fifty lessons. For that reason. At that level.", "Seventy-four languages.", "One course. Yours.", "That's the app."],
'11a': ["Guess the language. Three seconds each. Count your points.", "Swedish.", "Polish.", "Turkish.", "Finnish.", "Greek.", "Swahili.",
        "Plot twist: they all mean thank you.", "Six out of six? Comment your score."],
'11b': ["Same game. But now, you only get to listen.", ("Obrigado.", 'pt'), "Portuguese.", ("Grazie mille.", 'it'), "Italian.", ("Danke schön.", 'de'), "German.",
        ("Arigatou gozaimasu.", 'ja'), "Japanese.", ("Merci beaucoup.", 'fr'), "French.", ("Muchas gracias.", 'es'), "Spanish.",
        "Be honest. Was it the language, or my accent?", "Comment your score."],
'12': ["Two people open the same app.", "Left: a kitchen internship in Madrid.", "Right: a first office job in Tokyo.",
       "Her lesson today: explaining the menu. His: making a request.", "Her world: a Spanish town. His: Tokyo streets.",
       "Her passport says Hispanidad. His says Nihon.", "Same app. Not one lesson in common.", "That's Borderless."],
'13': ["Want to sound like you actually live in Spain? Five words.", "Vale. Okay, sure, deal. You'll say it fifty times a day.",
       "Tío. Tía. Literally, uncle and aunt. Actually? Mate.", "Guay. Cool. Say it like g-why.", "Venga. Come on, let's go, and somehow also: bye.",
       "Qué fuerte. No way. That's crazy.", "Use all five in one sentence, and you're basically from Madrid.", "Borderless. The Spanish people actually speak."],
'14': ["Six tongue twisters. Six languages. One British guy. Let's go.", "Spanish.", ("Tres tristes tigres tragaban trigo en un trigal.", 'en'),
       "German.", ("Fischers Fritz fischt frische Fische.", 'en'), "French.", ("Les chaussettes de l'archiduchesse sont-elles sèches?", 'en'),
       "Japanese.", ("Namamugi, namagome, namatamago.", 'en'), "Italian.", ("Trentatré trentini entrarono a Trento.", 'en'),
       "Dutch.", ("De kat krabt de krullen van de trap.", 'en'), "Your turn. Which one broke you?"],
'15': ["Someone drops a joke in the international group chat.", "Spain: jajaja.", "France: mdr. Short for mort de rire. Dying of laughter.",
       "Japan: www. From warau, to laugh.", "Korea: kekeke.", "Thailand: five five five. Because five in Thai sounds like ha.",
       "Brazil: just a wall of k's.", "And English? lol. While not laughing at all."],
'16': ["Your chef texts you. In Spanish.", "You panic.", "You type. Delete. Type. Delete.", "Then you remember yesterday's lesson: can you repeat that?",
       "Me lo repites, por favor?", "Tomorrow morning's shift. Can you cover it?", "Claro. A qué hora?", "Lessons for the conversations you're actually about to have."],
'17': ["You mention your four-hundred-day streak in the group chat.", "Order us a coffee in Spanish, then.", "Un... coffee... por favor?",
       "Four hundred days. For that.", "You go quiet. And switch apps.", "Two weeks later: a voice note.",
       ("Dos cafés con leche, por favor. Y para mí, uno solo.", 'es'), "Wait. Which app is that?", "Borderless."],
}
if __name__ == '__main__':
    out = {}
    for v, lines in V.items():
        os.makedirs(f'/home/claude/kit/v/{v}', exist_ok=True)
        main = [l for l in lines if isinstance(l, str)]
        clips = [(i + 1, l[0], l[1]) for i, l in enumerate(lines) if not isinstance(l, str)]
        out[v] = {'main': ' [pause] '.join(main), 'n_main': len(main), 'clips': clips, 'chars': len(' '.join(main))}
    json.dump(out, open('/home/claude/kit/vo_plan.json', 'w'), indent=1, ensure_ascii=False)
    for v, o in out.items(): print(v, o['n_main'], o['chars'], len(o['clips']))
