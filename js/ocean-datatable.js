/******** Datable ********/
let datatable = document.querySelectorAll('.datatable')
datatable.forEach(function(item){
    let optView = ['10','25','50','100']
    let pageNumber = 1  //Number of page - default = 1
    let cantItem = optView[0]   //Quantity of item for page

    let className = item.className
    
    let itemThead = item.children[0]

    let itemTbody = item.children[1]
    

    let arrData = dataTable(itemTbody)  //Array Data
    let cantData = arrData.length       //Quantity array Data

    let pageCant = Math.ceil(cantData/cantItem) //Quantity of page


    //console.log(cantData)
    //console.log(pageCant)

    /*
    let pageNumber = 1;
    let pageSize = 2; //Cantidad de item que muestra
    let noticias = ["noticias 1","noticias 2","noticias 3","noticias 4","noticias 5","noticias 6","noticias 7","noticias 8","noticias 9","noticias 10","noticias 11","noticias 12","noticias 13"];
    let noticiasHtml = '';
    let pagination;
    var pageCont = Math.ceil(noticias.length/pageSize);
    */

    //Create New Table
    let newTable = document.createElement('table')
        newTable.setAttribute('class',className)
    
    let thead = document.createElement('thead')
    let trhead = document.createElement('tr')
    listTHead(itemThead,trhead)
    thead.append(trhead)

    let tbody = document.createElement('tbody')    
    newTable.append(thead)
    newTable.append(tbody)

    
    let tableWrapper = document.createElement('div');
        tableWrapper.classList.add('datatable-wrapper');

    let tablehead = document.createElement('div');
        tablehead.classList.add('table-head');

    let tableShow = document.createElement('div');
        tableShow.classList.add('table-show');    
    
    let tableSearch = document.createElement('div');
        tableSearch.classList.add('table-search');
        
    let tableFooter = document.createElement('div');
        tableFooter.classList.add('table-footer');

    let footerInfo = document.createElement('div');
        footerInfo.classList.add('table-info');

    let footerNav = document.createElement('div');
        footerNav.classList.add('table-nav');
        

    tablehead.append(tableShow)
    tablehead.append(tableSearch)
    tableFooter.append(footerInfo);
    tableFooter.append(footerNav);

    tableWrapper.append(tablehead)
    tableWrapper.append(newTable)
    tableWrapper.append(tableFooter)

    optionShow(tableShow,optView)
    optionSearch(tableSearch,arrData,pageNumber)
    
    selectShow(tablehead,arrData,pageNumber)
    showTable(tbody,arrData,pageNumber,cantItem,pageCant)  

    item.before(tableWrapper);
    item.remove();
});
function listTHead(itemHead,thead){
    let trItemHead = itemHead.children[0]
    let thItemHead = trItemHead.children
    for (let item of thItemHead){
        let title = item.innerHTML
        let th = document.createElement('th')
        th.append(title)
        thead.append(th)
    }
}
function dataTable(itemBody){    
   let arraItem = []
   
   let count = 0;
   let cont = 0
   
   let trItemBody = itemBody.children
   for(let item of trItemBody){
       let dataItem = item.children
       arraItem[count] = new Array()
       for(let data of dataItem){
           let val = data.innerHTML
           arraItem[count][cont] = val
           cont ++
       }
       cont = 0
       count ++    
   }

   return arraItem
}

function optionShow(show,optView){    
    let firstOpt = optView[0]

    let titleShow = document.createElement('label')
        titleShow.innerHTML = 'Show'

    let oceanSelect = document.createElement('div')
        oceanSelect.classList.add('ocean-select')
        
    let dropSelect = document.createElement('div')
        dropSelect.setAttribute('class','select-ocean dropdown')
    
    let btnToggle = document.createElement('div')
        btnToggle.setAttribute('class','btn dropdown-toggle')
        btnToggle.append(firstOpt)
    
    let navSelect = document.createElement('div')
        navSelect.setAttribute('class','dropdown-menu scroll')

        for(let opt of optView){
            let optSelect = document.createElement('a')
                optSelect.setAttribute('class','dropdown-item item-option')
            optSelect.append(opt)            
            navSelect.append(optSelect)
        }

    dropSelect.append(btnToggle)
    dropSelect.append(navSelect)
    oceanSelect.append(dropSelect)

    btnToggle.addEventListener('click',function(){
        dropSelect.classList.toggle('show')
    })

    show.append(titleShow)
    show.append(oceanSelect)
}

function optionSearch(search,arrData,pageNumber){
    let head = search.parentNode
    let boxShow = search.previousSibling
    let oceanSelect = boxShow.children[1]
    let dropSelect = oceanSelect.children[0]
    let btnSelect = dropSelect.children[0]
    
    let table = head.nextSibling
    let tbody = table.children[1]

    let labelSearch = document.createElement('label');       
        labelSearch.innerHTML = 'Search';

    let inputSearch = document.createElement('input');
        inputSearch.setAttribute('class','form-control')

    search.append(labelSearch)
    search.append(inputSearch)
    /*
    let test = ['juan','pedro','jose','pedro','alberto','giannina','alberto']
    console.log(test)

    test = arrayUnique(test)
    console.log(test)
    */

    inputSearch.addEventListener('keyup',function(){
        let showItem = btnSelect.innerHTML

        let filterKeys = []
        let filterData = []
 
         let value = inputSearch.value.toLowerCase()
         let cantVal = value.length
         
         if(cantVal >= 1){
             let row = 0
             for(let item of arrData){
                 
                 for(let data of item){
                     data = data.toLowerCase()
                     if(data.indexOf(value) >= 0){
                         filterKeys.push(row)
                     }
                 }
                 row ++
             }
         } else {
             let row = 0
             for(let item of arrData){
                 filterKeys.push(row)
                 row ++
             }
         }
         
        for(let key of filterKeys){   
             let count = 0
             for(let row of arrData){
                 if(count == key){
                     filterData.push(row)
                 }
                 count ++
             }
        }
        
        filterData = arrayUnique(filterData)

        let cantFilter = filterData.length
        let pageCant = Math.ceil(cantFilter/showItem)
        
        showTable(tbody,filterData,pageNumber,showItem,pageCant)
        selectShow(head,filterData,pageNumber)
    })
}
function arrayUnique(arrData){
    let newArr = new Set(arrData)
    return [...newArr]
}
function selectShow(tablehead,arrData,pageNumber){
    let tableShow = tablehead.children[0]
    let oceanSelect = tableShow.children[1]
    let dropSelect = oceanSelect.children[0]

    let table = tablehead.nextSibling
    let tbody = table.children[1]

    let cantData = arrData.length

    let btnSelect = dropSelect.children[0]
    let navSelect = dropSelect.children[1]
    let itemSelect = navSelect.children

    for(let item of itemSelect){
        item.addEventListener('click',function(){
            let value = item.innerHTML
            btnSelect.innerHTML = value
            let pageCant = Math.ceil(cantData/value)
            showTable(tbody,arrData,pageNumber,value,pageCant)
        })
    }
}
function showTable(tbody,arrData,pageNumber,viewItem,pageCant){
    tbody.innerHTML = ''
    let bodyOcean = tbody.parentNode
    let footerOcean = bodyOcean.nextSibling
    let infoShow = footerOcean.children[0]
    let navigation = footerOcean.children[1]
    
    let cantData = arrData.length
    let iniViewData = (pageNumber-1) * viewItem
    let endViewData = pageNumber * viewItem
    
    
    //View select data
    let arrView =  arrData.slice(iniViewData, endViewData) //0,10
    
    //Load rows and item in table
    for(let row of arrView){
        let tr = document.createElement('tr')
        for(let item of row){
            let td = document.createElement('td')
                td.innerHTML = item//.append(item)                
            tr.append(td)
        }
        tbody.append(tr)
    }

    endViewData = (endViewData > cantData) ? cantData : endViewData

    //Showing Data
    let toView = iniViewData + 1
    infoShow.innerHTML = 'Showing '+toView+' to '+endViewData+' of '+cantData
    
    navigationTable(navigation,arrData,pageNumber,viewItem,pageCant)
}
function navigationTable(navigation,arrData,pageNumber,viewItem,pageCant){
    pageNumber = parseInt(pageNumber)
    pageCant = parseInt(pageCant)
    let footerTable = navigation.parentNode
    let bodyTable = footerTable.previousSibling
    let tbody = bodyTable.children[1]
    
    //pageCant = 8
    let arrNav = ['Prev',1,'Next']

    if(pageCant > 1 && pageCant <= 5){
        for (let i = 1; i < pageCant; i++) {
            arrNav.splice(i+1,0,i+1)
        }
    }
    
    if(pageCant > 5){
        for (let i = 1; i < 5; i++) {
            arrNav.splice(i,0,i)
        }
        arrNav[5] = pageCant
    }

    let lastPage = pageCant + 1
    let prevPage =  pageNumber - 1
    let nextPage = pageNumber + 1

    if(pageNumber > 4 && pageNumber <= pageCant ){
        let iniNav = prevPage
        let finNav = nextPage
        if(pageNumber == pageCant || pageNumber == (pageCant-1)){
            iniNav = pageCant - 3
            finNav = pageCant - 1
        }
        let ini = 2
        for (let i = iniNav; i <= finNav; i++) {
            arrNav.splice(ini,1,i)
            ini++
        }
    }
    
    navigation.innerHTML = ''

    let boxNav = document.createElement('div')
        boxNav.classList.add('pagination')

    for(let page of arrNav){

        let item = document.createElement('div')
            item.classList.add('option')
            item.dataset.page = page

            if(page == pageNumber){
                item.classList.add('active')
            }
            if(page == 'Prev'){
                item.dataset.page = prevPage
                if(pageNumber == 1){
                    item.classList.add('enabled')
                }
            }
            if(page == 'Next'){
                item.dataset.page = nextPage
                if(nextPage == lastPage){
                    item.classList.add('enabled')
                }
            }
            
            item.append(page)
        boxNav.append(item)

        
        if(!item.classList.contains('enabled')){
            item.addEventListener('click',function(){
                let page = item.dataset.page
                showTable(tbody,arrData,page,viewItem,pageCant)
            })
        } 
    }
    navigation.append(boxNav)
}


/******** Datatable ********/
/*
let pageNumber = 1;
let pageSize = 2; //Cantidad de item que muestra
let noticias = ["noticias 1","noticias 2","noticias 3","noticias 4","noticias 5","noticias 6","noticias 7","noticias 8","noticias 9","noticias 10","noticias 11","noticias 12","noticias 13"];
let noticiasHtml = '';
let pagination;
var pageCont = Math.ceil(noticias.length/pageSize);

function paginate(array,pages_size,page_number){
    return array.slice((page_number-1) * pages_size, page_number * pages_size); //6 * 2, 1*2
}

function numPage(number){
    pageNumber = number;
    showNoticias(noticias);
}

function nextPage(){
    pageNumber++;
    showNoticias(noticias);
}

function prevPage(){
    pageNumber--;
    showNoticias(noticias);
}

function showNoticias(){
    let pagination = paginate(noticias,pageSize,pageNumber);
    //console.log(pagination);
    noticiasHtml = "<ul>";
    pagination.forEach(noticia =>{
        noticiasHtml += "<li>"+noticia+"</li>";
    })
    noticiasHtml += "</ul>";
    noticiasHtml += pageNumber > 1 ? "<button onclick='prevPage()'>Anterior</buttton>" : "";

    noticiasHtml += "<div>";
    for (let i = 0; i < pageCont; i++) {
        let num = i + 1;
        noticiasHtml += "<button onclick='numPage("+num+")'> - "+num+" - </buttton>";        
    }
    noticiasHtml += "</div>";

    noticiasHtml += pageNumber < pageCont ? "<button onclick='nextPage()'>Siguiente</buttton>" : "";
    document.getElementById("noticias").innerHTML="";
    document.getElementById("noticias").innerHTML=noticiasHtml;
}
showNoticias();
*/