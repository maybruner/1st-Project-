const baseURL = "http://localhost:3002/";

async function payment() {
  try {
    const breadAmount = parseInt(localStorage.getItem("bread"));
    const milkAmount = parseInt(localStorage.getItem("milk"));
    const gumAmount = parseInt(localStorage.getItem("gum"));
  
    const approveToServer = {
      user: localStorage.getItem("user"),
      products: {
        milk: milkAmount || 0,
        gum: gumAmount || 0,
        bread: breadAmount || 0,
      },
    };
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3002/approve", false); // `false` makes it synchronous
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.send(JSON.stringify(approveToServer));
  
    if (xhr.status >= 200 && xhr.status < 300) {
      location.href = "./index.html";
      alert("The payment was successful");
    } else {
      console.error("Error:", xhr.responseText);
      alert("The payment did not succeed!");
    }
  } catch (error) {
    console.error("Request error:", error);
    alert(error);
  }  
}

async function signIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const result = await fetch(baseURL, {
    method: "post",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: myHeaders,
  });

  if (result.status >= 400) {
    alert("Wrong credentials");
    return;
  }

  localStorage.setItem("user", email);
  location.href = "./products.html";
}

async function signUpCallback() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const myHeaders = new Headers();
  myHeaders.append("Access-Control-Allow-Origin", "*")
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({
    email: email,
    password: password,
    name: name,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: body,
    redirect: "follow",
  };

  const resp = await fetch("http://localhost:3002/sign-up", requestOptions);
  if (resp.status === 403) {
    alert("User is already exists!");
  }
  location.href = "./index.html";
}
