
CREATE TABLE IF NOT EXISTS meters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  ipAddress VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS readings (
  id SERIAL NOT NULL ,
  meter_id INT NOT NULL REFERENCES meters(id),
  reading INT NOT NULL,
  read_timestamp TIMESTAMP NOT NULL,
  PRIMARY KEY (meter_id, read_timestamp)
);

-- Insert a new meter
INSERT INTO meters(name, ipAddress)
    VALUES (?, ?);

-- Add a new timestamp based on a meter's name

INSERT INTO readings(reading, read_timestamp, meter_id)
    VALUES(?, ?, (SELECT id from meters WHERE name = ?));

-- Get all readings from a meter in a range

SELECT *
FROM meters m
INNER JOIN readings r ON m.id = r.meter_id
WHERE m.name = ? AND
  r.read_timestamp BETWEEN ? AND ?;

-- Checks for duplicate entries in the readings table
SELECT meter_id, read_timestamp, COUNT(*)
FROM readings
GROUP BY meter_id, read_timestamp
HAVING COUNT(*)>1
ORDER BY meter_id ASC ;