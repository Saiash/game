node v: 16+

Запуск клиента (3000/4000 порт):
yarn startCli

Запуск сервера (5001 порт):
yarn startServ

Запуск обоих одновременно (дебаггер под сервер):
yarn start

v.0.1
TODO:
* Менеджмент инвентаря
** Горизонтальная эволюция предметов, вертикальная эволюция, стаки
** У предметов могут быть разные состояния (меч обнажен, спрятан, наручники закрыты, открыты, соединены, соединены спереди или сзади...) ~
** Пересчет характеристик в соответствии с надетыми предметами ~
** Выбор зоны применения - опции применений
** Текстовые индексы для куклы: персонаж-тело-рука-правая-ладонь

* Добавить перки

* Система характеристик
** Учет получения опыта в характеристиках и скиллах
** Добавить дополнительные третьичные характеристики, например голод, дыхание, нагрузка, etc. ~

* Навыки
** Использование навыка +-
** Проработать какие эффекты оказывают какие навыки и действия

* Взаимодействие с окружением
** Другие персонажи (нападение, применение навыков, etc.)
** Взаимодействие с местностью

* Местность/локация
** Смена локаций

* Глобальные сущности
** Время и его изменение при применении навыков
** Погода/локация

* Интерфейс
** Интерактивная кукла
** Проработать интерфейс
** Отображение и работа истории +-
** Редактор
** Другие персонажи
** Строка состояния: погода/время

* Редактор данных
** Редактировать и сохранять предметы
** Редактировать и сохранять локации
** Редактировать и сохранять навыки
** Редактировать и сохранять персонажей

* Система
** Сохранение и загрузка
** Локальный запуск

* Квест
** Собрать первую простую локацию, включающую в себя 

* Localization
** Create patchnotes and all writings for multiply languages
** add support for languages

* add V0.0.2 TODO

Если таги будут лагать - можно сделать избыточное количество коллекций для хранения тагов и условий по всем возможным условиям опираясь на путь и типы: например таги зависимые от статуса складывать в отдельную папку, и перед обновлением и пересчетом тэгов формировать список опираясь на все изменения сделанные в течении цикла: 
- те сначала собрать все изменения;
- опираясь на все изменения - сформировать список тэгов
- потом уже один раз выполнять пересчет.
