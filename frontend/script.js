var counter = document.getElementById("counter");
getCounter();

var socket = io();

socket.on('updated', function(result){
    console.log(result);
    increment(result)
});

increment = (result) => {
    counter.innerHTML = result
}

incrementCounter = () => {
    socket.emit('increment')
}

async function getCounter(){
    try {
        const response = await axios.get('/get-counter')
        console.log(response.data)
        counter.innerHTML = response.data[0].value;
    } catch (error) {
        throw error
    }
}
