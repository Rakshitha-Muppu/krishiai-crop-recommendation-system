from services.user_service import create_user

create_user(
    "Test User",
    "9999999999",
    "testuser@gmail.com",
    "Telangana",
    "Hyderabad",
    5,
    "Dry Land",
    "password123"
)

print("User Inserted Successfully")