

const userData = (req, res) => {
    try {
        res.send({
            name:"Adarsh",
            username: "Adarsh Gupta",
            age: 20,
            address: "pandesara"
        })
    } catch (error) {
        console.log(error)
    }
}


export {
    userData
}
