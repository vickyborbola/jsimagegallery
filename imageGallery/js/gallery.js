class Gallery {
    constructor(imageArray) {
        this.imageArray = imageArray;
        this.mainImageContainer = document.getElementById('main-image-container');
        if (!this.mainImageContainer) {
            console.error('mainImageContainer container not found in HTML.');
            return;
        }
        this.mainImageFrame = document.createElement('div');
        this.mainImageFrame.id = 'main-image-frame';
        this.mainImageContainer.appendChild(this.mainImageFrame);
        this.mainImage = document.createElement('img');
        this.mainImage.id = 'main-image';
        this.mainImageFrame.appendChild(this.mainImage);
        this.thumbnailContainer = document.getElementById('thumbnail-container');
        if (!this.thumbnailContainer) {
            console.error('Thumbnail container not found in HTML.');
            return;
        }
    }
    set initGallery(images) {
        let thnHTML = '';
        /* set mainImage */
        this.initMainImage(this.imageArray[0]);
        /* set thumbnails */
        this.imageArray.forEach(function (image, index) {
            if (image.filename !== images[0].filename) {
                thnHTML += `<div class="thumbnail">
                        <img class="thumbnail-img" id="thumb-${index + 1}" src="${image.filename}" alt="${image.imageTitle}" data-desc="${image.imageDesc}" data-date="${image.imageDate}"/>
                    </div>`;
            }
        });
        if (this.thumbnailContainer) {
            this.thumbnailContainer.innerHTML = thnHTML;
        }
    }
    initMainImage(image) {
        this.mainImage.setAttribute('src', image.filename);
        /* Create main image title and description */
        if (image.imageTitle.length > 0 || image.imageDesc.length > 0) {
            let mainImageDescContainer = document.getElementById('main-image-desc-container');
            if (mainImageDescContainer === null) {
                mainImageDescContainer = document.createElement("div");
                this.mainImageFrame.appendChild(mainImageDescContainer);
                mainImageDescContainer.setAttribute('id', 'main-image-desc-container');
            }
            let mainImageDescHTML = '';
            if (image.imageTitle.length > 0) {
                mainImageDescHTML += `<span class="title">${image.imageTitle}</span>`;
            }
            if (image.imageDesc.length > 0) {
                mainImageDescHTML += `<p class="desc">${image.imageDesc}</p>`;
            }
            if (typeof image.imageDate === 'object' && image.imageDate instanceof Date) {
                const month = image.imageDate.toLocaleString('default', { month: 'long' });
                mainImageDescHTML += `<div id="date-container">
                    <span id="day">${image.imageDate.getDate()}</span>
                    <span id="month">${month}</span>
                    <span id="year">${image.imageDate.getFullYear()}</span>
                </div>`;
            }
            mainImageDescContainer.innerHTML = mainImageDescHTML;
        }
    }
    set changeMainImage(image) {
        this.initMainImage(image);
    }
    set goSlide(direction) {
        let parentContainer = document.getElementById('gallery-container');
        if (this.thumbnailContainer !== null && parentContainer !== null) {
            let containerData = this.thumbnailContainer.getBoundingClientRect();
            let containerDataX = containerData.x;
            let parentContainerData = parentContainer.getBoundingClientRect();
            let parentContainerDataX = parentContainerData.x;
            let blockWidth = 220;
            let imageFullViewNum = Math.round(this.thumbnailContainer.offsetWidth / 220);
            let imageTotalNum = this.thumbnailContainer.querySelectorAll('.thumbnail-img').length;
            let slideNum = imageTotalNum - imageFullViewNum;
            let moveNum = 0;
            if (direction === 'left-arrow') {
                moveNum = containerDataX - (parentContainerDataX + blockWidth);
                let endMoveNum = 0 - (blockWidth * slideNum);
                if (moveNum < endMoveNum) {
                    moveNum = endMoveNum;
                }
            }
            else if (direction === 'right-arrow') {
                moveNum = (containerData.x - parentContainerData.x) + blockWidth;
                if (moveNum > 0) {
                    moveNum = 0;
                }
            }
            this.thumbnailContainer.style.transform = "translateX(" + moveNum + "px)";
        }
    }
}
/* init images */
let imageArray = [];
imageArray.push({ filename: './images/landscape-01.jpg', imageTitle: 'Landscape 1', imageDesc: 'Lorem ipsum dolor sit amet', imageDate: new Date('2023-01-05') });
imageArray.push({ filename: './images/landscape-02.jpg', imageTitle: 'Landscape 2', imageDesc: 'Consectetur adipiscing elit', imageDate: new Date('2023-08-11') });
imageArray.push({ filename: './images/landscape-03.jpg', imageTitle: 'Landscape 3', imageDesc: 'Donec sollicitudin feugiat lobortis', imageDate: new Date('2023-11-26') });
imageArray.push({ filename: './images/landscape-04.jpg', imageTitle: 'Landscape 4', imageDesc: 'Vestibulum ultrices sapien a ipsum tincidunt euismod', imageDate: new Date('2024-01-05') });
imageArray.push({ filename: './images/travel-1.jpg', imageTitle: 'Travel 1', imageDesc: 'Aliquam erat tellus, tristique at eleifend id', imageDate: new Date('2024-04-15') });
imageArray.push({ filename: './images/travel-2.jpg', imageTitle: 'Travel 2', imageDesc: 'Vestibulum lacus erat, iaculis a elit nec', imageDate: new Date('2024-08-12') });
imageArray.push({ filename: './images/travel-3.jpg', imageTitle: 'Travel 3', imageDesc: 'Donec ultricies pellentesque finibus', imageDate: new Date('2024-11-20') });
/* init Gallery */
const gallery1 = new Gallery(imageArray);
gallery1.initGallery = imageArray;
/* watch click image */
const elementsArray = document.querySelectorAll(".thumbnail-img");
if (elementsArray !== null) {
    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", function () {
            let newImage = {
                filename: elem.getAttribute('src'),
                imageTitle: elem.getAttribute('alt'),
                imageDesc: elem.getAttribute('data-desc'),
                imageDate: new Date(elem.getAttribute('data-date'))
            };
            gallery1.changeMainImage = newImage;
        });
    });
}
/* click arrow and sliding */
const arrowsArray = document.querySelectorAll(".arrow");
if (arrowsArray !== null) {
    arrowsArray.forEach(function (elem) {
        elem.addEventListener("click", function () {
            gallery1.goSlide = elem.getAttribute('id');
        });
    });
}
