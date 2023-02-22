import React, { useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { Typography } from "@material-ui/core";
import NewsCards from "./components/NewsCards/NewsCards";

import wordsToNumbers from "words-to-numbers";

import useStyles from "./styles.js";
import logo from "./images/logo.png";

const alanLogoSrc =
  "https://alan.app/brand_assets/logo-horizontal/color/alan-logo-horizontal-color.png";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  const alanBtnRef = useRef({}).current;
  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtnRef.btnInstance.playText("Please Try that again!");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtnRef.btnInstance.playText("Opening...");
          }
        }
      },
    });
  }, [alanBtnRef]);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img src={alanLogoSrc} className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a
              className={classes.link}
              href="https://www.linkedin.com/in/ankitkumarmohanty/"
              target="_blank"
            >
              {" "}
              Ankit Kumar Mohanty
            </a>{" "}
            -
            <a
              className={classes.link}
              href="https://ankit-kumar-mohanty.netlify.app/"
              target="_blank"
            >
              {" "}
              Portfolio
            </a>
          </Typography>
          <img className={classes.image} src={logo} height="40px" alt="logo" />
        </div>
      ) : null}
    </div>
  );
};

export default App;
