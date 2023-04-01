const ui = {
  style: {
    gradientBackgroundImage: {
      dark: {
        backgroundImage:
          "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
      },
      light: {
        backgroundImage:
          "linear-gradient(to top, rgba(245, 245, 245, 1), rgba(0, 0, 0, 0))",
      },
    },
    horizontalGradientBackgroundImage: {
      dark: {
        backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
      },
      light: {
        backgroundImage:
          "linear-gradient(to right, rgba(245, 245, 245, 1), rgba(0, 0, 0, 0))",
      },
    },
    typoLines: (lines: string, textAlign: string) => {
      return {
        display: "-webkit-box",
        overFlow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: lines,
        textAlign: textAlign || "justify",
      };
    },
    mainContent: {
      maxWidth: "1366px",
      margin: "auto",
      padding: 2,
    },
    backgroundImage: (imgPath: string) => {
      return {
        position: "relative",
        background: `darkgrey url(${imgPath}) center/cover`,
      };
    },
    size: {
      sidebarWidth: "300px",
      contentMaxWidth: "1366px",
    },
  },
};

export default ui;
