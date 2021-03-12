import React, {useState, useEffect} from 'react';
import {Graph} from 'react-d3-graph';
import Grafo from '../../../Models/Grafo';

class MainPage extends React.Component {
	// graph payload (with minimalist structure)

	constructor(props) {
		super(props);
		this.graph = new Grafo();
		this.graph.addNode(1);
		this.graph.addNode(2);
		this.graph.addNode(3);
		this.graph.addNode(4);
		this.graph.addNode(5);
		this.graph.addNode(6);
		this.graph.addNode(7);
		this.graph.addNode(8);
		this.graph.addNode(9);
		this.graph.addNode(10);

		this.graph.addLink(1, 2);
		this.graph.addLink(1, 3);
		this.graph.addLink(2, 4);
		this.graph.addLink(2, 5);
		this.graph.addLink(3, 6);
		this.graph.addLink(3, 7);
		this.graph.addLink(4, 8);
		this.graph.addLink(5, 9);
		this.graph.addLink(8, 9);
		this.graph.addLink(9, 10);
		this.graph.addLink(6, 10);

		this.graph.addHeuristic(1,1,0);
		this.graph.addHeuristic(1,2,11);
		this.graph.addHeuristic(1,3,7);
		this.graph.addHeuristic(1,4,9);
		this.graph.addHeuristic(1,5,3);
		this.graph.addHeuristic(1,6,12);
		this.graph.addHeuristic(1,7,10);
		this.graph.addHeuristic(1,8,12);
		this.graph.addHeuristic(1,9,13);
		this.graph.addHeuristic(1,10,15);
		//this.graph.addHeuristic(2,1,);
		this.graph.addHeuristic(2,2,0);
		this.graph.addHeuristic(2,3,4);
		this.graph.addHeuristic(2,4,3);
		this.graph.addHeuristic(2,5,3);
		this.graph.addHeuristic(2,6,8);
		this.graph.addHeuristic(2,7,5);
		this.graph.addHeuristic(2,8,6);
		this.graph.addHeuristic(2,9,9);
		this.graph.addHeuristic(2,10,9);
		//this.graph.addHeuristic(3,1,);
		//this.graph.addHeuristic(3,2,);
		this.graph.addHeuristic(3,3,0);
		this.graph.addHeuristic(3,4,5);
		this.graph.addHeuristic(3,5,6);
		this.graph.addHeuristic(3,6,3);
		this.graph.addHeuristic(3,7,3);
		this.graph.addHeuristic(3,8,6);
		this.graph.addHeuristic(3,9,5);
		this.graph.addHeuristic(3,10,8);
		//this.graph.addHeuristic(4,1,);
		//this.graph.addHeuristic(4,2,);
		//this.graph.addHeuristic(4,3,);
		this.graph.addHeuristic(4,4,0);
		this.graph.addHeuristic(4,5,5);
		this.graph.addHeuristic(4,6,8);
		this.graph.addHeuristic(4,7,6);
		this.graph.addHeuristic(4,8,2);
		this.graph.addHeuristic(4,9,5);
		this.graph.addHeuristic(4,10,9);
		//this.graph.addHeuristic(5,1,);
		//this.graph.addHeuristic(5,2,);
		//this.graph.addHeuristic(5,3,);
		//this.graph.addHeuristic(5,4,);
		this.graph.addHeuristic(5,5,0);
		this.graph.addHeuristic(5,6,6);
		this.graph.addHeuristic(5,7,4);
		this.graph.addHeuristic(5,8,3);
		this.graph.addHeuristic(5,9,2);
		this.graph.addHeuristic(5,10,5);
		//this.graph.addHeuristic(6,1,);
		//this.graph.addHeuristic(6,2,);
		//this.graph.addHeuristic(6,3,);
		//this.graph.addHeuristic(6,4,);
		//this.graph.addHeuristic(6,5,);
		this.graph.addHeuristic(6,6,0);
		this.graph.addHeuristic(6,7,3);
		this.graph.addHeuristic(6,8,8);
		this.graph.addHeuristic(6,9,6);
		this.graph.addHeuristic(6,10,4);
		//this.graph.addHeuristic(7,1,);
		//this.graph.addHeuristic(7,2,);
		//this.graph.addHeuristic(7,3,);
		//this.graph.addHeuristic(7,4,);
		//this.graph.addHeuristic(7,5,);
		//this.graph.addHeuristic(7,6,);
		this.graph.addHeuristic(7,7,0);
		this.graph.addHeuristic(7,8,4);
		this.graph.addHeuristic(7,9,3);
		this.graph.addHeuristic(7,10,3);
		//this.graph.addHeuristic(8,1,);
		//this.graph.addHeuristic(8,2,);
		//this.graph.addHeuristic(8,3,);
		//this.graph.addHeuristic(8,4,);
		//this.graph.addHeuristic(8,5,);
		//this.graph.addHeuristic(8,6,);
		//this.graph.addHeuristic(8,7,);
		this.graph.addHeuristic(8,8,0);
		this.graph.addHeuristic(8,9,4);
		this.graph.addHeuristic(8,10,6);
		//this.graph.addHeuristic(9,1,);
		//this.graph.addHeuristic(9,2,);
		//this.graph.addHeuristic(9,3,);
		//this.graph.addHeuristic(9,4,);
		//this.graph.addHeuristic(9,5,);
		//this.graph.addHeuristic(9,6,);
		//this.graph.addHeuristic(9,7,);
		//this.graph.addHeuristic(9,8,);
		this.graph.addHeuristic(9,9,0);
		this.graph.addHeuristic(9,10,2);
		//this.graph.addHeuristic(10,1,);
		//this.graph.addHeuristic(10,2,);
		//this.graph.addHeuristic(10,3,);
		//this.graph.addHeuristic(10,4,);
		//this.graph.addHeuristic(10,5,);
		//this.graph.addHeuristic(10,6,);
		//this.graph.addHeuristic(10,7,);
		//this.graph.addHeuristic(10,8,);
		//this.graph.addHeuristic(10,9,);
		this.graph.addHeuristic(10,10,0);

		this.graph.addCost(1, 2, 4);
		this.graph.addCost(1, 3, 5);
		this.graph.addCost(2, 4, 1);
		this.graph.addCost(2, 5, 7);
		this.graph.addCost(3, 6, 2);
		this.graph.addCost(3, 7, 6);
		this.graph.addCost(4, 8, 9);
		this.graph.addCost(5, 9, 3);
		this.graph.addCost(8, 9, 3);
		this.graph.addCost(9, 10, 4);
		this.graph.addCost(6, 10, 7);

		const nodesTemp = [];
		const linksTemp = [];

		for(var key in this.graph.adjacencyList) {
			if(this.graph.adjacencyList.hasOwnProperty(key)){
				nodesTemp.push({ id: key })
				this.graph.adjacencyList[key].forEach(child => {
					linksTemp.push({ source: `${key}`, target: `${child}` })
				})
			}
		}

		let data = {
			nodes: nodesTemp,
			links: linksTemp
		}

		this.state = {
			data: data,
			message: ""
		}
	}

	changeColor = async function(nodeIds) {
		let modData = { ...this.state.data };
		let nodeId = nodeIds.shift()
		let selectNode = modData.nodes.filter(item => {
		  return item.id === `${nodeId}`;
		});
		selectNode.forEach(item => {
		  if (item.color && item.color === "red") item.color = "blue";
		  else item.color = "red";
		});
		await this.longTask()
		//testDelayedState(reactRef, modData)
		this.setState({ data: modData }, () => {
			this.changeColor(nodeIds)
		});
	};

	longTask = async () => {
		return new Promise((resolve) => {
		  setTimeout(() => {
			resolve();
		  }, 500);
		});
	}

	render() {

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
		
		const onClickNode = (nodeId) => {
			window.alert(`Clicked node ${nodeId}`);
		};
		
		const onClickLink = function(source, target) {
			window.alert(`Clicked link between ${source} and ${target}`);
		};
		
		const onClickDFS = () => {

			console.log("DFS")

			const path = this.graph.dfs(1);

			if (path !== undefined && path !== null && path.length > 0) {
				this.changeColor(path)
			} else {
				this.setState({message: "There is no path for the search you're looking for"})
			}
			
		}

		const onClickBFS = () => {
			console.log("DFS")

			const path = this.graph.bfs(1);
			if (path !== undefined && path !== null && path.length > 0) {
				this.changeColor(path)
			} else {
				this.setState({message: "There is no path for the search you're looking for"})
			}

		}

		const onClickDijkstra = () => {
			console.log("DFS")

			const path = this.graph.dijkstra(1);
			if (path !== undefined && path !== null && path.length > 0) {
				this.changeColor(path)
			} else {
				this.setState({message: "There is no path for the search you're looking for"})
			}

		}

		const onCLickGBFS = async () => {
			console.log("GBFS")
			const pathGFS = this.graph.GBFS(1, 9);
			if (pathGFS !== undefined && pathGFS !== null && pathGFS.length > 0) {
				this.changeColor(pathGFS)
			} else {
				this.setState({message: "There is no path for the search you're looking for"})
			}
		}

		const onClickUC = async () => {
			console.log("UC")
			const pathUC = this.graph.UC(1, 9);
			if (pathUC !== undefined && pathUC !== null && pathUC.length > 0) {
				this.changeColor(pathUC)
			} else {
				this.setState({message: "There is no path for the search you're looking for"})
			}
		}

		const onClickAEstrela = async () => {
			console.log("A*")
			const pathAE = this.graph.AEstrela(1, 9);
			if (pathAE !== undefined && pathAE !== null && pathAE.length > 0) {
				this.changeColor(pathAE)
			} else {
				this.setState({message: "There is no path for the search you're looking for"})
			}
		}

		return(
			<>
				<button onClick={onClickDFS}>DFS</button>
				<button onClick={onClickBFS}>BFS</button>
				<button onClick={onCLickGBFS}>GBFS</button>
				<button onClick={onClickDijkstra}>DIJKSTRA</button>
				<button onClick={onClickUC}>UC</button>
				<button onClick={onClickAEstrela}>AEstrela</button>
				<p>{this.state.message}</p>
				<Graph
					id="graph-id" // id is mandatory
					data={this.state.data}
					config={myConfig}
					onClickNode={onClickNode}
					onClickLink={onClickLink}
				/>
			</>
		)
	}
}

export default MainPage;