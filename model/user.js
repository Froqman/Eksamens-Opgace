// Opretter user som modelclass
class user {
    constructor(name, birthday, email, gender, country, hashed_password){
        this.name = name
        this.birthday = birthday
        this.email = email
        this.gender = gender
        this.country = country
        this.hashed_password = hashed_password
    }
}

module.exports = user
