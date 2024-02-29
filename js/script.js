const priceList = [
    {
        type: 'bust',
        price: 50,
    },
    {
        type: 'half',
        price: 70,
        priceModel: 300
    },
    {
        type: 'knees',
        price: 80,
    },
    {
        type: 'full',
        price: 90,
        priceModel: 450
    }
];

const arts = [
    'lana.jpg',
    'comm.jpg',
    'hao.jpg',
    'hoshiino2.jpg',
    'mk.jpg',
    'mari.jpg',
    'hoshiino.jpg',
];
const vtube = [
    'model2.jpg',
    'model1.jpg',
    'model3.jpg'
];

const artNavControl = () => {
    const artNav = document.querySelector('.artwork__nav-list');

    artNav.addEventListener('mouseover', e => {
        const target = e.target;

        if (target.classList.contains('artwork__nav-chosen')) {
            const parent = target.closest('.artwork__nav-item');
            const bg = parent.querySelector('.artwork__nav-item-bg');

            bg.classList.remove('opacity');
            console.log('aa')

            target.addEventListener('mouseout', e => {
                if (!parent.classList.contains('active')) {
                    bg.classList.add('opacity');
                }
            })
        }
    });

    artNav.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('artwork__nav-chosen')) {
            const parent = target.closest('.artwork__nav-item');
            const bg = parent.querySelector('.artwork__nav-item-bg');
            const icon = parent.querySelector('.artwork__nav-icon');

            const container = document.querySelector('.artwork__nav-list');

            container.querySelectorAll('*').forEach(el => {
                el.querySelectorAll('*').forEach(e => {
                    if (!e.classList.contains('artwork__nav-text')) {
                        e.classList.add('opacity');
                    }
                    e.classList.remove('gradient-background');
                    el.classList.remove('active');
                })
            })


            bg.classList.remove('opacity');
            icon.classList.remove('opacity');
            bg.classList.add('gradient-background');
            parent.classList.add('active');
        }
    })
}

const artItemControl = () => {
    const container = document.querySelector('.artwork__art-container');

    container.addEventListener('mouseover', e => {
        const target = e.target;

        if (target.classList.contains('artwork__art')) {
            const border = target.closest('.artwork__art-border');
            const bg = border.closest('.artwork__item').querySelector('.artwork__item-bg');

            border.classList.add('border-anim');
            bg.classList.add('bg-anim');

            target.addEventListener('mouseout', e => {
                border.classList.remove('border-anim');
                bg.classList.remove('bg-anim');
            })
        }

        if (target.classList.contains('artwork__modelPic')) {
            const border = target.closest('.artwork__art-border-model');
            const bg = border.closest('.artwork__model').querySelector('.artwork__item-bg-model');

            border.classList.add('border-anim-model');
            bg.classList.add('bg-anim-model');

            target.addEventListener('mouseout', e => {
                border.classList.remove('border-anim-model');
                bg.classList.remove('bg-anim-model');
            })
        }


    });

}

const createArtItem = (img) => {
    const item = document.createElement('div');
    item.classList.add('artwork__item');
    item.insertAdjacentHTML('beforeend', `
                    <img src="img/images/art-bg.svg" alt="art-bg" class="artwork__item-bg transitionTwo">
                    <div class="artwork__art-border transition">
                        <img src="img/images/artwork/${img}" alt="art" class="artwork__art artwork__img">
                    </div>
    `);

    return item
}

const createModelItem = (img) => {
    const item = document.createElement('div');
    item.classList.add('artwork__model');
    item.insertAdjacentHTML('beforeend', `
                    <img src="img/images/model-border.svg" alt="model-bg" class="artwork__item-bg-model transitionTwo">
                    <div class="artwork__art-border-model transition">
                        <img src="img/images/artwork/${img}" alt="model" class="artwork__modelPic artwork__img">
                    </div>
    `);

    return item
}


const renderArts = () => {
    const container = document.querySelector('.artwork__art-container');

    container.replaceChildren();

    arts.forEach(e => {
        container.append(createArtItem(e));
    })
}

const renderModels = () => {
    const container = document.querySelector('.artwork__art-container');

    container.replaceChildren();

    vtube.forEach(e => {
        container.append(createModelItem(e));
    })
}

const artworkTabsControl = () => {
    document.getElementById('arts').addEventListener('click', () => {
      renderArts();
    })
    document.getElementById('vtube').addEventListener('click', () => {
        renderModels();
    })
}

const artworkFull = () => {
    const container = document.querySelector('.artwork__art-container');

    container.addEventListener('click', e => {
        const target = e.target;
        console.log(target);

        if (target.classList.contains('artwork__img')) {
            const overlay = document.createElement('div');
            overlay.classList.add('art-overlay');

            overlay.insertAdjacentHTML('beforeend', `
                <img src="${target.src}" alt="art" class="art-overlay__image"></img>            
            `);

            document.querySelector('.main').append(overlay);
            document.body.style.overflow = 'hidden';

            overlay.addEventListener('click', () => {
                overlay.remove();
                document.body.style.overflow = 'visible';
            })
        }
    })
}

const createPriceInfo = (level = '', cost = '', selected = 'no') => {
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price__info');

    if (selected === 'yes') {
        priceContainer.insertAdjacentHTML('beforeend', `
                            <div class="price__price-container">
                        <p class="price__type">type: ${level}</p>
                        <p class="price__cost">${cost} $</p>
                        <div class="price_loader"></div>
                    </div>
                    <div class="price__line"></div>
                    <div class="price__additional">
                        <p class="price__price-additional-text">Payment after sketch <br> <br>

                            additional character +100% of the amount  <br> <br>

                            If you have a character with a complex and detailed design you will have to pay +50% of the amount  <br> <br>

                            Deadline is 1 month after payment  <br> <br>

                            Payment on boosty (+12% commission)</p>
                    </div>

    `);
    } else {
        priceContainer.insertAdjacentHTML('beforeend', `
         
            <p class="price__select-text">SELECT A LEVEL</p>
         `);
    }

    return priceContainer;

}


const priceSelect = () => {
    const menu = document.querySelector('.price__menu');

    menu.addEventListener('click', e => {
        let target = e.target;

        if (target.classList.contains('price__menu-text')) {
            target = target.closest('.price__menu-item');
            if (!target.classList.contains('item-active')) {
                menu.querySelectorAll('.price__menu-item').forEach(e => {
                    if (e.classList.contains('item-active')) {
                        e.querySelector('.price__menu-dec').classList.remove('price-active');
                        e.querySelector('.price__menu-text').classList.remove('text-active');
                        e.classList.remove('item-active');
                    }
                });

                target.classList.add('item-active');
                target.querySelector('.price__menu-dec').classList.add('price-active');
                target.querySelector('.price__menu-text').classList.add('text-active');
            }
        }
    });
}

const priceControl = () => {
    const recs = document.querySelector('.price__recs');
    const priceField = document.querySelector('.price__field');
    let recId;

    recs.addEventListener('mouseover', e => {
        const target = e.target;
        let cells =  document.querySelectorAll('.price__cell');
        let priceInfo;

        if (target.classList.contains('price__rec')) {
            recId = +target.closest('.price__cell').getAttribute('data-rec-id');
        }


        if (document.getElementById('art-price').classList.contains('item-active')) {
        cells.forEach(e => {
            if (+e.getAttribute('data-rec-id') <= recId) {
                e.classList.add('move');
            } else {
                e.classList.remove('move');
            }
        });
        } else {
            if (recId <= 1) {
                cells[0].classList.add('move');
                cells[1].classList.add('move');
                cells[2].classList.remove('move');
                cells[3].classList.remove('move');
            } else if (recId > 1 && recId <= 3) {
                document.querySelectorAll('.price__cell').forEach(e => {
                    e.classList.add('move');
                })
            }
        }

        if (document.getElementById('art-price').classList.contains('item-active')) {
             priceInfo = createPriceInfo(priceList[recId].type, priceList[recId].price, 'yes');
        } else {
            if (recId <= 1) {
                priceInfo = createPriceInfo(priceList[1].type, priceList[1].priceModel, 'yes');
            } else if (recId > 1 && recId <= 3) {
                priceInfo = createPriceInfo(priceList[3].type, priceList[3].priceModel, 'yes');
            }
        }


        if (priceField.querySelector('.price__info')) {
            priceField.querySelector('.price__info').remove();
        }
        if (!priceField.querySelector('.price__info')) {
            priceField.append(priceInfo)
            document.querySelector('.price__line').classList.add('js-is-target');
            document.querySelector('.price__line').classList.add('active-target');
        }

    });
    recs.addEventListener('mouseout', e => {

        if (priceField.querySelector('.price__info')) {
            priceField.querySelector('.price__info').remove();
            priceField.append(createPriceInfo());
        }

        document.querySelectorAll('.price__cell').forEach(e => {
            e.classList.remove('move');
        });

    })
}


const canvasControl = () => {
    const canvas = document.getElementById('overlay');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let targetEl = null;
    let targetLeft = null;
    const mouseCoords = {x: 0, y: 0};

    function getLeft(el) {
        if (!el) return null;

        const rect = el.getBoundingClientRect();
        return {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
        }
    }

    function joinPoints(ctx, from, to, progress = 1) {
        const dashSize = 5;
        ctx.setLineDash([dashSize]);
        ctx.lineDashOffset = dashSize;

        const stroke = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        stroke.addColorStop(0, '#7D8493');
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    function onMove(e) {
        mouseCoords.x = e.clientX;
        mouseCoords.y = e.clientY;
    }

    function onResize(e) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        targetLeft = getLeft(targetEl);
    }

    function onHover(e) {
            targetEl = document.querySelector('.price__line');
            targetLeft = getLeft(targetEl);
    }

    function drawAnimLine(canvas, duration) {
        const ctx = canvas.getContext('2d');

        let begin, progress;

        function draw(now) {
            begin = begin || now;
            progress = (now - begin) / duration % 1;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (targetLeft) {
                const x1 = targetLeft.x - window.scrollX;
                const y1 = targetLeft.y - window.scrollY;
                joinPoints(ctx, {x: x1, y: y1}, mouseCoords, progress);
            }

            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }

    drawAnimLine(canvas, 150);

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onHover);
}

renderArts();
artworkTabsControl();
canvasControl();
priceControl();
artNavControl();
artItemControl();
artworkFull();
priceSelect();