import bell_icon from "./bell.png";
import home_icon from "./home.png";
import like_icon from "./like.png";
import loop_icon from "./loop.png";
import mic_icon from "./mic.png";
import next_icon from "./next.png";
import play_icon from "./play.png";
import pause_icon from "./pause.png";
import plays_icon from "./plays.png";
import prev_icon from "./prev.png";
import search_icon from "./search.png";
import shuffle_icon from "./shuffle.png";
import speaker_icon from "./speaker.png";
import stack_icon from "./stack.png";
import zoom_icon from "./zoom.png";
import plus_icon from "./plus.png";
import arrow_icon from "./arrow.png";
import mini_player_icon from "./mini-player.png";
import queue_icon from "./queue.png";
import volume_icon from "./volume.png";
import arrow_right from "./right_arrow.png";
import arrow_left from "./left_arrow.png";
import spotify_logo from "./spotify_logo.png";
import clock_icon from "./clock_icon.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";
import img7 from "./img7.jpg";
import img8 from "./img8.jpg";
import img9 from "./img9.jpg";
import img10 from "./img10.jpg";
import img11 from "./img11.jpg";
import img12 from "./img12.jpg";
import img13 from "./img13.jpg";
import img14 from "./img14.jpg";
import img15 from "./img15.jpg";
import img16 from "./img16.jpg";
import hookahbar from "./hookahbar.png"
import aajkiraaat from  "./aajkiraat.png"
import aayinhhi from  "./aay nhi.png"
import churakedilmeraa from  "./churakedilmera.png"
import libaas from  "./libaaas.png"
import tinkujiyaaa from  "./tinkujiya.png"
import uyi from  "./uyiummaa.png"
import ad from  "./admirin.png"
import rag from  "./ragragmei.png"
import b from  "./b.png"
import d from  "./dilmerekabtak.png"
import jadu from  "./jaduterinazar.png"
import terahuaa from  "./terahua.png"
import jabtaak from  "./jab tak.png"
import ajnaabi from  "./ajnabi.png"
import mg from  "./meiagar.png"
import ng from  "./nagada sang.png"
import aur from  "./aurkya.png"
import boones from  "./bones.png"
import br from  "./brown.png"
import cw from  "./chal waha.png"
import chammakk from  "./chammak.png" 
import dd from  "./darddilo.png"  
import sg from  "./shreeganesha.png"  
import dku from  "./dilkyumera.png"  
import g from  "./garbadhi.png"  
import h from  "./haiapna2.png"  
import hm from  "./huamei.png"  
import ek from  "./ekrasta.png"  
import jh from  "./joshhai.png"  
// Update audio imports to use public URLs
const song1 = '/audio/song1.mp3'
const song2 = '/audio/song2.mp3'
const song3 = '/audio/song3.mp3'
const aajkirat = '/audio/Aajkiraat.mp3'
const aayinhi = '/audio/aayinhi.mp3'
const churakedilmera = '/audio/churakedilmera.mp3'
const Admirin = '/audio/Admirin.mp3'
const hookahmar = '/audio/hookahmar.mp3'
const uyiumma = '/audio/uyiumma.mp3'
const libas = '/audio/libas.mp3'
const tinkujiya = '/audio/tinkujiya.mp3'
const rehena ='/audio/rehena.mp3'
const ragrag ='/audio/ragrag.mp3'
const dilbar ='/audio/dilbarmerekabtak.mp3'
const bachke='/audio/bachke.mp3'
const jaduteri ='/audio/jaduteri.mp3'
const terahua ='/audio/terahua.mp3'
const ajnabi ='/audio/ajnabi.mp3'
const jabtak ='/audio/jab tak.mp3'
const mak ='/audio/meinagarkahoon.mp3'
const nagada ='/audio/nagadasang.mp3'
const aurkya ='/audio/aurkya.mp3'
const bones ='/audio/bones.mp3'
const brown ='/audio/brown.mp3'
const chalwaha ='/audio/chalawaha.mp3'
const chammak ='/audio/chammak.mp3'
const darddilo ='/audio/darddilo.mp3'
const ganesh ='/audio/devashreeganesha.mp3'
const dil ='/audio/dilkyuyemera.mp3'
const gar ='/audio/gar.mp3'
const haiapni ='/audio/haiapni.mp3'
const huamai ='/audio/huamai.mp3'
const ikrasta ='/audio/ikrasta.mp3'
const josh ='/audio/josh.mp3'

export const assets = {
  bell_icon,
  home_icon,
  like_icon,
  loop_icon,
  mic_icon,
  next_icon,
  play_icon,
  plays_icon,
  prev_icon,
  search_icon,
  shuffle_icon,
  speaker_icon,
  stack_icon,
  zoom_icon,
  plus_icon,
  arrow_icon,
  mini_player_icon,
  volume_icon,
  queue_icon,
  pause_icon,
  arrow_left,
  arrow_right,
  spotify_logo,
  clock_icon,
};

export const albumsData = [
  {
    id: 0,
    name: "Top 50 Global",
    image: img8,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#2a4365",
  },
  {
    id: 1,
    name: "Top 50 India",
    image: img9,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#22543d",
  },
  {
    id: 2,
    name: "Trending India",
    image: img10,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#742a2a",
  },
  {
    id: 3,
    name: "Trending Global",
    image: img16,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#44337a",
  },
  {
    id: 4,
    name: "Mega Hits,",
    image: img11,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#234e52",
  },
  {
    id: 5,
    name: "Happy Favorites",
    image: img15,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#744210",
  },
];

export const songsData = [
  {
    id: 0,
    name: "Song One",
    image: img1,
    file: song1,
    desc: "Put a smile on your face with these happy tunes",
    duration: "3:00",
  },
  {
    id: 1,
    name: "Song Two",
    image: img2,
    file: song2,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:20",
  },
  {
    id: 2,
    name: "Song Three",
    image: img3,
    file: song3,
    desc: "Put a smile on your face with these happy tunes",
    duration: "2:32",
  },
  {
    id: 3,
    name: "Aaj ki raat",
    image: aajkiraaat,
    file: aajkirat,
    desc: "Aaj ki raat from stree 2",
    duration: "3:48",
  },
  {
    id: 4,
    name: "Aayi nhi",
    image: aayinhhi,
    file: aayinhi,
    desc: "Aayi nhi from stree 2",
    duration: "2:58",
  },
  {
    id: 5,
    name: "Chura ke dil mera",
    image: churakedilmeraa,
    file: churakedilmera,
    desc: "Chura Ke Dil Mera by Farhan Sabir ",
    duration: "7:57",
  },
  {
    id: 6,
    name: "Hookah Bar",
    image: hookahbar,
    file: hookahmar,
    desc: "Hookah Bar (Remixed By DJ A. Sen, DJ Amann Nagpal) by Himesh Reshammiya",
    duration: "3:22",
  },
  {
    id: 7,
    name: "Admirin",
    image: ad,
    file: Admirin,
    desc: "Admirin You (feat. Preston Pablo) by Karan Aujla, IKKY",
    duration: "3:34",
  },
  {
    id: 8,
    name: "Uyi Amma by Amitabh Bhattacharya",
    image: uyi,
    file: uyiumma,
    desc: "Uyi Amma by Amitabh Bhattacharya",
    duration: "4:13",
  },
  {
    id: 9,
    name: "Libaas",
    image: libaas,
    file: libas,
    desc: "Libaas Mp3 Song - Kaka",
    duration: "4:27",
  },
  {
    id: 10,
    name: "Tinku Jiya",
    image: tinkujiyaaa,
    file: tinkujiya,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:00",
  },
  {
    id: 11,
    name: "Rag-Rag-Mein-Is-Terha",
    image: rag,
    file: ragrag,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "7:32",
  },
  {
    id: 12,
    name: "Bachke Rehna Re Baba",
    image: b,
    file: bachke,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "6:25",
  },
  {
    id: 13,
    name: "Dil mere kab tak",
    image: d,
    file: dilbar,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "4:48",
  },
  {
    id: 14,
    name: "Jadu teri nazar",
    image: jadu,
    file: jaduteri,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "4:41",
  },
  {
    id: 15,
    name: "Tera Hua by Love yatri",
    image: terahuaa,
    file: terahua,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "3:34",
  },
  {
    id: 16,
    name: "06 Jab Tak (Redux) - MS Dhoni",
    image: jabtaak,
    file: jabtak,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "3:38",
  },
  {
    id: 17,
    name: "03. Aajnabee Mujhko Itna Bata",
    image: ajnaabi,
    file: ajnabi,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "6:13",
  },
  {
    id: 18,
    name: "Main Agar Kahoon",
    image: mg,
    file: mak,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:10",
  },
  {
    id: 19,
    name: "07 Nagada Sang Dol",
    image: ng,
    file: nagada,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "4:43",
  },
  {
    id: 20,
    name: "Aur Kya - Shahrukh Khan",
    image: aur,
    file: aurkya,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:03",
  },
  {
    id: 21,
    name: "Bones",
    image: boones,
    file: bones,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "2:45",
  },
  {
    id: 22,
    name: "Brown Rang International Villager ",
    image: br,
    file: brown,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "2:59",
  },
  {
    id: 23,
    name: "Chal Wahan Jaate Hain (Arijit Singh)",
    image: cw,
    file: chalwaha,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:26",
  },
  {
    id: 24,
    name: "Chammak-Challo",
    image: chammakk,
    file: chammak,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "4:05",
  },
  {
    id: 25,
    name: "Dard-Dilo-Ke",
    image: dd,
    file: darddilo,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:04",
  },
  {
    id: 26,
    name: "Deva Shree Ganesha",
    image: sg,
    file: ganesh,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:57",
  },
  {
    id: 27,
    name: "Dil-Kyun-Yeh-Mera-Shor-Kare",
    image: dku,
    file: dil,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:32",
  },
  {
    id: 28,
    name: "Garbadhi-Ananya-Bhat",
    image: g,
    file: gar,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "2:40",
  },
  {
    id: 29,
    name: "Hai Apna Dil Toh Awara",
    image: h,
    file: haiapni,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "4:24",
  },
  {
    id: 30,
    name: "Hua Main (Animal)",
    image: hm,
    file: huamai,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "4:37",
  },
  {
    id: 31,
    name: "Ik_Rasta_Hai_Zindagi_-_Kaala_Patthar",
    image: ek,
    file: ikrasta,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "5:17",
  },
  {
    id: 32,
    name: "Josh-Hai Mera Dil",
    image: jh,
    file: josh,
    desc: "Tinku Jiya T-Series || Bobby Deol, Sunny Deol, Nafisa Ali, Dharmendra",
    duration: "4:08",
  },
];
