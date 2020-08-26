const navbarCollap = document.querySelector('.navbar-collapse');
navbarCollap.addEventListener('click',function(){
    let navbar = navbarCollap.parentNode;
    let navmenu = navbarCollap.nextSibling;
    navbar.classList.toggle('show');
});

const droptoggle = document.querySelectorAll('.dropdown-toggle');
droptoggle.forEach(function (item){
    item.addEventListener('click', function(){
        var dropdown = item.parentNode;
        dropdown.classList.toggle('show');
        
        let dropnav = dropdown.children[1]
        let stateDrop = elemVisible(dropnav)
        
        if(dropdown.classList.contains('dropdown') && stateDrop == false){
            dropdown.classList.add('dropup')
        } else if (dropdown.classList.contains('dropdown') && stateDrop == true) {
            dropdown.classList.remove('dropup')
        } else if(dropdown.classList.contains('dropup') && stateDrop == false){
            dropdown.classList.add('dropdown')
        } else if (dropdown.classList.contains('dropup') && stateDrop == true) {
            dropdown.classList.remove('dropdown')
        } else if (dropdown.classList.contains('dropleft') && stateDrop == false) {
            dropdown.classList.add('dropright')
            dropdown.classList.add('droptop')
        } else if (dropdown.classList.contains('dropleft') && stateDrop == true) {
            dropdown.classList.remove('dropright')
            dropdown.classList.remove('droptop')
        } else if (dropdown.classList.contains('dropright') && stateDrop == false) {
            dropdown.classList.add('dropleft')
            dropdown.classList.add('droptop')
        } else if (dropdown.classList.contains('dropright') && stateDrop == true) {
            dropdown.classList.remove('dropleft')
            dropdown.classList.remove('droptop')
        }
    });
});

/******** Forms ********/
let tagsinp = document.querySelectorAll('.tags-input');
tagsinp.forEach(function(item){
    let value = item.value;

    let placeholder = item.placeholder;
    let oceantags = document.createElement('div');
    oceantags.classList.add('ocean-tags-input');

    let oceantagsinp = document.createElement('input');
    oceantagsinp.setAttribute('type','text');
    oceantagsinp.classList.add('tags-add');
    oceantagsinp.placeholder = placeholder;
    oceantags.append(oceantagsinp)
    
    let lblTagsd = document.createElement('div');
    lblTagsd.classList.add('ocean-tags');
    oceantags.prepend(lblTagsd)
    
    item.before(oceantags);
});

let tagsTags = document.querySelectorAll('.ocean-tags-input');
tagsTags.forEach(function(item, index){
    //se crea un array con el indice de cada input tag
    index = [];
    //indexTags(index,'','')
    //Se obtiene los datos del input hermano    
    let tagsinput = item.nextSibling
    tagsinput.type = 'hidden'
    let value = tagsinput.value;

    let tagsBox = item.childNodes
    
    tagsBox.forEach(function(box){
        if(box.classList.contains('ocean-tags')){
            if(value != ''){
                let tagsinp = value.split(',');
                let numTags = tagsinp.length
                for (let i = 0; i < numTags; i++) {
                    let tagsinpt = tagsinp[i];
                    index.push(tagsinpt);
                    addTags(index,box);
                }
            }
        }
    })
    
    tagsBox.forEach(function(child){
        if (child.classList.contains('tags-add')) {
            let boxTags = child.previousSibling

            child.addEventListener('keyup', function(e){
                if(e.key === 'Enter'){
                    let tagAdd = child.value
                    let itags = index.indexOf(tagAdd)            
                    if(itags === -1){
                        index.push(tagAdd)
                        addTags(index,boxTags)
                        addData(index,tagsinput)
                        child.value = ''                 
                    }                    
                }
            })
        }
    })
});
function deleteTags(arrData,boxTags){
    let tags = boxTags.childNodes
    tags.forEach(function(tag){
        let iconDel = tag.childNodes
        iconDel.forEach(function(icon){
            icon.addEventListener('click',function(){
                let tagLabel = icon.dataset.tags
                let itags = arrData.indexOf(tagLabel);
                arrData.splice(itags,1);
                addTags(arrData,boxTags)
                let oceanTags = boxTags.parentNode
                let inptTags = oceanTags.nextSibling
                addData(arrData,inptTags)
            })
        })
    })
}
function addData(arrData,inpAdd){
    let cantTags = arrData.length - 1;
    inpAdd.value = ''
    arrData.forEach(function(val, i){
        if(i == cantTags){
            val = val
        } else {
            val = val+','
        }
        inpAdd.value += val;
    });
}
function createTags(tag){
    let oceanTag = document.createElement('span');
        oceanTag.classList.add('tags-label');
        oceanTag.innerHTML = tag;

    let oceanTagsClose = document.createElement('span');
        oceanTagsClose.classList.add('tags-remove');
        oceanTagsClose.setAttribute('data-tags',tag);
        oceanTagsClose.innerHTML = 'x';

        oceanTag.append(oceanTagsClose);
        
    return oceanTag;
}
function addTags(arraTags,boxTags){
    boxTags.innerHTML = ''
    arraTags.slice().reverse().forEach(function(tag){
        boxTags.prepend(createTags(tag))
    });
    deleteTags(arraTags,boxTags)
}

let lblAnimate = document.querySelectorAll('.form-animate .label-control')
lblAnimate.forEach(function(item){
    let boxAnimate = item.parentElement
    let newLbl = item.cloneNode(true)
    boxAnimate.append(newLbl)
    item.remove()
})
let inpAnimate = document.querySelectorAll('.form-animate .form-control')
inpAnimate.forEach(function(item){
    let boxAnimate = item.parentElement
    item.addEventListener('keydown',function(){        
        let value = item.value
        if(value != ''){
            boxAnimate.classList.add('active')
        } else {
            boxAnimate.classList.remove('active')
        }
    })
})

let formControl = document.querySelectorAll('.form-control')
formControl.forEach(function(input,i){
    //Password
    let tipeFrm = input.dataset.form
    if(tipeFrm != undefined){  
        tipeFrm.toLowerCase()
        if(tipeFrm == 'password' || tipeFrm == 'pass'){
            viewPassword(input,i)
        }
    }    
})
function viewPassword(input,i){
    let idInp = input.id
        if(idInp == ''){
            idInp = 'passview'+i
        }

    let newPassword = input.cloneNode(true)
        newPassword.id = idInp
    let group = document.createElement('div')
        group.classList.add('input-group')
    
    let itemIcon = document.createElement('div')
        itemIcon.classList.add('input-group-append')
    
    let labelIcon = document.createElement('label')
        labelIcon.classList.add('input-group-text')
        labelIcon.setAttribute('for',idInp)
    
    let icon = document.createElement('i')
        icon.setAttribute('class','far fa-eye-slash')

    labelIcon.append(icon)
    itemIcon.append(labelIcon)

    group.append(newPassword)
    group.append(itemIcon)
    input.after(group)
    input.remove()

    labelIcon.addEventListener('click',function(){
        let tipe = newPassword.type.toLowerCase()
        if(tipe == 'password'){
            newPassword.type = 'text'
            icon.classList.add('fa-eye')
            icon.classList.remove('fa-eye-slash')
        } else if (tipe == 'text') {
            newPassword.type = 'password'
            icon.classList.add('fa-eye-slash')
            icon.classList.remove('fa-eye')
        }
    })
}
/******** Datable ********/
let datatable = document.querySelectorAll('.datatable')
datatable.forEach(function(item){
    let cloneTable = item.cloneNode(true);
    let tableWrapper = document.createElement('div');
        tableWrapper.classList.add('datatable-wrapper');

    let tablehead = document.createElement('div');
        tablehead.classList.add('table-head');

    let tableShow = document.createElement('div');
        tableShow.classList.add('table-show');    
    
    let tableSearch = document.createElement('div');
        tableSearch.classList.add('table-search');

    let labelShow = document.createElement('label');
    let selectShow = document.createElement('select');
    let dataSelect = ['10','25','50','100'];
        for (let i = 0; i < dataSelect.length; i++) {
            const option = dataSelect[i];
            console.log(option);
            let optionSelect = document.createElement('option');
            optionSelect.value = option;
            optionSelect.text = option;
            selectShow.append(optionSelect);
        }

        labelShow.innerHTML = 'View'
        labelShow.append(selectShow);

    tableShow.append(labelShow)

    let labelSearch = document.createElement('label');
    let inputSearch = document.createElement('input');
        labelSearch.innerHTML = 'Search';
        labelSearch.append(inputSearch);
    
    tableSearch.append(labelSearch)
    

    let tableFooter = document.createElement('div');
        tableFooter.classList.add('table-footer');

    let tableInfo = document.createElement('div');
        tableFooter.classList.add('table-info');

    let tableNav = document.createElement('div');
        tableNav.classList.add('table-nav');

    tablehead.append(tableShow)
    tablehead.append(tableSearch)
    tableFooter.append(tableInfo);
    tableFooter.append(tableNav);

    tableWrapper.append(tablehead)
    tableWrapper.append(cloneTable)
    tableWrapper.append(tableFooter);

    item.before(tableWrapper);
    item.remove();
});

function elemVisible(data){
    
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

/******** Click Document ********/
document.addEventListener('click', function(e){
    let link = e.target;
    if (link.classList.contains('fa') || link.classList.contains('far') || link.classList.contains('fal') || link.classList.contains('fas') || link.classList.contains('fab')) {
        link = link.parentNode;
    }
        
    /******** dropdown ********/
    let toggleall = document.querySelectorAll('.dropdown-toggle');
    toggleall.forEach(function(btn){
        let dropdown = btn.parentNode;
        let dropNav = btn.nextSibling
        let btnFilter = btn.children[0]
        
        if (link != btn && link != btnFilter) {
            dropdown.classList.remove('show');
        }

        if(dropdown.classList.contains('select-multiple')){          
            //let dropNav = dropdown.children[1]
            let childs = dropNav.childNodes
            childs.forEach(function(child){
                
                if (link == child) {
                    if(!dropdown.classList.contains('show')){
                        dropdown.classList.add('show');
                    } else {
                        dropdown.classList.remove('show');
                    }
                }           
            })       
        }
        if(dropdown.classList.contains('select-ocean')){
            //let dropNav = dropdown.children[1]
            let childs = dropNav.childNodes
            childs.forEach(function(child){
                if(child.classList.contains('input-search')){
                    let search = child.children[0]
                    if (link == search) {
                        if(!dropdown.classList.contains('show')){
                            dropdown.classList.add('show');
                        } else {
                            dropdown.classList.remove('show');
                        }
                    }
                }  
            }) 
        }
    })
    
    let toggleDate = document.querySelectorAll('.datepicker');
    toggleDate.forEach(function(btn){
        let dropdown = btn.parentNode;
        let dropNav = btn.nextSibling
        
        if (link != btn) {
            dropdown.classList.remove('show');
        }
        
        let head = dropNav.children[0]
        let childHead = head.childNodes
        childHead.forEach(function(item){
            if (link == item) {
                if(!dropdown.classList.contains('show')){
                    dropdown.classList.add('show')
                }
            }
        })
    })
    let headDate = document.querySelectorAll('.table-datepicker .item-date');
    headDate.forEach(function(item){
        let table = item.parentNode
        let body = table.parentNode
        let nav = body.parentNode
        let oceanDate = nav.parentNode
        
        let childItem = item.childNodes
        childItem.forEach(function(child){
            if (link == child) {
                if(!oceanDate.classList.contains('show')){
                    oceanDate.classList.add('show')
                }
            }
        })        
    })
    
    let toggleTime = document.querySelectorAll('.timepicker');
    toggleTime.forEach(function(btn){
        let dropdown = btn.parentNode;
        let dropNav = btn.nextSibling
        let childs = dropNav.childNodes
        if (link != btn) {
            dropdown.classList.remove('show');
        }
        childs.forEach(function(child){
            let itemTime = child.childNodes
            itemTime.forEach(function(item){                
                if (link == item) {
                    if(!dropdown.classList.contains('show')){
                        dropdown.classList.add('show');
                    }
                } 
            })
            
        })
    })
});
function tempMsg(msg,time){
    setTimeout(function(){
        msg.remove()
    }, time);
}

/******** Carousel ********/
/*
let indice = 1;
let max = 0;
let time = 5000;
muestraSlide(indice);

const indicator = document.querySelectorAll('.indicators-item');
indicator.forEach(function (item) {
    max ++;
    item.addEventListener('click', function(){
        let numSlide = item.dataset.slide;
        muestraSlide(indice = numSlide);
    });
});

const controlSlide = document.querySelectorAll('.controls-item');
controlSlide.forEach(function(item){  
    item.addEventListener('click', function(){
        let nameControl = item.dataset.slide;
        if (nameControl.toLowerCase() == 'prev') {
            if(indice == 1){
                indice = max;
            } else {
                indice --;
            }
        } else if (nameControl.toLowerCase() == 'next') {
            if(indice == max){
                indice = 1;
            } else {
                indice ++;
            }
        }
        muestraSlide(indice);
    });
});

setInterval(function tiempo(){
    muestraSlide(indice+=1);
},time)

function muestraSlide(n){    
    let i;
    let slide = document.getElementsByClassName('carousel-item');
    let indicators = document.getElementsByClassName('indicators-item');

    let cantSlide = slide.length;

    if(n > cantSlide){
        indice = 1
    }
    
    if(n < 1){
        indice = cantSlide
    }

    for (i = 0; i < cantSlide; i++) {
        slide[i].className = slide[i].className.replace(" active","");
        indicators[i].className = indicators[i].className.replace(" active","");   
    }
    
    slide[indice-1].className += ' active';
    indicators[indice-1].className += ' active';
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