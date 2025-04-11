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
];
