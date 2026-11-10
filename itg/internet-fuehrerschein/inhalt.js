/* Inhalt des Internet-Führerscheins (ITG, Klasse 7).
   Wird vom Spiel (index.html) und von der Lehrkraft-Seite (stunde.html) benutzt.
   Alle Texte sind bewusst einfach gehalten (Basis-ITG). */
window.ITG = {

/* ---------- Teil 1a: Check-in – Wie nutzt du das Netz? (kein Richtig/Falsch) ---------- */
nutzung: [
  { q: "Ich habe schon mal dasselbe Passwort für mehrere Apps benutzt.", risk: "ja",
    info: "Das machen sehr viele. Das Problem: Wird ein Konto geknackt, sind alle anderen auch offen. Dazu bauen wir später ein besseres Passwort." },
  { q: "Ich habe schon mal mein Passwort an jemanden weitergegeben (z. B. Freund oder Freundin).", risk: "ja",
    info: "Unter Freunden fühlt sich das sicher an – nach einem Streit nicht mehr. Passwörter bleiben bei dir." },
  { q: "Mindestens eines meiner Profile ist öffentlich – jeder kann es sehen.", risk: "ja",
    info: "Öffentlich heißt: auch Fremde, Firmen und später Chefs können mitlesen. Schau in den Einstellungen nach: privat ist besser." },
  { q: "Mir hat schon mal jemand Fremdes im Netz geschrieben.", risk: null,
    info: "Das passiert den meisten. Wichtig ist, wie du reagierst: nicht antworten, blockieren, melden." },
  { q: "Ich habe schon mal ein Foto von jemand anderem gepostet oder weitergeschickt, ohne zu fragen.", risk: "ja",
    info: "Jeder Mensch hat ein Recht am eigenen Bild. Fragen kostet 5 Sekunden und erspart Ärger." },
  { q: "Ich habe schon mal auf einen Link geklickt, bei dem ich unsicher war.", risk: "ja",
    info: "Manchmal reicht ein Klick. Wie du gefälschte Nachrichten erkennst, üben wir bei „Phishing“." },
  { q: "Ich lese die Nutzungsbedingungen, bevor ich bei einer App auf „Akzeptieren“ drücke.", risk: "nein",
    info: "Fast niemand tut das. Dort steht aber, welche Daten die App von dir sammeln darf." },
  { q: "Ich habe schon mal etwas im Netz gesehen, das mir Angst gemacht oder mich geekelt hat.", risk: null,
    info: "Dafür musst du dich nicht schämen. Erzähl es jemandem, dem du vertraust – und melde den Inhalt in der App." }
],

/* ---------- Teil 1b: Erlaubt oder nicht? (ja / nein / kommt drauf an) ---------- */
erlaubt: [
  { q: "Du postest ein Foto deiner Mitschülerin im Klassenchat – ohne sie zu fragen.", a: "nein",
    why: "Jeder hat das Recht am eigenen Bild. Fotos von anderen darfst du nur verbreiten, wenn sie einverstanden sind.",
    merk: "Erst fragen, dann posten." },
  { q: "Du filmst eine Schlägerei auf dem Schulhof und schickst das Video rum.", a: "nein",
    why: "Das Opfer wird noch einmal bloßgestellt. Gewaltvideos zu verbreiten kann strafbar sein. Besser: Hilfe holen statt filmen.",
    merk: "Nicht filmen und weiterleiten – Hilfe holen." },
  { q: "Du lädst einen neuen Kinofilm aus einer Tauschbörse herunter.", a: "nein",
    why: "Filme, Musik und Spiele sind urheberrechtlich geschützt. Aus illegalen Quellen drohen Abmahnungen – und oft Viren.",
    merk: "Nur aus offiziellen Quellen laden." },
  { q: "Du hast ein TikTok-Konto, obwohl du erst 11 bist.", a: "nein",
    why: "Die meisten Apps erlauben Konten erst ab 13 Jahren. Das steht in ihren Nutzungsbedingungen.",
    merk: "Mindestalter gilt – meist 13." },
  { q: "Du nennst im Chat mit Fremden nur deinen Spitznamen.", a: "ja",
    why: "Genau richtig: Ein Spitzname verrät nichts über dich. Alter, Wohnort und Schule gehören nicht dazu.",
    merk: "Spitzname statt echtem Namen." },
  { q: "Du machst ein Meme mit einem Foto deines Lehrers und stellst es online.", a: "nein",
    why: "Auch Lehrkräfte haben Persönlichkeitsrechte. Bloßstellen im Netz kann Strafen und Ärger bringen.",
    merk: "Niemanden bloßstellen." },
  { q: "Du schreibst jemandem „Du Opfer, geh weg!“ – „ist doch nur Spaß“.", a: "nein",
    why: "Beleidigung kann eine Straftat sein. Und ob etwas Spaß ist, entscheidet die Person, die es liest.",
    merk: "Im Netz gilt dieselbe Höflichkeit wie draußen." },
  { q: "Du löschst eine Nachricht „Du hast 1000 € gewonnen!“ von einer unbekannten Nummer.", a: "ja",
    why: "Richtig reagiert: nicht antworten, nicht klicken, löschen und blockieren.",
    merk: "Gewinn-Nachricht? Löschen." },
  { q: "Du stellst einen Screenshot aus einem privaten Chat in die Klassengruppe.", a: "nein",
    why: "Private Gespräche gehören den Leuten, die darin schreiben. Ohne Erlaubnis weiterzugeben verletzt das Vertrauen.",
    merk: "Privates bleibt privat." },
  { q: "Du benutzt ein Foto aus dem Internet für dein Referat in der Schule.", a: "kommt",
    why: "Im Unterricht ist das meist okay – gib immer die Quelle an. Wenn du es öffentlich postest, brauchst du ein freies Bild (z. B. von Wikimedia Commons oder Pixabay).",
    merk: "Quelle angeben, freie Bilder nutzen." },
  { q: "Du postest ein Foto von dir selbst.", a: "kommt",
    why: "Dein Foto, deine Entscheidung – aber: Wer kann es sehen? Ist die Schule, dein Wohnort oder ein Standort zu erkennen? Fotos kriegst du kaum wieder aus dem Netz.",
    merk: "Vor dem Posten denken: Wer sieht das? Was verrät es?" },
  { q: "Du meldest einen Kommentar, in dem andere beleidigt werden.", a: "ja",
    why: "Melden ist kein Petzen. Es schützt die Betroffenen und hilft der Plattform, Hass zu löschen.",
    merk: "Hass melden ist richtig." }
],

/* ---------- Teil 2: Stationen ---------- */
stationen: [
  /* 1 ---- Persönliche Daten */
  { id: "daten", icon: "🧾", pflicht: true, titel: "Meine Daten", teaser: "Was darf ins Netz – und was nie?",
    ill: "daten",
    karten: [
      { h: "Daten sind wie Schlüssel", t: "Name, Adresse, Handynummer, Fotos: Das sind persönliche Daten. Wer genug davon hat, kann dich finden, dich nachmachen oder dir etwas verkaufen." },
      { h: "Was einmal drin ist, bleibt", t: "Ein Foto oder ein Kommentar kann kopiert werden. Auch wenn du es später löschst, kann es schon bei anderen gespeichert sein." },
      { h: "Die Ampel-Regel", t: "🟢 Grün: Das darf jeder wissen (Hobby, Lieblingsserie). 🟡 Gelb: Nur Leute, die du auch draußen kennst. 🔴 Rot: Das gehört niemals ins Netz." }
    ],
    merk: "Was ich ins Netz stelle, bleibt im Netz. Rot bleibt geheim.",
    ampel: {
      zonen: [ { id: "g", t: "🟢 Darf jeder sehen" }, { id: "y", t: "🟡 Nur Leute, die ich kenne" }, { id: "r", t: "🔴 Geheim – nie posten" } ],
      items: [
        { t: "Mein Spitzname", z: "g", why: "Ein Spitzname verrät nichts." },
        { t: "Meine Lieblingsserie", z: "g", why: "Das ist ungefährlich." },
        { t: "Mein Hobby", z: "g", why: "Hobbys darfst du erzählen – nur nicht, wann und wo du trainierst." },
        { t: "Mein Vor- und Nachname", z: "y", why: "Der echte Name gehört nur zu Leuten, die du kennst." },
        { t: "Foto von mir", z: "y", why: "Nur für Leute, die du kennst – und möglichst nicht öffentlich." },
        { t: "Mein Alter", z: "y", why: "Fremde müssen dein Alter nicht wissen." },
        { t: "Meine Handynummer", z: "r", why: "Nie öffentlich oder an Fremde." },
        { t: "Meine Adresse", z: "r", why: "Nie ins Netz – so finden dich Fremde." },
        { t: "Mein Passwort", z: "r", why: "Gehört nur dir." },
        { t: "Meine Schule und Klasse", z: "r", why: "Damit wissen Fremde, wo sie dich finden." },
        { t: "Mein Live-Standort", z: "r", why: "Zeigt allen, wo du gerade bist." },
        { t: "„Wir sind 2 Wochen im Urlaub!“", z: "r", why: "Zeigt, dass die Wohnung leer ist. Poste Urlaubsfotos erst danach." }
      ]
    }
  },

  /* 2 ---- Chat */
  { id: "chat", icon: "💬", pflicht: true, titel: "Chat mit Fremden", teaser: "Warnsignale erkennen – und richtig reagieren.",
    ill: "chat",
    karten: [
      { h: "Nicht jeder ist, wer er sagt", t: "Im Netz kann sich jede und jeder ein falsches Foto und Alter ausdenken. Aus „Kevin, 14“ kann ein Erwachsener sein." },
      { h: "Warnsignale", t: "Fremde fragen nach deinem echten Namen, deiner Schule, nach Fotos oder deiner Nummer. Oder sie sagen: „Erzähl es niemandem!“ oder „Wir können uns treffen.“ Dann ist Schluss." },
      { h: "STOPP – BLOCKEN – MELDEN – ERZÄHLEN", t: "1. Stopp: nicht weiter antworten. 2. Blocken. 3. In der App melden. 4. Einer Person erzählen, der du vertraust (Eltern, Lehrkraft, Schulsozialarbeit). Du bekommst keinen Ärger!" }
    ],
    merk: "Fremde bekommen keine echten Daten. Bei Warnsignalen: STOPP – BLOCKEN – MELDEN – ERZÄHLEN.",
    multi: {
      auftrag: "Tippe alle Nachrichten an, die ein Warnsignal oder ein Fehler sind.",
      kopf: "💬 GamerKing_X  ·  Online",
      items: [
        { who: "a", t: "hey, gutes Spiel eben! 🎮", flag: false },
        { who: "b", t: "danke, du auch! 😄", flag: false, du: true },
        { who: "a", t: "wie heißt du eigentlich richtig?", flag: true, why: "Warnsignal: Ein Fremder will deinen echten Namen." },
        { who: "b", t: "ich bin Mia :)", flag: true, du: true, why: "Fehler: Der echte Name gehört nicht in den Chat mit Fremden." },
        { who: "a", t: "cool Mia! wie alt bist du? ich bin 14", flag: true, why: "Warnsignal: Fragen nach dem Alter. Und ob er wirklich 14 ist, weißt du nicht." },
        { who: "b", t: "12, ich geh in die 7. Klasse", flag: true, du: true, why: "Fehler: Alter und Klasse verraten zu viel." },
        { who: "a", t: "welche Schule denn? vielleicht kenn ich wen", flag: true, why: "Warnsignal: Er will wissen, wo du bist." },
        { who: "b", t: "Welches Spiel zockst du noch so?", flag: false, du: true },
        { who: "a", t: "schick mir mal ein Foto, dann weiß ich, wie du aussiehst", flag: true, why: "Warnsignal: Nach Fotos fragen Fremde nicht ohne Grund." },
        { who: "a", t: "und sag deinen Eltern nichts, die verstehen das nicht 😉", flag: true, why: "Großes Warnsignal: Geheimhalten! Genau so läuft es bei Betrügern." },
        { who: "a", t: "wir können uns morgen treffen, ich wohne nicht weit", flag: true, why: "Warnsignal: Fremde wollen sich treffen. Niemals allein hingehen." },
        { who: "a", t: "gib mir deine Nummer, dann schreiben wir auf WhatsApp", flag: true, why: "Warnsignal: Nach der Nummer fragen Fremde, um dich aus dem Chat zu holen." }
      ]
    }
  },

  /* 3 ---- Passwörter */
  { id: "pw", icon: "🔑", pflicht: true, titel: "Passwörter", teaser: "Baue ein starkes Passwort.",
    ill: "pw",
    karten: [
      { h: "Lang schlägt kompliziert", t: "Je länger ein Passwort, desto schwerer ist es zu knacken. Mindestens 12 Zeichen. Ein Satz aus mehreren Wörtern ist stark und leicht zu merken." },
      { h: "Das macht ein Passwort schwach", t: "Namen, Geburtsjahr, „123456“, „qwertz“, „hallo“ und Wörter aus dem Wörterbuch. Auch „P@ssw0rt“ ist schwach – diese Tricks kennt jedes Knack-Programm." },
      { h: "Die Merksatz-Methode", t: "Denk dir einen Satz aus und nimm die Anfangsbuchstaben: „Jeden Morgen esse ich 2 Brötchen mit Nutella und trinke Kakao!“ wird zu JMei2BmNutK!. Oder du schreibst mehrere Wörter mit Strichen: Blau-Elefant-tanzt-im-Regen7." },
      { h: "Die goldenen Regeln", t: "Für jedes Konto ein anderes Passwort. Nie weitergeben – auch nicht an Freunde. Wenn möglich: Zwei-Faktor-Anmeldung (zusätzlicher Code aufs Handy)." }
    ],
    merk: "Lang, einmalig, geheim: ein Satz statt eines Wortes.",
    duell: [
      { a: "hallo123", b: "Mein-Hund-heisst-Bello-7", best: "b", why: "„hallo123“ steht auf jeder Knack-Liste. Das lange Passwort mit mehreren Wörtern ist viel stärker." },
      { a: "Tz7#kP9!qLm2", b: "Lena2012!", best: "a", why: "„Lena2012!“ enthält Name und Jahr – das probieren Angreifer zuerst." },
      { a: "qwertz", b: "Blau-Elefant-tanzt-im-Regen!", best: "b", why: "„qwertz“ sind nur die Tasten nebeneinander. Das lange Passwort braucht ewig zum Knacken." },
      { a: "JMei2BmNutK!", b: "Mia12345", best: "a", why: "JMei2BmNutK! kommt aus einem Merksatz und hat Groß, Klein, Zahl und Zeichen. „Mia12345“ ist Name plus Zahlenreihe." },
      { a: "Ich-esse-gern-3-Pizzen!", b: "P@ssw0rt", best: "a", why: "„P@ssw0rt“ ist nur „Passwort“ mit Tricks – bekannt und schwach. Der Satz ist lang und einzigartig." }
    ]
  },

  /* 4 ---- Phishing */
  { id: "phish", icon: "🎣", pflicht: true, titel: "Phishing & Betrug", teaser: "Echt oder Fake?",
    ill: "phish",
    karten: [
      { h: "Phishing = Angeln nach Daten", t: "Betrüger schicken Nachrichten, die echt aussehen (Paketdienst, Bank, Spiele-Firma, Freunde). Du sollst einen Link anklicken und Daten eingeben. Dann angeln sie dein Konto, dein Passwort oder dein Geld." },
      { h: "Die 5 Warnsignale", t: "1. Zeitdruck („in 24 Stunden gesperrt!“). 2. Seltsamer Absender oder Link. 3. Du sollst Daten oder ein Passwort eingeben. 4. Zu gut, um wahr zu sein (Gewinn!). 5. Komische Sprache oder Rechtschreibung." },
      { h: "Was tun?", t: "Nicht klicken, nicht antworten. Bei Verdacht: selbst die echte Webseite oder App öffnen oder die Person anrufen. Fake-Nachricht löschen und Erwachsenen zeigen." }
    ],
    merk: "Zeitdruck + Link + „gib Daten ein“ = Fake. Nicht klicken.",
    nachrichten: [
      { art: "SMS", von: "unbekannte Nummer", text: "DHL: Ihr Paket konnte nicht zugestellt werden. Bestätigen Sie Ihre Adresse in 24 Std: ", link: "http://dhl-paket-info.top/z", fake: true,
        why: "Warnsignale: unbekannter Absender, Zeitdruck, Link mit komischer Endung „.top“ – das ist nicht DHL." },
      { art: "E-Mail", von: "support@paypa1-sicherheit.com", text: "Dein Konto wird in 24 Stunden gesperrt! Melde dich JETZT an und bestätige deine Daten.", link: "http://paypa1-login.info/anmelden", fake: true,
        why: "Warnsignale: „paypa1“ (mit Ziffer 1) statt PayPal, Zeitdruck, Link zu einer fremden Seite." },
      { art: "IServ-Nachricht", von: "Frau Beispiel (Klassenlehrerin)", text: "Morgen bitte die Sportsachen mitbringen. Gruß, Fr. Beispiel", link: "", fake: false,
        why: "Echt: bekannter Absender in der Schul-Plattform, kein Link, kein Druck, keine Daten gefordert." },
      { art: "Chat", von: "unbekannte Nummer", text: "Hey, ich bin's, dein Cousin Ali, neues Handy! Kannst du mir 20 € als Gutscheinkarte schicken? Ganz dringend!!", link: "", fake: true,
        why: "Warnsignale: neue Nummer, Geld verlangt, „ganz dringend“. Erst bei der echten Person nachfragen!" },
      { art: "Chat", von: "Trainer Murat (Kontakt gespeichert)", text: "Training fällt heute aus, Halle ist gesperrt. Bis Samstag!", link: "", fake: false,
        why: "Echt: bekannter Kontakt, normale Nachricht, nichts wird verlangt." },
      { art: "E-Mail", von: "gewinn@super-preise-24.net", text: "GLÜCKWUNSCH! Du hast ein neues Handy gewonnen! Gib jetzt Adresse und Handynummer ein:", link: "http://super-preise-24.net/gewinn", fake: true,
        why: "Warnsignale: Gewinn ohne Teilnahme, Daten sollen eingegeben werden. Die wollen nur deine Daten und Werbung schicken." }
    ]
  },

  /* 5 ---- Hass & Mobbing (Zusatz) */
  { id: "hass", icon: "🛑", pflicht: false, titel: "Hass im Netz", teaser: "Beleidigung, Hetze – was tue ich?",
    ill: "hass",
    karten: [
      { h: "Meinung oder Hass?", t: "Du darfst anderer Meinung sein und das sagen. Hass beginnt, wenn Menschen beleidigt, bedroht oder wegen ihrer Herkunft, Religion oder Aussehen schlechtgemacht werden." },
      { h: "Das kann strafbar sein", t: "Beleidigung, Bedrohung, Hetze gegen Gruppen und das Verbreiten von Gewaltvideos. „War nur Spaß“ schützt nicht. Auch Mitlachen und Weiterleiten macht dich zum Teil davon." },
      { h: "So hilfst du", t: "Nicht mitmachen. Betroffenen schreiben: „Ich bin bei dir.“ Beweise sichern (Screenshot, nicht weiterschicken). Melden und blockieren. Eine Lehrkraft oder Vertrauensperson informieren." },
      { h: "Hilfe gibt es", t: "Nummer gegen Kummer: 116 111 (kostenlos, anonym). JUUUPORT: Jugendliche helfen Jugendlichen online. Schulsozialarbeit und Vertrauenslehrkräfte an deiner Schule." }
    ],
    merk: "Nicht mitmachen, Beweise sichern, melden, Hilfe holen.",
    reaktion: [
      { sit: "Im Klassenchat schreibt jemand immer wieder „Du Opfer, keiner mag dich“ an eine Mitschülerin. Du siehst es.",
        opts: ["Mitlachen – ist ja nur ein Chat.", "Nichts tun – geht mich nichts an.", "Der Mitschülerin schreiben, dass du da bist, Screenshot sichern und eine Lehrkraft informieren."], best: 2,
        why: "Wer nichts tut oder mitlacht, hilft den Täterinnen und Tätern. Betroffenen helfen und Erwachsene einbeziehen ist richtig." },
      { sit: "Unter einem Video steht: „Alle aus [Land X] sollen verschwinden!“",
        opts: ["Daumen hoch geben.", "Den Kommentar melden und nicht antworten.", "Zurückschimpfen mit Beleidigungen."], best: 1,
        why: "Melden hilft. Zurückschimpfen macht es nur schlimmer und du bist dann auch Teil des Streits." },
      { sit: "Ein Fremder schreibt dir: „Schick mir mal ein Foto von dir.“",
        opts: ["Ein kleines Foto geht schon.", "Blockieren, melden und Eltern oder Lehrkraft Bescheid sagen.", "Antworten: „Wer bist du?“"], best: 1,
        why: "Fremde bekommen keine Fotos. Nicht antworten, blocken, melden, erzählen." },
      { sit: "Jemand hat ein peinliches Bild von dir in eine Gruppe gestellt.",
        opts: ["Selbst ein peinliches Bild von ihm posten.", "Screenshot sichern, Löschen verlangen, melden und Erwachsene einbeziehen.", "Aus der Gruppe gehen und nie darüber sprechen."], best: 1,
        why: "Du hast ein Recht am eigenen Bild. Beweise sichern, melden und Hilfe holen – schweigen hilft nur den Tätern." },
      { sit: "Ein Freund schickt dir eine Hass-Nachricht mit dem Zusatz: „Leite das an 10 Leute weiter!“",
        opts: ["Weiterleiten, dann bin ich aus der Sache raus.", "Nicht weiterleiten, löschen und melden.", "Nur an 2 Leute weiterleiten."], best: 1,
        why: "Kettenbriefe mit Hass nie weiterschicken. Wer weiterleitet, verbreitet den Hass." }
    ]
  },

  /* 6 ---- Wie funktioniert das Internet (Zusatz) */
  { id: "netz", icon: "🌐", pflicht: false, titel: "Wie funktioniert das Internet?", teaser: "Der Weg einer Webseite.",
    ill: "netz",
    karten: [
      { h: "Ein Netz aus Netzen", t: "Das Internet ist kein Ort, sondern ein riesiges Netz aus Computern, Kabeln und Funk. Seiten liegen auf Servern – das sind Computer, die immer an sind." },
      { h: "Adressen und das Telefonbuch", t: "Jedes Gerät hat eine Adresse aus Zahlen (IP-Adresse). Du tippst lieber einen Namen wie wikipedia.org. Der DNS-Server ist das Telefonbuch: Er übersetzt den Namen in die Zahlenadresse." },
      { h: "Daten reisen in Paketen", t: "Eine Seite wird in kleine Pakete zerlegt. Jedes Paket hat eine Nummer und findet über Router seinen Weg. Am Ende setzt dein Browser sie wieder zusammen – wie ein Puzzle." },
      { h: "WLAN ist nicht das Internet", t: "WLAN ist nur die Funkstrecke zwischen deinem Gerät und dem Router. Das Schloss im Browser (https) heißt: Die Verbindung ist verschlüsselt. Es sagt aber nicht, dass die Seite ehrlich ist." }
    ],
    merk: "Name → DNS → Pakete → Server → Pakete zurück → Browser baut die Seite.",
    reihe: [
      { t: "Ich tippe die Adresse in den Browser.", w: "Zum Beispiel wikipedia.org." },
      { t: "Der DNS-Server liefert die Zahlen-Adresse (IP).", w: "Wie ein Telefonbuch: Name rein, Nummer raus." },
      { t: "Meine Anfrage reist in Paketen über Router zum Server.", w: "Die Router suchen den Weg." },
      { t: "Der Server empfängt die Anfrage und sucht die Seite.", w: "Der Server ist ein Computer, der die Seite gespeichert hat." },
      { t: "Der Server schickt die Seite in Paketen zurück.", w: "Die Pakete können verschiedene Wege nehmen." },
      { t: "Mein Browser setzt die Pakete zusammen und zeigt die Seite.", w: "Fertig – das alles dauert oft nur Sekundenbruchteile." }
    ]
  },

  /* 7 ---- Viren (Zusatz) */
  { id: "viren", icon: "🦠", pflicht: false, titel: "Viren, Würmer, Trojaner", teaser: "Schadprogramme und Schutz.",
    ill: "viren",
    karten: [
      { h: "Schadprogramme (Malware)", t: "Das sind Programme, die heimlich Schaden anrichten: Daten stehlen, löschen oder deinen Rechner fernsteuern." },
      { h: "Die Verwandtschaft", t: "Virus: hängt sich an Dateien und verbreitet sich, wenn du sie öffnest. Wurm: verbreitet sich allein übers Netz. Trojaner: tarnt sich als nützliches Programm. Erpresser-Trojaner (Ransomware): sperrt deine Dateien und verlangt Geld." },
      { h: "So schützt du dich", t: "Updates installieren, Virenscanner aktiv lassen, Programme nur aus offiziellen Stores, nichts Unbekanntes öffnen und von wichtigen Dateien ein Backup machen." }
    ],
    merk: "Updates, offizielle Quellen, nichts Unbekanntes öffnen, Backup.",
    match: [
      { b: "Virus", d: "Hängt sich an Dateien und Programme und verbreitet sich, wenn du sie startest." },
      { b: "Wurm", d: "Verbreitet sich ganz allein übers Netzwerk – du musst nichts starten." },
      { b: "Trojaner", d: "Tarnt sich als nützliches Programm oder Spiel, öffnet aber heimlich die Tür." },
      { b: "Ransomware", d: "Sperrt deine Dateien und verlangt Geld für die Freigabe." }
    ],
    multi: {
      auftrag: "Welche Gewohnheiten schützen dich? Tippe alle richtigen an.",
      kopf: "🛡️ Schutz-Checkliste",
      checks: [
        { t: "Updates installieren", flag: true, why: "Updates schließen Sicherheitslücken." },
        { t: "Apps nur aus dem offiziellen Store laden", flag: true, why: "Dort werden Apps geprüft." },
        { t: "Unbekannte Anhänge öffnen", flag: false, why: "Anhänge von Unbekannten können Schadprogramme enthalten." },
        { t: "Virenscanner aktiv lassen", flag: true, why: "Er erkennt viele Schädlinge." },
        { t: "Fremde USB-Sticks einstecken", flag: false, why: "Auf fremden Sticks kann Schadsoftware sein." },
        { t: "Von wichtigen Dateien ein Backup machen", flag: true, why: "Wenn doch etwas passiert, sind deine Dateien gerettet." },
        { t: "Auf jeden „Gratis-Download“-Button klicken", flag: false, why: "Das sind oft Fallen mit Schadprogrammen." }
      ]
    }
  }
],

/* ---------- Teil 3: Abschluss-Quiz (12 von 16 werden gezogen) ---------- */
finale: [
  { q: "Welches Passwort ist am sichersten?", o: ["hallo123", "Lena2012", "Blau-Elefant-tanzt-im-Regen7!", "qwertz"], a: 2, why: "Lang und mehrere Wörter, dazu Zahl und Zeichen." },
  { q: "Wem darfst du dein Passwort verraten?", o: ["Meinem besten Freund", "Niemandem", "Jedem, der freundlich fragt", "Allen in der Klasse"], a: 1, why: "Passwörter gehören nur dir." },
  { q: "Was solltest du Fremden im Chat NICHT sagen?", o: ["Mein Lieblingsspiel", "Meinen Spitznamen", "Meine Schule und meinen Wohnort", "Meine Lieblingsfarbe"], a: 2, why: "Schule und Wohnort verraten, wo du zu finden bist." },
  { q: "Ein Online-Bekannter will sich mit dir treffen. Was tust du?", o: ["Heimlich hingehen", "Eltern informieren und nicht hingehen", "Ein Foto schicken", "Zusagen, wenn er nett ist"], a: 1, why: "Nie allein treffen und immer Erwachsene einbeziehen." },
  { q: "Woran erkennst du Phishing oft?", o: ["Zeitdruck und ein seltsamer Link", "Die Nachricht ist kurz", "Sie kommt von einem Kontakt, den ich kenne", "Sie enthält ein Foto"], a: 0, why: "Druck und fremde Links sind klassische Warnsignale." },
  { q: "Du bekommst „Du hast 1000 € gewonnen – klick hier!“. Was tust du?", o: ["Anklicken", "An Freunde weiterleiten", "Löschen und nicht klicken", "Antworten"], a: 2, why: "Gewinn-Nachrichten sind fast immer Betrug." },
  { q: "Was bedeutet das Schloss (https) im Browser?", o: ["Die Seite ist ehrlich", "Die Verbindung ist verschlüsselt", "Die Seite ist kostenlos", "Die Seite ist vom Staat"], a: 1, why: "Das Schloss schützt den Weg – nicht die Absichten der Seite." },
  { q: "Was macht der DNS-Server?", o: ["Speichert Webseiten", "Übersetzt Namen in IP-Adressen", "Schützt vor Viren", "Macht das WLAN schneller"], a: 1, why: "Er ist das Telefonbuch des Internets." },
  { q: "Wie werden Daten im Internet verschickt?", o: ["Als eine einzige große Datei", "In kleinen Paketen", "Nur per Kabel direkt", "Per Post"], a: 1, why: "Pakete werden unterwegs verteilt und am Ziel zusammengesetzt." },
  { q: "Was ist ein Trojaner?", o: ["Ein Programm, das sich als nützlich tarnt", "Ein schnelles Internet", "Ein Virenscanner", "Ein Spiel"], a: 0, why: "Wie das Pferd von Troja: von außen harmlos." },
  { q: "Wer hat ein Recht am eigenen Bild?", o: ["Nur Promis", "Jede Person", "Nur Erwachsene", "Nur wer bezahlt wird"], a: 1, why: "Jeder Mensch – auch du und deine Mitschüler." },
  { q: "Jemand wird im Klassenchat beleidigt. Was ist am besten?", o: ["Mitlachen", "Nichts tun", "Beweise sichern, Betroffenen helfen, Erwachsene informieren", "Zurückbeleidigen"], a: 2, why: "Hilfe für die Betroffenen und Erwachsene einbeziehen." },
  { q: "Wofür sind Updates wichtig?", o: ["Nur für neue Emojis", "Sie schließen Sicherheitslücken", "Sie machen das WLAN schneller", "Für nichts"], a: 1, why: "Veraltete Programme sind ein offenes Tor für Angreifer." },
  { q: "Ab welchem Alter erlauben die meisten Apps ein eigenes Konto?", o: ["8 Jahre", "10 Jahre", "13 Jahre", "18 Jahre"], a: 2, why: "Meist ab 13 – das steht in den Nutzungsbedingungen." },
  { q: "Was bedeutet STOPP – BLOCKEN – MELDEN – ERZÄHLEN?", o: ["Weiterchatten und beobachten", "Aufhören, blockieren, melden, einer Vertrauensperson erzählen", "Account löschen und schweigen", "Nur ignorieren"], a: 1, why: "Das sind die vier Schritte bei Unwohlsein im Chat." },
  { q: "Welche Info solltest du NICHT öffentlich posten?", o: ["„Wir sind 2 Wochen im Urlaub!“ (live)", "Mein Lieblingslied", "Ein Foto von meinem Hund", "Mein Spitzname"], a: 0, why: "Das zeigt, dass die Wohnung leer ist." }
]

};
