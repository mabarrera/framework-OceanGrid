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
carrousel.forEach(function(slide) {
    slide.dataset.slideStatus = 'play'
    let intervalSlide = slide.dataset.slideInterval
    
    let timeSlide = 3000
    if(intervalSlide != undefined){
        timeSlide = intervalSlide
    }
    
    let slideHover = slide.dataset.slideHover;
    if(slideHover == undefined || slideHover.toLowerCase() != 'true'){
        slide.dataset.slideHover = 'false'
    }

    let indexSlide = 1
    
    //Efect Slide
    let effectSlide = slide.dataset.slideEffect
    
    //Add indicators
    let indicators = slide.dataset.slideIndicators
    if(indicators == undefined || indicators != 'false'){
        createIndicators(slide)
        
    }

    cloneItems(slide)
    
    let content = viewContent(slide)
    let cantSlide = content.children.length

    
    let interval = setInterval(function(){
        indexSlide ++
        if(effectSlide != undefined){            
            if(indexSlide > cantSlide){
                indexSlide = 1
            }
        }        
        showSlide(slide,indexSlide)
        
    },timeSlide)
    
    let itemSlide =  slide.children
    for(let item of itemSlide){
        
        //Indicators
        if(item.classList.contains('carousel-indicators')){
            let itemIndicator = item.children
            for(let option of itemIndicator){
                option.addEventListener('click',function(){
                    let indexOpt = option.dataset.slide
                    showSlide(slide,indexOpt)

                    //Clean Interval
                    clearInterval(interval)
                    interval = setInterval(function(){
                        indexOpt ++
                        if(effectSlide != undefined){            
                            if(indexSlide > cantSlide){
                                indexSlide = 1
                            }
                        } 
                        showSlide(slide,indexOpt)
                    },timeSlide)
                })           
            }
        }

        if(item.classList.contains('carousel-content')){
            item.children[0].classList.add('active')
            let widthItem = item.children[0].clientWidth

            if(effectSlide == undefined){
                let translate = indexSlide * widthItem
                item.style.transform = "translate("+-translate+"px)"
            }
        }

        if(item.classList.contains('controls-item')){
            
            item.addEventListener('click',function(){
                let goIndex = item.dataset.slide

                if(goIndex == 'prev'){
                    if(effectSlide == undefined){
                        if(indexSlide <= 0) return
                        indexSlide --
                    } else {
                        if(indexSlide == 1){
                            indexSlide = cantSlide;
                        } else {
                            indexSlide --;
                        }
                    }
                }

                if(goIndex == 'next'){
                    if(effectSlide == undefined){
                        if(indexSlide >= cantSlide - 1) return
                        indexSlide ++
                    } else {
                        if(indexSlide == cantSlide){
                            indexSlide = 1;
                        } else {
                            indexSlide ++;
                        }
                    }
                }
                
                showSlide(slide,indexSlide)
                
                //Clean Interval
                clearInterval(interval)
                interval = setInterval(function(){
                    indexSlide ++
                    if(effectSlide != undefined){            
                        if(indexSlide > cantSlide){
                            indexSlide = 1
                        }
                    } 
                    showSlide(slide,indexSlide)
                },timeSlide)
            })
        }
    }

    //let content = viewContent(slide)
    if(effectSlide == undefined){
        content.addEventListener('transitionend', function(){    
            let widthItem = content.children[0].clientWidth            
            let cant = content.children.length
            
            let itemActive = content.children[indexSlide]
            if(itemActive.classList.contains('first-clone')){
                content.style.transition = "0s"
                indexSlide = cant - indexSlide
                content.style.transform = "translate("+(-indexSlide * widthItem)+"px)"
            }
            if(itemActive.classList.contains('last-clone')){
                content.style.transition = "0s"
                indexSlide = cant - 2
                content.style.transform = "translate("+(-indexSlide * widthItem)+"px)"
            }
        })
    }
    
    if( slide.dataset.slideHover.toLowerCase() == 'true'){
        slide.addEventListener('mouseover', function(){
            slide.dataset.slideStatus = 'pause'
        })
    }    
    slide.addEventListener('mouseout', function(){
        slide.dataset.slideStatus = 'play'
    })
})
function cloneItems(slide){
    let content = viewContent(slide)
    
    let items = content.children
    let cantItem = items.length

    let effectSlide = slide.dataset.slideEffect
    if(effectSlide == undefined){
        
        let firstItem = content.children[0]
        let cloneFirst = firstItem.cloneNode(true)
            cloneFirst.classList.add('first-clone')

        let lastItem = content.children[cantItem-1]
        let cloneLast = lastItem.cloneNode(true)
            cloneLast.classList.add('last-clone')
        
        firstItem.before(cloneLast)
        lastItem.after(cloneFirst)
    }

    if(effectSlide != undefined){
        slide.classList.add('carousel-'+effectSlide)
    }
}
function createIndicators(slide){    
    let content = slide.children[0]
    let items = content.children
    
    let indicator = document.createElement('ol')
        indicator.classList.add('carousel-indicators')
        
    let i = 0
    for(let item of items){
        let itemIndicator = document.createElement('li')
            itemIndicator.classList.add('indicators-item')
            if(i == 0){
                itemIndicator.classList.add('active')
            }
            itemIndicator.dataset.slide = i+1

        indicator.append(itemIndicator)
        i ++
    }
    content.before(indicator)    
}
function viewContent(slide){
    let indicator = slide.dataset.slideIndicators
    
    let ind = 0
    if(indicator == undefined || indicator == 'true'){
        ind = 1
    }

    let content = slide.children[ind]
    
    return content
}
function cantItemSlide(slide){
    let indexItem = 1
    let indicators = slide.dataset.slideIndicators
    if(indicators == 'false'){
        indexItem = 0
    }

    let content = slide.children[indexItem]
    let cantItem = content.children.length

    return cantItem
}
function showSlide(slide,index){
    let content = viewContent(slide)
    let items = content.children
    let cantItem = items.length

    let indicators = slide.dataset.slideIndicators
    let effectSlide = slide.dataset.slideEffect
    
    let active = index

    if(effectSlide == undefined){
        if(index == (cantItem-1)){
            active = 1
        }
        let widthItem = content.children[0].clientWidth
        let translate = index * widthItem
        content.style.transform = "translate("+-translate+"px)"
        content.style.transition = "transform 1s"

    }

    if(indicators == undefined || indicators != 'false'){
        let indicator = slide.children[0]
        let itemsIndicator = indicator.children
        let i = 1
        for(let line of itemsIndicator){
            if(active == i){
                line.classList.add('active')
            } else {
                line.classList.remove('active')
            }
            i ++
        }
    }

    let cant = 0
    if(effectSlide != undefined){
        cant = 1
    }

    for(let item of items){
        if(active == cant){
            item.classList.add('active')
        } else {
            item.classList.remove('active')
        }
        cant ++
    }
}