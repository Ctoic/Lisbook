// smoothCursor.js
export class SmoothCursor {
  constructor() {
    this.circles = document.querySelectorAll(".circle");
    this.logo = document.querySelector(".logo"); // Assuming the logo has a class "logo"
    this.coords = { x: 0, y: 0 };
    this.colors = [
      "#a7e078",
      "#9dd36c",
      "#94c760",
      "#8abc55",
      "#80b14b",
      "#76a640",
      "#6cbf58",
      "#62a24d",
      "#579643",
      "#4e8a3b",
      "#458132",
      "#3b752a",
      "#336824",
      "#2c9137",
      "#23802c",
      "#1f7628",
      "#1b6c25",
      "#121212",
      "#0f0f0f",
      "#2b2b2b",
      "#1e1e1e",
      "#1a1a1a",
    ];

    this.initialize();
  }

  initialize() {
    if (this.logo) {
      const { left, top, width, height } = this.logo.getBoundingClientRect();
      this.coords.x = left + width / 2; // Center of the logo horizontally
      this.coords.y = top + height / 2; // Center of the logo vertically
    }

    this.setCircleColors();
    this.trackMouseMovement();
    this.animateCircles();
  }

  setCircleColors() {
    this.circles.forEach((circle, index) => {
      circle.style.backgroundColor = this.colors[index % this.colors.length];
      circle.x = 0;
      circle.y = 0;
    });
  }

  trackMouseMovement() {
    document.addEventListener("mousemove", (e) => {
      this.coords.x = e.clientX;
      this.coords.y = e.clientY;
    });
  }

  animateCircles() {
    const animate = () => {
      let { x, y } = this.coords;

      this.circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.transform = `scale(${
          (this.circles.length - index) / this.circles.length
        })`;

        const nextCircle = this.circles[index + 1] || this.circles[0];
        x += (nextCircle.x - x) * 0.2;
        y += (nextCircle.y - y) * 0.2;

        circle.x = x;
        circle.y = y;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }
}
