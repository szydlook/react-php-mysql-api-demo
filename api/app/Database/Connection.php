<?php
namespace API\Database;
use Mysqli;

class Connection extends Mysqli {
    private const HOST = "mysql10.mydevil.net";
    private const DATABASE = "m1318_react_php";
    private const USER = "m1318_react_php";
    private const PASSWORD = "";

    public function __construct() {
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
        parent::__construct(self::HOST, self::USER, self::PASSWORD, self::DATABASE);
        $this->set_charset("utf8mb4");
    }
}