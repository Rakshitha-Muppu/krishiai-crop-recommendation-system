def validate_email(email):
    return "@" in email

def validate_phone(phone):
    return len(phone) == 10

def validate_password(password):
    return len(password) >= 6