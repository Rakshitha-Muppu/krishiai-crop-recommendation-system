function switchTab(tab) {
    document.getElementById('section-login').classList.toggle('visible', tab === 'login');
    document.getElementById('section-signup').classList.toggle('visible', tab === 'signup');
    document.querySelectorAll('.tab').forEach((t, i) => {
        t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'signup'));
    });
}

function togglePw(id, btn) {
    const input = document.getElementById(id);
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.querySelector('i').className = isText ? 'ti ti-eye' : 'ti ti-eye-off';
}
async function handleLogin() {

    const email =
        document.getElementById("login-email")
            .value
            .trim();

    const password =
        document.getElementById("login-pw")
            .value;

    if (!email || !password) {

        alert("Please fill all fields");
        return;
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const result =
            await response.json();

        if (
            result.message ===
            "Login successful"
        ) {

            localStorage.setItem(
                "user_id",
                result.user_id
            );

            localStorage.setItem(
                "full_name",
                result.full_name
            );
            localStorage.setItem(
                "state",
                result.state
            );

            localStorage.setItem(
                "district",
                result.district
            );

            localStorage.setItem(
                "land_acres",
                result.land_acres
            );

            localStorage.setItem(
                "land_type",
                result.land_type
            );
            const msg =
                document.getElementById(
                    "login-success"
                );

            msg.classList.add("show");

            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert(
            "Unable to connect to server"
        );
    }
}

async function getLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            try {

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );

                const data = await response.json();

                const state = data.address.state;

                const district =
                    data.address.county ||
                    data.address.state_district;

                if (stateDistricts[state]) {

                    document.getElementById("su-state").value = state;

                    document
                        .getElementById("su-state")
                        .dispatchEvent(
                            new Event("change")
                        );

                    setTimeout(() => {

                        document.getElementById(
                            "su-district"
                        ).value = district;

                    }, 300);

                } else {

                    alert(
                        `Location detected: ${state}\n\nPlease select State and District manually.`
                    );
                }

            } catch (error) {

                console.error(error);

                alert(
                    "Unable to detect location."
                );
            }
        },

        () => {

            alert(
                "Location permission denied."
            );
        }
    );
}


async function handleSignup() {

    const full_name = document.getElementById('su-name').value.trim();
    const phone_number = document.getElementById('su-phone').value.trim();
    const email = document.getElementById('su-email').value.trim();

    const state = document.getElementById('su-state').value;
    const district = document.getElementById('su-district').value;

    const land_acres = document.getElementById('su-acres').value;
    const land_type = document.getElementById('su-landtype').value;

    const password = document.getElementById('su-pw').value;
    const confirm_password = document.getElementById('su-pw2').value;

    if (
        !full_name ||
        !phone_number ||
        !email ||
        !state ||
        !district ||
        !land_acres ||
        !land_type ||
        !password ||
        !confirm_password
    ) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match");
        return;
    }

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    full_name,
                    phone_number,
                    email,
                    state,
                    district,
                    land_acres,
                    land_type,
                    password
                })
            }
        );

        const result = await response.json();

        if (result.message === "User registered successfully") {
            
            localStorage.setItem("state", state);

            localStorage.setItem("district", district);

             localStorage.setItem(
                "location",
                district + ", " + state
            );
            
            localStorage.setItem("land_acres", land_acres);

            localStorage.setItem("land_type", land_type);

            const msg = document.getElementById('signup-success');

            msg.classList.add('show');

            setTimeout(() => {

                msg.classList.remove('show');
                switchTab('login');

            }, 2000);

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);
        alert("Unable to connect to server");

    }
}
let stateDistricts = {};

async function loadStates() {

    try {

        const response =
            await fetch("./data/modern_states_districts.json");

        stateDistricts =
            await response.json();

        const stateDropdown =
            document.getElementById("su-state");

        stateDropdown.innerHTML =
            '<option value="">Select State</option>';

        Object.keys(stateDistricts)
            .forEach(state => {

                const option =
                    document.createElement("option");

                option.value = state;
                option.textContent = state;

                stateDropdown.appendChild(option);
            });

    } catch (error) {

        console.error(
            "Error loading states:",
            error
        );

        alert(
            "Unable to load states."
        );
    }
}

document
    .getElementById("su-state")
    .addEventListener(
        "change",
        function () {

            const selectedState =
                this.value;

            const districtDropdown =
                document.getElementById("su-district");

            districtDropdown.innerHTML =
                '<option value="">Select District</option>';

            if (
                selectedState &&
                stateDistricts[selectedState]
            ) {

                stateDistricts[selectedState]
                    .forEach(district => {

                        const option =
                            document.createElement("option");

                        option.value = district;
                        option.textContent = district;

                        districtDropdown.appendChild(option);
                    });
            }
        }
    );

window.onload = () => {

    loadStates();

    const params =
        new URLSearchParams(
            window.location.search
        );

    const mode =
        params.get("mode");

    if (mode === "signup") {

        switchTab("signup");

    } else {

        switchTab("login");

    }

};