export type ChallengeType =
  | "dom-hidden"
  | "attribute"
  | "code"
  | "meta"
  | "title-flash"
  | "cookie"
  | "localstorage"
  | "sessionstorage"
  | "console"
  | "network"
  | "urlparam"
  | "zerowidth"
  | "css-ghost"
  | "external"
  | "logic";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Challenge {
  id: string;
  category: string;
  difficulty: Difficulty;
  points: number;
  title: string;
  description: string;
  type: ChallengeType;
  payload?: string;
  hint: string;
  flagHash: string;
}

// All flags are validated client-side via SHA-256 hash comparison only.
// No plaintext flag is ever embedded anywhere in this file or the built bundle.
export const CHALLENGES: Challenge[] = [
  {
    id: "ctf-01",
    category: "Web",
    difficulty: "Easy",
    points: 100,
    title: "Select All Reveals All",
    description:
      "Somewhere in this card's text is content that isn't meant to be read normally. It's there in the DOM, it's just not meant for eyes.",
    type: "dom-hidden",
    payload: "FLAG{s3l3ct_4ll_r3v34ls_4ll}",
    hint: "Try selecting all the text in this card (Ctrl+A then copy), or just open DevTools and read the DOM.",
    flagHash: "84079ccb120de33c352ac6de060d90044269d53f31dd0258092689ea22b9dd56",
  },
  {
    id: "ctf-02",
    category: "Web",
    difficulty: "Medium",
    points: 200,
    title: "Attribute Hide and Seek",
    description:
      "The card below looks like a plain status widget. Elements can carry more than what's rendered on screen.",
    type: "attribute",
    payload: "RkxBR3s0dHRyMWJ1dDNfaDFkM180bmRfczMza30=",
    hint: "Inspect the widget element in DevTools and look at its attributes, not its text.",
    flagHash: "a2fa6cfcc513948e45345c675e5f219df3ae38ec699a79d54bb7f471385929c4",
  },
  {
    id: "ctf-03",
    category: "Web",
    difficulty: "Medium",
    points: 200,
    title: "Meta Data Knows All",
    description:
      "This entire page ships one extra <meta> tag in its <head> that isn't used for SEO or social previews.",
    type: "meta",
    hint: "View page source or check document.head in DevTools for a meta tag named x-ctf-03.",
    flagHash: "c1909bb84eacf0912b722001b9ebe397396fbf5b7e79cdd8ba29f92767e4ee4f",
  },
  {
    id: "ctf-04",
    category: "Web",
    difficulty: "Medium",
    points: 200,
    title: "Title Flicker",
    description:
      "Watch the browser tab title very closely. For a moment, right after this loads, it isn't what you'd expect.",
    type: "title-flash",
    payload: "RkxBR3t0MXRsM19mbDFjazNyX2M0dWdodF95MHV9",
    hint: "Use the replay button and keep your eyes on the browser tab. The flashed text is base64.",
    flagHash: "c3d1be68c148394fa70f014a1d25f986048e2a6772510f57a0dc49850bb3c7de",
  },
  {
    id: "ctf-05",
    category: "Crypto",
    difficulty: "Easy",
    points: 100,
    title: "Caesar's Whisper",
    description: "A classic rotation cipher. Everyone's first cipher, everyone's easiest break.",
    type: "code",
    payload: "SYNT{pnrfne_arire_yrneaf}",
    hint: "ROT13. Yes, really.",
    flagHash: "ae0dd8614720d6acd3c911adaa9e1bf82c165681d386389280d5665974306d5b",
  },
  {
    id: "ctf-06",
    category: "Crypto",
    difficulty: "Easy",
    points: 100,
    title: "Hex Dump",
    description: "Just bytes, written out in base 16.",
    type: "code",
    payload: "464c41477b64656164626565665f69735f636c61737369637d",
    hint: "Each pair of hex digits is one ASCII character.",
    flagHash: "ad8ff9c1e156a5bd7136c7264727c673be449528516d3c0953a931f778ed03a7",
  },
  {
    id: "ctf-07",
    category: "Crypto",
    difficulty: "Easy",
    points: 100,
    title: "Bits and Bytes",
    description: "Eight bits at a time.",
    type: "code",
    payload:
      "01000110 01001100 01000001 01000111 01111011 01100010 01101001 01110100 01110011 01011111 01100001 01101110 01100100 01011111 01100010 01111001 01110100 01100101 01110011 01111101",
    hint: "Binary to ASCII, one 8-bit group per character.",
    flagHash: "732f8385495bdc169953f332ca3196d5845020ed7dfe23bbba08cbcf096eb8d3",
  },
  {
    id: "ctf-08",
    category: "Crypto",
    difficulty: "Medium",
    points: 200,
    title: "Mirror Mirror",
    description: "A cipher old enough to appear in the Hebrew alphabet. A becomes Z, B becomes Y...",
    type: "code",
    payload: "UOZT{nriili_nriili_abc}",
    hint: "Atbash cipher. It's its own inverse - decode it the same way you'd encode it.",
    flagHash: "4f973788d62c9213cc1449eb60cfaa0e6724c128655e13720f19a27b2ba0e3a5",
  },
  {
    id: "ctf-09",
    category: "Crypto",
    difficulty: "Medium",
    points: 200,
    title: "XOR Marks the Spot",
    description: "One byte, repeated, XORed against the flag, then hex-encoded.",
    type: "code",
    payload: "363c31370b081f022f1b15092f0711032f000d",
    hint: "Single-byte XOR key. Only 256 possibilities - brute force it, or guess: it's a lowercase letter that appears in the word \"password\".",
    flagHash: "2a88e276b4847061854063b3365d189b4c7b70e0a4e904399d70dec1b14b4a46",
  },
  {
    id: "ctf-10",
    category: "Forensics",
    difficulty: "Easy",
    points: 100,
    title: "Cookie Jar",
    description: "This page quietly sets a cookie the moment it loads. Nobody reads their cookies anymore.",
    type: "cookie",
    payload: "RkxBR3tjMDBrMTNfajRyX3I0MWQzZH0=",
    hint: "DevTools -> Application -> Cookies -> look for one named debug_session. It's base64.",
    flagHash: "a9a02cdc990ebaf18dac87f06a6787867c399aafb9cac3dc6c950361568c8089",
  },
  {
    id: "ctf-11",
    category: "Forensics",
    difficulty: "Easy",
    points: 100,
    title: "Local Storage Leak",
    description: "A debug token gets written to this browser's local storage on page load.",
    type: "localstorage",
    payload: "RkxBR3tsMGM0bF9zdDByNGczX2wzNGszZH0=",
    hint: "DevTools -> Application -> Local Storage -> localhost / parth2003.in -> key debug_token. Base64.",
    flagHash: "c2931e28912869aeab4ea10d54cf028c48061e9f193cdcd84ec248511c179b57",
  },
  {
    id: "ctf-12",
    category: "Forensics",
    difficulty: "Medium",
    points: 200,
    title: "Session Ghost",
    description: "Session storage is cleared when the tab closes. Until then, it's evidence.",
    type: "sessionstorage",
    payload: "464c41477b7333737331306e5f67683073745f6334756768747d",
    hint: "DevTools -> Application -> Session Storage -> key session_debug. Hex-encoded.",
    flagHash: "0d710fa5b41e62379cf26873c960736ce0cae75f41ce783989a5b2d769666441",
  },
  {
    id: "ctf-13",
    category: "Reversing",
    difficulty: "Medium",
    points: 200,
    title: "Console Whisper",
    description: "Open your console. This page talks when it thinks nobody's reading.",
    type: "console",
    payload: "RkxBR3tjMG5zMGwzX3doMXNwM3JfaDM0cmR9",
    hint: "F12 -> Console tab. Look for a line prefixed [intel]. It's base64.",
    flagHash: "ecf68c59bdc91ab8f7091b0ef0e416d2c253e207b131aa80c675b8257c4cd404",
  },
  {
    id: "ctf-14",
    category: "Reversing",
    difficulty: "Hard",
    points: 350,
    title: "Function Factory",
    description:
      "Every byte of the flag was XORed against the single byte 0x2A, then hex-encoded. That's the whole algorithm - now reverse it.",
    type: "code",
    payload: "6c666b6d514b464d1a754e195949581b48194e75441a5e75421b4e4e194457",
    hint: "hex-decode to bytes, XOR each byte with 0x2A, then read as ASCII.",
    flagHash: "5ba2570d6da0f01669cb03fdb4eaa53970b4d421588cb302598889f855fe17d1",
  },
  {
    id: "ctf-15",
    category: "Reversing",
    difficulty: "Hard",
    points: 350,
    title: "Layers Upon Layers",
    description: "This one was encoded twice. Peel it like an onion.",
    type: "code",
    payload: "NDY0YzQxNDc3YjZjMzQ3OTMzNzI3MzVmNzU3MDMwNmU1ZjZjMzQ3OTMzNzI3Mzdk",
    hint: "Base64-decode first. What you get back is still encoded - hex-decode that next.",
    flagHash: "762fe8eab0c32b615054a8a49baa320d4ef833b0e374f9cdcb4d2e40ad6e80e2",
  },
  {
    id: "ctf-16",
    category: "OSINT",
    difficulty: "Hard",
    points: 350,
    title: "Read the Room",
    description:
      "No encoding this time. Combine two facts from elsewhere on this site: the numeric rank from this page's best CTF placement, and the name (no spaces) of the security tool listed as a Minor Project on the Projects page. Format: FLAG{rank_ProjectName}",
    type: "logic",
    hint: "Best rank is shown in the stats strip above. The minor project is a cryptography + steganography tool - its title with spaces removed.",
    flagHash: "5f69063f3a0cbe4d2e03e05f0ef2a449382c158f8643bb49fdc9b7c7a9c88ae8",
  },
  {
    id: "ctf-17",
    category: "OSINT",
    difficulty: "Medium",
    points: 200,
    title: "Robots Don't Lie",
    description: "Not every file on this site is meant for people. Some are meant for crawlers - and crawlers read everything.",
    type: "external",
    hint: "Visit /robots.txt for this site and read every line, including the comments at the bottom. Base64.",
    flagHash: "02f5e4f97936b128ae792be8e53f0cdc56e299a5252c3cf3b953feee1d605761",
  },
  {
    id: "ctf-18",
    category: "Recon",
    difficulty: "Medium",
    points: 200,
    title: "Fetch the Intel",
    description: "This page silently fetches a small JSON file in the background the moment it loads.",
    type: "network",
    hint: "DevTools -> Network tab, filter for .json - or just visit /ctf-data/intel.json directly. One key in it isn't noise.",
    flagHash: "11183e4ee7db864e3f5681b43b4f573c2739b686cc3523f74042a725e38bf89c",
  },
  {
    id: "ctf-19",
    category: "Recon",
    difficulty: "Hard",
    points: 350,
    title: "Sitemap Secrets",
    description: "Search engines aren't the only ones who read sitemaps closely.",
    type: "external",
    hint: "Visit /sitemap.xml and check for an XML comment. It's hex.",
    flagHash: "bac3c60b90dc021506653e624b555655c53f1bb190e41efe56a44b3da8577256",
  },
  {
    id: "ctf-20",
    category: "Recon",
    difficulty: "Medium",
    points: 200,
    title: "Query Whisperer",
    description: "This card is locked. Some intel only surfaces for the right query string in the URL.",
    type: "urlparam",
    payload: "RkxBR3txdTNyeV93aDFzcDNyM3JfZjB1bmR9",
    hint: "Try adding ?ctf20=reveal to this page's URL and reload.",
    flagHash: "91e8a9bee577d01429463b4e7632243ee567b5926902220ea0e6ea73565f157e",
  },
  {
    id: "ctf-21",
    category: "Misc",
    difficulty: "Easy",
    points: 100,
    title: "Math Gate",
    description:
      "Take the ASCII decimal code of the character '!'. XOR it with 5. Submit the result as FLAG{result}.",
    type: "logic",
    hint: "'!' is ASCII 33. 33 XOR 5 = ?",
    flagHash: "3e55a8932c234eecf80fc05dc598288b50f94460b00af6e991d8725af43063c2",
  },
  {
    id: "ctf-22",
    category: "Misc",
    difficulty: "Medium",
    points: 200,
    title: "Sequence Sense",
    description: "2, 3, 5, 8, 13, ? - each term is the sum of the previous two. Submit the next number as FLAG{n}.",
    type: "logic",
    hint: "8 + 13 = ?",
    flagHash: "046f81a5aaf7014157a933ac979279c0f9612265c2b69101cdbd426278639304",
  },
  {
    id: "ctf-23",
    category: "Misc",
    difficulty: "Hard",
    points: 350,
    title: "Riddle of the Wire",
    description:
      "I sit between two parties who think they're speaking directly to each other. I can read, alter, or drop everything that passes through me, and neither side notices unless they check my certificate. Submit my name as FLAG{my_name_with_underscores}.",
    type: "logic",
    hint: "Three words. A classic network attack class, not a specific tool.",
    flagHash: "411c9824975c167aa2b90df6623ed5b4240b3d8f2fc287aaaf621084a1056df4",
  },
  {
    id: "ctf-24",
    category: "Stego",
    difficulty: "Medium",
    points: 200,
    title: "Invisible Ink",
    description: "The sentence below looks completely normal. It isn't.",
    type: "zerowidth",
    payload: "Security​‌​​​‌‌​​‌​​‌‌​​​‌​​​​​‌​‌​​​‌‌‌​‌‌‌‌​‌‌​‌‌​‌​​‌​‌‌​‌‌‌​​‌‌‌​‌‌​​​‌‌​​​‌​‌‌‌​​‌‌​​‌‌​​​‌​‌‌​​​‌​​‌‌​‌‌​​​​‌‌​​‌‌​‌​‌‌‌‌‌​​‌‌​​​‌​‌‌​‌‌‌​​‌‌​‌​‌‌​‌‌‌‌‌​‌ is a process, not a product you buy once.",
    hint: "Zero-width characters are hidden between the first two words. U+200B = bit 0, U+200C = bit 1. Extract them in order, group into bytes, decode as UTF-8.",
    flagHash: "8a6d5cef5af0ab50d29c58f8daa229958f1d14e40fb267825ea531b46ff15e2f",
  },
  {
    id: "ctf-25",
    category: "Stego",
    difficulty: "Hard",
    points: 350,
    title: "CSS Ghost",
    description: "There's an empty-looking element on this card. Empty elements can still have content - just ask CSS.",
    type: "css-ghost",
    payload: "RkxBR3tjc3NfZ2hvc3RfMW5fdGgzX3NoM2xsfQ==",
    hint: "DevTools -> Elements -> find the empty span in this card -> check the Computed/Styles panel for its ::after content property. Base64.",
    flagHash: "cbdd6f78b83c6c47ad113cc9176ac134c1dee216205ca48425393e2d04f34f5a",
  },
  {
    id: "ctf-26",
    category: "Crypto",
    difficulty: "Hard",
    points: 350,
    title: "Vigenere's Veil",
    description: "A polyalphabetic cipher - stronger than Caesar, still breakable when you know the key length.",
    type: "code",
    payload: "HEFI{onixsgkj_xxnn_yfnex_cpfa}",
    hint: "Key length 3. Think about the three letters this entire page is themed around.",
    flagHash: "e7cdb4c24e2e8db617adb8f30f1c7539152f8e6677f159eedff42df86a327151",
  },
];

export const CATEGORIES = Array.from(new Set(CHALLENGES.map((c) => c.category)));
export const TOTAL_POINTS = CHALLENGES.reduce((sum, c) => sum + c.points, 0);
