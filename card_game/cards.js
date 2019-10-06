var suits = ["\u2660", "\u2663", "\u2665", "\u2666"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var deck = [];
var rank = 0;

deck = getDeck();

function getDeck()
{
	for(var i = 0; i < suits.length; i++)
	{
        for(var x = 0; x < values.length; x++)
		{
			var card = {value: values[x], suit: suits[i]};
			deck.push(card);
		}
	}
	return deck;
}

function shuffle(array, arr_length)
{
    var i = -1;
    var j;
    var tmp;

    if (rank)
    {
        document.getElementById("deck").innerHTML = "";
        rank = 0;
    }
    while (++i < arr_length)
	{
		j = Math.floor((Math.random() * arr_length));
		tmp = deck[j];
		deck[j] = deck[i];
        deck[i] = tmp;
	}
}

function renderCardCenter(i)
{
    var center_element = [];
    var center = [];
    var value = 0;
    var k;

    if (!isNaN(Number(deck[i].value)) && (k = -1))
    {
        value = Number(deck[i].value);
        center = document.createElement("div");
        center.id = "center" + deck[i].suit + deck[i].value;
        center.className = "center";
        if (value < 10)
            center.style = "margin-top: " + (100 / (value - (value % 2)) - 10) + "%;";
        document.getElementById("card" + deck[i].suit + deck[i].value).appendChild(center);
        while (++k < value)
        {
            center_element = document.createElement("span");
            center_element.className = "center_element";
            center_element.innerHTML = deck[i].suit;
            center_element.style = "top: " + (100 * (k % 2 ? k - 1 : k) / (value - (value % 2))) + "%;" + ((k % 2) ? "left: 10%;" : "right: 10%;");
            if ((100 * (k % 2 ? k : k + 1) / value) == 100)
                center_element.style = "transform: rotate(180deg); margin-top: -" + (100 / (value - (value % 2)) - 10) + "; top: 40%; left: 38.5%;";
            document.getElementById("center" + deck[i].suit + deck[i].value).appendChild(center_element);
        }
    }
    else
    {
        center_element = document.createElement("span");
        center_element.innerHTML = deck[i].suit;
        center_element.style = "position: absolute; top: 38%; left:37%; font-size: 2.5rem";
        document.getElementById("card" + deck[i].suit + deck[i].value).appendChild(center_element);
    }
}

function renderDeck(length)
{
    var i = -1;
    var j;
    var card = [];
    var element = [];
    var pos = ["top left", "bottom right", "bottom left", "top right"]

    while (++i + rank < length && (j = -1) && (k = -1))
	{
		card = document.createElement("div");
        card.id = "card" + deck[i + rank].suit + deck[i + rank].value;
		card.className = "card" + " " + (suits.indexOf(deck[i + rank].suit) > 1 ? "red" : "black");
	    document.getElementById("deck").appendChild(card);
        renderCardCenter(i + rank);
        while (++j < pos.length)
        {
            element = document.createElement("span");
            element.className = "elem " + pos[j];
            element.innerHTML = deck[i + rank].value + " <br> " + deck[i + rank].suit;
            document.getElementById("card" + deck[i + rank].suit + deck[i + rank].value).appendChild(element);
        }
	}
}

function displayDeck(nbCardsToDisplay)
{
    if (nbCardsToDisplay < 0 || nbCardsToDisplay > 52)
    {
        document.getElementById("deck").innerHTML = "";
        return (alert("Incorrect number, should be between 1 and 52"));
    }
    if (rank + nbCardsToDisplay > 52)
    {
        renderDeck(52);
        rank = 52;
        return (alert("Cannot display cards over 52, displaying full deck..."));
    }
    renderDeck(nbCardsToDisplay + rank);
    rank += nbCardsToDisplay;
}
