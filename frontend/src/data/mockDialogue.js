export const bobMarleyProfile = {
  name: "Bob Marley",
  years: "1945–1981",
  tagline: "Reggae Pioneer · Cultural Icon · Voice for Peace & Unity",
  intro:
    "Step into Kingston, Jamaica in the late 1970s. Speak with Bob Marley about his music, his Rastafari beliefs, political turmoil in Jamaica, and his mission to unite people through reggae.",
  topics: [
    {
      id: "trench_town",
      title: "Growing Up in Trench Town & The Wailers",
      description: "How poverty, community, and ska shaped his early sound."
    },
    {
      id: "one_love_concert",
      title: "The 1978 One Love Peace Concert",
      description: "Returning to Jamaica after the 1976 shooting to unite rival leaders."
    },
    {
      id: "message_music",
      title: "Rastafari & Music as a Message",
      description: "Why reggae became a global voice for freedom and resilience."
    }
  ]
};

export const dialogueNodes = {
  trench_town: {
    id: "trench_town",
    era: "1960s · Kingston, Jamaica",
    location: "Trench Town Government Yard",
    text: "In Trench Town, we didn't have much material things, you know? We lived in the government yards, sharing one guitar and learning harmonies from Joe Higgs. Music wasn't just entertainment—it was how we survived and told our truth.",
    factUnlocked:
      "Bob Marley moved to Trench Town in Kingston as a teenager and formed The Wailers in 1963 with Peter Tosh and Bunny Wailer.",
    choices: [
      {
        label: "Ask how The Wailers' sound evolved from ska to reggae",
        nextId: "ska_to_reggae"
      },
      {
        label: "Ask how Trench Town influenced songs like 'No Woman, No Cry'",
        nextId: "no_woman_no_cry"
      }
    ]
  },

  one_love_concert: {
    id: "one_love_concert",
    era: "April 1978 · Kingston, Jamaica",
    location: "National Stadium, Kingston",
    text: "People asked why I came back after being shot at Hope Road in '76. Political violence was tearing Jamaica apart. At the One Love Peace Concert, I wanted Michael Manley and Edward Seaga on that stage together—not for politics, but to show the people peace is possible.",
    factUnlocked:
      "On 22 April 1978, Bob Marley famously joined the hands of rival Jamaican political leaders Michael Manley and Edward Seaga on stage.",
    choices: [
      {
        label: "Ask what he felt when bringing both leaders onto the stage",
        nextId: "stage_moment"
      },
      {
        label: "Ask about the 1976 Smile Jamaica concert days after the attack",
        nextId: "smile_jamaica"
      }
    ]
  },

  message_music: {
    id: "message_music",
    era: "1977 · London & Kingston",
    location: "Recording Studio",
    text: "Rastafari taught me to look at history with open eyes—to know yourself and stand up for equal rights and justice. Reggae has a heartbeat rhythm; when people feel that bassline, the message reaches their spirit before their mind even puts up a wall.",
    factUnlocked:
      "Released in 1977, the album 'Exodus' stayed on the British charts for 56 consecutive weeks and was named Album of the Century by Time Magazine.",
    choices: [
      {
        label: "Ask why 'Exodus' became such a turning point worldwide",
        nextId: "exodus_impact"
      },
      {
        label: "Ask what message he hopes future generations carry forward",
        nextId: "legacy_ending"
      }
    ]
  },

  ska_to_reggae: {
    id: "ska_to_reggae",
    era: "Late 1960s · Kingston",
    location: "Studio One & Randy's",
    text: "Ska was fast and full of energy, then rocksteady slowed things down and let the bass breathe. When we teamed up with Lee 'Scratch' Perry and the Barrett brothers, that heavy, hypnotic reggae groove locked into place—music you could both dance to and think deeply about.",
    factUnlocked:
      "Bass player Aston 'Family Man' Barrett and drummer Carlton Barrett joined The Wailers and helped define their signature roots reggae rhythm.",
    choices: [
      {
        label: "Explore how those songs reached audiences beyond Jamaica",
        nextId: "exodus_impact"
      },
      {
        label: "Conclude this conversation path",
        nextId: "legacy_ending"
      }
    ]
  },

  no_woman_no_cry: {
    id: "no_woman_no_cry",
    era: "1974 · Kingston",
    location: "Trench Town",
    text: "When I sing 'No Woman, No Cry', I'm remembering good friends we had and good friends we've lost along the way—cooking cornmeal porridge in the yard and keeping hope alive even when times were hard.",
    factUnlocked:
      "The live recording of 'No Woman, No Cry' at London's Lyceum Theatre in 1975 became Bob Marley's international breakthrough single.",
    choices: [
      {
        label: "Ask about the 1978 One Love Peace Concert back home",
        nextId: "one_love_concert"
      },
      {
        label: "Conclude this conversation path",
        nextId: "legacy_ending"
      }
    ]
  },

  stage_moment: {
    id: "stage_moment",
    era: "April 1978 · National Stadium",
    location: "Kingston, Jamaica",
    text: "It wasn't planned like a politician's speech. The music was playing 'Jamming', the spirit moved, and I called them up. Holding their hands above my head was a symbol for the youth in the garrison communities—that peace has to start with us.",
    factUnlocked:
      "Following the concert, Bob Marley was awarded the United Nations Peace Medal of the Third World in June 1978.",
    choices: [
      {
        label: "Conclude this conversation path",
        nextId: "legacy_ending"
      }
    ]
  },

  smile_jamaica: {
    id: "smile_jamaica",
    era: "December 1976 · National Heroes Park",
    location: "Kingston, Jamaica",
    text: "Two days after gunmen came into my home at 56 Hope Road, I still walked out onto the Smile Jamaica stage. The people who were trying to make this world worse weren't taking a day off—so how could I?",
    factUnlocked:
      "Despite suffering gunshot wounds to his chest and arm on 3 December 1976, Marley performed a 90-minute set at Smile Jamaica two days later.",
    choices: [
      {
        label: "Ask what happened next at the 1978 Peace Concert",
        nextId: "stage_moment"
      },
      {
        label: "Conclude this conversation path",
        nextId: "legacy_ending"
      }
    ]
  },

  exodus_impact: {
    id: "exodus_impact",
    era: "1977 · London",
    location: "Island Records / Basing Street Studios",
    text: "While exiled in London after the shooting, we poured everything into 'Exodus'—love songs, spiritual songs, songs of movement and freedom. Suddenly people from London to Africa to America were singing those words together.",
    factUnlocked:
      "Bob Marley performed at Zimbabwe's official Independence Day celebration in April 1980, fulfilling a long-held dream of playing in a free African nation.",
    choices: [
      {
        label: "Conclude this conversation path",
        nextId: "legacy_ending"
      }
    ]
  },

  legacy_ending: {
    id: "legacy_ending",
    era: "Reflection · 1980",
    location: "Kingston & Worldwide",
    text: "My life is only important if I can help plenty of people. Love the life you live, live the life you love—and remember that one good thing about music: when it hits you, you feel no pain.",
    factUnlocked:
      "Bob Marley was posthumously awarded the Jamaican Order of Merit in 1981 and inducted into the Rock and Roll Hall of Fame in 1994.",
    choices: [],
    isEnding: true
  }
};
