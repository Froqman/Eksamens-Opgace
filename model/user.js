// Opretter user som modelclass
class User {
    constructor(name, birthday, email, gender, country, hashedPassword){
        this.name = name
        this.birthday = birthday
        this.email = email
        this.gender = gender
        this.country = country
        this.hashedPassword = hashedPassword
    }
}

module.exports = User
