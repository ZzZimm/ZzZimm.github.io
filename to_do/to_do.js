var open = false;
var nbElem = 0;
var nbStoredElem = parseInt(localStorage.getItem("nbElem"));
var maxIndex = 0;
var nbElem = 0;
var elemList = [];

retrieveStorage();

function retrieveStorage()
{
	var elemListStorage = JSON.parse(localStorage.getItem("elemList"));

	if (!elemListStorage)
		return ;
	maxIndex = parseInt(localStorage.getItem("maxIndex"));
	nbElem = parseInt(localStorage.getItem("nbElem"));
	retrieveElem(elemListStorage);
	elemList = elemListStorage;
}

function clearTasks()
{
	document.getElementById("toDoList").innerHTML =
	"<tr>" +
			"<th class=\"checkbox\"></th>" +
			"<th class=\"title\">Title<button onclick = \"sortBy('title')\" class=\"button\">sort</button></th>" +
			"<th class=\"description\">Description<button onclick = \"sortBy('description')\" class=\"button\">sort</button></th>" +
			"<th class=\"dueDate\">Due date<button onclick = \"sortBy('date')\" class=\"button\">sort</button></th>" +
			"<th class=\"actionBox\">Actions</th>" +
	"</tr>";
}

function retrieveElem(storage)
{
	var i = -1;
	var newElemHtml = "";

	while (storage[++i])
	{
		newElemHtml =
		"<tr id='" + storage[i].id + "'>"+
			"<td class=checkbox><input type='checkbox' onclick='validateElem(this)'>" +
			"<td class= 'title'>" + storage[i].title +
			"<td class= 'description'>" + storage[i].description +
			"<td class= 'dueDate'><input oninput='setDate(this)' type='date' value = '" + storage[i].date + "'>" +
			"<td class= 'actionBox'>" +
				"<img src='img_src/modify.png' onclick='setInput(this)' class='action'></img>" +
				"<img src='img_src/validate.png' onclick='setFix(this)' class='action'></img>" +
				"<img src='img_src/delete.png' onclick='removeElem(this)' class='action'></img>" +
		"</tr>";
		document.getElementById("toDoList").style.display = "table";
		document.getElementById("toDoList").innerHTML += newElemHtml;
	}
}

function setDate(elem)
{
	elemList.find(x => x.id === elem.parentNode.parentNode.id).date = elem.value;
	localStorage.setItem("elemList", JSON.stringify(elemList));
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function removeElem(elem)
{
	var index = elemList.findIndex(x => x.id === elem.parentNode.parentNode.id);

	elem.parentNode.parentNode.innerHTML = "";
	if (!--nbElem)
		document.getElementById("toDoList").style.display = "none";
	elemList.splice(index, 1);
	localStorage.setItem("elemList", JSON.stringify(elemList));
	localStorage.setItem("nbElem", nbElem);
}

function sortBy(attr)
{
	clearTasks();
	if (attr == "title")
		retrieveElem(elemList.sort(compareTitle));
	if (attr == "description")
		retrieveElem(elemList.sort(compareDescription));
	if (attr == "date")
		retrieveElem(elemList.sort(compareDate));
}

function compareTitle(a, b)
{
	if (a.title < b.title)
		return (-1);
	if (a.title > b.title)
		return (1);
	return (0);
}

function compareDescription(a, b)
{
	if (a.description < b.description)
		return (-1);
	if (a.description > b.description)
		return (1);
	return (0);
}

function compareDate(a, b)
{
	if (a.date < b.date)
		return (-1);
	if (a.date > b.date)
		return (1);
	return (0);
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

	document.getElementById("toDoList").style.display = "table";
	var newElemHtml =
	"<tr id='task" + maxIndex + "'>"+
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
	var element = {
			id: "task" + maxIndex++,
			title: title,
			description: description,
			date: "dd/mm/yy"
	};
	elemList.push(element);
	localStorage.setItem("elemList", JSON.stringify(elemList));
	localStorage.setItem("maxIndex", maxIndex);
	localStorage.setItem("nbElem", ++nbElem);

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
	var i = elemList.findIndex(x => x.id === taskId);

	if (!open)
		return ;
	titleElem[0].innerHTML = titleElem[0].firstChild.value;
	descriptionElem[0].innerHTML = descriptionElem[0].firstChild.value;
	elem.style.backgroundColor = "white";
	elemList[i].description = descriptionElem[0].innerHTML;
	elemList[i].title = titleElem[0].innerHTML;
	localStorage.setItem("elemList", JSON.stringify(elemList));
	open = false;
}
