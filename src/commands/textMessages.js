

class TextMessages {
  constructor(user){
    this.user = user
    this.language = user.language
  }
  get editLanguage(){
    return this.selectLanguage
  }
  get selectLanguage(){
    switch (this.language){
      default:
      case 'en':
        return '🌎 Please, select a language';
      case 'ru':
        return '🌎 Пожалуйста, выберите язык';
      case 'uk':
        return '🌎 Будь ласка, виберіть мову'
      case 'be':
        return '🌎 Калі ласка, абярыце мову'
    }
  }
  get unknownError(){
    switch (this.language){
      default:
      case 'en':
        return 'An error has occurred. Unknown command!';
      case 'ru':
        return 'Произошла ошибка. Неизвестная комманда!';
      case 'uk':
        return 'Виникла помилка. Невідома команда!'
      case 'be':
        return 'Адбылася памылка. Невядомая каманда!'
    }
  }
  get editTimezone(){
    return this.getTimezone
  }
  get getTimezone(){
    switch (this.language){
      default:
      case 'en':
        return '🌏 Information about your location is required to correctly obtain time zone information\n\n'
           +'📎 Please attach the location (your location/nearest city) in your reply message (Broadcast location is not supported)\n'
           + '📱 P.S. If you are using a smartphone, you can simply click on the button below (does not work on PC)'
      case 'ru':
        return '🌏 Для корректной получения информации о часовом поясе требуется информация о вашем местоположении\n\n'
          +'📎 Пожалуйста, прикрепите свое местоположение в ответном сообщении (Трансляция геопозиции не поддерживается)\n'
          +'📱 P.S.  Если вы используете смартфон, можете просто нажать на кнопку ниже (не работает на пк)' 
      case 'uk':
        return '🌏 Для коректної отримання інформації про часовий пояс потрібна інформація про ваше місцезнаходження\n\n'
           +'📎 Будь ласка, прикріпіть місцезнаходження (ваше місцезнаходження/найближче місто) у повідомленні (Трансляція геопозиції не підтримується)\n'
           +'📱 P.S. Якщо ви використовуєте смартфон, можете просто натиснути кнопку нижче (не працює на пк)'
      case 'be':
        return '🌏 Для карэктнага атрымання інфармацыі аб часавым поясе патрабуецца інфармацыя аб вашым месцазнаходжанні\n\n'
           +'📎 Калі ласка, прымацуеце месцазнаходжанне (вашае месцазнаходжанне/бліжэйшы горад) у паведамленні ў адказ (Трансляцыя геапазіцыі не падтрымліваецца)\n'
           +'📱 P.S. Калі вы выкарыстоўваеце смартфон, можаце проста націснуць на кнопку ніжэй (не працуе на пк)'
      case 'rs':
        return '🌏 Informacije o vašoj lokaciji su potrebne da biste ispravno dobili informacije o vremenskoj zoni\n\n'
          +'📎 Priložite lokaciju (vaša lokacija/najbliži grad) u poruci odgovora (lokacija za emitovanje nije podržana)'
          +'📱 P.S. Ako koristite pametni telefon, možete jednostavno da kliknete na dugme ispod (ne radi na računaru)'
    }
  }
  get acceptTimezone(){
    switch (this.language){
      default:
      case 'en':
        return `🌍 Timezone saved successfully:\n📍${this.user.timezone}`
      case 'ru':
        return `🌍 Часовой пояс успешно сохранен:\n📍${this.user.timezone}`;
      case 'uk':
        return `🌍 Часовий пояс успішно збережено:\n📍${this.user.timezone}`
      case 'be':
        return `🌍 Гадзінны пояс паспяхова захаваны:\n📍${this.user.timezone}`
      case 'rs':
        return `🌍 Vremenska zona je uspešno sačuvana:\n📍${this.user.timezone}`
    }
  }
  get editDuration(){
    return this.selectDuration
  }
  get selectDuration(){
    switch (this.language){
      default:
      case 'en':
        return `🗓️ Please select how many days you can stay in the current country.\n❗️ If you don't see a suitable option, please reply with the number of days (from 1 to 365)`;
      case 'ru':
        return '🗓️ Пожалуйста, выберите сколько дней вы можете находиться в текущей стране.\n❗️ Если вы не видите подходящего варианта, ответным сообщением укажите количество дней (от 1 до 365)';
      case 'uk':
        return '🗓️ Будь ласка, виберіть скільки днів ви можете перебувати у поточній країні.\n❗️ Якщо ви не бачите відповідного варіанту, повідомленням у відповідь вкажіть кількість днів (від 1 до 365)'
      case 'be':
        return '🗓️ Калі ласка, абярыце колькі дзён вы можаце знаходзіцца у бягучай краіне.\n❗️ Калі вы не бачыце падыходнага варыянту, паведамленнем у адказ пазначце колькасць дзён (ад 1 да 365)'
      case 'rs':
        return '🗓 Изаберите колико дана можете да останете u sadašnjoj zemlji.\n❗ Ако не видите одговарајућу опцију, одговорите са бројем дана (од 1 до 365)'
    }
  }
  get acceptDuration(){
    switch (this.language){
      default:
      case 'en':
        return '✅ Data saved successfully.\n🗓️ Days available: '+ this.user.duration;
      case 'ru':
        return '✅ Данные успешно сохранены.\n🗓️ Дней доступно: '+ this.user.duration;
      case 'uk':
        return '✅ Дані успішно збережені.\n🗓️ Днів доступно: '+ this.user.duration
      case 'be':
        return '✅ Дадзеныя паспяхова захаваны.\n🗓️ Дзён даступна: '+ this.user.duration
      case 'rs':
        return '✅ Podaci su uspešno sačuvani.\n🗓 Dostupni dani: '+ this.user.duration
    }
  }
  get saveNewDuration(){
    switch (this.language){
      default:
      case 'en':
        return this.acceptDuration + '\n⚠️ Changes have been saved and will take effect in the next session'
      case 'ru':
        return this.acceptDuration + '\n⚠️ Изменения сохранены и вступят в силу при следующей сессии' 
      case 'uk':
        return this.acceptDuration + '\n⚠️ Зміни збережені та набудуть чинності при наступній сесії'
      case 'be':
        return this.acceptDuration + '\n⚠️ Змены захаваны і ўступяць у сілу пры наступнай сесіі'
      case 'rs':
        return this.acceptDuration + '\n⚠ Promene su sačuvane i stupiće na snagu u sledećoj sesiji'
    }
  }
  get menu(){
    switch (this.language){
      default:
      case 'en':
        return `Main menu`;
      case 'ru':
        return `Главное меню`;
      case 'uk':
        return `Головне меню`
      case 'be':
        return `Галоўнае меню`
      case 'rs':
        return `Glavni meni`
    }
  }
  get informationMessage (){
    const
      user = this.user,
      lastDate = getDatestring_(user.dateEnd, user),
      startDate = getDatestring_(user.dateStart, user)

    switch (this.language){
      default:
      case 'en':
        return `ℹ️ Session info\n\n📅 Entry date: ${startDate}\n\nYou need to leave the country no later than:\n🗓️${lastDate}`;
      case 'ru':
        return `ℹ️ Информация о текущей сессии\n\n📅 Дата въезда: ${startDate}\n\nНеобходимо выехать не позднее, чем:\n🗓️${lastDate}`;
      case 'uk':
        return `ℹ️ Інформація про сеанс\n\n📅 Дата в'їзду: ${startDate}\n\nВам потрібно залишити країну не пізніше:\n🗓${lastDate}`
      case 'be':
        return `ℹ️ Інфармацыя аб сеансе\n\n📅 Дата ўезду: ${startDate}\n\nВам трэба пакінуць краіну не пазней:\n🗓${lastDate}`
      case 'rs':
        return `ℹ️ Informacije o sesiji\n\n📅 Datum dolaska: ${startDate}\n\nMorate da napustite zemlju najkasnije do:\n🗓${lastDate}`
    }
  }
  get noSessionFound(){
    switch (this.language){
      default:
      case 'en':
        return `🔍 No active sessions found!\n\nMark your entry into the country using the button "🚗 Mark entry"`
      case 'ru':
        return `🔍 Не найдено активных сессий!\n\nОтметьте свой въезд в страну с помощью кнопки "🚗 Отметить въезд"`;
      case 'uk':
        return`🔍 Не знайдено активних сесій!\n\nВідмітьте свій в'їзд у країну за допомогою кнопки "🚗 Відмітити в'їзд"`
      case 'be':
        return `🔍 Не знойдзена актыўных сесій!\n\nАдзначце свой уезд у краіну з дапамогай кнопкі "🚗 Адзначыць уезд"`
      case 'rs':
        return `🔍 Nisu pronađene aktivne sesije!\n\nOznačite svoj ulazak u zemlju pomoću dugmeta „🚗 Označi unos“`
    }
  }
  get activeSession(){
    const
      user = this.user,
      language = this.language,
      currentDate = getCurrentDate_({user}),
      dateEnd = new Date(user.dateEnd),
      timeDifference = dateEnd - currentDate,
      dayDifference = getDayDifference_(timeDifference)
    
    let text = '⚠️ ';
    
    if (language === 'ru'){
      text += `Найдена активная сессия ⚠️\n${dayDifference >= 0 ? '🗓️ Осталось дней' : '❗️ Опоздание дней'}: ${Math.abs(dayDifference)}\n\n`
      + `\nЕсли вы хотите отметить новый въезд, нажмите кнопку ниже`
    }
    else if (language === 'uk') {
      text += `Знайдено активну сесію ⚠️\n${dayDifference >= 0  ? '🗓️ Залишилось днів' : '❗️ Запізнення днів'}: ${Math.abs(dayDifference)}`
      + `\nЯкщо ви хочете відзначити новий в'їзд, натисніть кнопку нижче`
    }
    else if (language === 'be') {
      text += `Знойдзена актыўная сесія ⚠️\n${dayDifference >= 0  ? '🗓️ Засталося дзён' : '❗️ Спазненне дзён'}: ${Math.abs(dayDifference)}`
      + `\nКалі вы хочаце адзначыць новы ўезд, націсніце кнопку ніжэй`
    }
    else if (language === 'rs'){
      text += `Pronađena aktivna sesija ⚠\n${dayDifference >= 0  ? '🗓️ Preostalo dana' : '❗️ Zakašnjenje dana'}: ${Math.abs(dayDifference)}`
      + `\nAko želite da označite novi unos, kliknite na dugme ispod`
    }
    else {
      text += `Active session found ⚠️\n${dayDifference >= 0  ? '🗓️ Days left' : '❗️ Days late'}: ${Math.abs(dayDifference)}`
      + `\nIf you want to mark a new entry, click the button below`
    }
    
    return text
  }
  get acceptEntry (){
    const
      lastDate = getDatestring_(this.user.dateEnd, this.user),
      arrivalDate = getDatestring_(this.user.dateStart, this.user)
    switch (this.language){
      default:
      case 'en':
        return `✅ Entry locked\n\n📅 Arrival date: ${arrivalDate}\n❗️ Last date of departure: ${lastDate}`;
      case 'ru':
        return `✅ Въезд зафиксирован\n\n📅 Дата въезда: ${arrivalDate}\n❗️ Крайняя дата выезда: ${lastDate}`;
      case 'uk':
        return `✅ В'їзд зафіксований\n\n📅 Дата в'їзду: ${arrivalDate}\n❗️ Крайня дата виїзду: ${lastDate}`
      case 'be':
        return `✅ Уезд зафіксаваны\n\n📅 Дата ўезду: ${arrivalDate}\n❗️ Крайняя дата выезду: ${lastDate}`
      case 'rs':
        return `✅ Ulaz fiksiran\n\nT📅 Datum dolaska: ${arrivalDate}\n❗️ Poslednji datum polaska: ${lastDate}`
    }
  }
  get sessionClosed (){
    const
      user = this.user,
      language = this.language,
      currentDate = getCurrentDate_({user}),
      dateEnd = new Date(user.dateEnd),
      timeDifference = dateEnd - currentDate,
      duration = Math.round(Math.abs(currentDate - new Date(user.dateStart)) / 86400000),
      dayDifference = getDayDifference_(timeDifference);
    log(new Date(user.dateStart))
    log(user.dateStart)
    let text = '__________________________\n✔️ ';
    
    if (language === 'ru'){
      text += `Сессия завершена!\n\n🗓️ Длительность, дней: ${duration}\n⏳ Оставалось, дней: ${dayDifference}`
    }
    else if (language === 'uk') {
      text += `Сесія завершена!\n\n🗓️ Тривалість днів: ${duration}\n⏳ Залишалося днів: ${dayDifference}`
    }
    else if (language === 'be') {
      text += `Сесія завершана!\n\n🗓️ Працягласць, дзён: ${duration}\n⏳ Заставалася, дзён: ${dayDifference}`
    }
    else if (language === 'rs'){
      text += `Sesija je završena!\n\n🗓 Trajanje, dani: ${duration}\n⏳ Preostali dani: ${dayDifference}`
    }
    else {
      text += `Session ended!\n\n🗓️ Duration, days: ${duration}\n⏳ Remaining days: ${dayDifference}`
    }
    
    return text += '\n__________________________'
  }
  get enterDateManually (){
    switch (this.language){
      default:
      case 'en':
        return 'In the response message, enter the date of entry in the format: dd.MM.yyyy\nUse a dot as a separator!';
      case 'ru':
        return 'Ответным сообщением укажите дату въезда в формате: дд.ММ.гггг\nИспользуйте точку как разделитель!';
      case 'uk':
        return `У відповідному повідомленні вкажіть дату в'їзду у форматі: дд.ММ.рррр\nВикористовуйте точку як роздільник!`
      case 'be':
        return 'У паведамленні ў адказ укажыце дату ўезду ў фармаце: дд.ММ.гггг\nВыкарыстоўвайце кропку як падзельнік!'
      case 'rs':
        return 'U poruci odgovora navedite datum unosa u formatu: dd.MM.gggg\nKoristite tačku kao separator!'
    }
  }
  
  get dateIsTooSmall (){
    switch (this.language){
      default:
      case 'en':
        return `⚠️ Invalid date.\The date cannot be greater than the current date in the selected time zone, and cannot be earlier than Jan 1. 2022\nPlease indicate the correct entry date`
      case 'ru':
        return `⚠️ Некорректная дата.\Дата не может быть больше текущей даты в выбранном часовом поясе, а также не может быть раньше 1 янв. 2022г.\nПожалуйста, укажите корректную дату въезда`;
      case 'uk':
        return `⚠️ Некоректна дата.\Дата не може бути більше поточної дати у вибраному часовому поясі, а також не може бути раніше 1 січня. 2022р.\nБудь ласка, вкажіть коректну дату в'їзду`
      case 'be':
        return `⚠️ Некарэктная дата.\Дата не можа быць больш бягучай даты ў абраным часавым поясе, а таксама не можа быць раней за 1 студз. 2022г.\nКалі ласка, укажыце карэктную дату ўезду`
      case 'rs':
        return `⚠ Nevažeći datum.\Datum ne može biti veći od trenutnog datuma u ​​izabranoj vremenskoj zoni i ne može biti raniji od 1. januara. 2022\nNavedite tačan datum unosa`
    }
  }
  acceptManualDate (date){
    date = getDatestring_(date, this.user)
    switch (this.language){
      default:
      case 'en':
        return `Check-in date selected: ${date}`;
      case 'ru':
        return `Выбрана дата въезда: ${date}`;
      case 'uk':
        return `Вибрано дату в'їзду: ${date}`
      case 'be':
        return `Абраная дата ўезду: ${date}`
      case 'rs':
        return `Izabran datum prijave: ${date}`
    }
  }
  get settings(){
    switch (this.language){
      default:
      case 'en':
        return `💁‍♂️ Choose the appropriate item`
      case 'ru':
        return `💁‍♂️ Выберите подходящий пункт`;
      case 'uk':
        return `💁‍♂️ Виберіть потрібний пункт`
      case 'be':
        return `💁‍♂️ Абярыце прыдатны пункт`
      case 'rs':
        return `💁‍♂ Izaberite odgovarajuću stavku`
    }
  }
  get notification(){
    const dateEnd = getDatestring_(this.user.dateEnd, this.user)
    switch (this.language){
      default:
      case 'en':
        return `❗️ I remind you that the deadline for completing the session is:\n📅 ${dateEnd}`;
      case 'ru':
        return `❗️ Напоминаю, крайняя дата для завершения сессии:\n📅 ${dateEnd}`;
      case 'uk':
        return `❗️ Нагадую, крайня дата для завершення сесії:\n📅 ${dateEnd}`;
      case 'be':
        return `❗️ Нагадваю, крайняя дата для завяршэння сесіі:\n📅 ${dateEnd}`;
      case 'rs':
        return `❗ Podsećam da je rok za završetak sesije:\n📅 ${dateEnd}`;
    }
  }
   
   
   
   

   
   ENTRY_LOCKED(){
    switch (this.language){
      default:
      case 'en':
        return `✅ Entry locked`;
      case 'ru':
        return `✅ Въезд зафиксирован`;
      case 'uk':
        return `✅ В'їзд зафіксований`
      case 'be':
        return `✅ Уезд зафіксаваны`
      case 'rs':
        return `✅ Ulaz fiksiran`
    }

  }
  
   
   
   
   ERROR_NOT_FOUND(){
    switch (MESSAGE.language){
      default:
      case 'en':
        return 'An error has occurred. User data was not found.\nPress /start to start registration';
      case 'ru':
        return 'Произошла ошибка. Данные пользователя не найдены.\nНажмите /start чтобы начать регистрацию';
      case 'uk':
        return 'Виникла помилка. Дані користувача не знайдені.\nНатисніть /start, щоб розпочати реєстрацію'
      case 'be':
        return 'Адбылася памылка. Дадзеныя карыстальніка не знойдзены.\nНацісніце /start каб пачаць рэгістрацыю'
    }
  }
  
}