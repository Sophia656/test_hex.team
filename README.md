      git clone https://github.com/Sophia656/test_hex.team.git
      npm i
      npm start
      login: jaja
      pass: jaja

                ### Требуется реализовать frontend часть сервиса сокращения ссылок.

                Основной функционал сервиса - получение по произвольной ссылке (например https://docs.docker.com/engine/reference/commandline/attach/) короткой ссылки (http://79.143.31.216/s/7ASMU), реализующей перенаправление пользователя на исходную страницу. Это может быть удобно для отправки в SMS или Twitter, где размер сообщения ограничен. Помимо этого, пользователь, создавший укороченную ссылку, может просматривать количество переходов по этой ссылке. Эта информация будет недоступна остальным пользователям.

                В итоге пользователь должен мочь зарегистрироваться на сайте, авторизоваться, создать произвольное количество сокращенных ссылок и просматривать количество переходов по каждой из них. 

                Система должна хранить всю информацию (о пользователях, сокращенных ссылках, количествах переходов), а также генерировать сокращенные ссылки на стороне backend-а, который уже реализован, и интерактивная документация по которому доступна по ссылке http://79.143.31.216/docs.

                Frontend может состоять из нескольких страниц (главное наличие функциональности):
                <ol>
                <li>Страница регистрации</li>
                <li>Страница авторизации</li>
                <li>Основная страница, реализующая следующую функциональность:</li>
                <ol>
                <li>Просмотр статистики по созданным ссылкам в виде таблицы</li>
                <li>Таблица содержит минимум три столбца - короткая ссылка, исходная ссылка, количество переходов по короткой ссылке</li>
                <li>Таблица должна иметь пагинацию, работающую на стороне сервера</li>
                <li>Таблица должна иметь возможность сортировки по столбцам</li>
                </ol>
                </ol>

                Можно использовать любые сторонние библиотеки и фреемворки.

                В качестве результатов тестового задания ожидается ссылка на публичный репозиторий с кодом и инструкцией по запуску в файле readme.md
                Интерактивная документация по API расположена по адресу http://79.143.31.216/docs

                Бонсом будет:
                <ol>
                <li>Возможность фильтрации по нескольким столбцам таблицы статистики одновременно</li>
                <li>Копирование сокращенных ссылок при клике</li>
                <li>Запуск через docker контейнер</li>
                <li>Развернутый сервер с Вашим кодом в сети (Требуется указать ссылку в readme.md)</li>
                </ol>
