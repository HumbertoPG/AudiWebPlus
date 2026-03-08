INSERT INTO car_models (
  model_name,
  model_year,
  base_price,
  description,
  main_image_url,
  fuel_capacity,
  horse_power,
  v_max,
  acceleration,
  cylinders,
  fuel_type
)
SELECT
  'Audi A3 Sedan',
  2024,
  799900.00,
  'Sedán compacto premium con enfoque urbano y deportivo.',
  'https://example.com/a3-sedan.jpg',
  50,
  150,
  232,
  8.4,
  4,
  'gasolina'
WHERE NOT EXISTS (
  SELECT 1
  FROM car_models
  WHERE model_name = 'Audi A3 Sedan' AND model_year = 2024
);

INSERT INTO model_configurations (
  car_model_id,
  configuration_name,
  price,
  description,
  equipment,
  fuel_type,
  image_url,
  trunk_volume,
  acceleration
)
SELECT
  cm.id_car_model,
  'Select',
  799900.00,
  'Versión base bien equipada.',
  'Pantalla táctil, rines de aluminio, sensores de reversa',
  'gasolina',
  'https://example.com/a3-select.jpg',
  425,
  8.4
FROM car_models cm
WHERE cm.model_name = 'Audi A3 Sedan'
  AND cm.model_year = 2024
  AND NOT EXISTS (
    SELECT 1
    FROM model_configurations mc
    WHERE mc.car_model_id = cm.id_car_model
      AND mc.configuration_name = 'Select'
  );