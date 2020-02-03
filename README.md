# Общие сведения
В этом проекте реализована работа Веб-приложение "Список гостей". 
Использованные технологии в проекте: Node.JS, Express, Handlebars

## Feature 1: Аутентификация и авторизация
### Панель администратора:
- Логин
- Пароль


## Feature 2: Ограничение редактирование и удаление записи так, чтобы только автор мог это сделать
### Возможности добавления и редактирования списка гостей:
- Удаление гостя
- Редактирование гостя
- Загрузка гостей списком (из .csv)
- Фильтрация гостей по статусу (пришел / не пришел)

### Возможность добавление и удаления сотрудника
- Логин
- Пароль
- ФИО
- Права (администратор / модератор)

**********************************************************

## Feature 3: Ограничение зарегистрированным пользователям на внесение записей 
- Поиск гостя
- Смена статуса гостя (можно отметить только что гость пришел)
- можно это все сделать на одном урле и показывать нужную панель в зависимости от прав залогиненного пользователя

### Release 0: Регистрация пользователя
Начнем с добавления функции аутентификации пользователя. Все, что мы хотим сделать в этом конкретном release - это разрешить пользователям регистрироваться на нашем сайте, входить и выходить из системы.

Когда пользователи регистрируются, они будут вводить имя пользователя, адрес электронной почты и пароль; они будут входить в систему под своим адресом электронной почты и паролем.

Нам нужно добавить таблицу в нашу базу данных для хранения пользовательских данных. Подумайте, какие ограничения мы должны выставить для полей таблиц. Нужно ли добавлять индексы для быстрого поиска? Должны ли какие-либо поля быть обязательными и/или уникальными? Нам также понадобится модель для представления пользователей в наших приложениях.

**Изменения пользовательского интерфейса**
- Если ни один пользователь не вошел в систему, ссылки на регистрацию и вход в систему должны появиться в параметрах навигации (см. [mockup](readme-assets/auth-nav-no-user.png)).
- Когда пользователь вошел в систему, имя пользователя и ссылка на выход должны появиться в вариантах навигации (см. [mockup](readme-assets/auth-nav-user.png)).
- Когда пользователь нажимает на ссылку для регистрации, их следует отправить на страницу с формой для отправки имени пользователя, адреса электронной почты и пароля (см. [mockup](readme-assets/registration-form.png)). Нам нужна подобная страница для входа. 
- Если что-то пойдет не так во время регистрации, пользователь должен быть предупрежден о проблеме (см. [mockup](readme-assets/registration-form-show-errors.png)). Аналогичная обратная связь должна предоставляться при сбое входа в систему. 

### Release 1: Ограничение зарегистрированным пользователям на внесение записей 
В этом релизе мы начнем вводить авторизацию в наше приложение. Пользователи уже могут зарегистрироваться, войти в систему и выйти из системы. Теперь мы хотим изменить наше приложение, чтобы только зарегистрированные пользователи, которые выполнили вход в систему, могли создавать новые записи.

Мы изменим наш пользовательский интерфейс, чтобы скрыть ссылки на новую запись от гостевых пользователей. Просто обновления нашего пользовательского интерфейса недостаточно. Что произойдет, если пользователь перейдет к новой записи не с помощью клика на ссылку, а напрямую введя URL? Что делать, если кто-то делает запрос на создание нового поста из командной строки? Можем ли мы поймать их в наших обработчиках маршрутов?

**Изменения пользовательского интерфейса**
- Если пользователь не вошел в систему, должны отображаться ссылки на регистрацию и вход (см. [user logged in mockup](readme-assets/auth-nav-user.png) и [no user mockup](readme-assets/no-user-no-link-to-form.png)). 
- Если выполнен запрос на получение страницы формы для создания записи, на получение страницы формы для редактирования записи, на создание новой записи, и т.д., но пользователь не вошел в систему, тогда ответ должен предупредить пользователей о том, что что-то пошло не так (см. [mockup](readme-assets/something-went-wrong.png)); эта функция также служит для случая, если какой-либо пользователь пытается получить доступ к записи, которая не существует. 

### Release 2: Ограничить редактирование и удаление записи так, чтобы только автор мог это сделать
Следующим шагом в добавлении авторизации к нашему приложению будет ограничение того, кто может редактировать и удалять определенную запись. Мы хотим, чтобы только автор записи мог редактировать и удалять ее.

Это означает, что нам нужен способ связать пользователей с записями. Когда пользователь создает новую запись, эта новая запись должна быть связана с этим пользователем. Нужно ли нам вносить изменения в нашу базу данных для поддержки этой функции? Нужно ли обновлять наши модели? Как насчет наших контроллеров?

**Изменения пользовательского интерфейса**
- Автор записи должен отображаться рядом со временем размещения записи (см. [mockup](readme-assets/index-show-author-username.png)).
- Только автор записи должен иметь возможность видеть любые ссылки для ее редактирования или удаления. 
- Если пользователь, делающий запрос, не является автором записи, тогда, если выполнен запрос на получение страницы формы для редактирования записи, обновления записи, удаления записи, и т.д., ответ должен предупредить пользователей о том, что что-то пошло не так (см. [mockup](readme-assets/something-went-wrong.png)).

### Release 3: Разрешение на показ записи по ее автору
Теперь, когда мы можем связать пользователей и записи, давайте разрешим пользователям видеть записи, написанные конкретным пользователем. Мы хотим использовать вложенный маршрут, например `/users/:id/entries`, в зависимости от названий ваших моделей. Когда мы посетим такой маршрут, мы увидим список всех записей, написанных этим конкретным пользователем. 

**Изменения пользовательского интерфейса**
- Имена пользователей должны отображаться как ссылки на страницу с указанием всех записей, написанных этим пользователем (см. [mockup](readme-assets/usernames-as-links.png)). 
- Страница, показывающая все записи конкретного пользователя, должна выглядеть так же, как страница с самыми новыми записями (см. [mockup](readme-assets/user-entries.png)); нам не нужно использовать имя пользователя в качестве ссылки, так как мы уже на странице. 
- Если пользователь пытается увидеть записи, написанные пользователем, которого не существует, ответ должен предупредить пользователей о том, что что-то пошло не так (см. [mockup](readme-assets/something-went-wrong.png)).


## Заключение
Авторизация является важной частью разработки пользовательского интерфейса веб-приложения. Нам нужно контролировать, кто может делать что-то в наших приложениях и что именно. Иногда у нас будет функция, ограниченная небольшой группой пользователей (например, администраторами). В других случаях, нашей целью будет защита пользовательского контента, как это было выполнено в данной задаче. Когда мы будем это делать, мы должны быть осторожными и закрывать любые лазейки, которые приходят нам на ум. Недостаточно просто скрывать ссылки на наших веб-страницах. Также нужно проанализировать наши контроллеры.

