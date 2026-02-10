<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
/* ==============================================
API: v1.0
    -#01 Regions
    -#02 Départements
    -#03 Communes
    -#04 Parametres
    -#05 Conformités
    -#06 Résultats
    -#07 Prélèvements
    -#08 Recharches
    -#09 Stats
================================================ */

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

$app->options('/{routes:.+}', function($request, $response, $args)
{
    return $response;
});

$app->add(function($req, $res, $next)
{
    $response = $next($req, $res);
    return $response->withHeader('Access-Control-Allow-Origin', '*')->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

/* ==============================================
    #01 - Regions
============================================== */

// Get Regions Count
$app->get('/regions/count', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM `dis_reg_2022` WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $result = $stmt->rowCount();
        $db = null;
        echo '{"status": 200,"count": '.$result.'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Regions
$app->get('/regions', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM `dis_reg_2022` WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"regions": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

/* ==============================================
    #02 - Departements
============================================== */

// Get Departements Count
$app->get('/departements/count', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM dis_dep_2022 WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $result = $stmt->rowCount();
        $db = null;
        echo '{"status": 200,"count": '.$result.'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Departements
$app->get('/departements', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM dis_dep_2022 WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"departements": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

/* ==============================================
    #03 - Communes
============================================== */

// Get Commmunes Count
$app->get('/communes/count', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM `com_2024` WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $result = $stmt->rowCount();
        $db = null;
        echo '{"status": 200,"count": '.$result.'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Communes
$app->get('/communes', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM `com_2024` WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"communes": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Communes By Region
$app->get('/communes/region/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM com_2024 WHERE REG=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"communes": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Communes By Departement
$app->get('/communes/departement/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM com_2024 WHERE DEP=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"communes": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Communes By Postal
$app->get('/communes/postal/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM com_2024 WHERE POSTAL=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"communes": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Communes By Insee
$app->get('/communes/insee/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM com_2024 WHERE INSEE=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"communes": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

/* ==============================================
    #04 - Parametres
============================================== */

// Get Parametres Count
$app->get('/parametres/count', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM dis_par_2022 WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $result = $stmt->rowCount();
        $db = null;
        echo '{"status": 200,"count": '.$result.'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Parametres
$app->get('/parametres', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM dis_par_2022 WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"parametres": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

/* ==============================================
    #05 - Conformités
============================================== */

// Get Conformités Count
$app->get('/conformites/count', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM test_cnf WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $result = $stmt->rowCount();
        $db = null;
        echo '{"status": 200,"count": '.$result.'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Conformités
$app->get('/conformites', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM test_cnf WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"conformites": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});


// Get Conformités By Region
$app->get('/conformites/region/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM test_cnf WHERE REG=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"conformites": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});


// Get Conformités By Departement
$app->get('/conformites/departement/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM test_cnf WHERE DEP=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"conformites": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});


// Get Conformités By Postal
$app->get('/conformites/postal/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM test_cnf WHERE POSTAL=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"conformites": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});


// Get Conformités By Insee
$app->get('/conformites/insee/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    
    // Use a prepared statement to avoid SQL injection
    $sql = "SELECT * FROM test_cnf WHERE INSEE = :code";
    
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        
        // Prepare the statement
        $stmt = $db->prepare($sql);
        
        // Bind the parameter
        $stmt->bindParam(':code', $code, PDO::PARAM_STR); // Use PDO::PARAM_STR for varchar
        
        // Execute the statement
        $stmt->execute();
        
        // Fetch all results
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        
        $db = null;
        
        // Return the response
        echo '{"status": 200,"conformites": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});
/* ==============================================
    #06 - Resultats
============================================== */

// Get Resultats Count
$app->get('/resultats/count', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM dis_res_2024 WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $result = $stmt->rowCount();
        $db = null;
        echo '{"status": 200,"count": '.$result.'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Resultats
$app->get('/resultats', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM dis_res_2024 WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"resultats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});


// Get Resultats By Region
$app->get('/resultats/region/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM dis_res_2024 WHERE REG=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"resultats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});


// Get Resultats By Departement
$app->get('/resultats/departement/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM dis_res_2024 WHERE DEP=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"resultats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});


// Get Resultats By Postal
$app->get('/resultats/postal/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');
    $sql = "SELECT * FROM dis_res_2024 WHERE POSTAL=$code";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"resultats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});



// Get Resultats By Insee
$app->get('/resultats/insee/{code}', function(Request $request, Response $response)
{
    $code  = $request->getAttribute('code');

    // Use a prepared statement to avoid SQL injection
    $sql = "SELECT * FROM dis_res_2024 WHERE INSEE = :code";

    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");

        // Prepare the statement
        $stmt = $db->prepare($sql);

        // Bind the parameter
        $stmt->bindParam(':code', $code, PDO::PARAM_STR); // Use PDO::PARAM_STR for varchar

        // Execute the statement
        $stmt->execute();

        // Fetch all results
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Return the response
        echo '{"status": 200,"resultats": ' . json_encode($rows, JSON_UNESCAPED_UNICODE) . '}';
    } catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !", "error": "' . $e->getMessage() . '"}';
    }
});
// Get Resultats Derniers 12 Mois par commune
$request = json_decode(file_get_contents("php://input"), true);
$app->post('/resultats', function(Request $request, Response $response)
{
    // Extract parameters from the request body
    $data = $request->getParsedBody();
    $code = isset($data['code']) ? $data['code'] : null;

    // Validate parameters if needed
    if (!$code) {
        return $response->withJson([
            'status' => 400,
            'message' => 'Missing parameters'
        ], 400);
    }

    // Use a prepared statement to avoid SQL injection
    $sql = "SELECT * FROM dis_prod_12_mois WHERE dis_prod_12_mois.INSEE = :code ORDER BY dis_prod_12_mois.DATE DESC";

    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");

        // Prepare the statement
        $stmt = $db->prepare($sql);

        // Bind the parameter
        $stmt->bindParam(':code', $code, PDO::PARAM_STR); // Use PDO::PARAM_STR for varchar

        // Execute the statement
        $stmt->execute();

        // Fetch all results
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        // Return the response
        echo '{"status": 200,"resultats": ' . json_encode($rows, JSON_UNESCAPED_UNICODE) . '}';
    } catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !", "error": "' . $e->getMessage() . '"}';
    }
});
/* ==============================================
    #07 - Prélèvements

    ============================================== */

// Get Prélèvements
$app->post('/prelevements', function(Request $request, Response $response)
{
    $code  = $request->getParam('code');
    $parametre  = $request->getParam('parametre');
    $sql = "SELECT * FROM dis_plv_2022 WHERE INSEE='$code' and CODEPAR='$parametre' ORDER BY DATEPLV DESC";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"resultats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !'.$e.'"}';
    }
});

/* ==============================================
    #08 - Recherches
============================================== */

// Get Recherches
$app->get('/recherches', function(Request $request, Response $response)
{
    $sql = "SELECT * FROM dis_rec_2022 WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"stats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Recherches By Region
$app->post('/recherches/regions', function(Request $request, Response $response)
{
    $start  = $request->getParam('start');
    $end  = $request->getParam('end');
    $code  = $request->getParam('code');
    $sql = "SELECT source, count(*) as total FROM dis_rec_2022 WHERE DATE BETWEEN '$start' AND '$end' AND REG='$code' GROUP BY SOURCE";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"stats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Recherches By Departement
$app->post('/recherches/departements', function(Request $request, Response $response)
{
    $start  = $request->getParam('start');
    $end  = $request->getParam('end');
    $code  = $request->getParam('code');
    $sql = "SELECT source, count(*) as total FROM dis_rec_2022 WHERE DATE BETWEEN '$start' AND '$end' AND DEP='$code' GROUP BY SOURCE";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"stats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Get Recherches By Postal
$app->post('/recherches/postal', function(Request $request, Response $response)
{
    $start  = $request->getParam('start');
    $end  = $request->getParam('end');
    $code  = $request->getParam('code');
    $sql = "SELECT source, count(*) as total FROM dis_rec_2022 WHERE DATE BETWEEN '$start' AND '$end' AND POSTAL='$code' GROUP BY SOURCE";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        echo '{"status": 200,"stats": '.json_encode($rows, JSON_UNESCAPED_UNICODE).'}';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}';
    }
});

// Add Recherches 
$app->post('/recherches/create', function(Request $request, Response $response)
{
    $search  = $request->getParam('search');
    $ip  = $request->getParam('ip');
    $source  = $request->getParam('source');
    $search2 = explode(" - ", $search);
    $postal = $search2[0];
     $sql = "SELECT DEP, REG FROM com_2024 WHERE POSTAL = '$postal' LIMIT 1";
     $sql2 = "INSERT INTO dis_rec_2022 (DEP, REG, RECHERCHE, IP, SOURCE, POSTAL) VALUES (:dep, :reg, :search, :ip, :source, :postal)";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $row = $stmt->fetchAll(PDO::FETCH_OBJ);
        $DEP = $row[0]->DEP;
        $REG = $row[0]->REG;
        $stmt2 = $db->prepare($sql2);
        $stmt2->bindParam(':dep', $DEP);
        $stmt2->bindParam(':reg', $REG);
        $stmt2->bindParam(':search', $search);
        $stmt2->bindParam(':ip', $ip);
        $stmt2->bindParam(':source', $source);
        $stmt2->bindParam(':postal', $postal);
        $stmt2->execute();
        $db = null;
        echo '{"status": 200,"stats": "enregistrement ajouté avec succès !" }';
    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !'.$e.'"}';
    }
});

/* ==============================================
    #09 - Stats
============================================== */

// Get Stats
$app->get('/stats', function(Request $request, Response $response)
{
    $sql = "SELECT SUM(TOTAL) as TOTAL, SUM(CBL) as CBL FROM test_cnf WHERE 1";
    try {
        $db = new db();
        $db = $db->connect();
        $db->exec("set names utf8");
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_OBJ);
        $TOTAL = $rows[0]->TOTAL;
        $CBL = $rows[0]->CBL;
        $score = ($CBL/($TOTAL)*100);
        $db = null;
        echo '{"status": 200,"stats": '.number_format($score, 1).'}';

    }
    catch (PDOException $e) {
        echo '{"status": 400,"message": "impossible de se connecter à la base de données !"}'.$e;
    }
});

$app->get('/miseajour', function(Request $request, Response $response) {
    $db = (new db())->connect();
    $db->exec("set names utf8");

    $sql = "SELECT MAX(`DATE`) as max_date FROM test_cnf";
    $result = $db->query($sql)->fetch(PDO::FETCH_ASSOC);

    $response->getBody()->write(json_encode([
        'status' => 200,
        'date' => $result['max_date'] ?? null  // Handles null case
    ]));

    return $response->withHeader('Content-Type', 'application/json');
});

