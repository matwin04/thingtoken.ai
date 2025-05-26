async function signup() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Basic Validation
    if (!username||!email||!password){
        alert("Please enter a valid username");
        return;
    }
    try  {
        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        console.log("Signup response:", data);

        if (res.ok) {
            alert(data.message || "Signup successful!");
            window.location.href = "/login";
        } else {
            alert(data.error || "Signup failed.");
        }
    } catch (err) {
        console.error("Signup error:", err);
        alert("An unexpected error occurred.");
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        window.location.href = `/profile/${data.username}`;
    }
}

