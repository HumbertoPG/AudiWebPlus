CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  price_mxn INT NOT NULL
);

INSERT INTO cars (brand, model, year, price_mxn)
VALUES
('Toyota','Yaris',2021,240000),
('Nissan','Versa',2022,270000)
ON CONFLICT DO NOTHING;