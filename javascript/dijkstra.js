let map = document.getElementById("map");
let start;
let end;

map.addEventListener("load", function(){
    let svgDoc = map.contentDocument;
    let numSelected = 0;
    let startSet = false;
    let endSet = false;

    let seattle = svgDoc.getElementById("Seattle");
    seattle.addEventListener("mouseover", hover);
    seattle.addEventListener("mouseout", unhover);
    seattle.addEventListener("click", select);
    let sanJose = svgDoc.getElementById("San_Jose");
    sanJose.addEventListener("mouseover", hover);
    sanJose.addEventListener("mouseout", unhover);
    sanJose.addEventListener("click", select);
    let losAngeles = svgDoc.getElementById("Los_Angeles");
    losAngeles.addEventListener("mouseover", hover);
    losAngeles.addEventListener("mouseout", unhover);
    losAngeles.addEventListener("click", select);
    let phoenix = svgDoc.getElementById("Phoenix");
    phoenix.addEventListener("mouseover", hover);
    phoenix.addEventListener("mouseout", unhover);
    phoenix.addEventListener("click", select);
    let sanAntonio = svgDoc.getElementById("San_Antonio");
    sanAntonio.addEventListener("mouseover", hover);
    sanAntonio.addEventListener("mouseout", unhover);
    sanAntonio.addEventListener("click", select);
    let austin = svgDoc.getElementById("Austin");
    austin.addEventListener("mouseover", hover);
    austin.addEventListener("mouseout", unhover);
    austin.addEventListener("click", select);
    let dallas = svgDoc.getElementById("Dallas");
    dallas.addEventListener("mouseover", hover);
    dallas.addEventListener("mouseout", unhover);
    dallas.addEventListener("click", select);
    let houston = svgDoc.getElementById("Houston");
    houston.addEventListener("mouseover", hover);
    houston.addEventListener("mouseout", unhover);
    houston.addEventListener("click", select);
    let atlanta = svgDoc.getElementById("Atlanta");
    atlanta.addEventListener("mouseover", hover);
    atlanta.addEventListener("mouseout", unhover);
    atlanta.addEventListener("click", select);
    let chicago = svgDoc.getElementById("Chicago");
    chicago.addEventListener("mouseover", hover);
    chicago.addEventListener("mouseout", unhover);
    chicago.addEventListener("click", select);
    let newYork = svgDoc.getElementById("New_York");
    newYork.addEventListener("mouseover", hover);
    newYork.addEventListener("mouseout", unhover);
    newYork.addEventListener("click", select);
    let philadelphia = svgDoc.getElementById("Philadelphia");
    philadelphia.addEventListener("mouseover", hover);
    philadelphia.addEventListener("mouseout", unhover);
    philadelphia.addEventListener("click", select);

    function hover(){
        this.style.fill = "#5cb85c";
    }
    function unhover(){
        this.style.fill = "white";
    }
    function select(){
        if(numSelected != 2){
            if(!startSet){start=this.id; startSet = true;}
            else if(!endSet){end=this.id; endSet = true;}
            this.style.fill = "#5cb85c";
            this.removeEventListener("mouseover", hover);
            this.removeEventListener("mouseout", unhover);
            this.removeEventListener("click", select);
            this.addEventListener("click", unselect);
            numSelected++;
        }
    }
    function unselect(){
        if(start==this.id){startSet = false;}
        else if(end==this.id){endSet = false;}
        this.removeEventListener("click", unselect);
        this.addEventListener("mouseover", hover);
        this.addEventListener("mouseout", unhover);
        this.addEventListener("click", select);
        this.style.fill = "white";
        numSelected--;
    }
    
}, false);

function runDijkstra(){
    let map = new Graph();
    map.clearPath();
    map.createCitiesGraph();
    map.dijkstra(start, end);
}

class Graph {
    constructor() {
        this.nodes = [];
        this.adjacencyList = {};
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjacencyList[node] = [];
    }

    addEdge(node1, node2, distance){
        this.adjacencyList[node1].push({node:node2, distance: distance});
        this.adjacencyList[node2].push({node:node1, distance: distance});

    }

    createCitiesGraph(){
        this.addNode("New_York");
        this.addNode("Los_Angeles");
        this.addNode("Chicago");
        this.addNode("Houston");
        this.addNode("Phoenix");
        this.addNode("Philadelphia");
        this.addNode("San_Antonio");
        this.addNode("Austin");
        this.addNode("Dallas");
        this.addNode("San_Jose");
        this.addNode("Atlanta");
        this.addNode("Seattle");

        this.addEdge("New_York", "Philadelphia", 95);
        this.addEdge("New_York", "Chicago", 790);

        this.addEdge("Philadelphia", "Atlanta", 780);

        this.addEdge("Chicago", "Philadelphia", 760);
        this.addEdge("Chicago", "Atlanta", 717);
        this.addEdge("Chicago", "Dallas", 968);
        this.addEdge("Chicago", "Seattle", 2064);

        this.addEdge("Atlanta", "Houston", 793);
        this.addEdge("Atlanta", "Dallas", 781);

        this.addEdge("Dallas", "Austin", 195);

        this.addEdge("Houston", "San_Antonio", 197);

        this.addEdge("Austin", "San_Antonio", 80);

        this.addEdge("San_Antonio", "Phoenix", 982);

        this.addEdge("Los_Angeles", "San_Jose", 339);
        this.addEdge("Los_Angeles", "Phoenix", 373);

        this.addEdge("San_Jose", "Seattle", 840);
    }

    dijkstra(start, end){
        let distances = {};
        let backtrace = {};
        let pq = new PriorityQueue();
    
        distances[start] = 0;
        
        this.nodes.forEach(node => {
            if(node !== start){
                distances[node] = Infinity
            }
        });

        pq.enqueue([start, 0]);

        // dijkstra algorithm
        while(!pq.isEmpty()){
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];

            let temp = this.adjacencyList[currentNode];
            this.adjacencyList[currentNode].forEach(neighbor => {
                let distance = distances[currentNode] + neighbor.distance;
                if(distance < distances[neighbor.node]){
                    distances[neighbor.node] = distance;
                    backtrace[neighbor.node] = currentNode;
                    pq.enqueue([neighbor.node, distance]);
                }
            });
        }

        let path = [end];
        let lastStep = end;
        while(lastStep !== start){
            path.unshift(backtrace[lastStep]);
            lastStep = backtrace[lastStep];
        }
        this.highlightPath(path);
        let element = document.getElementById("result");
        element.innerHTML = "Path is " + path + " and the distance is " + distances[end] + "miles.";
    };

    highlightPath(path){
        path.forEach(cities => {
            if(cities != start && cities != end){
                let element = map.contentDocument.getElementById(cities);
                element.style.fill = "#f0ad4e";
            }
        });
    }
    clearPath(){
        let svgDoc = map.contentDocument;
        var city = svgDoc.getElementById("New_York");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Philadelphia");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Chicago");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Atlanta");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Houston");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Dallas");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("San_Antonio");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Austin");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Phoenix");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Los_Angeles");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("San_Jose");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
        city = svgDoc.getElementById("Seattle");
        if(city.id == start || city.id == end){ city.style.fill = "5cb85c";}
        else{
            city.style.fill = "white";
        }
    }
}

// let's use priority queue
class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element){
        if(this.isEmpty()){
            this.collection.push(element);
        }
        else{
            let added = false;
            for(let i = 1; i < this.collection.length; i++){
                if(element[1] < this.collection[i-1][1]){
                    this.collection.splice(i-1, 0, element);
                    added = true;
                    break;
                }
            }
            if(!added){
                this.collection.push(element);
            }
        }
    }

    dequeue(){
        let value = this.collection.shift();
        return value;
    }

    isEmpty(){
        return (this.collection.length == 0)
    }
}