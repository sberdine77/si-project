class Grafo {
	constructor() {
		this.adjacencyList = {};
    this.heuristic = [];
	}

	addNode(node) {
		if(!this.adjacencyList[node]) {
			this.adjacencyList[node] = [];
      this.heuristic[node] = [];
		}
	}

	addLink(source, destination) {
		if(!this.adjacencyList[source]) {
			this.addNode(source);
		}
		if(!this.adjacencyList[destination]) {
			this.addNode(destination);
		}
		this.adjacencyList[source].push(destination);
		//this.adjacencyList[destination].push(source);
	}

  addHeuristic(source, destination, val){
    //if((typeof this.adjacencyList[source][destination]) !== "object")
      //this.adjacencyList[source][destination]=[];
    //this.adjacencyList[source][destination].push(val);
    //if((typeof this.heuristic[source][destination]) !== "object")
    //  this.heuristic[source][destination] = [];
    //this.heuristic[source][destination].push(val);
    //if((typeof this.heuristic[destination][source]) !== "object")
    //  this.heuristic[destination][source] = [];
    //this.heuristic[destination][source].push(val);
    this.adjacencyList[source][destination]=val;
    this.adjacencyList[destination][source]=val;
  }
}

Grafo.prototype.bfs = function(source) {
	const queue = [source];
    const result = [];
    const visited = {};
    visited[source] = true;
    let currentVertex;
    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
}

Grafo.prototype.dfs = function(source) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    (function dfs(vertex){
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach(neighbor => {
          if (!visited[neighbor]) {
            return dfs(neighbor);
          }
      })
    })(source);
    return result;
}

Grafo.prototype.GBFS = function(startNode,endNode){
  let openQueue = [];
  let closedQueue = [];
  let minHeuristic = Number.MAX_VALUE ;
  let minHeuristicID ;
  openQueue.push(startNode)
  while(openQueue.length>0){
    for(let op of openQueue){
      if(this.adjacencyList[op][endNode] <= minHeuristic){
        minHeuristic = this.adjacencyList[op][endNode] ;
        minHeuristicID = op ;
        closedQueue.push(op); // momento de adicionar o no como visitado na tela
        openQueue.splice(openQueue.indexOf(op),1);
      }
    }
    for(let i of this.adjacencyList[minHeuristicID]){
      if(i === endNode){
        // momento de adicionar o no como visitado na tela e printar o caminho inteiro na tela
        break;
      }
      if(!closedQueue.includes(i) && !openQueue.includes(i)){
        openQueue.push(i);
      }
    }
  }
  // se sai do while então não tem solução

}

export default Grafo;