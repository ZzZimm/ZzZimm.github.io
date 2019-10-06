var open = false;
var nbElem = 0;
var nbStoredElem = parseInt(localStorage.getItem("nbElem"));
var rank;

retrieveStorage();

function retrieveStorage()
{
	var i = 0;
	var j = 0;

	if (nbStoredElem)
	{
		nbElem = nbStoredElem;
		while (nbStoredElem--)
		{
		while (!localStorage.getItem("task" + (i + j)))
				j++;
			retrieveElem(i++ + j);
		}
		rank = i - 1 + j;
	}
}


function retrieveElem(nb)
{
	var elem = JSON.parse(localStorage.getItem("task" + nb));
	var newElemHtml =
	"<tr id='task" + nb + "'>"+
		"<td class=checkbox><input type='checkbox' onclick='validateElem(this)'>" +
		"<td class= 'title'>" + elem.title +
		"<td class= 'description'>" + elem.description +
		"<td class= 'dueDate'><input type='date'>" +
		"<td class= 'actionBox'>" +
			"<img src='img_src/modify.png' onclick='setInput(this)' class='action'></img>" +
			"<img src='img_src/validate.png' onclick='setFix(this)' class='action'></img>" +
			"<img src='img_src/delete.png' onclick='removeElem(this)' class='action'></img>" +
	"</tr>";

	document.getElementById("toDoList").style.display = "table";
	document.getElementById("toDoList").innerHTML += newElemHtml;
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function removeElem(elem)
{
	localStorage.removeItem(elem.parentNode.parentNode.id);
	console.log(elem.parentNode.parentNode.id);
	elem.parentNode.parentNode.innerHTML = "";
	if (!--nbElem)
		document.getElementById("toDoList").style.display = "none";
	localStorage.setItem("nbElem", nbElem);
}

function validateElem(elem)
{
	if (elem.checked)
	{
		elem.parentNode.parentNode.style.opacity = ".2";
		elem.parentNode.parentNode.style.backgroundColor = "lawnGreen";
		elem.parentNode.parentNode.getElementsByClassName("dueDate")[0].firstChild.style.backgroundColor = "lawnGreen";
	}
	else
	{
		elem.parentNode.parentNode.style.opacity = "1";
		elem.parentNode.parentNode.style.backgroundColor = "white";
		elem.parentNode.parentNode.getElementsByClassName("dueDate")[0].firstChild.style.backgroundColor = "white";
	}

}

function addElem()
{
	var i = 0;
	var title = window.prompt("Enter task title: ", "Grocery shopping for Max's birthday");
	var description = window.prompt("Enter task description: ", "Dark Rhum, Ginger Beer & Crackers");
	var newElemHtml;

	document.getElementById("toDoList").style.display = "table";
	while (localStorage.getItem("task" + (rank + i)))
		i++;
	newElemHtml =
	"<tr id='task" + (rank + i) + "'>"+
		"<td class=checkbox><input type='checkbox' onclick='validateElem(this)'>" +
		"<td class= 'title'>" + title +
		"<td class= 'description'>" + description +
		"<td class= 'dueDate'><input type='date'>" +
		"<td class= 'actionBox'>" +
			"<img src='img_src/modify.png' onclick='setInput(this)' class='action'></img>" +
			"<img src='img_src/validate.png' onclick='setFix(this)' class='action'></img>" +
			"<img src='img_src/delete.png' onclick='removeElem(this)' class='action'></img>" +
	"</tr>";
	document.getElementById("toDoList").innerHTML += newElemHtml;
	localStorage.setItem("task" + (rank + i), "{\"title\": \"" + title + "\", \"description\": \"" + description + "\"}");
	localStorage.setItem("nbElem", ++nbElem);
	console.log(document.getElementById("toDoList").lastChild.id);
}

function setInput(elem)
{
	var titleElem = elem.parentNode.parentNode.getElementsByClassName("title");
	var titleValue = titleElem[0].innerHTML;
	var descriptionElem = elem.parentNode.parentNode.getElementsByClassName("description");
	var descriptionValue = descriptionElem[0].innerHTML;

	if (open)
		return ;
	titleElem[0].innerHTML = "<textarea oninput='auto_grow(this)'>" + titleValue + "</textarea>";
	descriptionElem[0].innerHTML = "<textarea oninput='auto_grow(this)'>" + descriptionValue + "</textarea>";
	elem.nextSibling.style.backgroundColor = "lightGreen";
	elem.nextSibling.style.borderRadius = "20px";
	open = true;
}

function setFix(elem)
{
	var titleElem = elem.parentNode.parentNode.getElementsByClassName("title");
	var descriptionElem = elem.parentNode.parentNode.getElementsByClassName("description");
	var	taskId = elem.parentNode.parentNode.id;

	if (!open)
		return ;
	titleElem[0].innerHTML = titleElem[0].firstChild.value;
	descriptionElem[0].innerHTML = descriptionElem[0].firstChild.value;
	elem.style.backgroundColor = "white";
	localStorage.setItem(taskId, "{\"title\": \"" + titleElem[0].innerHTML + "\", \"description\": \"" + descriptionElem[0].innerHTML + "\"}");
	open = false;
}
