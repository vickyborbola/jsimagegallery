class Image {
    constructor(filename, imageTitle, imageDesc, imageDate){
        this.filename = filename;
        this.imageTitle = imageTitle;
        this.imageDesc = imageDesc;
        this.imageDate = imageDate;
    }
}

class Gallery{
    constructor(imageArray){
        this.imageArray = imageArray;
        this.month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    }

    set initGallery(images){
        let thnHTML = '';
        let thumbnailContainer = document.getElementById('thumbnail-container');
        
        if(Array.isArray(images)){
            /* set mainImage */
            this.initMainImage(images[0]);
            
            /* set thumbnails */
            images.forEach( function(image, index){
                if(image.filename !== images[0].filename){
                    thnHTML += `<div class="thumbnail">
                        <img class="thumbnail-img" id="thumb-${index+1}" src="${image.filename}" alt="${image.imageTitle}" data-desc="${image.imageDesc}" data-date="${image.imageDate}"/>
                    </div>`;
                }
            } );
        }

        thumbnailContainer.innerHTML = thnHTML;
    }

    set changeMainImage(newImage){
        this.initMainImage(newImage);        
    }

    initMainImage(image){
        let mainImage = document.getElementById('main-image');
        let mainImageFrame = document.getElementById('main-image-frame');

        if( mainImage === null){
            /* Create main image */
            mainImageFrame = document.createElement("div");
            document.getElementById("main-image-container").appendChild(mainImageFrame);
            mainImageFrame.setAttribute('id', 'main-image-frame');

            mainImage = document.createElement("img");
            mainImageFrame.appendChild(mainImage);
            mainImage.setAttribute('id', 'main-image');
        }
        
        mainImage.setAttribute('src', image.filename);
        

        /* Create main image title and description */
        if(image.imageTitle.length > 0 || image.imageDesc.length > 0){
            let mainImageDescContainer = document.getElementById('main-image-desc-container');

            if( mainImageDescContainer === null){
                mainImageDescContainer = document.createElement("div");
                mainImageFrame.appendChild(mainImageDescContainer);
                mainImageDescContainer.setAttribute('id', 'main-image-desc-container');
            }

            let mainImageDescHTML = '';

            if( image.imageTitle.length > 0 ){
                mainImageDescHTML += `<span class="title">${image.imageTitle}</span>`;
            }

            if( image.imageDesc.length > 0 ){
                mainImageDescHTML += `<p class="desc">${image.imageDesc}</p>`;
            }

            if( image.imageDate.length > 0 ){
                
                const dateArray = image.imageDate.split("-");
                
                mainImageDescHTML += `<div id="date-container">
                    <span id="day">${dateArray[2]}</span>
                    <span id="month">${this.month[dateArray[1]-1]}</span>
                    <span id="year">${dateArray[0]}</span>
                </div>`;
            }

            mainImageDescContainer.innerHTML = mainImageDescHTML;
        }
    }

    set goSlide(direction){
        let thumbnailContainer = document.getElementById('thumbnail-container');
        let parentContainer = document.getElementById('gallery-container');
        let containerData = thumbnailContainer.getBoundingClientRect();
        let containerDataX = parseInt(containerData.x);
        let parentContainerData = parentContainer.getBoundingClientRect();
        let parentContainerDataX = parseInt(parentContainerData.x);
        let blockWidth = 220;

        let imageFullViewNum = Math.round(thumbnailContainer.offsetWidth / 220); 
        let imageTotalNum = thumbnailContainer.querySelectorAll('.thumbnail-img').length;
        let slideNum = imageTotalNum - imageFullViewNum; 

        let moveNum = 0;
        
                
        if(direction === 'left-arrow'){           
            moveNum = containerDataX - (parentContainerDataX + blockWidth);
            let endMoveNum = 0 - (blockWidth*slideNum);
            
            if( moveNum < endMoveNum){
                moveNum = endMoveNum; 
            }
        }else if(direction === 'right-arrow'){
            moveNum = parseInt((containerData.x-parentContainerData.x)) + blockWidth;
                                        
            if(moveNum > 0){
                moveNum = 0; 
            }     
             
        }

        thumbnailContainer.style.transform = "translateX("+moveNum+"px)";
    }

}


/* init images */
const imageArray = [];

imageArray.push(
    new Image('./images/landscape-01.jpg', 'Landscape 1', 'Lorem ipsum dolor sit amet', '2023-01-05'),
    new Image('./images/landscape-02.jpg', 'Landscape 2', 'Consectetur adipiscing elit.', '2023-08-11'),
    new Image('./images/landscape-03.jpg', 'Landscape 3', 'Donec sollicitudin feugiat lobortis.', '2023-11-26'),
    new Image('./images/landscape-04.jpg', 'Landscape 4', 'Vestibulum ultrices sapien a ipsum tincidunt euismod.', '2024-01-05'),
    new Image('./images/travel-1.jpg', 'Travel 1', 'Aliquam erat tellus, tristique at eleifend id', '2024-04-15'),
    new Image('./images/travel-2.jpg', 'Travel 2', 'Vestibulum lacus erat, iaculis a elit nec', '2024-08-12'),
    new Image('./images/travel-3.jpg', 'Travel 3', 'Donec ultricies pellentesque finibus', '2024-11-20')
);

/* init Gallery */
const gallery1 = new Gallery(imageArray);
gallery1.initGallery = imageArray;

/* watch click image */
const elementsArray = document.querySelectorAll(".thumbnail-img");

if( elementsArray !== null){
    
    elementsArray.forEach(function(elem) {
        elem.addEventListener("click", function() {
            let newImage = new Image(elem.getAttribute('src'), elem.getAttribute('alt'), elem.getAttribute('data-desc'), elem.getAttribute('data-date'));
            gallery1.changeMainImage = newImage;
        });
    });
}

/* click arrow and sliding */
const arrowsArray = document.querySelectorAll(".arrow");

if( arrowsArray !== null){
    
    arrowsArray.forEach(function(elem) {
        elem.addEventListener("click", function() {
            gallery1.goSlide = elem.getAttribute('id');
        });
    });
}


