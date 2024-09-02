$().ready(() => {
  const textRegex = /(\s|^)(:D|:\)|:\()(\s|$|,|.|-|\)|'|"|\?|!)/;
  const emojiRegex = /(\s|^)(😂|🙂|🙁)(\s|$|,|.|-|\)|'|"|\?|!)/;

  const showOutput = (output) => {
    const outputEl = $(".output");
    outputEl.text(output);
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
      return;
    }
    if (text !== "") {
      showOutput(text);
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
      return;
    }
    if (text) {
      showOutput(text);
    }
  };

  $(".convert-btn").on("click", () => {
    $(".output").text("");
    const textOrEmoji = $("#text-emoji-vs-normal-emoji").val();
    if (textOrEmoji === "text") {
      convertTextToEmoji($("#emoji-input").val());
    }
    if (textOrEmoji === "emoji") {
      convertEmojiToText($("#emoji-input").val());
    }
  });
});

$(".paste-btn").on("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    $("textarea").val(text);
    console.log("paste worked");
  } catch (error) {
    console.error("Failed to read from clipboard", error);
  }
});
