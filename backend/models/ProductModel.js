// import connection
import db from "../config/database.js";

// get all products
export const getGames = (result) => {
    db.query("SELECT * FROM steam_data.games", (err,results) => {

        if (err) {
            console.log(err);
            result(err,null);
        }else {
            result(null,results);
        }
    });
};


export const getPositiveAndNegative = (result) => {
    const query = `
        SELECT steam_data.games.name, sa.positive, sa.negative 
        FROM steam_data.games
        JOIN steam_data.sentiment_analysis sa ON steam_data.games.game_id = sa.game_id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


export const getDevelopersAndUserScore = (result) => {
    const query = `
        SELECT games.name, s.user_score, d.developer_name
        FROM games
        JOIN scores s ON games.game_id = s.game_id 
        JOIN developers_has_games dhg ON games.game_id = dhg.game_id 
        JOIN developers d ON dhg.developer_id = d.developer_id 
        ORDER BY s.user_score DESC 
        LIMIT 10
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getTagsUsageCount = (result) => {
    const query = `
        SELECT t.tag_name, COUNT(ght.tag_id) AS usage_count
        FROM tags t
        JOIN games_has_tags ght ON t.tag_id = ght.tag_id
        GROUP BY t.tag_name
        ORDER BY usage_count DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getAvgForeverAndPlatform = (result) => {
    const query = `
        SELECT g.name, 
            ps.avg_playtime_forever
        FROM games g
        JOIN platform_compatibility pc ON g.game_id = pc.game_id
        JOIN playtime_statistics ps ON g.game_id = ps.game_id
        WHERE pc.mac = 'True' 
            AND pc.linux = 'True' 
            AND pc.windows = 'True'
            AND ps.avg_playtime_forever > 3000
        ORDER BY ps.avg_playtime_forever DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


export const getRecommendationsMetaCriticScore = (result) => {
    const query = `
        SELECT games.name, s.metacritic_score, ci.recommendations
        FROM games
        JOIN scores s ON games.game_id = s.game_id
        JOIN community_interaction ci ON games.game_id = ci.game_id
        WHERE s.metacritic_score > (SELECT AVG(metacritic_score) FROM scores) and ci.recommendations > (SELECT AVG(recommendations) FROM community_interaction)
        ORDER BY ci.recommendations DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


export const getAboutTheGame = (result) => {
    const query = `
        SELECT games.name, ac.about_the_game
        FROM games
        JOIN additional_content ac ON games.game_id = ac.game_id
        WHERE ac.about_the_game LIKE '%Gun%'
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


export const getSupportedLanguageTurkish = (result) => {
    const query = `
        SELECT games.name,sl.supported_language_name
        FROM games
        JOIN games_has_supported_languages ghsl ON games.game_id = ghsl.game_id
        JOIN supported_languages sl ON sl.supported_language_id = ghsl.supported_language_id
        WHERE sl.supported_language_name = 'Turkish'
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getPosBiggerThanNegAndTwoWeekBiggerThanAvg = (result) => {
    const query = `
        SELECT g.name, 
               sa.positive, 
               sa.negative, 
               p.publisher_name, 
               ps.avg_playtime_two_weeks
        FROM games g
        JOIN sentiment_analysis sa ON g.game_id = sa.game_id
        JOIN playtime_statistics ps ON g.game_id = ps.game_id
        JOIN developers_has_games dhg ON dhg.game_id = g.game_id
        JOIN developers d ON d.developer_id = dhg.developer_id
        JOIN publishers_has_games phg ON phg.game_id = g.game_id
        JOIN publishers p ON p.publisher_id = phg.publisher_id
        CROSS JOIN (
            SELECT AVG(ps.avg_playtime_two_weeks) AS avg_playtime_two_weeks_avg
            FROM playtime_statistics ps
        ) apv
        WHERE ps.avg_playtime_two_weeks > apv.avg_playtime_two_weeks_avg
        GROUP BY g.name, sa.positive, sa.negative, p.publisher_name, ps.avg_playtime_two_weeks
        HAVING sa.positive > sa.negative
        ORDER BY ps.avg_playtime_two_weeks DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getWebsite = (result) => {
    const query = `
        WITH GameScores AS (
            SELECT g.game_id, g.name, g.price, da.dlc_count, da.achievements, ma.website
            FROM games g
            JOIN dlc_achievements da ON da.game_id = g.game_id
            JOIN meta_data ma ON ma.game_id = g.game_id
        )
        SELECT gs.*
        FROM GameScores gs
        WHERE gs.dlc_count > 10 AND gs.achievements > 10
        ORDER BY gs.price DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getSupport = (result) => {
    const query = `
        SELECT games.game_id,games.name, support.support_url, support.support_email, GROUP_CONCAT(publishers.publisher_name) AS publisher_names
        FROM games
        INNER JOIN support ON games.game_id = support.game_id
        LEFT JOIN publishers_has_games phg ON games.game_id = phg.game_id
        LEFT JOIN publishers ON phg.publisher_id = publishers.publisher_id
        GROUP BY games.game_id
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

export const getPublishers = (result) => {
    const query = `
    SELECT 
        publishers.publisher_id,
        publishers.publisher_name,
        COUNT(DISTINCT games.game_id) AS game_count,
        AVG(games.price) AS average_price
    FROM 
        publishers
    INNER JOIN 
        publishers_has_games ON publishers.publisher_id = publishers_has_games.publisher_id
    INNER JOIN 
        games ON publishers_has_games.game_id = games.game_id
    GROUP BY 
        publishers.publisher_id, publishers.publisher_name
    ORDER BY 
        game_count DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};


