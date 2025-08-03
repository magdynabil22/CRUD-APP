// ✅ دالة كتابة البيانات في LocalStorage
const WriteIoStorage = (data, keyName = "users") => {
    localStorage.setItem(keyName, JSON.stringify(data));
};

// ✅ دالة قراءة البيانات من LocalStorage
const ReadIoStorage = (keyName = "users") => {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(keyName));
        if (!Array.isArray(data)) throw new Error("Data is not an array");
    } catch (e) {
        restInStorage(keyName);
        data = [];
    }
    return data;
};

// ✅ دالة لحذف بيانات LocalStorage لو حصل خطأ
const restInStorage = (keyName = "users") => localStorage.removeItem(keyName);

// ✅ إضافة مستخدم جديد من index.html
const addNewUser = document.querySelector("#addNewUser");
if (addNewUser) {
    addNewUser.addEventListener("submit", function (e) {
        e.preventDefault();
        const editId = localStorage.getItem("editUserId");
        let allData = ReadIoStorage();

        if (editId) {
            // Edit existing user
            const userIndex = allData.findIndex(user => user.id == editId);
            if (userIndex !== -1) {
                allData[userIndex] = {
                    id: Number(editId), // keep the same ID
                    name: addNewUser.username.value,
                    phone: addNewUser.numberphone.value,
                    password: addNewUser.password.value,
                    email: addNewUser.email.value,
                };
            }
            localStorage.removeItem("editUserId"); // Clear edit mode
        } else {
            // Add new user
            const User = {
                id: Date.now(),
                name: addNewUser.username.value,
                phone: addNewUser.numberphone.value,
                password: addNewUser.password.value,
                email: addNewUser.email.value,
            };
            allData.push(User);
        }

        WriteIoStorage(allData);
        window.location.href = "table.html";
    });
}

// ✅ دالة لإنشاء عناصر HTML
const creatMyOwnElement = (parent, element, text, className) => {
    const newElement = document.createElement(element);
    parent.appendChild(newElement);
    if (text) newElement.textContent = text;
    if (className) newElement.className = className;
    return newElement;
};

const datawrap = document.querySelector("#datawrap");

// ✅ دالة لرسم البيانات في الجدول
const draw = (allData) => {
    datawrap.innerHTML = "";
    if (!allData.length) {
        let tr = creatMyOwnElement(datawrap, "tr", null, "table-danger");
        let td = creatMyOwnElement(tr, "td", "No Data Available", "text-center");
        td.colSpan = 6;
        return;
    }

    allData.forEach((user, index) => {
        let tr = creatMyOwnElement(datawrap, "tr");
        creatMyOwnElement(tr, "td", index + 1);
        creatMyOwnElement(tr, "td", user.name);
        creatMyOwnElement(tr, "td", user.phone);
        creatMyOwnElement(tr, "td", user.email);
        creatMyOwnElement(tr, "td", user.password);
        let td = creatMyOwnElement(tr, "td");

        let show = creatMyOwnElement(td, "button", "Show", "btn btn-primary ms-3");
        show.addEventListener("click", () => console.log(user));

        let edit = creatMyOwnElement(td, "button", "Edit", "btn btn-success ms-3");

        let del = creatMyOwnElement(td, "button", "Delete", "btn btn-danger ms-3");
        del.addEventListener("click", function () {
            deleteUser(user.id);
        });
        show.addEventListener("click", () => {
            displayUser(user);
        });
        edit.addEventListener("click", () => {
            localStorage.setItem("editUserId", user.id);
            window.location.href = "add.html";
        });
    });
};
const userDisplay = document.getElementById("userDisplay");
const displayUser = (user) => {
  currentlyDisplayedUserId = user.id; // Store ID internally
  userDisplay.innerHTML = ""; // Clear previous data
  const card = creatMyOwnElement(userDisplay, "div", null, "card p-3 mb-3");
  creatMyOwnElement(card, "h4", "User Details", "mb-3");
  creatMyOwnElement(card, "p", `Name: ${user.name}`);
  creatMyOwnElement(card, "p", `Phone: ${user.phone}`);
  creatMyOwnElement(card, "p", `Email: ${user.email}`);
  creatMyOwnElement(card, "p", `Password: ${user.password}`);
};
// ✅ دالة الحذف (شغالة على ID)
const deleteUser = (id) => {
  let allData = ReadIoStorage();
  if (currentlyDisplayedUserId === id) {
    userDisplay.innerHTML = "";
    currentlyDisplayedUserId = null;
  }
  allData = allData.filter(user => user.id !== id);
  WriteIoStorage(allData);
  draw(allData);
};
const editId = localStorage.getItem("editUserId");
if (editId && addNewUser) {
    const allData = ReadIoStorage();
    const userToEdit = allData.find(user => user.id == editId);
    if (userToEdit) {
        addNewUser.username.value = userToEdit.name;
        addNewUser.numberphone.value = userToEdit.phone;
        addNewUser.password.value = userToEdit.password;
        addNewUser.email.value = userToEdit.email;
    }
}
// ✅ تحميل البيانات عند وجود جدول
if (datawrap) {
    const allData = ReadIoStorage();
    draw(allData);
}