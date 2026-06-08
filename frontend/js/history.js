window.onload = async function () {

    const full_name =
        localStorage.getItem(
            "full_name"
        );

    document.querySelector(
        ".user-name"
    ).innerHTML =
        "👤 " + full_name;

    const user_id =
        localStorage.getItem(
            "user_id"
        );

    if (!user_id) {

        alert(
            "Please login first"
        );

        window.location.href =
            "signup_login.html";

        return;
    }

    try {

        const response =
            await fetch(
                `http://127.0.0.1:5000/history/${user_id}`
            );

        const data =
            await response.json();

        const table =
            document.getElementById(
                "historyTable"
            );

        table.innerHTML = "";

        data.forEach(function (item) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${item.created_at}</td>
                <td>${item.recommended_crop}</td>
                <td>${item.predicted_yield} Tons/Acre</td>
                <td>${item.location}</td>
                <td>${item.season}</td>
            `;

            table.appendChild(row);

        });

    } catch (error) {

        console.error(error);

        alert(
            "Unable to load history"
        );
    }
};