class Two {
    scene = null
    tContainer = null
    _panzoom = null

    constructor(sceneId, options) {
        this.scene = document.getElementById(sceneId)
        if (!this.scene || !(this.scene instanceof HTMLElement)) {
            this.scene = null
            console.error('#' + sceneId + ' is not an HTMLElement')
        } else {
            this.tContainer = document.createElement('div')
            this.tContainer.id = 't-container' 
            this.scene.appendChild(this.tContainer)
            this._panzoom = panzoom(this.scene, options)
            console.log(this._panzoom)
        }
    }

    zoomOnElement(element, event) {
        const transform = this._panzoom.getTransform();
        let screenBounds = document.body.getClientRects()[0]
        let elementBounds = { width : parseInt(element.style.width), height : parseInt(element.style.height), x : parseInt(element.style.left), y : parseInt(element.style.top) }
        let isWidth = elementBounds.width > elementBounds.height

        let relativeScreen = isWidth ? screenBounds.width : screenBounds.height
        let maxSize = isWidth ? elementBounds.width : elementBounds.height
        
        let result = relativeScreen / maxSize;
        
        if (isWidth && elementBounds.height * result > screenBounds.height)
            result = screenBounds.height / elementBounds.height;
        else if (!isWidth && elementBounds.width * result > screenBounds.width)
            result = screenBounds.width / elementBounds.width;

        this._panzoom.pause()
        this._panzoom.smoothZoom(event.clientX, event.clientY, 1 / transform.scale);
        setTimeout(() => {
            console.log(element)
            this._panzoom.centerOn(element, this.scene)
            setTimeout(() => {
                let elementClientBounds = element.getClientRects()[0]
                let cx = (elementClientBounds.x) + (elementClientBounds.width / 2);
                let cy = (elementClientBounds.y) + (elementClientBounds.height / 2);

                this._panzoom.smoothZoom(cx, cy, (result / transform.scale) * 0.95)
                console.log('fin')
            }, 400)
        }, 400)
        this._panzoom.resume()
        console.log('coucou')
    }

    zoomOnScene(event) {
        let bounds = { x: 0, y: 0, width: 0, height: 0 }

        for (var i = 0; i < this.tContainer.childElementCount; i++) {
            let _element = this.tContainer.children[i]

            let elementBounds = _element.getClientRects()[0]

            elementBounds = { width : parseInt(_element.style.width), height : parseInt(_element.style.height), x : parseInt(_element.style.left), y : parseInt(_element.style.top) }

            if (bounds.width + bounds.x < elementBounds.width + elementBounds.x)
                bounds.width = elementBounds.width + elementBounds.x
            if (bounds.height + bounds.y < elementBounds.height + elementBounds.y)
                bounds.height = elementBounds.height + elementBounds.y
            if (bounds.x > elementBounds.x)
                bounds.x = elementBounds.x
            if (bounds.y > elementBounds.y)
                bounds.y = elementBounds.y
        }

        if (bounds.x < 0)
            bounds.width += (bounds.x * -1)
        if (bounds.y < 0)
            bounds.height += (bounds.y * -1)

        this.tContainer.style.top = bounds.y + 'px'
        this.tContainer.style.left = bounds.x + 'px'
        this.tContainer.style.width = bounds.width + 'px'
        this.tContainer.style.height = bounds.height + 'px'
        event.clientX = bounds.x + bounds.width / 2
        event.clientY = bounds.y + bounds.height / 2
        this.zoomOnElement(this.tContainer, event)
    }

    isElementOnScene(element) {
        let sBounds = document.body.getClientRects()[0]
        let bounds = element.getClientRects()[0]

        if (bounds.x > sBounds.width || bounds.y > sBounds.height || bounds.x + bounds.width < 0 || bounds.y + bounds.height < 0)
            return false
        return true
    }

    isElementReadable(element) {
        if (!this.isElementOnScene)
            return false

        let minBounds = { width: 100, height: 100 }
        let bounds = element.getClientRects()[0]

        if (bounds.height < minBounds.height || bounds.width < minBounds.width)
            return false
        return true
    }
}