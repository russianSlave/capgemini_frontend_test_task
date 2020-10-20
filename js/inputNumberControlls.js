function step (event) {
	let arrow = event.currentTarget;
	let container = arrow.closest("div.input-number-container");

	if (container) {
		let input = container.getElementsByClassName('input-number')[0];
		let step = parseInt(input.step) || 1;

		if (arrow.className == "arrow-top") input.stepUp(step);			
		if (arrow.className == "arrow-bottom") input.stepDown(step); 	
	}
}

let containers = document.getElementsByClassName('input-number-container');

if ((containers || []).length > 0) {
	for (let i = 0; i<containers.length; i++) {

		let container = containers[i];
		let arrowsContainer = container.getElementsByClassName('input-number-arrows-container')[0];

		if (arrowsContainer) {
			let arrowTop = arrowsContainer.getElementsByClassName('arrow-top')[0];
			let arrowBottom = arrowsContainer.getElementsByClassName('arrow-bottom')[0];

			if (arrowTop && arrowBottom) {
				arrowTop.addEventListener('click',step);	
				arrowBottom.addEventListener('click',step);						
			}
		}
	}
}