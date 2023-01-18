document.addEventListener("click", (event) => {
  const element = event.target;
  const html = element.outerHTML;
  navigator.clipboard.writeText(html).then(
    () => {
      const element = event.target;
      let html = element.outerHTML;
      html = html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      navigator.clipboard.writeText(html).then(
        () => {
          console.log("HTML copied to clipboard");
          fetch("https://example.com/submit", {
            method: "POST",
            body: JSON.stringify({ html: html }),
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("HTML sent to API");
            })
            .catch((error) => {
              console.log("Error sending HTML to API:", error);
            });
        },
        () => {
          console.log("Failed to copy HTML");
        }
      );
    },
    () => {
      console.log("Failed to copy HTML");
    }
  );
});
