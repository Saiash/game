node v: 16+

Запуск клиента (3000/4000 порт):
yarn startCli

Запуск сервера (5001 порт):
yarn startServ

Запуск обоих одновременно (дебаггер под сервер):
yarn start

v.0.0.1
TODO:
* Менеджмент инвентаря
** Возможность надеть предмет +
** Отображение надетых предметов +
** Снятие предметов +
** Поработать все возможные слоты для куклы +
** Горизонтальная эволюция предметов, вертикальная эволюция, стаки
** У предметов могут быть разные состояния (меч обнажен, спрятан, наручники закрыты, открыты, соединены, соединены спереди или сзади...)
** Пересчет характеристик в соответствии с надетыми предметами +-
** Разные состояния накладывают разные модификаторы и разные теги. +
** Выбор зоны применения - опции применений
** Теги могут использоваться совершенно разными штуками, для тегов важно понимание того, что является источником тега и его относительные модификаотры. +
** Текстовые индексы для куклы: персонаж-тело-рука-правая-ладонь

* Добавить перки

* Система характеристик
** Подсчет итогового значения +
** Отображение итогового значения +
** Подсчет итогового списка тегов +
** Учет получения опыта в характеристиках и скиллах
** Добавить дополнительные третьичные характеристики, например голод, дыхание, нагрузка, etc.

* Навыки
** Использование навыка +-
** Интерпретация результата +
** Проверка доступности использования навыков согласно списку тегов +
** Проработать какие эффекты оказывают какие навыки и действия

* Взаимодействие с окружением
** Другие персонажи (нападение, применение навыков, etc.)
** Взаимодействие с местностью

* Местность/локация
** Создать сущность местности
** Смена локаций

* Глобальные сущности
** Время и его изменение при применении навыков
** Погода/локация

* Интерфейс
** Интерактивная кукла
** Проработать интерфейс
** Отображение и работа истории +-
*** Исотрия - НЕ ноды. История - массив/очередь, куда просто пушится новая любоая информация, которая в дальнейшем как либо распарсивается и отображается. +
*** В случае ноды - сначала получается и формируется нода - и потом пушится в историю, но при этом это разные сущности
** Редактор
** Локация
** Другие персонажи
** Навыки и действия
** Строка состояния: погода/время

**! Сделать прокладку для принудительного обновления некоторых интерфейсов по выбору

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