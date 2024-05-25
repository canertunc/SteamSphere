//import express
import express from "express";
import db from "../config/database.js";

//import functions from controller
import {
  showGames,
  showPositiveAndNegative,
  showDevelopersAndUserScore,
  showTagsUsageCount,
  showAvgForeverAndPlatform,
  showRecommendationsMetaCriticScore,
  showAboutTheGame,
  showSupportedLanguageTurkish,
  showPosBiggerThanNegAndTwoWeekBiggerThanAvg,
  showWebsite,
  showSupport,
  showPublishers,


} from "../controllers/product.js";

//init express router
const router = express.Router();

//get all product
router.get("/games", showGames);

//get positive and negative and names
router.get("/posandneg", showPositiveAndNegative);

// get game_name and developer name and top 10 user score
router.get("/devandscore", showDevelopersAndUserScore);

// get usage count of tags in games
router.get("/tagsusagecount", showTagsUsageCount);

// get all platform equal to "True" and PlayTime Forever > 3000 of games
router.get("/avgplatform", showAvgForeverAndPlatform);

// get Reccommendations avg(Reccommendations) and Metacritic score  > avg(Metacritic score) of games
router.get("/recmet", showRecommendationsMetaCriticScore);

// get about the game includes 'Gun' keyword and name
router.get("/aboutgamegun", showAboutTheGame);

// get supported language name equal to Turkish and name
router.get("/languageturkish", showSupportedLanguageTurkish);

// get positive bigger than negative and two week average playtime bigger than avg(two week average playtime)
router.get("/posnegtwoweek", showPosBiggerThanNegAndTwoWeekBiggerThanAvg);

// get game name and website and price according to dlc_count and achievements bigger than 10
router.get("/website", showWebsite);

// get game name with support email and url and publisher name
router.get("/support", showSupport);

// get game name with support email and url and publisher name
router.get("/publishers", showPublishers);

router.get("/datesstart", (req, res) => {
  try {
      const startDate = req.query.startDate;

      const query = `SELECT * FROM games WHERE release_date >= '${startDate}'`;
      db.query(query, (error, results) => {
          if (error) {
              console.error('Sorgu hatası:', error);
              res.status(500).json({ error: 'Sorgu hatası' });
              return;
          }
          res.json(results);
      });
  } catch (err) {
      console.error('İstek hatası:', err);
      res.status(500).json({ error: 'İstek hatası' });
  }
});


router.get("/datesfinish", (req, res) => {
  try {
      const finishDate = req.query.finishDate;

      const query = `SELECT * FROM games WHERE release_date <= '${finishDate}'`;
      db.query(query, (error, results) => {
          if (error) {
              console.error('Sorgu hatası:', error);
              res.status(500).json({ error: 'Sorgu hatası' });
              return;
          }
          res.json(results);
      });
  } catch (err) {
      console.error('İstek hatası:', err);
      res.status(500).json({ error: 'İstek hatası' });
  }
});

router.get("/pricestart", (req, res) => {
  try {
      const startPrice = req.query.startPrice;

      const query = `SELECT * FROM games WHERE price >= '${startPrice}'`;
      db.query(query, (error, results) => {
          if (error) {
              console.error('Sorgu hatası:', error);
              res.status(500).json({ error: 'Sorgu hatası' });
              return;
          }
          res.json(results);
      });
  } catch (err) {
      console.error('İstek hatası:', err);
      res.status(500).json({ error: 'İstek hatası' });
  }
});

router.get("/pricefinish", (req, res) => {
  try {
      const finishPrice = req.query.finishPrice;

      const query = `SELECT * FROM games WHERE price <= '${finishPrice}'`;
      db.query(query, (error, results) => {
          if (error) {
              console.error('Sorgu hatası:', error);
              res.status(500).json({ error: 'Sorgu hatası' });
              return;
          }
          res.json(results);
      });
  } catch (err) {
      console.error('İstek hatası:', err);
      res.status(500).json({ error: 'İstek hatası' });
  }
});

router.get("/categorygames", (req, res) => {
  try {
      const chooseCategory = req.query.chooseCategory;

      const query = `
      SELECT g.*, c.category_name
      FROM games g
      INNER JOIN category_has_games ghs ON g.game_id = ghs.game_id
      INNER JOIN category c ON ghs.category_id = c.category_id
      WHERE c.category_name = '${chooseCategory}'
      `;
      
      db.query(query, (error, results) => {
          if (error) {
              console.error('Sorgu hatası:', error);
              res.status(500).json({ error: 'Sorgu hatası' });
              return;
          }
          res.json(results);
      });
  } catch (err) {
      console.error('İstek hatası:', err);
      res.status(500).json({ error: 'İstek hatası' });
  }
});

router.get("/genregames", (req, res) => {
    try {
        const chooseGenre = req.query.chooseGenre;
  
        const query = `
        SELECT g.*, gr.genre_name
        FROM games g
        INNER JOIN genres_has_games ghg ON g.game_id = ghg.game_id
        INNER JOIN genres gr ON ghg.genre_id = gr.genre_id
        WHERE gr.genre_name = '${chooseGenre}'
        `;
        
        db.query(query, (error, results) => {
            if (error) {
                console.error('Sorgu hatası:', error);
                res.status(500).json({ error: 'Sorgu hatası' });
                return;
            }
            res.json(results);
        });
    } catch (err) {
        console.error('İstek hatası:', err);
        res.status(500).json({ error: 'İstek hatası' });
    }
  });

router.get("/supportedlanguagegames", (req, res) => {
try {
    const chooseLanguage = req.query.chooseLanguage;

    const query = `
    SELECT g.*, sl.supported_language_name
    FROM games g
    INNER JOIN games_has_supported_languages ghsl ON g.game_id = ghsl.game_id
    INNER JOIN supported_languages sl ON ghsl.supported_language_id = sl.supported_language_id
    WHERE sl.supported_language_name = '${chooseLanguage}'
    `;
    
    db.query(query, (error, results) => {
        if (error) {
            console.error('Sorgu hatası:', error);
            res.status(500).json({ error: 'Sorgu hatası' });
            return;
        }
        res.json(results);
    });
} catch (err) {
    console.error('İstek hatası:', err);
    res.status(500).json({ error: 'İstek hatası' });
}
});


router.get("/gameid", (req, res) => {
    try {
        const chooseGameId = req.query.chooseGameId;
    
        const query = `SELECT * FROM games WHERE game_id = '${chooseGameId}'`;

        
        db.query(query, (error, results) => {
            if (error) {
                console.error('Sorgu hatası:', error);
                res.status(500).json({ error: 'Sorgu hatası' });
                return;
            }
            res.json(results);
        });
    } catch (err) {
        console.error('İstek hatası:', err);
        res.status(500).json({ error: 'İstek hatası' });
    }
    });

router.get("/gamename", (req, res) => {
    try {
        const chooseGameName = req.query.chooseGameName;
    
        const query = `SELECT * FROM games WHERE name = '${chooseGameName}'`;

        
        db.query(query, (error, results) => {
            if (error) {
                console.error('Sorgu hatası:', error);
                res.status(500).json({ error: 'Sorgu hatası' });
                return;
            }
            res.json(results);
        });
    } catch (err) {
        console.error('İstek hatası:', err);
        res.status(500).json({ error: 'İstek hatası' });
    }
    });

router.get("/gameplatform", (req, res) => {
    try {
        const chooseGamePlatform = req.query.chooseGamePlatform;
        const gamePlatforms = chooseGamePlatform.split(',');

        const platformConditions = gamePlatforms.map(gamePlatform => {
            if (gamePlatform === 'windows' || gamePlatform === 'mac' || gamePlatform === 'linux') {
                return `${gamePlatform} = 'True'`;
            } else {
                // Platform listede yoksa False yap
                return `${gamePlatform} = 'False'`;
            }
        });

        if(!gamePlatforms.includes("windows")) {
            platformConditions.push("windows = 'False'");
        }
        if(!gamePlatforms.includes("mac")) {
            platformConditions.push("mac = 'False'");
        }
        if(!gamePlatforms.includes("linux")) {
            platformConditions.push("linux = 'False'");
        }

        const whereClause = platformConditions.join(' AND ');

        const query = `
            SELECT games.*, platform_compatibility.*
            FROM games
            INNER JOIN platform_compatibility ON games.game_id = platform_compatibility.game_id
            WHERE ${whereClause}
        `;

        db.query(query, (error, results) => {
            if (error) {
                console.error('Sorgu hatası:', error);
                res.status(500).json({ error: 'Sorgu hatası' });
                return;
            }
            res.json(results);
        });
    } catch (err) {
        console.error('İstek hatası:', err);
        res.status(500).json({ error: 'İstek hatası' });
    }
});


router.get("/aboutthegame", (req, res) => {
    try {
        const chooseAbout = req.query.chooseAbout;
    
        const query = `
            SELECT games.*, ac.about_the_game
            FROM games
            JOIN additional_content ac ON games.game_id = ac.game_id
            WHERE ac.about_the_game LIKE '%${chooseAbout}%'
        `;
        
        db.query(query, (error, results) => {
            if (error) {
                console.error('Sorgu hatası:', error);
                res.status(500).json({ error: 'Sorgu hatası' });
                return;
            }
            res.json(results);
        });
    } catch (err) {
        console.error('İstek hatası:', err);
        res.status(500).json({ error: 'İstek hatası' });
    }
    });



    




//export default router
export default router;