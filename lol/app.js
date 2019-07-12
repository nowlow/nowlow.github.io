document.getElementById('start').addEventListener('click', (event) => {
    navigator.media = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    navigator.media({
        video: true,
        audio: false
    }, function (stream) {
        let emmiter = document.getElementById('emitter-video')
        let source = new MediaSource(stream, {type: 'video/mp4'})
        let url = URL.createObjectURL(source)

        console.log(source)
        console.log(url)

        try {
            emmiter.srcObject = stream
        } catch (error) {
            emmiter.src = window.URL.createObjectURL(stream);
        }
        emmiter.play()
    }, function (error) {
        console.error(error)
    })
})