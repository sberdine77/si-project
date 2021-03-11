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
        closedQueue.push(op); 
        // momento de adicionar o no como visitado na tela
        openQueue.splice(openQueue.indexOf(op),1);
      }
    }
    for(let i of this.adjacencyList[minHeuristicID]){
      if(i === endNode){
        parent[i]=minHeuristicID;
		    closedQueue.push(i);
        // momento de adicionar o no como visitado na tela
        let caminho = [];
        let pai = endNode;
        caminho.push(pai);
        for(let i in this.adjacencyList){
          caminho.push(parent[pai]);
          if(parent[pai]===startNode){
            caminho.reverse();
            return caminho; // printar o caminho inteiro na tela
            break;
          }
          pai = parent[pai];
        }
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

Grafo.prototype.astar = function(start, goal) {

  //var graph = [
  //    [0,1,0,0,0,10],
  //    [0,0,2,1,0,0],
  //    [0,0,0,0,5,0],
  //    [0,0,0,0,3,4],
  //    [0,0,0,0,0,2],
  //    [0,0,0,0,0,0]
  //];

  //var heuristic = [
  //    [0,0,0,0,0,5],
  //    [0,0,0,0,0,3],
  //    [0,0,0,0,0,4],
  //    [0,0,0,0,0,2],
  //    [0,0,0,0,0,6],
  //    [0,0,0,0,0,0]
  //];

  //distancia do nó inicial para os outros nos
  var distances = [];
  //inicializando com distancia infinita
  for (var i = 0; i < this.adjacencyList.length; i++) distances[i] = Number.MAX_VALUE;
  //a distancia do no inicial para si mesmo é 0
  distances[start] = 0;

  //prioridades de visita, calculado pela euristica
  var priorities = [];
  //inicializando com prioridade infinita
  for (var k = 0; k < this.adjacencyList.length; k++) priorities[k] = Number.MAX_VALUE;
  //eurisitica do no inicial
  priorities[start] = this.heuristic[start][goal];

  //se o nó foi visitado
  var visited = [];

  //enquanto a nos para visitar...
  while (true) {

      // ... ache o no com menor prioridade...
      var lowestPriority = Number.MAX_VALUE;
      var lowestPriorityIndex = -1;
      for (var l = 0; l < priorities.length; l++) {
          //... verificando todos os nos que ainda não foi
          if (priorities[l] < lowestPriority && !visited[l]) {
              lowestPriority = priorities[l];
              lowestPriorityIndex = l;
          }
      }

      if (lowestPriorityIndex === -1) {
          // não foi encontrado o caminho final
          return -1;
      } else if (lowestPriorityIndex === goal) {
          // caminho final encontrado
          console.log("Goal node found!");
          console.log(distances[lowestPriorityIndex]);
          var result = "[";
          for (var j = 0; j < visited.length; j++) 
              if (visited[j] == true){
                  result = result + j + ",";
              }
          var result = result + visited.length;
          result = result + "]";
          console.log(result)
          return distances[lowestPriorityIndex];
      }

      console.log("Visiting node " + lowestPriorityIndex + " with currently lowest priority of " + lowestPriority);

      //...então para todos os vizinhos ainda não visitados....
      for (var i = 0; i < this.adjacencyList[lowestPriorityIndex].length; i++) {
          if (this.adjacencyList[lowestPriorityIndex][i] !== 0 && !visited[i]) {
              //...se o caminho é menor...
              if (distances[lowestPriorityIndex] + this.adjacencyList[lowestPriorityIndex][i] < distances[i]) {
                  //...salve como menor caminho
                  distances[i] = distances[lowestPriorityIndex] + this.adjacencyList[lowestPriorityIndex][i];
                  //...e sete a prioridade
                  priorities[i] = distances[i] + this.heuristic[i][goal];
                  console.log("Updating distance of node " + i + " to " + distances[i] + " and priority to " + priorities[i]);
              }
          }
      }

      // No visitado.
      visited[lowestPriorityIndex] = true;
      console.log("Visited nodes: " + visited);
      console.log("Currently lowest distances: " + distances);

  }
}

export default Grafo;