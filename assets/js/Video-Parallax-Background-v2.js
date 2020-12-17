$(document).ready(function(){

(function(){

	if(!('requestAnimationFrame' in window)) return;
	if(/Mobile|Android/.test(navigator.userAgent)) return;

	let backgrounds = [];

	$('.parallax').each(function(){
		let el = $(this);
		let bg = el.children('.parallax-background');
		bg.css({
			position: 'absolute',
			'min-width':'100%',
            'width':'auto',
            'min-height': '100vh',
			//top:0, left:-200,
			zIndex: -100,
            display: 'block'
		});
		backgrounds.push(bg);

		el.css({
			position:'relative',
			background:'transparent',
			overflow: 'hidden',
		});
	});

	if(!backgrounds.length) return;

	let visible = [];
	let scheduled;

	$(window).on('scroll resize', scroll);

	scroll();

	function scroll(){

		visible.length = 0;

		for(let i = 0; i < backgrounds.length; i++){
			let rect = backgrounds[i][0].parentNode.getBoundingClientRect();

			if(rect.bottom > 0 && rect.top < window.innerHeight){
				visible.push({
					rect: rect,
					node: backgrounds[i]
				});
			}

		}

		cancelAnimationFrame(scheduled);

		if(visible.length){
			scheduled = requestAnimationFrame(update);
		}

	}

	function update(){

		for(let i = 0; i < visible.length; i++){
			let rect = visible[i].rect;
			let node = visible[i].node[0];

			let quot = Math.max(rect.bottom, 0) / (window.innerHeight + rect.height);
            let shift = '';
            if (node.hasAttribute('parallax-center')) {
                let nodeHeight = visible[i].node.outerHeight();
                shift = -((nodeHeight - rect.height)/2 + rect.top) + 'px';
            } else {
                shift = -rect.top+'px';
            }
            console.log(shift);
			node.style.transform = 'translate3d(0, '+(shift)+', 0)';
		}

	}

})();
});