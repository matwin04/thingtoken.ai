function navbarClick() {
    var x = document.getElementById("thingNav");
    if (x.className === "topnav") {
        x.className += "responsive";
    } else {
        x.className = "topnav";
    }
}
