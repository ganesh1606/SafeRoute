export function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  speechSynthesis.speak(msg);
}
