# ifield-music-lab
iField Music Lab — an independent AI music creation studio. Create original songs, shape sound, build musical identities, and export projects with creator-first rights and transparent studio attribution.
# iField Music Lab — MVP 01

## Що працює
- Адаптивний інтерфейс для iPhone Safari.
- Музичний бриф: жанр iField, темп, настрій, інструменти, дуетні голоси.
- Створення Music DNA Prompt англійською для сумісних музичних моделей.
- Локальне збереження до 30 проєктів у браузері.
- Експорт паспорта композиції у TXT.

## Чого поки немає
- Генерації аудіо: у цій версії немає підключеної моделі або бекенду.
- Хмарної синхронізації / акаунтів.
- Юридичної гарантії авторських прав на AI-аудіо.

## Запуск на iPhone
1. Розмістити `index.html` на статичному хостингу HTTPS (наприклад, GitHub Pages).
2. Відкрити адресу в Safari.
3. Натиснути «Поділитися» → «На екран Домой» → «Добавить».
4. Відкривати iField Music Lab з іконки на екрані.

## Наступний технічний етап
1. Вибрати конкретну модель та перевірити окремо ліцензії коду, ваг, даних і вихідного аудіо.
2. Створити тонкий API/backend-проксі, щоб не вбудовувати секретні ключі в HTML.
3. Додати чергу задач, статус генерації, аудіоплеєр та завантаження WAV/MP3.
4. Додати журнал походження: модель/версія/ліцензія/дата/авторський внесок.
5. Тільки після перевірки ліцензії вмикати комерційний режим.

## Архітектурне застереження
«Власна студія» не означає, що модель уже наша. MVP є власним інтерфейсом і творчим workflow. Для справді власної моделі потрібні права на базову модель/ваги/дані, обчислювальні ресурси та окреме навчання або fine-tuning.


## User rights + studio branding
- Product principle: users retain rights to their own creative contributions and outputs to the extent permitted by applicable law and third-party model/provider licenses.
- iField Music Lab does not claim ownership merely because a user generated a track with the studio.
- Exports include an iField Music Lab studio credit. Future track-cover exports should carry the studio logo as tool attribution, not as a claim of ownership.
- Audio watermarking is not enabled: the studio credit should not alter the sound or imply a rights claim.
