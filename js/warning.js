//WARNING//
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      const message = document.getElementById("important-message");
      message.style.display = "block";
      let opacity = 0;
      const timer = setInterval(() => {
        opacity += 0.05;
        message.style.opacity = opacity;
        if (opacity >= 1) {
          clearInterval(timer);
        }
      }, 50);
    }, 2000);
    document.querySelector(".close").addEventListener("click", function() {
      const message = document.getElementById("important-message");
      message.style.opacity = 0;
      setTimeout(() => {
        message.style.display = "none";
      }, 500);
    });
  });