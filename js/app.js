window.onload = () => {
	resizeHeader()
	
	if(video != null) {
		if(readCookie('subscribed') != null) {
			if(readCookie('subscribed') == 'false') {
				subscribe.style.backgroundColor = 'darkred'
				subscribe.style.color = 'white'
				subscribe.classList.add('ho')
				subscribe.innerHTML = 'subscribe'
			} else {
				subscribe.style.backgroundColor = '#CCC'
				subscribe.style.color = 'black'
				subscribe.classList.add('ho')
				subscribe.innerHTML = 'subscribed'
			}
		} else {
			createCookie('subscribed', 'false', 99999)
			subscribe.style.backgroundColor = 'darkred'
			subscribe.style.color = 'white'
			subscribe.classList.add('ho')
			subscribe.innerHTML = 'subscribe'
		}
		
		if(sessionStorage.getItem('time of ' + document.getElementById('episodename').innerHTML) != null) {
			video.currentTime = sessionStorage.getItem('time of ' + document.getElementById('episodename').innerHTML)
		} else {
			sessionStorage.setItem('time of ' + document.getElementById('episodename').innerHTML, 0)
		}
	}
	
	if(readCookie('theme') != null) {
		if(readCookie('theme') == 'night') {
			day.style.display = 'inline'
			night.style.display = 'none'
			document.body.classList.add('night')
			for (var i = 0; i < els.length; i++) {
				els[i].classList.add('night')
			}
		} else if(readCookie('theme') == 'day') {
			night.style.display = 'inline'
			day.style.display = 'none'
			document.body.classList.add('day')
			for (var i = 0; i < els.length; i++) {
				els[i].classList.add('day')
			}
		}
	} else {
		night.style.display = 'inline'
		day.style.display = 'none'
		createCookie('theme', 'day', 99999)
		document.body.classList.add('day')
		for (var i = 0; i < els.length; i++) {
			els[i].classList.add('day')
		}
	}
	
	menu.style.height = document.clientHeight + 'px'
}


var header = document.querySelector('.trueone')
var ua = navigator.userAgent.toLowerCase()
var container = document.querySelector('.container')
var subscribe = document.getElementById('subscribe')
var video = document.getElementById('video')
var menu = document.getElementById('menu')
var menudisplayer = document.getElementById('menudisplayer')
var day = document.getElementById('day')
var night = document.getElementById('night')
var close = document.getElementById('close')
var els = document.body.querySelectorAll('*')

var isMobile = false
var isPortrait

if(ua.indexOf('mobile') > -1) isMobile = true

setInterval(() => {
	if(video != null && !video.paused) {
		sessionStorage.setItem('time of ' + document.getElementById('episodename').innerHTML, video.currentTime)
	}
}, 500)

function resizeHeader() {
	header.style.width = document.body.clientWidth + 'px'
}

if(video != null) {
	subscribe.onclick = () => {
		if(readCookie('subscribed') == 'false') {
			subscribe.style.backgroundColor = '#CCC'
			subscribe.style.color = 'black'
			subscribe.innerHTML = 'subscribed'
			createCookie('subscribed', 'true', 99999)
			readCookie('subscribed')
		} else {
			subscribe.style.backgroundColor = 'darkred'
			subscribe.style.color = 'white'
			subscribe.innerHTML = 'subscribe'
			createCookie('subscribed', 'false', 99999)
			readCookie('subscribed')
		}
	}
}

menudisplayer.onclick = () => {
	setTimeout(() => {
		menu.style.visibility = 'visible'
		menu.style.width = '100%'
	}, 50)
}

close.onclick = () => {
	setTimeout(() => {
		menu.style.width = '-10px'
			menu.style.visibility = 'hidden'
			menu.style.width = '0'
	}, 50)
}

day.onclick = () => {
	createCookie('theme', 'day', 99999)
	night.style.display = 'inline'
	day.style.display = 'none'
	document.body.classList.add('day')
	document.body.classList.remove('night')
	for (var i = 0; i < els.length; i++) {
		els[i].classList.add('day')
		els[i].classList.remove('night')
	}
}

night.onclick = () => {
	createCookie('theme', 'night', 99999)
	day.style.display = 'inline'
	night.style.display = 'none'
	document.body.classList.add('night')
	document.body.classList.remove('day')
	for (var i = 0; i < els.length; i++) {
		els[i].classList.add('night')
		els[i].classList.remove('day')
	}
}

document.onclick = (e) => {
	if(menu.style.visibility != 'hidden') {
		var menuposXs = menu.offsetLeft
		var menuposXe = menuposXs + menu.offsetWidth
		var menuposYs = menu.offsetTop
		var menuposYe = menuposYs + menu.offsetHeight
		if(!(menuposXs <= e.clientX && e.clientX <= menuposXe) || !(menuposYs <= e.clientY && e.clientY <= menuposYe)) {
			menu.style.width = '-10px'
				menu.style.visibility = 'hidden'
				menu.style.width = '0'
		}
	}
}

window.onresize = () => {
	resizeHeader()
}

function onScreenChange({ target: { type } }) {
	resizeHeader()
}

window.screen.orientation.addEventListener('change', onScreenChange)