const formDOM = document.querySelector(".form");
const usernameInputDOM = document.querySelector(".username-input");
const passwordInputDOM = document.querySelector(".password-input");
const formAlertDOM = document.querySelector(".form-alert");
const resultDOM = document.querySelector(".result");
const btnDOM = document.querySelector("#data");
const tokenDOM = document.querySelector(".token");

formDOM.addEventListener("submit", async (e) => {
  formAlertDOM.classList.remove("text-success");
  formAlertDOM.classList.remove("text-sucess");

  e.preventDefault();
  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;

  try {
    const response = await axios.post("/api/v1/login", { username, password });
    const { data } = response;

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = data.msg;
    formAlertDOM.classList.add("text-success");
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";

    // token = data.token;

    localStorage.setItem("token", data.token);
    resultDOM.textContent = "";
    tokenDOM.textContent = "token present";
    tokenDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = error.response.data.msg;
    resultDOM.textContent = "";
    tokenDOM.textContent = "token not present";
    tokenDOM.classList.remove("text-success");
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
  }, 3000);
});

btnDOM.addEventListener("click", async function () {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("/api/v1/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = response;
    resultDOM.innerHTML = `<h5>${data.message}</h5><p>${data.secret}</p>`;
  } catch (error) {
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
  }
});

const checkToken = () => {
  tokenDOM.classList.remove("text-success");
  const token = localStorage.getItem("token");
  if (token) {
    tokenDOM.textContent = "token present";
    tokenDOM.classList.add("text-success");
  }
};
checkToken();
