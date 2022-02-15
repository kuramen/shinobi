const castParallax = () => {

	const onScroll = () => {
		const layers = document.getElementsByClassName("parallax");
		for (const layer of layers) {
			const speed = layer.getAttribute('data-speed')
			const yPos = -(this.pageYOffset * speed / 100)
			layer.style.transform = `translate3d(0px, ${yPos}px, 0px)`
		}
	}

	window.addEventListener("scroll", onScroll);
}

document.body.onload = castParallax();