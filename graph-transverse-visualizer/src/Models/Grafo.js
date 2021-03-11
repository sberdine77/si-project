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
    this.heuristic[source][destination]=val;
    this.heuristic[destination][source]=val;
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
	//let result = [];
  let openQueue = [];
  let closedQueue = [];
  let parent = [];
  let minHeuristic = Number.MAX_VALUE ;
  let minHeuristicID = startNode ;
  openQueue.push(startNode)
  while(openQueue.length>0){
    for(let op of openQueue){
      if(this.heuristic[op][endNode] <= minHeuristic){
        minHeuristic = this.heuristic[op][endNode] ;
        minHeuristicID = op ;
        closedQueue.push(op); // momento de adicionar o no como visitado na tela
        openQueue.splice(openQueue.indexOf(op),1);
      }
    }
    for(let i of this.adjacencyList[minHeuristicID]){
      if(i === endNode){
        parent[i]=minHeuristicID;
        // momento de adicionar o no como visitado na tela e printar o caminho inteiro na tela
		closedQueue.push(i);
		return closedQueue;
        break;
      }
      if(!closedQueue.includes(i) && !openQueue.includes(i)){
        parent[i]=minHeuristicID;
        openQueue.push(i);
      }
    }
  }
  // se sai do while então não tem solução

}

export default Grafo;