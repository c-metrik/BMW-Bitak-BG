INSERT INTO public.comments (
    car_id,
    author_id,
    author_name,
    content
)
SELECT
    c.id,
    u.id,
    u.email,
    (
        ARRAY[
            'Колата още ли е налична?',
            'Може ли малко повече информация за двигателя?',
            'Има ли сервизна история?',
            'Възможен ли е коментар по цената?',
            'Има ли забележки по купето?',
            'Кога последно е обслужвана?',
            'Може ли да се направи тест драйв?',
            'Има ли проблеми със скоростната кутия?',
            'На колко километра е сменена веригата?',
            'Може ли да изпратите още снимки?'
        ]
    )[1 + floor(random() * 10)::int]
FROM public.cars AS c
CROSS JOIN auth.users AS u
WHERE u.email IN (
    'pesho@abv.bg',
    'pesho2@abv.bg',
    'pesho3@abv.bg',
    'pesho4@abv.bg',
    'pesho5@abv.bg'
);