/******** Select ********/
let selectOcean = document.querySelectorAll('.select');
selectOcean.forEach(function(select, index){
    index = []
    let tipe = select.multiple
    let search = select.dataset.search
    let tick = select.dataset.tick
    let style = select.dataset.style
        
    select.classList.remove('select')
    let cloneSelect = createSelect(select)
        cloneSelect.style.display = 'none'
    let boxSelect = document.createElement('div')
    boxSelect.classList.add('ocean-select')

    let selectOcean = document.createElement('div')
    selectOcean.classList.add('select-ocean')
    if(tipe){
        selectOcean.classList.add('select-multiple')
    }
    if(tick){
        selectOcean.classList.add('select-tick')
    }

    selectOcean.classList.add('dropdown')

    let btnSelect = document.createElement('div')
    btnSelect.classList.add('btn')  
    btnSelect.classList.add('dropdown-toggle')  
    if(style){
        btnSelect.classList.add(style)
    }

    let btnFilter = document.createElement('span')
        btnFilter.classList.add('filter-option')
    
    btnSelect.append(btnFilter)

    let navSelect = document.createElement('div')
    navSelect.setAttribute('class','dropdown-menu scroll')

    if(search){
        selectOcean.classList.add('select-search')        
        let boxinpt = document.createElement('div')
            boxinpt.setAttribute('class','dropdown-item input-search')
        let inpNav = document.createElement('input')
            inpNav.classList.add('form-control')
        
        boxinpt.append(inpNav)
        navSelect.append(boxinpt)
    }

    selectOcean.append(btnSelect)
    selectOcean.append(navSelect)

    boxSelect.append(cloneSelect)
    boxSelect.append(selectOcean)
    
    select.after(boxSelect)
    select.remove()

    optionBtn(index,cloneSelect,btnFilter)
    selectBox(btnFilter)
    selectAdd(index,cloneSelect,navSelect)    
});
function createSelect(select){
    let optSelect = select.options
    let tipe = select.multiple
    let name = select.name
    let max = select.dataset.max
    let search = select.dataset.search
    let holder = select.dataset.holder

    let data = []
    let tipeOpt = []
    let selected = []
    let icon = []

    let title = 'undefined'
    let posi = 0
    for (let i = 0; i < optSelect.length; i++) {
        let opt = optSelect[i];

        let value = opt.value
        let group = opt.parentNode
        let label = group.label

        let selec = opt.selected
        let state = 'nothing'

        if(selec == true){
            state = 'selected'
        }
        selected.push(state)
        posi = i
        
        data.push(value)
        tipeOpt.push('option')

        if(label != undefined){
            if(label != title){
                title = label
                posi = i
                if(posi > 0){
                    posi ++
                }
                data.splice(posi, 0, title)
                tipeOpt.splice(posi, 0, 'group')
                selected.splice(posi, 0, 'nothing')
            }
        }
        let ico = opt.dataset.icon
        icon.push(ico)
    }
    
    let newSelect = document.createElement('select')
        newSelect.classList.add('form-control')
        if(tipe){
            newSelect.multiple = true
        }
        newSelect.name = name
        if(max != undefined){
            newSelect.dataset.max = max
        }
        if(holder!=undefined){
            newSelect.dataset.holder = holder
        }
        if(search != undefined){
            newSelect.dataset.search = search
        }
        
        for (let i = 0; i < data.length; i++) {
            let option = document.createElement('option')
                option.classList.add(tipeOpt[i])
                if(selected[i] == 'selected'){
                    option.selected = true
                }
                if(icon[i] != undefined){
                    option.dataset.icon = icon[i]
                }          
                option.append(data[i])
            newSelect.append(option)  
        }
        return newSelect
}
function optionBtn(arrData,select,btnFilter){ 
    let arrIcon = []
    let value = select.value
    let holder = select.dataset.holder
    let childs = select.childNodes
    
    if(value == ''){
        value = 'Nothing selected'
        arrData.push(value)
    }
    
    childs.forEach(function(option, i){
        value = option.value
        let icon = option.dataset.icon        
        
        if(option.selected){
            if(i == 0 && holder != undefined){
                value = holder
            }
            if(icon != undefined){
                arrIcon.push(icon)
            }
            arrData.push(value)
        }
    })
    
    let count = arrData.length - 1
    arrData.forEach(function(data, i){
        let icon = arrIcon[i]
        
        if(icon != undefined){
            let icoBox = document.createElement('i')
                icoBox.setAttribute('class',icon)
                btnFilter.append(icoBox)
        }

        let option = data
        if(count != i){
            option = data+', '
        }
        btnFilter.append(option)
    })
   
}
function selectBox(btnFilter){
    let btn = btnFilter.parentNode
    let dropSelect = btn.parentNode
    let dropNav = dropSelect.children[1]
    
    btn.addEventListener('click',function(){
        dropSelect.classList.toggle('show');
        if(dropSelect.classList.contains('select-search')){
            searchData(dropNav)
        }
        updDropdown(dropNav,dropSelect)        
        
    })
}
function updDropdown(dropNav,dropSelect){
    let stateDrop = selectVisible(dropNav)        
    if(dropSelect.classList.contains('dropdown') && stateDrop == false){
        dropSelect.classList.add('dropup')
    } else if (dropSelect.classList.contains('dropdown') && stateDrop == true) {
        dropSelect.classList.remove('dropup')
    } else if(dropSelect.classList.contains('dropup') && stateDrop == false){
        dropSelect.classList.add('dropdown')
    } else if (dropSelect.classList.contains('dropup') && stateDrop == true) {
        dropSelect.classList.remove('dropdown')
    } else if (dropSelect.classList.contains('dropleft') && stateDrop == false) {
        dropSelect.classList.add('dropright')
        dropSelect.classList.add('droptop')
    } else if (dropSelect.classList.contains('dropleft') && stateDrop == true) {
        dropSelect.classList.remove('dropright')
        dropSelect.classList.remove('droptop')
    } else if (dropSelect.classList.contains('dropright') && stateDrop == false) {
        dropSelect.classList.add('dropleft')
        dropSelect.classList.add('droptop')
    } else if (dropSelect.classList.contains('dropright') && stateDrop == true) {
        dropSelect.classList.remove('dropleft')
        dropSelect.classList.remove('droptop')
     }
}
function selectOption(arrData,selectNav){
    let oceanSelect = selectNav.parentNode
    let select = oceanSelect.previousSibling
    let childs = selectNav.childNodes
    let max = select.dataset.max
    
    childs.forEach(function(option){
        if(option.classList.contains('item-option')){
            option.addEventListener('click',function(){                
                let data = option.dataset.option
                if(arrData[0] == 'Nothing selected'){
                    arrData.splice(0,1)
                }               
                if(oceanSelect.classList.contains('select-multiple')){               
                    let i = arrData.indexOf(data)
                    if(i === -1){
                        arrData.push(data)
                    } else {
                        arrData.splice(i,1)
                    }
                } else {
                    arrData[0] = data
                }
                
                if(max != undefined){
                    if(arrData.length <= max){
                        //option.classList.toggle('selected')                
                        optionSelected(arrData,select,oceanSelect)
                    } else {
                        let msg = document.createElement('div')
                            msg.setAttribute('class','msg msg-warning')
                            msg.innerHTML = 'Limit '+max+' item max'
                            selectNav.append(msg)
                            tempMsg(msg,2000)
                    }
                } else {
                    //option.classList.toggle('selected')                
                    optionSelected(arrData,select,oceanSelect)
                }
            })
        }
        
    })
}
function optionSelected(arrData,select,oceanSelect){
    let btnSelect = oceanSelect.children[0]
    let btnFilter = btnSelect.children[0]
    let navSelect = oceanSelect.children[1]
    let childs = select.childNodes
    childs.forEach(function(option, j){
        let value = option.value
        option.selected = false
        arrData.forEach(function(data, i){
            let value = option.value
            if(value == data){
                option.selected = true
            }
        }) 
    })
    
    let child = navSelect.childNodes
    child.forEach(function(option){
        option.classList.remove('selected')
        let value = option.dataset.option
        arrData.forEach(function(data){
            if(value == data){
                option.classList.add('selected')
            }
        })        
    })
    updateBtn(select,btnFilter) 
}
function updateBtn(select,btnFilter){
    btnFilter.innerHTML = "";    
    let value = select.value    
    let childs = select.childNodes
    let arrData = []
    let arrIcon = []
    
    childs.forEach(function(option, i){
        if(option.selected){
            value = option.value
            arrData.push(value)  
            let ico = option.dataset.icon
            if(ico !=  undefined){
                arrIcon.push(ico)
            }
        }
    })
    let cant = arrData.length
    arrData.forEach(function(data, i){
        let ico = arrIcon[i]
        if(ico !=  undefined){
            let icon = document.createElement('i')
                icon.setAttribute('class',ico)
                btnFilter.append(icon)
        }
        let add = data
        if(i != (cant-1)){
            add = data+', '
        }
        btnFilter.append(add)
    })
    if(cant == 0){
        btnFilter.append('Nothing Selected')
    }
}
function selectAdd(arrData,select,menuSelect){
    let option = select.options    
    for (let i = 0; i < option.length; i++) {
        let opt = option[i];

        let value = opt.value
        let classOpt = opt.className
        
        let icon = opt.dataset.icon
        if(icon == undefined){
            icon = 'vacio'
        }        
        
        let selected = opt.selected

        menuSelect.append(createOption(value,classOpt,selected,icon))
    }
    selectOption(arrData,menuSelect)
}
function createOption(value,classopt,selected,ico){
    let item
        if(classopt == 'group'){
            item = document.createElement('div');            
        } else if(classopt == 'option'){
            item = document.createElement('a');
        }
        item.classList.add('dropdown-item');
        if(classopt == 'group'){
            item.classList.add('item-title')
        } else {
            item.classList.add('item-option')
        }
        if(selected == true){
            item.classList.add('selected')
        }
        item.setAttribute('data-option',value);
        if(ico != 'vacio'){
            let icon = document.createElement('span')
                icon.setAttribute('class',ico)
                item.append(icon)
        }
    item.append(value)
    return item;
}
function searchData(selectOcean){
    let selectBox = selectOcean.parentNode
    let boxSearch = selectOcean.children[0]
    let search = boxSearch.children[0]
    let child = selectOcean.childNodes
    
    search.addEventListener('keyup',function(){
        let entry = search.value.toLowerCase()
        child.forEach(function(option, i){
            if(i >= 1){
                let list = option.dataset.option
                let data = list.toLowerCase()
                if(data.indexOf(entry) > - 1){
                    option.style.display = ''
                } else {
                    option.style.display = 'none'
                }
            }        
        })
        
    })
}
function selectVisible(data){
    let ocean = data.getBoundingClientRect();

    let top = ocean.top
    let bottom = ocean.bottom
    let right = ocean.right
    let left = ocean.left
    
   let widthView = window.innerWidth || document.documentElement.clientWidth;
   let heightView = window.innerHeight || document.documentElement.clientHeight;

   state = true
   if(top >= 0 && bottom <= heightView && left >= 0 &&  right <= widthView){
        state = true
   } else {
        state = false
   }
   
   return state
}

