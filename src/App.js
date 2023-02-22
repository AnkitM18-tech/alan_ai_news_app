import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";

import useStyles from "./styles.js";

const alanLogoSrc =
  "https://alan.app/brand_assets/logo-horizontal/color/alan-logo-horizontal-color.png";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
        }
      },
    });
  }, []);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.logoContainer}>
        <img src={alanLogoSrc} className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} />
    </div>
  );
};

export default App;
