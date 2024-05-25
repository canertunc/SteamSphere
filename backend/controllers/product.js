// import functions from Produc model

import{
    getGames,
    getPositiveAndNegative,
    getDevelopersAndUserScore,
    getTagsUsageCount,
    getAvgForeverAndPlatform,
    getRecommendationsMetaCriticScore,
    getAboutTheGame,
    getSupportedLanguageTurkish,
    getPosBiggerThanNegAndTwoWeekBiggerThanAvg,
    getWebsite,
    getSupport,
    getPublishers,


} from "../models/ProductModel.js";


// get all products
export const showGames = (req,res) => {
    getGames((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


// get positive and negative and name
export const showPositiveAndNegative = (req,res) => {
    getPositiveAndNegative((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get game_name and developer name and top 10 user score
export const showDevelopersAndUserScore = (req,res) => {
    getDevelopersAndUserScore((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get usage count of tags in games
export const showTagsUsageCount = (req,res) => {
    getTagsUsageCount((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};


// get all platform equal to "True" and PlayTime Forever > 3000 of games
export const showAvgForeverAndPlatform = (req,res) => {
    getAvgForeverAndPlatform((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get Reccommendations avg(Reccommendations) and Metacritic score  > avg(Metacritic score) of games
export const showRecommendationsMetaCriticScore = (req,res) => {
    getRecommendationsMetaCriticScore((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get about the game includes 'Gun' keyword and name
export const showAboutTheGame = (req,res) => {
    getAboutTheGame((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get supported language name equal to Turkish and name
export const showSupportedLanguageTurkish = (req,res) => {
    getSupportedLanguageTurkish((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get positive bigger than negative and two week average playtime bigger than avg(two week average playtime)
export const showPosBiggerThanNegAndTwoWeekBiggerThanAvg = (req,res) => {
    getPosBiggerThanNegAndTwoWeekBiggerThanAvg((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get game name and website and price according to dlc_count and achievements bigger than 10
export const showWebsite = (req,res) => {
    getWebsite((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get game name with support email and url and publisher name
export const showSupport= (req,res) => {
    getSupport((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

// get publisher with group by with game count and average price
export const showPublishers= (req,res) => {
    getPublishers((err,results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
};