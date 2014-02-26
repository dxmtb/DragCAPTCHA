console.log("Start DragCAPTCHA");

var dragSrc = null;

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	canvas.getContext("2d").drawImage(image, 0, 0);
	return canvas;
}

function handleDragStart(e) {
	console.log("drag start" + e.srcElement);
	if (e.srcElement.tagName == "IMG")
	{
		dragSrc = e.srcElement;
		console.log("update to" + dragSrc)
	}
}

function handleDrop(e) {
	var target = e.target || e.srcElement;
	console.log("drag drop" + target + dragSrc);
	if (target.tagName == "INPUT")
	{
		if (e.stopPropagation) {
			e.stopPropagation(); // Stops some browsers from redirecting.
		}
		
		console.log(dragSrc);
		var canvas = convertImageToCanvas(dragSrc);
		var str = GOCR(canvas);
		console.log("result " + str);
		target.value = str.replace(/\s+/g,"").toUpperCase();
	}
}

window.addEventListener('dragstart', handleDragStart, false);
window.addEventListener('drop', handleDrop, false);

dragCHATCHA.init();