const closeKeys = ['Escape', 'Backspace'];
let battlepassBar = undefined;
let activeListeners = [];
$(() => {
	window.addEventListener("message", (event) => {
		const action = event.data.action;
		const data = event.data.data;
		if (action === "show") {
			openHomePage(data);
		}
	});

	document.onkeyup = function(event) {
		if (closeKeys.includes(event.key)) {
			hideElements(['body', '#wrap'])
			removeActiveListeners()
			$.post(`https://main_menu/closeNUI`, JSON.stringify({}));
		}
	};

});

const openHomePage = (data) => {
	$("body").fadeIn();
	$("#wrap").fadeIn();
	if (data?.battlepass) {
		createBattlepass(data.battlepass);
		registerActionButton('#battlepass', (element) => {
			hideElements(['body', '#wrap']);
			execute('command', 'battlepass');
		})
	}

	if (data?.achievements) {
		createAchievements(data.achievements);
		registerActionButton('#achievements', (element) => {
			hideElements(['body', '#wrap']);
			execute('client_event', 'achievements:get');
		})
	}

	if (data?.hasPremium) {
		$('#premium-status').html('ACTIVE')
		$('#premium').fadeIn();
	} else {
		$('#no-premium-status').html('Buy premium now!')
		$('#no-premium').fadeIn();
	}

	registerActionButton('#job-center', (element) => {
		hideElements(['body', '#wrap']);
		execute('client_event', 'openJobCenter')
	}) 

	registerActionButton('#my-family', (element) => {
		hideElements(['body', '#wrap']);
		execute('client_event', 'esx_mMafia:openSocietyMenu')
	})

	registerActionButton('#inventory', (element) => {
		hideElements(['body', '#wrap']);
		execute('client_event', 'OpenInventory')
	})

	registerActionButton('#open-case', (element) => {
		hideElements(['body', '#wrap']);
		execute('command', 'report')
	})

	registerActionButton('#daily-tasks', (element) => {
		hideElements(['body', '#wrap'])
		execute('notification', 'Coming soon. Stay tuned!')
	})

	registerActionButton('#my-job', (element) => {
		hideElements(['body', '#wrap'])
		execute('notification', 'Coming soon. Stay tuned!')
	})

	registerActionButton('#invite-friends', (element) => {
		hideElements(['body', '#wrap'])
		execute('notification', 'Coming soon. Stay tuned!')
	})

	registerActionButton('#shop', (element) => {
		$.post(`https://main_menu/opendonate`)
		hideElements(['body', '#wrap'])
		removeActiveListeners()
		$.post(`https://main_menu/closeNUI`, JSON.stringify({}));
	})

	registerActionButton('#change-time', (element) => {
		hideElements(['body', '#wrap'])
		execute('command', 'changetime')
	})

	registerActionButton('#commands', () => {
		hideElements(['body', '#wrap'])
		execute('command', 'commands')
	})

	registerActionButton('#no-premium', (element, event) => {
		$.post(`https://main_menu/buypremium`)
		hideElements(['body', '#wrap'])
		removeActiveListeners()
		$.post(`https://main_menu/closeNUI`, JSON.stringify({}));
	})
	registerActionButton('#usefull-buttons', (element, event) => {
		$.post(`https://main_menu/openInstructions`)
		hideElements(['body', '#wrap'])
		removeActiveListeners()
		$.post(`https://main_menu/closeNUI`, JSON.stringify({}));
	})

	registerActionButton('#premium', (element, event) => {
		event.preventDefault()
	})
};

const createAchievements = (data) => {
	let completed = 0
	let ongoing = 0
	let total = 0

	$.each(data, (_, achievement) => {
		for (let i = 0; i < achievement.length; i++) {
			if (achievement[i].completed) {
				completed++
			} else {
				ongoing++
			}
			total++
		}
	})
	$('#achievements-count').html(completed)
	$('#achievements-total').html(`/ ${total}`)
}

const createBattlepass = (data) => {
	$('#battlepass').html(`<div id="levelbar"></div>`)

	battlepassBar = new ProgressBar.Circle('#levelbar', {
		strokeWidth: 8,
		color: 'rgba(255,255,255,0.1)',
		trailColor: 'rgba(255,255,255,0.1)',
		trailWidth: 1,
		easing: 'easeInOut',
		duration: 2000,
		svgStyle: null,
		text: {
			value: '',
			alignToBottom: false,
		},
		step: (state, bar) => {
			bar.path.setAttribute('stroke', state.color);
			bar.setText(`<div id='level'>${data.level}</div><div id='exp_progress'>${data.xp} / ${data.maxXp}</div>`);
			bar.text.style.color = state.color;
		}
	});
	battlepassBar.animate(data.xp / data.maxXp); 
	$('#battlepass').append(`<br/><br/><span id="battlepass-name">Battlepass</span><br/>`);
}

const hideElements = (elements) => {
	elements.forEach((key, _) => {
		$(key).fadeOut()
	})
}

const registerActionButton = (element, action) => {
	if (!activeListeners.includes(element)) {
		activeListeners.push(element)
		$(element).on('click', function(event) {
			action($(this), event)
		})
	}
}

const removeActiveListeners = () => {
	activeListeners.forEach((element, index) => {
		$(element).off('click')
	})
	console.log(`Removed a total of ${activeListeners.length} of listeners`)
	activeListeners = [];
}

const execute = (actionType, action) => {
	$.post(`https://main_menu/execute`, JSON.stringify({
		actionType,
		action
	}))
	removeActiveListeners()
}

function openvMenu(){
	$.post(`https://main_menu/openvmenu`)
	hideElements(['body', '#wrap'])
	removeActiveListeners()
	$.post(`https://main_menu/closeNUI`, JSON.stringify({}));
}

function openBusinessMenu(){
	$.post(`https://main_menu/openBusinessMenu`)
	hideElements(['body', '#wrap'])
	removeActiveListeners()
	$.post(`https://main_menu/closeNUI`, JSON.stringify({}));
}

var partNum = 70;


var c = document.getElementById('c');
var ctx = c.getContext('2d');

var w = window.innerWidth;
var h = window.innerHeight;

var mouse = {
  x: w / 2, 
  y: 0
};

document.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY 
}, false);

var particles = [];
for(i = 0; i < partNum; i++) {
  particles.push(new particle);
}

function particle() {
  this.x = Math.random() * w - w / 5;
  this.y = Math.random() * h;
  
  this.r = Math.random() * 7.5 + 3.25;
}

var draw = function() {
  c.width = w;
  c.height = h;
  
  for(t = 0; t < particles.length; t++) {
    var p = particles[t];
    var nowX = p.r + mouse.x / 4.6;
    var nowY = p.r + mouse.y / 4.6;
    var color = '#d3540075';
    
    if(p.r < 10) {
      nowX = p.x + mouse.x / 0.5;
      nowY = p.y + mouse.y / 0.5;
    };
    if(p.r < 9) {
      nowX = p.x + mouse.x / 2;
      nowY = p.y + mouse.y / 2;
    };
    if(p.r < 8) {
      nowX = p.x + mouse.x / 3.5;
      nowY = p.y + mouse.y / 3.5;
    };
    if(p.r < 7) {
      nowX = p.x + mouse.x / 5;
      nowY = p.y + mouse.y / 5;
    };
    if(p.r < 6) {
      nowX = p.x + mouse.x / 6.5;
      nowY = p.y + mouse.y / 6.5;
    };
    if(p.r < 5) {
      nowX = p.x + mouse.x / 8;
      nowY = p.y + mouse.y / 8;
    };
    if(p.r < 4) {
      nowX = p.x + mouse.x / 9.5;
      nowY = p.y + mouse.y / 9.5;
    };
    if(p.r < 3) {
      nowX = p.x + mouse.x / 11;
      nowY = p.y + mouse.y / 11;
    };
    if(p.r < 2) {
      nowX = p.x + mouse.x / 12.5;
      nowY = p.y + mouse.y / 12.5;
    };
    if(p.r < 1) {
      nowX = p.x + mouse.x / 15;
      nowY = p.y + mouse.y / 15;
    };
    
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(nowX, nowY, p.r, Math.PI * 2, false);
    ctx.fill();
  }
}

setInterval(draw, 33);