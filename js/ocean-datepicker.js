let datepicker = document.querySelectorAll('.datepicker')
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
    
    let oceanDate = document.createElement('div')
        oceanDate.setAttribute('class','ocean-datepicker dropdown')
        oceanDate.dataset.dateView = 'days'

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
    let value = inpDate.value
    let format = inpDate.dataset.dateFormat
    let lang = inpDate.dataset.dateLang
    
    let delimiter = getDelimiter(format)        
    let dateConvert = formatDate(value,format,delimiter)
    let newDate = converDate(lang,dateConvert,delimiter)
    let today = convertLang(0,lang)

    let date = new Date(newDate)
    
    let headDate = document.createElement('div')
        headDate.classList.add('head-datepicker')
    
    let btnPrevMonth = document.createElement('div')
    btnPrevMonth.setAttribute('class','item-head prev-month')

    let iconPrev = document.createElement('i')
        iconPrev.setAttribute('class','fa fa-angle-left')
    
    btnPrevMonth.append(iconPrev)
    
    let viewDate = document.createElement('div')
        viewDate.setAttribute('class','item-head date-title view-month')
    
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
        bodyDate.classList.add('view-days')
    
    let footDate = document.createElement('div')
        footDate.classList.add('footer-datepicker')
        footDate.append(today)

    navDate.append(headDate)
    navDate.append(bodyDate)
    navDate.append(footDate)

    actionsBtnHead(date,headDate)
    updateOcean(date,navDate,'days')
}
function actionsBtnHead(date,headDate){
    let body = headDate.nextSibling
    let childsHead = headDate.childNodes

    let month = date.getMonth()+1
    let year = date.getFullYear()
    
    childsHead.forEach(function(item){
        item.addEventListener('click',function(){
            if(item.classList.contains('prev-month')){
                month = month-1
                view = 'days'

            } else if (item.classList.contains('view-month')){
                month = month
                view = 'months'
                updateBtnHead(headDate,'year')
                if(body.classList.contains('view-days')){
                    body.classList.add('view-months')
                    body.classList.remove('view-days')
                }
                
            } else if (item.classList.contains('next-month')){
                month = month+1
                view = 'days'

                //Years
            } else if (item.classList.contains('prev-year')){
                year --
                view = 'months'

            } else if (item.classList.contains('view-year')){
                year = year
                view = 'decades'
                updateBtnHead(headDate,'decade')
                if(body.classList.contains('view-months')){
                    body.classList.add('view-years')
                    body.classList.remove('view-months')
                }

            } else if (item.classList.contains('next-year')){
                year ++
                view = 'months'

                //decade
            } else if (item.classList.contains('prev-decade')){
                year -=10
                view = 'decades'

            } else if (item.classList.contains('view-decade')){
                year = year
                view = 'decades'

            } else if (item.classList.contains('next-decade')){
                year +=10
                view = 'decades'

            }
            
            if(month == 0){
                month = 12
                year --
            }
            if(month == 13){
                month = 1
                year ++
            }
            
            date = new Date(year, month, 0)
            updateDate(date,body,view)      
        })
    })
}
function updateOcean(date,navDate,view){
    let inpDate = navDate.previousSibling
    let lang = inpDate.dataset.dateLang
    let body = navDate.children[1]
    
    let weekDays = convertLang(1,lang)

    let arrTable = ['days','months','years']
    arrTable.forEach(function(item,i){        
        let style = 'item-'+item

        let tableDays = document.createElement('div')
            tableDays.setAttribute('class','table-datepicker')
            tableDays.classList.add(style)
            //Days
            if(i == 0){
                let thead = document.createElement('div')
                    thead.setAttribute('class','item-table item-date table-head')                    
                    weekDays.forEach(function(week){
                        let shortWeek = week.substr(0,2).toUpperCase()
                        let nameWeeek = document.createElement('div')
                            nameWeeek.classList.add('dow')
                            nameWeeek.append(shortWeek)
                        thead.append(nameWeeek)
                    })


                let tbody = document.createElement('div')
                    tbody.setAttribute('class','item-table table-body')
                    for (let j = 0; j < 42; j++) {
                        let days = document.createElement('div')
                        tbody.append(days)
                    }

                tableDays.append(thead)
                tableDays.append(tbody)
            }
            //Months and Years
            if(i >= 1){
                let itemTable = document.createElement('div')
                itemTable.setAttribute('class','item-box item-date')
                
                for (let j = 0; j < 12; j++) {
                    let item = document.createElement('div')
                    if(i == 1){
                        item.classList.add('month')
                    }
                    if(i == 2){
                        item.classList.add('year')
                    }
                    
                    itemTable.append(item)
                }
                
                tableDays.append(itemTable)
            }

        body.append(tableDays)
    })
    
    updateDate(date,body,view)
}
function updateDate(date,body,view){
    let dropNav = body.parentNode
    let head = body.previousSibling

    let inpDate = dropNav.previousSibling
    let lang = inpDate.dataset.dateLang

    let month = date.getMonth()   
    let year = date.getFullYear()    
    let monthDate = convertLang(2,lang)

    //Update Title
    let titleDate = head.children[1]
    switch (view) {
        case 'days':
            titleDate.innerHTML = monthDate[month].toUpperCase() +' '+ year
            break;
        case 'months':
            titleDate.innerHTML = year
            break;
        case 'decades':
            let decade = decadeDate(date)
            year = decade + ' - '+ (decade+10)
            titleDate.innerHTML = year
            break;
        default:
            titleDate.innerHTML = monthDate[month].toUpperCase() +' '+ year
            break;
    }
    //Update Days
    updateDays(date,body)
    updateMonts(date,body)
    updateYears(date,body)
}
function updateDays(date,body){
    let oceanNav = body.parentNode
    let inpDate = oceanNav.previousSibling
    let itemDate = body.children[0]
    let itemBody = itemDate.children[1]
    let itemDays = itemBody.childNodes
    
    let value = inpDate.value
    let lang = inpDate.dataset.dateLang
    let format = inpDate.dataset.dateFormat

    let month = date.getMonth()
    let year = date.getFullYear()

    let delimiter = getDelimiter(format)
    let formatConvert = formatDate(value,format,delimiter)
    let newDate = converDate(lang,formatConvert,delimiter)
    let arrValue = newDate.split('/')
    let yearValue = arrValue[0]
    let monthValue = arrValue[1]
    let dayValue = arrValue[2] 

    let monthDate = convertLang(2,undefined)
    let searMonth = monthDate.indexOf(monthValue)
    if(searMonth >= 0){
        monthValue = searMonth
    } else {
        monthValue = parseInt(monthValue)-1
    }
    //Actual Month
    let cantDay = new Date(year, month+1, 0).getDate();
    let dayWeek = new Date(year, month, 1);
    let numWeek = dayWeek.getDay()
 
    //Prev month
    let prevCantDay = new Date(year, month, 0).getDate()
    let firstDay = prevCantDay - numWeek

    let arrDay = []
    let tipeDay = []
    for (let p = (firstDay+1); p <= prevCantDay; p++) {
        arrDay.push(p)
        tipeDay.push('old')
    }
    for (let m = 1; m <= cantDay; m++) {
        arrDay.push(m)
        tipeDay.push('')
    }
    let cantArr = arrDay.length - 1
    for (let n = 1; n < 42 - cantArr; n++) {
        arrDay.push(n)
        tipeDay.push('old')
    }

    itemDays.forEach(function(days,i){
        let style = (tipeDay[i] != '') ? ' '+tipeDay[i] : ''
        let day = arrDay[i]
        days.setAttribute('class','day'+style)

        if(style == ''){
            if(day == dayValue && month == monthValue && year == yearValue){
                days.classList.add('active')
            }
        }
        days.innerHTML = day
        days.addEventListener('click',function(item){
            if(style != ''){
                month = (day > 15 ) ? month = month - 1 : month + 1
            }
            
            date = new Date(year, month, day)
           sendDate(date,inpDate)
        })
    })
}
function updateMonts(date,body){
    let oceanNav = body.parentNode
    let inpDate = oceanNav.previousSibling
    let head = body.previousSibling
    let itemDate = body.children[1]
    let itemMonts = itemDate.children[0]
    let childItem = itemMonts.childNodes
    
    let value = inpDate.value
    let lang = inpDate.dataset.dateLang
    let format = inpDate.dataset.dateFormat
    
    let yearDate = date.getFullYear()

    let delimiter = getDelimiter(format)
    let formatConvert = formatDate(value,format,delimiter)
    let newDate = converDate(lang,formatConvert,delimiter)
    let arrValue = newDate.split('/')
    let yearValue = arrValue[0]
    let monthValue = parseInt(arrValue[1])-1
    
    let months = convertLang(2,lang)
    childItem.forEach(function(item,i){
        let month = months[i];
        let shortMonth =  month.substr(0,3)
        item.setAttribute('class','month')
        if(monthValue == i && yearValue == yearDate){
            item.classList.add('active')
        }
        item.innerHTML = shortMonth
        item.addEventListener('click',function(){
            date = new Date(yearDate, i+1, 0)
            updateBtnHead(head,'month')
            updateView(body,'days')
            updateDate(date,body,'days')
        })
    })
}
function updateYears(date,body){
    let oceanNav = body.parentNode
    let inpDate = oceanNav.previousSibling
    let head = body.previousSibling
    let itemDate = body.children[2]
    let itemYears = itemDate.children[0]
    let childItem = itemYears.childNodes
    
    let value = inpDate.value
    let lang = inpDate.dataset.dateLang
    let format = inpDate.dataset.dateFormat
    
    let delimiter = getDelimiter(format)
    let formatConvert = formatDate(value,format,delimiter)
    let newDate = converDate(lang,formatConvert,delimiter)
    let arrValue = newDate.split('/')
    let yearValue = arrValue[0]
    
    let arrDecade = []
    let decade = decadeDate(date)
    for (let i = (decade-1); i <= (decade+10); i++) {
        arrDecade.push(i) 
    }
    
    childItem.forEach(function(item,i){
        let year = arrDecade[i]
        item.setAttribute('class','year')
        if(i == 0 || i == (arrDecade.length-1)){
            item.classList.add('old')
        }
        if(year == yearValue){
            item.classList.add('active')
        }
        item.innerHTML = year
        item.addEventListener('click',function(){
            date = new Date(year+1, 0, 0)
            updateBtnHead(head,'year')
            updateView(body,'months')
            updateDate(date,body,'months')
        })
    })
}
function updateView(body,view){
    body.setAttribute('class','body-datepicker view-'+view)
}
function updateBtnHead(head,view){
    let prevDate = head.children[0]
    let titleDate = head.children[1]
    let nextDate = head.children[2]

    prevDate.setAttribute('class','item-head prev-'+view)
    titleDate.setAttribute('class','item-head date-title view-'+view)
    nextDate.setAttribute('class','item-head next-'+view)
}
function sendDate(date,inpDate){
    let oceanNav = inpDate.nextSibling
    let head = oceanNav.children[0]
    let body = oceanNav.children[1]

    let format = inpDate.dataset.dateFormat.toLowerCase()
    let value = inpDate.value
    let lang = inpDate.dataset.dateLang
    let delimiter = getDelimiter(format)
    let arrFormat = format.split(delimiter)

    let formatConvert = formatDate(value,format,delimiter)
    
    let arrValue = formatConvert.split('/')
    let monthValue = arrValue[1].toLowerCase()

    let indDay = arrFormat.indexOf('dd')
    let indMonth = arrFormat.indexOf('mm')
    let indYear = arrFormat.indexOf('yyyy')

    let cant = 2
    let indMonths = arrFormat.indexOf('m')    
    if(indMonths >= 0){
        cant = 1
        indMonth = indMonths
    }

    let arrTipe = monthValue.split('')
    let tipeMonth = 'string'
    arrTipe.forEach(function(letter) {
        if(letter >=0 ){
            tipeMonth = 'number'
        }
    })
    
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    
    if(tipeMonth == 'string'){
        let nameDate = convertLang(2,lang)
        nameDate.forEach(function(item,i){
            let shortMonth = item.substr(0,3)
            if(month == i){
                month = item.charAt(0).toUpperCase() + item.slice(1)
                if(cant == 1){
                    month = shortMonth.charAt(0).toUpperCase() + shortMonth.slice(1)
                }
            }
        })
    }
    
    day = (day <= 9) ? '0'+day : day
    if(tipeMonth == 'number'){
        month = month + 1
        month = (month <= 9) ? '0'+month : month
    }
    
    let arrDate = ['dd','mm','yyyy']
    arrDate.splice(indDay,1, day)
    arrDate.splice(indMonth,1, month)
    arrDate.splice(indYear,1, year)

    inpDate.value = arrDate[0]+delimiter+arrDate[1]+delimiter+arrDate[2]

    updateBtnHead(head,'month')
    updateView(body,'days')
    updateDate(date,body,'days')
}
function decadeDate(date){
    let year = date.getFullYear()
    let decade = parseInt(year.toString().substr(0,3)+'0')
    return decade
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
function converDate(lang,value,delimiter){
    if(delimiter != '/'){
        delimiter = '/'
    }
    let monthDate = convertLang(2,lang)    
    let engDate = convertLang(2,undefined)

    let arrValue = value.split(delimiter)
    let viewMonth = arrValue[1].toLowerCase()
    let arrTipe = viewMonth.split('')
    let tipeMonth = 'string'
    
    arrTipe.forEach(function(letter){
        if(letter >=0 ){
            tipeMonth = 'number'
        }
    })
    if(tipeMonth == 'string'){       
        monthDate.forEach(function(nameMonth, i){
            let shortMonth = nameMonth.substr(0,3)
            if(viewMonth == nameMonth || viewMonth == shortMonth){
                viewMonth = engDate[i]
            }
        })
    }
    return arrValue[0]+delimiter+viewMonth+delimiter+arrValue[2]
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
//Time picker
let timepicker = document.querySelectorAll('.timepicker')
timepicker.forEach(function(item, index){
    
    let newTime = item.cloneNode(true)
    let value = item.value.toLowerCase()
    let format = item.dataset.timeFormat
    format = (format == undefined) ? 24 : format
    
    let updValue = getTime(value)
    
    newTime.value = updValue
    
    let time = converTime(updValue)
    
    let oceanTime = document.createElement('div')
        oceanTime.setAttribute('class','ocean-datepicker dropdown')

    let navTime = document.createElement('div')
        navTime.setAttribute('class','dropdown-menu datepicker-dropdown')
       
    oceanTime.append(newTime)
    oceanTime.append(navTime)

    item.after(oceanTime)
    createTimepicker(time,navTime,updValue)
    
    item.remove();

    newTime.addEventListener('click', function(){
        oceanTime.classList.toggle('show')
    })
})
function getTime(value){
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    if(value == '' || value == undefined){
        
        minutes = (minutes <= 9) ? '0'+minutes : minutes
        seconds = (seconds <= 9) ? '0'+seconds : seconds
        
        value = hours+':'+minutes+':'+seconds
    }
    value = value.replace(' ',':')

    let arrTime = value.split(':')
    arrTime.splice(0,1, (parseInt(arrTime[0])))
    let cantArr = arrTime.length - 1

    let arrMeridian = arrTime[cantArr]
    
    if(arrMeridian == 'am' || arrMeridian == 'pm'){
        if(arrTime[0] == 0){
            arrTime.splice(0,1, 12)
        }
        arrTime.splice(2,1, arrMeridian)
    }
    
    let secMeridian = ':'+arrTime[2]
    if(arrTime[2] == 'am' || arrTime[2] == 'pm'){
        secMeridian = ' '+arrTime[2].toUpperCase()
    }
    
    return arrTime[0]+':'+arrTime[1]+secMeridian
}
function converTime(value){
    let date = new Date()
    value = value.toLowerCase()
    value = value.replace(' ',':')
    let pm = value.indexOf('pm')
    
    value = value.replace('am','00')
    value = value.replace('pm','00')
    
    let arrTime = value.split(':')
    
    if(pm >= 0){
        let  hourPm = 12 + parseInt(arrTime[0])
        arrTime.splice(0,1, hourPm)
    }

    let time = new Date(date.getFullYear(), date.getMonth(), date.getDate(), arrTime[0], arrTime[1], arrTime[2])

    return time
}
function createTimepicker(date,navTime,value){    
    let arrItems = ['hour','min','sec']
    
    let headTime = document.createElement('div')
        headTime.setAttribute('class','time-wrap head-timepicker')
        arrItems.forEach(function(item, i){
            let itemHead = document.createElement('div')
            itemHead.setAttribute('class','time-item next-'+arrItems[i])

            let iconHead = document.createElement('i')
            iconHead.setAttribute('class','fa fa-angle-up')

            itemHead.append(iconHead)
            headTime.append(itemHead)
        })

    let bodyTime = document.createElement('div')
        bodyTime.setAttribute('class','time-wrap body-timepicker')
        arrItems.forEach(function(item, i){
            let itemBody = document.createElement('div')
            itemBody.setAttribute('class','time-item view-'+arrItems[i])
            
            bodyTime.append(itemBody)
        })
    
    let footerTime = document.createElement('div')
        footerTime.setAttribute('class','time-wrap footer-timepicker')
        arrItems.forEach(function(item, i){
            let itemFooter = document.createElement('div')
            itemFooter.setAttribute('class','time-item prev-'+arrItems[i])

            let iconFooter = document.createElement('i')
            iconFooter.setAttribute('class','fa fa-angle-down')

            itemFooter.append(iconFooter)
            footerTime.append(itemFooter)
        })
    
    navTime.append(headTime)
    navTime.append(bodyTime)
    navTime.append(footerTime)
    eventKeyup(date,navTime)
    actionbtnTime(date,navTime)
    updateTime(date,value,bodyTime)
}
function eventKeyup(date,navTime){
    let inpTime = navTime.previousSibling
    let body = navTime.children[1]
    inpTime.addEventListener('keyup',function(){
        value = inpTime.value
        let convertTime = converTime(value)
        updateTime(convertTime,value,body)
    })
}
function actionbtnTime(date,navTime){
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    let inpTime = navTime.previousSibling
    let value = inpTime.value

    let bodyTime = navTime.children[1]
    
    let meridian = meridianTime(value)
    
    let wrapTime = navTime.childNodes
    wrapTime.forEach(function(item){
        let childs = item.childNodes
        childs.forEach(function(child){
            child.addEventListener('click',function(){
                if(child.classList.contains('next-hour')){
                    hour ++

                } else if(child.classList.contains('prev-hour')){
                    hour --

                } else  if(child.classList.contains('next-min')){
                    minute ++

                } else  if(child.classList.contains('prev-min')){
                    minute --
                    
                } else  if(child.classList.contains('next-sec')){
                    second ++

                } else  if(child.classList.contains('prev-sec')){
                    second --
                    
                } else  if(child.classList.contains('next-meridian') || child.classList.contains('prev-meridian')){
                    let boxview = item.nextSibling
                    if(child.classList.contains('prev-meridian')){
                        boxview = item.previousSibling
                    }
                    let viewMeridian = boxview.children[2]
                    meridian = viewMeridian.innerHTML.toLowerCase()
                    
                    if(meridian == 'am'){
                        //viewMeridian.innerHTML = 'PM'
                        hour = hour + 12
                    } else if(meridian == 'pm'){
                        //viewMeridian.innerHTML = 'AM'
                        hour = hour - 12
                    }
                }
                
                let updTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, second)
                let updHour = updTime.getHours()
                let updMinute = updTime.getMinutes()
                let updsecond = updTime.getSeconds()

                updMinute = (updMinute <= 9) ? '0'+updMinute : updMinute
                updsecond = (updsecond <= 9) ? '0'+updsecond : updsecond
                
                meridian = (meridian != 'sec' ) ? (updHour <= 11) ? 'am' : 'pm' : meridian
                updsecond = (meridian == 'sec') ? updsecond : meridian

                valSecond = (meridian == 'sec' ) ? ':'+updsecond : ' '+meridian
                
                let updValue = updHour+':'+updMinute+valSecond

                updateTime(updTime,updValue,bodyTime)
                
                updHour = (meridian == 'pm') ? updHour - 12 : updHour
                updHour = (meridian != 'sec' && updHour == 0) ? 12 : updHour
                updHour = (meridian == 'sec' && updHour == 0) ? '00' : updHour
                
                inpTime.value = updHour+':'+updMinute+valSecond.toUpperCase()
                
            })
        })

    })
}
function updateTime(date,value,body){
    //let navTime = body.parentNode
    //console.log(value)
    let head = body.previousSibling
    let childHead = head.children[2]

    let childBody = body.children[2]

    let footer = body.nextSibling
    let childFooter = footer.children[2]
    
    let child = 'sec'

    let tipeTime = value.substr(-2).toLowerCase()
    let meridian = child
    if(tipeTime == 'am' || tipeTime == 'pm'){
        child = 'meridian'
        meridian = tipeTime
    }
    
    switch (child) {
        case 'sec':
            childHead.classList.add('next-sec')
            childHead.classList.remove('next-meridian')
            childBody.classList.add('view-sec')
            childBody.classList.remove('view-meridian')
            childFooter.classList.add('prev-sec')
            childFooter.classList.remove('prev-meridian')
            break;
        case 'meridian':
            childHead.classList.add('next-meridian')
            childHead.classList.remove('next-sec')
            childBody.classList.add('view-meridian')
            childBody.classList.remove('view-sec')
            childFooter.classList.add('prev-meridian')
            childFooter.classList.remove('prev-sec')
            break;
        default:
            childHead.classList.add('next-sec')
            childHead.classList.remove('next-meridian')
            childBody.classList.add('view-sec')
            childBody.classList.remove('view-meridian')
            childFooter.classList.add('prev-sec')
            childFooter.classList.remove('prev-meridian')
            break;
    }

    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    seconds = (child == 'meridian') ? meridian.toUpperCase() : seconds
    
    hours = (meridian == 'pm') ? hours - 12 : hours
    hours = (meridian != 'sec' && hours == 0) ? 12 : hours
    hours = (meridian == 'sec' && hours == 0) ? '00' : hours
    
    
    minutes = (minutes <= 9) ? '0'+minutes : minutes
    seconds = (seconds <= 9) ? '0'+seconds : seconds

    let arrTime = []
    arrTime.push(hours)
    arrTime.push(minutes)
    arrTime.push(seconds)

    arrTime.forEach(function(item, i){
        let childs = body.children[i]
        childs.innerHTML = item
    })

    //actionbtnTime(date,navTime)
}
function meridianTime(value){
    let tipeTime = value.substr(-2).toLowerCase()
    let meridian = 'sec'
    if(tipeTime == 'am' || tipeTime == 'pm'){
        meridian = tipeTime
    }
    return meridian
}