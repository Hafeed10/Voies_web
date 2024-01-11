const speech = new SpeechSynthesisUtterance();
const textarea = document.querySelector("textarea");
const select = document.querySelector("select");
const button = document.querySelector("button");

const populateVoices = () => {
  select.innerHTML = "";
  window.speechSynthesis.getVoices().forEach(voice => {
    const option = new Option(voice.name, voice.lang);
    select.add(option);
  });
};

populateVoices();
window.speechSynthesis.onvoiceschanged = populateVoices;

button.addEventListener("click", () => {
  const voice = window.speechSynthesis.getVoices().find(v => v.lang === select.value);
  speech.voice = voice;
  speech.text = textarea.value;
  speech.onerror = event => console.error("Speech synthesis error:", event);
  speech.onend = () => console.log("Speech synthesis complete.");
  window.speechSynthesis.speak(speech);
});
