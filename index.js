// ACCESS DOM

const barFill = document.querySelector(".bar-fill");
const value = document.querySelector(".value");
const button = document.querySelector(".button");

// STATE

const state = {
  value: 0,
  mode: "not-initialized", // "initialized" "pause" "finished"
};

// RENDER

const render = () => {
  console.log(state);
  barFill.setAttribute("style", `width: ${state.value}%`);
  value.innerHTML = `<span>${Math.floor(state.value)}%</span>`;

  let text = getButtonText();
  button.innerHTML = `<span>${text}</span>`;
};

// FUNCTION

const getButtonText = () => {
  if (state.mode === "not-initialized") {
    return "START";
  }
  if (state.mode === "initialized") {
    return "PAUSE";
  }
  if (state.mode === "pause") {
    return "START";
  }
  if (state.mode === "finished") {
    return "RESET";
  }
};

let intervalId = undefined;

const getProgress = () => {
  if (state.value < 100) {
    state.value = state.value + 0.5;
    render();
  } else {
    state.mode = "finished";
    clearInterval(intervalId);
    render();
  }
};

const start = () => {
  state.mode = "initialized";
  intervalId = setInterval(getProgress, 10);
  render();
};

const pause = () => {
  state.mode = "pause";
  clearInterval(intervalId);
  render();
};

const reset = () => {
  state.mode = "not-initialized";
  state.value = 0;
  render();
};

const handleButtonClick = (event) => {
  if (state.mode === "not-initialized") {
    start();
    return;
  }
  if (state.mode === "initialized") {
    pause();
    return;
  }
  if (state.mode === "pause") {
    start();
    return;
  }
  if (state.mode === "finished") {
    reset();
    return;
  }
};

// EVENT

button.addEventListener("click", handleButtonClick);

// INITIAL RENDER

render();
