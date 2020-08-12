let datepicker = document.querySelectorAll('.datepicker')
let timepicker = document.querySelectorAll('.timepicker')

datepicker.forEach(function(item, index){
    
    let newDate = item.cloneNode(true)
    let value = item.value
    
    let upDate = new Date()
    let day = upDate.getDate()
    let month = upDate.getMonth()+1
    let year = upDate.getFullYear()
    if(value == undefined || value == ''){
        day = (day <= 9) ? '0'+day : day
        month = (month <= 9) ? '0'+month : month
        let dateUpd = day+'/'+month+'/'+year
        newDate.value = dateUpd
    }

    let format = item.dataset.dateFormat
    if(format == undefined){
        newDate.dataset.dateFormat = 'DD/MM/YYYY'
    }

    let tipeDate = item.dataset.dateTipe
    if(tipeDate == undefined){
        newDate.dataset.dateTipe = 'date'
    }
    
    let oceanDate = document.createElement('div')
        oceanDate.setAttribute('class','ocean-datepicker dropdown')

    let navDate = document.createElement('div')
        navDate.setAttribute('class','dropdown-menu datepicker-dropdown')
       
    oceanDate.append(newDate)
    oceanDate.append(navDate)

    item.after(oceanDate)
    createDatepicker(navDate)
    item.remove();

    newDate.addEventListener('click', function(){
        oceanDate.classList.toggle('show')
    })
})
function createDatepicker(navDate){
    let inpDate = navDate.previousSibling

    let value = inpDate.value.toLowerCase()
    
    let tipeDate = inpDate.dataset.dateTipe
    let langDate = inpDate.dataset.dateLang
    let dateFormat = inpDate.dataset.dateFormat.toLowerCase()
    let delimiter = getDelimiter(dateFormat)
        
    let dateConvert = formatDate(value,dateFormat,delimiter)

    let langMonth = converDate(langDate,dateConvert,delimiter)
    
    let date = new Date(langMonth)
    
    if(tipeDate == 'date'){
        createDate(date,navDate)
    }
} 
function formatDate(date,format,delimiter){
    
    let arrDate = date.split(delimiter)
    let arrFormat = format.toLowerCase().split(delimiter)
    let searDay = arrFormat.indexOf('dd')

    let sMonth = arrFormat.indexOf('mm')
    let cMonth = arrFormat.indexOf('m')
    let searMonth
    if(sMonth >= 0){
        searMonth = arrFormat.indexOf('mm')
    }
    if(cMonth >= 0){
        searMonth = arrFormat.indexOf('m')
    }
    
    let searYear = arrFormat.indexOf('yyyy')

    if(delimiter != '/'){
        delimiter = '/'
    }

    let newDate = arrDate[searYear]+delimiter+arrDate[searMonth]+delimiter+arrDate[searDay]
    
    return newDate
}
function converDate(lang,value,delimiter){
    console.log('ingresa: '+value)
    if(delimiter != '/'){
        delimiter = '/'
    }

    if(value == 'Invalid Date'){
        value == new Date()
    }
    
    let nameDate = convertLang(2,lang)
    
    let engDate = convertLang(2,undefined)
    let searMonth = value.split(delimiter)
    
    let sMonth = searMonth[1]
    let letMonth = sMonth.length
    let arrTipe = sMonth.split('')
    let tipe = 'string'
    arrTipe.forEach(function(letter) {
        if(letter >=0 ){
            tipe = 'number'
        }
    })

    let index

    if(tipe == 'string'){
        nameDate.forEach(function(item, i){            
            if(sMonth == item){
                index = i
            }
            let small = item.substr(0,3)
            if(letMonth == 3){
                if(small == sMonth){
                    index = i
                }                
            }
        })
    }

    let month = sMonth

    if(index != undefined){
        month = engDate[index]
    }

    let newDate = searMonth[0]+delimiter+month+delimiter+searMonth[2]
    console.log('sale: '+newDate)
    return newDate
}
function convertLang(require,language){
    let lang
    if(language != undefined){
        if(language == 'es'){    
            switch (require) {
               case 2:
                    lang = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
                    break;
                case 1:
                    lang = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
                    break;
                case 0:
                    lang = 'hoy';
                    break;
               default:
                    lang = 'solicite por: meses = 2, semanas = 1, hoy = 0';
                    break;
           }
        }
    } else {
        switch (require) {
            case 2:
                lang = ['january','february','march','april','may','june','july','august','september','october','november','december'];
                break;
            case 1:
                lang = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
                break;
            case 0:
                lang = 'today';
                break;
            default:
                lang = 'request by: months = 2, week = 1, today = 0'
                break;
        }
    }

    return lang
}
function createDate(date,navDate,views){
    let headDate = document.createElement('div')
        headDate.classList.add('head-datepicker')
    
    let btnPrevMonth = document.createElement('div')
    btnPrevMonth.setAttribute('class','item-head prev-month')

    let iconPrev = document.createElement('i')
        iconPrev.setAttribute('class','fa fa-angle-left')
    
    btnPrevMonth.append(iconPrev)
    
    let viewDate = document.createElement('div')
        viewDate.setAttribute('class','item-head date-title view-months')
    
    let btnNextMonth = document.createElement('div')
        btnNextMonth.setAttribute('class','item-head next-month')

    let iconNext = document.createElement('i')
        iconNext.setAttribute('class','fa fa-angle-right')
    btnNextMonth.append(iconNext)
    
    headDate.append(btnPrevMonth)
    headDate.append(viewDate)
    headDate.append(btnNextMonth)

    let bodyDate = document.createElement('div')
        bodyDate.classList.add('body-datepicker')
    
    let footDate = document.createElement('div')
        footDate.classList.add('footer-datepicker')

    navDate.append(headDate)
    navDate.append(bodyDate)
    navDate.append(footDate)
    actionsBtnHead(date,headDate)

    switch (views) {
        case 'days':
            createCalendar(date,bodyDate)
            break;
        case 'months':
            viewMonts(date,bodyDate)
            break;
        case 'years':
            viewYears(date,bodyDate)
            break;
        default:
            createCalendar(date,bodyDate)
            break;
    }    
}
function actionsBtnHead(date,headDate){
    let navDate = headDate.parentNode
    let body = headDate.nextSibling
    let footer = navDate.children[2]
    //year of the date
    let year = date.getFullYear()
    //month of the date
    let month = date.getMonth()+1

    let child = headDate.childNodes
    child.forEach(function(item){        
        item.addEventListener('click',function(){
            navDate.innerHTML = ''            
            if(item.classList.contains('prev-month')){
                let newMonth = new Date(year, (month-1), 0)
                createDate(newMonth,navDate,'days')

            } else if (item.classList.contains('view-months')) {
                createDate(date,navDate,'months')

            } else if (item.classList.contains('next-month')) {
                let newMonth = new Date(year, (month+1), 0)
                createDate(newMonth,navDate,'days')

            } else if (item.classList.contains('prev-year')) {
                let newYear = new Date((year-1), (month), 0)
                createDate(newYear,navDate,'months')

            } else if (item.classList.contains('view-years')) {
                createDate(date,navDate,'years')

            } else if (item.classList.contains('next-year')) {
                let NewYear = new Date((year+1), (month), 0)
                createDate(NewYear,navDate,'months')

            } else if (item.classList.contains('prev-decade')) {
                let NewYear = new Date((year-10), (month), 0)
                createDate(NewYear,navDate,'years')

            } else if (item.classList.contains('view-decade')) {
                createDate(date,navDate,'years')

            } else if (item.classList.contains('next-decade')) {
                let NewYear = new Date((year+10), (month), 0)
                createDate(NewYear,navDate,'years')
            }
        })
    })

    footer.addEventListener('click',function(){
        date = new Date()
        updateDate(date,body)
    })
}
function createCalendar(date,body){
    let dropOcean = body.parentNode
    let inpDate = dropOcean.previousSibling
    let lang = inpDate.dataset.dateLang
    
    let month = date.getMonth()
    let year = date.getFullYear()
    
    let months = convertLang(2,lang)
    let weekDays = convertLang(1,lang)
    let today = convertLang(0,lang)
    
    let title = months[month].toUpperCase() + ' ' +year
    let head = body.previousSibling
    let dateTitle = head.children[1]
        dateTitle.append(title)

    addDays(date,weekDays,body)
    
    let footer = body.nextSibling
        footer.append(today)
}
function addDays(date,weekDays,body){
    let datePicker = body.parentNode
    let inpDate = datePicker.previousSibling
    let value = inpDate.value
    let format = inpDate.dataset.dateFormat
    let lang = inpDate.dataset.dateLang

    let delimiter = getDelimiter(format)
    let formatConvert = formatDate(value,format,delimiter)
    let dateConvert = converDate(lang,formatConvert,delimiter)

    let dateActual = new Date(dateConvert)
    
    //console.log(formatConvert)
    //console.log(dateConvert)
    //console.log(dateActual)
    //console.log('---')



    //console.log(value)
    //console.log(format)
    //console.log(dateConvert)
    //console.log('-----')
    /*
    converDate(lang,value,delimiter)

    let delimiter = getDelimiter(dateFormat)
        
    let dateConvert = formatDate(value,dateFormat,delimiter)

    let langMonth = converDate(langDate,dateConvert,delimiter)
    */



    //Number of day
    let day = date.getDate()
    //Number of day of week - sunday(0), monday(1), tuesday(2), wednesday(3), thursday(4), friday(5), saturday(6)
    let dayWeek = date.getDay()
    //Number of month - january(0), february(1), march(2), april(3), may(4), june(5), july(6), august(7), september(8), october(9), november(10), december(11)
    let month = date.getMonth() + 1
    //year of date
    let year = date.getFullYear()
    //Quantity of days of month
    let cantDay = new Date(year, month, 0).getDate();

    //First day of month
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //Number of day of week
    let firstWeek = firstDay.getDay()


    let pMonth = date.getMonth()
    let pcantDay = new Date(year, pMonth, 0).getDate()

    let difPrev = pcantDay - firstWeek
    
    let table = document.createElement('div')
        table.setAttribute('class','table-datepicker')
    
    let thead = document.createElement('div')
        thead.setAttribute('class','item-table table-head')

    weekDays.forEach(function(week){
        let nameWeeek = document.createElement('div')
        nameWeeek.classList.add('dow')
        let viewDay = week.substr(0,2).toUpperCase()
        nameWeeek.append(viewDay)
        thead.append(nameWeeek)
    })
    
    let tbody = document.createElement('div')
        tbody.setAttribute('class','item-table table-body')

    let num = 0
    let days = 1;
    let next = 1
    for (let i = 0; i < 6; i++) {
        weekDays.forEach(function(itDay, j){
            let boxDay = document.createElement('div')

                boxDay.classList.add('day')
                boxDay.classList.add('old')

            num ++
            if(num > firstWeek && days <= cantDay){
                if(days == day){
                    boxDay.classList.add('active')
                }
                
                boxDay.classList.remove('old')
                boxDay.append(days)                
                days ++
            } else if (num <= firstWeek) {
                difPrev ++
                boxDay.append(difPrev)   
            } else if (num > firstWeek) {
                boxDay.append(next) 
                next ++
            }
            
            tbody.append(boxDay)
            
            boxDay.addEventListener('click',function(){
                let day = boxDay.innerHTML
                let newMonth = month - 1
                
                if(boxDay.classList.contains('old')){
                    if(day >= 14){
                        newMonth = newMonth-1
                    }
                    if(day <= 14){
                        newMonth = month
                    }
                }

                let newDate = new Date(year, newMonth, day)            
                date = new Date(newDate)
                updateDate(date,body)
            })
            
        })            
    }

    table.append(thead)
    table.append(tbody)
    body.append(table)
}
function viewMonts(date,bodyDate){
    let datePicker = bodyDate.parentNode
    let inp = datePicker.previousSibling
    let lang = inp.dataset.dateLang

    let headDate = bodyDate.previousSibling
    let prevYear = headDate.children[0]
    let dateTitle = headDate.children[1]
    let nextYear = headDate.children[2]
    
    let year = date.getFullYear()
    dateTitle.append(year)
    
    if(prevYear.classList.contains('prev-month')){
        prevYear.classList.remove('prev-month')
        prevYear.classList.add('prev-year')
    }
    if(dateTitle.classList.contains('view-months')){
        dateTitle.classList.remove('view-months')
        dateTitle.classList.add('view-years')
    }
    if(nextYear.classList.contains('next-month')){
        nextYear.classList.remove('next-month')
        nextYear.classList.add('next-year')
    }

    let table = document.createElement('div')
        table.classList.add('table-datepicker')
    
    let itemTable = document.createElement('div')
        itemTable.classList.add('item-box')

    let months = convertLang(2,lang)
    months.forEach(function(item, i){
        let month = document.createElement('div')
            month.classList.add('month')
            month.append(item.substr(0,3))
        itemTable.append(month)

        month.addEventListener('click',function(){
            datePicker.innerHTML = ''
            let nextDate = new Date(year, (i + 1), 0)            
            date = new Date(nextDate)
            createDate(date,datePicker,'days') 
        })
    })
    table.append(itemTable)
    bodyDate.append(table)

    let footDate = bodyDate.nextSibling
    let today = convertLang(0,lang)
    footDate.append(today)
}
function viewYears(date,bodyDate){
    let datePicker = bodyDate.parentNode
    let inp = datePicker.previousSibling
    let lang = inp.dataset.dateLang

    let headDate = bodyDate.previousSibling
    let prevDecade = headDate.children[0]
    let dateTitle = headDate.children[1]
    let nextDecade = headDate.children[2]
    
    let year = date.getFullYear()
    let iniDecade = parseInt(year.toString().substr(0,3)+'0')
    let decade = iniDecade+' - '+(iniDecade+9)
    let aftDecade = iniDecade + 10
    
    dateTitle.append(decade)

    if(prevDecade.classList.contains('prev-month')){
        prevDecade.classList.remove('prev-month')
        prevDecade.classList.add('prev-decade')
    }
    if(dateTitle.classList.contains('view-months')){
        dateTitle.classList.remove('view-months')
        dateTitle.classList.add('view-decade')
    }
    if(nextDecade.classList.contains('next-month')){
        nextDecade.classList.remove('next-month')
        nextDecade.classList.add('next-decade')
    }

    let table = document.createElement('div')
        table.classList.add('table-datepicker')
    
    let itemTable = document.createElement('div')
        itemTable.classList.add('item-box')
        
    let arrYears = []
    arrYears.push(iniDecade-1)
    for (let i = iniDecade; i < (aftDecade); i++) {
        arrYears.push(i)
    }
    arrYears.push(aftDecade)

    arrYears.forEach(function(item, i){
        let yearDecade = document.createElement('div')
        yearDecade.classList.add('year')
        if(item < iniDecade || item == aftDecade){
            yearDecade.classList.add('old')
        }
        yearDecade.append(item)
        itemTable.append(yearDecade)
        
        yearDecade.addEventListener('click',function(){
            datePicker.innerHTML = ''
            let nextDate = new Date(item, date.getMonth(), 0)            
            date = new Date(nextDate)
            createDate(date,datePicker,'months') 
        })
    })

    table.append(itemTable)
    bodyDate.append(table)

    let footDate = bodyDate.nextSibling
    let today = convertLang(0,lang)
    footDate.append(today)
}
function updateDate(date,body){
    let datePicker = body.parentNode
    let inp = datePicker.previousSibling
    let value = inp.value
    let lang = inp.dataset.dateLang
    let format = inp.dataset.dateFormat.toLowerCase()

    let delimiter = getDelimiter(format)
    
    let arrFormat = format.split(delimiter)
    let fDay = arrFormat.indexOf('dd')
    let fsMonth = arrFormat.indexOf('mm')
    let fcMonth = arrFormat.indexOf('m')
    let lengSymbol
    let fiMonth
    if(fsMonth >= 0){
        lengSymbol = 2
        fiMonth = fsMonth
    }
    if(fcMonth >= 0){
        lengSymbol = 1
        fiMonth = fcMonth
    }
    let fYear = arrFormat.indexOf('yyyy')
    
    let ordDate = formatDate(value,format,delimiter)
    let arrMonth = ordDate.split('/')
    let sMonth = arrMonth[1]
    
    let arrTipe = sMonth.split('')
    let tipe = 'string'
    arrTipe.forEach(function(letter) {
        if(letter >=0 ){
            tipe = 'number'
        }
    })

    let Day = date.getDate()
    let getMonth = date.getMonth()+1
    let Year = date.getFullYear()

    let datMonth = getMonth

    let nameDate = convertLang(2,lang)
    if(tipe == 'string'){
        nameDate.forEach(function(item, i){
            let gMonth = getMonth-1
            if(gMonth == i){
                //datMonth = item
                datMonth = item.charAt(0).toUpperCase() + item.slice(1)
            }
        })
    }
    
    if(lengSymbol == 1){
        if(tipe == 'string'){
            datMonth = datMonth.substr(0,3)
        }
    } else if (lengSymbol == 2) {
        if(tipe == 'number'){
            datMonth = (datMonth <= 9) ? '0'+datMonth : datMonth
        }
    }

    Day = (Day <= 9) ? '0'+Day : Day
    
    let arrDate = ['dd','mm','yyyy']
        
    arrDate.splice(fDay,1, Day)
    arrDate.splice(fiMonth,1, datMonth)
    arrDate.splice(fYear,1, Year)

    let getDate = arrDate[0]+delimiter+arrDate[1]+delimiter+arrDate[2]

    inp.value = getDate
    let oceanDate = inp.parentNode
    oceanDate.classList.remove('show')
    datePicker.innerHTML = ''
    createDate(date,datePicker,'days')
}
function getDelimiter(format){
    let delimiter
    let arrDelimiter = ['/','-','.',' ']
    arrDelimiter.forEach(function(item, i){
        let character = format.toLowerCase().indexOf(item)
        if(character >= 2){
            delimiter = item
        }
    })
    return delimiter
}