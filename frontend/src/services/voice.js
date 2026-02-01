export function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.95;
  msg.pitch = 1;
  window.speechSynthesis.speak(msg);
}
