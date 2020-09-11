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

/******** Carousel ********/
const carrousel = document.querySelectorAll('.carousel');
let timeSlide = 3000
let widthItem = 0

carrousel.forEach(function(slide) {
    slide.dataset.slideStatus = 'play'
    let intervalSlide = slide.dataset.slideInterval
    if(intervalSlide != undefined){
        timeSlide = intervalSlide
    }
    
    let slideHover = slide.dataset.slideHover;
    if(slideHover == undefined || slideHover.toLowerCase() != 'true'){
        slide.dataset.slideHover = 'false'
    }
    
    let position = 1
    let cant = 0
    intervalView(position,slide)
    viewSlide(position,slide)
    //Indicators
    let indicator = slide.children[0]
    indicatorSlide(indicator,cant,position)

    //Content
    let content = slide.children[1]
    let itemConten = content.children
    widthItem = content.children[0].clientWidth    
    document.addEventListener('resize', function(){
        widthItem = content.children[0].clientWidth
    })
        
    let cantSlide = itemConten.length
    
    //Control
    let control = slide.children[2]
    controlSlide(control,cantSlide,position)
    
    if( slide.dataset.slideHover.toLowerCase() == 'true'){
        slide.addEventListener('mouseover', function(){
            slide.dataset.slideStatus = 'pause'
        })
    }    
    slide.addEventListener('mouseout', function(){
        slide.dataset.slideStatus = 'play'
    })
})
function indicatorSlide(indicators,cant,position){
    let slide = indicators.parentNode
    let indicator = indicators.children
    for (let i = 0; i < indicator.length; i++) {
        let item = indicator[i];
        cant ++
        item.addEventListener('click', function(){
            let num = i + 1
            viewSlide(position = num,slide)
        });
    }
}
function controlSlide(controls,cant,index){
    let slide = controls.parentNode
    let control = controls.children
    for (let i = 0; i < control.length; i++) {
        let item = control[i];
        item.addEventListener('click', function(){
            if(item.classList.contains('control-prev')){
                if(index == 1){
                    index = cant;
                } else {
                    index --;
                }
            } else if(item.classList.contains('control-next')){
                if(index == cant){
                    index = 1;
                } else {
                    index ++;
                }                
            }
            viewSlide(index,slide)
        })
    }
}
function intervalView(num,slide){
    let contentSlide = slide.children[0]
    let cantItem = contentSlide.children.length
    
    setInterval(function(){
        let status = slide.dataset.slideStatus
        if(status == 'play'){
            viewSlide(num+=1,slide);
            if(num > cantItem){
                num = 1
            }
        }
    },timeSlide)
}

function viewSlide(num,slide){
    //Indicators
    let indicators = slide.children[0]
    let itemIndicator = indicators.children
    //Items
    let content = slide.children[1]
    let itemContent = content.children
    
    let cantItem = itemContent.length

    if(num > cantItem){
        num = 1
    }
    if(num < 1){
        num = cantItem
    }

    let delis = widthItem * (num-1)

    content.style.transform = "translate("+-delis+"px)"
    content.style.transition = "transform 1s"
    
    for (let i = 0; i < cantItem; i++) {
        let item = itemContent[i];
        let indicator = itemIndicator[i]
        let indItem = i + 1
        if (indItem == num){
            item.classList.add('active')
            indicator.classList.add('active')
        } else {
            item.classList.remove('active')
            indicator.classList.remove('active')
        }
    }
}