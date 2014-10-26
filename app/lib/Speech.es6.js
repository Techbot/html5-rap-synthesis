var startTime;

var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[0]; // Note: some voices don't support altering params
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10

msg.lang = 'en-US';

msg.onstart = () => {
  startTime = performance.now();
};

var calibrate = (word, cb) => {
  msg.text = word;
  speechSynthesis.speak(msg);

  msg.onend = () => {
    cb(performance.now() - startTime);
  };
};

var rap = (word, rate, cb) => {
  msg.text = word;
  msg.rate = rate;
  speechSynthesis.speak(msg);

  msg.onend = () => {
    cb(performance.now() - startTime);
  };
};

module.exports = {
  calibrate : calibrate,
  rap       : rap
};

var getVoicesInterval = setInterval(function() {
  voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    return;
  }
  clearInterval(getVoicesInterval);
  msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Fred'; })[0];
}, 500);