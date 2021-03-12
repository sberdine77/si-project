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

// Grafo.prototype.dijkstra = function (noInicial) {
 
//     //Distância do nó inicial para todos os outros nós
//     var distancia = [];
//     //Inicilizando os nós com a distância "Infinito"
//     for (var i = 0; i < Object.keys(this.adjacencyList).length; i++) distancia[i] = Number.MAX_VALUE;
//     //a distância do nó inicial pra ele mesmo é zero
//     distancia[noInicial] = 0;
// 	console.log("TAMANHO")
// 	console.log(this.adjacencyList[1].length)
 
//     //Vetor que contém se um nó já foi visitado ou não
//     var visitados = [];
// 	var result = [];
 
//     //Enquanto houver nós que não foram visitiados
//     while (true) {
//         // ... o nó que atualmente tem a menor distância até o nó inicial
//         var menorDistancia = Number.MAX_VALUE;
//         var menorIndice = -1;
//         for (var j = 0; j < Object.keys(this.adjacencyList).length; j++) {
//             //visitando os nós que ainda não foram visitados
//             if (distancia[j] < menorDistancia && !visitados[j]) {
//                 menorDistancia = distancia[j];
//                 menorIndice = j;
//             }
//         }
 
//         console.log("Visitando o no " + menorIndice + " cuja distancia atual é " + menorDistancia);
 
// 		result.push(menorIndice);

//         if (menorIndice === -1) {
//             // Todos os nós foram visitados. O algoritmo acabou. 
// 			console.log(visitados)
// 			return result;
//             //return distancia;
//         }
 
//         //visitando os nós vizinhos
//         for (var k = 0; k < this.adjacencyList[menorIndice + 1].length; k++) {
//             //se esse for o caminho mais curto
//             if (this.adjacencyList[menorIndice + 1][k] !== 0 && distancia[k] > distancia[menorIndice] + this.adjacencyList[menorIndice + 1][k]) {
//                 //salve esse caminho com o mais "caminho mais curto"
//                 distancia[k] = distancia[menorIndice] + this.adjacencyList[menorIndice + 1][k];
//                 console.log("Atualizando a distancia do no " + k + " para " + distancia[k]);
//             }
//         }
//         // terminanos de executar o algoritmo para um nó
//         visitados[menorIndice] = true;
//         console.log("Nodes visitados: " + visitados);
//         console.log("A menor distancia atual distancia: " + distancia);
 
//     }
// }

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



Grafo.prototype.astar = function(start, goal) {

  
  var size = 0;
  for(let i in this.adjacencyList) size++


  var graph = [];
  for(var i = 1; i < size+1; i++) {
    graph[i-1] = [];
    for(var j=0; j < size; j++) {
      graph[i-1][j] = 0;
    }
    for(var k=0; k<Object.keys(this.adjacencyList[i]).length; k++) {
      graph[i-1][this.adjacencyList[i][k]-1] = 1;
    }
  }

  var euSize = 0;
  for(let i in this.heuristic) euSize++

  var euristic = [];
  for(var i = 1; i < euSize+1; i++) {
    euristic[i-1] = [];
    for(var j=0; j < euSize; j++) {
      euristic[i-1][j] = this.heuristic[i][j];
    }
  }

  //for(var i = 0; i < euSize; i++) {
  //  for(var j=0; j < euSize; j++) {
  //    console.log(euristic[i][j])
  //  }
  //}

  



  //distancia do nó inicial para os outros nos
  var distances = [];
  //inicializando com distancia infinita
  for(var i = 0; i < graph.length; i++) distances[i] = Number.MAX_VALUE;
  //a distancia do no inicial para si mesmo é 0
  distances[start] = 0;

  //prioridades de visita, calculado pela euristica
  var priorities = [];
  //inicializando com prioridade infinita
  for (var k = 0; k < graph.length; k++) priorities[k] = Number.MAX_VALUE;
  console.log(priorities)

  //eurisitica do no inicial
  priorities[start] = euristic[start][goal];
  
  console.log(priorities)
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

      console.log(lowestPriorityIndex)

      if (lowestPriorityIndex === -1) {
          // não foi encontrado o caminho final

          console.log("Goal node not found :C")

          return -1;
      } else if (lowestPriorityIndex === goal) {
          // caminho final encontrado
          console.log("Goal node found!");
          console.log(distances[lowestPriorityIndex]);
          var result = [];
          result.push(1);
          for (var j = 0; j < visited.length; j++) 
              if (visited[j] == true){
                  result.push(j+1);
              }
          console.log(result)

          return result;

      }

      console.log("Visiting node " + lowestPriorityIndex + " with currently lowest priority of " + lowestPriority);

      //...então para todos os vizinhos ainda não visitados....
      for (var i = 0; i < graph[lowestPriorityIndex].length; i++) {
        //console.log("graph lowest priority index " + graph[lowestPriorityIndex].length)
          if (graph[lowestPriorityIndex][i] !== 0 && !visited[i]) {
              //...se o caminho é menor...
              if (distances[lowestPriorityIndex] + graph[lowestPriorityIndex][i] < distances[i]) {
                  //...salve como menor caminho
                  distances[i] = distances[lowestPriorityIndex] + graph[lowestPriorityIndex][i];
                  //...e sete a prioridade
                  priorities[i] = distances[i] + euristic[i][goal];
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
    console.log("openQueue: "+openQueue+"\n");
    minCost = Number.MAX_VALUE ; 
    for(let op of openQueue){
      if(nodeCost[op] <= minCost){
        console.log("nodeCost["+op+"] = "+nodeCost[op]+"\n");
        minCost = nodeCost[op];
        minCostID = op;
        //closedQueue.push(op); 
        // momento de adicionar o no como visitado na tela
        //openQueue.splice(openQueue.indexOf(op),1);
      }
    }
	console.log("while pos for")
    closedQueue.push(minCostID);
    openQueue.splice(openQueue.indexOf(minCostID),1);
    console.log("openQueue: "+openQueue+"\n"+"closeQueue: "+closedQueue+"\n");
    if(minCostID === endNode){
      //parent[i]=minCostID;
		  //closedQueue.push(minCostID);
      // momento de adicionar o no como visitado na tela
      let caminho = [];
      let pai = endNode;
      caminho.push(pai);
      for(let i in this.adjacencyList){
        caminho.push(parent[pai]);
        console.log("caminho: "+caminho+"\n");
        if(parent[pai]===startNode){
          caminho.reverse();
		  console.log(caminho)
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