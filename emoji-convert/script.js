const input = document.querySelector("#emoji-input");

const textRegex = /(\s|^)(:D|:\)|:\()(\s|$|,|.|-|\)|'|"|\?|!)/;
const emojiRegex = /(\s|^)(😂|🙂|🙁)(\s|$|,|.|-|\)|'|"|\?|!)/;

const showOutput = (output) => {
  const outputSpan = document.querySelector("#output-span");
  outputSpan.innerHTML = output;
  input.value = "";
};

const convertTextToEmoji = (text) => {
  if (textRegex.test(text)) {
    const output = text
      .slice()
      .replace(textRegex, (_match, prefix, emoji, suffix) => {
        switch (emoji) {
          case ":D":
            return `${prefix}😂${suffix}`;
            break;
          case ":)":
            return `${prefix}🙂${suffix}`;
            break;
          case ":(":
            return `${prefix}🙁${suffix}`;
            break;
        }
      });
    showOutput(output);
    convertTextToEmoji(output);
  }
};

const convertEmojiToText = (text) => {
  if (emojiRegex.test(text)) {
    const output = text
      .slice()
      .replace(emojiRegex, (_match, prefix, emoji, suffix) => {
        console.log(emoji);
        switch (emoji) {
          case "😂":
            return `${prefix}:D${suffix}`;
            break;
          case "🙂":
            return `${prefix}:)${suffix}`;
            break;
          case "🙁":
            return `${prefix}:(${suffix}`;
            break;
        }
      });
    showOutput(output);
    convertEmojiToText(output);
  }
};

const convertBtn = document.querySelector("#convert-btn");

convertBtn.addEventListener("click", () => {
  const textOrEmoji = document.querySelector(
    "#text-emoji-vs-normal-emoji"
  ).value;
  if (textOrEmoji === "text") {
    convertTextToEmoji(input.value);
  }
  if (textOrEmoji === "emoji") {
    convertEmojiToText(input.value);
  }
});

function onPageContentChange() {
  console.log("change of page content happened");
}

// Create a new MutationObserver and pass in the callback function
const observer = new MutationObserver(onPageContentChange);

// Define the target node (in this case, the entire body) and the options
const targetNode = document.body;
const config = { childList: true, subtree: true, characterData: true };

// Start observing the target node with the specified configuration
setTimeout(() => {
  observer.observe(targetNode, config);
}, 100);
