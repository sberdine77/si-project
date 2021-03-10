import React, {useState, useEffect} from 'react';
import {Graph} from 'react-d3-graph';
import Grafo from '../../../Models/Grafo';

function MainPage() {
	// graph payload (with minimalist structure)

	
	//const [nodes, setNodes] = useState([]);
	//const [links, setLinks] = useState([]);

	const [data, setData] = useState({});

	var graph = new Grafo();
	graph.addNode(1);
	graph.addNode(2);
	graph.addNode(3);
	graph.addNode(4);
	graph.addNode(5);
	graph.addNode(6);
	graph.addNode(7);
	graph.addNode(8);
	graph.addNode(9);
	graph.addNode(10);

	graph.addLink(1, 2);
	graph.addLink(1, 3);
	graph.addLink(2, 4);
	graph.addLink(2, 5);
	graph.addLink(3, 6);
	graph.addLink(3, 7);
	graph.addLink(4, 8);
	graph.addLink(5, 9);
	graph.addLink(8, 9);
	graph.addLink(9, 10);
	graph.addLink(6, 10);

	graph.addHeuristic(1,1,0);
	graph.addHeuristic(1,2,11);
	graph.addHeuristic(1,3,7);
	graph.addHeuristic(1,4,9);
	graph.addHeuristic(1,5,3);
	graph.addHeuristic(1,6,12);
	graph.addHeuristic(1,7,10);
	graph.addHeuristic(1,8,12);
	graph.addHeuristic(1,9,13);
	graph.addHeuristic(1,10,15);
	//graph.addHeuristic(2,1,);
	graph.addHeuristic(2,2,0);
	graph.addHeuristic(2,3,4);
	graph.addHeuristic(2,4,3);
	graph.addHeuristic(2,5,3);
	graph.addHeuristic(2,6,8);
	graph.addHeuristic(2,7,5);
	graph.addHeuristic(2,8,6);
	graph.addHeuristic(2,9,9);
	graph.addHeuristic(2,10,9);
	//graph.addHeuristic(3,1,);
	//graph.addHeuristic(3,2,);
	graph.addHeuristic(3,3,0);
	graph.addHeuristic(3,4,5);
	graph.addHeuristic(3,5,6);
	graph.addHeuristic(3,6,3);
	graph.addHeuristic(3,7,3);
	graph.addHeuristic(3,8,6);
	graph.addHeuristic(3,9,5);
	graph.addHeuristic(3,10,8);
	//graph.addHeuristic(4,1,);
	//graph.addHeuristic(4,2,);
	//graph.addHeuristic(4,3,);
	graph.addHeuristic(4,4,0);
	graph.addHeuristic(4,5,5);
	graph.addHeuristic(4,6,8);
	graph.addHeuristic(4,7,6);
	graph.addHeuristic(4,8,2);
	graph.addHeuristic(4,9,5);
	graph.addHeuristic(4,10,9);
	//graph.addHeuristic(5,1,);
	//graph.addHeuristic(5,2,);
	//graph.addHeuristic(5,3,);
	//graph.addHeuristic(5,4,);
	graph.addHeuristic(5,5,0);
	graph.addHeuristic(5,6,6);
	graph.addHeuristic(5,7,4);
	graph.addHeuristic(5,8,3);
	graph.addHeuristic(5,9,2);
	graph.addHeuristic(5,10,5);
	//graph.addHeuristic(6,1,);
	//graph.addHeuristic(6,2,);
	//graph.addHeuristic(6,3,);
	//graph.addHeuristic(6,4,);
	//graph.addHeuristic(6,5,);
	graph.addHeuristic(6,6,0);
	graph.addHeuristic(6,7,3);
	graph.addHeuristic(6,8,8);
	graph.addHeuristic(6,9,6);
	graph.addHeuristic(6,10,4);
	//graph.addHeuristic(7,1,);
	//graph.addHeuristic(7,2,);
	//graph.addHeuristic(7,3,);
	//graph.addHeuristic(7,4,);
	//graph.addHeuristic(7,5,);
	//graph.addHeuristic(7,6,);
	graph.addHeuristic(7,7,0);
	graph.addHeuristic(7,8,4);
	graph.addHeuristic(7,9,3);
	graph.addHeuristic(7,10,3);
	//graph.addHeuristic(8,1,);
	//graph.addHeuristic(8,2,);
	//graph.addHeuristic(8,3,);
	//graph.addHeuristic(8,4,);
	//graph.addHeuristic(8,5,);
	//graph.addHeuristic(8,6,);
	//graph.addHeuristic(8,7,);
	graph.addHeuristic(8,8,0);
	graph.addHeuristic(8,9,4);
	graph.addHeuristic(8,10,6);
	//graph.addHeuristic(9,1,);
	//graph.addHeuristic(9,2,);
	//graph.addHeuristic(9,3,);
	//graph.addHeuristic(9,4,);
	//graph.addHeuristic(9,5,);
	//graph.addHeuristic(9,6,);
	//graph.addHeuristic(9,7,);
	//graph.addHeuristic(9,8,);
	graph.addHeuristic(9,9,0);
	graph.addHeuristic(9,10,2);
	//graph.addHeuristic(10,1,);
	//graph.addHeuristic(10,2,);
	//graph.addHeuristic(10,3,);
	//graph.addHeuristic(10,4,);
	//graph.addHeuristic(10,5,);
	//graph.addHeuristic(10,6,);
	//graph.addHeuristic(10,7,);
	//graph.addHeuristic(10,8,);
	//graph.addHeuristic(10,9,);
	graph.addHeuristic(10,10,0);

	useEffect(() => {
		async function load() {
			const nodesTemp = [];
			const linksTemp = [];

			for(var key in graph.adjacencyList) {
				if(graph.adjacencyList.hasOwnProperty(key)){
					nodesTemp.push({ id: key })
					graph.adjacencyList[key].forEach(child => {
						linksTemp.push({ source: `${key}`, target: `${child}` })
					})
				}
			}

			// await setNodes(nodesTemp);
			// await setLinks(linksTemp);

			setData({
				nodes: nodesTemp,
				links: linksTemp
			});
		}
		load();
	}, []);

	// the graph configuration, just override the ones you need
	const myConfig = {
		nodeHighlightBehavior: true,
		directed: true,
		node: {
		color: "lightgreen",
		size: 120,
		highlightStrokeColor: "blue",
		},
		link: {
		highlightColor: "lightblue",
		},
	};

	function sleep(milliseconds) {
		const date = Date.now();
		let currentDate = null;
		do {
		  currentDate = Date.now();
		} while (currentDate - date < milliseconds);
	}
	
	const onClickNode = function(nodeId) {          // IDEIA: AO CLICAR NOS NÓS, SELECIONAR ELES COMO PONTO DE PARTIDA E PONTO DE CHEGADA
		//window.alert(`Clicked node ${nodeId}`);
	};
	/*
	const onClickLink = function(source, target) {
		window.alert(`Clicked link between ${source} and ${target}`);
	};
	*/
	const onClickDFS = async () => {
		const path = graph.dfs(1);
		console.log(path);
		var tempNodes = data.nodes;
		for(var i in path) {
			for (var j in data.nodes) {
				console.log(data.nodes[j])
				console.log("------")
				if(parseInt(data.nodes[j].id) === path[i]) {
					tempNodes[j] = {
						...data.nodes[j],
						color: "red"
					}
				} else {
					tempNodes[j] = data.nodes[j]
				}
			}
			// tempNodes.push(data.nodes.map(node => {
			// 	if((parseInt(node.id)) === path[i]) {
			// 		console.log((parseInt(node.id)))
			// 		console.log(path[i])
			// 		tempNodes[i] = {
			// 			...node,
			// 			color: "red"
			// 		}
			// 		return {
			// 			...node,
			// 			color: "red"
			// 		}
			// 	} else {
			// 		tempNodes[i] = node
			// 		return node
			// 	}
			// }))

			//await setNodes(tempNodes)

			// setNodes((prev) => ({...prev, nodes: tempNodes}))

			// setData((prev) => ({...prev, nodes: tempNodes}))

			// await setData((prev) => ({...prev, nodes: prev.nodes.map(object => {
			// 	if(path[i] === (parseInt(object.id))) {
			// 		console.log("red")
			// 		return {
			// 			...object,
			// 			color: "red"
			// 		}
			// 	} else {
			// 		return object;
			// 	}
			// }) }));
		}

		setData(
			((prev) => ({...prev, nodes: data.nodes})),
			() => {
				const context = {
					tempNodes,
					nodes: data.nodes
				}
				runRecursively(context.nodes, context)
			}
		);
		
	}

	const runRecursively = (newNodes, context) => {
		const { processing } = context.tempNodes
		setData((prev) => ({...prev, nodes: newNodes}), async () => {
			const item = processing.shift()
			context.nodes = await delay(item, context)
			if(processing.length > 0) {
				runRecursively(context.nodes, context);
			} else {
				finalizeProcess(context)
			}
		})
	}

	const delay = async (item, context) => {
		return new Promise((resolve) => {
			context.nodes.map(node => {
				if(node.id === item.id) {
					return {
						...node,
						color: "red"
					}
				} else {
					return node
				}
			})
			setTimeout(() => {
			  resolve(context.nodes);
			}, 3000);
		});
	}

	const finalizeProcess = (context) => {
		setData((prev) => ({...prev, nodes: context.nodes}))
	}

	const onClickBFS = () => {
		
	}

	const onCLickGBFS = async () {
		const pathGFS = graph.GBFS(startNode,endNode); // precisa passar o nó inicial e final
	}

	return(
		<>
			<button onClick={onClickDFS}>DFS</button>
			<button onClick={onClickBFS}>BFS</button>
			<button onClick={onCLickGBFS}>GBFS</button>
			<Graph
				id="graph-id" // id is mandatory
				data={data}
				config={myConfig}
				onClickNode={onClickNode}
				//onClickLink={onClickLink}
			/>
		</>
	);
}

export default MainPage;