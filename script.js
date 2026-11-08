const toast = document.querySelector(".toast");
const guideView = document.querySelector("#guide-view");
const guideListPage = document.querySelector(".guide-list-page");
const guideSongPage = document.querySelector(".guide-song-page");
const songList = document.querySelector(".song-list");
const searchInput = document.querySelector("#song-search-input");
const searchClear = document.querySelector(".search-clear");
let toastTimer;
let songSort = "default";

const songs = [
  { id: "Tokimeki", title: "心動 (Tokimeki)", original: "Tokimeki", chorus: 25, actions: ["拍手", "揮手"], videoId: "-_PKhPMXMDY" },
  { id: "KaijuNoHanauta", title: "怪獸之花歌 (怪獣の花唄)", original: "怪獣の花唄", chorus: 21, actions: ["拍手", "揮手"], videoId: "UM9XNpgrqVk" },
  { id: "CHAINSAWBLOOD", title: "CHAINSAW BLOOD", original: "CHAINSAW BLOOD", chorus: 18, actions: ["拍手", "揮手", "跳躍"], videoId: "FL1QjjkZVm4" },
  { id: "KoikazeniNosete", title: "乘著戀愛感冒 (恋風邪にのせて)", original: "恋風邪にのせて", chorus: 12, actions: ["拍手", "揮手"], videoId: "1FIhcdocT-k" },
  { id: "Odoriko", title: "舞者 (踊り子)", original: "踊り子", chorus: 0, actions: ["拍手", "轉臂"], videoId: "7HgJIAUtICU" },
  { id: "HadakaNoYusha", title: "裸身勇者 (裸の勇者)", original: "裸の勇者", chorus: 5, actions: ["拍手", "揮手"], videoId: "FT0GKCuSaW0" },
  { id: "Fukakouryoku", title: "不可幸力 (不可幸力)", original: "不可幸力", chorus: 17, actions: ["拍手", "揮手"], videoId: "Gbz2C2gQREI" },
  { id: "Reunion", title: "重逢 (再会)", original: "再会", chorus: 10, actions: ["拍手", "揮手"], videoId: "WcaSSvtHFeM" },
  { id: "hanaurana", title: "花占卜 (花占い)", original: "花占い", chorus: 7, actions: ["拍手", "揮手"], videoId: "onhBN0qkUcE" },
  { id: "Yobigoe", title: "呼喚聲 (呼び声)", original: "呼び声", chorus: 22, actions: ["拍手", "揮手"], videoId: "CI2x2aSi8aI" },
  { id: "Tomoshibi", title: "燈火 (灯火)", original: "灯火", chorus: 2, actions: ["拍手", "揮手"], videoId: "nrLZ-vTiQa4" },
  { id: "HowdoIknow'", title: "我怎麼會知道呢 (僕にはどうしてわかるんだろう)", original: "僕にはどうしてわかるんだろう", chorus: 8, actions: ["揮手"], videoId: "x4aWXNWPrtY" },
  { id: "Shiwaawase'", title: "皺褶相合 (しわあわせ)", original: "しわあわせ", chorus: 11, actions: [], videoId: "JwmGruvGt_I" },
  { id: "Homunculus", title: "人造小人 (ホムンクルス)", original: "ホムンクルス", chorus: 15, actions: ["拍手", "揮手"], videoId: "ZhUa0CumyxQ" },
  { id: "soramimi", title: "soramimi", original: "soramimi", chorus: 3, actions: ["拍手", "揮手", "跳躍"], videoId: "Jh_0EW6G3gQ" },
  { id: "TokyoFlash", title: "東京 Flash (東京フラッシュ)", original: "東京フラッシュ", chorus: 12, actions: ["揮手"], videoId: "SIuF37EWaLU" },
  { id: "NakiJizo", title: "哭泣地藏 (泣き地蔵)", original: "泣き地蔵", chorus: 8, actions: ["拍手", "揮手"], videoId: "XQTM2M5iD_I" },
  { id: "napori", title: "napori", original: "napori", chorus: 18, actions: [], videoId: "ZeIGVnkYX04" },
  { id: "Backlight", title: "逆光 (逆光)", original: "逆光", chorus: 18, actions: ["拍手", "揮手"], videoId: "RhDxXvn6YaQ" },
  { id: "NEOJAPAN", title: "NEO JAPAN", original: "NEO JAPAN", chorus: 4, actions: [], videoId: "QC6gd_b1nz8" },
  { id: "ZuttoLoveSong", title: "一直都是情歌 (ずっとラブソング)", original: "ずっとラブソング", chorus: 5, actions: ["揮手"], videoId: "wriTi0J_-1A" },
  { id: "Iseijin'", title: "偉生人 (偉生人)", original: "偉生人", chorus: 13, actions: ["拍手", "揮手"], videoId: "aDaWuvpB_Kw" },
  { id: "ZERO", title: "ZERO", original: "ZERO", chorus: 10, actions: [], videoId: "Fs7MW0rx9Cw" },
  { id: "SonnaBitternaHanashi)", title: "那樣的 bitter 故事 (そんなbitterな話)", original: "そんなbitterな話", chorus: 10, actions: ["揮手"], videoId: "V-gxqhWEbxI" },
  { id: "Fujin", title: "風神 (風神)", original: "風神", chorus: 19, actions: ["拍手", "揮手"], videoId: "yiU0I0tvt6s" },
  { id: "Jonetsu", title: "常熱 (常熱)", original: "常熱", chorus: 0, actions: ["拍手", "揮手"], videoId: "fxtQ4Dsmqo0" },
  { id: "Kagero", title: "陽炎 (かげろう)", original: "かげろう", chorus: 19, actions: ["揮手"], videoId: "gY-7i-T76o0" },
  { id: "IdeagaAfureteNemurenai", title: "理念滿溢而無法入睡 (イデアが溢れて眠れない)", original: "イデアが溢れて眠れない", chorus: 16, actions: ["揮手"], videoId: "0u_zA8BJG6A" },
  { id: "flyaway", title: "飛翔之時 (飛ぶ時)", original: "飛ぶ時", chorus: 22, actions: ["拍手", "揮手", "跳躍"], videoId: "ARj1adoUoEU" },
  { id: "mabuta", title: "眼瞼 (まぶた)", original: "まぶた", chorus: 11, actions: ["拍手", "揮手"], videoId: "fjx_uy5eD8g" },
  { id: "Hitomibore", title: "為瞳孔著迷 (瞳惚れ)", original: "瞳惚れ", chorus: 2, actions: ["拍手", "揮手"], videoId: "XEEXE8Ei5SA" },
  { id: "SekainoHimitsu", title: "世界的秘密 (世界の秘密)", original: "世界の秘密", chorus: 1, actions: ["拍手"], videoId: "xFoTFCHU70s" },
  { id: "Wasuremono", title: "遺忘之物 (忘れ物)", original: "忘れ物", chorus: 0, actions: ["揮手"], videoId: "tQq8C7irREk" },
  { id: "Timeparadox", title: "時間悖論 (タイムパラドックス)", original: "タイムパラドックス", chorus: 0, actions: ["拍手"], videoId: "ewhRE-BvJCg" },
  { id: "TodomenoIchigeki", title: "最後一擊 (トドメの一撃)", original: "トドメの一撃", chorus: 27, actions: ["拍手", "揮手"], videoId: "7xRWOylrLfI" },
  { id: "Kimagure", title: "任性 (気まぐれ)", original: "気まぐれ", chorus: 0, actions: [], videoId: "uYyfD5A-w8Q" }
];

const actionIcons = { 拍手: "👏", 揮手: "👋", 跳躍: "↟", 轉臂: "↻" };
const tokimekiCues = {
  0: ["拍手"], 1: ["拍手"], 2: ["大合唱", "揮手"], 3: ["揮手"], 4: ["大合唱"],
  5: ["揮手"], 6: ["大合唱", "揮手"], 8: ["大合唱", "揮手"], 10: ["大合唱", "揮手"],
  11: ["大合唱", "揮手"], 13: ["大合唱", "揮手"], 15: ["揮手"],
  16: ["大合唱", "揮手"], 17: ["拍手"], 18: ["拍手"], 19: ["大合唱"], 20: ["揮手"],
  21: ["大合唱", "揮手"], 22: ["揮手"], 23: ["大合唱"],
  25: ["大合唱", "揮手"], 27: ["大合唱"], 28: ["大合唱"],
  30: ["大合唱", "揮手"], 32: ["揮手"], 33: ["大合唱"],
  35: ["大合唱"], 36: ["揮手"], 37: ["大合唱", "揮手"],
  38: ["大合唱", "揮手"], 40: ["大合唱", "揮手"], 42: ["大合唱", "揮手"],
  43: ["大合唱", "揮手"], 45: ["大合唱", "揮手"], 47: ["揮手"], 48: ["大合唱"]
};
const tokimekiLyrics = [
  ["目に映るのは 確かな Tokimeki で光る魔法", "me ni utsuru no wa tashika na TOKIMEKI de hikaru mahou", "映照在我的雙眼裡的東西，是確實的、讓人感到 Tokimeki 且發著光芒的魔法"],
  ["思い当たるのは 誰かの 涙が落ちる音", "omoi ataru no wa dare ka no namida ga ochi ru oto", "我所想起的是他人的落淚聲音"],
  ["Hu Hu Hu Ya Ya ×3", "Hu Hu Hu Ya Ya ×3", ""],
  ["それは、軽やかな魔法", "so re wa, karoyaka na mahou", "那是道、讓人感到輕鬆的魔法"],
  ["Hu Hu Hu Ya Ya ×2", "Hu Hu Hu Ya Ya ×2", ""],
  ["美しいほど 止まらぬ CRY", "utsukushi i ho do tomaranu CRY", "美得讓人動容，停止不了的 CRY"],
  ["DA-DADADADA", "DA-DADADADA", ""],
  ["Just dancing tonight", "Just dancing tonight", ""],
  ["(DA-DA-DA)", "(DA-DA-DA)", ""],
  ["涙流して笑えばいいさ", "namida nagashi te warae ba i i sa", "就這麼喜極而泣吧"],
  ["見えぬ未来も 悪くはないぜ", "mie nu mirai mo waruku wa na i ze", "就算是看不見的未來，也一點都不糟糕啊"],
  ["DA-DADADADA", "DA-DADADADA", ""],
  ["Just dancing tonight", "Just dancing tonight", ""],
  ["(DA-DA-DA)", "(DA-DA-DA)", ""],
  ["あくびしてる暇なんかないぜ", "a ku bi shi te ru hima na n ka na i ze", "我們可沒有打呵欠的空閒啊"],
  ["ほら、ほらもっと聞かせて", "ho ra, ho ra motto kikase te", "來吧、來吧，再讓我聽見更多吧"],
  ["HU HU HU HU HU", "HU HU HU HU HU", ""],
  ["聞こえてるのは 確かな Tokimeki で歌う魔法", "kikoe te ru no wa tashika na TOKIMEKI de utau mahou", "我所聽見的是確實的、靠 Tokimeki 歌唱的魔法"],
  ["思い当たるのは 誰かの 鼻歌の Intro", "omoi ataru no wa dare ka no hana uta no INTRO", "我所想起的是他人所哼唱而出的 Intro"],
  ["Hu Hu Hu Ya Ya ×3", "Hu Hu Hu Ya Ya ×3", ""],
  ["それは、鮮やかな魔法", "so re wa, azayaka na mahou", "那是道、鮮明的魔法"],
  ["Hu Hu Hu Ya Ya ×2", "Hu Hu Hu Ya Ya ×2", ""],
  ["聞こえてるのは", "kikoe te ru no wa", "我所聽見的是"],
  ["DA-DADADADA", "DA-DADADADA", ""],
  ["Just dancing tonight", "Just dancing tonight", ""],
  ["(DA-DA-DA)", "(DA-DA-DA)", ""],
  ["涙流して笑えばいいさ", "namida nagashi te warae ba i i sa", "就這麼喜極而泣吧"],
  ["見えぬ未来も 悪くはないぜ", "mie nu mirai mo waruku wa na i ze", "就算是看不見的未來，也一點都不糟糕啊"],
  ["DA-DADADADA", "DA-DADADADA", ""],
  ["Just dancing tonight", "Just dancing tonight", ""],
  ["(DA-DA-DA)", "(DA-DA-DA)", ""],
  ["あくびしてる暇なんかないぜ", "a ku bi shi te ru hima na n ka na i ze", "我們可沒有打呵欠的空閒啊"],
  ["ほら、ほらもっと聞かせて", "ho ra, ho ra motto kikase te", "來吧、來吧，再讓我聽見更多吧"],
  ["HU HU HU HU", "HU HU HU HU", ""],
  ["途切れない 悲しみは 点で、線を描いてるようだ", "togire na i kanashi mi wa ten de, sen wo egaite ru yo u da", "不斷湧上心頭的悲傷，就像是靠點來描繪出線一樣"],
  ["震え出す その線のせいで 動き出してしまうの", "furue dasu so no sen no se i de ugoki dashi te shi ma u no", "我因為那條開始顫抖的線，而開始行動"],
  ["止まれないのは", "tomare na i no wa", "之所以我無法停止"],
  ["Tokimeki のせい", "TOKIMEKI no se i", "都是 Tokimeki 的錯"],
  ["DA-DADADADA", "DA-DADADADA", ""],
  ["Just dancing tonight", "Just dancing tonight", ""],
  ["(DA-DA-DA)", "(DA-DA-DA)", ""],
  ["涙流して笑えばいいさ", "namida nagashi te warae ba i i sa", "就這麼喜極而泣吧"],
  ["見えぬ未来も 悪くはないぜ", "mie nu mirai mo waruku wa na i ze", "就算是看不見的未來，也一點都不糟糕啊"],
  ["DA-DADADADA", "DA-DADADADA", ""],
  ["Just dancing tonight", "Just dancing tonight", ""],
  ["(DA-DA-DA)", "(DA-DA-DA)", ""],
  ["あくびしてる暇なんかないぜ", "a ku bi shi te ru hima na n ka na i ze", "我們可沒有打呵欠的空閒啊"],
  ["ほら、ほらもっと聞かせて", "ho ra, ho ra motto kikase te", "來吧、來吧，再讓我聽見更多吧"],
  ["HU HU HU HU HU", "HU HU HU HU HU", ""]
];
const kaijuCues = {
  0: ["拍手"], 1: ["拍手"], 2: ["拍手"], 3: ["拍手"], 4: ["拍手"], 5: ["拍手"],
  6: ["拍手"], 7: ["拍手"], 8: ["拍手"], 9: ["拍手"], 10: ["拍手"], 11: ["拍手"],
  12: ["拍手"], 13: ["拍手"], 14: ["大合唱"], 15: ["揮手"], 16: ["揮手"], 17: ["揮手"],
  18: ["大合唱", "揮手"], 20: ["揮手"], 21: ["揮手"],
  22: ["拍手"], 23: ["拍手"], 24: ["拍手"], 25: ["拍手"], 26: ["拍手"], 27: ["拍手"],
  28: ["拍手"], 29: ["拍手"], 30: ["拍手"], 31: ["拍手"], 32: ["拍手"], 33: ["大合唱"],
  34: ["揮手"], 35: ["揮手"], 36: ["揮手"], 37: ["大合唱", "揮手"], 39: ["揮手"], 40: ["揮手"],
  41: ["大合唱", "拍手"], 42: ["大合唱", "拍手"], 43: ["大合唱", "拍手"],
  44: ["大合唱", "揮手"], 45: ["揮手"], 46: ["揮手"], 47: ["揮手"],
  48: ["大合唱", "揮手"], 50: ["揮手"], 51: ["揮手"],
  53: ["大合唱", "揮手"], 54: ["大合唱", "揮手"], 55: ["大合唱", "揮手"],
  58: ["大合唱", "揮手"], 59: ["大合唱", "揮手"], 60: ["大合唱", "揮手"]
};
const kaijuLyrics = [
  ["思い出すのは君の歌", "omoi dasu no wa kimi no uta", "我所想起的是你的歌"],
  ["会話よりも鮮明だ", "kaiwa yo ri mo senmei da", "比起我們之間的對話還要鮮明"],
  ["どこに行ってしまったの", "do ko ni itte shi matta no", "你去了哪裡呢"],
  ["いつも探すんだよ", "i tsu mo sagasu n da yo", "我總是在尋找著你啊"],
  ["思い出すのは", "omoi dasu no wa", "我所想起的是"],
  ["君の歌", "kimi no uta", "你的歌"],
  ["歌い笑う顔が鮮明だ", "utai warau kao ga senmei da", "你那笑著唱歌的臉十分鮮明"],
  ["君に似合うんだよ", "kimi ni niau n da yo", "很適合你啊"],
  ["ずっと見ていたいよ", "zutto mite i ta i yo", "我想一直注視著你啊"],
  ["でも最後に見たいのは", "de mo saigo ni mitai no wa", "但是我想在最後看見的事物"],
  ["きっともう君の夢の中", "kitto mo u kimi no yume no naka", "一定存在於你的夢中"],
  ["もう一度", "mo u ichido", "再一次"],
  ["また聞かせてくれよ", "ma ta kikase te ku re yo", "讓我聽聽吧"],
  ["聞きたいんだ", "kiki ta i n da", "我想聽聽啊"],
  ["もっと", "motto", "更加地"],
  ["騒げ怪獣の歌", "sawage kaijyuu no uta", "吵鬧起來吧　怪獸之歌"],
  ["まだ消えない", "ma da kie na i", "歌頌著仍然不會消失的"],
  ["夢の歌唱えて", "yume no uta tonae te", "夢想之歌吧"],
  ["君がいつも", "kimi ga i tsu mo", "你總是"],
  ["歌う怪獣の歌", "utau kaijyuu no uta", "唱著的怪獸之歌"],
  ["まだ消えない", "ma da kie na i", "仍然不會消失"],
  ["口ずさんでしまうよ", "kuchi zu san de shi ma u yo", "你如此哼唱著啊"],
  ["思い出すのは", "omoi dasu no wa", "我想起的是"],
  ["君がいた", "kimi ga i ta", "你"],
  ["ギター持ってる", "gita- motte ru", "拿著吉他的"],
  ["君がいた", "kimi ga i ta", "你"],
  ["忘れられないんだよ", "wasure ra re na i n da yo", "我無法忘記啊"],
  ["だから僕が歌うよ", "da ka ra boku ga utau yo", "所以我將高聲歌唱"],
  ["でも最後に見たいのは", "de mo saigo ni mitai no wa", "但是我想在最後看見的事物"],
  ["きっともう君の夢の中", "kitto mo u kimi no yume no naka", "一定存在於你的夢中"],
  ["もう一度", "mo u ichido", "再一次"],
  ["また聞かせてくれよ", "ma ta kikase te ku re yo", "讓我聽聽吧"],
  ["聞きたいんだ", "kiki ta i n da", "我想聽聽啊"],
  ["もっと", "motto", "更加地"],
  ["騒げ怪獣の歌", "sawage kaijyuu no uta", "吵鬧起來吧　怪獸之歌"],
  ["まだ消えない", "ma da kie na i", "歌頌著仍然不會消失的"],
  ["夢の歌唱えて", "yume no uta tonae te", "夢想之歌吧"],
  ["君がいつも", "kimi ga i tsu mo", "你總是"],
  ["歌う怪獣の歌", "utau kajyuu no uta", "唱著的怪獸之歌"],
  ["まだ消えない", "ma da kie na i", "仍然不會消失"],
  ["口ずさんでしまうよ", "kuchi zu sa n de shi ma u yo", "你如此哼唱著啊"],
  ["落ちてく過去は鮮明で", "ochi te ku kako wa senmei de", "逐漸剝落的過去十分鮮明"],
  ["見せたい未来は繊細で", "mise ta i mirai wa sensai de", "我想讓你看見的未來十分纖細"],
  ["すぎてく日々には鈍感な君へ", "su gi te ku hibi ni wa donkan na kimi he", "在流逝而過的日子裡獻給遲鈍的你"],
  ["ねぇ、もっと", "nee, motto", "吶、更加地"],
  ["騒げ怪獣の歌", "sawage kaijyuu no uta", "吵鬧起來吧　怪獸之歌"],
  ["まだ消えない", "ma da kie na i", "歌頌著仍然不會消失的"],
  ["夢の歌唱えて", "yume no uta tonae te", "夢想之歌吧"],
  ["君がいつも", "kimi ga i tsu mo", "你總是"],
  ["歌う怪獣の歌", "utau kaijyuu no uta", "唱著的怪獸之歌"],
  ["まだ消えない", "ma da kie na i", "仍然不會消失"],
  ["口ずさんでしまうよ", "kuchi zu sa n de shi ma u yo", "你如此哼唱著啊"],
  ["ねぇ、僕ら", "nee, boku ra", "吶、我們"],
  ["眠れない夜に手を伸ばして", "nemure na i yoru ni te wo nobashi te", "朝著無法入睡的夜晚伸出了手"],
  ["眠らない夜をまた伸ばして", "nemurana i yoru wo ma ta nobashi te", "再度延長那不眠之夜吧"],
  ["眠くないまだね", "nemuku na i ma da ne", "睡不著呢　我仍然"],
  ["そんな日々でいたいのにな", "so n na hibi de i ta i no ni na", "想待在那種日子裡啊"],
  ["懲りずに", "kori zu ri", "不長記性地"],
  ["眠れない夜に手を伸ばして", "nemure na i yoru ni te wo nobashi te", "朝著無法入睡的夜晚伸出了手"],
  ["眠らない夜をまた伸ばして", "nemurana i yoru wo ma ta nobashi te", "再度延長那不眠之夜吧"],
  ["眠くないまだね", "nemuku na i ma da ne", "睡不著呢　我仍然"],
  ["そんな夜に歌う", "so n na yoru ni utau", "在那種夜晚裡歌唱著"],
  ["怪獣の歌", "kaijyuu no uta", "怪獸之歌"]
];
const zuttoLoveSongLyrics = [
  ["いつかこの街ごと", "itsuka kono machi goto", "倘若哪天 這整座街道"],
  ["消えてなくなること知ってても", "kiete nakunaru koto shittete mo", "即便知道 終將消失殆盡"],
  ["最後まで待てるよ oh", "saigo made materu yo oh", "我也能 守候到最後一刻喔"],
  ["だけど時折その凍る心を", "dakedo tokiori sono kooru kokoro o", "然而 偶爾也會為了將那冰封的心"],
  ["溶かす口実を", "tokasu koujitsu o", "融化的藉口"],
  ["考えてみてるよ", "kangaete miteru yo", "而不斷思索著呢"],
  ["「ずっとラブソング」", "zutto rabu songu", "「永遠的情歌」"],
  ["あの日から消えない", "ano hi kara kienai", "從那天起 就不曾消失"],
  ["思い出のメロディと", "omoide no merodi to", "回憶中的旋律 以及"],
  ["このバラバラに散る言葉を集めて", "kono barabara ni chiru kotoba o atumete", "將這些 零星散落的話語匯集"],
  ["やっと飛ばせそうだ", "yatto towase sou da", "總算 能夠傳達出去了"],
  ["だから今夜", "dakara konya", "所以 今晚"],
  ["キャトルミューティレイション", "kyatoru myuuteireishon", "家畜毀損（Quattle Mutilation）"],
  ["あなたの心奪う", "anata no kokoro ubau", "奪走你的心"],
  ["超 niceな言葉で紡がれた希望を", "chou nice na kotoba de tsumugareta kibou o", "用超級 nice 的詞語所編織出的希望"],
  ["隠さないラブソングが BGMさ", "kakusanai rabu songu ga bgm sa", "那首毫不掩飾的情歌 就是背景音樂"],
  ["キャトルミューティレイション", "kyatoru myuuteireishon", "家畜毀損"],
  ["あなたの心奪う", "anata no kokoro ubau", "奪走你的心"],
  ["超 niceな笑顔で紡がれた希望を", "chou nice na egao de tsumugareta kibou o", "用超級 nice 的笑容所編織出的希望"],
  ["隠さないラブソングを", "kakusanai rabu songu o", "將那首毫不掩飾的情歌"],
  ["僕に歌ってくれ", "boku ni utatte kure", "對著我歌唱吧"],
  ["もしも dopeで funkyな 隕石が", "moshimo dope de funky na inseki ga", "如果 有顆既 dope 又 funky 的隕石"],
  ["この街に落ちて来るっていう事", "kono machi ni ochite kuru tte iu koto", "正朝著這座街道 墜落而來這件事"],
  ["君に教えたなら oh", "kimi ni oshieta nara oh", "若是 告訴了你的話"],
  ["それに導入はもうすでに出来ていて", "sore ni dounyuu wa mou sude ni dekite ite", "而且 鋪陳也已經全部就緒"],
  ["あとは あなたの心の鼓動に", "ato wa anata no kokoro no kodou ni", "剩下的 就只需配合你內心的鼓動"],
  ["合わせていくだけだよ", "awasete iku dake da yo", "調整節奏而已喔"],
  ["「ずっとラブソング」", "zutto rabu songu", "「永遠的情歌」"],
  ["あの日から消えない", "ano hi kara kienai", "從那天起 就不曾消失"],
  ["思い出のサンプルと", "omoide no sanpuru to", "回憶中的樣本 以及"],
  ["このバラバラに散る愛を集めて", "kono barabara ni chiru ai o atumete", "將這些 零星散落的愛匯集"],
  ["やっと飛ばせそうだ", "yatto towase sou da", "總算 能夠傳達出去了"],
  ["怒るのは後にしてくれよ baby", "okoru no wa ato ni shite kure yo baby", "要生氣的話 等等再說吧 baby"],
  ["今日は僕の人生で1番の転機なのさ", "kyou wa boku no jinsei de ichiban no tenki na no sa", "今天 可是我人生中最關鍵的轉機呢"],
  ["ここまでの悲しみや苦しみ全部", "koko made no kanashimi ya kurushimi zenbu", "至今為止的所有 悲傷與痛苦"],
  ["Oh この瞬間のため 抱きしめるための", "oh kono shunkan no tame dakishimeru tame no", "Oh 都是為了這一刻 為了擁抱這一切的"],
  ["「ずっとラブソング」さ", "zutto rabu songu sa", "「永遠的情歌」啊"],
  ["だから今夜", "dakara konya", "所以 今晚"],
  ["キャトルミューティレイション", "kyatoru myuuteireishon", "家畜毀損"],
  ["あなたの心奪う", "anata no kokoro ubau", "奪走你的心"],
  ["超 niceな言葉で紡がれた希望を", "chou nice na kotoba de tsumugareta kibou o", "用超級 nice 的詞語所編織出的希望"],
  ["隠さないラブソングが BGMさ", "kakusanai rabu songu ga bgm sa", "那首毫不掩飾的情歌 就是背景音樂"],
  ["キャトルミューティレイション", "kyatoru myuuteireishon", "家畜毀損"],
  ["あなたの心奪う", "anata no kokoro ubau", "奪走你的心"],
  ["超 niceな笑顔で紡がれた希望を", "chou nice na egao de tsumugareta kibou o", "用超級 nice 的笑容所編織出的希望"],
  ["隠さないラブソングを僕に歌ってくれ", "kakusanai rabu songu o boku ni utatte kure", "將那首毫不掩飾的情歌 對著我歌唱吧"],
  ["Oh yeah, oh eh", "oh yeah oh eh", ""],
  ["Oh yeah ずっとラブソング", "oh yeah zutto rabu songu", "Oh yeah 永遠的情歌"]
];
const zuttoLoveSongCues = {
  11: ["揮手"], 12: ["大合唱"], 13: ["揮手"], 14: ["揮手"], 15: ["揮手"],
  16: ["大合唱", "揮手"], 17: ["揮手"], 18: ["揮手"], 19: ["揮手"], 20: ["揮手"],
  37: ["揮手"], 38: ["大合唱"], 39: ["揮手"], 40: ["揮手"], 41: ["揮手"],
  42: ["大合唱", "揮手"], 43: ["揮手"], 44: ["揮手"], 45: ["揮手"], 47: ["大合唱"]
};
const todomenoIchigekiLyrics = [
  ["視界に目前映る深い真紅", "Shikai ni mokuzen utsuru fukai shinkuu", "現在視線裡映照出的深赤色"],
  ["この先およそ40000 kilometer", "Kono saki oyoso yonmam kilometer", "就在這前方約 40000 公里處"],
  ["後ろに迫る互いの傷が", "Ushiro ni semaru tagai no kizu ga", "這個從後方接近彼此的缺陷"],
  ["迷う道をさらに迷わせてく", "Mayou michi wo sara ni mayowaseteku", "讓這迷惘的道路 變得更加縹緲未知"],
  ["見えず匂わぬ", "Miezu niowanu", "這無法預測也無法嗅見的"],
  ["違えぬ未来が", "Machigaenu mirai ga", "命中注定的未來"],
  ["背中を突いた！", "Senaka wo tsuita!", "刺向了背後！"],
  ["だから", "Dakara", "所以"],
  ["今日の夜は隣にいさせて (隣にいさせて)", "Kyou no yoru wa tonari ni isasete (Tonari ni isasete)", "今晚就讓我陪在你身邊吧"],
  ["今夜だけは本気だからね (本気にさせて)", "Konya dake wa honki dakara ne (Honki ni sasete)", "這次的夜晚 我絕不會失手的"],
  ["こっちにきてもっと", "Kocchi ni kite motto", "再往我這邊靠近一點"],
  ["祈りあった未来とて", "Inori atta mirai tote", "縱使是祈禱後的未來"],
  ["道が違うのよ アナタ (アナタ, give up! Give it up!)", "Michi ga chigau no yo (Anata, give up! Give it up!)", "我與你兩人也仍是勢不兩立 你將會"],
  ["互いの殺意で トドメ喰らっちゃうね", "Tagai no satsui de todome kuracchau ne", "因為彼此的殺意 而被這致命一擊給奪命吧"],
  ["やっぱりやめとくわ", "Yappari yametoku wa", "算了 果然還是停手吧"],
  ["行く、万年の困難が待つ道", "Iku, mannen no konnan ga matsu michi", "將要邁向的是、僅有萬難的道路"],
  ["内、四千は光死ぬ常闇", "Uchi, yonsen wa hikari shinu tokoyami", "而選擇保守、則會處於四千年不見光日的亂世"],
  ["さらに続き、絶えぬ更地", "Sara ni tsuzuki, taenu sarachi", "而在這之後、更將會迎來一無所有的土地"],
  ["そこに現れた 心見透かすちっぽけな魂", "Soko ni arawareta kokoro misukasu chippoke na tamashii", "而出現在那裡的是 能看透人心的渺小靈魂"],
  ["それは散らばるミクロ砂金", "Sore wa chirabaru mikuro sakin", "那彷彿就像散落於砂裡的微小黃金"],
  ["手のひらに集め 密度高め万年を照らす", "Te no hira ni atsume mitsudo takame mannen wo terasu", "將它蒐集到掌心裡 匯聚成密度高的黃金後"],
  ["光の矢を放つ、穿つ", "Hikari no ya wo hanatsu, ugatsu", "便能轉變成能照耀且釋放、貫穿萬年的光束"],
  ["こういうのとか そういうのとか", "Kou iu no toka sou iu no toka", "像是這樣的事情 或是那樣的事情"],
  ["偽物じゃできないよね だから", "Nisemono jya dekinai yo ne dakara", "如果是「冒牌貨」的話 可是做不到的吧 所以"],
  ["今日の夜は隣にいさせて (隣にいさせて)", "Kyou no yoru wa tonari ni isasete (Tonari ni isasete)", "今晚就讓我陪在你身邊吧"],
  ["今夜だけは本気だからね (本気にさせて)", "Konya dake wa honki dakara ne (Honki ni sasete)", "這次的夜晚 我絕不會失手的"],
  ["こっちにきてもっと", "Kocchi ni kite motto", "再往我這邊靠近一點"],
  ["祈りあった未来とて", "Inori atta mirai tote", "縱使是祈禱後的未來"],
  ["道が違うのよ アナタ (アナタ ああ)", "Michi ga chigau no yo (Anata aa)", "我與你兩人也仍是勢不兩立 你將會"],
  ["互いの殺意で トドメ喰らっちゃうね", "Tagai no satsui de todome kuracchau ne", "因為彼此的殺意 而被這致命一擊給奪命吧"],
  ["やっぱりやめとくわ", "Yappari yametoku wa", "算了 果然還是停手吧"],
  ["もしもどこまでも続くなら せめて今日の一度だけ", "Moshimo dokomademo tsuzuku nara semete kyou no ichido dake", "如果能持續到永恆的話 那至少今天一次就好"],
  ["今日の夜はワタシにさせて (ワタシにさせて)", "Kyou no yoru wa watashi ni sasete (Watashi ni sasete)", "今晚就讓我自由行動吧"],
  ["今夜だけはワタシに守らせて", "Konya dake wa watashi ni mamorasete", "僅此一晚 就讓我來守護你吧"],
  ["今日の夜が明けたころに 待ち合わせね", "Kyou no yoru ga aketa koro ni machiawase ne", "我們就在黎明之時 相會吧"],
  ["明日の夜も守れますように", "Asu no yoru mo mamoremasu you ni", "但願明夜我也能守護著你"],
  ["こっちにきてもっと", "Kocchi ni kite motto", "所以 再靠過來一點吧"],
  ["祈りあった未来とて", "Inori atta mirai tote", "縱使是祈禱後的未來"],
  ["道が違うのよ アナタ (アナタ ああ)", "Michi ga chigau no yo (Anata aa)", "我與你兩人也仍是勢不兩立 你將會"],
  ["互いの殺意で トドメ喰らっちゃうね...", "Tagai no satsui de todome kuracchau ne...", "因為彼此的殺意 而被這致命一擊給奪命吧..."]
];
const todomenoIchigekiCues = {
  0: ["拍手"], 1: ["拍手"],
  7: ["大合唱", "揮手"], 8: ["大合唱", "揮手"], 9: ["大合唱", "揮手"],
  10: ["揮手"], 11: ["大合唱", "揮手"], 12: ["大合唱", "揮手"],
  13: ["大合唱", "揮手"], 14: ["揮手"],
  23: ["大合唱", "揮手"], 24: ["大合唱", "揮手"], 25: ["大合唱", "揮手"],
  26: ["揮手"], 27: ["大合唱", "揮手"], 28: ["大合唱", "揮手"],
  29: ["大合唱", "揮手"], 30: ["揮手"],
  32: ["大合唱", "揮手"], 33: ["大合唱", "揮手"], 34: ["大合唱", "揮手"],
  35: ["大合唱", "揮手"], 36: ["揮手"], 37: ["大合唱", "揮手"],
  38: ["大合唱", "揮手"], 39: ["大合唱", "揮手"]
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function setTheme(light) {
  document.body.classList.toggle("light", light);
  const label = light ? "切換至深色模式" : "切換至淺色模式";
  document.querySelectorAll(".theme-toggle, .guide-theme-toggle").forEach((button) => {
    button.setAttribute("aria-label", label);
  });
  document.querySelector('meta[name="theme-color"]').content = light ? "#f8f3e8" : "#260806";
  try {
    localStorage.setItem("vaundy-theme", light ? "light" : "dark");
  } catch (error) {
    showToast("主題已切換，但無法儲存偏好設定。");
  }
}

try {
  setTheme(localStorage.getItem("vaundy-theme") === "light");
} catch (error) {
  setTheme(false);
}

document.querySelectorAll(".theme-toggle, .guide-theme-toggle").forEach((button) => {
  button.addEventListener("click", () => setTheme(!document.body.classList.contains("light")));
});

function activeRoute() {
  const match = window.location.hash.match(/^#\/song\/([^/]+)$/);
  if (match) return { page: "song", id: decodeURIComponent(match[1]) };
  return window.location.hash.startsWith("#/guide") ? { page: "guide" } : { page: "home" };
}

function navigate(path) {
  if (window.location.hash === path) {
    renderRoute();
    return;
  }
  window.history.pushState(null, "", path);
  renderRoute();
}

function orderedSongs() {
  const ordered = [...songs];
  if (songSort === "name") ordered.sort((a, b) => a.title.localeCompare(b.title, "zh-Hant"));
  if (songSort === "chorus") ordered.sort((a, b) => b.chorus - a.chorus);
  return ordered;
}

function renderSongList() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const filteredSongs = orderedSongs().filter((song) => {
    const number = String(songs.indexOf(song) + 1).padStart(2, "0");
    return !query || song.title.toLocaleLowerCase().includes(query) ||
      song.original.toLocaleLowerCase().includes(query) || number.includes(query);
  });

  songList.replaceChildren();
  filteredSongs.forEach((song) => {
    const index = orderedSongs().indexOf(song);
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.className = "song-row";
    button.type = "button";
    button.setAttribute("aria-label", `${String(index + 1).padStart(2, "0")} ${song.title}${song.chorus ? ` 大合唱 ${song.chorus} 行` : ""} ${song.actions.join(" ")}`);
    button.addEventListener("click", () => navigate(`#/song/${encodeURIComponent(song.id)}`));

    const number = document.createElement("span");
    number.className = "song-row-number";
    number.textContent = String(index + 1).padStart(2, "0");
    const title = document.createElement("span");
    title.className = "song-row-title";
    title.textContent = song.title;

    const badges = document.createElement("span");
    badges.className = "song-row-badges";
    if (song.chorus) {
      const chorus = document.createElement("span");
      chorus.className = "song-row-chorus";
      chorus.setAttribute("title", `大合唱 ${song.chorus} 行`);
      chorus.innerHTML = `<span aria-hidden="true">🎤</span><span>${song.chorus}</span><span>行</span>`;
      badges.append(chorus);
    }

    const actions = document.createElement("span");
    actions.className = "song-row-actions";
    song.actions.forEach((action) => {
      const badge = document.createElement("span");
      badge.className = "song-action-dot";
      badge.title = action;
      badge.setAttribute("aria-label", action);
      badge.textContent = actionIcons[action];
      actions.append(badge);
    });
    badges.append(actions);
    button.append(number, title, badges);
    item.append(button);
    songList.append(item);
  });

  document.querySelector(".song-result-count").textContent = `共 ${filteredSongs.length} 首`;
  document.querySelector(".empty-songs").hidden = filteredSongs.length !== 0;
  songList.hidden = filteredSongs.length === 0;
}

function renderSongLyrics(song) {
  const lyricsContent = document.querySelector(".lyrics-content");
  lyricsContent.replaceChildren();
  const lyricsBySong = {
    Tokimeki: { lines: tokimekiLyrics, cues: tokimekiCues },
    KaijuNoHanauta: { lines: kaijuLyrics, cues: kaijuCues },
    ZuttoLoveSong: { lines: zuttoLoveSongLyrics, cues: zuttoLoveSongCues },
    TodomenoIchigeki: { lines: todomenoIchigekiLyrics, cues: todomenoIchigekiCues }
  };
  const songLyrics = lyricsBySong[song.id];
  const lyricsSection = document.querySelector(".lyrics-section");
  lyricsSection.hidden = !songLyrics;
  if (!songLyrics) return;

  const cueIcons = { 大合唱: "🎤", 拍手: "👏", 揮手: "👋" };
  songLyrics.lines.forEach(([japanese, romaji, translation], index) => {
    const line = document.createElement("div");
    line.className = "lyrics-line";
    const cues = songLyrics.cues[index] || [];
    if (cues.length) {
      const cueList = document.createElement("div");
      cueList.className = "lyrics-cues";
      cues.forEach((cue) => {
        const badge = document.createElement("span");
        badge.className = `lyrics-cue lyrics-cue-${cue === "大合唱" ? "chant" : cue === "拍手" ? "clap" : "wave"}`;
        badge.textContent = `${cueIcons[cue]} ${cue}`;
        cueList.append(badge);
      });
      line.append(cueList);
    }

    [[japanese, "lyrics-japanese"], [romaji, "lyrics-romaji"], [translation, "lyrics-translation"]]
      .filter(([text]) => text)
      .forEach(([text, className]) => {
        const paragraph = document.createElement("p");
        paragraph.className = className;
        paragraph.textContent = text;
        line.append(paragraph);
      });
    lyricsContent.append(line);
  });
}

function renderSong(song) {
  const playlist = orderedSongs();
  const index = playlist.indexOf(song);
  const lyricsSection = document.querySelector(".lyrics-section");
  lyricsSection.open = false;
  renderSongLyrics(song);
  document.querySelector(".song-detail-title").textContent = song.title;
  document.querySelector(".song-step-label").textContent = `${String(index + 1).padStart(2, "0")}. ${song.title}`;
  document.querySelectorAll("[data-song-step]").forEach((button) => {
    const step = Number(button.dataset.songStep);
    const destination = playlist[(index + step + playlist.length) % playlist.length];
    button.setAttribute("aria-label", `${step < 0 ? "上一首" : "下一首"}：${destination.title}`);
    button.onclick = () => navigate(`#/song/${encodeURIComponent(destination.id)}`);
  });

  const videoFrame = document.querySelector(".song-video-frame");
  const youtubeLink = document.querySelector(".youtube-link");
  videoFrame.replaceChildren();
  if (song.videoId) {
    const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(song.videoId)}`;
    if (window.location.protocol === "file:") {
      const preview = document.createElement("a");
      preview.className = "video-thumbnail";
      preview.href = watchUrl;
      preview.target = "_blank";
      preview.rel = "noreferrer";
      preview.setAttribute("aria-label", `在 YouTube 觀看 ${song.title}`);
      const thumbnail = document.createElement("img");
      thumbnail.src = `https://img.youtube.com/vi/${encodeURIComponent(song.videoId)}/hqdefault.jpg`;
      thumbnail.alt = `${song.title} 影片縮圖`;
      const playLabel = document.createElement("span");
      playLabel.textContent = "在 YouTube 觀看 ↗";
      preview.append(thumbnail, playLabel);
      videoFrame.append(preview);
    } else {
      const iframe = document.createElement("iframe");
      iframe.title = `${song.title} 影片播放器`;
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(song.videoId)}`;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      videoFrame.append(iframe);
    }
    youtubeLink.href = `https://www.youtube.com/watch?v=${encodeURIComponent(song.videoId)}`;
    youtubeLink.textContent = "在 YouTube 觀看 ↗";
  } else {
    const prompt = document.createElement("p");
    prompt.className = "video-search-prompt";
    prompt.append(document.createTextNode("此歌曲的應援影片請至 YouTube 搜尋查看。 "));
    const searchLink = document.createElement("a");
    searchLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(`Vaundy ${song.original} 応援` )}`;
    searchLink.target = "_blank";
    searchLink.rel = "noreferrer";
    searchLink.textContent = "搜尋歌曲影片 ↗";
    prompt.append(searchLink);
    videoFrame.append(prompt);
    youtubeLink.href = searchLink.href;
    youtubeLink.textContent = "在 YouTube 搜尋 ↗";
  }

  const chorus = document.querySelector(".song-action-chorus");
  chorus.textContent = song.chorus ? `🎤 大合唱 ${song.chorus} 行` : "";
  const actionTags = document.querySelector(".song-action-tags");
  actionTags.replaceChildren();
  song.actions.forEach((action) => {
    const pill = document.createElement("span");
    pill.className = "song-action-pill";
    pill.textContent = `${actionIcons[action]} ${action}`;
    actionTags.append(pill);
  });

  const cueList = document.querySelector(".chorus-cues");
  cueList.replaceChildren();
  const summary = document.createElement("div");
  summary.className = "chorus-summary";
  const label = document.createElement("span");
  label.textContent = song.chorus ? "大合唱應援" : "應援動作";
  const value = document.createElement("span");
  value.textContent = song.chorus ? `${song.chorus} 行` : "依歌曲氣氛參與";
  summary.append(label, value);
  cueList.append(summary);
  song.actions.forEach((action) => {
    const actionSummary = document.createElement("div");
    actionSummary.className = "chorus-summary";
    const actionLabel = document.createElement("span");
    actionLabel.textContent = `${actionIcons[action]} ${action}`;
    const actionNote = document.createElement("span");
    actionNote.textContent = "歌曲應援提示";
    actionSummary.append(actionLabel, actionNote);
    cueList.append(actionSummary);
  });
  document.querySelector(".chorus-guide-count").textContent = song.chorus ? `${song.chorus} 行大合唱提示` : "歌曲應援動作提示";
  const helpButton = document.querySelector(".song-help-toggle");
  helpButton.setAttribute("aria-expanded", "false");
  document.querySelector(".song-help").hidden = true;
}

function renderRoute() {
  const route = activeRoute();
  const inGuide = route.page !== "home";
  guideView.hidden = !inGuide;
  document.body.classList.toggle("guide-active", inGuide);
  if (!inGuide) return;
  guideView.scrollTop = 0;

  const isSong = route.page === "song";
  guideListPage.hidden = isSong;
  guideSongPage.hidden = !isSong;
  const backButton = document.querySelector("[data-guide-back]");
  backButton.setAttribute("aria-label", isSong ? "返回歌曲清單" : "返回首頁");
  backButton.onclick = () => navigate(isSong ? "#/guide" : "#/");

  if (isSong) {
    const song = songs.find((entry) => entry.id === route.id);
    if (song) renderSong(song);
    else navigate("#/guide");
  }
}

document.querySelector("[data-route='guide']").addEventListener("click", () => navigate("#/guide"));
window.addEventListener("hashchange", renderRoute);
window.addEventListener("popstate", renderRoute);

searchInput.addEventListener("input", () => {
  searchClear.hidden = searchInput.value.length === 0;
  renderSongList();
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.hidden = true;
  renderSongList();
  searchInput.focus();
});

document.querySelectorAll("[data-sort]").forEach((button) => {
  button.addEventListener("click", () => {
    songSort = button.dataset.sort;
    document.querySelectorAll("[data-sort]").forEach((tab) => tab.setAttribute("aria-pressed", String(tab === button)));
    renderSongList();
  });
});

document.querySelector(".song-help-toggle").addEventListener("click", (event) => {
  const help = document.querySelector(".song-help");
  const expanded = event.currentTarget.getAttribute("aria-expanded") === "true";
  event.currentTarget.setAttribute("aria-expanded", String(!expanded));
  help.hidden = expanded;
});

document.querySelectorAll("[data-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.getElementById(`${button.dataset.open}-modal`);
    if (dialog && typeof dialog.showModal === "function") dialog.showModal();
  });
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const mapDialog = document.querySelector("#map-lightbox");
const mapScroll = document.querySelector(".map-lightbox-scroll");
const mapZoomToggle = document.querySelector(".map-zoom-toggle");

document.querySelector("[data-map-open]").addEventListener("click", () => {
  mapScroll.classList.remove("zoomed");
  mapZoomToggle.textContent = "放大";
  mapZoomToggle.setAttribute("aria-pressed", "false");
  mapDialog.showModal();
});

document.querySelector("[data-map-close]").addEventListener("click", () => mapDialog.close());
mapZoomToggle.addEventListener("click", () => {
  const zoomed = mapScroll.classList.toggle("zoomed");
  mapZoomToggle.textContent = zoomed ? "縮小" : "放大";
  mapZoomToggle.setAttribute("aria-pressed", String(zoomed));
});

document.querySelector("[data-reveal]").addEventListener("click", (event) => {
  event.currentTarget.hidden = true;
  document.querySelector(".setlist").hidden = false;
});

document.querySelector(".share-button").addEventListener("click", async () => {
  const shareData = { title: document.title, text: "VAUNDY “HORO” TAIPEI 應援指南", url: window.location.href };
  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      if (error.name !== "AbortError") showToast("無法開啟分享功能，請複製網址分享。");
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("網址已複製，可以分享給朋友了。");
  } catch (error) {
    showToast("無法自動複製網址，請從瀏覽器網址列複製。");
  }
});

renderSongList();
renderRoute();
