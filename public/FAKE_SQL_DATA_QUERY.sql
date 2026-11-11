DO $$
DECLARE
  demo_owner uuid;
BEGIN
  SELECT id INTO demo_owner FROM auth.users ORDER BY created_at LIMIT 1;
  IF demo_owner IS NULL THEN
    RAISE EXCEPTION 'No Auth user found. Create a test user in Authentication > Users first.';
  END IF;

  INSERT INTO public.cars
    (trim, year, color, fuel_type, transmission, power, price, phone, location, description, photos, owner_id)
  SELECT
    models[((n - 1) % array_length(models, 1)) + 1],
    2010 + ((n * 7) % 16),
    colors[((n - 1) % array_length(colors, 1)) + 1],
    CASE WHEN n % 7 = 0 THEN 'хибрид' WHEN n % 3 = 0 THEN 'бензин' ELSE 'дизел' END,
    CASE WHEN n % 5 = 0 THEN 'ръчна' ELSE 'автоматична' END,
    116 + (n % 9) * 25,
    (7500 + n * 1150 + (n % 4) * 700)::numeric(12,2),
    '+359 888 000 000',
    cities[((n - 1) % array_length(cities, 1)) + 1],
    'Данните са примерни и автомобилът не се предлага реално за продажба.',
    ARRAY[images[((n - 1) % array_length(images, 1)) + 1]],
    demo_owner
  FROM generate_series(1, 25) AS n
  CROSS JOIN (
    SELECT
      ARRAY[
            'BMW i3','BMW 225xe','BMW 318d','BMW 535d','BMW X4 xDrive20d',
            'BMW Z4','BMW 125i']::text[] AS models,
      ARRAY['Черен','Бял','Сив металик','Син','Червен','Сребрист']::text[] AS colors,
      ARRAY['София','Пловдив','Варна','Бургас','Русе','Стара Загора','Плевен']::text[] AS cities,
      ARRAY[
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm_CGv1v8onlPIfBXXtxrvoga4nJ9-PKpU0jQqRjd95A&s=10',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtqiAOu7_yKbhWWzmBc9RibxdIme7DqhZFoxqAQK8wyg&s=10',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLdsL5hP5ysxU2-9b2ZrXPY0xZ6fVTUo0ANBZgXvMJA&s=10',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrEaGUGM-3qrL8A-MflY0OBKnXNg_LJBZJtoC00621Dw&s=10',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJak7_sFqlXLv5oCMrFxZxSI7xXSk7PW4VeXcHrJhbqg&s=10'
      ]::text[] AS images
  ) AS demo;
END $$;

SELECT count(*) AS total_cars FROM public.cars;
