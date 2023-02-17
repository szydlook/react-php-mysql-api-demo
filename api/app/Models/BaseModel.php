<?php
namespace API\Models;
use API\Database\Connection;

class BaseModel {
    protected $connection;
    protected $table;

    public function __construct($table) {
        $this->table = $table;
        $this->connection = new Connection() or die(json_encode(["status" => "error", "message" => $this->connection->connect_error]));
    }

    public function getAll() {
        try {
            $statement = $this->connection->prepare("SELECT * FROM $this->table ORDER BY sku");
            $statement->execute();
            $result = $statement->get_result()->fetch_all(MYSQLI_ASSOC);
            $statement->close();
            return $result;
        } catch (\mysqli_sql_exception $e) {
            die(json_encode(["status" => "error", "message" => $e->getMessage()]));
        }
    }

    public function delete($ids) {
        $in  = str_repeat("?,", count($ids) - 1) . "?";
        $types = str_repeat("d", count($ids));

        try {
            $statement = $this->connection->prepare("DELETE FROM $this->table WHERE id IN ($in)");
            $statement->bind_param($types, ...$ids);
            $statement->execute();
            $statement->close();
            return ["status" => "success", "message" => "Records deleted successfully"];
        } catch (\mysqli_sql_exception $e) {
            die(json_encode(["status" => "error", "message" => $e->getMessage()]));
        }
    }
}