class Grafo {
	constructor() {
		this.adjacencyList = {};
    this.heuristic = [];
    this.cost = [];
	}

	addNode(node) {
		if(!this.adjacencyList[node]) {
			this.adjacencyList[node] = [];
      this.heuristic[node] = [];
      this.cost[node] = [];
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

  addCost(source, destination, val){
    this.cost[source][destination]=val;
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

Grafo.prototype.dijkstra = function (noInicial) {
 
    //Distância do nó inicial para todos os outros nós
    var distancia = [];
    //Inicilizando os nós com a distância "Infinito"
    for (var i = 0; i < this.adjacencyList.length; i++) distancia[i] = Number.MAX_VALUE;
    //a distância do nó inicial pra ele mesmo é zero
    distancia[noInicial] = 0;
 
    //Vetor que contém se um nó já foi visitado ou não
    var visitados = [];
	var result = [];
 
    //Enquanto houver nós que não foram visitiados
    while (true) {
        // ... o nó que atualmente tem a menor distância até o nó inicial
        var menorDistancia = Number.MAX_VALUE;
        var menorIndice = -1;
        for (var j = 0; j < this.adjacencyList.length; j++) {
            //visitando os nós que ainda não foram visitados
            if (distancia[j] < menorDistancia && !visitados[j]) {
                menorDistancia = distancia[j];
                menorIndice = j;
            }
        }
 
        console.log("Visitando o no " + menorIndice + " cuja distancia atual é " + menorDistancia);
 
		result.push(menorIndice);

        if (menorIndice === -1) {
            // Todos os nós foram visitados. O algoritmo acabou. 
			console.log(visitados)
			return result;
            //return distancia;
        }
 
        //visitando os nós vizinhos
        for (var k = 0; k < this.adjacencyList[menorIndice].length; k++) {
            //se esse for o caminho mais curto
            if (this.adjacencyList[menorIndice][k] !== 0 && distancia[k] > distancia[menorIndice] + this.adjacencyList[menorIndice][k]) {
                //salve esse caminho com o mais "caminho mais curto"
                distancia[k] = distancia[menorIndice] + this.adjacencyList[menorIndice][k];
                console.log("Atualizando a distancia do no " + k + " para " + distancia[k]);
            }
        }
        // terminanos de executar o algoritmo para um nó
        visitados[menorIndice] = true;
        console.log("Nodes visitados: " + visitados);
        console.log("A menor distancia atual distancia: " + distancia);
 
    }
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
            //break;
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

Grafo.prototype.UC = function(startNode, endNode){
  let openQueue = [];
  let closedQueue = [];
  let parent = [];
  let nodeCost = [];
  for(let i = 1 ; i<=10 ; i++){
    nodeCost[i] = Number.MAX_VALUE;
  }
  let minCost = Number.MAX_VALUE;
  let minCostID = startNode ;
  nodeCost[startNode] = 0;
  openQueue.push(startNode);
  while(openQueue.length > 0){
    minCost = Number.MAX_VALUE ; 
    for(let op in openQueue){
      if(nodeCost[op] <= minCost){
        minCost = nodeCost[op];
        minCostID = op;
        //closedQueue.push(op); 
        // momento de adicionar o no como visitado na tela
        //openQueue.splice(openQueue.indexOf(op),1);
      }
    }
    closedQueue.push(minCostID);
    openQueue.splice(openQueue.indexOf(minCostID),1);
    if(minCostID === endNode){
      //parent[i]=minCostID;
		  closedQueue.push(minCostID);
      // momento de adicionar o no como visitado na tela
      let caminho = [];
      let pai = endNode;
      caminho.push(pai);
      for(let i in this.adjacencyList){
        caminho.push(parent[pai]);
        if(parent[pai]===startNode){
          caminho.reverse();
          return caminho; // printar o caminho inteiro na tela
          //break;
        }
        pai = parent[pai];
      }
    }
    for(let i of this.adjacencyList[minCostID]){
      if(!closedQueue.includes(i) && !openQueue.includes(i)){
        //parent[i]=minHeuristicID;
        openQueue.push(i);
      }
      if(openQueue.includes(i) && (this.cost[minCostID][i] + nodeCost[minCostID] < nodeCost[i])){
        nodeCost[i] = this.cost[minCostID][i] + nodeCost[minCostID];
        parent[i]=minCostID;
      }
    }
  }
  // se sai do while então não tem solução
}

Grafo.prototype.AEstrela = function(startNode, endNode){
  let openQueue = [];
  let closedQueue = [];
  let parent = [];
  let nodeCost = [];
  for(let i = 1 ; i<=10 ; i++){
    nodeCost[i] = Number.MAX_VALUE;
  }
  let minCost = Number.MAX_VALUE;
  let minCostID = startNode ;
  nodeCost[startNode] = 0;
  openQueue.push(startNode);
  while(openQueue.length > 0){
    minCost = Number.MAX_VALUE ; 
    for(let op of openQueue){
      if(nodeCost[op] + this.heuristic[op][endNode] <= minCost){
        minCost = nodeCost[op];
        minCostID = op;
        //closedQueue.push(op); 
        // momento de adicionar o no como visitado na tela
        //openQueue.splice(openQueue.indexOf(op),1);
      }
    }
    closedQueue.push(minCostID);
    openQueue.splice(openQueue.indexOf(minCostID),1);
    if(minCostID === endNode){
      //parent[i]=minCostID;
		  closedQueue.push(minCostID);
      // momento de adicionar o no como visitado na tela
      let caminho = [];
      let pai = endNode;
      caminho.push(pai);
      for(let i in this.adjacencyList){
        caminho.push(parent[pai]);
        if(parent[pai]===startNode){
          caminho.reverse();
          return caminho; // printar o caminho inteiro na tela
          //break;
        }
        pai = parent[pai];
      }
    }
    for(let i of this.adjacencyList[minCostID]){
      if(!closedQueue.includes(i) && !openQueue.includes(i)){
        //parent[i]=minHeuristicID;
        openQueue.push(i);
      }
      if(openQueue.includes(i) && (this.cost[minCostID][i] + nodeCost[minCostID] < nodeCost[i])){
        nodeCost[i] = this.cost[minCostID][i] + nodeCost[minCostID];
        parent[i]=minCostID;
      }
    }
  }
  // se sai do while então não tem solução
}

export default Grafo;