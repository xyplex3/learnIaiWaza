// Data source: ZNKR-iai-Textbook-ENG-211212.pdf (All Japan Kendo Federation Iai Instructional Manual)
// 12 Seitei Iai forms, numbered Ippon-me (1) through Jyunihon-me (12).
const FORMS = [
  { number: 1,  ordinalRomaji: "Ippon-me",    ordinalKanji: "一本目",   wazaRomaji: "Mae",          wazaKanji: "前",     meaningEn: "front" },
  { number: 2,  ordinalRomaji: "Nihon-me",    ordinalKanji: "二本目",   wazaRomaji: "Ushiro",       wazaKanji: "後ろ",   meaningEn: "behind" },
  { number: 3,  ordinalRomaji: "Sanbon-me",   ordinalKanji: "三本目",   wazaRomaji: "Uke Nagashi",  wazaKanji: "受け流し", meaningEn: "parry" },
  { number: 4,  ordinalRomaji: "Yonhon-me",   ordinalKanji: "四本目",   wazaRomaji: "Tsuka Ate",    wazaKanji: "柄当て",  meaningEn: "striking with the handle" },
  { number: 5,  ordinalRomaji: "Gohon-me",    ordinalKanji: "五本目",   wazaRomaji: "Kesa Giri",    wazaKanji: "袈裟斬り", meaningEn: "diagonal cut" },
  { number: 6,  ordinalRomaji: "Roppon-me",   ordinalKanji: "六本目",   wazaRomaji: "Morote Zuki",  wazaKanji: "諸手突き", meaningEn: "two-hand thrust" },
  { number: 7,  ordinalRomaji: "Nanahon-me",  ordinalKanji: "七本目",   wazaRomaji: "Sanpō Giri",   wazaKanji: "三方斬り", meaningEn: "three-direction cut" },
  { number: 8,  ordinalRomaji: "Hachihon-me", ordinalKanji: "八本目",   wazaRomaji: "Ganmen Ate",   wazaKanji: "顔面当て", meaningEn: "face strike" },
  { number: 9,  ordinalRomaji: "Kyūhon-me",   ordinalKanji: "九本目",   wazaRomaji: "Soete Zuki",   wazaKanji: "添え手突き", meaningEn: "supported-hand thrust" },
  { number: 10, ordinalRomaji: "Jippon-me",   ordinalKanji: "十本目",   wazaRomaji: "Shihō Giri",   wazaKanji: "四方斬り", meaningEn: "four-direction cut" },
  { number: 11, ordinalRomaji: "Jyuippon-me", ordinalKanji: "十一本目", wazaRomaji: "Sō Giri",      wazaKanji: "総切り",  meaningEn: "general cutting" },
  { number: 12, ordinalRomaji: "Jyunihon-me", ordinalKanji: "十二本目", wazaRomaji: "Nuki Uchi",    wazaKanji: "抜き打ち", meaningEn: "drawing cut" },
];
